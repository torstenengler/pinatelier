import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PA_MODULES+'/playwright');
const base=process.env.PA_BASE||'http://127.0.0.1:8765';
const pins=JSON.parse(fs.readFileSync('pins.json','utf8'));
const browser=await chromium.launch({headless:true,channel:'chrome'});
const ctx=await browser.newContext({viewport:{width:1440,height:1000}});
const errors=[];const page=await ctx.newPage();page.on('pageerror',e=>errors.push(e.message));
// Reproduce a returning visitor with stale pre-redesign assets cached under old URLs.
await ctx.route('**/styles.css',route=>route.fulfill({contentType:'text/css',body:'body{margin:0}h2{font-size:90px}a{color:blue}'}));
await ctx.route('**/app.js',route=>route.fulfill({contentType:'text/javascript',body:'throw new Error("Stale unversioned app loaded")'}));
// Stub only the external Pinterest library; verify our gate, calls and no duplicate events.
await ctx.route('https://s.pinimg.com/ct/core.js',route=>route.fulfill({contentType:'text/javascript',body:'window.__calls=window.pintrk.queue.slice();window.pintrk=function(){window.__calls.push(Array.from(arguments))}'}));
await page.goto(base,{waitUntil:'networkidle'});
assert.equal(await page.locator('#pinGrid .pin-card').count(),101);
assert.equal(await page.locator('iframe').count(),0);
assert.equal(await page.locator('h1').count(),1);
assert.match(await page.locator('link[rel=stylesheet]').getAttribute('href'),/^\/assets\/styles\.[a-f0-9]+\.css$/);
assert.equal(await page.locator('.topic-nav').first().evaluate(e=>getComputedStyle(e).display),'grid');
assert(await page.locator('.selection h2').evaluate(e=>parseFloat(getComputedStyle(e).fontSize)<=40));
for(const p of pins)assert.equal(await page.locator('#pin-'+p.id+' .product-link').getAttribute('href'),p.link);
await page.screenshot({path:'/tmp/pinatelier-desktop.png',fullPage:false});
await page.locator('#search').fill('Flos');assert.equal(await page.locator('#pinGrid .pin-card:visible').count(),2);
await page.locator('#search').fill('xxxxxxxxxxx');assert.equal(await page.locator('#pinGrid .pin-card:visible').count(),0);assert(await page.locator('#empty').isVisible());
await page.locator('#reset').click();assert.equal(await page.locator('#pinGrid .pin-card:visible').count(),101);
await page.locator('[data-board-jump="luxury"]').click();assert.equal(await page.locator('#pinGrid .pin-card:visible').count(),11);
await page.locator('#reset').click();await page.locator('[data-filter="balkon-garten"]').click();assert.equal(await page.locator('#pinGrid .pin-card:visible').count(),3);
await page.locator('#reset').click();
await page.locator('#consent-deny').click();await page.reload();assert.equal(await page.locator('iframe').count(),0);assert(!(await page.locator('#consent').isVisible()));
await page.locator('[data-consent-open]').click();await page.locator('#consent-accept').click();
await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow.__calls?.some(x=>x[1]==='pagevisit'));
assert.equal(await page.locator('iframe').count(),1);
// Prevent actual external navigation while testing exactly one DOM click.
await page.evaluate(()=>document.addEventListener('click',e=>{if(e.target.closest('a[data-product]'))e.preventDefault()}));
await page.locator('#pin-'+pins[0].id+' .product-link').click();
await page.waitForFunction(()=>document.querySelector('iframe').contentWindow.__calls.some(x=>x[1]==='affiliate_engaged'));
let calls=await page.evaluate(()=>document.querySelector('iframe').contentWindow.__calls);
assert.equal(calls.filter(x=>x[1]==='affiliate_click').length,1);assert.equal(calls.filter(x=>x[1]==='affiliate_engaged').length,1);assert.equal(calls.filter(x=>x[1]==='pagevisit').length,1);assert(!calls.some(x=>['checkout','addtocart'].includes(x[1])));
await page.locator('[data-filter="licht"]').click();await page.waitForFunction(()=>document.querySelector('iframe').contentWindow.__calls.some(x=>x[1]==='filter_change'));
await page.locator('[data-consent-open]').click();await page.locator('#consent-deny').click();assert.equal(await page.locator('iframe').count(),0);
await page.goto(base+'/?q=Flos&utm_source=pinterest&utm_campaign=wohnideen&utm_content='+pins[0].id+'#auswahl');assert.equal(await page.locator('#pinGrid .pin-card:visible').count(),2);assert(!page.url().includes('?'));
await page.goto(base+'/licht/?board=everyday#pin-'+pins[90].id);assert(await page.locator('#pin-'+pins[90].id).isVisible());
const paths=['/','/licht/','/wohnen/','/kueche/','/ordnung/','/balkon-garten/','/lifestyle/','/ratgeber/','/ratgeber/designleuchten-sideboard/','/ratgeber/pendelleuchten-esstisch/','/ueber-uns/','/impressum/','/datenschutz/','/affiliate-hinweis/'];
for(const width of [1920,1440,1024,768,390,320]){await page.setViewportSize({width,height:900});for(const route of paths){const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200);assert.equal(await page.locator('h1').count(),1,route);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert(!overflow,route+' overflow at '+width);assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'),'https://pinatelier.org'+route);await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.forEach(n=>JSON.parse(n.textContent)));}}
await page.setViewportSize({width:390,height:844});await page.goto(base,{waitUntil:'networkidle'});await page.screenshot({path:'/tmp/pinatelier-mobile.png',fullPage:false});
const nojs=await browser.newContext({javaScriptEnabled:false});const plain=await nojs.newPage();await plain.goto(base);assert.equal(await plain.locator('#pinGrid .pin-card').count(),101);assert.equal(await plain.locator('#pinGrid a.product-link').count(),101);assert.equal(await plain.locator('iframe').count(),0);
// All internal paths/fragments across every rendered page must resolve.
for(const route of paths){await plain.goto(base+route);const links=await plain.locator('a[href]').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')).filter(h=>h.startsWith('/')));for(const href of links){const u=new URL(href,base);if(u.pathname==='/cdn-cgi/l/email-protection')continue;assert(paths.includes(u.pathname),route+' broken path '+href);}}
assert.deepEqual(errors,[]);console.log('PASS: 101 original affiliate URLs; static HTML/no JS; search; empty/reset; board/category filters; deep links; consent deny/accept/revoke; single page/click events; 14 pages at 1440/390/320; schema/canonicals/internal paths; no JS errors.');
await browser.close();

(() => {
  const key='pinatelierConsentV2',ttl=180*86400000;
  const banner=document.querySelector('#consent');
  const paths=new Set(['/','/licht/','/wohnen/','/kueche/','/ordnung/','/balkon-garten/','/lifestyle/','/ratgeber/','/ratgeber/designleuchten-sideboard/','/ratgeber/pendelleuchten-esstisch/','/ueber-uns/','/impressum/','/datenschutz/','/affiliate-hinweis/']);
  const page=paths.has(location.pathname)?location.pathname:'/';
  const incoming=new URLSearchParams(location.search);
  const campaign=incoming.get('utm_campaign')==='wohnideen'?'wohnideen':'none';
  const content=/^1102326\d{12}$/.test(incoming.get('utm_content')||'')?incoming.get('utm_content'):'';
  let source='direct_or_unknown';
  try{const host=new URL(document.referrer).hostname;if(/(^|\.)pinterest\.[a-z.]+$/.test(host))source='pinterest';else if(/(^|\.)(google|bing)\.[a-z.]+$/.test(host))source='search';else if(host!==location.hostname)source='other_referral'}catch{}
  if(incoming.get('utm_source')==='pinterest')source='pinterest';
  // Consume search parameters locally, then remove arbitrary text before any marketing code.
  if(location.search)history.replaceState(null,'',location.pathname+(/^#pin-\d+$/.test(location.hash)?location.hash:''));
  let saved;try{saved=JSON.parse(localStorage.getItem(key));}catch{}
  let granted=saved?.choice==='granted'&&Date.now()-saved.time<ttl;
  let frame=null,ready=false,pending=[],engaged=false;
  const readEntry=()=>{try{const value=JSON.parse(sessionStorage.getItem('paEntry'));if(value&&paths.has(value.page)&&['direct_or_unknown','pinterest','search','other_referral'].includes(value.source))return value}catch{}return {page,source}};
  let entry=null;
  function send(name,data={}){if(!granted||!frame)return;const event={type:'pa-event',name,data:{page_path:page,landing_page:entry.page,source:entry.source,campaign,content,...data}};if(ready)frame.contentWindow.postMessage(event,location.origin);else pending.push(event)}
  function start(){if(frame)return;entry=readEntry();try{sessionStorage.setItem('paEntry',JSON.stringify(entry))}catch{}frame=document.createElement('iframe');frame.src='/measurement.html';frame.title='Optionale Pinterest-Messung';frame.hidden=true;frame.referrerPolicy='no-referrer';document.body.append(frame);send('pagevisit');}
  window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==frame?.contentWindow||e.data?.type!=='pa-ready')return;ready=true;pending.splice(0).forEach(event=>frame.contentWindow.postMessage(event,location.origin))});
  window.paMeasure=(name,data)=>{if(name==='filter_change'&&['all','everyday','luxury','reset','licht','wohnen','kueche','ordnung','balkon-garten','lifestyle'].includes(data?.filter))send(name,{filter:data.filter})};
  document.addEventListener('click',e=>{const a=e.target.closest?.('a[data-product]');if(a&&/^\d+$/.test(a.dataset.product)){send('affiliate_click',{product_id:a.dataset.product});if(granted&&!engaged){send('affiliate_engaged');engaged=true;}}});
  function stop(){frame?.remove();frame=null;ready=false;pending=[];engaged=false;try{sessionStorage.removeItem('paEntry')}catch{}for(const cookie of ['_pin_unauth','_derived_epik','_epik'])for(const domain of ['',location.hostname,'.'+location.hostname])document.cookie=cookie+'=; Max-Age=0; Path=/; SameSite=Lax'+(domain?'; Domain='+domain:'');}
  function choose(choice){granted=choice==='granted';try{localStorage.setItem(key,JSON.stringify({choice,time:Date.now()}));localStorage.removeItem('pinatelierMarketingConsent')}catch{}banner.hidden=true;if(granted)start();else stop();}
  document.querySelector('#consent-accept').addEventListener('click',()=>choose('granted'));
  document.querySelector('#consent-deny').addEventListener('click',()=>choose('denied'));
  document.querySelectorAll('[data-consent-open]').forEach(b=>{b.hidden=false;b.addEventListener('click',()=>{banner.hidden=false;banner.scrollIntoView();document.querySelector('#consent-deny').focus({preventScroll:true})})});
  window.addEventListener('storage',e=>{if(e.key===key){try{const v=JSON.parse(e.newValue);granted=v?.choice==='granted'&&Date.now()-v.time<ttl}catch{granted=false}if(granted)start();else stop()}});
  banner.hidden=Boolean(saved&&['granted','denied'].includes(saved.choice)&&Date.now()-saved.time<ttl);
  if(granted)start();
})();

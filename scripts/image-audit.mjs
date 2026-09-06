import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require(process.env.PA_MODULES+'/sharp');
const pins=JSON.parse(fs.readFileSync('pins.json','utf8'));
const results={};let cursor=0;
await Promise.all(Array.from({length:6},async()=>{while(cursor<pins.length){const p=pins[cursor++];try{const variants=[];for(const size of ['1200','474','736']){const url=p.image.replace('/1200x/','/'+size+'x/');const res=await fetch(url,{signal:AbortSignal.timeout(20000)});if(!res.ok)throw Error(res.status);const b=Buffer.from(await res.arrayBuffer());const m=await sharp(b).metadata();variants.push({url,width:m.width,height:m.height,bytes:b.length});}results[p.id]={...variants[0],variants:variants.slice(1)};}catch(e){console.error(p.id,e.message)}}}));
fs.writeFileSync('image-dimensions.json',JSON.stringify(results,null,2)+'\n');
console.log('Verified image dimensions:',Object.keys(results).length,'/',pins.length);

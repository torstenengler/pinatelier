// Isolated, removable tag context. No free-form search, raw referrer or email is exposed.
(() => {
  if(window.parent===window)return;
  const allowed=new Set(['pagevisit','affiliate_click','affiliate_engaged','filter_change']);
  window.pintrk=function(){window.pintrk.queue.push(Array.from(arguments))};
  window.pintrk.queue=[];window.pintrk.version='3.0';
  const script=document.createElement('script');script.async=true;script.src='https://s.pinimg.com/ct/core.js';document.head.append(script);
  window.pintrk('load','2614306645876');window.pintrk('page');
  window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==parent||e.data?.type!=='pa-event'||!allowed.has(e.data.name))return;const d=e.data.data||{},payload={event_id:crypto.randomUUID()};
    for(const k of ['page_path','landing_page','source','campaign','content','filter','product_id']){if(typeof d[k]==='string'&&/^[a-z0-9_/-]{0,100}$/.test(d[k]))payload[k]=d[k];}
    window.pintrk('track',e.data.name,payload);
  });
  parent.postMessage({type:'pa-ready'},location.origin);
})();

// Enhance existing HTML. No fetch or dynamic HTML replacement is required.
(() => {
  const catalog=document.querySelector('[data-catalog]');
  if(!catalog)return;
  const cards=[...catalog.querySelectorAll('.pin-card')];
  const search=document.querySelector('#search'),board=document.querySelector('#boardFilter');
  const params=new URLSearchParams(location.search);
  const state={category:'all',board:['everyday','luxury'].includes(params.get('board'))?params.get('board'):'all',query:params.get('q')||''};
  const normalize=s=>s.toLocaleLowerCase('de').normalize('NFD').replace(/\p{Diacritic}/gu,'');
  search.value=state.query;board.value=state.board;
  const track=(name,data)=>window.paMeasure?.(name,data);
  function render(){let count=0;for(const card of cards){const visible=(state.category==='all'||card.dataset.category===state.category)&&(state.board==='all'||card.dataset.board===state.board)&&normalize(card.dataset.search).includes(normalize(state.query));card.hidden=!visible;if(visible)count++;}document.querySelector('#results').textContent=count+' von '+cards.length+' Pins';document.querySelector('#empty').hidden=count!==0;document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===state.category)));}
  function reset(){state.category='all';state.board='all';state.query='';search.value='';board.value='all';render();}
  document.querySelectorAll('.controls').forEach(x=>x.hidden=false);
  search.addEventListener('input',()=>{state.query=search.value;render()});
  board.addEventListener('change',()=>{state.board=board.value;render();track('filter_change',{filter:state.board})});
  document.querySelector('#reset').addEventListener('click',()=>{reset();track('filter_change',{filter:'reset'})});
  document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.filter;render();track('filter_change',{filter:state.category})}));
  document.querySelectorAll('[data-board-jump]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();reset();state.board=a.dataset.boardJump;board.value=state.board;render();catalog.scrollIntoView();track('filter_change',{filter:state.board})}));
  function revealPin(){if(!/^#pin-\d+$/.test(location.hash))return;const target=document.getElementById(location.hash.slice(1));if(target){reset();target.setAttribute('tabindex','-1');target.scrollIntoView();target.focus({preventScroll:true})}}
  render();revealPin();window.addEventListener('hashchange',revealPin);
})();

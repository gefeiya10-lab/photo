export const FRAMES = [
  {id:'dusty-pink',name:'旧粉波点',sub:'低饱和 Y2K',bg:'#d7b9bf',ink:'#80636a',kind:'dashed'},
  {id:'milk-blue',name:'牛奶蓝',sub:'古早网页感',bg:'#b9c9cf',ink:'#526b75',kind:'dots'},
  {id:'biscuit',name:'饼干边',sub:'食物系列',bg:'#d9c7ab',ink:'#76644e',kind:'cookie'},
  {id:'strawberry',name:'草莓牛奶',sub:'食物系列',bg:'#d9b5b2',ink:'#805f62',kind:'berry'},
  {id:'matcha',name:'抹茶喫茶',sub:'日系轻复古',bg:'#b7bea4',ink:'#56604c',kind:'line'},
  {id:'soda',name:'冰汽水',sub:'Y2K 条纹',bg:'#b8c8d2',ink:'#536d7c',kind:'stripe'},
  {id:'cherry',name:'樱桃灰粉',sub:'旧网小波点',bg:'#c6bab2',ink:'#765e5e',kind:'dots'},
  {id:'night',name:'午夜贴纸',sub:'暗色闪星',bg:'#4c4b52',ink:'#e1d7df',kind:'stars',dark:true},
  {id:'peach',name:'桃子奶霜',sub:'韩系旧网页',bg:'#d9c0ad',ink:'#80695e',kind:'dots'},
  {id:'lilac',name:'灰紫梦境',sub:'地雷系淡紫',bg:'#c6becd',ink:'#675a70',kind:'line'},
  {id:'sesame',name:'黑芝麻',sub:'食物系列',bg:'#d4d0c7',ink:'#625e59',kind:'sesame'},
  {id:'lemon',name:'柠檬奶油',sub:'低饱和黄',bg:'#d7d0ad',ink:'#77723f',kind:'dots'}
];

export function renderFrameCards(container,currentId,onPick){
  container.innerHTML='';
  FRAMES.forEach(f=>{
    const b=document.createElement('button');
    b.type='button';
    b.className=`frame-card ${f.id===currentId?'active':''}`;
    b.dataset.frame=f.id;
    b.innerHTML=`<div class="frame-swatch swatch-${f.id}"></div><b>${f.name}</b><small>${f.sub}</small>`;
    b.addEventListener('click',()=>onPick(f.id));
    container.appendChild(b);
  });
}

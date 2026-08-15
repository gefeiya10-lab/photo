import {FRAMES} from './frames.js';

function roundedRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.closePath()}
function fitCover(img,w,h){const ir=img.naturalWidth/img.naturalHeight,tr=w/h;let sx=0,sy=0,sw=img.naturalWidth,sh=img.naturalHeight;if(ir>tr){sw=sh*tr;sx=(img.naturalWidth-sw)/2}else{sh=sw/tr;sy=(img.naturalHeight-sh)/2}return [sx,sy,sw,sh]}
function drawDots(ctx,w,h,ink,step=52,r=3){ctx.save();ctx.fillStyle=ink;ctx.globalAlpha=.27;for(let y=16;y<h;y+=step)for(let x=16;x<w;x+=step){ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}ctx.restore()}
function drawOuterDecor(ctx,frame,w,h){ctx.save();ctx.strokeStyle=frame.ink;ctx.fillStyle=frame.ink;ctx.globalAlpha=.42;ctx.lineWidth=2;if(frame.kind==='dashed'){ctx.setLineDash([8,10]);ctx.strokeRect(8,8,w-16,h-16)}else if(['dots','berry','cookie','sesame'].includes(frame.kind)){drawDots(ctx,w,h,frame.ink,frame.kind==='sesame'?34:48,frame.kind==='cookie'?4:2.6)}else if(frame.kind==='line'){ctx.strokeRect(10,10,w-20,h-20)}else if(frame.kind==='stripe'){ctx.globalAlpha=.2;for(let x=0;x<w;x+=44)ctx.fillRect(x,0,4,h)}else if(frame.kind==='stars'){ctx.globalAlpha=.75;ctx.font='22px serif';for(const [x,y] of [[18,30],[w-35,45],[22,h-40],[w-40,h-25]])ctx.fillText('✦',x,y)}ctx.restore()}

export async function exportStrip({photos,frameId,caption,brightness,contrast,saturation,filter}){
  const W=1020,H=2125,padX=66,top=126,bottom=92,gap=22;
  const innerW=W-padX*2,slotH=(H-top-bottom-gap*3)/4;
  const canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;const ctx=canvas.getContext('2d');
  const frame=FRAMES.find(f=>f.id===frameId)||FRAMES[0];
  ctx.fillStyle=frame.bg;ctx.fillRect(0,0,W,H);drawOuterDecor(ctx,frame,W,H);
  const preset=filter==='ccd'?'sepia(.06)':filter==='cream'?'sepia(.12)':filter==='cool'?'hue-rotate(8deg)':'';
  for(let i=0;i<4;i++){
    const y=top+i*(slotH+gap);ctx.save();roundedRect(ctx,padX,y,innerW,slotH,4);ctx.clip();
    if(photos.length){const photo=photos[i%photos.length];const img=new Image();img.src=photo.src;await img.decode();const [sx,sy,sw,sh]=fitCover(img,innerW,slotH);ctx.filter=`brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) ${preset}`;ctx.drawImage(img,sx,sy,sw,sh,padX,y,innerW,slotH);ctx.filter='none'}else{ctx.fillStyle='rgba(255,255,255,.55)';ctx.fillRect(padX,y,innerW,slotH);ctx.fillStyle='rgba(80,70,66,.45)';ctx.font='28px Georgia';ctx.textAlign='center';ctx.fillText(`PHOTO ${i+1}`,W/2,y+slotH/2)}ctx.restore();ctx.strokeStyle='rgba(255,255,255,.45)';ctx.strokeRect(padX,y,innerW,slotH)}
  ctx.fillStyle=frame.dark?'#eee8ec':frame.ink;ctx.textAlign='center';ctx.font='700 31px Georgia';ctx.fillText(caption||'TIME STICKER CLUB',W/2,67);ctx.font='21px Georgia';ctx.textAlign='left';ctx.fillText("2000's memory",padX,H-34);ctx.textAlign='right';ctx.fillText(new Date().toLocaleDateString('zh-CN').replaceAll('/','.'),W-padX,H-34);
  const blob=await new Promise(res=>canvas.toBlob(res,'image/png',1));return blob;
}

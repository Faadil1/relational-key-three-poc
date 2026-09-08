import { CanvasTexture, SRGBColorSpace } from 'three';
// Original editorial typography and diagram. No archival image is reproduced.
export function cityArtwork(member,back,mobile,transferred) {
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=756;
 const c=canvas.getContext('2d');const a=member==='A';const ink=a?'#f4f0df':'#153f46';
 c.fillStyle=a?'#18454e':'#eee9db';c.fillRect(0,0,1200,756);
 const text=(s,x,y,size=24,font='sans-serif')=>{c.fillStyle=ink;c.font=`${size>=50?'600':'500'} ${size}px ${font}`;c.fillText(s,x,y);};
 c.strokeStyle=a?'#729894':'#bac6ba';c.lineWidth=1;
 for(let y=124;y<650;y+=24){c.beginPath();c.moveTo(44,y);c.lineTo(1156,y);c.stroke();}
 c.fillStyle=a?'#18454e':'#eee9db';c.fillRect(40,32,1120,88);c.fillRect(40,605,1120,116);
 text('RELATIONAL KEY',52,76,25);text('AMÉRIQUE DU NORD / CA',758,76,20);
 if(back){
  text('La ville ne s’arrête',64,210,64,'Georgia');text('pas au bord de la carte.',64,280,64,'Georgia');
  c.fillStyle=a?'#18454e':'#eee9db';c.fillRect(45,340,1110,240);
  text('GATINEAU · DEUX RIVES, UNE RELATION',64,382,25);
  text('Les secteurs sont documentés par la Ville de Gatineau.',64,436,25);
  text('Le raccord et les tracés sont une composition éditoriale.',64,482,25);
  text('Sources et contexte accessibles sous la paire.',64,528,25);
 } else {
  text(a?'L’autre rive.':'Le passage.',60,210,90,'Georgia');
  // River strokes are abstract editorial marks, never an operational map.
  for(let i=0;i<8;i++){c.strokeStyle=a?'#337481':'#c1d0c6';c.lineWidth=8;c.beginPath();c.moveTo(100+i*35,590);c.bezierCurveTo(690+i*12,430,270+i*20,250,1030+i*18,285);c.stroke();}
  const points=mobile?(a?[[110,420],[370,380],[600,500],[600,756]]:[[600,0],[600,350],[820,440],[1080,405]]):(a?[[100,420],[380,355],[710,440],[1200,378]]:[[0,378],[410,440],[750,355],[1080,400]]);
  c.strokeStyle=transferred?'#dcbc54':(a?'#ebede2':'#2c6770');c.lineWidth=12;c.lineJoin='round';c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.stroke();
  for(const [x,y] of points){c.fillStyle=a?'#18454e':'#eee9db';c.beginPath();c.arc(x,y,15,0,Math.PI*2);c.fill();c.stroke();}
 }
 text(a?'AYLMER / HULL':'GATINEAU / MASSON-ANGERS / BUCKINGHAM',52,648,a?24:19);
 text('GATINEAU',52,706,42);text(`001 / ${member}`,995,704,30);
 const t=new CanvasTexture(canvas);t.colorSpace=SRGBColorSpace;t.anisotropy=4;return t;
}

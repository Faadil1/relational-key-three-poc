import { CanvasTexture, SRGBColorSpace } from 'three';
import { collectibleCopy } from '../collectibleCopy.js';
import { cutBoundary } from '../familyModels/collectibleBatch.js';
const palettes={
 'metate-teotitlan':[['#30352f','#f0e7cf'],['#e6d8bc','#353b33']],
 'siku-bolivia':[['#ac442d','#fff1d6'],['#e4b64e','#412e2a']],
 'textile-bonwire':[['#1f4142','#f0d8a0'],['#efdbb3','#263e3c']],
 'boulle-france':[['#30241f','#e6c987'],['#d8b472','#30241f']],
};
function surface(id,member,back) {
 const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=756;
 const c=canvas.getContext('2d'),a=member==='A',copy=collectibleCopy[id],[bg,ink]=palettes[id][a?0:1];
 c.fillStyle=bg;c.fillRect(0,0,1200,756);
 // Deterministic printed-stock grain, never random frame-to-frame.
 for(let i=0;i<2400;i++){c.fillStyle=i%2?'#ffffff08':'#00000009';c.fillRect((i*137.3)%1200,(i*71.7)%756,1.4,1.4);}
 const text=(s,x,y,size=24,font='sans-serif')=>{c.fillStyle=ink;c.font=`${size>=48?'600':'500'} ${size}px ${font}`;c.fillText(s,x,y);};
 const line=(x,y,X,Y,color=ink,width=1)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.stroke();};
 text('RELATIONAL KEY',52,67,24);text(copy.region,740,67,20);line(52,91,1148,91);
 if(back){
  text('AU VERSO / '+copy.roles[a?0:1],58,151,24);
  // Wrap the editorial headline and explanatory lines, keeping a large reading size.
  c.font='600 61px Georgia';let words=copy.backTitle.split(' '),row='',y=239;
  for(const word of words){if(c.measureText(row+word).width>1040){text(row,58,y,61,'Georgia');row='';y+=72;}row+=word+' ';}text(row,58,y,61,'Georgia');
  copy.lines.forEach((s,i)=>text(s,58,400+i*48,25));
  text('SOURCE ET CONTEXTE SOUS LA PAIRE',58,582,21);
 } else {text(copy.titles[a?0:1],55,191,id==='boulle-france'?73:88,'Georgia');}
 line(52,641,1148,641);text(copy.place,52,686,28);text(copy.roles[a?0:1],52,726,20);text(`${copy.number} / ${member}`,1000,714,30);
 return {c,canvas,text,line,ink,bg,a,back};
}
function finish({canvas}){const t=new CanvasTexture(canvas);t.colorSpace=SRGBColorSpace;t.anisotropy=4;return t;}
export function metateArtwork(member,back,state) {
 const s=surface('metate-teotitlan',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const x=620+state.position*150;
  if(a){
   // Plan-view stone study: its offset remains visible even when contact is lifted.
   c.fillStyle='#222920';c.beginPath();c.ellipse(622,426,412,110,0,0,7);c.fill();
   c.fillStyle=state.contact?'#909584':'#b3b6a7';c.beginPath();c.roundRect(x-330,state.contact?342:302,660,125,58);c.fill();
   for(let i=0;i<350;i++){const X=x-297+(i*37.1)%594,Y=(state.contact?357:317)+(i*17.3)%92;c.fillStyle=i%3?'#454e3b66':'#dedac655';c.fillRect(X,Y,2.5,2.5);}
   line(300,548,930,548,ink,3);line(x,534,x,562,ink,6);
   text(state.contact?'EN CONTACT':'SOULEVÉE',60,594,25);
  }else{
   c.fillStyle='#626b55';c.beginPath();c.roundRect(202,266,812,296,58);c.fill();
   c.fillStyle='#464f3f';c.beginPath();c.roundRect(236,290,744,236,48);c.fill();
   for(let i=0;i<130;i++){const X=270+(i*93.7)%674,Y=322+(i*41.3)%170,ground=i/130<state.work;c.fillStyle=ground?'#e7d2a0':'#8d957c';c.beginPath();c.ellipse(X,Y,ground?18:5,ground?2:5,ground?-.1:0,0,7);c.fill();}
   line(x,288,x,526,state.contact?'#f0d797':'#879079',3);
   text(`TRACE REÇUE / ${Math.round(state.work*100)} %`,60,594,25);
  }
 }
 return finish(s);
}
export function sikuArtwork(member,back,state) {
 const s=surface('siku-bolivia',member,back),{c,text,line,ink,bg,a}=s;
 if(!back){
  const enabled=state.members!==(a?'B':'A');
  // Event columns are a score, explicitly not an instrument reconstruction.
  for(let i=0;i<8;i++){
   const x=100+i*140,owns=i%2===(a?0:1),events=state.events[i],contributed=events?.includes(member),other=events?.includes(a?'B':'A');
   c.globalAlpha=owns&&enabled?1:.28;
   line(x,265,x,470-(i%4)*29,ink,owns?23:2);
   c.beginPath();c.arc(x,252,owns?14:8,0,7);c.strokeStyle=ink;c.lineWidth=2;c.stroke();
   c.globalAlpha=1;
   if(contributed||other){c.fillStyle=contributed?ink:(a?'#e4b64e':'#ac442d');c.beginPath();c.arc(x,526,contributed?18:10,0,7);c.fill();}
   else{line(x-12,526,x+12,526,ink,events?4:1);}
   c.fillStyle=bg;
   if(contributed){c.font='bold 18px sans-serif';c.fillText(member,x-6,532);}
  }
  text(`${a?'IRA':'ARKA'} / ${enabled?'CONTRIBUTION ACTIVE':'VOIX RETIRÉE'}`,60,596,25);
 }
 return finish(s);
}
export function textileArtwork(member,back,state,mobile) {
 const s=surface('textile-bonwire',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const colors=a?['#b2693e','#dac180','#557b6a','#daa94d']:['#658379','#bd724b','#d8b66f','#345754'];
  // Plain lengthwise bands, no named, symbolic or copied kente motif.
  for(let n=0;n<40;n++){const x=105+n*25;c.fillStyle=colors[Math.floor(n/5)%4];c.fillRect(x,253,19,275);for(let y=255;y<530;y+=11){line(x,y,x+19,y,n%2?'#ffffff32':'#00000029',2);}}
  for(let n=0;n<7;n++){const x=178+n*139;c.fillStyle=ink;c.beginPath();c.arc(x,555,4,0,7);c.fill();if(n<state.stitches){line(x-20,534,x+20,572,ink,5);line(x+20,572,x+41,552,ink,2);}}
  for(let n=0;n<7;n++){
   const t=(n-3)*.19;
   if(n<state.stitches){
    if(mobile){const X=600+t*375;line(X-11,a?739:0,X+11,a?756:17,ink,5);}
    else{const Y=378-t*375;line(a?1168:0,Y-11,a?1200:32,Y+11,ink,5);}
   }
  }
  text(`LISIÈRE ${a?'A':'B'} / ${state.stitches} POINTS PARTAGÉS`,60,599,25);
 }
 return finish(s);
}
export function boulleArtwork(member,back,separated,matching) {
 const s=surface('boulle-france',member,back),{c,text,line,ink,bg,a}=s;
 if(!back){
  const x=160,y=243,w=880,h=333;
  c.fillStyle=bg;c.fillRect(x,y,w,h);c.strokeStyle=ink;c.lineWidth=2;c.strokeRect(x,y,w,h);
  c.beginPath();c.moveTo(x,y);for(let i=0;i<=180;i++){const t=i/180;c.lineTo(x+w*cutBoundary(t,!a&&!matching?1:0),y+h*t);}c.lineTo(x,y+h);c.closePath();
  if(separated){c.fillStyle=ink;c.fill();}else{c.setLineDash([8,9]);c.stroke();c.setLineDash([]);}
  // Engraved construction lines are original editorial marks.
  for(let i=1;i<6;i++)line(x,y+i*h/6,x+w,y+i*h/6,separated?(a?'#d7b66e55':'#30241f55'):ink,1);
  text(separated?(matching?'MÊME CONTOUR / MATIÈRES INVERSÉES':'DÉCOUPES DIFFÉRENTES'):'DEUX COUCHES / AVANT SÉPARATION',60,611,23);
 }
 return finish(s);
}

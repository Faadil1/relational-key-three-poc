import { CanvasTexture, SRGBColorSpace } from 'three';
import { collectibleCopy } from '../collectibleCopy.js';
import { cutBoundary } from '../familyModels/collectibleBatch.js';
const palettes={
 'metate-teotitlan':[['#30352f','#f0e7cf'],['#e6d8bc','#353b33']],
 'siku-bolivia':[['#ac442d','#fff1d6'],['#e4b64e','#412e2a']],
 'textile-bonwire':[['#1f4142','#f0d8a0'],['#efdbb3','#263e3c']],
 'boulle-france':[['#30241f','#e6c987'],['#d8b472','#30241f']],
 'frida-coyoacan':[['#2b1f20','#eed2a8'],['#dfc7a0','#312723']],
 'zellige-fes':[['#173739','#e2c476'],['#ead7a4','#174449']],
 'swell-marshall':[['#18343d','#c6e6df'],['#e4d6aa','#16404a']],
 'tongiaki-tonga':[['#253431','#e1bd78'],['#e0c996','#27383a']],
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

export function fridaArtwork(member,back,matching) {
 const s=surface('frida-coyoacan',member,back),{c,text,line,ink,a}=s;
 if(!back){
  if(a){
   c.strokeStyle=ink;c.lineWidth=17;c.beginPath();c.ellipse(430,365,215,165,0,0,7);c.stroke();
   c.fillStyle='#ffffff1a';c.beginPath();c.ellipse(430,365,180,132,0,0,7);c.fill();
   line(280,530,580,530,ink,9);line(340,530,250,620,ink,8);line(520,530,620,620,ink,8);
   const hit=matching?390:515;line(620,365,905,hit,ink,6);text(matching?'TRACE ORIENTÉE':'TRACE DÉCALÉE',60,596,25);
  }else{
   c.fillStyle='#d8c3a0';c.fillRect(315,230,520,335);c.strokeStyle=ink;c.lineWidth=9;c.strokeRect(315,230,520,335);
   line(575,565,575,640,ink,9);line(395,640,755,640,ink,8);line(405,640,300,710,ink,6);line(745,640,850,710,ink,6);
   c.strokeStyle=matching?'#9d443c':ink;c.lineWidth=matching?8:3;c.beginPath();c.arc(570,390,72,0.2,5.4);c.stroke();
   line(520,420,610,352,matching?'#9d443c':ink,matching?7:3);text(matching?'REGISTRE REÇU':'SURFACE EN ATTENTE',60,596,25);
  }
 }
 return finish(s);
}

export function zelligeArtwork(member,back,matching) {
 const s=surface('zellige-fes',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const colors=a?['#d3aa55','#51806d','#b9784c','#ead28d']:['#356a68','#d8b965','#8f9b72','#e9d69d'];
  for(let y=245;y<520;y+=92)for(let x=230;x<940;x+=92){c.fillStyle=colors[(x+y)%colors.length];c.save();c.translate(x,y);c.rotate(Math.PI/4);c.fillRect(-30,-30,60,60);c.restore();}
  if(a){
   c.fillStyle=ink;c.beginPath();c.moveTo(110,265);c.lineTo(440,265);c.lineTo(500,365);c.lineTo(440,465);c.lineTo(110,465);c.closePath();c.fill();
   text(matching?'PROFIL PRÊT À S’ASSEOIR':'PROFIL HORS ASSISE',60,596,25);
  }else{
   c.strokeStyle=ink;c.lineWidth=6;c.strokeRect(665,265,330,200);
   c.setLineDash([16,10]);line(665,365,995,365,ink,4);c.setLineDash([]);
   if(matching){c.fillStyle='#173739';c.beginPath();c.moveTo(665,265);c.lineTo(995,265);c.lineTo(935,365);c.lineTo(995,465);c.lineTo(665,465);c.closePath();c.fill();}
   text(matching?'ASSISE COMPLÈTE':'VIDE VISIBLE',60,596,25);
  }
 }
 return finish(s);
}

export function swellArtwork(member,back,matching) {
 const s=surface('swell-marshall',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const wave=(x0,y0,bend=0)=>{c.strokeStyle=ink;c.lineWidth=8;c.beginPath();c.moveTo(x0,y0);for(let x=0;x<760;x+=24)c.lineTo(x0+x,y0+Math.sin(x/80+bend)*18);c.stroke();};
  if(a){
   for(let i=0;i<5;i++)wave(190,270+i*62,i*.5);
   c.fillStyle='#9d8351';c.beginPath();c.ellipse(865,402,95,58,0,0,7);c.fill();line(845,260,845,535,ink,5);
   text('HOULE ENTRANTE',60,596,25);
  }else{
   c.fillStyle='#9d8351';c.beginPath();c.ellipse(395,402,95,58,0,0,7);c.fill();
   if(matching){for(let i=0;i<4;i++){c.strokeStyle=ink;c.lineWidth=8;c.beginPath();c.arc(450,350+i*45,170+i*22,-.9,.9);c.stroke();}line(610,402,940,402,ink,8);}
   else for(let i=0;i<5;i++)wave(360,270+i*62,i*.4);
   text(matching?'DÉFLEXION LISIBLE':'HOULE NON TRANSFORMÉE',60,596,25);
  }
 }
 return finish(s);
}

export function tongiakiArtwork(member,back,matching) {
 const s=surface('tongiaki-tonga',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const hull=(x,y,color)=>{c.fillStyle=color;c.beginPath();c.ellipse(x,y,285,58,0,0,7);c.fill();line(x-210,y+8,x+210,y+8,ink,5);};
  hull(a?450:750,330,a?'#7b5c3d':'#806846');
  hull(a?450:750,470,a?'#8e714c':'#765c42');
  if(matching){for(let x=390;x<=810;x+=70)line(x,330,x,470,ink,8);line(330,400,870,400,ink,10);}
  else{for(let x=340;x<=560;x+=74)line(x,330,x+30,470,ink,6);}
  c.strokeStyle=matching?'#7fb6b0':ink;c.lineWidth=5;c.beginPath();c.arc(600,400,245,0.16,2.98);c.stroke();
  text(matching?'PLATEFORME COUPLÉE':'COQUES SÉPARÉES',60,596,25);
 }
 return finish(s);
}

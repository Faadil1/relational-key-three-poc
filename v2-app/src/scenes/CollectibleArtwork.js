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
 'garamut-sepik-ramu':[['#2d2118','#e0ad78'],['#d7b98a','#2c1f17']],
 'khipu-peru':[['#2a2118','#e6bd80'],['#ead4aa','#35271b']],
 'mate-bombilla-argentina':[['#263a2e','#dfc58b'],['#ead8b0','#2c4233']],
 'hika-ahi-aotearoa':[['#302116','#f0b56d'],['#ead2a8','#38251a']],
 'music-box-sainte-croix':[['#241d16','#e6c586'],['#ead6a2','#30231a']],
 'funicular-valparaiso':[['#24302c','#d4a36f'],['#dfc79c','#26312d']],
 'signal-nigeria':[['#112c28','#7fd0aa'],['#dbe7d6','#14302e']],
 'astrolabe-isfahan':[['#21180f','#d7b06c'],['#e1c891','#2d2014']],
 'service-benin':[['#1d2d25','#d8bf78'],['#ead7a5','#213126']],
 'food-toyama':[['#262116','#d5b16d'],['#e0c48b','#203424']],
 'kento-japan':[['#332116','#e0b879'],['#eadccc','#2d251d']],
 'stereoscopy-uk':[['#1d2732','#8fb4d8'],['#ead0c6','#332127']],
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

export function garamutArtwork(member,back,matching) {
 const s=surface('garamut-sepik-ramu',member,back),{c,text,line,ink,a}=s;
 if(!back){
  if(a){
   c.fillStyle='#8b5f3c';c.save();c.translate(590,385);c.rotate(-.34);c.fillRect(-330,-42,660,84);c.restore();
   c.fillStyle=matching?'#f0bd82':'#735640';c.beginPath();c.arc(830,300,64,0,7);c.fill();
   line(190,540,910,540,ink,5);text(matching?'IMPACT ENREGISTRÉ':'BATTE SÉPARÉE',60,596,25);
  }else{
   c.fillStyle='#7d5438';c.beginPath();c.ellipse(610,384,380,122,0,0,7);c.fill();
   c.fillStyle='#25160f';c.fillRect(310,360,600,42);
   if(matching){for(let r=70;r<260;r+=45){c.strokeStyle=ink;c.lineWidth=5;c.beginPath();c.ellipse(330,384,r,r*.55,0,0,7);c.stroke();}}
   for(let i=0;i<5;i++)line(380+i*95,548,425+i*95,matching?500:535,ink,6);
   text(matching?'TRACE D’ÉVÉNEMENT':'CORPS SILENCIEUX',60,596,25);
  }
 }
 return finish(s);
}

export function khipuArtwork(member,back,tension,matching) {
 const s=surface('khipu-peru',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const strong=matching&&tension>=.72,settle=tension*42,offset=!matching&& !a?55:0;
  line(170,260,1030,260,ink,10);
  for(let i=0;i<6;i++){const x=220+i*145+((i%2?1:-1)*offset);line(x,260,x,535-settle*(i%3)/3,ink,7);for(let k=0;k<2;k++){c.strokeStyle=strong?'#e9bd77':ink;c.lineWidth=8;c.beginPath();c.arc(x,345+k*82-settle*.25,28,0,7);c.stroke();}}
  line(170,575,1030,575,strong?'#e9bd77':ink,strong?8:3);text(strong?'REGISTRE TENDU':'POSITIONS RÉSIDUELLES',60,620,25);
 }
 return finish(s);
}

export function mateArtwork(member,back,insertion,matching) {
 const s=surface('mate-bombilla-argentina',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const engaged=matching&&insertion>=.72;
  if(a){c.fillStyle='#6f4b30';c.beginPath();c.ellipse(585,405,300,165,0,0,7);c.fill();for(let i=0;i<38;i++){c.fillStyle=i%2?'#71805a':'#5d6d49';c.beginPath();c.arc(350+(i*73)%470,315+(i*41)%170,9+(i%3)*3,0,7);c.fill();}text('MILIEU PARTICULAIRE',60,596,25);}
  else{c.save();c.translate(585,370);c.rotate(-.8);c.strokeStyle=ink;c.lineWidth=22;c.beginPath();c.moveTo(0,-210);c.lineTo(0,170);c.stroke();c.fillStyle=engaged?'#d4c28f':'#8c908c';c.beginPath();c.ellipse(0,190,80,48,0,0,7);c.fill();c.restore();if(engaged)for(let i=0;i<5;i++){line(680+i*48,245,705+i*48,185,ink,5);}text(engaged?'PASSAGE SÉLECTIF':'FILTRE NON ENGAGÉ',60,596,25);}
 }
 return finish(s);
}

export function hikaArtwork(member,back,friction,matching) {
 const s=surface('hika-ahi-aotearoa',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const ember=matching&&friction>=.72,heat=matching?friction:friction*.4;
  if(a){c.save();c.translate(625,385);c.rotate(-.58-heat*.35);c.fillStyle='#9b6b3e';c.fillRect(-55,-260,110,520);c.restore();text(matching?'STROKE LOCALISÉ':'CONTACT DÉCALÉ',60,596,25);}
  else{c.fillStyle='#845832';c.fillRect(250,340,700,128);c.fillStyle='#2b1b12';c.fillRect(340,386,520,28);if(ember){c.fillStyle='#ffb45d';c.beginPath();c.arc(610,400,55,0,7);c.fill();c.fillStyle='#fff0bd';c.beginPath();c.arc(610,400,20,0,7);c.fill();}else{c.strokeStyle=ink;c.lineWidth=4;c.beginPath();c.arc(610,400,38,0,7);c.stroke();}text(ember?'TÉMOIN À L’INTERFACE':'CHALEUR NON STABLE',60,596,25);}
 }
 return finish(s);
}

export function musicBoxArtwork(member,back,{engaged=false,angle=0,pattern='A'}={}) {
 const s=surface('music-box-sainte-croix',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const active=engaged;
  if(a){
   c.fillStyle='#7f5a37';c.beginPath();c.ellipse(600,382,330,112,0,0,7);c.fill();
   for(let i=0;i<12;i++){const theta=(angle+i*31)%360*Math.PI/180,x=600+Math.cos(theta)*245,y=382+Math.sin(theta)*58;c.fillStyle=pattern==='A'?'#efd18d':'#b78f5c';c.beginPath();c.arc(x,y,10+(i%3)*3,0,7);c.fill();}
   line(250,535,950,535,active?'#f0d28a':ink,active?8:4);
   text(active?`CYLINDRE ENGAGÉ · ${Math.round(angle)}°`:'MÉMOIRE SÉPARÉE',60,596,25);
  }else{
   for(let i=0;i<9;i++){const x=310+i*70,h=120+i*10;c.fillStyle=active&&i%3===1?'#fff0bf':'#837d72';c.fillRect(x,430-h,28,h);}
   c.fillStyle='#6d6558';c.fillRect(260,430,690,56);
   if(active){for(let i=0;i<4;i++)line(380+i*130,245,380+i*130,310,'#f0d28a',7);}
   text(active?'DENTS EN RÉPONSE':'PEIGNE EN ATTENTE',60,596,25);
  }
 }
 return finish(s);
}

export function funicularArtwork(member,back,positionA=0) {
 const s=surface('funicular-valparaiso',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const p=a?positionA:1-positionA,y=505-p*260,otherY=505-(1-p)*260;
  line(360,235,360,530,ink,8);line(840,235,840,530,ink,8);
  for(let i=0;i<6;i++)line(310,255+i*48,890,255+i*48,'#ffffff33',2);
  c.fillStyle=a?'#9c6b45':'#75563f';c.beginPath();c.roundRect(270,y-42,250,84,12);c.fill();
  c.fillStyle='#2b302e';c.fillRect(322,y-20,92,32);
  c.strokeStyle='#d9bd83';c.lineWidth=6;c.beginPath();c.moveTo(520,y);c.bezierCurveTo(620,y-120,720,otherY+120,820,otherY);c.stroke();
  c.fillStyle='#8b7656';c.beginPath();c.roundRect(720,otherY-28,150,56,10);c.fill();
  text(a?`VOITURE A · ${Math.round(p*100)}%`:`RÉPONSE INVERSE · ${Math.round(p*100)}%`,60,596,25);
 }
 return finish(s);
}

export function signalArtwork(member,back,alignment=0,matching=false) {
 const s=surface('signal-nigeria',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const aligned=matching&&alignment>=.82;
  if(a){
   c.strokeStyle=aligned?'#7fd0aa':ink;c.lineWidth=12;c.beginPath();c.arc(450,360,145,-.55,3.9);c.stroke();
   line(450,500,450,610,ink,8);line(338,610,562,610,ink,7);
   const dx=(1-alignment)*130;line(535,315,875+dx,280,aligned?'#7fd0aa':'#9b6b5f',aligned?7:4);
   text(aligned?'CAPTURE ALIGNÉE':'CAPTURE DÉCALÉE',60,596,25);
  }else{
   const xs=[330,600,870];
   xs.forEach((x,i)=>{c.fillStyle=aligned||i<2?'#3e8c70':'#8b504a';c.fillRect(x-20,310-i*18,40,160);c.beginPath();c.arc(x,292-i*18,26,0,7);c.fill();});
   line(xs[0],292,xs[1],274,aligned?'#7fd0aa':'#76857d',6);
   line(xs[1],274,xs[2],256,aligned?'#7fd0aa':'#9b4e48',6);
   if(aligned)for(let i=0;i<4;i++)line(885+i*30,256,910+i*30,240,'#7fd0aa',5);
   text(aligned?'HANDOFF COMPLET':'CHAÎNE INTERROMPUE',60,596,25);
  }
 }
 return finish(s);
}

export function astrolabeArtwork(member,back,angle=0,plateMode='other') {
 const s=surface('astrolabe-isfahan',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const local=plateMode==='local',cx=600,cy=385;
  c.strokeStyle=ink;c.lineWidth=8;c.beginPath();c.arc(cx,cy,185,0,7);c.stroke();
  c.lineWidth=3;for(let r=60;r<=150;r+=30){c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();}
  if(a){
   c.save();c.translate(cx,cy);c.rotate(angle*Math.PI/180);
   for(let i=0;i<8;i++){const th=i*Math.PI/4;line(0,0,Math.cos(th)*170,Math.sin(th)*170,ink,4);c.fillStyle='#e7c37b';c.beginPath();c.arc(Math.cos(th+.22)*120,Math.sin(th+.22)*120,9,0,7);c.fill();}
   c.restore();text(`RETE ROTATIF · ${Math.round(angle)}°`,60,596,25);
  }else{
   for(let y=-120;y<=120;y+=60)line(cx-150+Math.abs(y)*.35,cy+y,cx+150-Math.abs(y)*.35,cy+y,local?'#e1c891':'#9f7654',5);
   line(cx-170,cy+(local?-22:42),cx+170,cy+(local?-22:42),local?'#f0d89c':ink,8);
   text(local?'HORIZON LOCAL ACTIF':'AUTRE PLATEAU VALIDE',60,596,25);
  }
 }
 return finish(s);
}

export function serviceArtwork(member,back,contact=0,matching=false) {
 const s=surface('service-benin',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const registered=matching&&contact>=.72;
  if(a){
   c.fillStyle='#d8c99f';c.beginPath();c.roundRect(260,260,680,260,24);c.fill();
   c.fillStyle='#1d7b55';c.fillRect(280,282,640,34);
   c.fillStyle='#c9a34e';c.fillRect(650,355,190,112);
   for(let y=0;y<2;y++)for(let x=0;x<3;x++){c.fillStyle='#ead18a';c.fillRect(678+x*48,382+y*38,30,24);}
   line(305,560,895,560,registered?'#d8b35f':ink,registered?8:4);
   text(registered?'CONTACT ENREGISTRÉ':'CONTACT DÉCALÉ',60,596,25);
  }else{
   c.fillStyle='#1b1812';c.beginPath();c.roundRect(300,245,600,330,28);c.fill();
   c.fillStyle=registered?'#255d42':'#10100d';c.fillRect(390,420,420,95);
   for(let y=0;y<2;y++)for(let x=0;x<3;x++){c.fillStyle=registered?'#c9a34e':'#453a27';c.fillRect(425+x*120,295+y*55,70,38);}
   if(registered)for(let i=0;i<4;i++)line(460+i*90,540,520+i*90,540,'#58b17c',7);
   text(registered?'FENÊTRE SERVICE OUVERTE':'LECTEUR EN ATTENTE',60,596,25);
  }
 }
 return finish(s);
}

export function foodArtwork(member,back,release=0,matching=false) {
 const s=surface('food-toyama',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const revealed=matching&&release>=.72,fan=revealed?1:release*.35;
  if(a){
   c.fillStyle='#c7a16f';c.beginPath();c.ellipse(590,390,255,120,0,0,7);c.fill();
   c.fillStyle='#5e5a4f';c.beginPath();c.ellipse(590,310-release*65,120,45,0,0,7);c.fill();
   line(350,390,830,390,ink,9);line(590,250,590,535,revealed?'#d8bd7c':ink,revealed?8:4);
   text(revealed?'CONTRAINTE RELÂCHÉE':'PAQUET CONTRAINT',60,596,25);
  }else{
   c.fillStyle='#c6a271';c.beginPath();c.ellipse(590,400,245,118,0,0,7);c.fill();
   for(let i=-3;i<=3;i++){c.save();c.translate(590,392);c.rotate(i*.28*fan);c.fillStyle=i%2?'#4d7448':'#315d39';c.fillRect(-18,-175,36,260);c.restore();}
   c.fillStyle=revealed?'#d98667':'#274f31';c.beginPath();c.ellipse(590,405,125,55,0,0,7);c.fill();
   text(revealed?'RÉVÉLATION OUVERTE':'FEUILLE FERMÉE',60,596,25);
  }
 }
 return finish(s);
}

export function kentoArtwork(member,back,offset=0,pressed=false,matching=false) {
 const s=surface('kento-japan',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const registered=matching&&Math.abs(offset)<=.08,shift=offset*230;
  if(a){
   c.fillStyle='#493020';c.fillRect(255,250,690,300);
   c.fillStyle='#d0a566';c.fillRect(715,365,180,24);c.fillRect(690,380,24,190);
   c.strokeStyle='#8a5d3c';c.lineWidth=18;c.beginPath();c.arc(460,390,105,.2,5.1);c.stroke();
   text(registered?'KENTŌ ALIGNÉ':'REPÈRE DÉCALÉ',60,596,25);
  }else{
   c.fillStyle='#e5dcc8';c.fillRect(280,250,640,315);
   c.fillStyle='#7b6544';c.fillRect(350+shift,365+shift*.25,180,18);c.fillRect(350+shift,380+shift*.25,18,170);
   if(pressed){c.fillStyle=registered?'#557e91cc':'#d98e8bcc';c.fillRect(430+shift,350+shift*.15,330,82);c.fillStyle=registered?'#b67f52cc':'#7da7d9aa';c.fillRect(470+shift,456+shift*.15,280,72);}
   text(pressed?(registered?'TRANSFERT JUSTE':'TRANSFERT OFF-REGISTER'):'FEUILLE EN ATTENTE',60,596,25);
  }
 }
 return finish(s);
}

export function stereoscopyArtwork(member,back,disparity=.72,matching=false) {
 const s=surface('stereoscopy-uk',member,back),{c,text,line,ink,a}=s;
 if(!back){
  const controlled=matching&&disparity<=.24,side=a?-1:1,shift=side*disparity*80;
  c.fillStyle='#252c33';c.fillRect(255,240,690,335);
  for(let i=0;i<4;i++){const x=365+i*120+shift*(i*.18);c.fillStyle=i%2?'#d7c48e':a?'#7da7d9':'#d98e8b';c.fillRect(x,300,34,220);c.beginPath();c.arc(x+17,292,45,Math.PI,0);c.strokeStyle=c.fillStyle;c.lineWidth=10;c.stroke();}
  c.fillStyle=controlled?'#e0b36a':a?'#7da7d9':'#d98e8b';c.globalAlpha=controlled?.82:.35;c.fillRect(515+shift*.2,360,170,118);c.globalAlpha=1;
  if(controlled){line(350,565,850,565,'#e0b36a',8);line(455,525,745,320,'#e0b36a',4);}
  text(controlled?'DISPARITÉ CONTRÔLÉE':'VUE PLATE ACTIVE',60,596,25);
 }
 return finish(s);
}

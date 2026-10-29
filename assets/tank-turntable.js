/* GuideHollow Weapons — 360° concept turntable, canvas geometry, no external libraries.
   A stylized visualization, not an exact K2 CAD model or an AI photograph. */
(()=>{'use strict';
const root=document.querySelector('[data-tank-turntable]'); if(!root)return;
const canvas=root.querySelector('canvas');const ctx=canvas?.getContext('2d',{alpha:false}); if(!ctx)return;
const play=root.querySelector('[data-turn-play]'),reset=root.querySelector('[data-turn-reset]');
const degree=root.querySelector('[data-turn-degree]');const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const bg='#111c2b';
const palettes={
 armor:'#5e756a', armorTop:'#758a7c', armorDark:'#334b46', armorEdge:'#849789',
 dark:'#172c30', metal:'#7f9692', black:'#172128', tread:'#232d31', wheel:'#29363a',hub:'#85948c', bronze:'#acb6a0', optics:'#6baea6'
};
const faces=[],lines=[];
function poly(points,color,shade=1){faces.push({points,color,shade});}
function line(a,b,color,width=1){lines.push({a,b,color,width});}
function box(cx,cy,cz,wx,hy,lz,color){const x=cx-wx/2,X=cx+wx/2,y=cy-hy/2,Y=cy+hy/2,z=cz-lz/2,Z=cz+lz/2;
const a=[x,y,z],b=[X,y,z],c=[X,Y,z],d=[x,Y,z],e=[x,y,Z],f=[X,y,Z],g=[X,Y,Z],h=[x,Y,Z];
poly([d,c,g,h],color,1.14);poly([e,f,g,h],color,.88);poly([a,b,c,d],color,.96);poly([a,d,h,e],color,.85);poly([b,f,g,c],color,.91);poly([a,e,f,b],color,.58);
}
function cylinderX(cx,cy,cz,r,depth,col,segments=16,hub=false){
for(let i=0;i<segments;i++){const u=i/segments*Math.PI*2,v=(i+1)/segments*Math.PI*2;
 const ya=cy+Math.cos(u)*r, za=cz+Math.sin(u)*r, yb=cy+Math.cos(v)*r,zb=cz+Math.sin(v)*r;
 poly([[cx-depth/2,ya,za],[cx+depth/2,ya,za],[cx+depth/2,yb,zb],[cx-depth/2,yb,zb]],col,.93);
 poly([[cx+depth/2,ya,za],[cx+depth/2,yb,zb],[cx,cy,cz]],col,1.08);
 poly([[cx-depth/2,ya,za],[cx,cy,cz],[cx-depth/2,yb,zb]],col,.94);
}
if(hub){for(let i=0;i<8;i++){const u=i*Math.PI/4,v=(i+1)*Math.PI/4;
poly([[cx+Math.sign(cx)*depth/2+Math.sign(cx)*.018,cy+Math.cos(u)*r*.52,cz+Math.sin(u)*r*.52],[cx+Math.sign(cx)*depth/2+Math.sign(cx)*.018,cy+Math.cos(v)*r*.52,cz+Math.sin(v)*r*.52],[cx+Math.sign(cx)*depth/2+Math.sign(cx)*.018,cy,cz]],palettes.hub,1.07);}}
}
function cylinderZ(cx,cy,z1,z2,r,col,segments=14){for(let i=0;i<segments;i++){let u=i/segments*Math.PI*2,v=(i+1)/segments*Math.PI*2;
const x1=cx+Math.cos(u)*r,y1=cy+Math.sin(u)*r,x2=cx+Math.cos(v)*r,y2=cy+Math.sin(v)*r;
poly([[x1,y1,z1],[x2,y2,z1],[x2,y2,z2],[x1,y1,z2]],col,1);
poly([[x1,y1,z1],[cx,cy,z1],[x2,y2,z1]],col,1.04);}}
function wedgeTower(zA,zB,low,high,widthLo,widthHi,color){let a=widthLo/2,b=widthHi/2;
const B=[[-a,low,zA],[a,low,zA],[a,low,zB],[-a,low,zB]],T=[[-b,high,zA+.28],[b,high,zA+.28],[b,high,zB-.28],[-b,high,zB-.28]];
poly([T[0],T[1],T[2],T[3]],color,1.23);poly([B[0],B[1],T[1],T[0]],color,.92);poly([B[1],B[2],T[2],T[1]],color,.87);poly([B[2],B[3],T[3],T[2]],color,.7);poly([B[3],B[0],T[0],T[3]],color,.8);
}
// 3D silhouette: body, track suspension, torsion wheels, layered armor, turret, optic units, barrel.
box(0,.65,0,3.17,.60,6.2,palettes.armorDark);
box(0,1.06,.25,2.95,.62,5.85,palettes.armor);
// sloped glacis, bow is negative Z
poly([[-1.45,.77,-3.35],[1.45,.77,-3.35],[1.45,1.20,-2.45],[-1.45,1.20,-2.45]],palettes.armorTop,1.1);
poly([[-1.47,1.20,-2.45],[1.47,1.20,-2.45],[1.47,1.33,2.8],[-1.47,1.33,2.8]],palettes.armor,1.12);
for(let s of [-1,1]){
const x=s*1.62;box(x,.53,0,.58,.75,6.20,palettes.tread);
box(x,.93,0,.6,.20,5.80,palettes.dark);
// five protected side armor panel blocks; restrained details
for(let j=0;j<5;j++){box(s*1.76,1.10,-2.3+j*1.12,.22,.48,1.05,j%2?palettes.armor:palettes.armorDark);}
for(let j=0;j<7;j++){cylinderX(s*1.83,.33,-2.55+j*.85,.36,.11,palettes.wheel,16,true);}
for(let j=0;j<2;j++){cylinderX(s*1.83,.48,(j===0?-2.93:2.92),.29,.11,palettes.wheel,14,true)}
// outer tread guide bars
line([s*1.95,.14,-2.85],[s*1.95,.14,2.85],'#8aa49c',1.5);
line([s*1.95,.84,-2.82],[s*1.95,.84,2.82],'#536a65',1.2);
for(let j=0;j<12;j++)box(s*1.83,.88,-2.78+j*.50,.58,.12,.20,palettes.black);
}
// rear deck exhaust grid and hatches
box(0,1.40,2.36,2.70,.12,1.07,palettes.armorDark);
for(let j=0;j<10;j++)box(-1.12+j*.245,1.478,2.35,.055,.025,.74,palettes.black);
// headlamp boxes, front panel
for(let s of [-1,1]){box(s*1.30,1.00,-3.12,.35,.15,.16,palettes.bronze);box(s*1.22,.90,-3.19,.14,.11,.12,palettes.optics)}
// angular turret base & upper module
box(0,1.62,-.23,2.55,.35,3.37,palettes.armorDark);
wedgeTower(-2.10,1.14,1.68,2.45,2.78,1.83,palettes.armor);
// turret front beveled armor blocks
for(let s of [-1,1]){
box(s*1.18,1.95,-1.31,.49,.55,1.20,palettes.armorDark);
box(s*.88,2.27,-.76,.31,.14,.58,palettes.armorTop);
}
// hatches & command module
cylinderX(0,2.52,-.25,.33,.45,palettes.armorDark,14,false);
box(.45,2.60,-.35,.68,.18,.7,palettes.black);
box(.51,2.67,-.42,.49,.12,.39,palettes.armor);
// barrel collar and elongated frontal cannon
cylinderZ(0,1.98,-2.25,-3.06,.36,palettes.armorDark,18);
cylinderZ(0,1.98,-3.05,-6.18,.165,palettes.metal,18);
cylinderZ(0,1.98,-6.18,-6.43,.205,palettes.black,18);
cylinderZ(0,1.98,-6.43,-6.52,.24,palettes.armorDark,18);
// ancillary visual-only optic units
box(-.69,2.53,-.97,.30,.34,.42,palettes.black);
box(-.69,2.55,-1.23,.23,.21,.07,palettes.optics);
// antennae and hand-rail
line([.9,2.33,.65],[.9,3.57,.65],'#9cae9e',1.5);
line([-.98,2.25,.6],[-.98,3.40,.6],'#829590',1.4);
line([1.0,2.05,-1.65],[1.28,2.05,-1.65],'#b2c4ad',1);
const hex=(str)=>{str=str.replace('#','');return [parseInt(str.slice(0,2),16),parseInt(str.slice(2,4),16),parseInt(str.slice(4,6),16)]};
const light=[-.55,.8,-.65];const norm3=v=>{let l=Math.hypot(...v)||1;return v.map(n=>n/l)};
const lunit=norm3(light);let angle=0.78,target=angle,velocity=0,down=false,startX=0,lastX=0,auto=true,visible=true,w=650,h=420,ratio=1,prev=0,frame=null;
function point(p){let ca=Math.cos(angle),sa=Math.sin(angle);let x=ca*p[0]+sa*p[2],z=-sa*p[0]+ca*p[2],y=p[1];const e=.32;let yy=y*Math.cos(e)+z*Math.sin(e),zz=-y*Math.sin(e)+z*Math.cos(e);const perspective=12/(12+zz*.43);const scale=Math.min(w/14.4,h/6.4);return {x:w*.53+x*scale*perspective,y:h*.58-yy*scale*perspective,z:zz,wx:x,wy:yy};}
function normal(points){let a=points[0],b=points[1],c=points[2],v=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],u=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];return norm3([v[1]*u[2]-v[2]*u[1],v[2]*u[0]-v[0]*u[2],v[0]*u[1]-v[1]*u[0]])}
function lit(color,n,shade){const base=hex(color);const brightness=Math.max(.49,Math.min(1.24,(.75 + Math.abs(n[0]*lunit[0]+n[1]*lunit[1]+n[2]*lunit[2])*.24)*shade));return 'rgb('+base.map(v=>Math.min(244,Math.round(v*brightness))).join(',')+')'}
const surfaces=faces.map(f=>({...f,normal:normal(f.points)}));
function draw(){ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
const sorted=surfaces.map(f=>({...f,p:f.points.map(point)})).sort((a,b)=>b.p.reduce((s,p)=>s+p.z,0)/b.p.length-a.p.reduce((s,p)=>s+p.z,0)/a.p.length);
for(let f of sorted){let p=f.p;ctx.beginPath();ctx.moveTo(p[0].x,p[0].y);for(let i=1;i<p.length;i++)ctx.lineTo(p[i].x,p[i].y);ctx.closePath();ctx.fillStyle=lit(f.color,f.normal,f.shade);ctx.fill();ctx.strokeStyle='rgba(7,18,20,.26)';ctx.lineWidth=.72;ctx.stroke();}
// antenna shafts, edge detail laid over surfaces
for(let item of lines){let a=point(item.a),b=point(item.b);ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=item.color;ctx.lineWidth=item.width;ctx.stroke();}
let a=(angle*180/Math.PI)%360;if(a<0)a+=360;if(degree)degree.textContent=String(Math.round(a)).padStart(3,'0')+'°';
}
function resize(){const r=canvas.getBoundingClientRect();w=Math.max(250,Math.round(r.width));h=Math.max(180,Math.round(r.height));ratio=Math.min(window.devicePixelRatio||1,2);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);draw();}
function loop(ts){frame=requestAnimationFrame(loop);if(!visible)return;let dt=Math.min(.08,(ts-(prev||ts))/1000);prev=ts;if(auto&&!down&&!reduced.matches)target+=dt*.34;let delta=target-angle;angle+=delta*Math.min(1,dt*16);if(Math.abs(delta)>0.0001 || auto)draw();}
function setPlay(v){auto=v;root.classList.toggle('turn-paused',!v);if(play){play.textContent=v?'일시정지':'자동 회전';play.setAttribute('aria-pressed',String(v))} }
function pointerDown(e){down=true;startX=lastX=e.clientX;velocity=0;canvas.setPointerCapture?.(e.pointerId);root.classList.add('is-dragging');}
function pointerMove(e){if(!down)return;let dx=e.clientX-lastX;lastX=e.clientX;velocity=dx;target+=dx*.009;angle=target;draw();}
function pointerEnd(){if(!down)return;down=false;root.classList.remove('is-dragging');if(Math.abs(velocity)>5&&auto)target+=velocity*.02;}
canvas.addEventListener('pointerdown',pointerDown);canvas.addEventListener('pointermove',pointerMove);canvas.addEventListener('pointerup',pointerEnd);canvas.addEventListener('pointercancel',pointerEnd);canvas.addEventListener('lostpointercapture',pointerEnd);
canvas.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();target+=(e.key==='ArrowRight'?.18:-.18);angle=target;draw();} });
play?.addEventListener('click',()=>setPlay(!auto));reset?.addEventListener('click',()=>{target=angle=0.78;draw()});
if(reduced.matches)setPlay(false);reduced.addEventListener?.('change',e=>{if(e.matches)setPlay(false)});
new ResizeObserver(resize).observe(canvas);new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;if(visible)draw()},{threshold:.02}).observe(root);
resize();frame=requestAnimationFrame(loop);
})();
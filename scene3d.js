/*
 * BUSSY 67! — Three.js Chapter 01 foundation.
 * One transparent WebGL scene behind the existing accessible HTML.
 * Uses the original bus.png as a texture; no original media is replaced.
 */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

export async function createLandingExperience({mount,landingScene,gsap,ScrollTrigger}){
 if(!mount||!landingScene||!gsap||!ScrollTrigger)throw new Error("Missing 3D mount or animation dependencies.");
 const reduced=matchMedia("(prefers-reduced-motion: reduce)").matches;
 const mobile=matchMedia("(max-width: 620px)").matches;
 const lowPower=(navigator.hardwareConcurrency||4)<=4;
 const pixelCap=reduced||lowPower?1.25:mobile?1.5:1.8;
 let disposed=false,pageVisible=!document.hidden,sceneVisible=true,raf=0,last=0;
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);
 camera.position.set(0,0,8.6);
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:!lowPower,powerPreference:"high-performance",stencil:false,depth:true});
 renderer.setPixelRatio(Math.min(devicePixelRatio||1,pixelCap));
 renderer.setSize(mount.clientWidth||innerWidth,mount.clientHeight||innerHeight,false);
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.15;
 mount.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0x9dbdff,1.15));
 const key=new THREE.DirectionalLight(0xffe2b5,2.4);key.position.set(-4,5,7);scene.add(key);

 // Procedural stylized Earth texture; illustrative rather than geographic data.
 const mapCanvas=document.createElement("canvas");mapCanvas.width=1024;mapCanvas.height=512;
 const ctx=mapCanvas.getContext("2d"),ocean=ctx.createLinearGradient(0,0,1024,512);
 ocean.addColorStop(0,"#174b83");ocean.addColorStop(.5,"#0b2c59");ocean.addColorStop(1,"#06162f");
 ctx.fillStyle=ocean;ctx.fillRect(0,0,1024,512);
 const land=ctx.createLinearGradient(0,80,0,450);land.addColorStop(0,"#8aab72");land.addColorStop(.55,"#527d59");land.addColorStop(1,"#b2a477");ctx.fillStyle=land;
 const shapes=[
 [[115,112],[160,76],[213,83],[240,121],[218,151],[190,170],[178,215],[145,230],[123,190],[93,165]],
 [[205,235],[247,250],[260,302],[238,355],[215,397],[192,350],[181,296]],
 [[420,105],[462,81],[501,95],[518,131],[489,158],[455,150]],
 [[480,172],[529,183],[550,236],[534,300],[501,350],[475,306],[458,245]],
 [[610,110],[656,87],[712,100],[750,133],[725,167],[681,176],[650,151]],
 [[690,208],[735,205],[765,250],[745,310],[709,329],[682,279]],
 [[820,300],[860,278],[895,302],[886,339],[846,350]]
 ];
 shapes.forEach(p=>{ctx.beginPath();p.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.fill();});
 const ice=ctx.createLinearGradient(0,0,0,65);ice.addColorStop(0,"rgba(225,242,255,.92)");ice.addColorStop(1,"rgba(225,242,255,0)");ctx.fillStyle=ice;ctx.fillRect(0,0,1024,65);
 const earthMap=new THREE.CanvasTexture(mapCanvas);earthMap.colorSpace=THREE.SRGBColorSpace;earthMap.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
 const earthGroup=new THREE.Group();earthGroup.position.set(mobile?-.75:-3.25,mobile?.72:-.25,mobile?-1.8:-1.35);earthGroup.scale.setScalar(mobile?.58:1);scene.add(earthGroup);
 const earth=new THREE.Mesh(new THREE.SphereGeometry(2.05,lowPower?40:64,lowPower?32:48),new THREE.MeshStandardMaterial({map:earthMap,roughness:.92,metalness:.02}));earthGroup.add(earth);
 earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(2.13,48,32),new THREE.MeshBasicMaterial({color:0x56aaff,transparent:true,opacity:.19,side:THREE.BackSide,blending:THREE.AdditiveBlending,depthWrite:false})));
 earthGroup.add(new THREE.Mesh(new THREE.SphereGeometry(2.17,48,32),new THREE.MeshBasicMaterial({color:0x9bdcff,transparent:true,opacity:.075,side:THREE.BackSide,depthWrite:false})));

 const count=lowPower?420:mobile?650:1050,positions=new Float32Array(count*3);
 for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*24;positions[i*3+1]=(Math.random()-.5)*13;positions[i*3+2]=-7-Math.random()*16;}
 const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
 const stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xdceaff,size:.035,transparent:true,opacity:.88,depthWrite:false}));scene.add(stars);

 const busTexture=await new Promise((resolve,reject)=>new THREE.TextureLoader().load("assets/images/bus.png",resolve,undefined,reject));
 if(disposed){busTexture.dispose();renderer.dispose();return null;}
 busTexture.colorSpace=THREE.SRGBColorSpace;busTexture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
 const bus=new THREE.Mesh(new THREE.PlaneGeometry(3.05,1.9),new THREE.MeshBasicMaterial({map:busTexture,transparent:true,alphaTest:.025,side:THREE.DoubleSide,depthWrite:false}));
 bus.position.set(mobile?.35:1.7,mobile?-1.48:-1.35,mobile?.85:1.25);bus.scale.setScalar(mobile?.62:1);bus.rotation.z=-.045;scene.add(bus);
 const glow=new THREE.PointLight(0x4c9fff,18,12,2);glow.position.set(-1.6,1.8,3.5);scene.add(glow);

 const cameraTween=gsap.fromTo(camera.position,{z:8.6,x:0,y:0},{z:7.7,x:.22,y:.12,ease:"none",scrollTrigger:{trigger:landingScene,start:"top top",end:"bottom top",scrub:1.2}});
 let busFloat=null,earthSpin=null;
 if(!reduced){busFloat=gsap.to(bus.position,{y:"-=.11",duration:3.4,ease:"sine.inOut",yoyo:true,repeat:-1});earthSpin=gsap.to(earth.rotation,{y:Math.PI*2,duration:150,ease:"none",repeat:-1});}
 const resize=()=>{if(disposed)return;const w=Math.max(1,mount.clientWidth||innerWidth),h=Math.max(1,mount.clientHeight||innerHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,pixelCap));renderer.setSize(w,h,false);};
 const observer=new IntersectionObserver(entries=>{sceneVisible=!!entries[0]?.isIntersecting;},{threshold:.01});observer.observe(landingScene);
 const visibility=()=>{pageVisible=!document.hidden;if(pageVisible)last=0;};
 addEventListener("resize",resize,{passive:true});document.addEventListener("visibilitychange",visibility);resize();
 const render=time=>{if(disposed)return;raf=requestAnimationFrame(render);if(!pageVisible||!sceneVisible||time-last<33)return;last=time;stars.rotation.y+=reduced?0:.00012;renderer.render(scene,camera);};
 raf=requestAnimationFrame(render);
 return{dispose(){
  if(disposed)return;disposed=true;cancelAnimationFrame(raf);observer.disconnect();removeEventListener("resize",resize);document.removeEventListener("visibilitychange",visibility);
  cameraTween.scrollTrigger?.kill();cameraTween.kill();busFloat?.kill();earthSpin?.kill();
  scene.traverse(o=>{o.geometry?.dispose();if(o.material){const list=Array.isArray(o.material)?o.material:[o.material];list.forEach(m=>{Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose();});m.dispose();});}});
  renderer.dispose();renderer.domElement.remove();
 }};
}

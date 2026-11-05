/*
 * BUSSY 67! — Three.js Chapter 01 foundation.
 * One transparent WebGL scene behind the existing accessible HTML.
 * Uses the original bus.png as a texture; no original media is replaced.
 */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/loaders/GLTFLoader.js";

export async function createStoryExperience({mount,landingScene,travelScene,surfaceScene,lrvScene,alsepScene,gsap,ScrollTrigger}){
 if(!mount||!landingScene||!travelScene||!surfaceScene||!lrvScene||!alsepScene||!gsap||!ScrollTrigger)throw new Error("Missing 3D mount, story scenes or animation dependencies.");
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
 renderer.shadowMap.enabled=true;
 renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=1.15;
 mount.appendChild(renderer.domElement);
 scene.add(new THREE.AmbientLight(0x9dbdff,1.15));
 const key=new THREE.DirectionalLight(0xffe2b5,2.4);
 key.position.set(-4,5,7);key.castShadow=true;
 key.shadow.mapSize.set(1024,1024);
 key.shadow.camera.left=-24;key.shadow.camera.right=24;
 key.shadow.camera.top=24;key.shadow.camera.bottom=-24;
 scene.add(key);

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
 // A realistic lunar globe using NASA's LRO/LROC 2025 color map.
 // NASA SVS CGI Moon Kit: https://svs.gsfc.nasa.gov/4720/
 // 2K map (2048x1024); a procedural crater map remains available if the CDN fails.
 const moonCanvas=document.createElement("canvas");moonCanvas.width=1024;moonCanvas.height=512;
 const moonCtx=moonCanvas.getContext("2d");
 const moonBase=moonCtx.createLinearGradient(0,0,1024,512);
 moonBase.addColorStop(0,"#a09d96");moonBase.addColorStop(.5,"#77756f");moonBase.addColorStop(1,"#aaa69d");
 moonCtx.fillStyle=moonBase;moonCtx.fillRect(0,0,1024,512);
 for(let i=0;i<430;i++){
   const x=Math.random()*1024,y=Math.random()*512,r=2+Math.random()*19;
   const crater=moonCtx.createRadialGradient(x-r*.22,y-r*.25,r*.12,x,y,r);
   crater.addColorStop(0,"rgba(47,47,46,.46)");crater.addColorStop(.55,"rgba(83,82,78,.23)");
   crater.addColorStop(.82,"rgba(190,187,178,.12)");crater.addColorStop(1,"rgba(45,45,44,.2)");
   moonCtx.fillStyle=crater;moonCtx.beginPath();moonCtx.arc(x,y,r,0,Math.PI*2);moonCtx.fill();
 }
 const fallbackMoonMap=new THREE.CanvasTexture(moonCanvas);
 fallbackMoonMap.colorSpace=THREE.SRGBColorSpace;
 fallbackMoonMap.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
 const moonMaterial=new THREE.MeshStandardMaterial({map:fallbackMoonMap,bumpMap:fallbackMoonMap,bumpScale:.035,roughness:1,metalness:0});
 const moonGroup=new THREE.Group();
 moonGroup.position.set(mobile?1.0:4.8,mobile?1.35:.45,-2.55);
 moonGroup.scale.setScalar(.075);
 scene.add(moonGroup);
 const moon=new THREE.Mesh(new THREE.SphereGeometry(2.05,lowPower?48:72,lowPower?36:56),moonMaterial);
 moonGroup.add(moon);
 const moonTextureUrl="https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/lroc_color_2k.jpg";
 const moonLoader=new THREE.TextureLoader();moonLoader.setCrossOrigin("anonymous");
 const releaseFallbackMoonMap=()=>{
   if(moonMaterial.map!==fallbackMoonMap&&moonMaterial.bumpMap!==fallbackMoonMap)fallbackMoonMap.dispose();
 };
 moonLoader.load(moonTextureUrl,texture=>{
   if(disposed){texture.dispose();return;}
   texture.colorSpace=THREE.SRGBColorSpace;
   texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
   moonMaterial.map=texture;
   moonMaterial.needsUpdate=true;
   releaseFallbackMoonMap();
 },undefined,()=>{ /* The procedural crater texture remains as a graceful offline fallback. */ });
 // NASA LOLA elevation map adds genuine crater and terrain relief through bump mapping.
 const heightLoader=new THREE.TextureLoader();heightLoader.setCrossOrigin("anonymous");
 heightLoader.load("https://svs.gsfc.nasa.gov/vis/a000000/a004700/a004720/ldem_3_8bit.jpg",texture=>{
   if(disposed){texture.dispose();return;}
   texture.colorSpace=THREE.NoColorSpace;
   texture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);
   moonMaterial.bumpMap=texture;
   moonMaterial.bumpScale=.045;
   moonMaterial.needsUpdate=true;
   releaseFallbackMoonMap();
 },undefined,()=>{ /* Keep the color map and its subtle procedural relief if height data is unavailable. */ });


 const count=lowPower?420:mobile?650:1050,positions=new Float32Array(count*3);
 for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*24;positions[i*3+1]=(Math.random()-.5)*13;positions[i*3+2]=-7-Math.random()*16;}
 const starGeometry=new THREE.BufferGeometry();starGeometry.setAttribute("position",new THREE.BufferAttribute(positions,3));
 const stars=new THREE.Points(starGeometry,new THREE.PointsMaterial({color:0xdceaff,size:.035,transparent:true,opacity:.88,depthWrite:false}));scene.add(stars);

 // Build BUSSY as a real low-poly 3D school bus from reusable Three.js meshes.
 // This replaces the flat PNG plane; the original PNG remains untouched in assets.
 const bus=new THREE.Group();
 bus.position.set(mobile?.35:1.7,mobile?-1.48:-1.35,mobile?.85:1.25);
 bus.scale.setScalar(mobile?.62:.94);
 bus.rotation.y=-.34;
 bus.rotation.z=-.035;
 scene.add(bus);

 const mat=(color,roughness=.72,metalness=.02)=>new THREE.MeshStandardMaterial({color,roughness,metalness});
 const yellow=mat(0xffc928,.58),yellowLight=mat(0xffdc55,.55),yellowDark=mat(0xd99b12,.7);
 const glass=mat(0x17344e,.28,.18),rubber=mat(0x111722,.94),hub=mat(0xb8c6d5,.38,.55);
 const trim=mat(0x202a36,.72),white=mat(0xf5f3e8,.38),red=mat(0xe84b42,.45),blue=mat(0x65c9f2,.32,.12);

 const makeBox=(parent,w,h,d,material,x,y,z,rx=0,ry=0,rz=0)=>{
   const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);
   mesh.position.set(x,y,z);mesh.rotation.set(rx,ry,rz);parent.add(mesh);return mesh;
 };
 const bodyShape=new THREE.Shape();
 bodyShape.moveTo(-1.62,-.53);
 bodyShape.lineTo(1.22,-.53);
 bodyShape.quadraticCurveTo(1.63,-.53,1.66,-.16);
 bodyShape.lineTo(1.66,.34);
 bodyShape.quadraticCurveTo(1.66,.66,1.34,.66);
 bodyShape.lineTo(-1.34,.66);
 bodyShape.quadraticCurveTo(-1.66,.66,-1.66,.34);
 bodyShape.lineTo(-1.66,-.53);
 bodyShape.closePath();
 const bodyGeometry=new THREE.ExtrudeGeometry(bodyShape,{depth:1.18,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.055,bevelThickness:.055,curveSegments:8});
 bodyGeometry.translate(0,0,-.59);
 const body=new THREE.Mesh(bodyGeometry,yellow);bus.add(body);

 // Roof cap and lower chassis give the silhouette real depth.
 makeBox(bus,2.72,.12,1.22,yellowLight,-.02,.63,0);
 makeBox(bus,2.92,.18,1.12,trim,-.02,-.51,0);
 makeBox(bus,2.95,.12,1.2,yellowDark,-.02,-.36,0);

 // Large side windows, with individual frames and central pillars.
 for(const side of [-1,1]){
   const z=side*.603;
   for(let i=0;i<4;i++){
     const x=-1.08+i*.59;
     makeBox(bus,.49,.39,.035,trim,x,.28,z);
     makeBox(bus,.425,.325,.025,glass,x,.29,z+side*.022);
     makeBox(bus,.035,.34,.035,yellowLight,x-.255,.29,z+side*.025);
     makeBox(bus,.035,.34,.035,yellowLight,x+.255,.29,z+side*.025);
   }
   // Side emergency door and its small window.
   makeBox(bus,.34,.72,.04,yellowDark,1.18,.02,z);
   makeBox(bus,.25,.32,.035,glass,1.18,.28,z+side*.025);
   makeBox(bus,2.7,.095,.035,yellowDark,-.02,-.17,z+side*.025);
   makeBox(bus,2.68,.035,.04,trim,-.02,-.25,z+side*.03);
 }

 // Front windshield, split into two panes; facing the bus's +X direction.
 makeBox(bus,.055,.55,.94,trim,1.57,.27,0,0,0,-.12);
 makeBox(bus,.045,.46,.40,glass,1.612,.29,-.235,0,0,-.12);
 makeBox(bus,.045,.46,.40,glass,1.612,.29,.235,0,0,-.12);

 makeBox(bus,.08,.08,1.02,yellowLight,1.57,.59,0,0,0,-.12);

 // BUSSY's expressive face: glossy eyes seated on the front windshield.
 // The eye geometry is part of the 3D bus, not a 2D decal.
 const eyeWhite=mat(0xfffdf5,.24);
 const iris=mat(0x45a9d8,.22,.08);
 const pupil=mat(0x101a2a,.18);
 const eyeSparkle=new THREE.MeshBasicMaterial({color:0xffffff});
 for(const side of [-1,1]){
   const z=side*.225;
   const eye=new THREE.Mesh(new THREE.SphereGeometry(.145,24,18),eyeWhite);
   eye.scale.set(.72,1,1);
   eye.position.set(1.685,.345,z);
   bus.add(eye);

   const irisBall=new THREE.Mesh(new THREE.SphereGeometry(.083,20,16),iris);
   irisBall.scale.set(.68,1,1);
   irisBall.position.set(1.785,.34,z-side*.025);
   bus.add(irisBall);

   const pupilBall=new THREE.Mesh(new THREE.SphereGeometry(.048,18,14),pupil);
   pupilBall.scale.set(.65,1,1);
   pupilBall.position.set(1.84,.34,z-side*.035);
   bus.add(pupilBall);

   const sparkle=new THREE.Mesh(new THREE.SphereGeometry(.019,12,10),eyeSparkle);
   sparkle.position.set(1.875,.375,z-side*.045);
   bus.add(sparkle);

   // Soft curved brows give the character a friendly, curious expression.
   const browCurve=new THREE.CatmullRomCurve3([
     new THREE.Vector3(1.69,.51,z-side*.13),
     new THREE.Vector3(1.71,.56,z),
     new THREE.Vector3(1.69,.52,z+side*.13)
   ]);
   const brow=new THREE.Mesh(new THREE.TubeGeometry(browCurve,12,.025,8,false),yellowDark);
   bus.add(brow);
 }

 // A curved smile sits on the front panel below the windshield.
 const smileCurve=new THREE.CatmullRomCurve3([
   new THREE.Vector3(1.835,-.155,-.29),
   new THREE.Vector3(1.855,-.205,-.17),
   new THREE.Vector3(1.86,-.225,0),
   new THREE.Vector3(1.855,-.205,.17),
   new THREE.Vector3(1.835,-.155,.29)
 ]);
 const smile=new THREE.Mesh(
   new THREE.TubeGeometry(smileCurve,28,.027,10,false),
   mat(0x54251d,.55)
 );
 bus.add(smile);

 // Tiny warm cheek lights add a little character without cluttering the body.
 for(const side of [-1,1]){
   const cheek=new THREE.Mesh(new THREE.SphereGeometry(.055,14,10),mat(0xff9a68,.65));
   cheek.scale.set(.45,.7,1);
   cheek.position.set(1.72,-.095,side*.38);
   bus.add(cheek);
 }

 // Friendly front bumper, grille and bright headlights.
 makeBox(bus,.22,.17,1.25,trim,1.68,-.39,0);
 makeBox(bus,.045,.22,.42,hub,1.80,-.20,0);
 for(const z of [-.43,.43]){
   const lamp=new THREE.Mesh(new THREE.SphereGeometry(.105,16,12),white);
   lamp.position.set(1.72,-.12,z);bus.add(lamp);
   const lens=new THREE.Mesh(new THREE.SphereGeometry(.055,12,8),blue);
   lens.position.set(1.79,-.12,z);bus.add(lens);
 }
 makeBox(bus,.06,.12,.48,red,-1.68,-.22,0);

 // Four chunky tires, with metallic hubs on both sides.
 for(const x of [-1.03,1.03]){
   for(const side of [-1,1]){
     const tire=new THREE.Mesh(new THREE.CylinderGeometry(.34,.34,.19,24),rubber);
     tire.rotation.x=Math.PI/2;tire.position.set(x,-.48,side*.62);bus.add(tire);
     const wheelHub=new THREE.Mesh(new THREE.CylinderGeometry(.19,.19,.205,20),hub);
     wheelHub.rotation.x=Math.PI/2;wheelHub.position.set(x,-.48,side*.62);bus.add(wheelHub);
     const center=new THREE.Mesh(new THREE.CylinderGeometry(.075,.075,.215,16),trim);
     center.rotation.x=Math.PI/2;center.position.set(x,-.48,side*.62);bus.add(center);
   }
 }
 // Roof lights and a small destination panel add the familiar school-bus details.
 for(const z of [-.43,0,.43]){
   const marker=new THREE.Mesh(new THREE.SphereGeometry(.055,12,8),red);
   marker.position.set(-1.32,.72,z);bus.add(marker);
 }
 makeBox(bus,.52,.15,.035,trim,-.9,.78,.62);
 makeBox(bus,.39,.075,.02,white,-.9,.78,.645);
 const glow=new THREE.PointLight(0x4c9fff,18,12,2);glow.position.set(-1.6,1.8,3.5);scene.add(glow);


 // CHAPTER 3 — FIRST-PERSON LUNAR SURFACE
 const surfaceGroup=new THREE.Group();
 surfaceGroup.scale.setScalar(.001);
 scene.add(surfaceGroup);

 // Procedural regolith texture.
 const regolithCanvas=document.createElement("canvas");
 regolithCanvas.width=512;regolithCanvas.height=512;
 const regolithCtx=regolithCanvas.getContext("2d");
 regolithCtx.fillStyle="#77746d";regolithCtx.fillRect(0,0,512,512);
 for(let i=0;i<9500;i++){
   const x=Math.random()*512,y=Math.random()*512,r=.35+Math.random()*2.1;
   const shade=70+Math.floor(Math.random()*100);
   regolithCtx.fillStyle="rgba("+shade+","+shade+","+Math.max(65,shade-5)+","+(Math.random()*.22)+")";
   regolithCtx.beginPath();regolithCtx.arc(x,y,r,0,Math.PI*2);regolithCtx.fill();
 }
 for(let i=0;i<95;i++){
   const x=Math.random()*512,y=Math.random()*512,r=2+Math.random()*13;
   regolithCtx.strokeStyle="rgba(35,35,34,.24)";regolithCtx.lineWidth=1+Math.random()*2;
   regolithCtx.beginPath();regolithCtx.arc(x,y,r,0,Math.PI*2);regolithCtx.stroke();
 }
 const regolithTexture=new THREE.CanvasTexture(regolithCanvas);
 regolithTexture.colorSpace=THREE.SRGBColorSpace;
 regolithTexture.wrapS=THREE.RepeatWrapping;regolithTexture.wrapT=THREE.RepeatWrapping;
 regolithTexture.repeat.set(18,18);
 regolithTexture.anisotropy=Math.min(renderer.capabilities.getMaxAnisotropy(),4);

 const groundGeometry=new THREE.PlaneGeometry(180,180,90,90);
 const groundPositions=groundGeometry.attributes.position;
 for(let i=0;i<groundPositions.count;i++){
   const x=groundPositions.getX(i),z=groundPositions.getY(i);
   groundPositions.setZ(i,Math.sin(x*.17)*.055+Math.cos(z*.13)*.045+Math.sin((x+z)*.075)*.035);
 }
 groundGeometry.computeVertexNormals();groundGeometry.rotateX(-Math.PI/2);
 const groundMaterial=new THREE.MeshStandardMaterial({map:regolithTexture,color:0xb0aaa0,roughness:1,metalness:0});
 const ground=new THREE.Mesh(groundGeometry,groundMaterial);
 ground.position.set(0,-2.15,-34);ground.receiveShadow=true;surfaceGroup.add(ground);

 // Distant crater rims and low lunar ridges.
 const ridgeMaterial=new THREE.MeshStandardMaterial({color:0x45464a,roughness:1});
 const ridgeLightMaterial=new THREE.MeshStandardMaterial({color:0x66635d,roughness:1});
 const hillGeometry=new THREE.SphereGeometry(1,28,18);
 [
   [-23,-1.35,-49,18,2.1,8],[-3,-1.45,-54,20,2.6,9],
   [20,-1.4,-51,17,2.0,8],[39,-1.5,-60,22,2.8,10]
 ].forEach((v,i)=>{
   const hill=new THREE.Mesh(hillGeometry,i%2?ridgeMaterial:ridgeLightMaterial);
   hill.position.set(v[0],v[1],v[2]);hill.scale.set(v[3],v[4],v[5]);
   hill.receiveShadow=true;surfaceGroup.add(hill);
 });

 const craterRimMaterial=new THREE.MeshStandardMaterial({color:0x96918a,roughness:1});
 const craterFloorMaterial=new THREE.MeshStandardMaterial({color:0x56534e,roughness:1});
 [[-5,-13,1.8],[7,-22,2.4],[-13,-29,2.1]].forEach((v)=>{
   const floor=new THREE.Mesh(new THREE.CircleGeometry(v[2]*.9,40),craterFloorMaterial);
   floor.rotation.x=-Math.PI/2;floor.position.set(v[0],-2.105,v[1]);surfaceGroup.add(floor);
   const rim=new THREE.Mesh(new THREE.TorusGeometry(v[2],.085,8,48),craterRimMaterial);
   rim.rotation.x=Math.PI/2;rim.position.set(v[0],-2.08,v[1]);surfaceGroup.add(rim);
 });

 // Angular lunar rocks in the foreground and middle distance.
 const rockMaterials=[
   new THREE.MeshStandardMaterial({color:0x77736c,roughness:1}),
   new THREE.MeshStandardMaterial({color:0x5d5b57,roughness:1}),
   new THREE.MeshStandardMaterial({color:0x99938a,roughness:1})
 ];
 for(let i=0;i<(mobile?34:58);i++){
   const size=.12+Math.random()*.48;
   const rock=new THREE.Mesh(new THREE.DodecahedronGeometry(size,0),rockMaterials[i%rockMaterials.length]);
   const z=3-Math.random()*31,x=(Math.random()-.5)*(z>-8?23:34);
   rock.position.set(x,-2.02+Math.random()*.08,z);
   rock.rotation.set(Math.random()*1.2,Math.random()*Math.PI,Math.random()*1.2);
   rock.scale.set(.8+Math.random()*.8,.55+Math.random()*.75,.75+Math.random()*.8);
   rock.castShadow=true;rock.receiveShadow=true;surfaceGroup.add(rock);
 }

 // Load the user's Tripo-generated Apollo 11 Eagle GLB.
 // The GLB already contains its own face and materials, so no duplicate
 // procedural eyes or mouth are added here.
 const eagleRoot=new THREE.Group();
 eagleRoot.position.set(mobile?.55:1.15,-2.13,-4.8);
 eagleRoot.rotation.y=mobile?-.05:-.1;
 surfaceGroup.add(eagleRoot);
 let eagleLoaded=false;
 const eagleLoader=new GLTFLoader();
 eagleLoader.load(
   "./assets/models/apollo-11-eagle-descent-stage.glb",
   (gltf)=>{
     if(disposed){
       gltf.scene.traverse(o=>{
         o.geometry?.dispose();
         if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{
           Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose();});
           m.dispose();
         });
       });
       return;
     }
     const model=gltf.scene;
     const bounds=new THREE.Box3().setFromObject(model);
     const center=bounds.getCenter(new THREE.Vector3());
     const dimensions=bounds.getSize(new THREE.Vector3());
     // Center the model over its landing point and place its lowest point
     // on the lunar ground plane. The inspected GLB is Y-up.
     model.position.x-=center.x;
     model.position.z-=center.z;
     model.position.y-=bounds.min.y;
     const targetHeight=3.35;
     const scale=targetHeight/Math.max(dimensions.y,.001);
     eagleRoot.scale.setScalar(scale);
     model.traverse(object=>{
       if(!object.isMesh)return;
       object.castShadow=true;
       object.receiveShadow=true;
       if(Array.isArray(object.material)){
         object.material.forEach(material=>{material.needsUpdate=true;});
       }else if(object.material){
         object.material.needsUpdate=true;
       }
     });
     eagleRoot.add(model);
     eagleLoaded=true;
     surfaceScene.classList.add("scene3d-ready");
     surfaceScene.classList.remove("scene3d-failed");
   },
   (progress)=>{
     if(progress.total>0){
       mount.dataset.eagleLoadProgress=String(Math.round(progress.loaded/progress.total*100));
     }
   },
   (error)=>{
     console.error("Apollo 11 Eagle GLB could not be loaded; retaining the original 2D Eagle artwork.",error);
     surfaceScene.classList.add("scene3d-failed");
   }
 );

 // CHAPTER 4 — APOLLO LUNAR ROVING VEHICLE
 // Keep the Eagle and rover in the same lunar world; the rover is loaded
 // shortly before Chapter 4 enters view to avoid downloading both large GLBs at once.
 const lrvRoot=new THREE.Group();
 lrvRoot.position.set(mobile?4.1:5.4,-2.13,-4.8);
 lrvRoot.rotation.y=mobile?-.18:-.32;
 lrvRoot.visible=false;
 surfaceGroup.add(lrvRoot);
 let lrvLoaded=false;
 const lrvLoader=new GLTFLoader();
 const loadLrvModel=()=>{
   if(lrvLoaded||disposed)return;
   lrvLoader.load(
     "./assets/models/apollo-lunar-roving-vehicle.glb",
     (gltf)=>{
       if(disposed){
         gltf.scene.traverse(o=>{
           o.geometry?.dispose();
           if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{
             Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose();});
             m.dispose();
           });
         });
         return;
       }
       const model=gltf.scene;
       const bounds=new THREE.Box3().setFromObject(model);
       const center=bounds.getCenter(new THREE.Vector3());
       const dimensions=bounds.getSize(new THREE.Vector3());
       model.position.x-=center.x;
       model.position.z-=center.z;
       model.position.y-=bounds.min.y;
       const horizontalSpan=Math.max(dimensions.x,dimensions.z);
       const targetLength=mobile?2.85:4.15;
       lrvRoot.scale.setScalar(targetLength/Math.max(horizontalSpan,.001));
       model.traverse(object=>{
         if(!object.isMesh)return;
         object.castShadow=true;
         object.receiveShadow=true;
         if(Array.isArray(object.material)){
           object.material.forEach(material=>{material.needsUpdate=true;});
         }else if(object.material){
           object.material.needsUpdate=true;
         }
       });
       lrvRoot.add(model);
       lrvRoot.visible=true;
       lrvLoaded=true;
       lrvScene.classList.add("scene3d-ready");
       lrvScene.classList.remove("scene3d-failed");
       ScrollTrigger.refresh();
     },
     (progress)=>{
       if(progress.total>0){
         mount.dataset.lrvLoadProgress=String(Math.round(progress.loaded/progress.total*100));
       }
     },
     (error)=>{
       console.error("Apollo Lunar Roving Vehicle GLB could not be loaded; retaining the original 2D LRV artwork.",error);
       lrvScene.classList.add("scene3d-failed");
     }
   );
 };
 const lrvLoadTrigger=ScrollTrigger.create({
   trigger:lrvScene,
   start:"top 125%",
   once:true,
   onEnter:loadLrvModel
 });

 // CHAPTER 5 — ALSEP SCIENCE STATIONS
 // Load the station package shortly before Chapter 5; keep the same lunar
 // ground, star field, lighting and camera used by the previous chapters.
 const alsepRoot=new THREE.Group();
 alsepRoot.position.set(mobile?4.8:5.6,-2.13,-4.9);
 alsepRoot.rotation.y=mobile?-.16:-.24;
 alsepRoot.visible=false;
 surfaceGroup.add(alsepRoot);
 let alsepLoaded=false;
 const alsepLoader=new GLTFLoader();
 const loadAlsepModel=()=>{
   if(alsepLoaded||disposed)return;
   alsepLoader.load(
     "./assets/models/alsep-science-station.glb",
     (gltf)=>{
       if(disposed){
         gltf.scene.traverse(o=>{
           o.geometry?.dispose();
           if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>{
             Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose();});
             m.dispose();
           });
         });
         return;
       }
       const model=gltf.scene;
       const bounds=new THREE.Box3().setFromObject(model);
       const center=bounds.getCenter(new THREE.Vector3());
       const dimensions=bounds.getSize(new THREE.Vector3());
       model.position.x-=center.x;
       model.position.z-=center.z;
       model.position.y-=bounds.min.y;
       const horizontalSpan=Math.max(dimensions.x,dimensions.z);
       const targetLength=mobile?3.25:4.55;
       alsepRoot.scale.setScalar(targetLength/Math.max(horizontalSpan,.001));
       model.traverse(object=>{
         if(!object.isMesh)return;
         object.castShadow=true;
         object.receiveShadow=true;
         if(Array.isArray(object.material)){
           object.material.forEach(material=>{material.needsUpdate=true;});
         }else if(object.material){
           object.material.needsUpdate=true;
         }
       });
       alsepRoot.add(model);
       alsepRoot.visible=true;
       alsepLoaded=true;
       alsepScene.classList.add("scene3d-ready");
       alsepScene.classList.remove("scene3d-failed");
       ScrollTrigger.refresh();
     },
     (progress)=>{
       if(progress.total>0){
         mount.dataset.alsepLoadProgress=String(Math.round(progress.loaded/progress.total*100));
       }
     },
     (error)=>{
       console.error("ALSEP Science Station GLB could not be loaded; retaining the original 2D ALSEP artwork.",error);
       alsepScene.classList.add("scene3d-failed");
     }
   );
 };
 const alsepLoadTrigger=ScrollTrigger.create({
   trigger:alsepScene,
   start:"top 125%",
   once:true,
   onEnter:loadAlsepModel
 });

 // A restrained veil of lunar regolith particles sweeps across the foreground
 // during the handoff. It is a visual accent, not a simulated atmospheric plume.
 const dustCount=mobile?110:190;
 const dustPositions=new Float32Array(dustCount*3);
 for(let i=0;i<dustCount;i++){
   dustPositions[i*3]=(Math.random()-.5)*5.4;
   dustPositions[i*3+1]=(Math.random()-.5)*.7;
   dustPositions[i*3+2]=-2.8+Math.random()*3.2;
 }
 const dustGeometry=new THREE.BufferGeometry();
 dustGeometry.setAttribute("position",new THREE.BufferAttribute(dustPositions,3));
 const dustMaterial=new THREE.PointsMaterial({
   color:0xc8b99d,size:mobile?.045:.055,transparent:true,opacity:0,
   depthWrite:false,blending:THREE.AdditiveBlending
 });
 const dustSweep=new THREE.Group();
 dustSweep.position.set(-5.2,-1.72,0);
 dustSweep.add(new THREE.Points(dustGeometry,dustMaterial));
 surfaceGroup.add(dustSweep);

 const lunarSun=new THREE.DirectionalLight(0xffe0b5,2.1);
 lunarSun.position.set(-8,11,7);lunarSun.castShadow=true;
 lunarSun.shadow.mapSize.set(1024,1024);
 lunarSun.shadow.camera.left=-30;lunarSun.shadow.camera.right=30;
 lunarSun.shadow.camera.top=30;lunarSun.shadow.camera.bottom=-30;
 scene.add(lunarSun);

 // One scrubbed timeline spans Chapter 1 and Chapter 2, so the camera,
 // Earth, Moon and bus remain in the same world during the transition.
 const journey=gsap.timeline({scrollTrigger:{
   trigger:landingScene,start:"top top",endTrigger:travelScene,end:"bottom top",
   scrub:1.15,invalidateOnRefresh:true
 }});
 journey
   .to(camera.position,{x:mobile?0:.18,y:mobile?.08:.1,z:7.75,duration:1},0)
   .to(earthGroup.position,{x:mobile?-4.1:-6.25,y:mobile?1.25:1.05,duration:.5},0)
   .to(earthGroup.scale,{x:.22,y:.22,z:.22,duration:.5},0)
   // The Moon is still distant when Chapter 2 begins (timeline halfway).
   .to(moonGroup.position,{x:mobile?.75:4.45,y:mobile?1.55:.5,z:-2.45,duration:.1},.5)
   .to(moonGroup.scale,{x:.17,y:.17,z:.17,duration:.1},.5)
   // It grows and moves toward the camera throughout the Moonbound chapter.
   .to(moonGroup.position,{x:mobile?.1:2.65,y:mobile?1.25:.28,z:-1.75,duration:.4},.6)
   .to(moonGroup.scale,{x:mobile?1.12:1.34,y:mobile?1.12:1.34,z:mobile?1.12:1.34,duration:.4},.6)
   .to(bus.position,{x:mobile?.3:1.65,y:mobile?-1.22:-1.25,z:1.05,duration:.2},.5)
   .to(bus.rotation,{y:-.27,z:-.065,duration:.2},.5)
   .to(bus.position,{x:mobile?-.25:.2,y:mobile?-.72:-.76,z:.62,duration:.2},.7)
   .to(bus.rotation,{y:-.43,z:.075,duration:.2},.7)
   .to(bus.position,{x:mobile?.18:1.05,y:mobile?-1.18:-1.16,z:.9,duration:.1},.9)
   .to(bus.rotation,{y:-.3,z:-.025,duration:.1},.9);

 // Chapter 3 landing: transition from the close Moon to a grounded POV.
 const arrival=gsap.timeline({scrollTrigger:{
   trigger:surfaceScene,start:"top top",end:"bottom top",
   scrub:1.05,invalidateOnRefresh:true
 }});
 arrival
   .to(moonGroup.position,{x:mobile?-.4:2.8,y:-6.5,z:-4.5,duration:.42},0)
   .to(moonGroup.scale,{x:.001,y:.001,z:.001,duration:.42},0)
   .to(bus.scale,{x:.001,y:.001,z:.001,duration:.2},0)
   .to(surfaceGroup.scale,{x:1,y:1,z:1,duration:.48},.08)
   .to(camera.position,{x:mobile?-.05:-.32,y:mobile?1.48:1.58,z:mobile?8.15:8.35,duration:.58},.04)
   .to(camera.rotation,{x:-.105,y:0,z:0,duration:.58},.04);

 // Chapter 4 — one continuous, scroll-scrubbed Eagle-to-LRV handoff.
 // The lunar ground, star field, lighting and renderer remain untouched.
 const roverHandoff=gsap.timeline({scrollTrigger:{
   trigger:lrvScene,start:"top top",end:"bottom top",
   scrub:1.05,invalidateOnRefresh:true
 }});
 roverHandoff
   .to(eagleRoot.position,{x:mobile?-3.05:-4.15,y:-2.13,z:-7.5,duration:1},0)
   .to(lrvRoot.position,{x:mobile?-1.05:-1.45,y:-2.13,z:-4.55,duration:1},0)
   .to(camera.position,{x:mobile?-.28:.22,y:mobile?1.55:1.64,z:mobile?8.1:8.0,duration:1},0)
   .to(camera.rotation,{x:-.115,y:mobile?-.012:.018,z:0,duration:1},0)
   .fromTo(dustSweep.position,{x:-5.2},{x:5.2,duration:.72,ease:"none"},.12)
   .fromTo(dustMaterial,{opacity:0},{opacity:mobile?.17:.22,duration:.2},.15)
   .to(dustMaterial,{opacity:0,duration:.34},.58);

 // Chapter 5 — hand off the rover to the ALSEP science station package.
 // No new environment is created: the lunar surface and sky remain continuous.
 const scienceHandoff=gsap.timeline({scrollTrigger:{
   trigger:alsepScene,start:"top top",end:"bottom top",
   scrub:1.05,invalidateOnRefresh:true
 }});
 scienceHandoff
   .to(lrvRoot.position,{x:mobile?-4.2:-5.2,y:-2.13,z:-7.6,duration:1},0)
   .to(alsepRoot.position,{x:mobile?.85:1.2,y:-2.13,z:-4.7,duration:1},0)
   .to(camera.position,{x:mobile?-.05:-.3,y:mobile?1.48:1.58,z:mobile?8.15:8.35,duration:1},0)
   .to(camera.rotation,{x:-.105,y:0,z:0,duration:1},0)
   .fromTo(dustSweep.position,{x:-5.2},{x:5.2,duration:.72,ease:"none"},.12)
   .fromTo(dustMaterial,{opacity:0},{opacity:mobile?.15:.2,duration:.2},.15)
   .to(dustMaterial,{opacity:0,duration:.34},.58);

 let busFloat=null,earthSpin=null,moonSpin=null;
 if(!reduced){
   busFloat=gsap.to(bus.rotation,{x:.018,duration:2.7,ease:"sine.inOut",yoyo:true,repeat:-1});
   earthSpin=gsap.to(earth.rotation,{y:Math.PI*2,duration:150,ease:"none",repeat:-1});
   moonSpin=gsap.to(moon.rotation,{y:Math.PI*2,duration:210,ease:"none",repeat:-1});
 }
 const resize=()=>{if(disposed)return;const w=Math.max(1,mount.clientWidth||innerWidth),h=Math.max(1,mount.clientHeight||innerHeight);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setPixelRatio(Math.min(devicePixelRatio||1,pixelCap));renderer.setSize(w,h,false);};
 const visibleScenes=new Set();
 const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
     if(entry.isIntersecting)visibleScenes.add(entry.target);
     else visibleScenes.delete(entry.target);
   });
   sceneVisible=visibleScenes.size>0;
   mount.classList.toggle("is-active",sceneVisible);
 },{threshold:.01});
 observer.observe(landingScene);observer.observe(travelScene);observer.observe(surfaceScene);observer.observe(lrvScene);observer.observe(alsepScene);
 const visibility=()=>{pageVisible=!document.hidden;if(pageVisible)last=0;};
 addEventListener("resize",resize,{passive:true});document.addEventListener("visibilitychange",visibility);resize();
 const render=time=>{if(disposed)return;raf=requestAnimationFrame(render);if(!pageVisible||!sceneVisible||time-last<33)return;last=time;stars.rotation.y+=reduced?0:.00012;renderer.render(scene,camera);};
 raf=requestAnimationFrame(render);
 return{dispose(){
  if(disposed)return;disposed=true;cancelAnimationFrame(raf);observer.disconnect();removeEventListener("resize",resize);document.removeEventListener("visibilitychange",visibility);
  journey.scrollTrigger?.kill();journey.kill();arrival.scrollTrigger?.kill();arrival.kill();roverHandoff.scrollTrigger?.kill();roverHandoff.kill();scienceHandoff.scrollTrigger?.kill();scienceHandoff.kill();lrvLoadTrigger.kill();alsepLoadTrigger.kill();busFloat?.kill();earthSpin?.kill();moonSpin?.kill();
  scene.traverse(o=>{o.geometry?.dispose();if(o.material){const list=Array.isArray(o.material)?o.material:[o.material];list.forEach(m=>{Object.values(m).forEach(v=>{if(v?.isTexture)v.dispose();});m.dispose();});}});
  renderer.dispose();renderer.domElement.remove();
 }};
}

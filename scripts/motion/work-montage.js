// Native Higgsedit composition. Uses the portfolio's published, original screenshots.
export default async ({ project, frame, rect, media, text }) => {
  const p = await project({ dir: "/home/user/jace-montage", size: "1280x720", fps: 24, background: "#0b1512" });
  const imageDrop = await p.add("/home/user/imagedrop.png");
  const remi = await p.add("/home/user/remi.png");
  const storefront = await p.add("/home/user/storefront.png");
  const drift = (property, a, b, c = a) => ({
    property, keyframes: [
      {at: 0, value: a, easing: "ease-in-out"},
      {at: 6, value: b, easing: "ease-in-out"},
      {at: 12, value: c}
    ]
  });
  const card = (file, x, y, width, rotation, dy, label) => frame({
    name: label, x, y, width, height: width * 0.625 + 24, layout: "none",
    background: "#edf2ed", radius: 5, clip: true,
    shadow: {x: 0, y: 20, blur: 35, color: "#00000070"},
    animate: [drift("rotation",rotation,rotation + 1.5), drift("offsetY",0,dy), drift("offsetX",0,dy/2)]
  }, [
    rect({x:0,y:0,width,height:24,fill:"#e4ebe6"}),
    rect({x:12,y:9,width:5,height:5,radius:2.5,fill:"#92a296"}),
    rect({x:23,y:9,width:5,height:5,radius:2.5,fill:"#92a296"}),
    rect({x:34,y:9,width:5,height:5,radius:2.5,fill:"#92a296"}),
    media({file,x:0,y:24,width,height:width*0.625,fit:"contain"})
  ]);
  p.compose([
    rect({x:0,y:0,width:1280,height:720,fill:{kind:"radial",stops:[{offset:0,color:"#234a37"},{offset:1,color:"#0b1512"}]}}),
    rect({x:48,y:42,width:1184,height:1,fill:"#56716140"}),
    rect({x:48,y:678,width:1184,height:1,fill:"#56716140"}),
    card(storefront, -135, 335, 565, -7, -28, "Storefront"),
    card(remi, 785, 70, 600, 7, 35, "REMI"),
    card(imageDrop, 257, 125, 760, -3, -20, "ImageDrop"),
    text("IDEAS INTO WORKING SOFTWARE", {x:48,y:54,width:500,height:25,fontFamily:"Metropolis",fontSize:12,letterSpacing:2,color:"#a3bead"}),
    text("WEB / MOBILE / MACOS", {x:48,y:646,width:500,height:22,fontFamily:"Metropolis",fontSize:11,letterSpacing:2,color:"#a3bead"}),
  ], {dur:12, name:"Living portfolio collage"});
  await p.frame(3,"renders/poster.png");
  await p.render("renders/montage.mp4",{depth:8,concurrency:4});
};

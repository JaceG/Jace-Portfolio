'use client';
// TEMPORARY experiment: HorizonX Cinematic Black Hole (white) in the hero, just to view.
import { useLayoutEffect, useRef } from 'react';

const CSS = `

`;

export default function CinematicBlackHole() {
  const __root = useRef(null);

  useLayoutEffect(() => {
    if (!document.querySelector('style[data-cinematic-black-hole]')) {
      const tag = document.createElement('style');
      tag.setAttribute('data-cinematic-black-hole', '');
      tag.textContent = CSS;
      document.head.append(tag);
    }
    const __node = __root.current;
    const __q = (sel) => (__node.matches(sel) ? __node : __node.querySelector(sel));
    // Camera-locked procedural geometry and bounded advective material. No bitmap inputs.
    function buildCinematicBlackHole(root, initial) {
      let config = { ...initial }, dead = false, active = null;
      root.textContent = 'Loading Cinematic Black Hole…';
      const ready = Promise.all([
        import(/* @vite-ignore */ /* webpackIgnore: true */ /* turbopackIgnore: true */ 'https://esm.sh/three@0.180.0'),
        import(/* @vite-ignore */ /* webpackIgnore: true */ /* turbopackIgnore: true */ 'https://esm.sh/three@0.180.0/examples/jsm/postprocessing/EffectComposer.js'),
        import(/* @vite-ignore */ /* webpackIgnore: true */ /* turbopackIgnore: true */ 'https://esm.sh/three@0.180.0/examples/jsm/postprocessing/RenderPass.js'),
        import(/* @vite-ignore */ /* webpackIgnore: true */ /* turbopackIgnore: true */ 'https://esm.sh/three@0.180.0/examples/jsm/postprocessing/ShaderPass.js'),
        import(/* @vite-ignore */ /* webpackIgnore: true */ /* turbopackIgnore: true */ 'https://esm.sh/three@0.180.0/examples/jsm/postprocessing/OutputPass.js')
      ]).then(([THREE, { EffectComposer }, { RenderPass }, { ShaderPass }, { OutputPass }]) => {
        if (dead) return;
        const canvas = document.createElement('canvas');
        canvas.className = 'cbh-canvas'; canvas.setAttribute('aria-hidden', 'true');
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, premultipliedAlpha: true, antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.AgXToneMapping;
        const scene = new THREE.Scene(), camera = new THREE.Camera();
        const uniforms = {
          uTilt: { value: config.tilt }, uScale: { value: config.scale }, uArch: { value: config.arch },
          uTime: { value: 0 }, uChroma: { value: config.chroma }, uFilaments: { value: config.filaments },
          uWarm: { value: new THREE.Color() }, uHighlight: { value: new THREE.Color() },
          uCool: { value: new THREE.Color() }, uViolet: { value: new THREE.Color() }
        };
        const lowerGeometry = new THREE.PlaneGeometry(2, 2);
        const lowerMaterial = new THREE.ShaderMaterial({ vertexShader: screenVertex, fragmentShader: lowerFragment, uniforms, depthTest: false, depthWrite: false });
        const lower = new THREE.Mesh(lowerGeometry, lowerMaterial); lower.frustumCulled = false; scene.add(lower);
        const diskGeometry = new THREE.PlaneGeometry(1, 1, 96, 384);
        const diskMaterial = new THREE.ShaderMaterial({ vertexShader: diskVertex, fragmentShader: diskFragment, uniforms, side: THREE.DoubleSide, depthTest: false, depthWrite: false });
        const disk = new THREE.Mesh(diskGeometry, diskMaterial); disk.frustumCulled = false; disk.renderOrder = 1; scene.add(disk);
        const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, depthBuffer: false }));
        composer.addPass(new RenderPass(scene, camera));
        const blurs = [[1, 0], [0, 1]].map(([x, y]) => {
          const pass = new ShaderPass({ uniforms: { tDiffuse: { value: null }, uResolution: { value: new THREE.Vector2() }, uDirection: { value: new THREE.Vector2(x, y) }, uSoftness: { value: config.softness } }, vertexShader: screenVertex, fragmentShader: blurFragment });
          composer.addPass(pass); return pass;
        });
        const glow = new ShaderPass({ uniforms: { tDiffuse: { value: null }, uResolution: { value: new THREE.Vector2() }, uBloom: { value: config.bloom } }, vertexShader: screenVertex, fragmentShader: glowFragment });
        composer.addPass(glow); composer.addPass(new OutputPass());
        // Match Amber Sphere: derive coverage after tone mapping and bloom. RGB is
        // already premultiplied, preserving the glow without an opaque black stage.
        composer.addPass(new ShaderPass({ uniforms: { tDiffuse: { value: null } }, vertexShader: screenVertex, fragmentShader: alphaFragment }));
        root.replaceChildren(canvas);
        let frame = 0, last = 0, time = 0, inView = true, lost = false;
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        const listeners = new AbortController();
        const on = (node, name, fn) => node.addEventListener(name, fn, { signal: listeners.signal });
        const playing = () => config.playback === 'playing' && config.speed > 0 && !reduced.matches && !document.hidden && inView && !lost;
        function requestDraw() { if (!dead && !lost && !frame) frame = requestAnimationFrame(draw); }
        function draw(now) {
          frame = 0; if (dead || lost) return;
          const width = Math.max(1, Math.min(root.clientWidth, root.clientHeight * 16 / 9));
          const height = width * 9 / 16;
          const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 1.5), 2, 2560 / width);
          const rw = Math.max(1, Math.round(width * dpr)), rh = Math.max(1, Math.round(height * dpr));
          canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
          if (canvas.width !== rw || canvas.height !== rh) {
            renderer.setSize(rw, rh, false); composer.setSize(rw, rh);
            for (const pass of [...blurs, glow]) pass.uniforms.uResolution.value.set(rw, rh);
          }
          // Do not discard visible time on slow GPUs. Visibility changes rebase last.
          if (playing() && last) time += Math.max(0, (now - last) / 1000) * config.speed;
          last = now; uniforms.uTime.value = time;
          uniforms.uTilt.value = config.tilt; uniforms.uScale.value = config.scale; uniforms.uArch.value = config.arch;
          uniforms.uChroma.value = config.chroma; uniforms.uFilaments.value = config.filaments;
          uniforms.uWarm.value.set(config.warm); uniforms.uHighlight.value.set(config.highlight);
          uniforms.uCool.value.set(config.cool); uniforms.uViolet.value.set(config.violet);
          blurs.forEach(pass => { pass.uniforms.uSoftness.value = config.softness; });
          glow.uniforms.uBloom.value = config.bloom; renderer.toneMappingExposure = config.exposure;
          composer.render(); canvas.dataset.ready = 'true';
          if (playing()) requestDraw();
        }
        const restart = () => { last = 0; cancelAnimationFrame(frame); frame = 0; if (!document.hidden && inView) requestDraw(); };
        on(document, 'visibilitychange', restart); on(reduced, 'change', restart);
        on(canvas, 'webglcontextlost', event => { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; delete canvas.dataset.ready; root.dataset.contextLost = 'true'; });
        on(canvas, 'webglcontextrestored', () => { lost = false; delete root.dataset.contextLost; restart(); });
        const resize = new ResizeObserver(requestDraw); resize.observe(root);
        const visibility = new IntersectionObserver(entries => { inView = entries[0]?.isIntersecting !== false; restart(); }); visibility.observe(root);
        active = {
          update(next) { const wasPlaying = playing(); config = { ...next }; if (wasPlaying !== playing()) last = 0; requestDraw(); },
          destroy() {
            cancelAnimationFrame(frame); resize.disconnect(); visibility.disconnect(); listeners.abort();
            diskGeometry.dispose(); diskMaterial.dispose(); lowerGeometry.dispose(); lowerMaterial.dispose();
            composer.passes.forEach(pass => pass.dispose?.()); composer.dispose(); renderer.dispose(); renderer.forceContextLoss(); root.replaceChildren();
          }
        };
        requestDraw();
      }).catch(error => {
        if (dead) return;
        console.error('Cinematic Black Hole initialization failed', error);
        root.textContent = 'Cinematic Black Hole requires WebGL 2. Please use a compatible browser.';
      });
      return {
        ready,
        update(next) { if (dead) return; if (active) active.update(next); else config = { ...next }; },
        destroy() { if (dead) return; dead = true; active?.destroy(); root.replaceChildren(); }
      };
    }

    // All visual inputs are equations. UVs parameterize the annulus, not an image.
    const diskVertex = /* glsl */`
    uniform float uTilt;
    uniform float uScale;
    uniform float uArch;
    varying vec2 vDisk;
    varying vec2 vPoint;
    void main() {
      float t = uv.x;
      float a = uv.y * 6.28318530718;
      float r = mix(125.0, 535.0, t);
      float x = r * cos(a);
      float s = sin(a);
      float y;
      if (s >= 0.0) {
        float bend = s * exp(-pow(x / 185.0, 2.0)*(1.0-125.0/r));
        y = -0.095 * r * s - uArch * 0.937 * bend;
      } else {
        y = -(0.075+0.07*smoothstep(0.0,0.5,t)) * r * s;
      }
      // Circular inner lens and flattened disk share an in-plane camera roll.
      vPoint = vec2(x, y);
      float roll=radians(uTilt);
      vec2 rotated=vec2(cos(roll)*x-sin(roll)*y,sin(roll)*x+cos(roll)*y);
      vec2 p = vec2(600.0, 350.0) + rotated * uScale;
      gl_Position = vec4(p.x / 600.0 - 1.0, 1.0 - p.y / 337.5, 0.0, 1.0);
      vDisk = vec2(t, a);
    }`;

    const diskFragment = /* glsl */`
    uniform float uTime;
    uniform float uChroma;
    uniform vec3 uWarm, uHighlight, uCool, uViolet;
    uniform float uFilaments;
    varying vec2 vDisk;
    varying vec2 vPoint;
    float gauss(float x) { return exp(-x*x); }
    // Fourier expansion of ((1 + cos(p))/2)^3. Filter each harmonic by its own
    // pixel footprint; filtering only the fundamental leaves fine-line moire.
    float strand(float phase) {
      float sigma = max(fwidth(phase) * 0.5, 0.0001);
      return 0.3125
        + 0.46875 * cos(phase) * exp(-0.5*sigma*sigma)
        + 0.1875 * cos(2.0*phase) * exp(-2.0*sigma*sigma)
        + 0.03125 * cos(3.0*phase) * exp(-4.5*sigma*sigma);
    }
    float hash(vec3 p) {
      p = fract(p*0.1031);
      p += dot(p,p.yzx+33.33);
      return fract((p.x+p.y)*p.z);
    }
    float noise(vec3 p) {
      vec3 i=floor(p), f=fract(p);
      f=f*f*(3.0-2.0*f);
      return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),
                     mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                 mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),
                     mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);
    }
    float plasma(vec3 p) {
      // Circular coordinates close the polar seam. Detail is advected, not wound
      // ever tighter with time; derivatives stay bounded at long runtimes.
      float footprint=max(length(dFdx(p)),length(dFdy(p)));
      float detail=1.0-smoothstep(0.10,0.55,footprint);
      return noise(p)*0.58 + mix(0.5,noise(p*2.03+7.1),detail)*0.28
        + mix(0.5,noise(p*4.07+17.3),detail*detail)*0.14;
    }
    void main() {
      float t = vDisk.x;
      float a = vDisk.y;
      float x = vPoint.x;
      // Two independently rotating, periodic layers. A radius-dependent rate
      // multiplied by ever-growing time winds the radial texture into subpixels.
      // Blend bounded fields instead, keeping spatial derivatives bounded forever.
      float orbit = a - mod(uTime*0.65,6.28318530718);
      float outerOrbit = a - mod(uTime*0.40,6.28318530718);
      float outerWeight = smoothstep(0.15,0.85,t);
      float gasA=plasma(vec3(cos(orbit)*1.6,sin(orbit)*1.6,t*8.0));
      float gasB=plasma(vec3(cos(outerOrbit+0.8)*2.1,sin(outerOrbit+0.8)*2.1,t*10.0+3.0));
      float gas=mix(gasA,gasB,outerWeight);
      float flow=mix(sin(orbit*3.0+t*10.0),sin(outerOrbit*4.0+t*12.0),outerWeight);
      float warp=t+0.080*(gas-0.5)+0.012*flow+0.005*sin(orbit*7.0+t*31.0);
      // Finite slope at the inner rim; pow(max(warp,0),.84) had a singularity.
      float radial = (pow(max(warp,0.0)+0.025,0.84)-pow(0.025,0.84))/(pow(1.025,0.84)-pow(0.025,0.84));
      float phase=radial*uFilaments*6.2831853+3.4*gas+1.1*sin(warp*37.0+orbit*2.0);
      float line = strand(phase);
      float fine = strand(phase*1.73+5.0*gasB);
      float stream=mix(0.5+0.5*cos(orbit*2.0+t*12.0),0.5+0.5*cos(outerOrbit*2.0+t*12.0),outerWeight);
      float streak=mix(exp(4.0*(cos(orbit+t*4.0+gas)-1.0)),exp(4.0*(cos(outerOrbit+t*5.0)-1.0)),outerWeight);
      float density=smoothstep(0.28,0.74,gas);
      float wisps=0.10+2.8*density*density+0.85*streak;
      // Radially stretched stochastic fibres break the equal-width ribbon pattern
      // while remaining continuous around the polar seam and through time.
      float fibre=plasma(vec3(cos(orbit)*2.4,sin(orbit)*2.4,radial*uFilaments*2.6+gas*3.0));
      float filament=pow(smoothstep(0.24,0.78,fibre),2.0);
      float rings=0.018+(0.18*line+0.10*fine+1.45*filament)*wisps+0.16*gas*gas;
      float right = gauss((x-212.0)/96.0) * gauss((t-0.27)/0.23);
      float left = gauss((x+342.0)/63.0) * gauss((vPoint.y+18.0)/38.0);
      float inner = exp(-t*6.0);
      float envelope=(0.42+0.75*gauss((t-0.26)/0.36))*(1.0-smoothstep(0.65,1.0,t));
      float front=1.0-smoothstep(-0.18,0.18,sin(a));
      float absorption=mix(1.0,0.78*(1.0-0.92*gauss((t-0.53)/0.080)),front);
      // Art-directed thermal palette, not a claim of black-body spectroscopy.
      vec3 color=mix(uWarm,uHighlight,exp(-t*2.7));
      float violetBand=gauss((t-0.47)/0.25)*(0.40+0.22*sin(a+0.8));
      color=mix(color,uViolet,violetBand);
      float coolBand=gauss((t-0.16)/0.16)*(0.5+0.5*cos(a-0.5));
      color=mix(color,uCool,coolBand*0.52+right*inner*0.18);
      color=mix(vec3(dot(color,vec3(0.2126,0.7152,0.0722))),color,uChroma);
      // Persistent approaching-side emphasis; moving gas travels through the light.
      float beaming=0.62+0.65*pow(0.5+0.5*cos(a),2.0);
      float energy=envelope*absorption*(1.10+2.8*right+1.8*left)*beaming;
      vec3 emission = color * rings * energy;
      emission+=color*right*envelope*absorption*(0.07+0.18*stream);
      emission+=fine*inner*vec3(0.65,0.68,0.70)*0.18;
      emission *= smoothstep(0.0,max(fwidth(t)*1.2,0.0001),t);
      gl_FragColor = vec4(emission,1.0);
    }`;

    const screenVertex = /* glsl */`
    varying vec2 vUv;
    void main() { vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }
    `;

    const lowerFragment = /* glsl */`
    uniform float uTilt;
    uniform float uScale;
    uniform float uChroma;
    uniform vec3 uWarm, uHighlight, uCool, uViolet;
    varying vec2 vUv;
    void main() {
      vec2 p=vec2(vUv.x*1200.0,(1.0-vUv.y)*675.0);
      p=(p-vec2(600.0,350.0))/uScale;
      float roll=radians(uTilt);
      p=vec2(cos(roll)*p.x+sin(roll)*p.y,-sin(roll)*p.x+cos(roll)*p.y);
      vec2 q=vec2(p.x-5.0,(p.y-20.0)*1.06);
      float r=length(q);
      float a=atan(q.y,q.x);
      float arc=smoothstep(0.69,0.85,a)*(1.0-smoothstep(2.85,3.05,a));
      float d=r-125.0;
      float aa=max(fwidth(r),0.65);
      vec3 tint=mix(uHighlight,uViolet,0.35+0.25*sin(a));
      vec3 color=mix(vec3(dot(tint,vec3(0.2126,0.7152,0.0722))),tint,uChroma);
      vec3 c=color*exp(-pow(d/(aa*0.60),2.0));
      c+=color*0.10*exp(-pow(d/2.8,2.0));
      c*=arc*0.58*(0.75+0.25*sin(a));
      gl_FragColor=vec4(c,1.0);
    }`;

    const blurFragment = /* glsl */`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform vec2 uDirection;
    uniform float uSoftness;
    varying vec2 vUv;
    void main() {
      float x=abs(vUv.x*1200.0-600.0);
      float radius=0.28+uSoftness*4.5*pow(smoothstep(210.0,520.0,x),1.4);
      vec2 d=uDirection*radius/(uResolution*4.0);
      vec4 c=vec4(0.0);
      float weight=0.0;
      // Dense sampling is required for subpixel strands: a sparse five-tap kernel
      // creates multiple displaced copies of the disk at large blur radii.
      for(int i=-12;i<=12;i++){
        float w=exp(-float(i*i)/32.0);
        c+=texture2D(tDiffuse,vUv+d*float(i))*w;
        weight+=w;
      }
      gl_FragColor=c/weight;
    }`;

    // Short-range bloom keeps the dark gaps between filaments distinct.
    const glowFragment = /* glsl */`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uBloom;
    varying vec2 vUv;
    vec3 bright(vec2 uv){return max(texture2D(tDiffuse,uv).rgb-0.7,0.0);}
    void main(){
      vec2 d=3.0/uResolution;
      vec3 halo=bright(vUv)*0.2;
      halo+=(bright(vUv+vec2(d.x,0.0))+bright(vUv-vec2(d.x,0.0))+bright(vUv+vec2(0.0,d.y))+bright(vUv-vec2(0.0,d.y)))*0.12;
      halo+=(bright(vUv+d)+bright(vUv-d)+bright(vUv+vec2(d.x,-d.y))+bright(vUv+vec2(-d.x,d.y)))*0.08;
      vec2 wide=d*3.5;
      halo+=(bright(vUv+vec2(wide.x,0.0))+bright(vUv-vec2(wide.x,0.0))
        +bright(vUv+vec2(0.0,wide.y))+bright(vUv-vec2(0.0,wide.y)))*0.055;
      gl_FragColor=vec4(texture2D(tDiffuse,vUv).rgb+halo*uBloom,1.0);
    }`;

    const alphaFragment = /* glsl */`
    uniform sampler2D tDiffuse;
    varying vec2 vUv;
    void main() {
      vec3 color=clamp(texture2D(tDiffuse,vUv).rgb,0.0,1.0);
      float coverage=max(color.r,max(color.g,color.b));
      gl_FragColor=vec4(color,coverage);
    }`;

    const style = document.createElement('style');
    style.textContent = "\n.cbh-host{width:100%;height:100%}\n.cbh-frame{display:grid;place-items:center;width:100%;height:100%;overflow:hidden;background:transparent}\n.cbh-root{position:relative;display:grid;place-items:center;width:min(100%,var(--cbh-width));height:min(100%,var(--cbh-height));overflow:hidden;background:transparent;color:#ddd}\n.cbh-canvas{display:block;max-width:100%;max-height:100%;aspect-ratio:16/9}\n.cbh-export .cbh-root{width:100%;height:100%}";
    __q('.cbh-export').prepend(style);
    const base = {"viewportWidth":1200,"viewportHeight":670,"tilt":7.3,"scale":1.12,"arch":110,"filaments":26,"warm":"#ffffff","highlight":"#ffffff","cool":"#ffffff","violet":"#ffffff","chroma":1,"softness":0.62,"bloom":0.59,"exposure":0.4,"speed":1.15,"playback":"playing"};
    const scene = buildCinematicBlackHole(__q('.cbh-root'), base);
    // Experiment: the pull effect speeds the disk up while it feeds.
    const onBoost = (event) => scene.update({ ...base, ...(event.detail || {}) });
    window.addEventListener('blackhole:boost', onBoost);
    const dispose = () => scene.destroy();
    window.addEventListener('pagehide', dispose, { once: true });
    return () => { window.removeEventListener('pagehide', dispose); window.removeEventListener('blackhole:boost', onBoost); scene.destroy(); };
  }, []);

  return (
    <div ref={__root} aria-hidden="true" className="cbh-export pointer-events-none absolute inset-0">
      <div className="cbh-frame" style={{ '--cbh-width': '1200px', '--cbh-height': '670px' }}>
        <div className="cbh-root" role="img" aria-label="Luminous amber, blue and violet gas orbiting a cinematic black hole"></div>
      </div>
    </div>
  );
}

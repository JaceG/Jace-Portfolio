// Usage: node scripts/motion/encode-hardware-reveal.mjs /path/to/source.mp4
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const input = process.argv[2];
if (!input) throw new Error('Provide the completed Seedance source video path.');
const output = fileURLToPath(new URL('../../public/motion/transitions/hardware-reveal.webm', import.meta.url));
const filter = [
  'colorkey=0xFF00FF:0.25:0.08',
  'format=gbrap',
  // Neutralize the magenta fringe without changing ivory or green hardware.
  "geq=r='r(X,Y)-max(0,min(r(X,Y),b(X,Y))-g(X,Y))':g='g(X,Y)':b='b(X,Y)-max(0,min(r(X,Y),b(X,Y))-g(X,Y))':a='alpha(X,Y)'",
  'erosion=threshold0=0:threshold1=0:threshold2=0',
  'scale=1600:900',
  'format=yuva420p',
].join(',');
execFileSync('ffmpeg', ['-hide_banner', '-y', '-i', input, '-an', '-vf', filter,
  '-c:v', 'libvpx-vp9', '-crf', '29', '-b:v', '0', '-g', '3', '-auto-alt-ref', '0',
  '-row-mt', '1', '-cpu-used', '3', '-pix_fmt', 'yuva420p', output], { stdio: 'inherit' });

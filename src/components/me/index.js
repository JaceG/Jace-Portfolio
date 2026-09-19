'use client';
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import me from '@/assets/me.png';
import { SocialIcon } from 'react-social-icons';
import Section from '../section';
import { useEffect, useRef, useState } from 'react';
import { bio, RESUME_DOWNLOAD_URL } from '@/constants/me';

export default function Me() {
	const isDraggingRef = useRef(null);
	const imageRef = useRef(null);
	const svgRef = useRef(null);
	const mouseStartImageRef = useRef({ x: 0, y: 0 });
	const faceTrackingRef = useRef(null);
	const hideDragFeatureRef = useRef(false);
	const imageContainerRef = useRef(null);
	const staticSvgRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);
	const [dimensions, setDimensions] = useState({
		width: 0,
		height: 0,
	});
	const [strokeWidth, setStrokeWidth] = useState(10);

	const isInsideImage = (e) => {
		if (!imageRef.current) return false;
		const mouseY = e.clientY;
		const mouseX = e.clientX;
		const bounds = imageRef.current.getBoundingClientRect();
		return (
			mouseX >= bounds.left &&
			mouseX <= bounds.left + imageRef.current.width &&
			mouseY >= bounds.top &&
			mouseY <= bounds.top + imageRef.current.height
		);
	};

	// All line geometry is computed live in viewport coordinates and drawn on
	// a position:fixed SVG, so it stays correct no matter where this section
	// sits in the document or how far the page is scrolled.
	const lineGeometry = () => {
		const s = staticSvgRef.current?.getBoundingClientRect() || {
			x: 0,
			right: 0,
			bottom: 0,
		};
		return {
			startX: s.x,
			endX: s.right,
			y: s.bottom - 5,
			midX: s.x + Math.ceil((s.right - s.x) / 2),
		};
	};

	const setCurve = (d) => {
		svgRef.current?.querySelector('#curve')?.setAttribute('d', d);
	};

	const restCurve = () => {
		const { startX, endX, y, midX } = lineGeometry();
		return `M${startX},${y} C${midX},${y} ${midX},${y} ${endX},${y}`;
	};

	const handleImageMouseDown = (e) => {
		e.preventDefault();
		isDraggingRef.current = true;
		mouseStartImageRef.current = {
			x: e.clientX,
			y: e.clientY,
		};
		// Keep the static line in layout (visibility, not display) so its
		// bounds can still be measured while the live curve is drawn.
		staticSvgRef.current.style.visibility = 'hidden';
		svgRef.current.style.display = 'block';
		setCurve(restCurve());
		setIsDragging(true);
	};

	const handleImageMouseUp = () => {
		isDraggingRef.current = false;
		imageContainerRef.current.style.left = '24px';
		imageContainerRef.current.style.top = 'unset';
		imageContainerRef.current.style.bottom = '30px';
		setCurve(restCurve());
		staticSvgRef.current.style.visibility = 'visible';
		svgRef.current.style.display = 'none';
		setIsDragging(false);
	};

	const handleImageMouseMove = (e) => {
		if (!isDraggingRef.current || !imageContainerRef.current) return;
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		const distanceX = mouseX - mouseStartImageRef.current.x;
		const distanceY = mouseY - mouseStartImageRef.current.y;
		mouseStartImageRef.current = {
			x: mouseX,
			y: mouseY,
		};
		const imageLeft =
			parseInt(imageContainerRef.current.style.left?.replace('px', '')) ||
			0;
		const imageTop =
			parseInt(imageContainerRef.current.style.top?.replace('px', '')) ||
			0;
		imageContainerRef.current.style.left = `${imageLeft + distanceX}px`;
		imageContainerRef.current.style.top = `${imageTop + distanceY}px`;

		const face = faceTrackingRef.current.getBoundingClientRect();
		const { endX, y, midX } = lineGeometry();
		setCurve(
			`M${face.right},${face.bottom} C${midX},${face.y} ${midX},${face.y} ${endX},${y}`
		);
	};

	// These document-level listeners must be attached exactly once, but the
	// handlers above are redefined on every render. Keeping the latest set in a
	// ref lets the listener effect stay dependency-free and still call current
	// logic -- today the handlers only touch refs, so nothing would go stale,
	// but this stops that quietly becoming untrue if one starts reading state.
	const dragHandlersRef = useRef(null);
	useEffect(() => {
		dragHandlersRef.current = {
			isInsideImage,
			handleImageMouseDown,
			handleImageMouseUp,
			handleImageMouseMove,
		};
	});

	useEffect(() => {
		const onMove = (e) => {
			const h = dragHandlersRef.current;
			if (h.isInsideImage(e) && !hideDragFeatureRef.current) {
				h.handleImageMouseMove(e);
			} else if (isDraggingRef.current) {
				h.handleImageMouseUp(e);
			}
		};
		const onDown = (e) => {
			const h = dragHandlersRef.current;
			if (
				imageContainerRef.current?.contains(e.target) &&
				h.isInsideImage(e) &&
				!hideDragFeatureRef.current
			) {
				h.handleImageMouseDown(e);
			}
		};
		const onUp = (e) => {
			if (!hideDragFeatureRef.current && isDraggingRef.current) {
				dragHandlersRef.current.handleImageMouseUp(e);
			}
		};
		document.body.addEventListener('mousemove', onMove);
		document.body.addEventListener('mousedown', onDown);
		document.body.addEventListener('mouseup', onUp);
		return () => {
			document.body.removeEventListener('mousemove', onMove);
			document.body.removeEventListener('mousedown', onDown);
			document.body.removeEventListener('mouseup', onUp);
		};
	}, []);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width < 1279) {
				setStrokeWidth(5);
			} else {
				setStrokeWidth(10);
			}

			if (width < 768) {
				staticSvgRef.current.style.display = 'none';
				hideDragFeatureRef.current = true;
			} else {
				staticSvgRef.current.style.display = 'block';
				hideDragFeatureRef.current = false;
			}

			setDimensions({ width, height: window.innerHeight });
		};

		if (typeof window !== 'undefined') {
			handleResize();
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);


	const socialLinks = [
		{
			url: 'https://github.com/JaceG',
			label: 'GitHub',
			style: { filter: 'invert(1)' },
		},
		{
			url: 'https://linkedin.com/in/jace-galloway-6833a4249',
			label: 'LinkedIn',
		},
		{
			url: 'https://stackoverflow.com/users/1450474/jace',
			label: 'StackOverflow',
		},
	];

	return (
		<Section>
			<div>
				<svg
					ref={svgRef}
					style={{
						zIndex: '1000',
						position: 'fixed',
						top: '0',
						left: '0',
						width: '100vw',
						height: '100vh',
						overflow: 'visible',
						display: 'none',
						pointerEvents: 'none',
					}}
					xmlns='http://www.w3.org/2000/svg'
					viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
					preserveAspectRatio='none'>
					<defs>
						<marker
							id='arrow'
							viewBox='0 0 330 330'
							refX={210}
							refY='165'
							markerWidth='6'
							markerHeight='6'
							orient='auto-start-reverse'>
							<path
								id='arrow'
								d='M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
    c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
    C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
    C255,161.018,253.42,157.202,250.606,154.389z'
								fill='white'
								stroke='white'
								strokeWidth={strokeWidth}
							/>
						</marker>
					</defs>

					<path
						id='curve'
						d=''
						stroke='white'
						strokeWidth={strokeWidth}
						fill='none'
						markerStart='url(#arrow)'
					/>
				</svg>
			</div>
			<main className='flex md:flex-row flex-col'>
				<div className='md:flex-1 flex md:justify-end justify-center md:mt-0 mt-32'>
					<div className='xl:mr-[75px] md:mr-[60px] w-full md:w-auto'>
						<div className='xl:h-[800px] xl:w-[600px] md:h-[475px] md:w-[350px] h-[450px] w-[calc(100%-50px)] m-auto md:m-0 border-11 border-white relative translate-x-[-10px] md:translate-x-0'>
							<div className='absolute w-full h-full flex justify-center items-center'>
								Hire Me!
							</div>
							<div className='absolute z-10 xl:left-[580px] md:left-[330px] -top-52 md:top-0'>
								<h1 className='text-white xl:text-[112px] md:text-[72px] font-black uppercase xl:leading-[102px] md:leading-[72px] text-[52px]'>
									Jace
								</h1>
								<h1 className='text-white xl:text-[112px] md:text-[72px] font-black uppercase xl:leading-[102px] md:leading-[72px] text-[52px] leading-[42px]'>
									Galloway
								</h1>
								<img
									ref={staticSvgRef}
									src={'/line.svg'}
									alt='Line'
									className='about-img xl:ml-[-315px] md:ml-[-175px] xl:w-[925px] md:w-[550px] hidden md:block'
								/>
								<img
									src={'/line-curved-2.svg'}
									alt='Line'
									className='about-img relative top-8 xl:ml-[-300px] md:ml-[-150px] xl:w-[925px] md:w-[550px] md:hidden block'
								/>
							</div>
							<div
								ref={imageContainerRef}
								className='md:max-w-auto object-cover absolute md:left-5 md:bottom-[30px] bottom-[25px] left-6 xl:w-[600px] xl:h-[800px] md:w-[360px] h-full w-full hover:animate-shake group'>
								<span className='drag-hint absolute inset-0 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:animate-flash pointer-events-none [text-shadow:0_2px_14px_rgba(0,0,0,0.85)]'>
									Drag This Image
								</span>
								<div
									className='w-[250px] h-[250px] absolute face-tracking'
									ref={faceTrackingRef}></div>
								<Image
									ref={imageRef}
									draggable={false}
									src={me}
									alt='Me'
									className='object-cover h-full w-full group-hover:animate-shake'
								/>
							</div>
						</div>

						<div className='flex md:justify-between justify-center items-center md:flex-row flex-col md:mt-[50px] mt-8'>
							<div className='flex xl:gap-4 md:gap-2 gap-10'>
								{socialLinks.map((link, index) => (
									<SocialIcon
										key={link.label + index}
										url={link.url}
										target='_blank'
										className={`xl:w-[60px]! xl:h-[60px]! md:w-[40px]! md:h-[40px]! h-20! w-20! ${
											isDragging ? 'z-[-1]' : 'z-0'
										}`}
										rel='noopener noreferrer'
									/>
								))}
							</div>
							<a
								href={RESUME_DOWNLOAD_URL}
								className='rounded-sm bg-black flex items-center justify-center xl:py-4 xl:px-10 md:py-2 md:px-6 my-16 md:my-0 py-6 px-12 box-border text-center text-base text-white tracking-[-0.04em] uppercase font-black'>
								Download Resume
							</a>
						</div>
					</div>
				</div>
				<div className='md:flex-1 md:px-0 px-10 md:text-left text-center'>
					<div
						className={`xl:max-w-[715px] md:pr-24 text-[20px] leading-[32px] ${
							isDragging ? 'z-[-1]' : 'z-0'
						} relative`}>
						<div
							className='xl:mt-[275px] md:mt-[200px]'
							style={{
								pointerEvents: isDragging ? 'none' : 'auto',
							}}>
							{bio}
						</div>
					</div>
				</div>
			</main>
		</Section>
	);
}

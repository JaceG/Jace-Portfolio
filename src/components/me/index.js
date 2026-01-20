'use client';
/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import me from '@/assets/me.png';
import { SocialIcon } from 'react-social-icons';
import Section from '../section';
import { useEffect, useRef, useState } from 'react';
import { tabsContents } from '@/constants/me';
import Tabs from '../tabs';

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
	const [svgEndpoint, setSvgEndpoint] = useState({
		startX: 0,
		startY: 0,
		cOneX: 0,
		cTwoX: 0,
		endX: 0,
		endY: 0,
	});
	const svgEndAxis = useRef({
		startX: 0,
		startY: 0,
		cOneX: 0,
		cTwoX: 0,
		endX: 0,
		endY: 0,
	});

	const [strokeWidth, setStrokeWidth] = useState(10);
	const isInsideImage = (e) => {
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
	useEffect(() => {
		document.body.addEventListener('mousemove', (e) => {
			if (isInsideImage(e) && !hideDragFeatureRef.current) {
				handleImageMouseMove(e);
			} else if (isDraggingRef.current) {
				handleImageMouseUp(e);
			}
		});
		document.body.addEventListener('mousedown', (e) => {
			if (isInsideImage(e) && !hideDragFeatureRef.current) {
				handleImageMouseDown(e);
			}
		});
		document.body.addEventListener('mouseup', (e) => {
			if (!hideDragFeatureRef.current) {
				handleImageMouseUp(e);
			}
		});
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
			const staticRectBound =
				staticSvgRef.current.getBoundingClientRect();
			const startX = staticRectBound.x;
			const startY = staticRectBound.bottom - 5;
			const endX = staticRectBound.right;
			const endY = staticRectBound.bottom - 5;
			const midPoint = Math.ceil((endX - startX) / 2);
			const cOneX = startX + midPoint;
			const cTwoX = startX + midPoint;
			setSvgEndpoint({
				startX, // Offset from center
				startY,
				cOneX,
				cTwoX,
				endX, // Offset from center
				endY,
			});
			svgEndAxis.current.startX = startX;
			svgEndAxis.current.startY = startY;
			svgEndAxis.current.cOneX = cOneX;
			svgEndAxis.current.cTwoX = cTwoX;
			svgEndAxis.current.endX = endX;
			svgEndAxis.current.endY = endY;
		};

		// Run on mount and handle window resize
		if (typeof window !== 'undefined') {
			handleResize();
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	const handleImageMouseDown = (e) => {
		let doc = document.documentElement;
		let top = window.scrollY || doc.scrollTop;
		const maxHeight =
			imageContainerRef.current.getBoundingClientRect().bottom;
		if (top > maxHeight / 2) return;
		isDraggingRef.current = true;
		mouseStartImageRef.current = {
			x: e.clientX,
			y: e.clientY,
		};
		staticSvgRef.current.style.display = 'none';
		svgRef.current.style.display = 'block';
		setIsDragging(true);
	};

	const handleImageMouseUp = () => {
		isDraggingRef.current = false;
		imageContainerRef.current.style.left = '24px';
		imageContainerRef.current.style.top = 'unset';
		imageContainerRef.current.style.bottom = '30px';
		svgRef.current.style.transform = 'rotate(0deg)';
		svgRef.current
			.querySelector('#curve')
			.setAttribute(
				'd',
				`M${svgEndAxis.current.startX},${svgEndAxis.current.startY} , C${svgEndAxis.current.cOneX},${svgEndAxis.current.startY} ${svgEndAxis.current.cTwoX},${svgEndAxis.current.startY} ${svgEndAxis.current.endX},${svgEndAxis.current.endY}`
			);
		staticSvgRef.current.style.display = 'block';
		svgRef.current.style.display = 'none';
		setIsDragging(false);
	};

	const handleImageMouseMove = (e) => {
		if (!isDraggingRef.current) return;
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
		const faceRectBounds = faceTrackingRef.current.getBoundingClientRect();
		let doc = document.documentElement;
		let top = window.scrollY || doc.scrollTop;
		svgRef.current
			.querySelector('#curve')
			.setAttribute(
				'd',
				`M${faceRectBounds.right},${faceRectBounds.bottom + top} , C${
					svgEndAxis.current.cOneX
				},${faceRectBounds.y + top} ${svgEndAxis.current.cTwoX},${
					faceRectBounds.y + top
				} ${svgEndAxis.current.endX},${svgEndAxis.current.endY}`
			);
		// const radians = Math.atan2(faceTrackerRect.y, faceTrackerRect.x);

		// let degrees = Math.ceil(radians * (180 / Math.PI));
		// if (faceTrackerRect.y >= svgRef.current.getBoundingClientRect().y) {
		// 	degrees *= -1;
		// }

		// svgRef.current.style.transform = `rotate(${degrees}deg)`;
	};

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
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						// height: 5162,
						transform: `rotate(0deg)`,
						overflow: 'visible',
						display: 'none',
					}}
					xmlns='http://www.w3.org/2000/svg'
					viewBox={`0 0 ${dimensions.width} ${5162}`}
					preserveAspectRatio='xMidYMid meet'>
					<defs>
						<marker
							id='arrow'
							viewBox='0 0 330 330'
							refX={210} // Adjust to properly align arrowhead with path start
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
						d={`M${svgEndpoint.startX},${svgEndpoint.startY} C${svgEndpoint.cOneX},${svgEndpoint.startY} ${svgEndpoint.cTwoX},${svgEndpoint.startY} ${svgEndpoint.endX},${svgEndpoint.endY}`}
						stroke='white'
						strokeWidth={strokeWidth}
						fill='none'
						markerStart='url(#arrow)' // Arrow at the start
					/>
				</svg>
			</div>
			<main className='flex md:flex-row flex-col'>
				<div className='md:flex-1 flex md:justify-end justify-center md:mt-0 mt-32'>
					<div className='xl:mr-[75px] md:mr-[60px] w-full md:w-auto'>
						<div className='xl:h-[800px] xl:w-[600px] md:h-[475px] md:w-[350px] h-[450px] w-[calc(100%-50px)] m-auto md:m-0 border-[11px] border-white relative -translate-x-[10px] md:translate-x-0'>
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
									className='about-img relative xl:right-[315px] md:right-[175px] xl:w-[925px] md:w-[550px] hidden md:block'
								/>
								<img
									src={'/line-curved-2.svg'}
									alt='Line'
									className='about-img relative xl:right-[300px] md:right-[150px] xl:w-[925px] md:w-[550px] md:hidden block top-8'
								/>
							</div>
							<div
								ref={imageContainerRef}
								className='md:max-w-auto object-cover absolute md:left-5 md:bottom-[30px] bottom-[25px] left-6 xl:w-[600px] xl:h-[800px] md:w-[360px] h-full w-full hover:animate-shake group'
								// onMouseDown={handleImageMouseDown}
								// onMouseUp={handleImageMouseUp}
								// onMouseOut={handleImageMouseUp}
								// onMouseMove={handleImageMouseMove}
							>
								<span className='absolute inset-0 flex items-center justify-center text-white font-bold text-xl opacity-0 group-hover:animate-flash pointer-events-none'>
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
										className={`xl:!w-[60px] xl:!h-[60px] md:!w-[40px] md:!h-[40px] !h-20 !w-20 ${
											isDragging ? 'z-[-1]' : 'z-[0]'
										}`}
										rel='noopener noreferrer'
									/>
								))}
							</div>
							<a
								href='https://drive.google.com/uc?export=download&id=1Hh7V3ycVcd_O5yX2Q-txQy2b_HIVx1Fe'
								className='rounded bg-black flex items-center justify-center xl:py-4 xl:px-10 md:py-2 md:px-6 my-16 md:my-0 py-6 px-12 box-border text-center text-base text-white tracking-[-0.04em] uppercase font-black'>
								Download Resume
							</a>
						</div>
					</div>
				</div>
				<div className='md:flex-1 md:px-0 px-10 md:text-left text-center'>
					<div
						className={`xl:max-w-[715px] md:pr-24 text-[20px] leading-[32px] ${
							isDragging ? 'z-[-1]' : 'z-[0]'
						} relative`}>
						<div className='xl:mt-[275px] md:mt-[200px]'>
							<Tabs
								tabsContents={tabsContents}
								isDragging={isDragging}
							/>
						</div>
					</div>
				</div>
			</main>
		</Section>
	);
}

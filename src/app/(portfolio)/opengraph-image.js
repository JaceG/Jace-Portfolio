import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Jace Galloway - Full-Stack Developer';
export const size = {
	width: 1200,
	height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					fontSize: 64,
					background: '#0A0E27',
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					color: 'white',
					fontFamily: 'sans-serif',
				}}>
				<div
					style={{
						fontSize: 72,
						fontWeight: 'bold',
						marginBottom: 20,
						color: '#39BD6D',
					}}>
					Jace Galloway
				</div>
				<div
					style={{
						fontSize: 40,
						color: '#E0E0E0',
					}}>
					Full-Stack Developer & Software Engineer
				</div>
				<div
					style={{
						fontSize: 28,
						color: '#A0A0A0',
						marginTop: 30,
					}}>
					React • Node.js • TypeScript • Next.js
				</div>
			</div>
		),
		{
			...size,
		}
	);
}

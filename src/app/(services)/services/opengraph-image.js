import { ImageResponse } from 'next/og';

export const alt = 'Jace Galloway — Website modernization. Your website, rebuilt for today. Owned by you.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: 80,
					background: '#f7f4ee',
					color: '#16181d',
					fontFamily: 'serif',
				}}>
				<div
					style={{
						fontSize: 28,
						letterSpacing: 4,
						textTransform: 'uppercase',
						color: '#b8431a',
						fontFamily: 'sans-serif',
						fontWeight: 700,
					}}>
					Website modernization
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', fontSize: 84, lineHeight: 1.05 }}>
					<span>Your website, rebuilt for today.</span>
					<span style={{ color: '#b8431a' }}>Owned by you.</span>
				</div>
				<div style={{ fontSize: 30, fontFamily: 'sans-serif', color: '#5b5f68' }}>
					Jace Galloway · Web Development
				</div>
			</div>
		),
		size
	);
}

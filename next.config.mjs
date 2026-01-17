/** @type {import('next').NextConfig} */
const nextConfig = {
	// Redirect non-www to www for SEO consistency
	// This ensures all traffic goes to the canonical www version
	async redirects() {
		return [
			{
				source: '/:path*',
				has: [
					{
						type: 'host',
						value: 'hirejace.com',
					},
				],
				destination: 'https://www.hirejace.com/:path*',
				permanent: true, // 301 redirect for SEO
			},
		];
	},
};

export default nextConfig;

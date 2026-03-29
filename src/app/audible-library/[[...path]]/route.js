import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { NextResponse } from 'next/server';

const CONTENT_TYPES = {
	'.html': 'text/html; charset=utf-8',
	'.css': 'text/css; charset=utf-8',
	'.js': 'application/javascript; charset=utf-8',
	'.json': 'application/json; charset=utf-8',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.gif': 'image/gif',
	'.svg': 'image/svg+xml',
	'.ico': 'image/x-icon',
	'.webp': 'image/webp',
	'.webmanifest': 'application/manifest+json',
	'.xml': 'application/xml',
	'.woff': 'font/woff',
	'.woff2': 'font/woff2',
};

const BASE_DIR = join(process.cwd(), 'public', 'audible-library');

export async function GET(_request, context) {
	const { path: segments } = await context.params;
	const relativePath =
		segments?.length > 0 ? segments.join('/') : 'index.html';

	if (relativePath.includes('..')) {
		return new NextResponse('Forbidden', { status: 403 });
	}

	const filePath = join(BASE_DIR, relativePath);

	if (!filePath.startsWith(BASE_DIR)) {
		return new NextResponse('Forbidden', { status: 403 });
	}

	try {
		const content = await readFile(filePath);
		const ext = extname(filePath).toLowerCase();
		const contentType = CONTENT_TYPES[ext] || 'application/octet-stream';

		const cacheControl =
			ext === '.html'
				? 'public, max-age=0, must-revalidate'
				: 'public, max-age=31536000, immutable';

		return new NextResponse(content, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': cacheControl,
			},
		});
	} catch {
		return new NextResponse('Not Found', { status: 404 });
	}
}

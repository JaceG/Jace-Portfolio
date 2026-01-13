'use client';

import { useEffect } from 'react';
import Hotjar from '@hotjar/browser';

export default function HotjarInit() {
	useEffect(() => {
		Hotjar.init(5320763, 6);
	}, []);

	return null;
}

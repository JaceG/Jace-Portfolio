// Small building blocks shared by the services site's sections.

const BUTTON_SIZES = {
	sm: 'px-4 py-2 text-sm',
	lg: 'px-7 py-4 text-base sm:text-lg',
};

/** A booking link. External ones open Google's booking page in a new tab. */
export function BookButton({ href, size = 'lg', children }) {
	const external = href.startsWith('http');
	return (
		<a
			href={href}
			{...(external && { target: '_blank', rel: 'noopener noreferrer' })}
			className={`inline-flex shrink-0 items-center justify-center rounded-full bg-accent font-semibold text-white transition-colors hover:bg-accent-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${BUTTON_SIZES[size]}`}>
			{children}
		</a>
	);
}

export function Container({ children, className = '' }) {
	return <div className={`mx-auto max-w-6xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }) {
	return (
		<p className='text-sm font-semibold uppercase tracking-[0.14em] text-accent'>
			{children}
		</p>
	);
}

export function SectionTitle({ children }) {
	return (
		<h2 className='mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-5xl'>
			{children}
		</h2>
	);
}

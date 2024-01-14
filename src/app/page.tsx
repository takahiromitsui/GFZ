import dynamic from 'next/dynamic';

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
	ssr: false,
});

export default function Home() {
	return (
		<main>
			<InteractiveMap />
		</main>
	);
}

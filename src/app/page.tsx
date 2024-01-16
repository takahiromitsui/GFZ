import StationControl from '@/components/station-control';
import NetworkStationContextProvider from '@/store/network-station-context';
export default function Home() {
	return (
		<>
			<header className='w-screen bg-blue-600 text-white p-10 font-bold'>
				<h1 className='text-2xl'>Interactive Map</h1>
			</header>
			<main className='flex mt-10'>
				<NetworkStationContextProvider>
					<StationControl />
				</NetworkStationContextProvider>
			</main>
		</>
	);
}

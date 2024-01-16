import StationControl from '@/components/station-control';
import NetworkStationContextProvider from '@/store/network-station-context';
export default function Home() {
	return (
		// <main className='flex ml-40 max-w-screen-lg'>
		<>
			<header className='w-full bg-blue-600 text-white p-10 font-bold'>
        <h1 className='text-2xl'>Interactive Map</h1>
      </header>
			<main className='flex ml-40 max-w-screen-lg mt-10'>
			<NetworkStationContextProvider>
				<div className='flex-none'>
					<StationControl />
				</div>
			</NetworkStationContextProvider>
			</main>
		</>
		// </main>
	);
}

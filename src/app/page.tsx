import StationControl from '@/components/station-control';
import NetworkStationContextProvider from '@/store/network-station-context';
export default function Home() {
	return (
		<main className='flex mx-auto max-w-screen-lg'>
			<NetworkStationContextProvider>
				<div className='flex-none'>
					{/* Station Control Component */}
					<StationControl />
				</div>
				{/* <div className='flex-1 flex flex-col ml-3'>
					<div className='mb-4 flex-grow'>
						<CustomMap />
					</div>

					<section>
						<h1 className='text-3xl font-bold mb-4'> All stations</h1>
					</section>
				</div> */}
			</NetworkStationContextProvider>
		</main>
	);
}

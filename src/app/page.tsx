import StationControl from '@/components/station-control';
import NetworkStationContextProvider from '@/store/network-station-context';
export default function Home() {
	return (
		<main className='flex ml-40 max-w-screen-lg'>
			<NetworkStationContextProvider>
				<div className='flex-none'>
					<StationControl />
				</div>
			</NetworkStationContextProvider>
		</main>
	);
}

import dynamic from 'next/dynamic';
import { Station, columns } from './columns';
import { DataTable } from '@/components/data-table';
import { Component } from 'lucide-react';
import StationControl, {
	StationControlProps,
} from '@/components/station-control';

const CustomMap = dynamic(() => import('@/components/custom-map'), {
	ssr: false,
});

const BASE_URL = 'https://geofon.gfz-potsdam.de/fdsnws/station/1/query?';

async function getNetworks(): Promise<StationControlProps[]> {
	const res = await fetch(BASE_URL + 'level=network&format=text');
	const text = await res.text();
	const lines = text.split('\n');
	const networks: StationControlProps[] = [];
	// skip first and last line
	for (const line of lines.slice(1, -1)) {
		const [network, description, startTime, endTime, totalStations] =
			line.split('|');
		networks.push({
			network,
			description,
			startTime,
		});
	}
	return networks;
}

// e.g., https://geofon.gfz-potsdam.de/fdsnws/station/1/query?format=text&network=CX&level=station
async function getStations(): Promise<Station[]> {
	const res = await fetch(
		'https://geofon.gfz-potsdam.de/fdsnws/station/1/query?format=text&network=CX&level=station'
	);
	const text = await res.text();
	const lines = text.split('\n');
	const stations: Station[] = [];
	// skip first and last line
	for (const line of lines.slice(1, -1)) {
		const [
			network,
			station,
			latitude,
			longitude,
			elevation,
			siteName,
			startTime,
			endTime,
		] = line.split('|');
		stations.push({
			network,
			station,
			latitude: parseFloat(latitude),
			longitude: parseFloat(longitude),
			elevation: parseFloat(elevation),
			siteName,
			startTime,
			endTime,
		});
	}
	return stations;
}

export default async function Home() {
	return (
		<main className='flex mx-auto max-w-screen-lg'>
			<div className='flex-none'>
				{/* Station Control Component */}
				<StationControl props={await getNetworks()} />
				Station Control
			</div>
			<div className='flex-1 flex flex-col ml-3'>
				{/* CustomMap Component */}
				<div className='mb-4'>
					<CustomMap />
				</div>
				{/* DataTable Component */}
				<section>
					<h1 className='text-3xl font-bold mb-4'> All stations</h1>
					<DataTable columns={columns} data={await getStations()} />
				</section>
			</div>
		</main>
	);
}

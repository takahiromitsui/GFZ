import dynamic from 'next/dynamic';
import { Station, columns } from './columns';
import { DataTable } from '@/components/DataTable';

const CustomMap = dynamic(() => import('@/components/CustomMap'), {
	ssr: false,
});
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
		<main>
			{/* <CustomMap /> */}
			<section className='py-24'>
				<div className='container'>
					<h1 className='text-3xl font-bold'> All stations</h1>
					<DataTable columns={columns} data={await getStations()} />
				</div>
			</section>
		</main>
	);
}

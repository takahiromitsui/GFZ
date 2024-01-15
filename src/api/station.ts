import { BASE_URL } from '.';
import { NetworkDataType } from './network';

export type StationDataType = {
	network: string;
	station: string;
	latitude: number;
	longitude: number;
	elevation: number;
	siteName: string;
	startTime: string;
	endTime: string;
};

export async function getStations({network}: NetworkDataType): Promise<StationDataType[]> {
	const res = await fetch(
		BASE_URL + 'format=text&level=station&network=' + network
	);
	const text = await res.text();
	const lines = text.split('\n');
	const stations: StationDataType[] = [];
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

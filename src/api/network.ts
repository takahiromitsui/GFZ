import { BASE_URL } from '.';

export type NetworkDataType = {
	network: string;
	description: string;
	startTime: string;
};

export async function getNetworks(): Promise<NetworkDataType[]> {
	const res = await fetch(BASE_URL + 'level=network&format=text');
	const text = await res.text();
	const lines = text.split('\n');
	const networks: NetworkDataType[] = [];
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

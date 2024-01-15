'use client';
import { useEffect, useState, createContext, ReactNode } from 'react';
import { NetworkDataType, getNetworks } from '@/api/network';
import { StationDataType, getStations } from '@/api/station';
import { DataTable } from '@/components/data-table';
import { columns } from '@/app/columns';
import CustomMap from '@/components/custom-map';

type NetworkStationContextType = {
	networks: NetworkDataType[];
	setCurrentNetwork: (network: NetworkDataType) => void;
	stations: StationDataType[];
};

export const NetworkStationContext = createContext({
	networks: [],
	setCurrentNetwork: () => {},
	stations: [],
} as NetworkStationContextType);

export default function NetworkStationContextProvider(props: {
	children: ReactNode;
}) {
	const [networks, setNetworks] = useState<NetworkDataType[]>([]);
	const [currentNetwork, setCurrentNetwork] = useState<NetworkDataType | null>(
		null
	);
	const [stations, setStations] = useState<StationDataType[]>([]);

	useEffect(() => {
		getNetworks().then(networks => setNetworks(networks));
	}, []);

	useEffect(() => {
		if (currentNetwork) {
			getStations(currentNetwork).then(stations => {
				setStations(stations);
			});
		}
	}, [currentNetwork]);

	return (
		<NetworkStationContext.Provider
			value={{ networks, setCurrentNetwork, stations }}
		>
			{props.children}
			<div className='flex-1 flex flex-col ml-3'>
				{/* CustomMap Component */}
				<div className='mb-4 flex-grow'>
					<CustomMap />
				</div>
				{/* DataTable Component */}
				<section>
					<h1 className='text-3xl font-bold mb-4'> All stations</h1>
					<DataTable columns={columns} data={stations} />
				</section>
			</div>
		</NetworkStationContext.Provider>
	);
}

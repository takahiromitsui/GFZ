'use client';
import {
	useEffect,
	useState,
	createContext,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';
import { NetworkDataType, getNetworks } from '@/api/network';
import { StationDataType, getStations } from '@/api/station';
import { DataTable } from '@/components/data-table';
import { columns } from '@/app/columns';
import dynamic from 'next/dynamic';

const CustomMap = dynamic(() => import('@/components/custom-map'), {
	ssr: false,
});

type NetworkStationContextType = {
	networks: NetworkDataType[];
	setCurrentNetwork: Dispatch<SetStateAction<NetworkDataType | null>>;
	stations: StationDataType[];
	selectedStations: StationDataType[];
	setSelectedStations: Dispatch<SetStateAction<StationDataType[]>>;
	rowSelection: {};
	setRowSelection: Dispatch<SetStateAction<{}>>;
};

export const NetworkStationContext = createContext({
	networks: [],
	setCurrentNetwork: () => {},
	stations: [],
	selectedStations: [],
	setSelectedStations: () => {},
	rowSelection: {},
	setRowSelection: () => {},
} as NetworkStationContextType);

export default function NetworkStationContextProvider(props: {
	children: ReactNode;
}) {
	const [networks, setNetworks] = useState<NetworkDataType[]>([]);
	const [currentNetwork, setCurrentNetwork] = useState<NetworkDataType | null>(
		null
	);
	const [stations, setStations] = useState<StationDataType[]>([]);
	const [selectedStations, setSelectedStations] = useState<StationDataType[]>(
		[]
	);
	const [rowSelection, setRowSelection] = useState({});
	const totalStations = stations.length;

	useEffect(() => {
		getNetworks().then(networks => setNetworks(networks));
	}, []);

	useEffect(() => {
		if (currentNetwork) {
			getStations(currentNetwork).then(stations => {
				setStations(prev => {
					return [...stations];
				});
			});
		}
	}, [currentNetwork]);

	return (
		<NetworkStationContext.Provider
			value={{
				networks,
				setCurrentNetwork,
				stations,
				selectedStations,
				setSelectedStations,
				rowSelection,
				setRowSelection,
			}}
		>
			{props.children}
			<div className='flex-1 flex flex-col ml-3'>
				{/* CustomMap Component */}
				<div className='mb-4 flex-grow'>
					<CustomMap markersData={stations} />
				</div>
				{/* DataTable Component */}
				<section style={{ height: '400px', width: '70%', overflowY: 'auto', paddingBottom:'3rem' }}>
					<h1 className='text-3xl font-bold mb-4'>
						Stations{' '}
						{totalStations > 0 && (
							<span>
								({totalStations} {totalStations === 1 ? 'station' : 'stations'})
							</span>
						)}
					</h1>
					<DataTable columns={columns} data={stations} />
				</section>
			</div>
		</NetworkStationContext.Provider>
	);
}

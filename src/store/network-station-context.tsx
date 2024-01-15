'use client';
import { useEffect, useState, createContext, ReactNode } from 'react';
import { NetworkDataType, getNetworks } from '@/api/network';
import { StationDataType, getStations } from '@/api/station';

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
			getStations(currentNetwork).then(stations => setStations(stations));
		}
	}, [currentNetwork]);

	return (
		<NetworkStationContext.Provider
			value={{ networks, setCurrentNetwork, stations }}
		>
			{props.children}
		</NetworkStationContext.Provider>
	);
}

'use client';
import { useEffect, useState, createContext, ReactNode } from 'react';
import { NetworkDataType, getNetworks } from '@/api/network';

type NetworkStationContextType = {
	networks: NetworkDataType[];
};

export const NetworkStationContext = createContext({
	networks: [],
} as NetworkStationContextType);

export default function NetworkStationContextProvider(props: {
	children: ReactNode;
}) {
	const [networks, setNetworks] = useState<NetworkDataType[]>([]);

	useEffect(() => {
		getNetworks().then(networks => setNetworks(networks));
	}, []);

	return (
		<NetworkStationContext.Provider value={{ networks }}>
			{props.children}
		</NetworkStationContext.Provider>
	);
}

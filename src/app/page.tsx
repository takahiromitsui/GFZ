'use client';
import dynamic from 'next/dynamic';
import { columns } from './columns';
import { DataTable } from '@/components/data-table';

import NetworkStationContextProvider, { NetworkStationContext } from '@/store/network-station-context';
import StationControl from '@/components/station-control';
import { useContext } from 'react';

const CustomMap = dynamic(() => import('@/components/custom-map'), {
	ssr: false,
});

export default  function Home() {
	const {stations} = useContext(NetworkStationContext);
	return (
		<main className='flex mx-auto max-w-screen-lg'>
			<NetworkStationContextProvider>
				<div className='flex-none'>
					{/* Station Control Component */}
					<StationControl />
				</div>
				<div className='flex-1 flex flex-col ml-3'>
					{/* CustomMap Component */}
					<div className='mb-4'>
						<CustomMap />
					</div>
					{/* DataTable Component */}
					<section>
						<h1 className='text-3xl font-bold mb-4'> All stations</h1>
						<DataTable columns={columns} data = {stations}/>
					</section>
				</div>
			</NetworkStationContextProvider>
		</main>
	);
}

'use client';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { ColumnDef } from '@tanstack/react-table';
//#Network|Station|Latitude|Longitude|Elevation|SiteName|StartTime|EndTime
export type Station = {
	network: string;
	station: string;
	latitude: number;
	longitude: number;
	elevation: number;
	siteName: string;
	startTime: string;
	endTime: string;
};

export const columns: ColumnDef<Station>[] = [
	{
		accessorKey: 'network',
		header: 'Network',
	},
	{
		accessorKey: 'station',
		header: 'Station',
	},
	{
		accessorKey: 'latitude',
		header: 'Latitude',
	},
	{
		accessorKey: 'longitude',
		header: 'Longitude',
	},
	{
		accessorKey: 'elevation',
		header: 'Elevation',
	},
	{
		accessorKey: 'siteName',
		header: 'Site Name',
	},
	{
		accessorKey: 'startTime',
		header: 'Start Time',
		cell:({row}) => {
			const date = new Date(row.getValue('startTime'));
			const formattedDate = format(date, 'dd/MM/yyyy', { locale: enGB });
			return <div className='font-medium'>{formattedDate}</div>
		}
	},
	{
		accessorKey: 'endTime',
		header: 'End Time',
		// cell:({row}) => {
		// 	const date = new Date(row.getValue('endTime'));
			
		// 	const formattedDate = date.toLocaleDateString();
		// 	return <div className='font-medium'>{formattedDate}</div>
		// }
	},
];

'use client';

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
	},
	{
		accessorKey: 'endTime',
		header: 'End Time',
	},
];

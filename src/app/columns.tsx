'use client';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Network
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'station',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Station
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'latitude',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Latitude
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'longitude',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Longitude
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'elevation',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Elevation
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'siteName',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Site Name
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'startTime',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Start Time
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		cell: ({ row }) => {
			const date = new Date(row.getValue('startTime'));
			const formattedDate = format(date, 'dd/MM/yyyy', { locale: enGB });
			return <div className='font-medium'>{formattedDate}</div>;
		},
	},
	{
		accessorKey: 'endTime',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					End Time
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
		// cell:({row}) => {
		// 	const date = new Date(row.getValue('endTime'));

		// 	const formattedDate = date.toLocaleDateString();
		// 	return <div className='font-medium'>{formattedDate}</div>
		// }
	},
];

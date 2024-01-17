'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	getPaginationRowModel,
	useReactTable,
	SortingState,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useContext, useEffect, useRef, useState } from 'react';
import { NetworkStationContext } from '@/store/network-station-context';
import { StationDataType } from '@/api/station';
import { areObjectsEqual } from '@/utils/object-utils';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const {
		selectedStations,
		setSelectedStations,
		rowSelection,
		setRowSelection,
	} = useContext(NetworkStationContext);
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			rowSelection,
		},
	});
	const previousRowSelectionRef = useRef(rowSelection);

	useEffect(() => {
		const stationData = data as StationDataType[];

		const newRowSelection = selectedStations.reduce((acc: any, item) => {
			if (!data || !item) {
				return acc;
			}
			if (data.length === 0 || !item.id) {
				return acc;
			}
			const index = stationData.findIndex(station => station.id === item.id);
			acc[index] = true;
			return acc;
		}, {});

		// Check if newRowSelection is different from the previous rowSelection
		const hasRowSelectionChanged = !areObjectsEqual(
			newRowSelection,
			previousRowSelectionRef.current
		);

		if (hasRowSelectionChanged) {
			setRowSelection(prevRowSelection => ({
				...prevRowSelection,
				...newRowSelection,
			}));
		}

		// Update the ref with the current rowSelection for the next comparison
		previousRowSelectionRef.current = newRowSelection;
	}, [selectedStations, setRowSelection, data]);

	useEffect(() => {
		const updateSelectedStationsFromRowSelection = () => {
			const selectedStationsFromRowSelection = Object.keys(rowSelection)
				.filter(index => rowSelection[index as keyof typeof rowSelection])
				.map(index => data[Number(index)]);

			setSelectedStations(
				selectedStationsFromRowSelection as StationDataType[]
			);
		};

		updateSelectedStationsFromRowSelection();
	}, [rowSelection, data, setSelectedStations]);

	return (
		<>
			{/* Table */}
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map(headerGroup => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map(header => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map(row => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className='h-24 text-center'
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{/* Pagination */}
			<div className='flex items-center justify-end space-x-2 py-4'>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant='outline'
					size='sm'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
			{/* Selected*/}
			<div className='flex-1 text-sm text-muted-foreground'>
				{table.getFilteredSelectedRowModel().rows.length} of{' '}
				{table.getFilteredRowModel().rows.length} row(s) selected.
			</div>
		</>
	);
}

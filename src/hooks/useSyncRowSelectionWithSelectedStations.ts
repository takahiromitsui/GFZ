import { SetStateAction, useEffect, useRef, Dispatch } from 'react';
import { areObjectsEqual } from '@/utils/object-utils';
import { StationDataType } from '@/api/station';

export const useSyncRowSelectionWithSelectedStations = (
	selectedStations: StationDataType[],
	setRowSelection: Dispatch<SetStateAction<{}>>,
	data: any
) => {
	const previousRowSelectionRef = useRef({});

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
};

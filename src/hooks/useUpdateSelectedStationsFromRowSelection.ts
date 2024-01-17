import { StationDataType } from '@/api/station';
import { useEffect, Dispatch, SetStateAction } from 'react';

export const useUpdateSelectedStationsFromRowSelection = (
	rowSelection: {},
	data: any,
	setSelectedStations: Dispatch<SetStateAction<StationDataType[]>>
) => {
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
};

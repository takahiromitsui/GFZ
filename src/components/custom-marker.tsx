'use client';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { StationDataType } from '@/api/station';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NetworkStationContext } from '@/store/network-station-context';

type CustomMarkerProps = {
	station: StationDataType;
};

export default function CustomMarker({ station }: CustomMarkerProps) {
	const { setSelectedStations, selectedStations, setRowSelection, stations } =
		useContext(NetworkStationContext);

	const isSelected =
		selectedStations?.some(item => item?.id === station.id) ?? false;
	const iconURL = isSelected
		? '/assets/selected-marker-icon.png'
		: '/assets/marker-icon.png';

	const customIcon = new Icon({
		iconUrl: iconURL,
		iconSize: [38, 38],
	});

	const position = [station.latitude, station.longitude] as LatLngExpression;

	const handleSelect = () => {
		const rowSelectionKey = stations.findIndex(item => item.id === station.id);
		if (isSelected) {
			setRowSelection((prev: any) => {
				const { [rowSelectionKey]: _, ...rest } = prev;
				return rest;
			});
		}
		setSelectedStations((prev: StationDataType[]) => {
			return isSelected
				? prev.filter(item => item?.id !== station.id)
				: [...prev, station];
		});
	};

	return (
		<Marker position={position} icon={customIcon}>
			<Popup>
				<div className='popup-content'>
					<h3 className='popup-title'>
						Network: {station.network} / Station: {station.station}
					</h3>
					<p>
						Latitude: {station.latitude} Longitude: {station.longitude}
					</p>
					<Button
						onClick={handleSelect}
						className={
							isSelected
								? 'bg-red-500 hover:bg-red-700'
								: 'bg-blue-500 hover:bg-blue-700'
						}
						type='button'
					>
						{isSelected ? 'Unselect' : 'Select'}
					</Button>
				</div>
			</Popup>
		</Marker>
	);
}

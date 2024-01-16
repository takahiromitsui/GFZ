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
	const {
		setSelectedStations,
		selectedStations,
		rowSelection,
		setRowSelection,
		stations,
	} = useContext(NetworkStationContext);

	const isSelected =
		selectedStations?.some(item => item && item.id && item.id === station.id) ??
		false;

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
				? prev.filter(item => item && item.id && item.id !== station.id)
				: [...prev, station];
		});
	};

	const iconURL = isSelected
		? 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png'
		: 'https://cdn-icons-png.flaticon.com/512/149/149060.png';

	const customIcon = new Icon({
		iconUrl: iconURL,
		iconSize: [38, 38],
	});
	return (
		<Marker position={position} icon={customIcon}>
			<Popup>
				<div className='popup-content'>
					<h3 className='popup-title'>
						Network: {station.network} / Station: {station.station}
					</h3>
					<p>
						Longitude: {station.longitude} Latitude: {station.latitude}
					</p>
					<Button onClick={handleSelect} className='popup-button' type='button'>
						{isSelected ? 'Unselect' : 'Select'}
					</Button>
				</div>
			</Popup>
		</Marker>
	);
}

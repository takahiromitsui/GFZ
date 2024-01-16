'use client';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import { StationDataType } from '@/api/station';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NetworkStationContext } from '@/store/network-station-context';

type CustomMarkerProps = {
	station: StationDataType;
};

export default function CustomMarker({ station }: CustomMarkerProps) {
	const { setSelectedStations, selectedStations } = useContext(
		NetworkStationContext
	);
	const [isSelected, setIsSelected] = useState(() => {
		if (selectedStations) {
			return selectedStations.some(item => item.id && item.id === station.id);
		}
		return false;
	});

	useEffect(() => {
		setIsSelected(
			Array.isArray(selectedStations) && 
      selectedStations.some(item => item && item.id && item.id === station.id)
		);
	}, [selectedStations, station.id]);

	const position = [station.latitude, station.longitude] as LatLngExpression;
	const iconURL = isSelected
		? 'https://cdn-icons-png.flaticon.com/512/2776/2776067.png'
		: 'https://cdn-icons-png.flaticon.com/512/149/149060.png';
	const customIcon = new Icon({
		// iconUrl: require('../assets/marker-icon.png'),
		iconUrl: iconURL,
		iconSize: [38, 38],
	});
	const handleSelect = () => {
		if (!isSelected) {
			setSelectedStations((prev: StationDataType[]) => {
				return [...prev, station];
			});
		} else {
			setSelectedStations((prev: StationDataType[]) =>
				prev.filter((item: StationDataType) => item.id !== station.id)
			);
		}
		setIsSelected(!isSelected);
	};

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

import { Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { StationDataType } from '@/api/station';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

type CustomMarkerProps = {
	station: StationDataType;
};

export default function CustomMarker({ station }: CustomMarkerProps) {
	const [isSelected, setIsSelected] = useState(false);
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

'use client';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';

import 'leaflet/dist/leaflet.css';

export default function InteractiveMap() {
	const position = [51.505, -0.09] as LatLngExpression;
	const customIcon = new Icon({
		// iconUrl: require('../assets/marker-icon.png'),
		iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
		iconSize: [38, 38],
	});
	//Move to a separate component later
	const markers = [
		{
			position: [51.505, -0.09] as LatLngExpression,
			icon: customIcon,
			popup: 'marker 1',
		},
		{
			position: [51.51, -0.09] as LatLngExpression,
			icon: customIcon,
			popup: 'marker 2',
		},
		{
			position: [51.51, -0.1] as LatLngExpression,
			icon: customIcon,
			popup: 'marker 3',
		},
	];

	return (
		<MapContainer center={position} zoom={13}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			{markers.map(marker => (
				<Marker key={'marker'} position={marker.position} icon={marker.icon}>
					<Popup>{marker.popup}</Popup>
				</Marker>
			))}
		</MapContainer>
	);
}

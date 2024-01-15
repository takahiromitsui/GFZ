'use client';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { DivIcon, Icon, LatLngExpression, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import 'leaflet/dist/leaflet.css';
import { StationDataType } from '@/api/station';

type CustomMapProps = {
	markersData?: StationDataType[];
};

export default function CustomMap({ markersData }: CustomMapProps) {
	const position = [51.505, -0.09] as LatLngExpression;
	const customIcon = new Icon({
		// iconUrl: require('../assets/marker-icon.png'),
		iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
		iconSize: [38, 38],
	});
	const createClusterCustomIcon = (cluster: any) => {
		return new DivIcon({
			html: `<div>${cluster.getChildCount()}</div>`,
			iconSize: [33, 33],
			className: 'custom-cluster',
		});
	};

	return (
		<MapContainer
			center={position}
			zoom={13}
			style={{
				height: '400px',
				width: '100%',
				zIndex: 0,
			}}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
			/>
			{markersData && (
				<MarkerClusterGroup
					chunkedLoading
					iconCreateFunction={createClusterCustomIcon}
				>
					{markersData.map((station, index) => (
						<Marker
							key={`${station}-${index}`}
							position={
								[station.latitude, station.longitude] as LatLngExpression
							}
							icon={customIcon}
						>
							<Popup>
								<div className='popup-content'>
									<h3 className='popup-title'>
										Network: {station.network} / Station: {station.station}
									</h3>
									<p>
										Longitude: {station.longitude} Latitude: {station.latitude}
									</p>
								</div>
							</Popup>
						</Marker>
					))}
				</MarkerClusterGroup>
			)}
		</MapContainer>
	);
}

'use client';
import { MapContainer, TileLayer } from 'react-leaflet';
import { DivIcon, LatLngExpression } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import 'leaflet/dist/leaflet.css';
import { StationDataType } from '@/api/station';
import CustomMarker from './custom-marker';

type CustomMapProps = {
	markersData?: StationDataType[];
};

export default function CustomMap({ markersData }: CustomMapProps) {
	const position = [51.505, -0.09] as LatLngExpression;
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
			zoom={0}
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
						<CustomMarker key={`${station.id}`} station={station} />
					))}
				</MarkerClusterGroup>
			)}
		</MapContainer>
	);
}

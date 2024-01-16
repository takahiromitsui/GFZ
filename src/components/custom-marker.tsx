'use client';
import { Marker, Popup } from 'react-leaflet';
import { Button } from '@/components/ui/button';
import { use, useContext, useEffect, useRef, useState } from 'react';
import { StationDataType } from '@/api/station';
import { Icon, LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { NetworkStationContext } from '@/store/network-station-context';

type CustomMarkerProps = {
  station: StationDataType;
};

export default function CustomMarker({ station }: CustomMarkerProps) {
  const { setSelectedStations, selectedStations } = useContext(NetworkStationContext);

  const isSelected = selectedStations?.some(item => item.id === station.id) ?? false;

  const position = [station.latitude, station.longitude] as LatLngExpression;
  
  const handleSelect = () => {
    setSelectedStations((prev: StationDataType[]) => {
      return isSelected
        ? prev.filter((item) => item.id !== station.id)
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
	console.log(selectedStations)
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

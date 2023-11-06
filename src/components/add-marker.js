import React, {useContext, useState} from 'react';
import {Marker, Popup, useMapEvents} from "react-leaflet";
import {markerContext} from "./form";

const AddMarker = () => {
  const {markers, setMarkers} = useContext(markerContext);
  // const [markers, setMarkers] = useState([
  //   {lat: 51.505, lng: -0.09}
  // ]);
  const map = useMapEvents({
    click: (e) => {
      setMarkers([...markers, e.latlng]);
    }
  });

  return (
    <>
      {markers.map((marker, i) => (
        <Marker
          key={`marker-${i}`}
          position={marker}
        >
          <Popup>
            <span>
              A pretty CSS3 popup. <br /> Easily customizable.
            </span>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default AddMarker;
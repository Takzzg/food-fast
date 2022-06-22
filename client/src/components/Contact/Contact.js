import React from 'react'
import {MapContainer, TileLayer} from "react-leaflet"

const Contact = () => {
  return (
    <MapContainer center={{lat: "-31.417465", lng:"-64.184182"}} zoom={2}>
        <TileLayer/>
    </MapContainer>
  )
}

export default Contact
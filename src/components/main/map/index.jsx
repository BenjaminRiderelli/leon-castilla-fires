import { useEffect, useState } from "react";
import style from "./index.module.css"
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import uuid from "react-uuid";

const Map = ({ locations }) => {
  const [initialLocation, setInitialLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setInitialLocation([41.8037172, -4.7471726]);
        // setInitialLocation([
        //   position.coords.latitude,
        //   position.coords.longitude,
        // ]);
      },
      () => {
        setInitialLocation([41.8037172, -4.7471726]);
      }
    );
  }, []);


  return (
    <section className="w-full h-screen border-2">
      {initialLocation && (
        <MapContainer center={initialLocation} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={initialLocation}>
            <Popup>
              {`lat:${initialLocation[0]}`} <br /> {`lon:${initialLocation[1]}`}
              <button
                className={style["integration-checklist__copy-button"]}
                onClick={() => {
                  const textToCopy = `${initialLocation[0]} , ${initialLocation[1]}`;
                  navigator.clipboard.writeText(textToCopy);
                }}
              >
                Copiar
              </button>
            </Popup>
          </Marker>
          {locations.map((location) => {
            const { lat, lon } = location;
            return (
              <Marker 
              key={uuid()}
              position={[lat, lon]}>
                <Popup>
                  {`lat:${lat}`} <br /> {`lon:${lon}`}
                  <br />
                  <button
                    className={style["integration-checklist__copy-button"]}
                    onClick={() => {
                      const textToCopy = `${lat} , ${lon}`;
                      navigator.clipboard.writeText(textToCopy);
                    }}
                  >
                    Copiar
                  </button>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      )}
    </section>
  );
};

export default Map;

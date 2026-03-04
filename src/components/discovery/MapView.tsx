import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Place } from "../../types/index.ts";
import Badge from "../common/Badge.tsx";
import styles from "./MapView.module.css";

/** Category color map for colored markers */
const CATEGORY_HEX: Record<string, string> = {
  sports: "#009CDE",
  art: "#9F3CC9",
  food: "#FF8F00",
  nature: "#009F4D",
  gaming: "#FFC600",
  reading: "#22254E",
  music: "#9F3CC9",
  animals: "#009F4D",
  outdoors: "#009CDE",
  technology: "#FFC600",
};

function createColoredIcon(activityTypes: string[]): L.DivIcon {
  const color = CATEGORY_HEX[activityTypes[0]] || "#44499C";
  return L.divIcon({
    className: "",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
    html: `<svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="${color}"/>
      <circle cx="14" cy="13" r="5.5" fill="white" opacity="0.9"/>
    </svg>`,
  });
}

interface ScoredPlace {
  place: Place;
  score: number;
}

interface MapViewProps {
  places: ScoredPlace[];
}

const AUSTIN_CENTER: [number, number] = [30.267, -97.743];
const DEFAULT_ZOOM = 12;

export default function MapView({ places }: MapViewProps) {
  return (
    <div className={styles.mapWrapper}>
      <MapContainer
        center={AUSTIN_CENTER}
        zoom={DEFAULT_ZOOM}
        className={styles.map}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {places.map(({ place, score }) => (
          <Marker
            key={place.id}
            position={[place.latitude, place.longitude]}
            icon={createColoredIcon(place.activity_types)}
          >
            <Popup className={styles.popup}>
              <div className={styles.popupContent}>
                <div className={styles.popupHeader}>
                  <h3 className={styles.popupName}>{place.name}</h3>
                  <div className={styles.popupBadges}>
                    <Badge
                      variant="cost"
                      label={place.cost === "free" ? "Free" : place.cost}
                    />
                    {score >= 75 && (
                      <Badge variant="match" label="Great match!" />
                    )}
                  </div>
                </div>
                <Link to={`/place/${place.id}`} className={styles.popupLink}>
                  View Details
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

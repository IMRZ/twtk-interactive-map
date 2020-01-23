import { ref, onMounted } from "@vue/composition-api";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

const VueIcon = L.DivIcon.extend({
  options: {
    element: null
  },
  createIcon: function () {
    return this.options.element;
  }
});

export function useLeaflet(settings) {
  const mapInstance = ref(null);

  onMounted(() => {
    const bounds = [[0, 0], [settings.height, settings.width]];

    const map = L.map(settings.target, {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      attributionControl: false,
      maxBounds: bounds
    });

    /* eslint-disable-next-line */
    const imageLayer = L.imageOverlay(settings.mapImagePath, bounds).addTo(map);
    // imageLayer.on('load', fadeInImage);
  });

  return {
    mapInstance
  };
}

export function createIcon(options) {
  return new VueIcon(options);
}

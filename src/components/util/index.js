import Leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";

const MarkerIcon = Leaflet.DivIcon.extend({
  options: {
    element: null
  },
  createIcon: function () {
    return this.options.element;
  }
});

// bounds: [width, height];
export function createIcon(options) {
  return new MarkerIcon(options);
}

export const L = Leaflet;

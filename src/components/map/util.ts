import L from 'leaflet';

export function createSvgElement(imageWidth: number, imageHeight: number) {
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('viewBox', `0 0 ${imageWidth} ${imageHeight}`);
  svgElement.setAttribute('style', 'contain: paint;');
  return svgElement;
}

export function createPortalIcon(options = { interactive: true }) {
  const element = document.createElement('div');
  document.createElement('div')
  element.setAttribute(
    'style',
    `display: flex; height: 0; width: 0; align-items: center; justify-content: center; position: relative;${options.interactive ? '' : ' pointer-events: none;'}`,
  );
  return new PortalIcon({ element });
}

const PortalIcon = L.DivIcon.extend({
  options: {
    element: null,
  },
  createIcon() {
    return this.options.element;
  },
  getElement() {
    return this.options.element;
  },
}) as new (options: any) => any;

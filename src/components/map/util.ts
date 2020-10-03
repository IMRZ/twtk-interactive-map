import L from 'leaflet';

export function createSvgElement(imageWidth: number, imageHeight: number) {
  const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgElement.setAttribute('viewBox', `0 0 ${imageWidth} ${imageHeight}`);
  svgElement.setAttribute('style', 'contain: paint;');
  return svgElement;
}

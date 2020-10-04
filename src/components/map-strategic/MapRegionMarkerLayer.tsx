import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useMapContext } from '../map/context';

import { useAppSelector } from '../../store';

import { regions } from '../../data/common';

import assets from '../../assets';

const useStyles = makeStyles((theme) => ({
  marker: {
    position: 'absolute',
    height: 50,
    width: 50,
    flexShrink: 0,
    filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.6))',
    '&:hover': {
      filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.4))',
    },
    transition: 'opacity 200ms',
    opacity: 0,
  },
  name: {
    position: 'absolute',
    bottom: -54,
    pointerEvents: 'none',
    backgroundColor: 'black',
    color: 'white',
    fontWeight: 'bold',
    padding: theme.spacing(0, 1),
    transition: 'opacity 200ms',
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
}));

// TODO: cleanup #useEffect....
const MapRegionMarkerLayer = () => {
  const context = useMapContext();
  const [elems, setElems] = React.useState<[HTMLElement, any, any][]>([]);

  React.useEffect(() => {
    const { map } = context;
    const elements: [HTMLElement, any, any][] = [];

    const allMarkers = Object.values(regions).map((region: any) => {
      const { x, y } = region.settlement;
      const el = document.createElement('div');
      el.setAttribute(
        'style',
        'display: flex; height: 0; width: 0; align-items: center; justify-content: center; position: relative;'
      );
      const icon = createPortalMarker({ element: el });
      const marker = L.marker([y, x], { icon });
      elements.push([el, region, marker]);
      return marker;
    });
    setElems(elements);

    // const layer = L.layerGroup(allMarkers);
    // map.addLayer(layer);
    // context.addOverlay('markers-all', `${allMarkers.length}_all`, layer);

    const groups = elements.reduce((accumulator: any, entry) => {
      const [el, region, marker] = entry;

      if (accumulator[region.icon] === undefined) {
        accumulator[region.icon] = [];
      }

      accumulator[region.icon].push(marker);

      return accumulator;
    }, {});

    Object.entries(groups).forEach(([key, markers]: [string, any]) => {
      const layer = L.layerGroup(markers);
      map.addLayer(layer);
      context.addOverlay(`markers.${key}`, layer, markers.length);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {elems.map(([e, region]) =>
        ReactDOM.createPortal(<RegionMarker regionKey={region.key} />, e)
      )}
    </>
  );
};

const PortalMarker = L.DivIcon.extend({
  options: {
    element: null,
  },
  createIcon() {
    return this.options.element;
  },
});

function createPortalMarker(options: any) {
  // @ts-ignore
  return new PortalMarker(options);
}

const RegionMarker = (props: { regionKey: string }) => {
  const { regionKey } = props;
  const classes = useStyles();

  const zoom = useAppSelector((state) => state.map.zoom);

  const region = regions[regionKey];

  return <>
    <img className={clsx(classes.marker, { [classes.visible]: zoom === 'high' })} src={region.isCapital ? assets['icons/marker_high_city'] : assets['icons/marker_high_town']} alt="" />
    <img className={clsx(classes.marker, { [classes.visible]: zoom !== 'high' })} src={assets[`icons/${region.icon}`]} alt="" />
    <pre className={clsx(classes.name, { [classes.visible]: zoom === 'low' })}>{region.province.name}, {region.name}</pre>
  </>
};

export default MapRegionMarkerLayer;

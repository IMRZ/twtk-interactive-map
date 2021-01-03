import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useMapContext } from '../map/context';
import { regions } from '../../data/common';
import assets from '../../assets';
import { useStoreState } from '../../store';
import { createPortalIcon } from '../map/util';
import MapRegionMarkerTooltip from './MapRegionMarkerTooltip';

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
  const [entries, setEntries] = React.useState<any>([]);

  React.useEffect(() => {
    const { map } = context;
    const elements = Object.values(regions).map((region: any) => {
      const { x, y } = region.settlement;
      const icon = createPortalIcon();
      const el = icon.getElement();
      const marker = L.marker([y, x], { icon });
      return [el, region, marker];
    });
    setEntries(elements);

    const groups = elements.reduce((accumulator: any, entry) => {
      const [el, region, marker] = entry; // eslint-disable-line @typescript-eslint/no-unused-vars

      if (accumulator[region.icon] === undefined) {
        accumulator[region.icon] = [];
      }

      accumulator[region.icon].push(marker);

      return accumulator;
    }, {});

    Object.entries(groups).forEach(([key, markers]: [string, any]) => {
      const layer = L.layerGroup(markers);
      map.addLayer(layer);
      context.addOverlay(`markers.${key}`, layer, true, markers.length);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {entries.map(([e, region]: any) =>
        ReactDOM.createPortal(<RegionMarker regionKey={region.key} />, e)
      )}
    </>
  );
};

const RegionMarker = (props: { regionKey: string }) => {
  const { regionKey } = props;
  const classes = useStyles();

  const zoom = useStoreState((state) => state.map.zoom);

  const region = regions[regionKey];

  return (
    <>
      <MapRegionMarkerTooltip region={region}>
        <img className={classes.marker} src={assets[`icons/${region.icon}`]} alt="" />
      </MapRegionMarkerTooltip>
      <pre className={clsx(classes.name, { [classes.visible]: zoom === 'low' })}>{region.province.name}, {region.name}</pre>
    </>
  )
};

export default MapRegionMarkerLayer;

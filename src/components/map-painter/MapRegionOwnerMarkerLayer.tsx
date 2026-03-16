import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { useMapContext } from '../map/context';
import { regions } from '../../data/common';
import assets from '../../assets';
import { createPortalIcon } from '../map/util';
import { useOwnership } from './painter';

const useStyles = makeStyles((theme) => ({
  marker: {
    position: 'absolute',
    height: 24,
    width: 24,
    flexShrink: 0,
    filter: 'drop-shadow(5px 5px 5px rgba(0, 0, 0, 0.8))',
  },
}));

const MapResourceMarkerLayer = () => {
  const context = useMapContext();
  const [entries, setEntries] = React.useState<any>([]);

  React.useEffect(() => {
    const { map } = context;
    const elements = Object.values(regions).map((region: any) => {
      const { x, y } = region.settlement;
      const icon = createPortalIcon({ interactive: false });
      const el = icon.getElement();
      const marker = L.marker([y, x], { icon });
      return [el, region, marker];
    });
    setEntries(elements);

    const markers = elements.reduce((accumulator: any, entry) => {
      const [el, region, marker] = entry; // eslint-disable-line @typescript-eslint/no-unused-vars
      accumulator.push(marker);
      return accumulator;
    }, []);

    const layer = L.layerGroup(markers);
    map.addLayer(layer);
    context.addOverlay('painter.ownership', layer, true, markers.length);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {entries.map(([e, region]: any) =>
        ReactDOM.createPortal(<RegionMarker region={region} />, e)
      )}
    </>
  );
};

const RegionMarker = (props: { region: any }) => {
  const { region } = props;
  const classes = useStyles();

  const faction = useOwnership(region.key);
  const icon = assets[`flags/${faction?.icon ?? 'abandoned'}/mon_24`];

  return (
    <img
      className={classes.marker}
      src={icon}
      alt=""
    />
  )
};

export default MapResourceMarkerLayer;

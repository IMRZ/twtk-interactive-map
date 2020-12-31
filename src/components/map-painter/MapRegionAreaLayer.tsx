import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import L from 'leaflet';
import { makeStyles } from '@material-ui/core/styles';
import { useMapContext, } from '../map/context';
import { createSvgElement } from '../map/util';
import MapRegionAreaTooltip from './MapRegionAreaTooltip';
import regions from '../../data/common/regions.json';

import { usePainter, useOwnership } from './painter';

const useStyles = makeStyles({
  path: {
    opacity: 0.4,
    '&:hover': {
      opacity: 0.6,
    }
  }
});

const RegionAreaLayer = () => {
  const [svgElem, setSvgElem] = useState<SVGSVGElement | null>(null);
  const context = useMapContext();

  React.useEffect(() => {
    const { map, bounds } = context;

    const svgElement = createSvgElement(3840, 3024);
    const layer = L.svgOverlay(svgElement, bounds);
    map.addLayer(layer);
    context.addOverlay('region-paths', layer, true);
    setSvgElem(svgElement);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (svgElem === null) return null;

  const regionpaths = Object.values(regions).map((region: any) => (
    <RegionPath key={region.key} region={region} />
  ));

  return ReactDOM.createPortal(regionpaths, svgElem);
};

const RegionPath = (props: { region: any }) => {
  const classes = useStyles();
  const { region } = props;

  const owningFaction = useOwnership(region.key);
  const { paintRegion } = usePainter();

  return (
    <MapRegionAreaTooltip region={region} faction={owningFaction}>
      <path
        className={clsx('leaflet-interactive', classes.path)}
        d={region.d}
        fill={owningFaction?.color ?? 'transparent'}
        onClick={() => paintRegion(region.key)}
      />
    </MapRegionAreaTooltip>
  );
};

export default RegionAreaLayer;

import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useMapContext } from '../map/context';

import { useAppSelector, useAppDispatch } from '../../store';
import { startposSelected } from './reducer';

import startpos from '../../data/startpos';

import assets from '../../assets';
const base = assets['images/ph_armyid_base'];

const useStyles = makeStyles((theme) => ({
  base: {
    flexShrink: 0,
    position: 'absolute',
    width: 100,
    height: 120,
    transform: 'scale(0.375) translateY(-50%) ',
  },
  selected: {
    transform: 'scale(0.5) translateY(-50%)',
    filter: 'sepia(100%) saturate(500%) hue-rotate(70deg)'
  },
  mini: {
    flexShrink: 0,
    position: 'absolute',
    pointerEvents: 'none',
    transform: 'translateY(-25px)',
    opacity: 0,
  },
  bobble: {
    flexShrink: 0,
    position: 'absolute',
    pointerEvents: 'none',
    transform: 'translateY(-50px) scale(0.75)',
    opacity: 0,
  },
  visible: {
    opacity: 1,
  }
}));

// TODO: cleanup #useEffect....
const MapStartposMarkerLayer = () => {
  const context = useMapContext();
  const [elems, setElems] = React.useState<[HTMLElement, any][]>([]);

  React.useEffect(() => {
    const { map } = context;
    const entries: [HTMLElement, any][] = [];

    const groups = Object.entries(startpos).reduce((accumulator: any, [campaign, items]) => {
      Object.values(items).forEach((startpos: any) => {
        const { x, y } = startpos.pin;
        const el = document.createElement('div');
        el.setAttribute(
          'style',
          'display: flex; height: 0; width: 0; align-items: center; justify-content: center; position: relative;'
        );
        const icon = createPortalMarker({ element: el });
        const marker = L.marker([y, x], { icon });
        entries.push([el, startpos]);

        if (accumulator[campaign] === undefined) {
          accumulator[campaign] = [];
        }

        accumulator[campaign].push(marker);
      });

      return accumulator;
    }, {});
    setElems(entries);

    Object.entries(groups).forEach(([key, markers]: [string, any], index) => {
      const layer = L.layerGroup(markers);
      map.addLayer(layer);
      const isVisible = index === 0;
      context.addOverlay(`markers.${key}`, layer, isVisible, markers.length);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {elems.map(([e, startpos]) =>
        ReactDOM.createPortal(<Marker startpos={startpos} />, e)
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

const Marker = ({ startpos }: any) => {
  const classes = useStyles();

  const {
    isSelected,
    onSelect
  } = useMarker(startpos);

  const mini = assets[`characters/${startpos.icon}/mini`];
  const bobble = assets[`characters/${startpos.icon}/bobble`];

  return (
    <>
      <img onClick={onSelect} className={clsx([ classes.base, { [classes.selected]: isSelected } ])} src={base} alt="" />
      <img className={clsx([ classes.bobble, { [classes.visible]: isSelected } ])} src={bobble} alt="" />
      <img className={clsx([ classes.mini, { [classes.visible]: !isSelected } ])} src={mini} alt="" />
    </>
  )
};

function useMarker(startpos: any) {
  const dispatch = useAppDispatch();

  const isSelected = useAppSelector((state) => state.startpos.selectedCampaign === startpos.campaign && state.startpos.selectedStartpos === startpos.key);
  const onSelect = () => dispatch(startposSelected([startpos.campaign, startpos.key]));

  return {
    isSelected,
    onSelect
  }
}

export default MapStartposMarkerLayer;

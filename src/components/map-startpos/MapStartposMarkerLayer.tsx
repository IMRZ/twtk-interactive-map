import React from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useMapContext } from '../map/context';
import { useStoreState, useStoreActions } from '../../store';
import startpos from '../../data/startpos';
import assets from '../../assets';
import { createPortalIcon } from '../map/util';

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
        const icon = createPortalIcon();
        const el = icon.getElement();
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
      const isVisible = key === '3k_main_campaign_map';
      if (isVisible ) map.addLayer(layer);
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
  const { campaign, key } = startpos;
  const selectedCampaign = useStoreState((state) => state.startpos.campaign);
  const selectedStartpos = useStoreState((state) => state.startpos.startpos);
  const selectStartpos = useStoreActions((actions) => actions.startpos.selectStartpos);

  return {
    isSelected: selectedCampaign === campaign && selectedStartpos === key,
    onSelect: () => selectStartpos([startpos.campaign, startpos.key]),
  }
}

export default MapStartposMarkerLayer;

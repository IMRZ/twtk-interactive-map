import { useStoreState, useStoreActions } from '../../store';
import factions from '../../data/common/factions.json';

export function usePainter() {
  const paintRegion = useStoreActions((actions) => actions.painter.paintRegion);

  return {
    paintRegion
  };
}

export function useOwnership(region: string) {
  const regionOwner = useStoreState((state) => state.painter.ownership[region]);
  const owningFaction = (factions as any)[regionOwner] ?? null;
  return owningFaction;
}

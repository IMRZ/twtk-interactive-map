import * as twdb from "tw-db";

export async function getStartingRegions() {
  const db = twdb.createInstanceThreeKingdoms('D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War THREE KINGDOMS\\assembly_kit\\raw_data\\db');

  const result = db.startPosRegions
    .filter(entry => entry._campaign === '3k_main_campaign_map')
    .reduce((accumulator, startPosRegion) => {
      const owningFaction = startPosRegion._owningFaction ? startPosRegion.owningFaction.faction.key : null;
      accumulator[startPosRegion.region.key] = owningFaction;
      return accumulator;
    }, {});

  return result;
}

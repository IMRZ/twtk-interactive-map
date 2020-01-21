/// <reference no-default-lib="true"/>
import * as fs from "fs";
import * as path from "path";
import * as TwsParser from "total-war-save-parser";
import * as TwDb from "tw-db";

interface MapImageDimensions {
  readonly width: number;
  readonly height: number;
}

function toImageMapX(dims: MapImageDimensions, gameSettlementX: number, gameMapWidth: number) {
  const result = gameSettlementX * (dims.width / gameMapWidth);
  return Math.round(result);
}

function toImageMapY(dims: MapImageDimensions, gameSettlementY: number, gameMapHeight: number) {
  const result = dims.height - (gameSettlementY * (dims.height / gameMapHeight));
  return Math.round(result);
}

const settings = {
  key: '3k_main_map',
  campaign: '3k_main_campaign_map',
  width: 3840,
  height: 3024
}

export function getRegions() {
  const file = fs.readFileSync(path.resolve(__dirname, "map_data.esf"));
  const rootNode = TwsParser.read(file);

  const [gameMapWidth, gameMapLength] = rootNode.data
    .find(n => n.name === "theatres").data
    .find(n => n.name === "theatres - 0").data
    .find(n => n.name === "CAMPAIGN_THEATRE").data
    .find(n => n.name === "HEX_MAP_DATA").data;

  const regionBlocks = rootNode.data
    .find(n => n.name === "REGIONS_DATA").data
    .find(n => n.name === "MASKED_REGIONS_DATA").data
    .find(n => n.name === "MASKED_REGIONS_DATA - 0").data
    .find(n => n.name === "REGIONS_BLOCK").data;

  const regions = regionBlocks.reduce((accumulator, regionBlock) => {
      const regionData = regionBlock.data.find(n => n.name === "REGION_DATA");
      const settlementInfo = regionData.data.find(n => n.name === "SETTLEMENT_INFO");

      // only collect regions with settlementInfo: no sea regions!
      if (settlementInfo) {
        const [/* LOGICAL_POSITION_BIT_ARRAY */, x, y] = settlementInfo.data;

        const gameSettlementX = x;
        const gameSettlementY = y;

        const regionKey = regionData.data[1];

        accumulator[regionKey] = {
          key: regionKey,
          settlement: {
            x: toImageMapX(settings, gameSettlementX, gameMapWidth),
            y: toImageMapY(settings, gameSettlementY, gameMapLength)
          }
        };
      }

      return accumulator;
    }, {});

  const db = TwDb.createInstanceThreeKingdoms("D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War THREE KINGDOMS\\assembly_kit\\raw_data\\db");

  return Object.values(regions).map((region: any) => {
    const startPosSettlement = db.startPosSettlements.find(entry => entry.region._campaign === settings.campaign && entry.region._region === region.key);
    const { iconPath } = startPosSettlement.primaryBuilding.settlementUiDisplay;
    const icon = getIcon(iconPath);

    return {
      key: region.key,
      settlement: region.settlement,
      name: startPosSettlement.onscreenName,
      icon
    };
  });
}

function getIcon(iconPath: string): string {
  if (iconPath.startsWith("ui/skins/default/3k_main_ui_building_group_city")) {
    return "district";
  } else {
    const pattern = /^ui\/skins\/default\/3k_main_settlement_panel_display_(.+).png$/i;
    const [/* fullMatch */, resource] = iconPath.match(pattern);
    return resource;
  }
}

// resources -> faction_resource_ids

import * as twdb from "tw-db";

// TODO: cleanup when adding other dlc
// 1366x1037 frontend image
// 3840x3024 campaign map image

const OFFSET = 24; // offset to align pin on top of settlement

export async function getStartingPostions() {
  const db = twdb.createInstanceThreeKingdoms('D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War THREE KINGDOMS\\assembly_kit\\raw_data\\db');

  function getMapPin(factionKey: string) {
    const filteredPins = db.frontendCampaignSelectionMapPins.filter(entry => entry._faction === factionKey);

    if (filteredPins.length > 1) {
      const keys = filteredPins.map(entry => entry.key);
      const junction = db.frontendFactionLeadersToFrontendCampaignSelectionMapPinsJunctions.find(entry => {
        const isCorrectCampaign = entry._campaignKey === '3k_main_campaign_map';
        const isCorrectMapPin = keys.includes(entry._frontendCampaignSelectionMapPin);
        return isCorrectCampaign && isCorrectMapPin;
      });
      return junction.frontendCampaignSelectionMapPin;
    } else {
      return filteredPins[0];
    }
  }

  // TODO: investigate frontend_faction_leader_unique_characters
  function getImagePath(factionId: number) {
    const startPosCharacter = db.startPosCharacters.find(entry => entry._faction === factionId && entry._ministerialPosition === 'faction_leader');
    const campaignCharacterArt = db.campaignCharacterArts.find(entry => {
      return entry.hasComeOfAge && entry._artSetId === startPosCharacter.template.artSetOverride.artSetId;
    });
    return campaignCharacterArt.card;
  }

  const result = db.startPosFactions
    .filter(entry => entry.campaign._campaign === '3k_main_campaign_map')
    .reduce((accumulator, startPosFaction) => {
      const frontEndFaction = db.frontendFactions.find(entry => entry._faction === startPosFaction._faction);

      if (frontEndFaction) {
        const mapPin = getMapPin(startPosFaction._faction);

        const relationships = db.frontendFactionMapRelationships
          .filter(entry => entry._primaryFaction === startPosFaction._faction && entry._campaignKey === '3k_main_campaign_map')
          .map((entry) => {
            const { red, green, blue } = entry.relationshipColour;
            return {
              faction: entry._secondaryFaction,
              color: `#${rgbToHexString({ r: red, g: green, b: blue })}`
            };
          });

        accumulator.push({
          faction: startPosFaction._faction,
          icon: getImagePath(startPosFaction.id),
          relationships,
          pin: {
            x: Math.round(mapPin.locationX * (3840 / 1366)) + OFFSET,
            y: Math.round((1037 - mapPin.locationY) * (3024 / 1037)) + OFFSET
          },
        });
      }

      return accumulator;
    }, []);

  return result;
}

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ("00" + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

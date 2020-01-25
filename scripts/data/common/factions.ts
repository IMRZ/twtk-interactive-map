import * as twdb from 'tw-db';

const FLAG_KEY_PATTERN = /^data\\ui\\flags\\(.*)$/i;

export async function getFactions() {
  const db = twdb.createInstanceThreeKingdoms('D:\\Program Files (x86)\\Steam\\steamapps\\common\\Total War THREE KINGDOMS\\assembly_kit\\raw_data\\db');

  const result = db.factions.reduce((accumulator, faction) => {
    const [/* fullMatch */, flagKey] = faction.flagsPath.startsWith("3k_main_set")
      ? [,faction.flagsPath] // TODO: fix me, wtf is this: 3k_main_set_unit_flag_chinese_faction_lingling
      : faction.flagsPath.match(FLAG_KEY_PATTERN);

    accumulator[faction.key] = {
      key: faction.key,
      name: faction.screenName,
      flagKey,
      primaryColour: rgbToHexString({ r: faction.primaryColourR, g: faction.primaryColourG, b: faction.primaryColourB })
    };

    return accumulator;
  }, {});

  return result;
}

function rgbToHexString({ r, g, b }) {
  function toHexString(value) {
    return ('00' + Number(value).toString(16)).slice(-2).toUpperCase();
  }
  return `#${toHexString(r)}${toHexString(g)}${toHexString(b)}`;
}

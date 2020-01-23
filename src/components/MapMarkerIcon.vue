<template>
  <div
    class="resource leaflet-zoom-animated leaflet-interactive"
    :class="[zoomLevel]"
    v-on="tooltip"
  >
    <div
      class="icon"
      :class="[{ capital: isCapital }, region.icon]"
    />
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
import { useTooltip } from "@/use/tooltip";

export default {
  props: {
    region: Object,
    zoomLevel: String
  },
  setup(props) {
    const { createTooltip } = useTooltip();
    const tooltip = createTooltip("settlement", props.region);

    const isCapital = computed(() =>  props.region.key.endsWith("_capital"));

    return {
      tooltip,
      isCapital
    };
  }
};
</script>

<style lang="scss" scoped>
.resource {
  position: fixed;
  height: 36px;
  width: 36px;
  margin-left: -18px;
  margin-top: -18px;

  display: flex;
  justify-content: center;
  align-items: center;

  &.high {
    height: 18px;
    width: 18px;
    margin-left: -9px;
    margin-top: -9px;
  }
}

.icon {
  pointer-events: none;
  flex-shrink: 0;
  height: 50px;
  width: 50px;
  filter: brightness(90%);
  background-size: contain;
  background-image: url("~@/assets/ui/skins/default/3k_main_ui_building_group_undiscovered_settlement_map.png");

  .resource.high & {
    background-image: url("~@/assets/ui/skins/default/3k_main_ui_building_bg_high_map.png") !important;

    &.capital {
      background-image: url("~@/assets/ui/skins/default/3k_main_ui_building_group_city_level1_high_map.png") !important;
    }
  }

  .resource:hover & {
    filter: brightness(100%);
  }

  &.district {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_city_default.png");
  }

  &.copper {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_copper_map.png");
  }

  &.craftsmen_armour {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_craftsmen_armour_map.png");
  }

  &.craftsmen_mounts {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_craftsmen_mounts_map.png");
  }

  &.craftsmen_weapon {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_craftsmen_weapon_map.png");
  }

  &.farms {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_farms_map.png");
  }

  &.fish {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_fish_map.png");
  }

  &.horses {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_horses_map.png");
  }

  &.iron {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_iron_map.png");
  }

  &.jade {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_jade_map.png");
  }

  &.livestock {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_livestock_map.png");
  }

  &.lumber {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_lumber_map.png");
  }

  &.salt {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_salt_map.png");
  }

  &.silk {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_silk_map.png");
  }

  &.spice {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_spice_map.png");
  }

  &.tea {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_tea_map.png");
  }

  &.temple {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_temple_map.png");
  }

  &.tools {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_tools_map.png");
  }

  &.trade_port {
    background-image: url("~@/assets/ui/skins/default/3k_main_settlement_panel_display_trade_port_map.png");
  }
}
</style>

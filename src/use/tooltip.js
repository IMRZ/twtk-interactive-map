import { reactive, toRefs } from "@vue/composition-api";

const state = reactive({
  tooltip: null
});

function createTooltip(type, ref) {
  return {
    mouseenter: () => state.tooltip = [type, ref],
    mouseleave: () => state.tooltip = null
  };
}

export function useTooltip() {
  return {
    ...toRefs(state),
    createTooltip
  };
}

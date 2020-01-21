import { reactive, toRefs, onMounted, onUnmounted } from "@vue/composition-api";
import SvgPanZoom from "svg-pan-zoom";

const MAX_ZOOM = 8;
const MIN_ZOOM = 0.8;
const GUTTER_HEIGHT = 800;
const GUTTER_WIDTH = 1000;

export function useSvgpanzoom(listenerRef, containerRef) {
  let svgPanZoomInstance = null;
  const state = reactive({
    matrix: null,
    zoomMatrix: null,
    zoomLevel: "high"
  });

  onMounted(() => {
    svgPanZoomInstance = SvgPanZoom(containerRef.value, {
      eventsListenerElement: listenerRef.value,
      maxZoom: MAX_ZOOM,
      minZoom: MIN_ZOOM,
      fit: true,
      dblClickZoomEnabled: false,
      onUpdatedCTM(m) {
        state.matrix = m;
        state.zoomLevel = (m.a < 0.4) ? "high" : "low";

        if (!state.zoomMatrix || state.zoomMatrix.a != m.a) {
          state.zoomMatrix = m;
        }
      },
      beforePan(oldPan, newPan) {
        const sizes = this.getSizes(); // this: SvgPanZoom.Instance
        const leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + GUTTER_WIDTH;
        const rightLimit = sizes.width - GUTTER_WIDTH - (sizes.viewBox.x * sizes.realZoom);
        const topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + GUTTER_HEIGHT;
        const bottomLimit = sizes.height - GUTTER_HEIGHT - (sizes.viewBox.y * sizes.realZoom);
        return {
          x: Math.max(leftLimit, Math.min(rightLimit, newPan.x)),
          y: Math.max(topLimit, Math.min(bottomLimit, newPan.y))
        }
      }
    });
  });

  onUnmounted(() => {
    svgPanZoomInstance.destroy();
    state.matrix = null;
  });

  return {
    ...toRefs(state)
  };
}

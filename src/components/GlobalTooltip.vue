<script>
import GlobalTooltipDefault from "@/components/GlobalTooltipDefault";

const OFFSET = 20;

export default {
  components: {
    GlobalTooltipDefault,
  },
  props: {
    mouseEvent: MouseEvent,
    tooltip: Array
  },
  computed: {
    style() {
      if (this.mouseEvent && this.tooltip) {
        const { x, y } = this.mouseEvent;
        return {
          opacity: 1,
          ...this.getHorizontalPosition(x),
          ...this.getVerticalPosition(y)
        };
      } else {
        return { opacity: 0 };
      }
    }
  },
  methods: {
    getHorizontalPosition(x) {
      if (x > window.innerWidth * 0.8) {
        return { right: `${window.innerWidth - x + OFFSET}px` };
      } else {
        return { left: `${x + OFFSET}px` };
      }
    },
    getVerticalPosition(y) {
      if (y > window.innerHeight * 0.8) {
        return { bottom: `${window.innerHeight - y + OFFSET}px` };
      } else {
        return { top: `${y + OFFSET}px` };
      }
    },
    renderTooltip() {
      if (!this.tooltip) return null;

      const [type, ref] = this.tooltip;

      switch (type) {
        default:
          return <GlobalTooltipDefault tooltip={ref} />;
      }
    }
  },
  render() {
    return (
      <div id="tooltip" style={this.style}>
        {this.renderTooltip()}
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
#tooltip {
  position: fixed;
  pointer-events: none;
  max-width: 500px;
  z-index: 2000;
  color: white;
  $slice: 18;
  border-image-slice: $slice $slice $slice $slice fill;
  border-image-width: #{$slice}px #{$slice}px #{$slice}px #{$slice}px;
  border-image-repeat: repeat;
  border-image-source: url("~@/assets/ui/skins/default/tooltip_bg.png");
}
</style>

export interface MapConfig {
  readonly image: string;
  readonly width: number;
  readonly height: number;
}

export default {
  image: require('./campaign_map_multiplayer.png') as string,
  width: 3840,
  height: 3024,
} as MapConfig;

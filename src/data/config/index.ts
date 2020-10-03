export interface MapConfig {
  readonly key: string;
  readonly name: string;
  readonly map: {
    readonly image: string;
    readonly width: number;
    readonly height: number;
  };
}

export default {
  key: '',
  name: '',
  map: {
    image: require('./campaign_map_multiplayer.png') as string,
    width: 3840,
    height: 3024,
  },
} as MapConfig;

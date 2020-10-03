import mandate_of_heaven from './mandate_of_heaven';

const campaigns = Object.freeze({
  mandate_of_heaven,
});

export interface Campaign {
  readonly key: string;
  readonly name: string;
  readonly map: {
    readonly image: string;
    readonly width: number;
    readonly height: number;
  };
}

export interface Region {
  readonly key: string;
  readonly name: string;
  readonly settlement: {
    readonly x: number;
    readonly y: number;
  };
}

export type CampaignKey = keyof typeof campaigns;
export type CampaignLookup = Readonly<{ [key in CampaignKey]: Campaign }>;

export default campaigns as CampaignLookup;

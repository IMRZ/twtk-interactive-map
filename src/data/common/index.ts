import campaignsJson from './campaigns.json';
import fertilityJson from './fertility.json';
import regionsJson from './regions.json';

export const campaigns = campaignsJson as Readonly<Record<string, any>>;
export const fertility = fertilityJson as Readonly<Record<string, string>>;
export const regions = regionsJson as Readonly<Record<string, any>>;

// @ts-nocheck
const requireAsset = require.context('.', true, /^.+\.(png|webm)$/);
const assets = requireAsset.keys().reduce((accumulator, imageName) => {
  const [/* fullMatch */, key] = imageName.match(/^\.\/(.+)\.(png|webm)$/);
  accumulator[key] = requireAsset(imageName);
  return accumulator;
}, {});

export default assets as Readonly<Record<string, string>>;

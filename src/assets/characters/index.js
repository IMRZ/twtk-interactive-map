/* webpack only */

const requireImage = require.context('.', true, /^(.+)\.png$/);

export default requireImage.keys().reduce((accumulator, imageName) => {
  const [/* fullMatch */, key] = imageName.match(/^\.\/(.+)\.png$/);
  accumulator[key] = requireImage(imageName);
  return accumulator;
}, {});

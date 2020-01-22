module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,
  pwa: {
    name: "Total War THREE KINGDOMS Interactive Map",
    short_name: "twtkim",
    themeColor: "#000000",
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      swSrc: "src/service-worker.js"
    }
  }
};

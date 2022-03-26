// it's a file related to apollo client cause there was an error this file solved it

const { getDefaultConfig } = require("metro-config");
const { resolver: defaultResolver } = getDefaultConfig.getDefaultValues();
exports.resolver = {
  ...defaultResolver,
  sourceExts: [...defaultResolver.sourceExts, "cjs"],
};

module.exports = {
  "stories": [
    "../src/stories/**/*.stories.mdx",
    "../src/stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
  webpackFinal: async (config) => {
    config.resolve.alias['@'] = require('path').resolve(__dirname, '../src');
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};

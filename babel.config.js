module.exports = function (api) {
  api.cache(true);
  const plugins = [];

  plugins.push([
    '@tamagui/babel-plugin',
    {
      components: ['tamagui', '@tamagui-extras/form', '@tamagui-extras/core'],
      config: './tamagui.config.ts',
    },
  ]);

  plugins.push('expo-router/babel');

  plugins.push('react-native-reanimated/plugin');

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};

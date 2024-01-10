import type { ExpoConfig } from '@expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'DoNeedU',
  slug: 'do-need-u',
  version: process.env.VERSION?.toString(),

  scheme: 'do-need-u',
  web: {
    bundler: 'metro',
    output: 'static',
    favicon: './assets/favicon.png',
  },
  plugins: [
    'expo-router',
    [
      'expo-build-properties',
      {
        ios: {
          deploymentTarget: '13.0',
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true,
  },

  orientation: 'portrait',
  icon: './assets/adaptive-icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/icon.png',
    resizeMode: 'contain',
    backgroundColor: '#90e0e4',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    bundleIdentifier: 'com.hackfest.doneedu',
    supportsTablet: true,
  },
  android: {
    package: 'com.hackfest.doneedu',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#faf8fc',
    },
  },
});

export default defineConfig;

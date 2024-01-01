import type { ExpoConfig } from '@expo/config';

const defineConfig = (): ExpoConfig => ({
  name: 'Do Need U',
  slug: 'do-need-u',
  version: '1.0.0',

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
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
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
      backgroundColor: '#ffffff',
    },
  },
});

export default defineConfig;

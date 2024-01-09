import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { ToastProvider, ToastViewport, useToastController } from '@tamagui/toast';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  focusManager,
} from '@tanstack/react-query';
import Constants, { ExecutionEnvironment } from 'expo-constants';
import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus, Platform, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';

import config from '../../tamagui.config';

import { Toast } from '@/components/Toast';

SplashScreen.preventAutoHideAsync();

const isExpo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

export default function RootLayout() {
  const toast = useToastController();
  const colorScheme = useColorScheme();
  const { left, top, right } = useSafeAreaInsets();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (err) => {
            toast.show('Error', {
              message: err.message,
            });
          },
        }),
        mutationCache: new MutationCache({
          onError: (err) => {
            toast.show('Error', {
              message: err.message,
            });
          },
        }),
      })
  );

  useEffect(() => {
    function onAppStateChange(status: AppStateStatus) {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    }

    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  // const BackButton = () => (
  //   <Button
  //     unstyled
  //     flexDirection="row"
  //     backgroundColor="transparent"
  //     paddingLeft={0}
  //     pressStyle={{ opacity: 0.5 }}
  //     onPress={router.back}
  //     icon={<Feather name="chevron-left" size={16} color="#007AFF" />}>
  //     <Text color="#007AFF">Back</Text>
  //   </Button>
  // );

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        disableInjectCSS
        defaultTheme={colorScheme === 'light' ? 'light' : 'dark'}
      >
        <ToastProvider
          burntOptions={{ from: 'top' }}
          native={!isExpo && 'ios'}
          swipeDirection="horizontal"
        >
          <ThemeProvider value={colorScheme === 'light' ? DefaultTheme : DarkTheme}>
            <Stack screenOptions={{ headerShown: false }} />
          </ThemeProvider>

          <Toast />
          <ToastViewport flexDirection="column-reverse" top={top} left={left} right={right} />
        </ToastProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}

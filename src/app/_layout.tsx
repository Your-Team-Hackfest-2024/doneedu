import { Feather } from '@expo/vector-icons';
import { TransitionPresets } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SplashScreen, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, Button } from 'tamagui';

import { Stack } from '@/lib/navigation';
import Provider from '@/lib/provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  const BackButton = () => (
    <Button
      unstyled
      flexDirection="row"
      alignItems="center"
      backgroundColor="transparent"
      // paddingLeft={0}
      pressStyle={{ opacity: 0.5 }}
      onPress={() => {
        router.push('/');
      }}
      icon={<Feather name="chevron-left" size={24} color="#007AFF" />}
    >
      <Text color="#007AFF">Back</Text>
    </Button>
  );

  return (
    <Provider>
      <Stack screenOptions={{}}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="sign-up"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            gestureEnabled: true,
            title: 'Sign Up',
            headerLeft: () => <BackButton />,
            presentation: 'modal',
          }}
          listeners={{
            gestureEnd: () => router.push('/'),
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            ...TransitionPresets.ModalPresentationIOS,
            gestureEnabled: true,
            title: 'Sign In',
            headerLeft: () => <BackButton />,
            presentation: 'modal',
          }}
          listeners={{
            gestureEnd: () => router.push('/'),
          }}
        />
      </Stack>
    </Provider>
  );
}

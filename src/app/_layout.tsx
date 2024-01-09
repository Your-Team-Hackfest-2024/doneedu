import { TransitionPresets } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';

import { Stack } from '@/lib/navigation';
import Provider from '@/lib/provider';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
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
    <Provider>
      <Stack
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
          gestureEnabled: true,
        }}
      />
    </Provider>
  );
}

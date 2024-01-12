import { Feather } from '@expo/vector-icons';
import { TransitionPresets } from '@react-navigation/stack';
import { useFocusEffect, useRouter, useSegments } from 'expo-router';
import { Button, Text, useTheme } from 'tamagui';

import Logo from '@/components/Logo';
import { Stack } from '@/lib/navigation';
import { useAuthStore } from '@/lib/stores/auth';

export default function MainLayout() {
  const theme = useTheme();
  const router = useRouter();
  const segments = useSegments();
  const isAuth = useAuthStore((state) => !!state.user);

  useFocusEffect(() => {
    if (segments[2] === '(private)' && !isAuth) {
      router.push('/sign-in');
    }
  });

  const BackButton = () => (
    <Button
      unstyled
      flexDirection="row"
      alignItems="center"
      backgroundColor="transparent"
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
    <Stack
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.background.val,
        },
        headerStyle: {
          backgroundColor: theme.background.val,
        },
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: () => (
            <Logo primaryColor={theme.accent.val} secondaryColor={theme.primary.val} />
          ),
          headerTitleAlign: 'center',
          headerStyle: {
            height: 104,
            backgroundColor: theme.background.val,
          },
        }}
      />
      <Stack.Screen
        name="(modal)/sign-up"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          gestureEnabled: true,
          title: 'Sign Up',
          headerTitleAlign: 'center',
          headerLeft: () => <BackButton />,
          presentation: 'modal',
        }}
        listeners={{
          gestureEnd: () => router.push('/'),
        }}
      />
      <Stack.Screen
        name="(modal)/sign-in"
        options={{
          ...TransitionPresets.ModalPresentationIOS,
          gestureEnabled: true,
          title: 'Sign In',
          headerTitleAlign: 'center',
          headerLeft: () => <BackButton />,
          presentation: 'modal',
        }}
        listeners={{
          gestureEnd: () => router.push('/'),
        }}
      />
    </Stack>
  );
}

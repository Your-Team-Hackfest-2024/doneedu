import { useToastController } from '@tamagui/toast';
import { Link } from 'expo-router';
import { Button, Paragraph, YStack } from 'tamagui';

import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { useAuthStore } from '@/lib/stores/auth';

export default function HomeScreen() {
  const toast = useToastController();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signout);

  return (
    <Container>
      <Main>
        <YStack justifyContent="center" flex={1} alignItems="center">
          <Paragraph>Hi, {user?.email ?? 'guest'}!</Paragraph>
          <Button
            onPress={() =>
              toast.show('Hallo world', {
                message: 'This is a toast message',
              })
            }
          >
            Show Toast
          </Button>
        </YStack>
        <YStack gap="$3">
          <Link href="/sign-up" asChild>
            <Button>Sign Up</Button>
          </Link>
          <Link href="/sign-in" asChild>
            <Button>Sign In</Button>
          </Link>
          <Button onPress={signOut}>Sign Out</Button>
        </YStack>
      </Main>
    </Container>
  );
}

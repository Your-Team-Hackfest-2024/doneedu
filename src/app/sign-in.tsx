import { useToastController } from '@tamagui/toast';
import { Link } from 'expo-router';
import { Button, YStack } from 'tamagui';

import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { Subtitle } from '@/components/Subtitle';
import { Title } from '@/components/Title';

export default function HomeScreen() {
  const toast = useToastController();

  return (
    <Container>
      <Main>
        <YStack>
          <Title color="$primary">Hello World</Title>
          <Subtitle>This is the first page of your app.</Subtitle>
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
        <Link href="/sign-in" asChild>
          <Button>Go to Details</Button>
        </Link>
      </Main>
    </Container>
  );
}

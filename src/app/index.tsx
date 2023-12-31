import { Link } from 'expo-router';
import { YStack } from 'tamagui';

import { Button, ButtonText } from '@/components/Button';
import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { Subtitle } from '@/components/Subtitle';
import { Title } from '@/components/Title';

export default function Page() {
  return (
    <Container>
      <Main>
        <YStack>
          <Title color="$primary">Hello World</Title>
          <Subtitle>This is the first page of your app.</Subtitle>
        </YStack>
        <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
          <Button>
            <ButtonText>Show Details</ButtonText>
          </Button>
        </Link>
      </Main>
    </Container>
  );
}

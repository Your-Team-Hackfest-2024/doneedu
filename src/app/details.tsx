import { useLocalSearchParams } from 'expo-router';
import { YStack } from 'tamagui';

import { Container } from '@/components/Container';
import { Main } from '@/components/Main';
import { Subtitle } from '@/components/Subtitle';
import { Title } from '@/components/Title';

export default function Details() {
  const { name } = useLocalSearchParams();
  return (
    <Container>
      <Main>
        <YStack>
          <Title>Details</Title>
          <Subtitle>Showing details for user {name}.</Subtitle>
        </YStack>
      </Main>
    </Container>
  );
}

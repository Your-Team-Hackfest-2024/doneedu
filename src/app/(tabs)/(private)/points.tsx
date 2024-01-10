import { useRouter, useSegments } from 'expo-router';

export default function DonateScreen() {
  const segments = useSegments();
  const router = useRouter();

  if (segments[1] === '(private)') {
    router.push('/sign-in');
  }

  return null;
}

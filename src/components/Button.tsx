import { Text, YStack, styled } from 'tamagui';

export const Button = styled(YStack, {
  alignItems: 'center',
  backgroundColor: '#6366F1',
  borderRadius: 24,
  justifyContent: 'center',
  padding: 16,
  shadowColor: '#000',
  shadowOffset: {
    height: 2,
    width: 0,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  hoverStyle: {
    backgroundColor: '#5a5fcf',
  },
});

export const ButtonText = styled(Text, {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
});

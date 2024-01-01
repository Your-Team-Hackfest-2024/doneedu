import { Toast as TamaguiToast, useToastState } from '@tamagui/toast';
import { YStack, styled } from 'tamagui';

const ToastContainer = styled(YStack, {
  backgroundColor: '$primary',
  borderRadius: '$12',
  paddingHorizontal: '$4',
  paddingVertical: '$2',
});

export const Toast = () => {
  const currentToast = useToastState();

  if (!currentToast || currentToast.isHandledNatively) {
    return null;
  }

  return (
    <TamaguiToast
      key={currentToast.id}
      duration={currentToast.duration}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="quick"
    >
      <ToastContainer>
        <TamaguiToast.Title lh="$1">{currentToast.title}</TamaguiToast.Title>
        {!!currentToast.message && (
          <TamaguiToast.Description color="$color">{currentToast.message}</TamaguiToast.Description>
        )}
      </ToastContainer>
    </TamaguiToast>
  );
};

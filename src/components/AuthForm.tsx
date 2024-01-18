import { zodResolver } from '@hookform/resolvers/zod';
import { useToastController } from '@tamagui/toast';
import { LmButton } from '@tamagui-extras/core';
import { LmInputRhf } from '@tamagui-extras/form';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Form, Paragraph, Spacer, Theme, YStack } from 'tamagui';
import { z } from 'zod';

import { Container } from '@/components/Container';
import { auth } from '@/lib/firebase';
import { authSchema } from '@/lib/schema/auth';
import { useAuthStore } from '@/lib/stores/auth';

export type AuthFormProps = {
  variant: 'signin' | 'signup';
};

export default function AuthForm({ variant }: AuthFormProps) {
  const router = useRouter();
  const toast = useToastController();

  const setUser = useAuthStore((state) => state.setUser);

  const schema = authSchema(variant);
  const methods = useForm<z.infer<typeof schema>>({
    mode: 'onTouched',
    resolver: zodResolver(schema),
  });
  const { handleSubmit, control, formState } = methods;
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response =
        variant === 'signin'
          ? await signInWithEmailAndPassword(auth, data.email, data.password)
          : await createUserWithEmailAndPassword(auth, data.email, data.password);
      setUser(response.user);
      toast.show(`Welcome ${response.user.displayName ?? response.user.email}`);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError)
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.show('Email already in use', {
              message: 'Please try a different email',
              burntOptions: {
                preset: 'error',
              },
            });
            break;
          case 'auth/invalid-email':
            toast.show('Invalid email', {
              message: 'Please try a different email',
              burntOptions: {
                preset: 'error',
              },
            });
            break;
          case 'auth/user-not-found':
            toast.show('User not found', {
              message: 'Please try a different email',
              burntOptions: {
                preset: 'error',
              },
            });
            break;
          case 'auth/invalid-credential':
            toast.show('Wrong password', {
              message: 'Please try a different password',
              burntOptions: {
                preset: 'error',
              },
            });
            break;
          default:
            toast.show(error.name, {
              message: error.message,
              burntOptions: {
                preset: 'error',
              },
            });
        }
    }
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 96 : 72}
    >
      <Container paddingBottom="$8">
        <Form onSubmit={onSubmit} flex={1} justifyContent="space-between">
          <YStack gap="$2">
            <LmInputRhf name="email" control={control} label="Email" />
            <LmInputRhf isPassword name="password" control={control} label="Password" />

            <Spacer space="$4" />

            {variant === 'signin' && (
              <YStack space="$1">
                <TouchableOpacity
                  onPress={() => router.push(variant === 'signin' ? '/sign-up' : '/sign-in')}
                >
                  <Paragraph textAlign="center" fontWeight="700">
                    Doesn't have an account?
                    <Paragraph color="$primary" fontWeight="700">
                      {variant === 'signin' && ' Sign Up'}
                    </Paragraph>
                  </Paragraph>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Paragraph textAlign="center" color="$primary" fontWeight="700">
                    Forgot Password?
                  </Paragraph>
                </TouchableOpacity>
              </YStack>
            )}
          </YStack>
          <Theme name="primary_Button">
            <Form.Trigger asChild>
              <LmButton loading={formState.isSubmitting}>
                {variant === 'signin' ? 'Sign In' : 'Sign Up'}
              </LmButton>
            </Form.Trigger>
          </Theme>
        </Form>
      </Container>
    </KeyboardAvoidingView>
  );
}

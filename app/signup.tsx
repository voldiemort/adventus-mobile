import SignupForm from '@/components/auth/SignupForm';
import { Text, View } from 'react-native';

export default function SignupPage() {
  return (
    <View className='flex-1 flex-col items-center justify-center'>
      <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
      <SignupForm/>
    </View>
  ) 
}
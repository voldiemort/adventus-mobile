import { Text, View } from 'react-native';

export default function LoginPage() {
  return (
    <View className='flex flex-col h-dvh justify-center'>
      <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
      <Text className='flex-auto self-center'>This is the login page</Text>
    </View>
  ) 
}
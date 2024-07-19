import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='flex'>
      <Text className='absolute top-[35px] left-[20px] text-3xl font-bold'>Adventus</Text>
    </View>
  ) 
}
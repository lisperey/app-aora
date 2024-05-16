import { Image, StyleSheet, View, Text, ScrollView  } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants'

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-start items-center h-full px-4">
          <Image
            source={images.logo} 
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards} 
            className="max-w--[380px] w-full h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Descubra Infinitas Possibilidades com {''}
              <Text className="text-secondary-200">Aora</Text> 
            </Text>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


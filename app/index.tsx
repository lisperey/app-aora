import { Image, StyleSheet, View, Text, ScrollView  } from 'react-native';
import { router, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';

import { images } from '../constants'
import { StatusBar } from 'expo-status-bar';
import { useGlobalContext } from "../context/GlobalProvider";


export default function HomeScreen() {
  const { isLoading, isLoggedIn } = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home"/>
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
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
              Descubra Infinitas Possibilidades com{' '}
              <Text className="text-secondary-200">Aora</Text> 
            </Text>
            <Image
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
              source={images.path}
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Onde a criatividade encontra a inovação: embarque em uma jornada de exploração sem fim com Aora
          </Text>
          <CustomButton 
            title="Continuar com e-mail"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
            isLoading={false}
            textStyles=""
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor='#161622' style='light'/>
    </SafeAreaView>
  );
}


import { View, Text, FlatList, SafeAreaView, Image } from 'react-native'
import React from 'react';
 import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';

export default function Home() {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
      data={['a', 'b', 'c']}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <Text>{item}</Text>
      )}
      ListHeaderComponent={()=>(
        <View className="my-6 px-4 space-y-6">
          <View className="justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Bem-vindo de volta
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                Filipe Rosa
              </Text>
            </View>
            <View className="">
              <Image 
              source={images.logoSmall}
              className="w-9 h-10"
              resizeMode="contain"
              />
            </View>
          </View>
          <SearchInput />
          <View className="w-full flex-1 pt-5 pb-8">
            <Text className="text-gray-100 text-lg">

            </Text>

          </View>
        </View>

      )}

      />
    </SafeAreaView>
  )
}
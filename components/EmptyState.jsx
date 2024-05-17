import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { router } from 'expo-router';

export default function EmptyState({ title, subtitle }) {
    return (
        <View className="flex justify-center items-center px-4">
            <Image
        
                source={images.empty}
                resizeMethod='contain'
                className="w-[270px] h-[216px]"
            />
            <Text className="font-pmedium text-sm text-gray-100">
                {subtitle}
            </Text>
            <Text className="text-xl text-center font-psemibold text-white mt-2">
                {title}
            </Text>
            <CustomButton
                title="Publicar" 
                handlePress={()=> router.push('/create')}
                containerStyles="w-full my-5"
                textStyles="text-lg"
            />
        </View>
    )
}
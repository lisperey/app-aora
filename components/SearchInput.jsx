import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';


export default function SearchInput({ title, value, handleChangeText, placeholder, otherStyles, ...props }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl 
    focus:border-secondary items-center flex-row">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={value}
                placeholder="Buscar vídeo"
                placeholderTextColor="#7b7b8d"
                onChangeText={handleChangeText}
            />

           <TouchableOpacity>
            <Image
                className="w-5 h-5" 
                source={icons.search}
                resizeMode='contain'
            />
           </TouchableOpacity>

        </View>

    )
}
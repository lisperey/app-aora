import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';


export default function FormField({ title, value, handleChangeText, placeholder, otherStyles, ...props }) {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl 
      focus:border-secondary items-center flex-row">
        <TextInput
            className="flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8d"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'Senha' && !showPassword}
            {...props}

        />

        {title === 'Senha' && (
        <TouchableOpacity 
        onPress={()=> setShowPassword(!showPassword)}>
            <Image
                source={!showPassword? icons.eye: icons.eyeHide} 
                className="w-6 h-6"
                resizeMode='contain'
            />
        </TouchableOpacity>
        )}

      </View>
    </View>
  )
}
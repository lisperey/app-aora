import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

export default function CustomButton({title, handlePress, containerStyles, textStyles, isLoading}) {
  return (
    <TouchableOpacity className={`bg-secondary rounded-xl min-h-[62px] justify-center 
        items-center ${containerStyles} ${isLoading? 'opacity-50': ''}`}
        onPress={handlePress}
        disabled={isLoading}
    >
      <Text className={`text-primary font-psemibold ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}
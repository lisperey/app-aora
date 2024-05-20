import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { icons } from '../constants';
import { router, usePathname } from 'expo-router';


export default function SearchInput({ initialQuery }) {
    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');
    return (
        <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl 
    focus:border-secondary items-center flex-row">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder="Buscar vídeo"
                placeholderTextColor="#CDCDE0"
                onChangeText={(e)=> setQuery(e)}
            />

           <TouchableOpacity
           onPress={()=>{
            if(!query){
                return Alert.alert('Pesquisa vazia', 'Escreva o que você quer encontrar');
            }
            if(pathname.startsWith('/search')) {
                router.setParams({query});
                return;
            }
            router.push(`/search/${query}`);
            return;
           }}
           >
            <Image
                className="w-5 h-5" 
                source={icons.search}
                resizeMode='contain'
            />
            
           </TouchableOpacity>

        </View>

    )
}
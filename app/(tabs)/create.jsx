import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import FormField from '../../components/FormField';
import { useGlobalContext } from '../../context/GlobalProvider';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { createVideo } from '../../lib/appwrite';

export default function Create() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  });

  const openPicker = async (selectType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image'?  
      ImagePicker.MediaTypeOptions.Images: 
      ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1 
    });
    if(!result.canceled){
      if(selectType === 'image'){
        setForm({...form, thumbnail:result.assets[0]});
      }
      if(selectType === 'video'){
        setForm({...form, video:result.assets[0]});
      }
    }
    
  }
  const submit = async () => {
    if(!form.title || !form.prompt || !form.video || !form.thumbnail){
      return Alert.alert('Preencha todos os campos');
    }
    setUploading(true);
    try{
      await createVideo({
        ...form, userId: user.$id
      });
      Alert.alert('Sucesso', 'Vídeo postado com sucesso');
      router.push('/home');

    } catch(error){
      Alert.alert('Error', error.message)
    } finally{
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
    }
    setUploading(false);
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">
          Postar Vídeo
        </Text>
        <FormField
          title="Título do Vídeo"
          value={form.title}
          placeholder="Coloque um nome legal no seu vídeo"
          handleChangeText={(e) => setForm({ ...form, title: e })}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Vídeo
          </Text>
          <TouchableOpacity onPress={() => openPicker('video')}>
            {
              form.video ?
                (<Video
                  source={{ uri: form.video.uri }}
                  className="w-full h-64 rounded-2xl"
                  resizeMode={ResizeMode.COVER}
                />) :
                (
                  <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                    <View className="w-14 h-14 border border-dashed 
                  border-secondary-100 justify-center items-center">
                      <Image
                        source={icons.upload}
                        resizeMode='contain'
                        className="w-1/2 h-1/2"
                      />

                    </View>
                  </View>
                )
            }
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {
              form.thumbnail ?
                (<Image
                  source={{ uri: form.thumbnail.uri }}
                  className="w-full h-64 rounded-2xl"
                  resizeMode="cover"
                />) :
                (
                  <View className="w-full h-16 px-4 bg-black-100 
                rounded-2xl justify-center items-center border-2 
                border-black-200 flex-row space-x-2">

                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className="w-5 h-5"
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Escolher Arquivo
                    </Text>
                  </View>
                )
            }
          </TouchableOpacity>
        </View>
        <FormField
          title="Prompt IA"
          value={form.prompt}
          placeholder="O prompt de IA do seu vídeo..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Publicar"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
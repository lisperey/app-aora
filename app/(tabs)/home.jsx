import { View, Text, FlatList, SafeAreaView, Image, RefreshControl, Alert } from 'react-native'
import React, { useState } from 'react';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';
import { getAllPosts, getLatestPosts } from '../../lib/appwrite';
import useAppwrite  from '../../lib/useAppwrite';
import VideoCard from '../../components/VideoCard';
import { useGlobalContext } from '../../context/GlobalProvider';
 
export default function Home() {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <VideoCard
          video={item}
        />
      )}
      ListHeaderComponent={()=>(
        <View className="my-6 px-4 space-y-6">
          <View className="justify-between items-start flex-row mb-6">
            <View>
              <Text className="font-pmedium text-sm text-gray-100">
                Bem-vindo de volta,
              </Text>
              <Text className="text-2xl font-psemibold text-white">
                {user?.username}
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
            <Text className="text-gray-100 text-lg font-pregular mb-3">
                Últimos vídeos
            </Text>
            <Trending  
              posts={latestPosts?? []} 
            />
          </View>
        </View>

      )}
      ListEmptyComponent={() => (
          <EmptyState
            title="Nenhum Vídeo Encontrado"
            subtitle="Publique seu primeiro vídeo"
           />
        )}
      refreshControl={<RefreshControl  refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}
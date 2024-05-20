import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { React, useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { Link, router } from 'expo-router';
import { getCurrentUser, signIn } from '../../lib/appwrite';
import { useGlobalContext } from "../../context/GlobalProvider";


export default function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const {setUser, setIsLoggedIn } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if(form.email === "" || form.password === ""){
      Alert.alert('Error', 'Preencha todos os campos');
    }

    setIsSubmitting(true);

    try{
      await signIn(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLoggedIn(true);
      Alert.alert("Success", "Logado com sucesso");
      router.replace('/home');
    }catch(error){
      Alert.alert('Error', error.message);
    } finally{
      setIsSubmitting(false);
    }

  };
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image 
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Entrar na conta Aora
          </Text>
          <FormField 
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({...form, email: e})}
            otherStyles="mt-7"
            keyboardType="email-address"
            

          />
          <FormField 
            title="Senha"
            value={form.password}
            handleChangeText={(e) => setForm({...form, password: e})}
            otherStyles="mt-7"
            keyboardType="password-address"

          />
          <CustomButton 
            title="Entrar"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            textStyles=""
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Não tem cadastro?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary">Cadastrar</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
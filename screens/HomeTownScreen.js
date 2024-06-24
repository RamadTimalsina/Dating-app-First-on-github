import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';

const HomeTownScreen = () => {
  const [hometown, setHomeTowm] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('Hometown').then(progressData =>{
      if(progressData){
        setHomeTowm(progressData.hometown)
      }
    })
  },[])

  const handleNext = () => {
    if(hometown.trim() !== ''){
      saveRegistrationProgress('Hometown',{hometown})
    }

    navigation.navigate("Photos")
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: " white" }}>
      <View style={{ marginTop: 90, marginHorizontal: 20 }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <View style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: '#000000',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <AntDesign
              name="hearto"
              size={26}
              color='#000000'
            />
          </View>

          <Image style={{ width: 100, height: 40 }}
            source=
            {{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View >
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            fontFamily: 'Arial Black',
            color: 'black',
            marginTop: 15,
          }}
        >Where's your home town?</Text>
        <TextInput
          autoFocus={true}
          value={hometown}
          onChangeText={text => setHomeTowm(text)}
          placeholder='HomeTown'
          placeholderTextColor={'#BEBEBE'}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 8,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 10,
            fontFamily: 'Arial Black',
            fontSize: hometown ? 22 : 22,
          }}
        />
         <TouchableOpacity onPress={handleNext}
        activeOpacity={0.8}
        style={{
          marginTop: 30,
          marginLeft: "auto"
        }}>
        <MaterialCommunityIcons
          style={{ alignSelf: "center", marginTop: 20 }}
          name="arrow-right-circle"
          size={45}
          color="#581845" />
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeTownScreen

const styles = StyleSheet.create({})
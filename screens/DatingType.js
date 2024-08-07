import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';

const DatingType = () => {
  const navigation = useNavigation();
  const [datingPreferences, setDatingPreferences] = useState([]);
 
 
  const chooseOption = option => {
    if (datingPreferences.includes(option)) {
      setDatingPreferences(
        datingPreferences.filter(selectedOption => selectedOption !== option),
        );
    }else{
      setDatingPreferences([...datingPreferences,option])
    }
  };


  useEffect(() =>{
    getRegistrationProgress('Dating').then(progressData =>{
      if(progressData){
        setDatingPreferences(progressData.datingPreferences || []);
      }
    })
  },[])


  const handleNext = () => {
if (datingPreferences.length>0){
  saveRegistrationProgress('Dating',{datingPreferences})
}

 navigation.navigate("LookingFor")
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
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
            fontSize: 30,
            fontWeight: "bold",
            fontFamily: 'Arial Black',
            color: 'black',
            marginTop: 15,
          }}
        >Who do you want to date? </Text>
        <Text
          style={{
            marginTop: 30,
            fontSize: 15,
            color: "#rgb(0,159,107)"
          }}>Select all the people you're open to meeting
        </Text>

        <View
          style={{
            marginTop: 30,
            flexDirection: " column",
            gap: 12
          }}>
           <View
            style={{
              flexDirection: 'row',
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between"
            }}>
            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>Men</Text>

            <Pressable
              onPress={() =>
                chooseOption("Men")}>
              <FontAwesome
                name="circle"
                size={26}
                color={datingPreferences.includes("Men") ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>


          <View
            style={{
              flexDirection: 'row',
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between"
            }}>
            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>Women</Text>

            <Pressable
              onPress={() =>
                chooseOption("Women")}>
              <FontAwesome
                name="circle"
                size={26}
                color={datingPreferences.includes("Women") ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: "center",
              gap: 12,
              justifyContent: "space-between"
            }}>
            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>Everyone</Text>

            <Pressable
              onPress={() =>
                chooseOption("Everyone")}>
              <FontAwesome
                name="circle"
                size={26}
                color={datingPreferences.includes("Everyone") ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>
        </View>
        
        < View style={{ marginTop: 30, flexDirection: "row", alignItems: "center", gap: 8 }}>
          <AntDesign
            name="checksquare"
            size={26}
            color={"#581845"}
          />
          <Text style={{ fontSize: 15, color: "black", fontFamily: "Arial Black" }}>Visible on Profile </Text>
        </View>

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
  )
}

export default DatingType

const styles = StyleSheet.create({})
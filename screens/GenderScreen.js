import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';

const GenderScreen = () => {
  const [gender, setGender] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Gender').then(progressData =>{
      if(progressData){
        setGender(progressData.gender || '')
      }
    })
  },[])
const handleNext = () =>{
  if ( gender.trim() !== ''){
    saveRegistrationProgress('Gender', {gender})
  }
 navigation.navigate("Type")

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
            borderColor: 'black',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <FontAwesome6
              name="person"
              size={26}
              color="black"
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
           marginTop:15,
          }}>Which gender are you?</Text>
        <Text 
        style={{
           marginTop: 20, 
          fontSize: 15, 
          color: "green" 
          }}>
            Connect users are matched based on these three gender groups. 
            you can add more about gender later.
             </Text>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{ fontSize: 15, color: "black", fontWeight: "500" }}>Men</Text>
            <Pressable onPress={() => setGender("Men")}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == "Men" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>



          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 12,
            }}>

            <Text style={{ fontSize: 15, color: "black", fontWeight: "500" }}>Women</Text>
            <Pressable onPress={() => setGender("Women")}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == "Women" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>





          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{ fontSize: 15, color: "black", fontWeight: "500" }}>Non Binary</Text>
            <Pressable onPress={() => setGender("Non Binary")}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == "Non Binary" ? "#581845" : "#F0F0F0"}
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

export default GenderScreen

const styles = StyleSheet.create({})
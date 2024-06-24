import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';

const TypeScreen = () => {
  const [type, setType] = useState("");
  const navigation = useNavigation();
 useEffect (() => {
  getRegistrationProgress('Type').then(progressData => {
    if(progressData){
      setType(progressData.type || '')
    }
  })
 },[])

  const handleNext = () => {
    if(type.trim() !== ''){
      saveRegistrationProgress('Type', {type})
    }

    navigation.navigate("Dating")
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
            <MaterialCommunityIcons
              name="ev-plug-type1"
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
        >What's your Sexulity?</Text>
        <Text
          style={{
            marginTop: 20,
            fontSize: 15,
            color:"#rgb(0,159,107)"
          }}>
          Connect users are matched based on these three gender groups.
          you can add more about gender later.
        </Text>
        <View style={{ marginTop: 20, flexDirection: "column", gap: 12 }}>

          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>

            <Text style={{ fontSize: 15, fontWeight: 500, color: 'black' }}>Straight </Text>
            <Pressable onPress={() => setType("Straight")}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Straight' ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>


          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>

            <Text style={{ fontSize: 15, fontWeight: 500, color: 'black' }}>Gay </Text>
            <Pressable onPress={() => setType("Gay")}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Gay' ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>


          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>

            <Text style={{ fontSize: 15, fontWeight: 500, color: 'black' }}>Lesbian</Text>
            <Pressable onPress={() => setType("Lesbian")}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Lesbian' ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>


          <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
          }}>

            <Text style={{ fontSize: 15, fontWeight: 500, color: 'black' }}>Bisexual </Text>
            <Pressable onPress={() => setType("Bisexual")}>
              <FontAwesome
                name="circle"
                size={26}
                color={type == 'Bisexual' ? "#581845" : "#F0F0F0"}
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

export default TypeScreen

const styles = StyleSheet.create({})
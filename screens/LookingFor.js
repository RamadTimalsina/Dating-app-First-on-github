import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';

const LookingFor = () => {
  const navigation = useNavigation();

  useEffect(() => {
    getRegistrationProgress('LookingFor').then(progressData => {
      if(progressData){
        setLookingFor(progressData.lookingFor)
      }
    })
  },[])

 const handleNext = () => {
if(lookingFor.trim() !== ''){
  saveRegistrationProgress('LookingFor', {lookingFor})
}

 navigation.navigate("Hometown")
 }


  const [lookingFor, setLookingFor] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginHorizontal: 20, marginTop: 90 }}>
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
        > What's your dating intention</Text>
        <View style={{
          marginTop: 30,
          flexDirection: " column",
          gap: 12
        }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>Life Partner</Text>

            <Pressable
              onPress={() =>
                setLookingFor("Life Partner")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Life Partner" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>Long-Term Relationship</Text>

            <Pressable
              onPress={() =>
                setLookingFor("Long-Term Relationship")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Long-Term Relationship" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>short-Term Relationship</Text>

            <Pressable
              onPress={() =>
                setLookingFor("short-Term Relationship")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "short-Term Relationship" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>short-Term, open to long</Text>

            <Pressable
              onPress={() =>
                setLookingFor("short-Term, open to long")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "short-Term, open to long" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>long-Term, open to short</Text>

            <Pressable
              onPress={() =>
                setLookingFor("long-Term, open to short")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "long-Term, open to short" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>


          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>New Friends</Text>

            <Pressable
              onPress={() =>
                setLookingFor("New Friends")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "New Friends" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>Casual Dating</Text>

            <Pressable
              onPress={() =>
                setLookingFor("Casual Dating")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "Casual Dating" ? "#581845" : "#F0F0F0"}
              />
            </Pressable>
          </View>

          
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between"
            }}>

            <Text style={{
              fontSize: 15,
              fontWeight: 500,
              color: 'black'
            }}>figuring out</Text>

            <Pressable
              onPress={() =>
                setLookingFor("figuring out")}>
              <FontAwesome
                name="circle"
                size={26}
                color={lookingFor == "figuring out" ? "#581845" : "#F0F0F0"}
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

export default LookingFor

const styles = StyleSheet.create({})
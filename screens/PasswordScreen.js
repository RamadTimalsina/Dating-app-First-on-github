import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { saveRegistrationProgress } from '../registrationUtils';

const PasswordScreen = () => {
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleNext = () => {
    if(password.trim() !== ''){
      saveRegistrationProgress('Password',{password});
    }
    navigation.navigate("Birth")
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 90, marginHorizontal: 20 }}>
        <View style={{
          flexDirection: "row",
          alignItems: "center"
        }}>
          <View style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            borderWidth: 2,
            borderColor: "black",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <AntDesign
              name="lock1"
              size={26}
              color="#581845" />
          </View>
          <Image style={{ width: 100, height: 40 }}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'Arial Black',
            margin: 15,
            color: 'black',
          }}>
          Please choose your password
        </Text>
        <TextInput
          autoFocus={true}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder='Enter your password'
          placeholderTextColor={"#BEBEBE"}
          style={{
            width: 340,
            marginVertical: 10,
            marginTop: 8,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            paddingBottom: 2,
            fontFamily: 'Arial Black',
            fontSize: password ? 22 : 22,
          }}
        />
        <Text style={{ color: "gray", fontSize: 15, marginTop: 7 }}>Note:Your details will be safe with us </Text>
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

export default PasswordScreen

const styles = StyleSheet.create({})
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getRegistrationProgress, saveRegistrationProgress } from '../registrationUtils';
const BirthScreen = () => {
  const navigation = useNavigation();
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleDayChange = text => {
    setDay(text);
    if (text.length == 2) {
      monthRef.current.focus();
    }
  }

  const handleMonthChange = text => {
    setMonth(text);
    if (text.length == 2) {
      yearRef.current.focus();
    }
  };

  const handleYearChange = text => {
    setYear(text)
  }

  useEffect(() => {
    getRegistrationProgress("Birth").then(progressData => {
      if(progressData){
        const {dateofBirth} = progressData;
        const [dayvalue, monthvalue,yearvalue] = dateofBirth.split("/");
        setDay(dayvalue);
        setMonth(monthvalue);
        setYear(yearvalue);
      }
    });
  },[]);

  const handleNext = () =>{
    if(day.trim() !=='' && month.trim() !=='' && year.trim() !== ''){
      const dateofBirth = `${day}/${month}/${year}`;
      saveRegistrationProgress('Birth', {dateofBirth});
    }
 navigation.navigate("Gender")
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
            <MaterialCommunityIcons
              name="cake-variant-outline"
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
        <Text style={{
          fontSize: 25,
          fontWeight: 'bold',
          fontFamily: 'Arial Black',
          color: 'black',
          marginTop: 15,
        }}>What's your date of Birth?
        </Text>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 80, justifyContent: "center" }}>
          <TextInput
           style={{
            borderBottomWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: 60,
            fontSize: day ? 22 : 22,
            fontFamily: 'Arial Black',
          }}
            autoFocus={true}
            placeholder='DD'
            maxLength={2}
            keyboardType="numeric"
            value={day}
            onChangeText={handleDayChange}
           
          />
          <TextInput
           style={{
            borderBottomWidth: 1,
            borderColor: 'black',
            padding: 10,
            width: 60,
            fontSize: month ? 22 : 22,
            fontFamily: 'Arial Black',
          }}
            ref={monthRef}
            // autoFocus={true}
            placeholder='MM'
            maxLength={2}
            keyboardType="numeric"
            value={month}
            onChangeText={handleMonthChange}
           
          />
          <TextInput
            style={{
              borderBottomWidth: 1,
              borderColor: 'black',
              padding: 10,
              width: 75,
              fontSize: year ? 22 : 22,
              fontFamily: 'Arial Black',
            }}
            ref={yearRef}
            placeholder='YYYY'
            maxLength={4}
            keyboardType="numeric"
            value={year}
            onChangeText={handleYearChange}
          />
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

export default BirthScreen

const styles = StyleSheet.create({})
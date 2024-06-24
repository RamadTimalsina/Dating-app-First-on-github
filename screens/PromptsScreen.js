import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Image,
  TouchableOpacity
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect} from 'react';
import { getRegistrationProgress ,saveRegistrationProgress} from '../registrationUtils';


const PromptsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const handleNext = () => {
   saveRegistrationProgress('Prompts', {prompts: route?.params?.prompts});
    navigation.navigate("PreFinal");
  };
  
  return ( 
    <View>
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
              name="eye"
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
          }}> Write your profile answer</Text>

        <View style={{ marginTop: 20, flexDirection: "column", gap: 20 }}>
        {route?.params?.prompts? (
          route?.params?.prompts?.map((item,index) =>(
          <Pressable 
          onPress={() => navigation.navigate('ShowPrompts')}
            style={{
              borderColor: '#707070',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'dashed',
              borderRadius: 10,
              height: 70,
            }}
          >
            <Text style={{
              color: 'red',
              fontWeight: '500',
              fontSize: 14,
              fontStyle: 'italic'
            }}>
              {item?.question}
            </Text>
            <Text style={{
              color: 'black',
              fontWeight: '600',
              fontSize: 15,
              fontStyle: 'italic',
              marginTop: 3
            }}>
             {item?.answer }
            </Text>
          </Pressable>
        
          ))
        ):(
          <View>
          <Pressable onPress={() => navigation.navigate('ShowPrompts')}
            style={{
              borderColor: '#707070',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'dashed',
              borderRadius: 10,
              height: 70,
            }}
          >
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 15,
              fontStyle: 'italic'
            }}>
              Select a Prompt
            </Text>
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 15,
              fontStyle: 'italic',
              marginTop: 3
            }}>
              and write your own answer
            </Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('ShowPrompts')}
            style={{
              borderColor: '#707070',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'dashed',
              borderRadius: 10,
              height: 70,
            }}
          >
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 15,
              fontStyle: 'italic'
            }}>
              Select a Prompt
            </Text>
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 15,
              fontStyle: 'italic',
              marginTop: 3
            }}>
              and write your own answer
            </Text>
          </Pressable>

            <Pressable
            onPress={() => navigation.navigate('ShowPrompts')}
            style={{
              borderColor: '#707070',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderStyle: 'dashed',
              borderRadius: 10,
              height: 70,
            }}
          >
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 15,
              fontStyle: 'italic'
            }}>
              Select a Prompt
            </Text>
            <Text style={{
              color: 'gray',
              fontWeight: '600',
              fontSize: 15,
              fontStyle: 'italic',
              marginTop: 3
            }}>
              and write your own answer
            </Text>
          </Pressable>
          </View>
        )
      }
      
        </View>
        <TouchableOpacity onPress={handleNext}
          activeOpacity={0.8}
          style={{
            marginTop: 30,
            marginLeft: "auto"
          }}>
          <MaterialCommunityIcons
            style={{ alignSelf: 'center', marginTop: 20 }}
            name="arrow-right-circle"
            size={45}
            color="#581845" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PromptsScreen;

const styles = StyleSheet.create({});

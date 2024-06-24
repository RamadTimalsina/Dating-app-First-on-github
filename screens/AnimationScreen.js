// import { StyleSheet, Text, View } from 'react-native'
// import React, { useEffect } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import LottieView from 'lottie-react-native';

// export default function AnimationScreen() {
//     const navigation = useNavigation();
//  useEffect(() =>{
//     setTimeout(() =>{
//         navigation.goBack();
//     },1000);
//  },[]);
//   return (
//     <View  style={{flex:1,backgroundColor:"White",justifyContent:"center",alignItems:"center"}}>
//     <View>
//         <LottieView 
//         source={require('.../assets/cross (1)')}
//         style={{
//             height: 260,
//             width: 300,
//             alignSelf: 'center',
//             marginTop: 40,
//             justifyContent: 'center',
//           }}
//           autoPlay
//           loop={true}
//           speed={0.7}
//         />
//     </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AnimationScreen = () => {
  return (
    <View>
      <Text>AnimationScreen</Text>
    </View>
  )
}

export default AnimationScreen

const styles = StyleSheet.create({})
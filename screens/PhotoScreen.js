// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   Image,
//   Pressable,
//   Button,
//   TouchableOpacity,
// } from 'react-native';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import { useNavigation } from '@react-navigation/native';
// import {
//   getRegistrationProgress,
//   saveRegistrationProgress,
// } from '../registrationUtils';

// const PhotoScreen = () => {
//   const navigation = useNavigation();
//   const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);

//   useEffect(() => {
//     // Fetch the saved image URLs from AsyncStorage
//     getRegistrationProgress('Photos').then(progressData => {
//       if (progressData && progressData.imageUrls) {
//         setImageUrls(progressData.imageUrls);
//       }
//     });
//   }, []);

//   const handleChooseImage = async (index) => {
//     try {
//       const image = await ImageCropPicker.openPicker({
//         multiple: false,
//         mediaType: 'photo',
//       });

//       const updatedUrls = [...imageUrls];
//       updatedUrls[index] = image.path;
//       setImageUrls(updatedUrls);
//     } catch (error) {
//       console.log('Error selecting image: ', error);
//     }
//   };

//   const handleNext = () => {
//     // Save the current progress data including the image URLs
//     saveRegistrationProgress('Photos', { imageUrls });

//     // Navigate to the next screen
//     navigation.navigate('Prompts'); // Navigate to the appropriate screen
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.imageGrid}>
//         {imageUrls.map((url, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.imageContainer}
//             onPress={() => handleChooseImage(index)}>
//             {url ? (
//               <Image
//                 source={{ uri: url }}
//                 style={styles.image}
//                 resizeMode="cover"
//               />
//             ) : (
//               <View style={styles.placeholder}>
//                 <EvilIcons name="camera" size={40} color="black" />
//                 <Text style={styles.placeholderText}>Tap to upload</Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>
//       <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//         <MaterialCommunityIcons
//           name="arrow-right-circle"
//           size={45}
//           color="#581845"
//         />
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 90,
//   },
//   imageGrid: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   imageContainer: {
//     width: '30%',
//     aspectRatio: 1, // Make images square
//     marginBottom: 20,
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   placeholder: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#CCCCCC',
//     borderRadius: 10,
//   },
//   placeholderText: {
//     marginTop: 10,
//   },
//   nextButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//   },
// });

// export default PhotoScreen;

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUtils';

const PhotoScreen = () => {
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);

  useEffect(() => {
    // Fetch the saved image URLs from AsyncStorage
    getRegistrationProgress('Photos').then(progressData => {
      if (progressData && progressData.imageUrls) {
        setImageUrls(progressData.imageUrls);
      }
    });
  }, []);

  const handleChooseImage = async index => {
    try {
      const image = await ImageCropPicker.openPicker({
        multiple: false,
        mediaType: 'photo',
      });

      const updatedUrls = [...imageUrls];
      updatedUrls[index] = image.path;
      setImageUrls(updatedUrls);
    } catch (error) {
      console.log('Error selecting image: ', error);
    }
  };

  const handleNext = () => {
    // Save the current progress data including the image URLs
    saveRegistrationProgress('Photos', {imageUrls});

    // Navigate to the next screen
    navigation.navigate('Prompts'); // Navigate to the appropriate screen
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageGrid}>
        {imageUrls.map((url, index) => (
          <TouchableOpacity
            key={index}
            style={styles.imageContainer}
            onPress={() => handleChooseImage(index)}>
            {url ? (
              <Image
                source={{uri: url}}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.placeholder}>
                <EvilIcons name="camera" size={40} color="black" />
                <Text style={styles.placeholderText}>Tap to upload</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <MaterialCommunityIcons
          name="arrow-right-circle"
          size={45}
          color="#581845"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 90,
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
    aspectRatio: 1, // Maintain square aspect ratio
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1, // Take up available space
    aspectRatio: 1, // Maintain aspect ratio
    borderRadius: 10,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CCCCCC',
    borderRadius: 10,
  },
  placeholderText: {
    marginTop: 10,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default PhotoScreen;

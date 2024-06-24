
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Image,StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState('Compatible');
  const [userId, setUserId] = useState('');
  const [profilesData, setProfilesData] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState(profilesData[0]);
  const [crossedProfileIds, setCrossedProfileIds] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    showToken();
  }, []);
  const showToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
  };

  console.log('USERID', userId);

  useEffect(() => {
    showToken();
  }, []);

  const fetchMatches = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:2000/matches?userId=${userId}`);
      const matches = response.data.matches;
      setProfilesData(matches.filter(profile => !crossedProfileIds.includes(profile._id)));
    } catch (error) {
      console.log('Error', error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId, crossedProfileIds]);

  useEffect(() => {
    if (profilesData.length > 0) {
      setCurrentProfile(profilesData[0]);
    }
  }, [profilesData]);

  console.log('profiles', currentProfile);

  useFocusEffect(
    useCallback(() => {
      console.log('i call');
      if (userId) {
        fetchMatches();
      }
    }, [userId, crossedProfileIds]),
  );

  const handleLike = () => {
    // Handle liking the current profile
    // You can implement additional logic here, such as updating the liked profile list
    // For now, just move to the next profile
    navigateToNextProfile();
  };

  const handleCross = () => {
    const currentProfileId = currentProfile?._id;
    if (currentProfileId) {
      setCrossedProfileIds(prevIds => [...prevIds, currentProfileId]);
    }
    navigateToNextProfile();
  };

  const navigateToNextProfile = () => {
    const nextIndex = currentProfileIndex + 1;
    if (nextIndex < profilesData.length) {
      setCurrentProfileIndex(nextIndex);
      setCurrentProfile(profilesData[nextIndex]);
    } else {
      // No more profiles to display
      console.log('No more profiles');
    }
  };
  
  return (
    <>
      <ScrollView
        style={{ marginTop: 10 }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 10
          }}
        >

          <View
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: "#D0D0D0",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Ionicons
              name="sparkles-sharp"
              size={22}
              color='#000000'
            />
          </View>
          <Pressable
            onPress={() => setOption("Compatible")}
            style={{
              borderColor: option == "Compatible" ? "transparent" : "#808080",
              borderWidth: 0.7,
              padding: 10,
              borderRadius: 20,
              backgroundColor: option == "Compatible" ? "black" : "transparent"
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: "400",
                color: option == 'Compatible' ? "white" : "#808080"
              }}>Compatible</Text>
          </Pressable>

          <Pressable
            onPress={() => setOption("Active Today")}
            style={{
              borderColor: option == "Active Today" ? "transparent" : "#808080",
              borderWidth: 0.7,
              padding: 10,
              borderRadius: 20,
              backgroundColor: option == "Active Today" ? "black" : "transparent"
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: "400",
                color: option == 'Active Today' ? "white" : "#808080"
              }}
            >Active Today</Text>
          </Pressable>

          <Pressable
            onPress={() => setOption("New Here")}
            style={{
              borderColor: option == "New Here" ? "transparent" : "#808080",
              borderWidth: 0.7,
              padding: 10,
              borderRadius: 20,
              backgroundColor: option == "New Here" ? "black" : "transparent"
            }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: 14,
                fontWeight: "400",
                color: option == 'New Here' ? "white" : "#808080"
              }}
            >Explore</Text>
          </Pressable>
        </View>


        <View style={{ marginHorizontal: 12, marginVertical: 12 }}>
          <>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Text
                    style={{
                      color: "black",
                      fontSize: 22,
                      fontWeight: "bold"
                    }}>{currentProfile?.firstName}
                  </Text>

                  <View style={{
                    backgroundColor: "#452c63",
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 20,
                  }}>
                    <Text style={{ textAlign: "center", color: "white" }}>new Here</Text>
                  </View>
                </View>
                <View>
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color='#000000'
                  />
                </View>
              </View>
              <View style={{ marginVertical: 15 }}>
                <View>
                  {
                    currentProfile?.imageUrls?.length > 0 && (
                      <View>
                        <Image source={{ uri: currentProfile?.imageUrls[0] }}
                          style={{
                            width: '100%',
                            height: 350,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                        />
                        <Pressable
                          onPress={() =>
                            navigation.navigate('SendLike', {
                              image: currentProfile?.imageUrls[0],
                              name: currentProfile?.firstName,
                              userId: userId,
                              likedUserId: currentProfile?._id,
                            })
                          }
                          style={{
                            position: 'absolute',
                            bottom: 10,
                            right: 10,
                            backgroundColor: 'white',
                            width: 42,
                            height: 42,
                            borderRadius: 21,
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.35,
                            shadowRadius: 3.84,
                            // Shadow properties for Android
                            elevation: 7,
                          }}
                        >
                          <AntDesign
                            name="hearto"
                            size={22}
                            color='#C5B358'
                          />

                        </Pressable>
                      </View>
                    )}
                </View>
              </View>


              <View style={{ marginVertical: 15 }}>
                {currentProfile?.prompts.slice(0, 1).map(prompt => (
                  <>
                    <View
                      key={prompt.id}
                      style={{
                        backgroundColor: "white",
                        padding: 12,
                        borderRadius: 10,
                        height: 150,
                        justifyContent: 'center',

                      }} >
                      <Text style={{ fontSize: 15, fontWeight: "500", color: "black" }}>{prompt.question}</Text>
                      <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 20, color: "blue" }}>{prompt.answer}</Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.35,
                        shadowRadius: 3.84,
                        // Shadow properties for Android
                        elevation: 7,
                      }}>
                      <AntDesign name="hearto" size={25} color="#C5B358" />
                    </View>
                  </>
                ))}
              </View>


              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderRadius: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    alignItems: 'center',
                    gap: 20,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <MaterialCommunityIcons
                      name="cake-variant-outline"
                      size={22}
                      color="black"
                    />
                    <Text style={{ fontSize: 15 }}>23</Text>
                  </View>



                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Ionicons
                      name="person-outline"
                      size={22}
                      color="black"
                    />
                    <Text style={{ fontSize: 15 }}>{currentProfile?.gender}</Text>
                  </View>



                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Ionicons
                      name="magnet-outline"
                      size={22}
                      color="black"
                    />
                    <Text style={{ fontSize: 15 }}>{currentProfile?.type}</Text>
                  </View>


                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Octicons
                      name="home"
                      size={22}
                      color="black"
                    />
                    <Text style={{ fontSize: 15 }}>{currentProfile?.hometown}</Text>
                  </View>
                </View>


                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="bag-add-outline" size={20} color="black" />
                  <Text>Research Assistant at Medical College</Text>
                </View>


                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <SimpleLineIcons
                    name="graduation"
                    size={22}
                    color="black"
                  />
                  <Text>Narayani namuna secondary collage</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="book-outline" size={20} color="black" />
                  <Text>Hindu</Text>
                </View>


                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="home-outline" size={20} color="black" />
                  <Text>Rautahat</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Feather name="search" size={20} color="black" />
                  <Text>{currentProfile?.lookingFor}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 15,
                    borderBottomWidth: 0.7,
                    borderBottomColor: '#E0E0E0',
                    paddingBottom: 10,
                  }}>
                  <Ionicons name="heart-outline" size={20} color="black" />
                  <Text>Monogamy</Text>
                </View>
              </View>



              <View>
                {currentProfile?.imageUrls?.slice(1, 3).map((item, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <Image
                      style={{
                        width: '100%',
                        height: 350,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{ uri: item }}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate('SendLike', {
                          image: currentProfile?.imageUrls[index + 1],
                          name: currentProfile?.firstName,
                          userId: userId,
                          likedUserId: currentProfile?._id,
                        })
                      }
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.35,
                        shadowRadius: 3.84,
                        // Shadow properties for Android
                        elevation: 7,
                      }} >
                      <AntDesign
                        name="hearto"
                        size={22}
                        color='#C5B358'
                      />

                    </Pressable>
                  </View>
                ))}
              </View>



              <View style={{ marginVertical: 15 }}>
                {currentProfile?.prompts.slice(1, 2).map(prompt => (
                  <>
                    <View
                      key={prompt.id}
                      style={{
                        backgroundColor: 'white',
                        padding: 12,
                        borderRadius: 10,
                        height: 150,
                        justifyContent: 'center',
                      }}>
                      <Text style={{ fontSize: 15, fontWeight: '500' }}>
                        {prompt.question}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          marginTop: 20,
                        }}>
                        {prompt.answer}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        // Shadow properties for Android
                        elevation: 5,
                      }}>
                      <AntDesign name="hearto" size={25} color="#C5B358" />
                    </View>
                  </>
                ))}
              </View>

              <View>
                {currentProfile?.imageUrls?.slice(3, 4).map((item, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <Image
                      style={{
                        width: '100%',
                        height: 350,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: item,
                      }}
                    />
                    <Pressable
                      onPress={() =>
                        navigation.navigate('SendLike', {
                          image: currentProfile?.imageUrls[index + 3],
                          name: currentProfile?.firstName,
                          userId: userId,
                          likedUserId: currentProfile?._id,
                        })
                      }
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>
                  </View>
                ))}
              </View>
              <View style={{ marginVertical: 15 }}>
                {currentProfile?.prompts.slice(2, 3).map(prompt => (
                  <>
                    <View
                      key={prompt.id}
                      style={{
                        backgroundColor: 'white',
                        padding: 12,
                        borderRadius: 10,
                        height: 150,
                        justifyContent: 'center',
                      }}>
                      <Text style={{ fontSize: 15, fontWeight: '500' }}>
                        {prompt.question}
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: '600',
                          marginTop: 20,
                        }}>
                        {prompt.answer}
                      </Text>
                    </View>
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        // Shadow properties for Android
                        elevation: 5,
                      }}>
                      <AntDesign name="hearto" size={25} color="#C5B358" />
                    </View>
                  </>
                ))}
              </View>

              <View>
                {currentProfile?.imageUrls?.slice(4, 7).map((item, index) => (
                  <View key={index} style={{ marginVertical: 10 }}>
                    <Image
                      style={{
                        width: '100%',
                        height: 350,
                        resizeMode: 'cover',
                        borderRadius: 10,
                      }}
                      source={{
                        uri: item,
                      }}
                    />
                    <Pressable

                      onPress={() =>
                        navigation.navigate('SendLike', {
                          image: currentProfile?.imageUrls[index + 4],
                          name: currentProfile?.firstName,
                          userId: userId,
                          likedUserId: currentProfile?._id,
                        })
                      }
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 10,
                        backgroundColor: 'white',
                        width: 42,
                        height: 42,
                        borderRadius: 21,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <AntDesign name="hearto" size={25} color="#C5B358" />
                    </Pressable>
                  </View>
                ))}
              </View>
            </View>
          </>
        </View>
      </ScrollView>
      <Pressable
      onPress={handleCross}
        style={{
          position: 'absolute',
          bottom: 15,
          left: 12,
          backgroundColor: 'white',
          width: 50,
          height: 50,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Entypo name="cross" size={25} color="#C5B358" />
      </Pressable>
    </>
  );
};
export default HomeScreen

const styles = StyleSheet.create({})


import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextInput } from 'react-native';
import { AuthContext } from '../AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const { setForgotEmail } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    try {
      const data = { email };
      const response = await axios.post('http://10.0.2.2:2000/resetPassword', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        setForgotEmail(email);
        navigation.navigate('ResetPasswordConfirmation');
      } else {
        setError(response.data.message || 'There was an issue resetting your password. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setError('There was an issue with the server. Please try again later.');
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.subtitle}>Enter your email address below to reset your Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="white" style={styles.icon} />
        <TextInput
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="white"
          style={styles.input}
        />
      </View>
      <Pressable style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </Pressable>
      <Pressable style={styles.backButton} onPress={handleBackToLogin}>
        <Text style={styles.backButtonText}>Back to Login</Text>
      </Pressable>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#581845',
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
    marginHorizontal: 20,
  },
  icon: {
    marginLeft: 8,
  },
  input: {
    color: 'white',
    marginVertical: 5,
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FFFDD0',
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ForgotPasswordScreen;

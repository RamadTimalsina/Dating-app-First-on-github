import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const ResetPasswordConfirmation = ({ navigation }) => {
  const { forgotEmail, setForgotEmail } = useContext(AuthContext);
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResendCode = async () => {
    try {
      const data = { email: forgotEmail };
      const response = await axios.post('http://10.0.2.2:2000/resetPassword', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        setSuccessMessage('Verification code has been resent successfully.');
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to resend verification code. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Failed to resend verification code. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleSubmit = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please try again.');
      return;
    }
    try {
      const data = {
        email: forgotEmail,
        verificationCode: verificationCode,
        password: newPassword,
      };
      const response = await axios.post('http://10.0.2.2:2000/resetPasswordConfirmation', data, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.data.success) {
        setSuccessMessage('Password reset successfully.');
        setErrorMessage('');
        setForgotEmail('');
        navigation.navigate('Login');
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again later.');
      setSuccessMessage('');
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password Confirmation</Text>
      <TextInput
        placeholder="Verification Code"
        style={styles.input}
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <TextInput
        placeholder="New Password"
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        placeholder="Confirm New Password"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Pressable onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
      <Pressable onPress={handleResendCode} style={styles.resendButton}>
        <Text style={styles.buttonText}>Resend Code</Text>
      </Pressable>
      <Pressable onPress={handleBackToLogin} style={styles.backButton}>
        <Text style={styles.buttonText}>Back to Login</Text>
      </Pressable>
      {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'rgb(255, 255, 255)',
    marginBottom: 16,
    borderRadius: 4,
    padding: 12,
    width: '80%',
    color: 'black',
    borderWidth: 1,
    borderColor: 'gray',
  },
  button: {
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  resendButton: {
    marginTop: 10,
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  backButton: {
    marginTop: 10,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  success: {
    color: 'green',
    marginTop: 10,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ResetPasswordConfirmation;

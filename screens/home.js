import React, {useState} from 'react'
import type { Node } from 'react';
import RNSimpleCrypto from 'react-native-simple-crypto';
import { sha256 } from 'react-native-sha256';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableWithoutFeedback,
    Image,
    TextInput,
    Button,
    Alert,
    Keyboard
} from 'react-native';

export default function home({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (emailLower) => {
      fetch('http://34.134.18.89:5000/owners', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          from: 'Mobile',
          email: emailLower,
          password: password
      })
      }).then((response) => response.json()).then((json) => {
        if (json.confirmation == 'success') {
            // Alert.alert('Welcome', 'Welcome Mr. ' + json.name);
            navigation.navigate('AddGuest');
        } else if (json.confirmation == 'failure') {
            Alert.alert('Try Again', json.message);
        } else {
            Alert.alert('Something\'s Wrong', 'Please try again in other time.');
        }
      }).catch((error) => {
        console.error(error);
        Alert.alert('Something\'s Wrong', 'Please check your internet connection.');
      });
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#000',
      padding: 8,
      margin: 10,
      width: 350,
    },
    signInLogo: {
      marginBottom: 40,
      width: '90%',
      height: 140,
    },
    label: {
      fontSize: 23,
    },
    forgotPass: {
      margin: 20,
      color: '#444',
      fontSize: 15,
    },
  });

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
        <View style={styles.container}>
            <Image 
            style={styles.signInLogo}
            source={require('../assets/site-assets/secureGate-logo.png')} 
            />
            <Text style={styles.label}>Email:</Text>
            <TextInput 
            style={styles.input}
            placeholder='e.g name@example.com'
            keyboardType='email-address'
            onChangeText={(val) => setEmail(val)}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput 
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(val => setPassword(val))}
            />
            <Button 
            title = 'LOGIN'
            color = '#000'
            onPress={() => login(email.toLowerCase())}
            />
            <Text 
            style={styles.forgotPass} 
            onPress={() => Alert.alert('Contact Administration',
            'Please contant the administration on 1234 to resend your password.')}
            >Forgot Password?</Text>
        </View>
    </TouchableWithoutFeedback>
  )
  
}
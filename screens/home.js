import React, {useState} from 'react'
import { globalStyles } from '../styles/global';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Button,
  Alert,
  Keyboard,
  ImageBackground
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
  

  return (
    <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss();}}>
      <View style={globalStyles.container}>  
        <ImageBackground source={require('../assets/background/1.jpeg')} resizeMode="cover" style={globalStyles.backgoundimage}>
          <Image 
            style={globalStyles.signInLogo}
            source={require('../assets/site-assets/SecureGate-logos_white.png')} 
          />
          <Text style={globalStyles.label}>Email:</Text>
          <TextInput 
            style={globalStyles.input}
            placeholder='e.g name@example.com'
            keyboardType='email-address'
            onChangeText={(val) => setEmail(val)}
          />
          <Text style={globalStyles.label}>Password:</Text>
          <TextInput 
            style={globalStyles.input}
            secureTextEntry={true}
            onChangeText={(val => setPassword(val))}
          />
          <View style={globalStyles.button}>
            <Button 
              title = 'LOGIN'
              color='#1373AD'
              onPress={() => login(email.toLowerCase())}
            />
          </View>
          <Text 
            style={globalStyles.forgotPass} 
            onPress={() => Alert.alert('Contact Administration',
              'Please contant the administration on 1234 to resend your password.')}
          >Forgot Password?</Text>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
  
}
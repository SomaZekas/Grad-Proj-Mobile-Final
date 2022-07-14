import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker'
import RNSimpleCrypto from 'react-native-simple-crypto';
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

const addGuest = ({ navigation }) => {

  const [guestName, setGuestName] = useState('');
  const [carId, setCarId] = useState('');
  const [date, setDate] = useState(new Date())
 
  const RSAPublicKey = '-----BEGIN PUBLIC KEY-----\n' +
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtSsoZiarOq3hvzuRH1NdNEMb0\n' +
  'URX99eMFS0U2sGJeTSLffG7ttpSmhtDAcIosz5CkiCeVSbjp77yB+8BGNzFXmX3Q\n' +
  '1x6vk3bwELKffvrMv4e2xE52/Bd7wZ6ibXJN/lVwN+P0yogfLotxYaGTNa1JpVrQ\n' +
  'kCZp18Dl7V6ZM5EliwIDAQAB\n' +
  '-----END PUBLIC KEY-----';
 
  const sendGuestData = (hashed, RsaMessage) => {
    fetch('http://192.168.135.247:5000/owners/newguest', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          from: 'Mobile',
          ownerEmail: 'ali@hi.com',
          ownerPassword: '123',
          name: guestName,
          date: date.toLocaleDateString(),
          car_id: carId,
          used: false,
          hashed: hashed
      })
      }).then((response) => response.json()).then((json) => {
        if (json.confirmation == 'success') {
          navigation.navigate('GenerateQR', {rsa: RsaMessage});
        } else if (json.confirmation == 'failure'){
          Alert.alert('Failure', 'Please check your inputs.');
        } else {
          Alert.alert('Something\'s Wrong', 'Please try again in other time.');
        }
      }).catch((error) => {
        //console.error(error);
        Alert.alert('Something\'s Wrong', 'Please check your internet connection.');
      });
  }
 
  const hashStrings = async () => {
    const time = Date.now();
    const fullString = guestName + ',' + date.toLocaleDateString() + ',' + carId + ',' + time;
    const sha256Hash = await RNSimpleCrypto.SHA.sha256(fullString);

    //Encrypt using RSA
    const RSAEncryptedMessage = await RNSimpleCrypto.RSA.encrypt(
      sha256Hash,
      RSAPublicKey
    );

    // console.log(
    //   '\n-------' + 
    //   '\nData: ' + fullString + 
    //   '\nHash: ' + sha256Hash + 
    //   '\nRSA Encrypted: ' + RSAEncryptedMessage + 
    //   '\n-------'
    // );
    
    sendGuestData(sha256Hash, RSAEncryptedMessage);

  }

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
      <View style={globalStyles.container}>
        <ImageBackground source={require('../assets/background/1.jpeg')} resizeMode="cover" style={globalStyles.backgoundimage}>
          <Image
            style={globalStyles.signInLogo}
            source={require('../assets/site-assets/SecureGate-logos_white.png')}
          />
          <Text style={globalStyles.label}>Guest Name:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="e.g Joe Smith"
            keyboardType="default"
            onChangeText={val => setGuestName(val)}
          />
          <Text style={globalStyles.label}>Entrance Date:</Text>
          <View style={{backgroundColor: 'rgb(255, 255, 255)'}}>
            <DatePicker 
              mode='date'
              date={date} 
              onDateChange={setDate}
              fadeToColor={'#1373AD'}
              textColor={'black'}
              androidVariant = 'nativeAndroid'
              minimumDate={new Date()}
            />
          </View>
         
          <Text style={globalStyles.label}>Car Plate Numbers:</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="e.g ABC-123"
            keyboardType="default"
            onChangeText={val => setCarId(val)}
          />
          <View style={globalStyles.button}>
            <Button
              title="Generate QR Code"
              color="#1373AD"
              onPress={() => hashStrings(guestName, date, carId)}
            />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default addGuest
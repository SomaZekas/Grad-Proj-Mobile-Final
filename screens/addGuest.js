import React, { useState } from 'react';
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
   Keyboard,
   ImageBackground
 } from 'react-native';

const addGuest = ({ navigation }) => {
    const currentDate = new Date();
   // const [currentDay, currentMonth, currentYear] = [
   //   currentDate.getDate(),
   //   currentDate.getMonth() + 1,
   //   currentDate.getFullYear()
   // ];
   const [guestName, setGuestName] = useState('');
   const [enteranceDate, setEntranceDate] = useState('');
   const [carId, setCarId] = useState('');
   //const [hashedData, setHashedData] = useState('');
 
   const RSAPublicKey = '-----BEGIN PUBLIC KEY-----\n' +
   'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCtSsoZiarOq3hvzuRH1NdNEMb0\n' +
   'URX99eMFS0U2sGJeTSLffG7ttpSmhtDAcIosz5CkiCeVSbjp77yB+8BGNzFXmX3Q\n' +
   '1x6vk3bwELKffvrMv4e2xE52/Bd7wZ6ibXJN/lVwN+P0yogfLotxYaGTNa1JpVrQ\n' +
   'kCZp18Dl7V6ZM5EliwIDAQAB\n' +
   '-----END PUBLIC KEY-----';
 
   const sendGuestData = (hashed, RsaMessage) => {
     fetch('http://34.134.18.89:5000/owners/newguest', {
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
           date: enteranceDate,
           car_id: carId,
           used: false,
           hashed: hashed
       })
       }).then((response) => response.json()).then((json) => {
       if (json.confirmation == 'success') {
        //    Alert.alert('Success');
        navigation.navigate('GenerateQR', {rsa: RsaMessage});
       } else if (json.confirmation == 'failure'){
           Alert.alert('Failure', 'Please check your inputs.');
       } else {
           Alert.alert('Something\'s Wrong', 'Please try again in other time.');
       }
       }).catch((error) => {
       console.error(error);
       Alert.alert('Something\'s Wrong', 'Please check your internet connection.');
       });
   }
 
   const hashStrings = async () => {
     const time = Date.now();
     const fullString = guestName + ',' + enteranceDate + ',' + carId + ',' + time;
     const sha256Hash = await RNSimpleCrypto.SHA.sha256(fullString);
     //setHashedData(sha256Hash);
 
     //sendGuestData();
 
     //Encrypt using RSA
     const RSAEncryptedMessage = await RNSimpleCrypto.RSA.encrypt(
       sha256Hash,
       RSAPublicKey
     );
     console.log('\n-------\nData: ' + fullString + '\nHash: ' + sha256Hash + '\nRSA Encrypted: ' + RSAEncryptedMessage + '\n-------');
 
     sendGuestData(sha256Hash, RSAEncryptedMessage);
 
 
     //Share QR Code
     /**
      * RSA
      * ----
      * no. of bits
      * generates everytime it starts? -> if owner signs in, send once.
      * generated online, saved as a string in server? -> if server reboots (e.g. tech issus), how to automatically?
      * 
      * 
      */
   }

   const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    input: {
      borderWidth: 2,
      borderColor: '#FFF',
      padding: 8,
      margin: 10,
      width: 350,
      backgroundColor:'white'
    },
    signInLogo: {
      marginBottom: 40,
      width: '90%',
      height: 140,
    },
    label: {
      fontSize: 23,
      color: 'white'
    },
    forgotPass: {
      margin: 20,
      color: 'white',
      fontSize: 15,

    },
    backgoundimage: {
      flex: 1,
      position: 'relative',
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
      padding: 20,
      width: 300,
    }
  });

  return (
     <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
       <View style={styles.container}>
       <ImageBackground source={require('../assets/background/1.jpeg')} resizeMode="cover" style={styles.backgoundimage}>
         <Image
           style={styles.signInLogo}
           source={require('../assets/site-assets/SecureGate-logos_white.png')}
         />
         <Text style={styles.label}>Guest Name:</Text>
         <TextInput
           style={styles.input}
           placeholder="e.g Joe Smith"
           keyboardType="default"
           onChangeText={val => setGuestName(val)}
         />
         <Text style={styles.label}>Entrance Date:</Text>
         <TextInput
           style={styles.input}
           placeholder="30-01-2022"
           keyboardType="default"
           onChangeText={val => setEntranceDate(val)}
         />
         <Text style={styles.label}>Car Plate Numbers:</Text>
         <TextInput
           style={styles.input}
           placeholder="e.g ABC-123"
           keyboardType="default"
           onChangeText={val => setCarId(val)}
         />
         <View style={styles.button}>
          <Button
            title="Generate QR Code"
            color="#1373AD"
            onPress={() => hashStrings(guestName, enteranceDate, carId)}
          />
         </View>
        </ImageBackground>
       </View>
     </TouchableWithoutFeedback>
  )
}

export default addGuest
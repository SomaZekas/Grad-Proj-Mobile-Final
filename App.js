/**
 * https://www.npmjs.com/package/react-native-simple-crypto
 */
 import React, { useState } from 'react';
 import type { Node } from 'react';
 import RNSimpleCrypto from 'react-native-simple-crypto';
 import { sha256 } from 'react-native-sha256';
 import Navigator from './routes/homeStack';
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
 
 const App: () => Node = () => {
 
   return (
     <Navigator/>

   );
 };
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
   input: {
     borderWidth: 1,
     borderColor: '#777',
     padding: 8,
     margin: 10,
     width: 200,
   },
   signInLogo: {
     width: '75%',
     height: 140,
   },
   label: {
     fontSize: 18,
   },
   forgotPass: {
     margin: 20,
     color: '#444',
     fontSize: 15,
   },
 });
 
 export default App;
 
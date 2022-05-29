import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";
import { AppRegistry, StyleSheet, View, TextInput, Text, Image, ImageBackground } from "react-native";


export default function GenerateQR({ navigation }) {
  
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
        },
      
        title: {
          textAlign: "center",
          marginVertical: 8,
          fontSize: 18,
          color: 'white'
        },
      
        Logo: {
          marginBottom: 40,
          width: "90%",
          height: 140,
        },
        backgoundimage: {
          flex: 1,
          position: 'relative',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        qrCode: {
          margin: 20,
        }
      });

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background/1.jpeg')} resizeMode="cover" style={styles.backgoundimage}>

        <Image
           style={styles.Logo}
           source={require('../assets/site-assets/SecureGate-logos_white.png')}
        />

        <View style={styles.qrCode}>
          <QRCode
            value={navigation.getParam('rsa')}
            size={350}
            bgColor="black"
            fgColor="white"
          />
        </View>
        <Text style={styles.title}>
          Screenshot and Send this QR to the Guest.
        </Text>
      </ImageBackground>
    </View>
  )
  
}
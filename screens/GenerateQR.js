import React, { Component } from "react";
import QRCode from "react-native-qrcode-svg";
import { AppRegistry, StyleSheet, View, TextInput, Text, Image } from "react-native";


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
        },
      
        Logo: {
          marginBottom: 40,
          width: "90%",
          height: 140,
        },
      });

  return (
    <View style={styles.container}>

        <Image
           style={styles.Logo}
           source={require('../assets/site-assets/secureGate-logo.png')}
        />

        <QRCode
          value={navigation.getParam('rsa')}
          size={350}
          bgColor="black"
          fgColor="white"
        />

        <Text style={styles.title}>
          Screenshot and Send this QR to the Guest.
        </Text>
      </View>
  )
  
}
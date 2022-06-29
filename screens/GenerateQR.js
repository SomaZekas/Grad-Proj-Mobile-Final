import React from "react";
import { globalStyles } from "../styles/global";
import QRCode from "react-native-qrcode-svg";
import { 
  StyleSheet, 
  View, 
  Text, 
  Image, 
  ImageBackground 
} from "react-native";


export default function GenerateQR({ navigation }) {

  return (
    <View style={globalStyles.container}>
      <ImageBackground source={require('../assets/background/1.jpeg')} resizeMode="cover" style={globalStyles.backgoundimage}>
        <Image
          style={globalStyles.Logo}
          source={require('../assets/site-assets/SecureGate-logos_white.png')}
        />
        <View style={{backgroundColor: 'rgb(255, 255, 255)'}}>
          <View style={globalStyles.qrCode}>
            <QRCode
              value={navigation.getParam('rsa')}
              size={350}
              bgColor="black"
              fgColor="white"
            />
          </View>
        </View>
        <Text style={globalStyles.title}>
          Screenshot and Send this QR to the Guest.
        </Text>
      </ImageBackground>
    </View>
  )
  
}
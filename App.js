import React from "react";
import { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacityBase,
  SafeAreaView,
  TouchableOpacity,
  Share,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import ViewShot from 'react-native-view-shot';

const YourApp = () => {
  const [qrvalue, setQrvalue] = useState("");
  const [inputText, setInputText] = useState("");
  let myQRCode = useRef();

  const viewShotRef = useRef();
  
    const shareQRCode = async () => {
      try {
        const uri = await viewShotRef.current.capture();
  
        Share.share({
          title: 'QR Code',
          url: uri,
        });
      } catch (error) {
        console.error('Error sharing QR code:', error);
      }
    };

  // const shareQRCode = () => {
  //   myQRCode.toDataURL((dataURL) => {
  //     console.log(dataURL);
  //     let shareImage = {
  //       title: "My QR Code",
  //       url: `data:image/png;base64,${dataURL}`,
  //       subject: "Share Link",
  //     };
  //     Share.share(shareImage).catch((error) => console.log(error));
    // });
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Generate Your Own QR Code 🎉</Text>
        <QRCode
          getRef={(ref) => (myQRCode = ref)}
          value={qrvalue ? qrvalue : "NA"}
          size={250}
          color="black"
          backgroundColor="white"
        />
        <Text style={styles.textStyle}>
          Enter below to generate your own QR Code.
        </Text>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={(inputText) => setInputText(inputText)}
          placeholder="Enter Any Value"
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setQrvalue(inputText)}
        >
          <Text style={styles.buttonTextStyle}>Generate QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={shareQRCode}>
          <Text style={styles.buttonTextStyle}>Share QR Code</Text>
        </TouchableOpacity>
      </View>
      <ViewShot ref={viewShotRef}>
      </ViewShot>
      <Text style={styles.bottomStyle}>Built in React Native</Text>
    </SafeAreaView>
  );
};

export default YourApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },
  titleStyle: {
    fontSize: 26,
    textAlign: "center",
    margin: 10,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 23,
    margin: 10,
  },
  textInputStyle: {
    fontSize: 22,
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    textAlign: "center",
  },
  buttonStyle: {
    backgroundColor: "#00d4ff",
    borderWidth: 0,
    color: "white",
    borderColor: "#00d4ff",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 30,
    paddingLeft: 22,
    paddingRight: 22,
  },
  buttonTextStyle: {
    color: "white",
    paddingVertical: 10,
    fontSize: 20,
  },
  bottomStyle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 19,
  },
});

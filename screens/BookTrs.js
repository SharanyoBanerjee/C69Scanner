import React from "react";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class TransactionScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      scannedData: "",
      buttonState: "normal",
    };
  }
  getCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
      buttonState: "clicked",
      scanned: false,
    });
  };
  handleBarCodeScanner = async ({ type, data }) => {
    this.setState({
      buttonState: "normal",
      scanned: true,
      scannedData: data,
    });
  };
  render() {
    const hasCameraPermission = this.state.hasCameraPermission;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;
    if (buttonState === "clicked" && hasCameraPermission === true) {
      return (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanner}
          style={StyleSheet.absoluteFillObject}
        ></BarCodeScanner>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
        <View>
          <Text>issue Or Return</Text>
          <Text>
            {hasCameraPermission === true
              ? this.state.scannedData
              : "requestCameraPermissions"}
          </Text>
          <TouchableOpacity
            style={styles.scanButton}
            onPress={this.getCameraPermission}
          >
            <Text style={styles.scanText}>Scan code</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: "coral",
    width: 150,
    height: 50,
    borderRadius: 10,
  },
  scanText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  displayText: { fontSize: 15, textDecorationLine: "underline" },
});

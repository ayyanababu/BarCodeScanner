/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity,
  PermissionsAndroid, AppState,
  BackHandler } from 'react-native';
import {
  BarcodePicker,
  ScanditModule,
  ScanSession,
  Barcode,
  SymbologySettings,
  ScanSettings,
  ScanOverlay
} from 'scandit-react-native';


ScanditModule.setAppKey('AWHcBgAuHZOfLq/leycGiBU/hT60NkQeWlo2XSl5SVQuPQp8sCsXVcln+54VarsLlDOcRld0Wp6kWMBqS0hib2BfJoeeaQlxawt1iL5kk0xgM6aXL2W0dO5DF4vfAQ/DMybjecqWoH+6jDOTlKtB/GjgSj+f7v70S1Vy8soQGR87k+iwdQsMnl08qc72LkUITBtx22MvVP+2e7lVexLWSI6+g8oFwHf4PgxntBoAaXv+A3pIjICgej04eDjzoQ3nEqfE9Xq4OIA1O6Tyg7qBekvNCor/lX3NtUKQhH6Am21UDve60TnSHTrPTh5J0xdc2avUhukqirCxVKc66XcpDsbiePJyQDUa39DbJymWbcRmw8vd/JDldUoBZNoV2UfU8Q04VgO2D6N0TEE+Qb91Ht8JPnSO24pYYmlAvhlrCFF+ntIkq3xzV3a8peVTuIcvMn985sH1tiW7bVogG8WpSkFtbblpQcZxrj9H1zuypgpItEG+lL+OnDHBaElw2IAsXqiu5t/AoUIX1UvfafFQHGvMHxpyRGjpmIBSVsoUFdkzAhdMPr5bzpsKg5C2pv6eU+aVh2dszpquHzCIxVHDWD6zdLdU1ds/iDGob2skbXOv4tk7XqSFqGYTIYW0VIiEzXqTgsi3JUTLR497AARWGYK2DtJGR1VJCdZ4wBW9ubWPtB0KiCZdu4Ko/WGyvJ6fa4QB8e7lwLk+hIQvp4/B1DG3uWeA4YRQarjlYRi4TrpO9VYmWcWLhugHGbM3ojoE5lcF6JEQSorRgtro+TrsLp+bzNfmRe93JmjmWmjf4dUOT8Y=');
this.settings = new ScanSettings();
this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state = {
      showCamera: false
    }
  }

  componentWillMount() {
    this.settings = new ScanSettings();
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.UPCE, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE39, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.ITF, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.QR, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.DATA_MATRIX, true);
    this.settings.setSymbologyEnabled(Barcode.Symbology.CODE128, true);
    this.settings.matrixScanEnabled = true;
    this.settings.codeRejectionEnabled = true;
    this.settings.highDensityModeEnabled = true;
    this.settings.maxNumberOfCodesPerFrame = 10;

    /* Some 1d barcode symbologies allow you to encode variable-length data. By default, the
       Scandit BarcodeScanner SDK only scans barcodes in a certain length range. If your
       application requires scanning of one of these symbologies, and the length is falling
       outside the default range, you may need to adjust the "active symbol counts" for this
       symbology. This is shown in the following few lines of code. */
    this.settings.getSymbologySettings(Barcode.Symbology.CODE39)
      .activeSymbolCounts = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    /* For details on defaults and how to calculate the symbol counts for each symbology, take
       a look at http://docs.scandit.com/stable/c_api/symbologies.html. */
  }

  isAndroidMarshmallowOrNewer() {
    return Platform.OS === 'android' && Platform.Version >= 23;
  }

  async hasCameraPermission() {
    if (this.isAndroidMarshmallowOrNewer()) {
      const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
      return granted;
    } else {
      return true;
    }
  }

  async requestCameraPermission() {
    if (this.isAndroidMarshmallowOrNewer()) {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Android Camera Permission has been granted.");
          this.cameraPermissionGranted();
        } else {
          console.log("Android Camera Permission has been denied - the app will shut itself down.");
          this.cameraPermissionDenied();
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      this.cameraPermissionGranted();
    }
  }

  // This method should only be called if the Platform.OS is android.
  cameraPermissionDenied() {
    BackHandler.exitApp();
  }

  cameraPermissionGranted() {
    // this.scanner.startScanning();
    //  AppState.addEventListener('change', this._handleAppStateChange);
  }

  async componentDidMount() {
    const hasPermission = await this.hasCameraPermission();
    if (hasPermission) {
      this.cameraPermissionGranted();
    } else {
      await this.requestCameraPermission();
    }
  }

  // _handleAppStateChange = (nextAppState) => {
  //   if (nextAppState.match(/inactive|background/)) {
  //     this.scanner.stopScanning();
  //   } else {
  //     // this.scanner.startScanning();
  //   }
  // }


  onScan(session) {
    alert(session.newlyRecognizedCodes[0].data + " " + session.newlyRecognizedCodes[0].symbology);
  }

  startScan = () => {
    this.setState({
      showCamera: !this.state.showCamera
    }, () => {
      if (this.state.showCamera){
        // this.scanner.setGuiStyle(ScanOverlay.GuiStyle.MATRIX_SCAN);
        this.scanner.startScanning();
      }
    })
  }

  onRecognizeNewCodes(session) {
    // If you want to visually reject a code you should use ScanSession's rejectCode.
    // For example, the following code will reject all EAN8 codes.
    console.log('all code sessions', session);
    session.newlyTrackedCodes.forEach(function(barcode) {
      if (barcode.symbology == Barcode.Symbology.EAN8) {
        session.rejectTrackedCode(barcode);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <TouchableOpacity onPress={this.startScan}>
          <Text style={styles.instructions}>"Start"</Text>
        </TouchableOpacity>
        {this.state.showCamera && <BarcodePicker
          ref={(scan) => { this.scanner = scan }}
          scanSettings={ this.settings }
          onRecognizeNewCodes={(session) => { this.onRecognizeNewCodes(session) }}
          style={{ width: 400, height: 400 }}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

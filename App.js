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
  Barcode,
  ScanSettings
} from 'scandit-react-native';


ScanditModule.setAppKey('AVBsUAUuGDziRWLNowhuS2k4Wd8rAfsiLnaSjuJ4Qk7wDaRTfC27qvttyS1PKbhnrlXU+n9ZYUokG8j3WWmzUx5nJYD1YnIUHw0giSJPV2QoHGJ8in8z4Pt4/g1heBvjxXBiywhA2aDNcmAmJFvdXl1zKSmbYQ5Br3tH0+l2ijZ2cRWwlXl2z5hVOiGvXH3uoHd3CR5N0UNVYZQdyWe12e5To+cYcPwPu0qMMdNBYXU8ciDEC2pvz0t2K5mbX267WyzlFcpYT11yT+4C1nZEXd50uQSnY4jn+FUHiZRGQ7O6XKC0dFz5541XY8A9Rs24NV3HXE8hDW+edQKqxWLYYbZkYGr8b+c2T27HkLVCwrVnIXfIeVI3ljxeLdBUam/xxU9PMe1OIaGwVb0ziXpN8aZ24XpAQfk+2mmsnlVKxtEcLvmcnlLkZcdY8+sBYKykcnVk1J9aRMPkH23qw0xlbHFFnem5TPQJPGgIAAd1PWCafudAdGOA7JlT6SvUR0FPXxOf1g0cvafyOiMsH/ebss1L3HGIvSPCbohabgM4DJYfvIkW/fK67sx8k6LaSNoPMEeL/kBX3Sua8A81awHovrscLYfJMGVtdeEiWH6AVSqdFw0JBrzjsDFuIQjLnkDlIaHYj7BwCk86qbFDRKYwPD1wGrkSaoPgflv9PYpPTNDzKX7fG/We3jnA234h541dhP+QIeoPdJ7k8RROSbM4Ec8hPheCkAtMUOQ6t5llWnjaqiOIbDavmeook2gNLdYHIvhwr3JPiD/fA6owgxn2ZbPag8nD6KOxwGzvuMCLpTKUQ8kqbAp2QBIFbGwaNSjLdj2RUCPlD1XawxTttn9S/H+q21faQgDffSUsIel7LQkuTEgPqiiQ4Rji5eDk8IQ1JrVwm1JUBEjKsW/GWYy6QPf+x+lAMgiOXWdYZuy/S96Lo1+6/ZEJOMzMgmIxHvnEkA1hDKvB5/AJrzxcSTJr9Zf8iRsNShZ2FtDy4CQCH0z6AqyYwBaWBylvppcSE9XAKV16L+LSSRcZyhIzxwnVUif+utyV76aTM93R8IVqUIFR4rEpym/Psux5bchrVcXoIidCldD/VP7LdQVE9Bm4f8KO1dK86sm+l2+mN2UURdU2DRdnVAcgReZiBVGBmP0CCUjzYxP97B1lRvdU4W/aJc62FkJv1NSaOv1sIHmrrt3wlZ30P1kjlqQW');
this.settings = new ScanSettings();
this.settings.setSymbologyEnabled(Barcode.Symbology.EAN13, true);
this.settings.setSymbologyEnabled(Barcode.Symbology.EAN8, true);
this.settings.setSymbologyEnabled(Barcode.Symbology.UPCA, true);

type Props = {};
export default class App extends Component<Props> {

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
    this.scanner.startScanning();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  async componentDidMount() {
    const hasPermission = await this.hasCameraPermission();
    if (hasPermission) {
      this.cameraPermissionGranted();
    } else {
      await this.requestCameraPermission();
    }
  }

  _handleAppStateChange = (nextAppState) => {
    if (nextAppState.match(/inactive|background/)) {
      this.scanner.stopScanning();
    } else {
      this.scanner.startScanning();
    }
  }


  onScan(session) {
    alert(session.newlyRecognizedCodes[0].data + " " + session.newlyRecognizedCodes[0].symbology);
  }

  startScan = () => {
    this.scanner.startScanning();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <TouchableOpacity onPress={this.startScan}>
          <Text style={styles.instructions}>"Start"</Text>
        </TouchableOpacity>
        <BarcodePicker
      ref={(scan) => { this.scanner = scan }}
      scanSettings={ this.settings }
      onScan={(session) => { this.onScan(session) }}
      style={{ flex: 1 }}/>
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

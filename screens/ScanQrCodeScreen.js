import OurButton from '../components/Button';
import { Text, View, StyleSheet, Linking } from 'react-native';
import { useEffect, useState } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Title from '../components/Title';
//import * as Linking from 'expo-linking';


export default function ScanQrCodeScreen({ navigation, route }) {
//on créer les états pour demander la permission et celui de scanner
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
//demande de permission
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);
//fonction codeBar
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  //onSuccess => {
   // Linking.openURL(data).catch(err =>
     // console.error('An error occured', err))}
  return (
    <View style={styles.container}>
      <Title name={styles.titre} 
      h5={true}>Scanne le QR Code du restaurant pour avoir ton badge!</Title>    
      
      <BarCodeScanner
       style={styles.barcodebox} 
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
       
       // onRead={onSuccess}
        />
      {scanned} 
      <OurButton text='Tap to Scan Again' onPress={() => setScanned(false)} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 400,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,

  },
   titre:{
    alignItems: 'center',
    justifyContent: 'center',
    alignContent:'center'
  }
});
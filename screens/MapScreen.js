// IMPORTS HABITUELS
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
// MAP
import MapView from 'react-native-maps'; // composant MapView
import { Marker } from 'react-native-maps'; // composant Marker
import * as Location from 'expo-location'; // permet la géolocalisation
import style from '../styles/customMapStyle.json'; // style de la map généré sur Google Maps

import OurButton from '../components/Button';

export default function MapScreen() {
  const [latitude, setLatitude] = useState(48.8566);
  const [longitude, setLongitude] = useState(2.3522);

  const updateLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    console.log('location updated !', latitude, longitude);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        updateLocation();
      }
    })();
  }, []);

  return (
    <>
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        customMapStyle={style}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
          <OurButton icon="heart" color="pingouin" />
        </Marker>
      </MapView>
      <TouchableOpacity
        style={styles.touchable}
        onPress={() => updateLocation()}
      >
        <Text>Hey !</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  touchable: {
    height: 50,
    width: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'goldenrod',
  },
});

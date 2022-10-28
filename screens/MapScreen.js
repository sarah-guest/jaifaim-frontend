// IMPORTS REACT
import { useEffect, useState } from 'react';
// IMPORTS COMPOSANTS
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OurButton from '../components/Button';
import OurText from '../components/OurText';
import OurTitle from '../components/Title';
// IMPORTS MAP
import MapView from 'react-native-maps'; // composant MapView
import { Marker } from 'react-native-maps'; // composant Marker
import * as Location from 'expo-location'; // permet la géolocalisation
import style from '../styles/customMapStyle.json'; // style de la map généré sur Google Maps
import convertColor from '../modules/convertColor';
// IMPORTS AUTRES
import FontAwesome from 'react-native-vector-icons/FontAwesome';

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
      <View style={styles.mealCard}>
        <View style={styles.icons}>
          <FontAwesome
            style={styles.icon}
            name="heart"
            size={25}
            color={convertColor('cannelle')}
          />
          <FontAwesome
            style={styles.icon}
            name="bookmark"
            size={25}
            color={convertColor('cannelle')}
          />
        </View>
        <OurTitle h3={true}>Smoky Mafé from Dakar</OurTitle>
        <OurTitle h5={true}>BMK Folie-Bamako (500m)</OurTitle>
        <OurText>40 Rue Jean-Pierre Timbaud</OurText>
        <OurText>
          Our Smoky Mafe (smoked chicken) with additional delicious vegetables -
          Gluten-free
        </OurText>
        <View style={styles.mealPictureContainer}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://images.squarespace-cdn.com/content/v1/5988374246c3c4bd445e0f31/1635431938985-FUVA09T5J34L0FM5XKUR/BMKFolie_Hero.jpg',
            }}
          />
        </View>
      </View>
      {/* Bouton pour mettre à jour la localisation et éventuellement recentrer la map */}
      {/* <TouchableOpacity
        style={styles.touchable}
        onPress={() => updateLocation()}
      >
        <FontAwesome
          style={styles.icon}
          name="star"
          size={25}
          color={convertColor('cannelle')}
        />
      </TouchableOpacity> */}
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
    backgroundColor: convertColor('caféaulaitchaud'),
  },
  mealCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 300,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    backgroundColor: convertColor('poudrelibre'),
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderColor: convertColor('sable'),
    borderWidth: 2,
    shadowColor: convertColor('marronfoncé'),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  mealPictureContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 5,
    left: 10,
  },
  icon: {
    marginLeft: 16,
  },
});

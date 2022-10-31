// IMPORTS REACT
import { useEffect, useState } from 'react';
// IMPORTS COMPOSANTS
import { StyleSheet } from 'react-native';
import OurButton from '../components/Button';
import MealCard from '../components/MealCard';
// IMPORTS MAP
import MapView from 'react-native-maps'; // composant MapView
import { Marker } from 'react-native-maps'; // composant Marker
import * as Location from 'expo-location'; // permet la géolocalisation
import style from '../styles/customMapStyle.json'; // style de la map généré sur Google Maps

export default function MapScreen() {
  const [latitude, setLatitude] = useState(48.8566);
  const [longitude, setLongitude] = useState(2.3522);
  const [showCard, setShowCard] = useState(false);
  const [restaurants, setRestaurants] = useState([
    {
      address: '40 Rue Jean-Pierre Timbaud',
      latitude: 48.866153,
      longitude: 2.371771,
      name: 'BMK Folie-Bamako',
      pdjDescription:
        'Our Smoky Mafe (smoked chicken) with additional delicious vegetables - Gluten-free',
      pdjName: 'Smoky Mafé from Dakar',
      pdjSrc:
        'https://images.squarespace-cdn.com/content/v1/5988374246c3c4bd445e0f31/1635431938985-FUVA09T5J34L0FM5XKUR/BMKFolie_Hero.jpg',
    },
    {
      address: '75 Rue des Gravilliers 75003 Paris',
      latitude: 48.86463,
      longitude: 2.353801,
      name: 'ORTO',
      pdjDescription:
        "Parmigiana d'aubergines, pesto de basilic DOP, straciatella de burrata, tomates séchées marinées, roquette, basilic frais, pistaches",
      pdjName: 'Veggi',
      pdjSrc:
        'https://lh5.googleusercontent.com/p/AF1QipOGigeytxDyQsNF34S3c0RNUHmqXFgxfcPCuQ-8=w740-h420-k-no',
    },
  ]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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

  const handleRestaurantIconPress = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowCard(true);
  };

  const restaurantsDom = restaurants.map((restaurant, key) => (
    <Marker
      key={key}
      coordinate={{
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
      }}
      onPress={() => handleRestaurantIconPress(restaurant)}
    >
      <OurButton icon="heart" color="sable" />
    </Marker>
  ));

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
        onPanDrag={() => {
          showCard && setShowCard(false);
        }}
      >
        <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
          <OurButton icon="heart" color="pingouin" />
        </Marker>
        {restaurantsDom}
      </MapView>
      {showCard && <MealCard restaurant={selectedRestaurant} />}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});

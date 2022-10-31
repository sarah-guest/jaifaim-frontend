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
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [restaurants, setRestaurants] = useState([
    {
      address: '40 Rue Jean-Pierre Timbaud',
      latitude: 48.866153,
      longitude: 2.371771,
      name: 'BMK Folie-Bamako',
      pdjDescription:
        'Notre Smoky Mafé (poulet braisé) avec de délicieux légumes en plus. Sans gluten.',
      pdjName: 'Smoky Mafé de Dakar',
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
    {
      address: '22 Rue Saint-Augustin, 75002 Paris',
      latitude: 48.868934,
      longitude: 2.335161,
      name: 'Dochilak Opéra',
      pdjDescription:
        'Riz couvert de légumes variés, d’œuf et de lamelles de boeuf à mélanger avec la sauce soja ou épicée selon vos envies. Servi dans un bol en pierre brûlant.',
      pdjName: 'Bibimbap au Bœuf',
      pdjSrc:
        'https://res.cloudinary.com/tf-lab/image/upload/customer/d1cf427c-4be2-4785-aa59-74305852b3b5/36b5dcc9-6822-433f-ac9b-c728a5400570.jpg',
    },
    {
      address: '145 Quai de Valmy, 75010 Paris',
      latitude: 48.877513,
      longitude: 2.365125,
      name: 'Le Valmy',
      pdjDescription:
        "Cuisse de canard confite à l'orange, pommes de terre grenailles et purée de patates douces",
      pdjName: 'Canard confit et purée de patates douces',
      pdjSrc:
        'https://lh5.googleusercontent.com/p/AF1QipO9dp3NAy2IiV_BaMI88bkoIipIznR10_SSnuRv=s609-k-no',
    },
    {
      address: '24 Rue Linné, 75005 Paris',
      latitude: 48.84557,
      longitude: 2.354779,
      name: 'Café Jussieu',
      pdjDescription:
        'Dos de cabillaud dans sa robe de panure et frites de pomme de terre maison',
      pdjName: 'Fish and Chips',
      pdjSrc:
        'https://media-cdn.tripadvisor.com/media/photo-w/1c/21/0b/ce/photo3jpg.jpg',
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
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
        customMapStyle={style}
        onPanDrag={() => {
          showCard && setShowCard(false);
        }}
      >
        {longitude && latitude && (
          <Marker coordinate={{ latitude: latitude, longitude: longitude }}>
            <OurButton icon="heart" color="pingouin" />
          </Marker>
        )}
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

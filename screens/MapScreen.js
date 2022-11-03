// IMPORTS REACT
import { useEffect, useState } from 'react';
// IMPORTS FONT AWESOME
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
// IMPORTS COMPOSANTS
import { StyleSheet, TouchableOpacity, View, Button } from 'react-native';
import OurButton from '../components/Button';
import MealCard from '../components/MealCard';
// IMPORTS MAP
import MapView from 'react-native-maps'; // composant MapView
import { Marker } from 'react-native-maps'; // composant Marker
import * as Location from 'expo-location'; // permet la géolocalisation
import style from '../styles/customMapStyle.json'; // style de la map généré sur Google Maps
import IP_ADDRESS from '../modules/ipAddress';
import convertColor from '../modules/convertColor';

export default function MapScreen({ navigation, route }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const updateLocation = async () => {
    const location = await Location.getCurrentPositionAsync({});
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        updateLocation();
      }
    })();
  }, []);

  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/platsdujour/read/`)
      .then((response) => response.json())
      .then((json) => {
        json.result && setRestaurants(json.restaurants);
      });
  }, []);

  const handleRestaurantIconPress = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowCard(true);
  };

  const ButtonNavigateToDashboard = (
    <View style={styles.buttonWrapper}>
      <TouchableOpacity style={styles.buttonNavigateToDashboard}>
        <OurButton
          text="Go back to dashboard"
          onPress={() =>
            navigation.navigate('TabNavigation', { type: 'restaurant' })
          }
        />
      </TouchableOpacity>
    </View>
  );

  const restaurantsDom = restaurants.map((restaurant, key) => {
    if (restaurant.coordinates) {
      return (
        <Marker
          key={key}
          coordinate={{
            latitude: restaurant.coordinates.latitude,
            longitude: restaurant.coordinates.longitude,
          }}
          onPress={() => handleRestaurantIconPress(restaurant)}
        >
          <View style={[styles.markers, styles.restaurant]}>
            <FontAwesomeIcon style={styles.markerIcon} name="map-pin" />
          </View>
        </Marker>
      );
    }
  });

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
          <Marker coordinate={{ latitude, longitude }}>
            <View style={[styles.markers, styles.position]}>
              <FontAwesomeIcon style={styles.markerIcon} name="heart" />
            </View>
          </Marker>
        )}
        {restaurantsDom}
      </MapView>
      {showCard && <MealCard restaurant={selectedRestaurant} />}
      {route.params &&
        route.params.type === 'restaurant' &&
        ButtonNavigateToDashboard}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  buttonNavigateToDashboard: {
    width: '80%',
    position: 'absolute',
    bottom: 30,
  },
  markers: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  restaurant: {
    backgroundColor: convertColor('sable'),
  },
  position: {
    backgroundColor: convertColor('pingouin'),
  },
  markerIcon: {
    color: 'white',
    fontSize: 15,
  },
});

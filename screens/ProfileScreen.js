// IMPORTS HABITUELS
import { Image, StyleSheet, Text, View } from 'react-native';

// DUMMY RESOURCES
const restaurantAvatarSource = require('../assets/images/avatarRestaurant.png');
const name = 'La Capsule';
const bioShort =
  'La Capsule est un Coding Bootcamp classé N#1 en France qui propose des formations de haut niveau pour apprendre à coder en web et mobile.';
const adresse = '56 Bd Pereire, 75017 Paris';
const website = 'https://www.lacapsule.academy/'; // Todo : http/https links in react native
// ---------------

export default function ProfileScreen() {
  const RestaurantProfileScreen = () => {
    return (
      <View style={styles.container}>
        <Image source={restaurantAvatarSource} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.underName}>{adresse}</Text>
        <Text style={styles.bioShort}>{bioShort}</Text>
      </View>
    );
  };

  return <RestaurantProfileScreen />;
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  name: {
    fontSize: 32,
  },
  bioShort: {
    fontSize: 18,
    textAlign: 'center',
  },
});

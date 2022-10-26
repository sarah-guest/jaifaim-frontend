// IMPORTS HABITUELS
import { Image, StyleSheet, Text, View } from 'react-native';

// DUMMY RESOURCES
const restaurantAvatarSource = require('../assets/images/avatarRestaurant.png');
const name = 'user';
const bioShort =
  '';
const adresse = '';
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
    backgroundColor: '#E6CCB3',
  },
  name: {
    fontSize: 32,
  },
  bioShort: {
    fontSize: 18,
    textAlign: 'center',
  },
});

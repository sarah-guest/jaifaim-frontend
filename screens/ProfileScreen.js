// IMPORTS HABITUELS
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

 
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
        <View style={styles.view}> 
        <Image source={restaurantAvatarSource} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.underName}>{adresse}</Text>
        <Text style={styles.bioShort}>{bioShort}</Text>
        </View>
      </View>
    );
  };

  return <RestaurantProfileScreen />;
}

const styles = StyleSheet.create({
  container: {
    
    padding: 110,
    flex: 1,
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: '#E6CCB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 32,
    marginTop: 42,
    flexdirection: 'column',
    
  },
  bioShort: {
    fontSize: 18,
    textAlign: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 122,
    borderradius: 50,
    
  
  }
});

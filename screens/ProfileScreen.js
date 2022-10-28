// IMPORTS HABITUELS
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
 
// DUMMY RESOURCES
const restaurantAvatarSource = require('../assets/images/avatarRestaurant.png');
const name = '';
const path = 'restaurants';
const IP_ADDRESS= '192.168.10.165'


export default function ProfileScreen({ navigation, route }) {

 const dispatch = useDispatch();
 let { type } = route.params;
 const [user, setUser] = useState(''); //nom de l'utilisateur
 const [profile, setProfile] = useState(''); //Profil

 fetch(`http://${IP_ADDRESS}:3000/${path}/restaurant`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: setUser,
        profile: setProfile,
      }),
    }).then(response => response.json())
      .then(data => {

       
        if (data.result) {
          if (type === 'user') {
            dispatch(({ user: setUser, token: data.token }));
            navigation.navigate( { setUser });
          } else if (type === 'restaurant') {
            dispatch(({ profile: setProfile, token: data.token }));
            navigation.navigate('Welcome', { type: 'restaurant' });
          }
         
        
        else {}
      };
  });

 

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

  return <RestaurantProfileScreen/>;
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

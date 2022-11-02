import { Text, View, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { getFirstName } from '../reducers/user';
import { getName } from '../reducers/restaurant';
//Import de nos composants
import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';
import Title from '../components/Title';

export default function AskNameScreen({ navigation, route }) {
  //On détermine le type d'utilisateur pour savoir quoi afficher dans l'écran
  let { type } = route.params;
  //Import du reducer
  const dispatch = useDispatch();
  //On initialise des variables pour le nom à afficher
  const [firstname, setFirstname] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  //on défini les type user OU restaurant
  const myNameIs = () => {
    let path = '';
    let whatUser = '';

    if (type === 'user') {
      path = 'users';
      whatUser = firstname;
    }

    else if (type === 'restaurant') {
      path = 'restaurants';
      whatUser = restaurantName;
    }

    //Si utilisateur, on enregistre son firstname et l'envoie dans le Store
    if (type === 'user') {
      dispatch(getFirstName(whatUser));
      navigation.navigate("InfoUser", { type: 'user' });

      //Si restaurateur, on enregistre son nom de restaurant et l'envoie dans le Store
    } else if (type === 'restaurant') {
      dispatch(getName({ name: whatUser }));
      navigation.navigate('InfoRestaurant', { type: 'restaurant' });
    }
  };

  if (type === 'user') {
    return (

      <View style={styles.container}>
    <View  style={styles.titre}>
        <Title h2>Comment voudrais-tu que l'on t'appelle?</Title>
        </View>
        <View style={styles.Inputs} width={'70%'}>
        <OurTextInput
          placeholder="Prénom"
          onChangeText={(value) => setFirstname(value)}
          value={firstname}
        />
        <OurButton
          text="Je m'inscris"
          color="caféaulaitchaud"
          onPress={myNameIs} />
          </View>
      </View>
    );
  } else if (type === 'restaurant') {
    return (

      <View style={styles.container}>
        <View  style={styles.titre}>
        <Title h2>Quel est le nom de votre commerce?</Title>
        </View>
        <View style={styles.Inputs} width={'70%'}>
        <OurTextInput
          placeholder="Nom du restaurant"
          onChangeText={(value) => setRestaurantName(value)}
          value={restaurantName}
        />
        <OurButton
          text="Je m'inscris"
          color="caféaulaitchaud"
          onPress={myNameIs} />
          </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Inputs:{
    marginTop:'10%',
    justifyContent: 'space-evenly',
 
},
titre:{padding:'10%' ,},
});

import { Text, View, StyleSheet, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector, useState } from 'react';
import { getFirstName } from '../reducers/user';
import { getName } from '../reducers/restaurant';

//import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';


export default function AskNameScreen({ navigation, route }) {
  //On récupère l'utilisateur dans le reducer
  const user = useSelector((state) => state.user.value.user);
  //On récupère le restaurant dans le reducer
  const name = useSelector((state) => state.restaurant.value.name);

  //On détermine le type d'utilisateur pour savoir quoi afficher dans l'écran
  let { type } = route.params;
  //Import du reducer
  const dispatch = useDispatch();
  //On initialise des variables pour le nom à afficher
  const [firstname, setFirstname] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  //On fetch l'utilisateur OU le restaurant pour récupérer le firstname OU name dans la base de données
  let path = '';
  let whatUser = '';
  let whatName = '';

  if (type === 'user') {
    path = 'users';
    whatUser = user;
  }

  else if (type === 'restaurant') {
    path = 'restaurants';
    whatUser = name;
  }
  fetch(`http://192.168.0.20:3000/${path}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      firstname: whatName,
    }),
  }).then(response => response.json())
    .then(data => {
      if (data.result) {
        //Si utilisateur, on enregistre son firstname et l'envoie dans le Store
        if (type === 'user') {
          dispatch(getFirstName({ firstname: whatName }));
          navigation.navigate('Welcome', { type: 'user' });
          //Si restaurateur, on enregistre son nom de restaurant et l'envoie dans le Store
        } else if (type === 'restaurant') {
          dispatch(getName({ name: whatName }));
          navigation.navigate('Welcome', { type: 'restaurant' });
        }
      }
    });


  if (type === 'user') {
    return (

      <View style={styles.container}>
        <Text>Comment voudrais-tu qu'on t'appelle?</Text>
        <OurTextInput
          placeholder="Prénom"
          onChangeText={(value) => setFirstname(value)}
          value={firstname}
        />
        <Button>Valider</Button>
      </View>
    );
  } else if (type === 'restaurant') {
    return (

      <View style={styles.container}>
        <Text>Comment s'appelle votre commerce?</Text>
        <OurTextInput
          placeholder="Nom du restaurant"
          onChangeText={(value) => setRestaurantName(value)}
          value={restaurantName}
        />
        <Button>Valider</Button>
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
});

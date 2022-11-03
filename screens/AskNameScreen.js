import { KeyboardAvoidingView, View, StyleSheet, Image } from 'react-native';
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

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.titre}>
          <Title h2 isCentered>Comment voudrais-tu qu'on t'appelle ?</Title>
        </View>
        <View style={styles.Inputs} width={'50%'}>
          <OurTextInput
            placeholder="Prénom"
            onChangeText={(value) => setFirstname(value)}
            value={firstname}
          />
        </View>
        <View styles={styles.inscription} width={'50%'}>
          <OurButton
            text="Je m'inscris"
            color="caféaulaitchaud"
            onPress={myNameIs} />

        </View>
      </KeyboardAvoidingView>
    );
  } else if (type === 'restaurant') {
    return (

      <View style={styles.container}>
        <View style={styles.titre}>
          <Title h2>Quel est le nom de votre commerce ?</Title>
        </View>
        <View style={styles.Inputs} width={'50%'}>
          <OurTextInput
            placeholder="Nom du restaurant"
            onChangeText={(value) => setRestaurantName(value)}
            value={restaurantName}
          />
        </View>
        <View styles={styles.inscription} width={'50%'}>
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
  Inputs: {
    marginTop: '10%',
    justifyContent: 'space-evenly',
    marginBottom: '10%',
  },
  titre: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inscription: {
    paddingTop: '20%'
  },

});

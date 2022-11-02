import { StyleSheet, View, Button } from 'react-native';
import { useState } from 'react';
//import de nos composants
import Title from '../components/Title';
import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';
//imports redux
import { useDispatch, useSelector } from 'react-redux';
import { getDiet, getIntolerances } from '../reducers/user';
//import IP adress pour le fetch du backEnd
import IP_ADDRESS from '../modules/ipAddress';
//Import FontAwsome
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function UserPrefScreen({ navigation, route }) {

  const dispatch = useDispatch();
  const [allergie, setAllergie] = useState('');
  const type = route.params;
  const getUserIntolerances = () => {
    dispatch(getIntolerances(allergie));
  };
  const getUserDiet = (newDiet) => {
    dispatch(getDiet(newDiet));
  };
  const user = useSelector((state) => state.user.value);

  const sendUserInfo = () => {
    const myData = {
      username: user.username,
      email: user.email,
      firstname: user.firstName,
      password: user.password,
      diets: user.diet,
      intolerances: user.intolerances,
      profilGourmand: user.pref,
    };
    console.log(myData, 'hello');
    fetch(`http://${IP_ADDRESS}:3000/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          navigation.navigate('TabNavigation', { type: 'user' });
        }
      });
  };

  return (
    <View>
      <View style={styles.titre}>
        <Title h2 h1={true}>
          Dernières précisions
        </Title>
      </View>
      <Title h5>
        Tu peux préciser un régime allimentaire
      </Title>

      <View style={styles.buttons}>
        <OurButton text='Végétarien' onPress={() => getUserDiet('Vegératien')} />
        <OurButton text='Végan' onPress={() => getUserDiet('Végan')} />
        <OurButton text='Homnivore' onPress={() => getUserDiet('Homnivore')} />
        <OurButton text='Grossesse' onPress={() => getUserDiet('Grossesse')} />
        <OurButton text='Sans gluten' onPress={() => getUserDiet('Sans gluten')} />
        <OurButton text='Crudivore' onPress={() => getUserDiet('Crudivore')} />
        <OurButton text='Paléo' onPress={() => getUserDiet('Paléo')} />
        <OurButton text='Bec Sucré' onPress={() => getUserDiet('Bec Sucré')} />
        <OurButton text='Faible en glycémie' onPress={() => getUserDiet('Faible en glycémie')} />
        <OurButton text='Hallal' onPress={() => getUserDiet('Hallal')} />
        <OurButton text='Casher' onPress={() => getUserDiet('Casher')} />

      </View>
      <Title h5>
        Tu peux aussi nous indiquer tes allergies et/ou intolérances
      </Title>
      <View styles={styles.intolerances}>
        <View style={styles.input}>
          <OurTextInput
            placeholder="Arachide, gluten..."
            onChangeText={(value) => setAllergie(value)}
            value={allergie}
          />
        </View>
        <View style={styles.valider}></View>
        <OurButton
          text="C'est tout bon"
          onPress={getUserIntolerances}
        ></OurButton>
      </View>
      <View style={styles.button}>
        <OurButton
          onPress={sendUserInfo}
          icon={'arrow-circle-right'}
        >
        </OurButton>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  titre: {
    paddingLeft: '2%',
    paddingTop: '25%',
    paddingBottom: '5%',
  },
  buttons: {
    paddingLeft: '2%',
    paddingRight: '2%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: '10%',
  },
  intolerances: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '2%',
    paddingRight: '2%',
  },
  valider: {
    flexDirection: 'row',
  },

  input: {
    marginTop: '5%',
  },
  button: {
    marginTop: '5%',
    marginRight: '5%',
    alignItems: 'flex-end',

  },
});

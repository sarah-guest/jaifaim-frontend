import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
//import de nos composants
import Title from '../components/Title';
import OurButton from '../components/Button';
import InputAndButton from '../components/InputAndButton';
import OurTextInput from '../components/TextInput';
//imports redux
import { useDispatch, useSelector } from 'react-redux';
import { getDiet, getIntolerances } from '../reducers/user';
//import IP adress pour le fetch du backEnd
import IP_ADDRESS from '../modules/ipAddress';

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
    // dispatch(getIntolerances(allergie));

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
          navigation.navigate('Welcome', { type: 'user' });
        }
      });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View>
        <View style={styles.titre}>
          <Title h2 isCentered>
            Dernières précisions
          </Title>
        </View>
        <Title h5>
          Ton régime alimentaire :
        </Title>

        <View style={styles.buttons}>
          <View style={styles.button}><OurButton text='Végétarien' onPress={() => getUserDiet('Vegératien')} /></View>
          <View style={styles.button}><OurButton text='Végan' onPress={() => getUserDiet('Végan')} /></View>
          <View style={styles.button}><OurButton text='Homnivore' onPress={() => getUserDiet('Homnivore')} /></View>
          <View style={styles.button}><OurButton text='Grossesse' onPress={() => getUserDiet('Grossesse')} /></View>
          <View style={styles.button}><OurButton text='Sans gluten' onPress={() => getUserDiet('Sans gluten')} /></View>
          <View style={styles.button}><OurButton text='Crudivore' onPress={() => getUserDiet('Crudivore')} /></View>
          <View style={styles.button}><OurButton text='Paléo' onPress={() => getUserDiet('Paléo')} /></View>
          <View style={styles.button}><OurButton text='Bec Sucré' onPress={() => getUserDiet('Bec Sucré')} /></View>
          <View style={styles.button}><OurButton text='Faible en glycémie' onPress={() => getUserDiet('Faible en glycémie')} /></View>
          <View style={styles.button}><OurButton text='Hallal' onPress={() => getUserDiet('Hallal')} /></View>
          <View style={styles.button}><OurButton text='Casher' onPress={() => getUserDiet('Casher')} /></View>
        </View>
        <Title h5>
          Tu peux aussi nous indiquer tes allergies et/ou intolérances
        </Title>
        <View style={styles.intolerances}>
          <View style={styles.input}>
            <OurTextInput
              customWidth={280}
              placeholder="Arachide, gluten..."
              onChangeText={(value) => setAllergie(value)}
              value={allergie}
            />
          </View>
          <OurButton
            onPress={() => getUserIntolerances()}
            color=""
            icon={'check'}
          ></OurButton>
        </View>
        <View style={styles.validate}>
          <OurButton
            color="caféaulaitchaud"
            onPress={sendUserInfo}
            text='Suivant'
          >
          </OurButton>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  titre: {
    marginBottom: 40
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 40,
  },
  button: {
    marginRight: 10,
  },
  intolerances: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valider: {
    flexDirection: 'row',
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  validate: {
    alignItems: 'flex-end',
  },
});

import { Text, StyleSheet, View } from 'react-native';
import Title from '../components/Title';
import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDiet, getIntolerences } from '../reducers/user';
import IP_ADDRESS from '../modules/ipAddress';

export default function UserPrefScreen({ navigation }) {
  //  const goTo = () => { navigation.navigate('Profile'); };
  const dispatch = useDispatch();
  const [allergie, setAllergie] = useState('');

  const getUserIntolerences = () => {
    dispatch(getIntolerences({ intolerences: allergie }));
  };
  const user = useSelector((state) => state.user.value);

  const sendUserInfo = () => {
    const myData = {
      username: user.username,
      email: user.email,
      firstname: user.firstName,
      password: user.password,
      diets: user.diet,
      intolerences: user.intolerences,
      profilGourmand: user.pref,
    };
    console.log(myData);
    fetch(`http://${IP_ADDRESS}:3000/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(myData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          //  navigation.navigate('Profile');
          console.log(data.result, 'hello');
        }
      });
  };

  return (
    <View>
      <Title style={styles.titre} h1={true}>
        Mes préférences
      </Title>
      <View style={styles.buttons}>
        {/* <OurButton text='Végétarien' onPress={getUserDiet} /> */}
        {/* <OurButton text='Végan' onPress={getUserDiet('Végan')} />
                <OurButton text='Homnivore' onPress={getUserDiet('Homnivore')} /> */}
        {/* <OurButton  text='Grossesse' onPress={getUserDiet('Grossesse')} />
                <OurButton text='Sans gluten' onPress={getUserDiet('Sans gluten')} />
                <OurButton text='Crudivore' onPress={getUserDiet('Crudivore')} />
                <OurButton text='Paléo' onPress={getUserDiet('Paléo')} />
                <OurButton text='Bec Sucré' onPress={getUserDiet('Bec Sucré')} />
                <OurButton text='Faible en glycémie' onPress={() => getUserDiet('Faible en glycémie')} />
                <OurButton text='Hallal' onPress={getUserDiet('Hallal')} />
                <OurButton text='Casher' onPress={getUserDiet('Casher')} /> */}
      </View>
      <OurTextInput
        placeholder="Arachide, gluten..."
        onChangeText={(value) => setAllergie(value)}
        value={allergie}
      />
      <OurButton
        style={styles.button}
        text="OK"
        onPress={getUserIntolerences}
      ></OurButton>
      <View style={styles.valider}>
        <OurButton
          style={styles.button}
          text="Valider"
          onPress={sendUserInfo}
        ></OurButton>
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
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginrught: 10,
  },
});

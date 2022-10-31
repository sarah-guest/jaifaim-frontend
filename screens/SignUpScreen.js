import { Text, View, StyleSheet, TextInput } from 'react-native';
import { useState, useSelector } from 'react';
import { useDispatch } from 'react-redux';
import { signInUser } from '../reducers/user';
import { signInRestaurant } from '../reducers/restaurant';
import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';


export default function SignInScreen({ navigation, route }) {
  //Import du reducer
  const dispatch = useDispatch();
  //On détermmine le type d'utilisateur pour afficher ce qui lui correspond
  let { type } = route.params;

  //const user = useSelector((state) => state.user.value);
  //On crée les input à surveiller
  const [user, SetUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  //On crée la fonction d'inscription
  const handleRegister = () => {
    let path = '';
    let whichEmail = '';
    let whichUser = '';
    let whichPassword = '';

    if (type === 'user') {
      path = 'users';
      whichEmail = email;
      whichUser = user;
      whichPassword = password;
    } else if (
      type === 'rastaurant') {
      path = 'restaurants';
      whichEmail = email;
      whichUser = name;
      whichPassword = password;
    }


    if (type === 'user') {
      dispatch(signInUser({ username: whichUser, email: whichEmail, password: whichPassword }));
      navigation.navigate('AskName', { type: 'user' });
    } else if (type === 'restaurant') {
      dispatch(signInRestaurant({ username: whichUser, email: whichEmail, password: whichPassword }));
      navigation.navigate('AskName', { type: 'restaurant' });
    }

  };
  //Si on s'incrit en tant qu'utilisateur
  if (type === 'user') {
    return (
      <View style={styles.container}>
        <Text>J'ai faim</Text>
        <OurTextInput
          placeholder="New name"
          onChangeText={(value) => SetUser(value)}
          value={user}
        />
        <OurTextInput
          placeholder="New email"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />

        <OurTextInput
          placeholder="New password"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />


        <OurButton
          text="Je m'inscris"
          color="caféaulaitchaud"
          onPress={handleRegister}
        />

      </View>
    );
  }
  else if (type === 'restaurant') {

    return (
      <View style={styles.container}>
        <Text>J'ai à manger</Text>
        <OurTextInput
          placeholder="New name"
          onChangeText={(value) => setName(value)}
          value={name}
        />
        <OurTextInput
          placeholder="New email"
          onChangeText={(value) => setEmail(value)}
          value={email}
        />
        <OurTextInput
          placeholder="New password"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <OurButton
          text="Je m'inscris"
          color="caféaulaitchaud"
          onPress={handleRegister}
        />

      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

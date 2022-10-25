import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
//imports de nos composants
import TextInput from '../components/TextInput';
import OurButton from '../components/Button';
import { useDispatch } from 'react-redux';
import { getSignIn } from '../reducers/user';

export default function SignInScreen({ navigation, route }) {
  //Imports du reducer
  const dispatch = useDispatch();

  //On détermine le type d'utilisateur pour savoir quoi afficher dans l'écran
  let { type } = route.params;

  //On crée les états de l'utilisateur
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //On crée les états du restaurant


  //On crée la fonction de connexion d'un utilisateur
  const handleUserConnection = () => {
    //On fetch sur la route POST /users/signin pour enregistrer les username et password
    fetch('http://192.168.10.130:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    }).then(response => response.json())
      .then(data => {
        //Si l'utilisateur existe
        if (data.result) {
          console.log("réussi", data.result);
          dispatch(getSignIn({ username: username, token: data.token }));
          // setUsername('');
          // setPassword('');
          navigation.navigate('Welcome', { type: 'user' });
        }
        //Si l'utilisateur n'existe pas
        else {
          console.log("Ton compte n'est pas reconnu")
        }
      });
  };

  //On crée la fonction de connexion d'un restaurateur
  const handleRestaurantConnection = () => {
    fetch('http://192.168.10.130:3000/restaurants/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          console.log("réussi", data.result);
          //dispatch(login({ username: username, token: data.token }));
          // setSignInUsername('');
          // setSignInPassword('');
          // setIsModalVisible(false)
        } else {
          console.log("pas de résultat")
        }
      });
  };

  //Si compte utilisateur :
  if (type === 'user') {
    return (
      <View style={styles.container}>
        <Text>Utilisateur</Text>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <TextInput
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <OurButton
          text="je m'inscris"
          color="caféaulaitchaud"
          onPress={handleUserConnection}
        ></OurButton>
      </View>
    )
  }

  //Si compte restaurant :
  else if (type === 'restaurant') {
    return (
      <View style={styles.container}>
        <Text>
          Restaurant
        </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(value) => setUsername(value)}
          value={username}
        />
        <TextInput
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <OurButton
          text="je m'inscris"
          color="caféaulaitchaud"
          onPress={handleRestaurantConnection}
        ></OurButton>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

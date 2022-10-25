import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
//imports de nos composants
import TextInput from '../components/TextInput';
import OurButton from '../components/Button';
import { useDispatch } from 'react-redux';
import { signInUser } from '../reducers/user';
import { signInRestaurant } from '../reducers/restaurant'

export default function SignInScreen({ navigation, route }) {
  //Import du reducer
  const dispatch = useDispatch();

  //On détermine le type d'utilisateur pour savoir quoi afficher dans l'écran
  let { type } = route.params;

  //on crée des inputs pour surveiller :
  const [user, setUser] = useState(''); //nom de l'utilisateur
  const [name, setName] = useState(''); //nom du restaurant
  const [password, setPassword] = useState(null);

  //On crée la fonction de connexion
  const handleConnection = () => {
    let path = ''
    let whatUser = ''
    let whatPassword = ''

    if (type === 'user') {
      path = 'users';
      whatUser = user;
      whatPassword = password;
    }

    else if (type === 'restaurant') {
      path = 'restaurants';
      whatUser = name;
      whatPassword = password;
    }

    //On fetch sur la route POST /users OU restaurants/signin 
    //pour enregistrer les username OU name et password
    fetch(`http://192.168.10.130:3000/${path}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: whatUser,
        password: whatPassword,
      }),
    }).then(response => response.json())
      .then(data => {

        //Si l'utilisateur existe
        if (data.result) {
          if (type === 'user') {
            dispatch(signInUser({ username: whatUser, token: data.token }));
            navigation.navigate('Welcome', { type: 'user' });
          } else if (type === 'restaurant') {
            dispatch(signInRestaurant({ username: whatUser, token: data.token }));
            navigation.navigate('Welcome', { type: 'restaurant' });
            console.log(whatUser)
          }
          // setPassword('');
          // setUser('');
        }
        //Si l'utilisateur n'existe pas
        else {
          console.log("Ton compte n'est pas reconnu")
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
          onChangeText={(value) => setUser(value)}
          value={user}
        />
        <TextInput
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <OurButton
          text="je m'inscris"
          color="caféaulaitchaud"
          onPress={handleConnection}
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
          placeholder="Nom du restaurant"
          onChangeText={(value) => setName(value)}
          value={name}
        />
        <TextInput
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          value={password}
        />
        <OurButton
          text="Je m'inscris"
          color="caféaulaitchaud"
          onPress={handleConnection}
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

import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
//import FontAwesome
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//imports de nos composants
import TextInput from '../components/TextInput';
import OurButton from '../components/Button';
import OurText from '../components/OurText';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../reducers/user';
import { signInRestaurant } from '../reducers/restaurant';

export default function SignInScreen({ navigation, route }) {
  //Import du reducer
  const dispatch = useDispatch();
  //On détermine le type d'utilisateur pour savoir quoi afficher dans l'écran
  let { type } = route.params;

  //const IP_ADDRESS = '192.168.10.136';
  const IP_ADDRESS = '192.168.1.36';

  //on crée des inputs pour surveiller :
  const [user, setUser] = useState(''); //nom de l'utilisateur
  const [name, setName] = useState(''); //nom du restaurant
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);

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
    fetch(`http://${IP_ADDRESS}:3000/${path}/signin`, {
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
          }
          setError(false);
        }
        //Si l'utilisateur n'existe pas
        else {
          console.log("Ton compte n'est pas reconnu")
          setError(true)
        }
      });
  };

  //Si compte utilisateur :
  if (type === 'user') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <OurText body1>Utilisateur</OurText>
        <View style={styles.inputs}>
          <TextInput
            placeholder="Username"
            onChangeText={(value) => setUser(value)}
            value={user}
          />
          <View style={styles.password}>
            <TextInput
              placeholder="Mot de passe"
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry={passwordVisible}
              width={true}
            />
            <FontAwesome style={styles.showHide} name={passwordVisible ? "eye" : "eye-slash"} onPress={() => setPasswordVisible(!passwordVisible)} />
          </View>
        </View>
        {error && <OurText body2>Ce compte n'existe pas</OurText>}
        <OurButton
          text="je me connecte"
          color="caféaulaitchaud"
          onPress={handleConnection}
        ></OurButton>
      </KeyboardAvoidingView>
    )
  }

  //Si compte restaurant :
  else if (type === 'restaurant') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <OurText body1>
          Restaurant
        </OurText>
        <View style={styles.inputs}>
          <TextInput
            width={true}
            placeholder="Nom du restaurant"
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <View style={styles.password}>
            <TextInput
              width={true}
              placeholder="Mot de passe"
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry={passwordVisible}
            />
            <FontAwesome style={styles.showHide} name={passwordVisible ? "eye" : "eye-slash"} onPress={() => setPasswordVisible(!passwordVisible)} />
          </View>
        </View>
        {error && <OurText body2>Ce compte n'existe pas</OurText>}
        <OurButton
          text="Je me connecte"
          color="caféaulaitchaud"
          onPress={handleConnection}
        ></OurButton>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  password: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  showHide: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 20,
  },
});

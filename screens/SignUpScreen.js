import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
//Import FontAwsome
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import pour le reducer/store
import { useDispatch } from 'react-redux';
import { signInUser } from '../reducers/user';
import { signInRestaurant } from '../reducers/restaurant';
//Import de nos composants
import OurButton from '../components/Button';
import OurText from '../components/OurText';
import OurTextInput from '../components/TextInput';
import Title from '../components/Title';

export default function SignInScreen({ navigation, route }) {
  //Import du reducer
  const dispatch = useDispatch();
  //On détermmine le type d'utilisateur pour afficher ce qui lui correspond
  let { type } = route.params;

  //On crée les input à surveiller
  const [user, SetUser] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(true);

  const [error, setError] = useState(false);

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
      type === 'restaurant') {
      path = 'restaurants';
      whichEmail = email;
      whichUser = name;
      whichPassword = password;
    }

    if (type === 'user') {
      if (user !== '' && email !== '' && password !== '') {
        dispatch(signInUser({ username: whichUser, email: whichEmail, password: whichPassword }));
        navigation.navigate('AskName', { type: 'user' });
        setError(false)
      } else {
        setError(true)
      }
    } else if (type === 'restaurant') {
      if (name !== '' && email !== '' && password !== '') {
        dispatch(signInRestaurant({ username: whichUser, email: whichEmail, password: whichPassword }));
        navigation.navigate('AskName', { type: 'restaurant' });
        setError(false)
      } else {
        setError(true)
      }
    }

  };
  //Si on s'incrit en tant qu'utilisateur
  if (type === 'user') {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.titre}>
          <Title h1>Bref,</Title>
          <OurText body2>
            J'AI FAIM
          </OurText>
        </View>
        <View style={styles.Inputs}>
          <View style={styles.input}>
            <OurTextInput
              placeholder="Username"
              onChangeText={(value) => SetUser(value)}
              value={user}
            /></View>
          <View style={styles.input}>
            <OurTextInput
              placeholder="Email"
              onChangeText={(value) => setEmail(value)}
              value={email}
            /></View>

          <View style={styles.password}>
            <OurTextInput
              placeholder="Mot de passe"
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry={passwordVisible}
              width={true}
            />
            <View style={styles.eyeCon}>
              <FontAwesome
                style={styles.showHide}
                name={passwordVisible ? 'eye' : 'eye-slash'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            </View>
          </View>

          {error && <OurText body2>Informations manquantes</OurText>}
          <OurButton
            text="Je m'inscris"
            color="caféaulaitchaud"
            onPress={handleRegister}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
  else if (type === 'restaurant') {
    //si on s'incrit en tant que restaurant
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.titre}>
          <Title h1>Bref,</Title>
          <OurText body2>
            J'AI À MANGER
          </OurText>
        </View>
        <View style={styles.Inputs}>
          <View style={styles.input}>
            <OurTextInput
              placeholder="Nom du restaurant"
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </View>
          <View style={styles.input}>
            <OurTextInput
              placeholder="Email"
              onChangeText={(value) => setEmail(value)}
              value={email}
            />
          </View>
          <View style={styles.password}>
            <OurTextInput
              placeholder="Mot de passe"
              onChangeText={(value) => setPassword(value)}
              value={password}
              secureTextEntry={passwordVisible}
              width={true}
            />
            <View style={styles.eyeCon}>
              <FontAwesome
                style={styles.showHide}
                name={passwordVisible ? 'eye' : 'eye-slash'}
                size={25}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            </View>
          </View>

          {error && <OurText body2>Informations manquantes</OurText>}
          <OurButton
            text="Je m'inscris"
            color="caféaulaitchaud"
            onPress={handleRegister}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  titre: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  Inputs: {
    paddingTop: 20,
    // justifyContent: 'space-around',
    marginBottom: 20,
  },
  input: {
    marginTop: 20,
  },
  password: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'space-between',
  },
  eyeCon: {
    paddingLeft: 10,
    justifyContent: 'flex-end'
  },
  showHide: {
    marginLeft: 15,
    marginBottom: 10,
    fontSize: 20,
  },
});

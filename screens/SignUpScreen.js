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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
      
         <View style={styles.Inputs} width={'70%'}>
         <View style={styles.titre}>
        <Title h1>Bref,</Title>
         <Title  h2>
           J'ai faim
          </Title>
          </View>
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
      <View style={styles.container}>
       <View style={styles.Inputs} width={'70%'}> 
       <View style={styles.titre}>
        <Title h1>Bref,</Title>
         <Title  h2>
           J'ai à manger
          </Title>
          </View>
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
       
        <OurButton
          text="Je m'inscris"
          color="caféaulaitchaud"
          onPress={handleRegister}
        />
 </View>
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
  titre:{
  
  justifyContent:'center',
  alignItems: 'center',
  },
 Inputs: {
  flex:1,
  paddingTop:'20%',
  justifyContent: 'space-evenly',
   marginBottom:'20%',
  
 },
 password:{
flexDirection: 'row',
 alignItems: 'space-between',

},
eyeCon:{
  paddingLeft:'25%',
  justifyContent:'flex-end'
},
});

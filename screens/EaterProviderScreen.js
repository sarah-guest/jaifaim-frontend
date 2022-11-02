import { Image, Text, View, StyleSheet } from 'react-native';
//Import de nos composants
import OurButton from '../components/Button';
import Title from '../components/Title';
//Import FontAwsome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function EaterProviderScreen({ navigation }) {
  //On crée une qui définit si on est user...
  const handleSignUpUser = () => {
    navigation.navigate('SignUp', { type: 'user' });
  };
  //...ou un restaurant
  const handleSignUpRestaurant = () => {
    navigation.navigate('SignUp', { type: 'restaurant' });
  };

  return (
    <View style={styles.container}>
      
        <View style={styles.jai}>
        <Title h1={true}>Bref,</Title>
        <Title h2>J'ai...</Title>
        </View>
        <View style={styles.page}>
          <OurButton
            text="...faim"
            onPress={handleSignUpUser}
            color="caféaulaitchaud"
          />

<View style={styles.question}>
          <OurButton
            text="...à manger"
            onPress={handleSignUpRestaurant}
            color="caféaulaitchaud"
          />
        </View>
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
  jai:{
   justifyContent:'center',
   alignItems:'center',
  marginTop:'20%', 
  paddingTop:'40%'
  },
  question: {
    flexDirection:'column',
    marginTop: '20%',
    marginBottom:'25%',
    
  },
  page: {
    flex: 1,
    paddingTop: '20%',
    width: '50%',
  },
});

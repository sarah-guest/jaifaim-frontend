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
      <View style={styles.question}>
        <Title h1={true}>J'ai</Title>
        <View style={styles.page}>
          <OurButton
            text="...faim"
            onPress={handleSignUpUser}
            color="pingouin"
          />


          <OurButton
            text="...à manger"
            onPress={handleSignUpRestaurant}
            color="pingouin"
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
  question: {
    flex: 1,
    flexDirection:'column',
    marginTop: '25%',
    marginBottom:'25%',
    
  },
  page: {
    flex: 1,
    paddingTop: '40%',
    width: '50%',
  },
});

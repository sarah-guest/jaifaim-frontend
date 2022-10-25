import { StyleSheet, Text, View, Image} from 'react-native';
import OurButton from '../components/Button';

export default function LandingScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate('SignIn');

  }
  const handleNavigation = () => {
    navigation.navigate('Demo');
  };

  return (
    <View>
      <Image style={styles.image} source={require('../assets/logo.jpg')} />
      <Text onPress={() => handleNavigation()}>C'est parti!</Text>



      <OurButton text='Mon compte existe déjà' color='caféaulaitchaud' onPress={handleSubmit}/>
    </View>
  )

};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
}
)

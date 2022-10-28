import { StyleSheet, View, Image } from 'react-native';
import OurButton from '../components/Button';
export default function LandingScreen({ navigation }) {

  const handleSignUp = () => {
    navigation.navigate('Demo');
  };

  const handleSignInRestaurant = () => {
    navigation.navigate('SignIn', { type: 'restaurant' });
  };
  const handleSignInUser = () => {
    navigation.navigate('SignIn', { type: 'user' });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo.jpg')}
      />

      <OurButton
        text="je m'inscris"
        color="caféaulaitchaud"
        onPress={handleSignUp}
      ></OurButton>

      <OurButton
        text="j'ai un compte restaurateur"
        color="caféaulaitchaud"
        onPress={handleSignInRestaurant}
      ></OurButton>

      <OurButton
        text="j'ai un compte utilisateur"
        color="caféaulaitchaud"
        onPress={handleSignInUser}
      ></OurButton>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    },
  image: {
    flex: 1,
    width: '40%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

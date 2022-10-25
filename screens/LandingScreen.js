import { StyleSheet, View, Image } from 'react-native';
import Button from '../components/Button';
export default function LandingScreen({ navigation }) {
  
  const handleSignUp = () => {
    navigation.navigate('Demo');
  };

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/logo.jpg')}
      />

      <Button
        Text="je m'inscris"
        color="caféaulaitchaud"
        onPress={() => handleSignUp()}
      ></Button>

      <Button
        Text="j'ai déjà un compte"
        color="caféaulaitchaud"
        onPress={() => handleSignIn()}
      ></Button>
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

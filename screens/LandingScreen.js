import { useState, useEffect } from 'react';
import { StyleSheet, View, Image, LayoutAnimation } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OurButton from '../components/Button';

export default function LandingScreen({ navigation }) {
  const [isVisible, setIsVisible] = useState(false);

  //On set un délai d'affichage : 3 secondes avant le passage au screen suivant
  // setTimeout(() => {
  //   setIsVisible(true)
  // }, 2000);

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.spring();
      setIsVisible(true);
    }, 1500);
  }, [])

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
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/LOGO_BREF.png')}
      />

      {isVisible && <View style={styles.animated}>
        <OurButton
          text="je m'inscris"
          color="caféaulaitchaud"
          onPress={handleSignUp}
        />

        <OurButton
          text="j'ai un compte restaurateur"
          color="caféaulaitchaud"
          onPress={handleSignInRestaurant}
        />

        <OurButton
          text="j'ai un compte utilisateur"
          color="caféaulaitchaud"
          onPress={handleSignInUser}
        />
      </View>}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: '50%',
    marginBottom: '25%',
    width: 290,
    height: 290,
    resizeMode: 'contain',
  },
});

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../components/Button';
export default function LandingScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate({ screen: 'SignInScreen' })
  }
  return (
    <View>
      <Image style={styles.image} source={require('../assets/logo.jpg')}
        onPress={() => navigation.navigate('DemoScreen')} />


      <Button Text="j'ai déjà un compte" color='caféaulaitchaud' onPress={() => handleSubmit()} ></Button>
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
    flex:1,
    width: '40%',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
)

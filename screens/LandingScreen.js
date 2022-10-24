import { Button, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function LandingScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.native({ screen: 'SignInScreen' })
  }
  return (
    <View>
      <Image style={styles.image} source={require('../assets/logo.jpg')}
        onPress={() => navigation.navigate('DemoScreen')} />
  

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>J'ai déjà un compte</Text>
      </TouchableOpacity>
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
  image:{
    
    width:'40%',
    height:'40%',
    alignItems: 'center',
    justifyContent: 'center',
  }
}
)

import { Image, Text, View, StyleSheet } from 'react-native';
import OurButton from '../components/Button';

export default function EaterProviderScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate('SignUp');
  };
  return (
    <View style={styles.container}>
      <Text>J'ai</Text>
      <Image style={styles.image} source={require('../assets/logo.jpg')} />
      {/* <OurButton onPress={handleSubmit} color="pingouin" text="...faim" />
      <OurButton onPress={handleSubmit} color="pingouin" text="...à manger" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

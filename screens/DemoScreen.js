import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
} from 'react-native';
//import swiper
import Swiper from 'react-native-swiper';
import OurButton from '../components/Button';
//nos imports
import Title from '../components/Title';

export default function DemoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Title h1 isCentered={true}>Tutoriel</Title>
      </View>
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Image source={require('../assets/images/DEMO_screen1.png')} style={styles.image} />
        </View>
        <View style={styles.slide2}>
          <Image source={require('../assets/images/DEMO_screen2.png')} style={styles.image} />
        </View>
        <View style={styles.slide3}>
          <Image source={require('../assets/images/DEMO_screen3.png')} style={styles.image} />
        </View>
      </Swiper>

      <OurButton color='caféaulaitchaud' text="Ok, j'arrive !" onPress={() => navigation.navigate('EaterProvider')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 30,
    marginBottom: 30,
  },
  //swiper styles: 
  wrapper: {},
  slide1: {
    flex: 1,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 550,
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
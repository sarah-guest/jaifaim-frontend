import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
} from 'react-native';
//import swiper
import Swiper from 'react-native-swiper';
//import FontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//nos imports
import OurButton from '../components/Button';
import Title from '../components/Title';
import OurText from '../components/OurText';
import convertColor from '../modules/convertColor';

export default function DemoScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Title h1 isCentered={true}>En bref</Title>
      </View>
      {/* On initialise le composant qui permettra le Swipe */}
      <Swiper style={styles.wrapper} showsButtons={true}
        prevButton={<Text style={styles.arrows}>‹</Text>}
        nextButton={<Text style={styles.arrows}>›</Text>}
        dot={<View style={[styles.dots, { backgroundColor: convertColor('sable') }]} />}
        activeDot={<View style={[styles.dots, { backgroundColor: convertColor('marronglacé') }]} />}
      >
        <View style={styles.slide}>
          <ImageBackground
            source={require('../assets/images/TUTO_slide1.jpg')}
            style={styles.background}
          >
            <View style={styles.slide1}>
              <OurText body2 isLight>Avec « BREF. J'ai faim », finie l'interminable recherche de restaurants. Renouez avec vos commerçants de quartier et découvrez de nouvelles adresses via un aperçu appétissant du plat du jour!</OurText>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.slide2}>
          <Image source={require('../assets/images/DEMO_screen1.jpg')} style={styles.image} />
        </View>
        <View style={styles.slide2}>
          <Image source={require('../assets/images/DEMO_screen2.jpg')} style={styles.image} />
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
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  arrows: {
    color: convertColor('marronglacé'),
    fontSize: 60,
  },
  slide: {
    flex: 1,
    width: 250,
    height: 550,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  background: {
    padding: 20,
  },
  slide1: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 20,
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
    height: 570,
    borderRadius: 20,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
});
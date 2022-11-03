import {
  StyleSheet,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import SearchBar from '../components/SearchBar';
//import icons de FontAwesome
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Import redux/store
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IP_ADDRESS from '../modules/ipAddress';
//Import de nos composants
import OurTextInput from '../components/TextInput';
import OurButton from '../components/Button';
import convertColor from '../modules/convertColor';
import OurText from '../components/OurText';
import Title from '../components/Title';
//Import FontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function FaqScreen({ navigation, route }) {


  const [isHidden, setIsHidden] = useState(false);
  //fonction qui fait apparaitre ou disparaitre la réponse
  const handleToggle = () => {
    setIsHidden(!isHidden);
  };


  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      blurRadius={60}

    >




      <SafeAreaView style={styles.container}>
        <SearchBar />
        <Title h1 isLight={true}>FAQ </Title>




        <View style={styles.questionAnswer}>
          <View style={styles.question}>
            <FontAwesomeIcon style={styles.plus}
              name='plus'
              size={30}
              onPress={() => handleToggle()} />
            <OurText body1>Votre restaurant est-il ouvert le dimanche?
            </OurText>
          </View>
          {isHidden === true &&
            <View style={styles.answer}><OurText body1>Reponse: </OurText>
              <OurText body2>Nous sommes ouverts du mercredi au dimanche de 9h à minuit.</OurText>
            </View>
          }
        </View>
        <View style={styles.questionAnswer}>
          <View style={styles.question}>
            <FontAwesomeIcon style={styles.plus}
              name='plus'
              size={30}
              onPress={() => handleToggle()} />
            <OurText body1>Est-ce que vous avez une formule déjeuner?
            </OurText>
          </View>
          {isHidden === true &&
            <View style={styles.answer}><OurText body1>Reponse: </OurText>
              <OurText body2>Oui, 11,50€ le plat, 13,50€ entrée/plat ou plat/dessert et 16€ pour la formule entière.</OurText>
            </View>
          }
        </View>
        <View style={styles.questionAnswer}>
          <View style={styles.question}>
            <FontAwesomeIcon style={styles.plus}
              name='plus'
              size={30}
              onPress={() => handleToggle()} />
            <OurText body1>Votre restaurant est-il ouvert le dimanche?
            </OurText>
          </View>
          {isHidden === true &&
            <View style={styles.answer}><OurText body1>Reponse: </OurText>
              <OurText body2>Nous sommes ouverts du mercredi au dimanche de 9h à minuit.</OurText>
            </View>
          }
        </View>





        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </SafeAreaView >
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  questionAnswer: {
    justifyContent: 'center',
    backgroundColor: convertColor('sable'),
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 20,
    width: '80%'

  },
  question: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,

  },
  plus: {
    paddingRight: 15,
    justifyContent: 'center',
  },
  answer: {
    paddingLeft: 36,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: convertColor('caféaulaitchaud'),
  },
  modalView: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: convertColor('caféaulaitchaud'),
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',

  },
});

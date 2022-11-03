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
import Toggle from '../components/Toggle';
//Import FontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function FaqScreen({ navigation, route }) {

  //On créer un état pour chaque bouton, sinon ils s'ouvrent tous au onPress
  const [isHidden, setIsHidden] = useState(false);
  const [isHidden1, setIsHidden1] = useState(false);
  const [isHidden2, setIsHidden2] = useState(false);
  const [isHidden3, setIsHidden3] = useState(false);
  const [isHidden4, setIsHidden4] = useState(false);
  //fonctions qui font apparaitre ou disparaitre la réponse
  const handleToggle = () => {
    setIsHidden(!isHidden);
  };
  const handleToggle1 = () => {
    setIsHidden1(!isHidden1);
  };
  const handleToggle2 = () => {
    setIsHidden2(!isHidden2);
  };
  const handleToggle3 = () => {
    setIsHidden1(!isHidden1);
  };
  const handleToggle4 = () => {
    setIsHidden2(!isHidden2);
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



        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View>
        <Toggle question='Votre restaurant est-il ouvert le dimanche ?' answer='Nous sommes ouverts du mercredi au dimanche de 9h à minuit.' />
        <Toggle question='Est-ce que vous avez une formule déjeuner?' answer='Oui, 11,50€ le plat, 13,50€ entrée/plat ou plat/dessert et 16€ pour la formule entière.' />
        <Toggle question='Est-ce que vous avez-vous une Happy Hour le soir?' answer="Oui, la pinte de blonde à 4€ jusqu'à 22h et les cocktails 6€!" />
        <Toggle question='Est-ce que vous avez une formule brunch le weekend?' answer="Non, nous avons une formule petit déjeuner et une formule petit dejeuner à l'anglaise avec oeuf tous le jours de la semaine." />
        <Toggle question="Est- il possible de privatiser l'établissement pour des événements type anniversaire? "answer="Il est possible de négocier des privatisation, passez nous voir pour en discuter!" />
      
        </View>
          
           </ScrollView>


        
        
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
  scroll: {
    width: '80%',
    marginTop: 30,
  }
});

import {
  StyleSheet,
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


export default function FaqScreen({ navigation, route }) {
  const restaurant = useSelector((state) => state.restaurant.value);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [date, setDate] = useState('2050-11-22T23:59:59');

 // let { type } = route.params;
    
	useEffect(() => {
		setDate(new Date());
	}, []);
  const askQuestion = () => {
    
      fetch(`http://${IP_ADDRESS}:3000/askquestion/:token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           date: Date,
           message: question,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message, "C'est la réponse!")
          if (type === 'user') {
           
            if(data.result){
            setQuestion('');
          }}
        });
    
  };

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      blurRadius={60}
    >
      <SafeAreaView style={styles.container}>
        <SearchBar />
        <OurTextInput
          placeholder="Postez votre réponse"
          onChangeText={(value) => setQuestion(value)}
          value={question}
        />
        <OurButton
          onPress={askQuestion}
          text="Pose ta question"
          color="caféaulaitchaud"/>
        < View style={styles.question}>

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
  text: {
    backgroundColor: 'blue',
  },
  input: {
    height: 50,
    width: '90%',
    backgroundColor: '#E6CCB2',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 50,
  },
});

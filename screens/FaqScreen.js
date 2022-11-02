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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import IP_ADDRESS from '../modules/ipAddress';

export default function FaqScreen({ navigation, route }) {
  const name = useSelector((state) => state.restaurant.value.username);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');

  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/restaurants/question`, {})
      .then((response) => response.json())
      .then((data) => {
        if (type === 'restaurant') {
          data.result !== null
            ? setRestaurantName(data.data.question)
            : setQuestion(question);
        }
      });
  }, []);

  return (
    <ImageBackground
    source={require('../assets/images/background.jpg')}
    style={styles.background}
    blurRadius={60}
  >
   <SafeAreaView style={styles.container}>
        <SearchBar  />
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

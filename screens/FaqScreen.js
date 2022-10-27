import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from 'react';
import { useSelector, useEffect} from 'react-redux';


export default function FaqScreen({ navigation , route }) {



    const name = useSelector((state) => state.restaurant.value.username)
    //let { type } = route.params;
    const IP_ADDRESS = '192.168.1.36';
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState('');
    let path = ''
    

    // if (type === 'restaurant') {
    //     path = 'restaurants';
    //     whatUser = name;
    // } else {}

    useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/restaurants/restaurant`, {
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ name: whatUser }),
    }).then(response => response.json())
        .then(data => {
            
            // if (type === 'restaurant') {
                data.result !== null ? setRestaurantName(data.data.name) : setRestaurantName(restaurantName)
           // }
        });
      }, []);




    return (
      <View style={styles.container}>
        
          <TextInput style={styles.input}> 🔎 Recherche </TextInput>
          <Text style={styles.text}> FAQ </Text>
          
        
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
    },
    text: {
        backgroundColor: 'blue',
    },
    input: {
        height: 50,
        width: '90%',
        backgroundColor: '#E6CCB2',
        alignItems : 'center',
        textAlign: 'center',
        borderRadius: 50,
        
        // marginBottom: 650,


    }
  });
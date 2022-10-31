// IMPORTS HABITUELS
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';
import OurButton from '../components/Button';


import { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
 



export default function ProfileScreen( {route} ) {
  //const RestaurantProfileScreen = () => {

    const name = useSelector((state) => state.restaurant.value.username)
    //let { type } = route.params;
    const IP_ADDRESS = '192.168.1.36';
    const [restaurantName, setRestaurantName] = useState('');
    

    useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/restaurants/restaurant`, {
        
    }).then(response => response.json())
        .then(data => {
            
                data.result !== null ? setRestaurantName(data.data.name) : setRestaurantName(restaurantName)
        });
      }, []);


    return (
      <View style={styles.container}>
        <View style={styles.view}> 
         <Image source={require('../assets/images/avatarRestaurant.png')} />
         <Text style={styles.name}> restaurant Name </Text>
         <TouchableOpacity style={styles.button} onPress={() => onPress()}>
         {OurButton}
       </TouchableOpacity>
        <View style={styles.bloc}> 
         <Text style={styles.emoji}>🍽️</Text>
        </View>
        <View style={styles.bloc}>
          <Text style={styles.emoji}>✉️</Text>
         </View>
         <View style={styles.bloc}>
          <Text style={styles.emoji}>ℹ️</Text>
         </View>

       

      

        </View>
      </View>
    );
    // return <RestaurantProfileScreen />;
  };


//}

const styles = StyleSheet.create({
  container: {

    // padding: 50,
    // paddingleft: 20,
    flex: 1,
    justifyContent: 'left',
    alignItems: 'center',
    backgroundColor: '#E6CCB3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 32,
    marginTop: 42,
    textAlign: "center"


  },
  bioShort: {
    fontSize: 18,
    textAlign: 'center',
  },
  view: {
    flex: 1,
    backgroundColor: 'white',
    padding: 122,
    borderradius: 50,
  },
  emoji: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 34,
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "center",
    // alignItems: "center"
  },
  bloc: {
    height: 50,
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'column-reverse',
    justifyContent: 'space-around',
    alignItems: 'center',

    
  },
  bloc2: {
    backgroundColor: 'blue',
  },
  bloc3: {
    backgroundColor: 'yellow',
  }

});

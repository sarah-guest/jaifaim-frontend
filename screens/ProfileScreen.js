// IMPORTS HABITUELS
import { Image, StyleSheet, Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { useState, useEffect } from 'react';
import { useSelector, } from 'react-redux';
 



export default function ProfileScreen( {route} ) {
  //const RestaurantProfileScreen = () => {

    const name = useSelector((state) => state.restaurant.value.username)
    //let { type } = route.params;
    const IP_ADDRESS = '192.168.1.36';
    const [restaurantName, setRestaurantName] = useState('');
    let path = ''

    useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/restaurants/restaurant`, {
        // method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ name: whatUser }),
    }).then(response => response.json())
        .then(data => {
            
                data.result !== null ? setRestaurantName(data.data.name) : setRestaurantName(restaurantName)
        });
      }, []);


    return (
      <View style={styles.container}>


        <View style={styles.view}> 
        
        <Text style={styles.name}>{restaurantName}</Text>
        <Text style={styles.underName}></Text>
        <Text style={styles.bioShort}></Text>

        </View>
      </View>
    );
    return <RestaurantProfileScreen />;
  };

  return <RestaurantProfileScreen/>;


const styles = StyleSheet.create({
  container: {

    padding: 110,
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


  }
});

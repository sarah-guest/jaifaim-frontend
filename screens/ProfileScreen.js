// IMPORTS REACT
import { useState, useEffect } from 'react';
// IMPORTS COMPOSANTS
import { Modal, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import OurButton from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
// IMPORTS REDUCER
import { useSelector } from 'react-redux';
// IMPORTS AUTRES
import IP_ADDRESS from '../modules/ipAddress';
import convertColor from '../modules/convertColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ route, navigation }) {
  
  const name = useSelector((state) => state.restaurant.value.username);
  
  const [restaurantName, setRestaurantName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibletwo, setModalVisibletwo] = useState(false);
  

  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/restaurants/restaurant`, {})
      .then((response) => response.json())
      .then((data) => {
        data.result !== null
          ? setRestaurantName(data.data.name)
          : setRestaurantName(restaurantName);
      });
  }, []);

  

  return (
    
    <SafeAreaView style={styles.container}>
      
      <View style={styles.view}>

        <Image style={styles.image} source={require('../assets/images/avatarRestaurant.png')} />
        <Text style={styles.name}> restaurantName </Text>
        <Modal visible={modalVisible} animationType="slide" transparent > 

         <View style={styles.modalView}>
          <Text style={styles.carbo}> Plat du Jour: Carbonara </Text>
          <Image
          style={styles.image2}
          source={require('../assets/images/carbo.jpg')}
      />
          </View>
          </Modal>
          <Modal visible={modalVisibletwo} animationType="slide" transparent > 

         <View style={styles.modalViewtwo}>
          <Text style={styles.carbo}> Plat du Jour: Carbonara </Text>
         
          </View>
          </Modal>
       
        <View style={styles.icons} backgroundColor={convertColor('poudrelibre')}>
        <FontAwesome 
        

          name={'cutlery'}
          size={50}
          color={convertColor('caféaulaitchaud')}
          style={styles.couteau}
          
        />
        <FontAwesome
          name={'info-circle'}
          size={50}
          color={convertColor('caféaulaitchaud')}
          style={styles.info}
          onPress={() => setModalVisible(true)}
        />
        <FontAwesome
          name={'comments'}
          size={50}
          color={convertColor('caféaulaitchaud')}
          style={styles.message}
          onPress={() => setModalVisibletwo(true)}
        />
        </View>
        
      </View>
    </SafeAreaView>
  );
 
}

//}

const styles = StyleSheet.create({
  container: {
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
    textAlign: 'center',
  },
  bioShort: {
    fontSize: 18,
    textAlign: 'center',
  },
 
 image: {
  marginLeft: 90,
 },
  
  icons: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 40,
    //height: 300,
    borderRadius: 30

    
  },
  couteau: {
    marginRight: 80,
    marginTop: 20,

  },
  info: {
    marginRight: 80,
    marginTop: 20,
  },
  message: {
    marginRight: 10,
    marginTop: 20,

  },

  modalView: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    width: 300,
    marginTop: 400,
    marginLeft: 45.5,
    textAlign: 'start',
    // fontSize: 59,
    
   
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#DDB892'
  },
  image2 : {
    height: 160,
    width: 200,
    borderRadius: 15,
  },
  carbo : {
    fontSize: 25,
    marginBottom: 30,
    width: 290,
    color: "white",
  },
  modalViewtwo : {
    
  }
});

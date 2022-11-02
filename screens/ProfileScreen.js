// IMPORTS REACT
import { useState, useEffect } from 'react';
// IMPORTS COMPOSANTS
import {
  Modal,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import OurButton from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
// IMPORTS REDUCER
import { useSelector } from 'react-redux';
// IMPORTS AUTRES
import IP_ADDRESS from '../modules/ipAddress';
import convertColor from '../modules/convertColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant.value);

  const [restaurantInfo, setRestaurantInfo] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibletwo, setModalVisibletwo] = useState(false);

  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/restaurants/restaurant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: restaurant.username }),
    })
      .then((response) => response.json())
      .then((rest) => {
        setRestaurantInfo(rest.data);

        console.log(rest.data);
        
      });
  }, []);

  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/platsdujour/read/`)
      .then((response) => response.json())
      .then((json) => {
        json.result && setRestaurants(json);
        //console.log(json)
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Image
          style={styles.image}
          source={require('../assets/images/avatarRestaurant.png')}
        />
        <Text style={styles.name}>{restaurantInfo.username} </Text>
        
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalView}>
            <Text style={styles.restinfo}>
              <FontAwesome
                name={'location-arrow'}
                size={30}
                color={convertColor('caféaulaitchaud')}
                style={styles.icon}
              /> 
              {/* {restaurantInfo.address.streetNumber} {restaurantInfo.address.streetType} {restaurantInfo.address.streetName} {restaurantInfo.address.postCode} {restaurantInfo.address.city} */}
            </Text>

            <Text style={styles.restinfo}>
              <FontAwesome
                name={'envelope'}
                size={30}
                color={convertColor('caféaulaitchaud')}
                style={styles.icon}
              />  {restaurantInfo.email}
            </Text>
            <Text style={styles.restinfo}>
              <FontAwesome
                name={'phone'}
                size={30}
                color={convertColor('caféaulaitchaud')}
                style={styles.icon}
              /> {restaurantInfo.phone}
            </Text>

            <FontAwesome
              name={'ban'}
              size={50}
              color={convertColor('caféaulaitchaud')}
              style={styles.ban}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </Modal>
        <Modal visible={modalVisibletwo} animationType="slide" transparent>
          <View style={styles.modalViewtwo}>
            <Text style={styles.carbo}> Mène a la page FAQ</Text>
            <FontAwesome
              name={'ban'}
              size={50}
              color={convertColor('caféaulaitchaud')}
              style={styles.ban}
              onPress={() => setModalVisibletwo(false)}
              // onPress={() => navigation.navigate('FaqScreen')}
            />
          </View>
        </Modal>

        <View
          style={styles.icons}
          backgroundColor={convertColor('poudrelibre')}
        >
          
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
            onPress={() => navigation.navigate('Faq')}
          />
          <Text style={styles.acc}>  </Text>
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
    fontSize: 35,
    marginTop: 42,
    textAlign: 'center',
    color: '#BB8557',
    fontWeight: 'bold',
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
    borderRadius: 30,
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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
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
    backgroundColor: '#DDB892',
  },
  image2: {
    height: 160,
    width: 200,
    borderRadius: 15,
  },
  restinfo: {
    fontSize: 25,
    marginBottom: 30,
    width: 290,
    color: 'white',
  },
  modalViewtwo: {
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
    backgroundColor: '#DDB892',
  },

  button: {
    backgroundColor: 'red',
  },

  icon: {
    // paddingLeft: ,
  },
});

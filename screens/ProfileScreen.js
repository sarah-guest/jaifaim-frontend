// IMPORTS REACT
import { useState, useEffect } from 'react';
// IMPORTS COMPOSANTS
import { Modal, ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import OurButton from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
// IMPORTS AUTRES
import IP_ADDRESS from '../modules/ipAddress';
import convertColor from '../modules/convertColor';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ route, navigation }) {
  const restaurant = useSelector((state) => state.restaurant.value);

  const [restaurantInfo, setRestaurantInfo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [restaurantName, setRestaurantName] = useState('')

  // On Récupère les informations des restaurants
  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/restaurants/restaurant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: restaurant.username }),
    })
      .then((response) => response.json())
      .then((rest) => {
        setRestaurantInfo(rest.data);
        setRestaurantName(rest.data.name)
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/images/avatarRestaurant.png')} />
      <Text style={styles.name}>{restaurantName}</Text>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalView}>
          <View>
            {/* Au chargement de la Page si les infos sont récupérées return les infos. */}
            {restaurantInfo && (
              <Text style={styles.restinfo}>
                <FontAwesome
                  name={'location-arrow'}
                  size={30}
                  color={convertColor('caféaulaitchaud')}
                />   {restaurantInfo.address.streetNumber}{' '}
                {restaurantInfo.address.streetType}{' '}
                {restaurantInfo.address.streetName}{' '}
                {restaurantInfo.address.postCode} {restaurantInfo.address.city}

              </Text>
            )}
          </View>

          <Text style={styles.restinfo}>
            <FontAwesome
              name={'envelope'}
              size={30}
              color={convertColor('caféaulaitchaud')}
            />   {restaurantInfo.email}

          </Text>
          <Text style={styles.restinfo}>
            <FontAwesome
              name={'phone'}
              size={30}
              color={convertColor('caféaulaitchaud')}
            />   {restaurantInfo.phone}

          </Text>

          <View style={styles.close}>
            <FontAwesome
              name={'times'}
              size={40}
              color={convertColor('caféaulaitchaud')}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <View style={styles.description}>
        <View style={styles.icons}>
          <FontAwesome
            name={'cutlery'}
            size={45}
            color={convertColor('caféaulaitchaud')}
            style={styles.couteau}
          />

          <FontAwesome
            name={'info-circle'}
            size={45}
            color={convertColor('caféaulaitchaud')}
            style={styles.info}
            onPress={() => setModalVisible(true)}
          />
          <FontAwesome
            name={'comments'}
            size={45}
            color={convertColor('caféaulaitchaud')}
            style={styles.message}
            onPress={() => navigation.navigate('Faq')}
          />
        </View>
        <View style={styles.restinfo}>
          {/* Au chargement de la Page si les infos sont récupérées return les infos. */}
          {restaurantInfo && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: '100%' }}>
              <Text style={styles.restinfo}>
                <FontAwesome
                  name={'ship'}
                  size={30}
                  color={convertColor('caféaulaitchaud')}
                />   {restaurantInfo.platsdujour[0].name}

              </Text>
              <Text style={styles.restinfo}>
                <FontAwesome
                  name={'hand-o-right'}
                  size={30}
                  color={convertColor('caféaulaitchaud')}
                />   {restaurantInfo.platsdujour[0].description}

              </Text>
            </ScrollView>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  description: {
    justifyContent: 'space-between',
    marginBottom: 80,
    height: '50%',
    borderRadius: 30,
    width: 300,
    padding: 20,
    backgroundColor: convertColor('sable'),
  },
  modalView: {
    height: 400,
    borderRadius: 20,
    padding: 30,
    position: 'absolute',
    left: 0,
    right: 0,
    marginLeft: 30,
    marginRight: 30,
    bottom: 98,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: convertColor('sable'),
  },
  image2: {
    height: 160,
    width: 200,
    borderRadius: 15,
  },
  restinfo: {
    fontSize: 25,
    marginBottom: 30,
    color: 'white',
    paddingTop: 20,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  close: {
    marginTop: 20,
    alignItems: 'center',
  },
});

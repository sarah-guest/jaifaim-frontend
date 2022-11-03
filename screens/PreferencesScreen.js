// IMPORTS COMPOSANTS
import { View, StyleSheet, ScrollView } from 'react-native';
import OurButton from '../components/Button';
import Title from '../components/Title';
import OurTag from '../components/Tag';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
import {
  getPrefRestauCuisine,
  getPrefRestauAtmos,
  getPrefRestauBook,
  getPrefRestauMisce,
} from '../reducers/restaurant';
// IMPORTS AUTRES
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';
import IP_ADDRESS from '../modules/ipAddress';
import { useState } from 'react';

export default function PreferencesScreen({ navigation, route }) {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedAtmospheres, setSelectedAtmospheres] = useState([]);
  const [selectedBookings, setSelectedBookings] = useState('');
  const [selectedMiscellaneous, setSelectedMiscellaneous] = useState([]);

  // CUISINE
  const cuisines = [
    'Gourmet',
    'Franchouillarde',
    'Bistronome',
    'Café cosy',
    'Petite Bourse',
  ];
  const toggleCuisineSelection = (cuisine) => {
    !selectedCuisines.includes(cuisine)
      ? setSelectedCuisines([...selectedCuisines, cuisine])
      : setSelectedCuisines(selectedCuisines.filter((e) => e !== cuisine));
  };
  const cuisinesDom = cuisines.map((cuisine, key) => (
    <OurTag
      key={key}
      text={cuisine}
      onPress={() => {
        toggleCuisineSelection(cuisine);
      }}
      isPressed={selectedCuisines.includes(cuisine)}
    />
  ));

  // ATMOSPHERE
  const atmospheres = ['Familles', 'Tête-à-tête', 'Grands groupes'];
  const toggleAtmosphereSelection = (atmosphere) => {
    !selectedAtmospheres.includes(atmosphere)
      ? setSelectedAtmospheres([...selectedAtmospheres, atmosphere])
      : setSelectedAtmospheres(
          selectedAtmospheres.filter((e) => e !== atmosphere)
        );
  };
  const atmospheresDom = atmospheres.map((atmosphere, key) => (
    <OurTag
      key={key}
      text={atmosphere}
      onPress={() => {
        toggleAtmosphereSelection(atmosphere);
      }}
      isPressed={selectedAtmospheres.includes(atmosphere)}
    />
  ));

  // BOOKING
  const bookings = ['Oui', 'Non'];
  const toggleBookingsSelection = (booking) => {
    !selectedBookings.includes(booking)
      ? setSelectedBookings([...selectedBookings, booking])
      : setSelectedBookings(selectedBookings.filter((e) => e !== booking));
  };
  const bookingsDom = bookings.map((booking, key) => (
    <OurTag
      key={key}
      text={booking}
      onPress={() => {
        toggleBookingsSelection(booking);
      }}
      isPressed={selectedBookings.includes(booking)}
    />
  ));

  // BOOKING
  const miscellaneous = [
    'Accueil PMR',
    'Menu enfant',
    'Casques anti-bruit',
    'Animaux bienvenu',
  ];
  const toggleMiscellaneousSelection = (miscellaneous) => {
    !selectedMiscellaneous.includes(miscellaneous)
      ? setSelectedMiscellaneous([...selectedMiscellaneous, miscellaneous])
      : setSelectedMiscellaneous(
          selectedMiscellaneous.filter((e) => e !== miscellaneous)
        );
  };
  const miscellaneousDom = miscellaneous.map((miscellaneous, key) => (
    <OurTag
      key={key}
      text={miscellaneous}
      onPress={() => {
        toggleMiscellaneousSelection(miscellaneous);
      }}
      isPressed={selectedMiscellaneous.includes(miscellaneous)}
    />
  ));

  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.value);

  // // Fonctions qui récupèrent les infos des inputs et les mettent dans le store
  // const checkPrefCuisine = (newCuisine) => {
  //   dispatch(getPrefRestauCuisine(newCuisine), console.log(newCuisine));
  // };
  // const checkPrefAtmos = (newAtmos) => {
  //   dispatch(getPrefRestauAtmos(newAtmos), console.log(newAtmos));
  // };
  // const checkPrefBook = (newBook) => {
  //   dispatch(getPrefRestauBook(newBook), console.log(newBook));
  // };
  // const checkPreMesce = (newMesce) => {
  //   dispatch(getPrefRestauMisce(newMesce), console.log(newMesce));
  // };

  // Envoyer toutes les informations du restaurant dans la base de données
  const sendInfoRestaurant = () => {
    const {
      username,
      name,
      email,
      password,
      streetName,
      streetNumber,
      streetType,
      postCode,
      city,
      siren,
      website,
      phone,
      cuisine,
      atmosphere,
      bookings,
      miscellaneous,
    } = restaurant;
    console.log(restaurant.miscellaneous);
    fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${streetNumber}+${streetType}+${streetName}+${postCode}`
    )
      .then((response) => response.json())
      .then((json) => {
        fetch(`http://${IP_ADDRESS}:3000/restaurants/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            name,
            email,
            password,
            address: {
              streetName,
              streetNumber,
              streetType,
              postCode,
              city,
            },
            coordinates: {
              latitude: json.features[0].geometry.coordinates[1],
              longitude: json.features[0].geometry.coordinates[0],
            },
            siren,
            website,
            phone,
            cuisine: selectedCuisines,
            atmosphere: selectedAtmospheres,
            bookings: selectedBookings,
            miscellaneous: selectedMiscellaneous,
            bioShort: '',
            bioLong: '',
            socials: {},
            goals: [],
            qrcode: {},
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.result) {
              navigation.navigate('Welcome', { type: 'restaurant' });
              console.log(data.result);
            }
          });
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.list}></View>
      <ScrollView>
        <View style={styles.optGroup}>
          <Title style={styles.titre} h5>
            Votre cuisine est plutôt...
          </Title>
          <View style={styles.buttons}>{cuisinesDom}</View>
        </View>
        <View style={styles.optGroup}>
          <Title style={styles.titre} h5>
            L'atmosphère du lieu
          </Title>
          <View style={styles.buttons}>{atmospheresDom}</View>
        </View>
        <View style={styles.optGroup}>
          <Title styles={styles.titre} h5>
            Les réservations
          </Title>
          <View style={styles.buttons}>{bookingsDom}</View>
        </View>
        <View style={styles.optGroup}>
          <Title style={styles.titre} h5>
            Autres
          </Title>
          <View style={styles.buttons}>{miscellaneousDom}</View>
        </View>
        <View style={styles.optGroup}>
          <Title style={styles.titre} h5>
            Réseaux Sociaux
          </Title>
          <View style={styles.logo}>
            <FontAwesomeIcon
              name={'twitter'}
              size={32}
              color={convertColor('caféaulaitchaud')}
            />
            <FontAwesomeIcon
              name={'facebook'}
              size={32}
              color={convertColor('caféaulaitchaud')}
            />
            <FontAwesomeIcon
              name={'instagram'}
              size={32}
              color={convertColor('caféaulaitchaud')}
            />
          </View>
        </View>
        <OurButton text="Suivant" onPress={sendInfoRestaurant} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  list: {
    marginTop: 40,
  },
  titre: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  logo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 160,
    color: convertColor('caféaulaitchaud'),
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginright: 10,
  },
  optGroup: {
    marginBottom: 16,
  },
});

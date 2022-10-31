import { Text, View, StyleSheet, ScrollView } from 'react-native';
import OurButton from '../components/Button';
import Title from '../components/Title';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPrefRestauCuisine,
  getPrefRestauAtmos,
  getPrefRestauBook,
  getPrefRestauMisce,
} from '../reducers/restaurant';
import IP_ADDRESS from '../modules/ipAddress';

export default function RestaurantPrefScreen({ navigation }) {
  const dispatch = useDispatch();
  const restaurant = useSelector((state) => state.restaurant.value);

  //fonctions qui récuppère les infos des boutons et le mets dans le store
  const checkPrefCuisine = (newCuisine) => {
    dispatch(getPrefRestauCuisine(newCuisine), console.log(newCuisine));
  };
  const checkPrefAtmos = (newAtmos) => {
    dispatch(getPrefRestauAtmos(newAtmos), console.log(newAtmos));
  };
  const checkPrefBook = (newBook) => {
    dispatch(getPrefRestauBook(newBook), console.log(newBook));
  };
  const checkPreMesce = (newMesce) => {
    dispatch(getPrefRestauMisce(newMesce), console.log(newMesce));
  };
  //envoyer toutes les informations du restaurant dans la base de données
  const sendInfoRestaurant = () => {
    console.log(restaurant.username);
    console.log(restaurant.bookings);

    fetch(`http://${IP_ADDRESS}:3000/restaurants/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: restaurant.username,
        email: restaurant.email,
        password: restaurant.password,
        address: {
          streetNumber: restaurant.streetNumber,
          streetType: restaurant.streetType,
          streetName: restaurant.streetName,
          postCode: restaurant.postCode,
          city: restaurant.city,
        },
        siren: restaurant.siren,
        website: restaurant.website,
        phone: restaurant.telephone,
        cuisine: restaurant.cuisine,
        atmosphere: restaurant.atmosphere,
        bookings: restaurant.bookings,
        miscellaneous: restaurant.miscellaneous,
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
          console.log(data.result, 'hello');
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.manger}>
        <Title style={styles.titre} h1>
          {' '}
          MANGER
        </Title>
      </View>

      <View style={styles.list}></View>

      <ScrollView>
        <View style={styles.manger}></View>
        <Title style={styles.titre} h5={true}>
          Votre cuisine est plutôt...
        </Title>
        <View style={styles.buttons}>
          <OurButton
            style={styles.button}
            text="Gourmet"
            onPress={() => checkPrefCuisine('Gourmet')}
          />
          <OurButton
            style={styles.button}
            text="Frachouillarde"
            onPress={() => checkPrefCuisine('Frachouillarde')}
          />
          <OurButton
            style={styles.button}
            text="Bistronomie"
            onPress={() => checkPrefCuisine('Bistronomie')}
          />
          <OurButton
            style={styles.button}
            text="Café cosy"
            onPress={() => checkPrefCuisine('Café cosy')}
          />
          <OurButton
            style={styles.button}
            text="Petite Bourse"
            onPress={() => checkPrefCuisine('Petite Bourse')}
          />
        </View>
        <Title style={styles.titre} h5={true}>
          L'atmosphère du lieu
        </Title>
        <View style={styles.buttons}>
          <OurButton
            style={styles.button}
            text="Groupe d'amis"
            onPress={() => checkPrefAtmos("Groupe d'amis")}
          />
          <OurButton
            style={styles.button}
            text="Famille"
            onPress={() => checkPrefAtmos('Famille')}
          />
          <OurButton
            style={styles.button}
            text="Tête à tête"
            onPress={() => checkPrefAtmos('Tête à tête')}
          />
        </View>
        <Title styles={styles.titre} h5={true}>
          Les réservations
        </Title>
        <View style={styles.buttons}>
          <OurButton text="Oui" onPress={() => checkPrefBook('Oui')} />
          <OurButton text="Non" onPress={() => checkPrefBook('Non')} />
        </View>
        <Title style={styles.titre} h4={true}>
          Autres
        </Title>
        <View style={styles.buttons}>
          <OurButton
            text="Accueil PMR"
            onPress={() => checkPreMesce('Accueil PMR')}
          />
          <OurButton
            text="Animaux acceptés"
            onPress={() => checkPreMesce('Animaux acceptés')}
          />
        </View>
        <Title style={styles.titre} h5={true}>
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
        <View style={styles.buttonSuivant}>
          <OurButton text="Suivant" onPress={sendInfoRestaurant} />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  manger: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
  buttonSuivant: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  button: {
    marginright: 10,
  },
});

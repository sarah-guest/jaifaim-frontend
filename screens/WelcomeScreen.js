import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Title from '../components/Title';

export default function WelcomeScreen({ navigation, route }) {
  //On récupère l'utilisateur dans le reducer
  const user = useSelector((state) => state.user.value.username);
  //On récupère le restaurant dans le reducer
  const name = useSelector((state) => state.restaurant.value.username);

  //On détermine le type d'utilisateur pour savoir quoi afficher dans l'écran
  let { type } = route.params;

  //const IP_ADDRESS = '192.168.10.136';
  const IP_ADDRESS = '192.168.1.36';

  //On initialise des variables pour le nom à afficher
  const [userFirstname, setUserFirstname] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  //On set un délai d'affichage : 3 secondes avant le passage au screen suivant
  setTimeout(() => {
    navigation.navigate('TabNavigation');
  }, 2000);

  //On fetch l'utilisateur OU le restaurant pour récupérer le firstname OU name dans la base de données
  let path = '';
  let whatUser = '';

  if (type === 'user') {
    path = 'users';
    whatUser = user;
  } else if (type === 'restaurant') {
    path = 'restaurants';
    whatUser = name;
  }

  fetch(`http://${IP_ADDRESS}:3000/${path}/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: whatUser }),
  })
    .then((response) => response.json())
    .then((data) => {
      //Si l'utilisateur existe
      if (type === 'user') {
        data.result !== null
          ? setUserFirstname(data.data.firstname)
          : setUserFirstname(userFirstname);
      } else if (type === 'restaurant') {
        data.result !== null
          ? setRestaurantName(data.data.name)
          : setRestaurantName(restaurantName);
      }
    });

  if (type === 'user') {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Title h2 isCentered={true}>
            Bienvenue
          </Title>
          <View style={styles.name}>
            <Title h1 isCentered={true}>
              {userFirstname}
            </Title>
          </View>
        </View>
      </View>
    );
  }
  if (type === 'restaurant') {
    return (
      <View style={styles.container}>
        <View>
          <Title h2 isCentered={true}>
            Bienvenue
          </Title>
          <View style={styles.name}>
            <Title h1 isCentered={true}>
              {restaurantName}
            </Title>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
  },
  // name: {
  //     display: 'block',
  //     width: '100%'
  // },
});

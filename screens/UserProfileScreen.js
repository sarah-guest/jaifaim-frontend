// IMPORTS REACT
import { useEffect, useState } from 'react';
// IMPORTS COMPOSANTS
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import OurTitle from '../components/Title';
import OurText from '../components/OurText';
import OurTag from '../components/Tag';
// IMPORTS REDUCER
import { useSelector } from 'react-redux';
// IMPORTS AUTRES
import convertColor from '../modules/convertColor';
import IP_ADDRESS from '../modules/ipAddress';

const UserProfileScreen = () => {
  const userReducer = useSelector((state) => state.user.value);
  const [user, setUser] = useState({});
  const { firstname, diets, intolerances, profilGourmand, username } = user;

  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userReducer.username }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.result) {
          setUser(json.data);
        }
      });
  }, []);

  const dietsDom =
    diets && diets.map((e, key) => <OurTag key={key} text={e} />);

  const intolerancesDom =
    intolerances && intolerances.map((e, key) => <OurTag key={key} text={e} />);

  const avatars = {
    purple: 'https://cdn-icons-png.flaticon.com/512/8583/8583723.png',
    blue: 'https://cdn-icons-png.flaticon.com/512/8583/8583722.png',
    beret: 'https://cdn-icons-png.flaticon.com/512/8583/8583721.png',
  };
  return (
    <View style={styles.container}>
      <View style={styles.informationHead}>
        <Image
          style={styles.image}
          source={{
            uri: avatars.blue,
          }}
        />
        <View style={styles.informationHeadText}>
          <OurTitle h1>{firstname || userReducer.firstname}</OurTitle>
          <OurText subtitle>@{username || userReducer.username}</OurText>
        </View>
      </View>

      <ScrollView style={styles.cards}>
        <View style={styles.card}>
          <OurTitle h3>Informations</OurTitle>
          <View style={styles.informationBody}>
            <View style={styles.section}>
              <OurTitle h5>Mon profil gourmand</OurTitle>
              <View style={styles.cloud}>
                <OurTag text={profilGourmand} />
              </View>
            </View>
            <View style={styles.section}>
              <OurTitle h5>Mes préférences</OurTitle>
              <View style={styles.cloud}>{dietsDom}</View>
            </View>
            <View>
              <OurTitle h5>Mes allergies et intolérances</OurTitle>
              <View style={styles.cloud}>{intolerancesDom}</View>
            </View>
          </View>
        </View>
        <View style={[styles.card, styles.lastCard]}>
          <OurTitle h3>Collections</OurTitle>
          <View style={styles.informationBody}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingTop: 54,
    paddingBottom: 100,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: convertColor('poudrelibre'),
    overflow: 'scroll',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: convertColor('cannelle'),
    backgroundColor: convertColor('sable'),
  },
  section: {
    marginBottom: 8,
  },
  informationHead: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  informationHeadText: {
    marginVertical: 16,
  },
  informationBody: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderRadius: 20,
    backgroundColor: convertColor('sable'),
  },
  cloud: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  cards: {
    borderColor: 'transparent',
    borderTopColor: convertColor('sable'),
    borderWidth: 1,
  },
  card: {
    marginTop: 32,
  },
  lastCard: {
    marginBottom: 16,
  },
});

export default UserProfileScreen;

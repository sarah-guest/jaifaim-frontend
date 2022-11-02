// IMPORTS COMPOSANTS
import { Image, StyleSheet, Text, View } from 'react-native';
import OurTitle from '../components/Title';
import OurText from '../components/OurText';
import OurTag from '../components/Tag';
import convertColor from '../modules/convertColor';

const UserProfileScreen = () => {
  const avatars = {
    purple: 'https://cdn-icons-png.flaticon.com/512/8583/8583723.png',
    blue: 'https://cdn-icons-png.flaticon.com/512/8583/8583722.png',
    beret: 'https://cdn-icons-png.flaticon.com/512/8583/8583721.png',
  };

  const user = {
    firstname: 'Johnny',
    username: 'johnnydellacapsaoul',
    diets: ['Vegan', 'Kasher'],
    intolerances: ['Arachide'],
    profilGourmand: ['Fin du mois'],
  };

  const { firstname, username, diets, intolerances, profilGourmand } = user;

  const intolerancesDom = intolerances.map((e, key) => (
    <OurTag key={key} text={e} />
  ));
  const dietsDom = diets.map((e, key) => <OurTag key={key} text={e} />);
  const profilGourmandDom = profilGourmand.map((e, key) => (
    <OurTag key={key} text={e} />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.informationHead}>
        <Image
          style={styles.image}
          source={{
            uri: avatars.blue,
          }}
        />
        <View style={styles.section}>
          <OurTitle h1>{firstname}</OurTitle>
          <OurText subtitle>@{username}</OurText>
        </View>
      </View>
      <View style={styles.informationBody}>
        <View style={styles.section}>
          <OurTitle h5>Mon profil gourmand</OurTitle>
          <View style={styles.cloud}>{profilGourmandDom}</View>
        </View>
        <View style={styles.section}>
          <OurTitle h5>Mes préférences</OurTitle>
          <View style={styles.cloud}>{dietsDom}</View>
        </View>
        <View style={styles.section}>
          <OurTitle h5>Mes allergies et intolérances</OurTitle>
          <View style={styles.cloud}>{intolerancesDom}</View>
        </View>
        <View style={styles.section}>
          <OurTitle h5>Mes collections</OurTitle>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 64,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: convertColor('poudrelibre'),
  },
  image: {
    height: 120,
    width: 120,
    marginBottom: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: convertColor('cannelle'),
    backgroundColor: convertColor('sable'),
  },
  section: {
    marginBottom: 16,
  },
  informationHead: {
    flex: 35,
    alignItems: 'center',
  },
  informationBody: {
    flex: 60,
    backgroundColor: convertColor('sable'),
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  cloud: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default UserProfileScreen;

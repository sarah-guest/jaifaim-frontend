// IMPORTS COMPOSANTS
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import OurText from '../components/OurText';
import OurTitle from '../components/Title';
// IMPORTS AUTRES
import convertColor from '../modules/convertColor';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const DashboardScreen = ({ navigation }) => {
  const restaurant = useSelector((state) => state.restaurant.value);

  const actions = [
    { text: 'Télécharger mon code QR', icon: 'qrcode' },
    {
      text: "Découvrir d'autres adresses",
      icon: 'map',
      destination: 'Map',
      optionalStyling: 'lastBottomCard',
    },
  ];
  const actionsDom = actions.map((e) => {
    return (
      <TouchableOpacity
        style={[
          styles.bottomCard,
          styles.card,
          e.optionalStyling && styles[e.optionalStyling],
        ]}
        onPress={
          e.destination &&
          (() => navigation.navigate(e.destination, { type: 'restaurant' }))
        }
      >
        <FontAwesomeIcon
          style={styles.icon}
          name={e.icon}
          size={24}
          color={convertColor('poudrelibre')}
        />
        <OurTitle isLight h5>
          {e.text}
        </OurTitle>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.greeting}>
        <OurTitle h2>Mon espace</OurTitle>
        {/* Stretch : mettre le name du restaurant au lieu de son username */}
        {/* Cela impliquerait de modifier signInRestaurant dans le reducer restaurant */}
        <OurTitle h4>{restaurant.username}</OurTitle>
      </View>
      <TouchableOpacity
        style={[styles.buttonSnap, styles.card]}
        onPress={() => navigation.navigate('Snap')}
      >
        <FontAwesomeIcon
          style={styles.icon}
          name="camera"
          size={40}
          color={convertColor('poudrelibre')}
        />
        <View style={styles.textContainer}>
          <OurTitle isLight h5>
            Poster mon plat du jour
          </OurTitle>
        </View>
      </TouchableOpacity>
      <View style={styles.mid}>
        <TouchableOpacity style={[styles.midleft, styles.card]}>
          <OurTitle isLight h5>
            Visites récentes
          </OurTitle>
          <FontAwesomeIcon
            style={styles.icon}
            name="users"
            size={100}
            color={convertColor('poudrelibre')}
          />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.midright, styles.card]}>
          <OurTitle isLight h5>
            Messages
          </OurTitle>
          <FontAwesomeIcon
            style={styles.icon}
            name="inbox"
            size={100}
            color={convertColor('poudrelibre')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bot}>{actionsDom}</View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingHorizontal: 32,
    paddingBottom: 100,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: convertColor('poudrelibre'),
  },
  greeting: {
    marginBottom: 16,
    paddingVertical: 16,
    borderBottomColor: convertColor('sable'),
    borderBottomWidth: 1,
  },
  buttonSnap: {
    marginBottom: 16,
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: convertColor('caféaulaitfroid'),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mid: {
    marginBottom: 16,
    flex: 45,
    flexDirection: 'row',
  },
  midleft: {
    marginRight: 16,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: convertColor('pingouin'),
  },
  midright: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: convertColor('océan'),
  },
  bot: {
    flex: 30,
    backgroundColor: convertColor('transparent'),
  },
  bottomCard: {
    marginBottom: 16,
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: convertColor('oeufpérimé'),
  },
  lastBottomCard: {
    marginBottom: 0,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    shadowColor: convertColor('caféaulaitchaud'),
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowOpacity: 1,
    elevation: 5,
  },
  icon: {
    marginRight: 16,
  },
});

// IMPORTS REACT
import { useEffect } from 'react';
// IMPORTS COMPOSANTS
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import OurTitle from '../components/Title';
import OurText from '../components/OurText';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
import { setPlatdujour } from '../reducers/restaurant';
// IMPORTS AUTRES
import convertColor from '../modules/convertColor';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IP_ADDRESS from '../modules/ipAddress';

const DashboardScreen = ({ navigation }) => {
  const restaurant = useSelector((state) => state.restaurant.value);
  const temporary = useSelector((state) => state.temporary.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = { username: restaurant.username };

    fetch(`http://${IP_ADDRESS}:3000/restaurants/restaurant`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.result) {
          const { platsdujour } = json.data;
          const lastPlat = platsdujour[platsdujour.length - 1];
          const itsDate = new Date(lastPlat.date).toDateString();
          const today = new Date().toDateString();
          itsDate === today && dispatch(setPlatdujour(lastPlat));
        }
      });
  }, [temporary.platdujourPhoto]);

  const actions = [
    { text: 'Télécharger mon code QR', icon: 'qrcode' },
    {
      text: "Découvrir d'autres adresses",
      icon: 'map',
      destination: 'Map',
      optionalStyling: 'lastBottomCard',
    },
  ];

  const ButtonSnap = () => (
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
  );

  const MealPreview = (plat) => {
    const { description, name, src } = plat.platdujour;
    return (
      <View style={[styles.card, styles.mealPreview]}>
        <OurTitle isLight h5>
          Mon plat du jour
        </OurTitle>
        <View style={styles.mealPreviewContent}>
          <View style={styles.mealInfo}>
            <OurTitle isLight h4>
              {name}
            </OurTitle>
            <OurText isLight body2>
              {description}
            </OurText>
          </View>
          <Image style={styles.image} source={{ uri: src }} />
        </View>
      </View>
    );
  };

  const actionsDom = actions.map((e, key) => {
    return (
      <TouchableOpacity
        key={key}
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
      {restaurant.platdujour ? (
        <MealPreview platdujour={restaurant.platdujour} />
      ) : (
        <ButtonSnap />
      )}
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
        <TouchableOpacity
          style={[styles.midright, styles.card]}
          onPress={() => navigation.navigate('Faq')}
        >
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
  mealPreview: {
    marginBottom: 16,
    flex: 40,
    backgroundColor: convertColor('caféaulaitfroid'),
  },
  mealPreviewContent: {
    flex: 1,
    flexDirection: 'row',
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
    backgroundColor: convertColor('sable'),
  },
  lastBottomCard: {
    marginBottom: 0,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    // shadowColor: convertColor('caféaulaitchaud'),
    // shadowOffset: {
    //   height: 5,
    //   width: 5,
    // },
    // shadowOpacity: 1,
    // elevation: 5,
  },
  icon: {
    marginRight: 16,
  },
  mealInfo: {
    marginVertical: 16,
    flex: 60,
    justifyContent: 'space-around',
    marginRight: 16,
  },
  image: {
    flex: 40,
  },
});

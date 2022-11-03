import {
  Image,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import convertColor from '../modules/convertColor';
import OurTitle from '../components/Title';
import OurText from '../components/OurText';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import {
  setShowBookmarks,
  setShowLikes,
  setShowVisited,
} from '../reducers/modals';

const Collection = (props) => {
  const { title, restaurants } = props;
  const dispatch = useDispatch();

  const Restaurant = (props) => {
    const { restaurant } = props;
    const { address, name, platsdujour } = restaurant;
    const lastPlat = platsdujour && platsdujour[platsdujour.length - 1];

    return (
      <TouchableOpacity style={styles.card}>
        <OurTitle h6 isLight>
          {name}
        </OurTitle>
        <OurText isLight body2>
          {address.postCode} {address.city}
        </OurText>
        <Image style={styles.image} source={{ uri: lastPlat.src }} />
      </TouchableOpacity>
    );
  };

  const restaurantsDom = restaurants.map((restaurant, key) => (
    <Restaurant key={key} restaurant={restaurant} />
  ));

  const handleArrowPress = () => {
    switch (title) {
      case 'Favoris':
        dispatch(setShowLikes(false));
        return;
      case 'Sauvegardés':
        dispatch(setShowBookmarks(false));
        return;
      case 'Visités':
        dispatch(setShowVisited(false));
        return;
      default:
        console.log(
          'Problème dans le composant "collection", props "title" non reconnue dans le switch'
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesomeIcon
          style={styles.icon}
          name="arrow-left"
          size={30}
          onPress={() => handleArrowPress()}
        />
        <OurTitle h1>{title}</OurTitle>
      </View>
      <ScrollView contentContainerStyle={styles.cards}>
        {restaurantsDom}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    paddingHorizontal: 32,
    paddingTop: 64,
    paddingBottom: 100,
    position: 'absolute',
    backgroundColor: convertColor('poudrelibre'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  cards: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: convertColor('sable'),
    overflow: 'scroll',
  },
  card: {
    height: 200,
    width: 140,
    marginBottom: 16,
    padding: 8,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: convertColor('cannelle'),
  },
  image: {
    marginTop: 8,
    flex: 1,
    borderRadius: 20,
  },
});

export default Collection;

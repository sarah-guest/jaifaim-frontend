// IMPORTS REACT
import { useEffect, useState } from 'react';
// IMPORTS COMPOSANTS
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import OurTitle from '../components/Title';
import OurText from '../components/OurText';
import OurTag from '../components/Tag';
import Collection from '../components/Collection';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
import {
  setShowBookmarks,
  setShowLikes,
  setShowVisited,
} from '../reducers/modals';
// IMPORTS AUTRES
import convertColor from '../modules/convertColor';
import IP_ADDRESS from '../modules/ipAddress';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const UserProfileScreen = () => {
  const userReducer = useSelector((state) => state.user.value);
  const modals = useSelector((state) => state.modals.value);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const {
    collections,
    firstname,
    diets,
    intolerances,
    profilGourmand,
    username,
  } = user;

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

  const CollectionCard = (props) => {
    const { hasCustomMarginRight, icon, onPress, title } = props;
    const customMarginRight = hasCustomMarginRight && { marginRight: 16 };

    return (
      <TouchableOpacity
        style={[styles.collectionCard, customMarginRight]}
        onPress={() => onPress()}
      >
        <OurTitle h6 isLight>
          {title}
        </OurTitle>
        <FontAwesomeIcon
          name={icon}
          size={50}
          color={convertColor('poudrelibre')}
        />
      </TouchableOpacity>
    );
  };

  const avatars = {
    purple: 'https://cdn-icons-png.flaticon.com/512/8583/8583723.png',
    blue: 'https://cdn-icons-png.flaticon.com/512/5286/5286352.png',
    beret: 'https://cdn-icons-png.flaticon.com/512/8583/8583721.png',
  };

  return (
    <>
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
        <ScrollView style={styles.cards} showsVerticalScrollIndicator={false}>
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
            <View style={[styles.informationBody, styles.collections]}>
              <View style={styles.topCollection}>
                <CollectionCard
                  title="Favoris"
                  icon="heart"
                  onPress={() => dispatch(setShowLikes(true))}
                />
              </View>
              <View style={styles.bottomCollections}>
                <CollectionCard
                  title="Sauvegardés"
                  icon="bookmark"
                  hasCustomMarginRight
                  onPress={() => dispatch(setShowBookmarks(true))}
                />
                <CollectionCard
                  title="Visités"
                  icon="building"
                  onPress={() => dispatch(setShowVisited(true))}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {user.collections && modals.showBookmarks && (
        <Collection
          title={user.collections.bookmarks.name}
          restaurants={user.collections.bookmarks.restaurants}
        />
      )}
      {user.collections && modals.showLikes && (
        <Collection
          title={user.collections.likes.name}
          restaurants={user.collections.likes.restaurants}
        />
      )}
      {user.collections && modals.showVisited && (
        <Collection
          title={user.collections.visited.name}
          restaurants={user.collections.visited.restaurants}
        />
      )}
    </>
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
    overflow: 'scroll',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: 'black',
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
  collections: {
    flex: 1,
  },
  collectionCard: {
    height: 150,
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: convertColor('cannelle'),
  },
  topCollection: {
    marginBottom: 16,
  },
  bottomCollections: {
    flexDirection: 'row',
  },
});

export default UserProfileScreen;

// IMPORTS COMPOSANTS
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OurTitle from './Title';
import OurText from './OurText';
import convertColor from '../modules/convertColor';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
// IMPORTS AUTRES
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IP_ADDRESS from '../modules/ipAddress';
import { useEffect, useState } from 'react';

const MealCard = (props) => {
  const { restaurant } = props;
  const { address, dernierPlat, name, username } = restaurant;
  const { streetNumber, streetName, streetType, postCode, city } = address;
  const { description, src } = dernierPlat;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    // lorsque map est initialisée, obtiens les likes dans la db et mets les dans le reducer likesReducer
    // lorsque mealcard est initialisé, si likesReducer.includes restaurant, setisliked(true);
  }, []);

  const toggleLike = () => {
    const data = {
      userToken: user.token,
      restaurantToken: restaurant.token,
    };

    if (!isLiked) {
      // Change l'état et lance un re-render pour appliquer le style conditionnel
      setIsLiked(true);
      // Fetch la route qui ajoute le restaurant à user.collections.likes.restaurants
      fetch(`http://${IP_ADDRESS}:3000/users/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => console.log(json.log));
    } else {
      // Change l'état et lance un re-render pour appliquer le style conditionnel
      setIsLiked(false);
      // Fetch la route qui ajoute le restaurant à user.collections.likes.restaurants
      fetch(`http://${IP_ADDRESS}:3000/users/dislike`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((json) => console.log(json.log));
    }
  };

  return (
    <View style={styles.mealCard}>
      <View style={styles.top}>
        <View>
          <OurTitle h3={true}>{dernierPlat.name}</OurTitle>
          <OurTitle h5={true}>{name}</OurTitle>
        </View>
        <View style={styles.icons}>
          <FontAwesomeIcon
            style={styles.icon}
            name={isLiked ? 'heart' : 'heart-o'}
            size={25}
            color={convertColor('cannelle')}
            onPress={() => toggleLike()}
          />
          <FontAwesomeIcon
            style={styles.icon}
            name="bookmark-o"
            size={25}
            color={convertColor('cannelle')}
          />
        </View>
      </View>
      <OurText>{`${streetNumber} ${streetType} ${streetName}, ${postCode} ${city}`}</OurText>
      <OurText>{description}</OurText>
      <View style={styles.mealPictureContainer}>
        <Image
          style={styles.image}
          source={{
            uri: src,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    height: 388,
    padding: 16,
    position: 'absolute',
    bottom: 0,
    backgroundColor: convertColor('poudrelibre'),
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderColor: convertColor('sable'),
    borderWidth: 2,
    shadowColor: convertColor('marronfoncé'),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 10,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 16,
  },
  mealPictureContainer: {
    height: 150,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default MealCard;

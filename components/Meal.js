// IMPORTS REACT
import { useEffect, useState } from 'react';
// IMPORTS COMPOSANTS
import { View, Image, StyleSheet } from 'react-native';
import OurText from '../components/OurText';
import Title from '../components/Title';
// IMPORTS REDUCER
import { useDispatch, useSelector } from 'react-redux';
// import { likeMeal, unLikeMeal } from '../reducers/likedMeals';
// IMPORTS AUTRES
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';
import IP_ADDRESS from '../modules/ipAddress';

export default function Meal(props) {
  const { isScaledDown, restaurantToken } = props;
  const scale = isScaledDown && { width: 240 };
  const user = useSelector((state) => state.user.value);
  const [isLiked, setIsLiked] = useState(null);

  // Lors de l'initialisation du composant, récupère les favoris et les bookmarks du user
  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/${user.token}/likes`)
      .then((response) => response.json())
      .then((json) => {
        const liked = json.data.collections.likes.restaurants;
        const names = liked.map((liked) => liked.name);
        const name = props.restaurant;
        names.includes(name) && setIsLiked(true);
      });
  }, []);

  const toggleLike = () => {
    const data = {
      userToken: user.token,
      restaurantToken: restaurantToken,
    };

    if (!isLiked) {
      setIsLiked(true);

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
      setIsLiked(false);

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
    <View style={[styles.background, scale]} isScaledDown>
      <Image source={{ uri: props.src }} style={styles.images} />
      <View style={styles.names}>
        <View style={styles.mealName} onPress={() => handlePageChangeOnClick()}>
          <Title h5 isLight={true}>
            {props.meal}
          </Title>
          <OurText body2 isLight={true}>
            Par {props.restaurant}
          </OurText>
        </View>
        <View style={styles.like}>
          <FontAwesomeIcon
            style={styles.heart}
            name={isLiked ? 'heart' : 'heart-o'}
            onPress={() => toggleLike()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: 300,
    marginRight: 30,
    padding: 10,
    backgroundColor: '#rgba(60, 35 ,18, .75)',
    // borderTopLeftRadius: 30,
    // borderBottomRightRadius: 30,
    borderRadius: 20,
  },
  images: {
    width: '100%',
    height: 120,
    // borderTopLeftRadius: 30,
    // borderBottomRightRadius: 30,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 10,
  },
  names: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealName: {
    flex: 1,
  },
  like: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    padding: 8,
    backgroundColor: convertColor('sucreroux'),
    borderRadius: 100,
  },
  heart: {
    fontSize: 18,
    color: 'white',
  },
});

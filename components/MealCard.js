// IMPORTS COMPOSANTS
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OurTitle from './Title';
import OurText from './OurText';
import convertColor from '../modules/convertColor';
// IMPORTS AUTRES
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MealCard = (props) => {
  const { restaurant } = props;
  const { address, name, pdjDescription, pdjName, pdjSrc } = restaurant;

  return (
    <View style={styles.mealCard}>
      <View style={styles.icons}>
        <FontAwesome
          style={styles.icon}
          name="heart"
          size={25}
          color={convertColor('cannelle')}
        />
        <FontAwesome
          style={styles.icon}
          name="bookmark"
          size={25}
          color={convertColor('cannelle')}
        />
      </View>
      <OurTitle h3={true}>{pdjName}</OurTitle>
      <OurTitle h5={true}>{name} (500m)</OurTitle>
      <OurText>{address}</OurText>
      <OurText>{pdjDescription}</OurText>
      <View style={styles.mealPictureContainer}>
        <Image
          style={styles.image}
          source={{
            uri: pdjSrc,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 300,
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
    justifyContent: 'flex-end',
  },
  icon: {
    marginLeft: 16,
  },
  mealPictureContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
});

export default MealCard;

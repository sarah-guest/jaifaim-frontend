// IMPORTS HABITUELS
import { Image, StyleSheet, View } from 'react-native';
import OurTextInput from '../components/TextInput';
import Title from '../components/Title';
// IMPORTS REDUCER
import { useSelector } from 'react-redux';
import OurButton from '../components/Button';
import OurTag from '../components/Tag';
import { useState } from 'react';

export default function PdjFormScreen({ navigation }) {
  const [selectedDiets, setSelectedDiets] = useState([]);
  const [name, setName] = useState(null);
  const temporary = useSelector((state) => state.temporary.value);

  // Fonction passée en props "onPress" à chaque <OurTag />
  // Lorsque je presse un tag:
  // --- si son diet n'existe pas dans selectedDiets, push-le dedans
  // --- inversement (son diet existe dans selectedDiets), supprime-le
  const toggleDietSelection = (diet) => {
    !selectedDiets.includes(diet)
      ? setSelectedDiets([...selectedDiets, diet])
      : setSelectedDiets(selectedDiets.filter((e) => e !== diet));
  };

  // todo: fetch GET diets
  const diets = ['Végétarien', 'Vegan', 'Casher'];

  const dietsDom = [];
  diets.map((diet, key) => {
    dietsDom.push(
      <OurTag
        key={key}
        text={diet}
        onPress={() => {
          toggleDietSelection(diet);
        }}
        isPressed={selectedDiets.includes(diet)}
      />
    );
  });

  const sendPlatdujourToBackend = () => {
    // todo: fetch POST addplatdujour
    console.log('Plat envoyé dans le back a+');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={temporary.platdujourPhoto} />
      <View style={styles.gauche}>
        <Title h3={true}>Nom du plat</Title>
        <OurTextInput
          placeholder="Alokos"
          onChangeText={(value) => setName(value)}
        />
        <Title h4={true}>Régimes compatibles</Title>
        <View style={styles.tagCloud}>{dietsDom}</View>
      </View>
      <View style={styles.buttonValidate}>
        <OurButton
          icon="check"
          onPress={sendPlatdujourToBackend}
          color="cannelle"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 350,
    marginVertical: 16,
  },
  tagCloud: {
    width: 350,
    flexDirection: 'row',
  },
  buttonValidate: {
    position: 'absolute',
    bottom: 8,
    right: 16,
  },
});

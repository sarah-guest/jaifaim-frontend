// IMPORTS REACT
import { useEffect, useState } from 'react';
// IMPORTS COMPOSANTS
import { Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import OurButton from '../components/Button';
import OurTag from '../components/Tag';
import OurTextInput from '../components/TextInput';
import Title from '../components/Title';
// IMPORTS REDUCER
import IP_ADDRESS from '../modules/ipAddress';
import { useDispatch, useSelector } from 'react-redux';
import { clearPlatdujourPhoto } from '../reducers/temporary';
export default function PdjFormScreen({ navigation }) {
  const [diets, setDiets] = useState([]); // tous les diets possibles
  const [name, setName] = useState(null); // nom pdj
  const [selectedDiets, setSelectedDiets] = useState([]); // diets pdj
  const [description, setDescription] = useState(null); // description pdj
  const temporary = useSelector((state) => state.temporary.value); // photo pdj dans .platdujourPhoto
  const restaurant = useSelector((state) => state.restaurant.value); // token restaurant dans .token
  const dispatch = useDispatch();

  // Lorsque le composant est initialisé, récupère les régimes dans le backend
  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/diets`)
      .then((response) => response.json())
      .then((json) => {
        setDiets(json.diets); // Stocke-les dans l'état "diets"
      });
  }, []);

  // Fonction passée en props "onPress" à chaque <OurTag />
  // Lorsque je presse un <OurTag /> :
  // --- si son diet n'existe pas dans selectedDiets, push-le dedans
  // --- inversement (son diet existe dans selectedDiets), supprime-le
  const toggleDietSelection = (diet) => {
    !selectedDiets.includes(diet)
      ? setSelectedDiets([...selectedDiets, diet])
      : setSelectedDiets(selectedDiets.filter((e) => e !== diet));
  };

  // Pour chaque régime dans diets, retourne un <OurTag /> et stocke-le dans dietsDom
  const dietsDom = diets.map((diet, key) => (
    <OurTag
      key={key}
      text={diet.name}
      onPress={() => {
        toggleDietSelection(diet.name);
      }}
      isPressed={selectedDiets.includes(diet.name)}
    />
  ));

  const sendPlatdujourToBackend = () => {
    const formData = new FormData();

    formData.append('photoFromFront', {
      uri: temporary.platdujourPhoto.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    fetch(`http://${IP_ADDRESS}:3000/restaurants/platdujour/photo/create`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.log);
        if (json.result) {
          const data = {
            description,
            diets: selectedDiets,
            name,
            src: json.url,
            token: restaurant.token, // Todo : vérifier !
          };

          fetch(`http://${IP_ADDRESS}:3000/restaurants/platdujour/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json.log);
              navigation.navigate('Profile', { type: 'restaurant' });
              dispatch(clearPlatdujourPhoto());
            });
        }
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <Image style={styles.image} source={temporary.platdujourPhoto} />
      <View style={styles.gauche}>
        <View style={styles.categorie}>
          <Title h3={true}>Nom du plat</Title>
          <OurTextInput
            placeholder="Alokos"
            onChangeText={(value) => setName(value)}
          />
        </View>
        <View style={styles.categorie}>
          <Title h4={true}>Régimes compatibles</Title>
          <View style={styles.tagCloud}>{dietsDom}</View>
        </View>
        <View style={styles.categorie}>
          <Title h4={true}>Description</Title>
          <OurTextInput
            multiline={true}
            numberOfLines={4}
            placeholder="Brève description du plat"
            onChangeText={(value) => setDescription(value)}
          ></OurTextInput>
        </View>
      </View>
      <View style={styles.buttonValidate}>
        <OurButton
          icon="check"
          onPress={sendPlatdujourToBackend}
          color="cannelle"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 250,
    width: 350,
    marginVertical: 16,
    borderRadius: 30,
  },
  tagCloud: {
    width: 350,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonValidate: {
    position: 'absolute',
    bottom: 8,
    right: 16,
  },
  categorie: {
    marginBottom: 30,
  }
});

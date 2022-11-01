// IMPORTS REACT
import { useState } from 'react';
// IMPORTS COMPOSANTS
import { StyleSheet, View } from 'react-native';
import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';
import OurText from '../components/OurText';
// IMPORTS REDUCER
import { useDispatch } from 'react-redux';
import { getInfoAdress } from '../reducers/restaurant';

export default function InfoRestaurant({ navigation, route }) {
  // On set les états des inputs
  const [siren, setSiren] = useState('');
  const [website, setWebsite] = useState('');
  const [phone, setPhone] = useState('');
  // const [emailPublic, SetEmailPublic] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [streetType, setStreetType] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postCode, setPostCOde] = useState('');
  const [city, SetCity] = useState('');
  const dispatch = useDispatch();

  const handleSuivantPress = () => {
    dispatch(
      getInfoAdress({
        siren,
        website,
        phone,
        // emailPublic: emailPublic,
        streetNumber,
        streetType,
        streetName,
        postCode,
        city,
      })
    );
    navigation.navigate('Preferences');
  };

  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <OurText body2>Numéro SIREN</OurText>
        <OurTextInput
          placeholder="823 860 234"
          onChangeText={(value) => setSiren(value)}
          value={siren}
        />
      </View>
      <View style={styles.listItem}>
        <OurText body2>Téléphone</OurText>
        <OurTextInput
          placeholder="06 44 64 03 66"
          onChangeText={(value) => setPhone(value)}
          value={phone}
        />
      </View>
      <View style={styles.listItem}>
        <OurText body2>Site web</OurText>
        <OurTextInput
          placeholder="https://www.lacapsule.academy/"
          onChangeText={(value) => setWebsite(value)}
          value={website}
        />
      </View>
      <View style={styles.addressSection}>
        <View style={styles.listItem} width={'25%'}>
          <OurText body2>Numéro</OurText>
          <OurTextInput
            placeholder="17"
            onChangeText={(value) => setStreetNumber(value)}
            value={streetNumber}
          />
        </View>
        <View style={styles.listItem} width={'70%'}>
          <OurText body2>Type de voie</OurText>
          <OurTextInput
            placeholder="Boulevard"
            onChangeText={(value) => setStreetType(value)}
            value={streetType}
          />
        </View>
      </View>
      <View style={styles.listItem} width={'100%'}>
        <OurText body2>Nom de voie</OurText>
        <OurTextInput
          placeholder="Pereire"
          onChangeText={(value) => setStreetName(value)}
          value={streetName}
        />
      </View>
      <View style={styles.addressSection}>
        <View style={styles.listItem} width={'25%'}>
          <OurText body2>Code postal</OurText>
          <OurTextInput
            placeholder="75017"
            onChangeText={(value) => setPostCOde(value)}
            value={postCode}
          />
        </View>
        <View style={styles.listItem} width={'70%'}>
          <OurText body2>Ville</OurText>
          <OurTextInput
            placeholder="Paris"
            onChangeText={(value) => SetCity(value)}
            value={city}
          />
        </View>
      </View>
      <OurButton
        text="Valider"
        color="caféaulaitchaud"
        onPress={handleSuivantPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listItem: {
    width: '100%',
    marginBottom: 16,
    marginRight: 16,
  },
  addressSection: {
    flexDirection: 'row',
  },
});

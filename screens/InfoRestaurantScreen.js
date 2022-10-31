//Imports habituels
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//Import de nos composants
import OurText from '../components/OurText';
import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';
//Import de la fonction du reducer
import { getInfoAdress } from '../reducers/restaurant';
export default function InfoRestaurant({ navigation, route }) {
    //On set les états des inputs

    const [siren, setSiren] = useState('');
    const [website, setWebsite] = useState('');
    const [telephone, setTelephone] = useState('');
  //  const [emailPublic, SetEmailPublic] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetType, setStreetType] = useState('');
    const [streetName, setStreetName] = useState('');
    const [postCode, setPostCOde] = useState('');
    const [city, SetCity] = useState('');
    const dispatch = useDispatch();
    const handleValider = () => {
        dispatch(getInfoAdress({
            siren: siren,
            website: website,
            telephone: telephone,
 //           emailPublic: emailPublic,
            streetNumber: streetNumber,
            streetType: streetType, 
            streetName: streetName,
            postCode: postCode,
            city: city
        }));
        navigation.navigate('RestaurantPref');
    };
    return (
        <View style={styles.container}>
            <OurTextInput
                placeholder="N° Siren"
                onChangeText={(value) => setSiren(value)}
                value={siren}
            />
            <OurTextInput
                placeholder="Numéro de Téléphone"
                onChangeText={(value) => setTelephone(value)}
                value={telephone}
            />
            <OurTextInput
                placeholder="Site Web"
                onChangeText={(value) => setWebsite(value)}
                value={website}
            />
            <OurTextInput
                placeholder="Numéro de voie"
                onChangeText={(value) => setStreetNumber(value)}
                value={streetNumber}
            />
            <OurTextInput
                placeholder="Type de voie"
                onChangeText={(value) => setStreetType(value)}
                value={streetType}
            />
            <OurTextInput
                placeholder="Nom de voie"
                onChangeText={(value) => setStreetName(value)}
                value={streetName}
            />
            <OurTextInput
                placeholder="Code postal"
                onChangeText={(value) => setPostCOde(value)}
                value={postCode}
            />
            <OurTextInput
                placeholder="Ville"
                onChangeText={(value) => SetCity(value)}
                value={city}
            />

            <OurButton
                text="Valider"
                color="caféaulaitchaud"
                onPress={handleValider} />


        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
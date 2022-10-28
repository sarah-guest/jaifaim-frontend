import { StyleSheet, Text } from 'react-native';
import OurButton from '../components/Button';
import { useState } from 'react';
export default function InfoRestaurant({ navigation, route }) {
    const [siren, setSiren] = useState('');
    
    const [webSite, setWebSite] = useState('');
    const [Telephone, setTelephone] = useState('');
    const [emailPublic, SetEmailPublic] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [streetType, setStreetType] = useState('');
    const [streetName, setStreetName] = useState('');
    const [postCode, setPostCOde] = useState('');
    const [city, SetCity] = useState('');



    return (
        <View style={styles.container}>
            <Text>Information du restaurant</Text>
            <OurTextInput
                placeholder="Siren"
                onChangeText={(value) => setSiren(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />
            <OurTextInput
                placeholder="Prénom"
                onChangeText={(value) => setFirstname(value)}
                value={firstname}
            />

            <OurButton
                text="Valider"
                color="caféaulaitchaud"
                onPress={myNameIs} />


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
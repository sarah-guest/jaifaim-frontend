import { Text, StyleSheet, View } from 'react-native';
import Title from '../components/Title'
import OurButton from '../components/Button';
import OurTextInput from '../components/TextInput';
import { useState } from 'react';

export default function   UserPrefScreen({navigation}){
    const [allergie, setAllergie]= useState('')
    return(
        <View>
            <Title style={styles.titre}
                    h1={true}>Mes préférences</Title>
                    <View style={styles.buttons}>
                    <OurButton style={styles.button} text='Végétarien' onPress={() => addInfo('Végétarien')} />
                    <OurButton style={styles.button} text='Végan' onPress={() => addInfo('Végan')} />
                    <OurButton style={styles.button} text='Homnivore' onPress={() => addInfo('Homnivore')} />
                    <OurButton style={styles.button} text='Grossesse' onPress={() => addInfo('Grossesse')} />
                    <OurButton style={styles.button} text='Sans gluten' onPress={() => addInfo('ans gluten')} />
                    <OurButton style={styles.button} text='Crudivore' onPress={() => addInfo('Crudivore')} />
                    <OurButton style={styles.button} text='Paléo' onPress={() => addInfo('Paléo')} />
                    <OurButton style={styles.button} text='Bec Sucré' onPress={() => addInfo('Bec Sucré')} />
                    <OurButton style={styles.button} text='Faible en glycémie' onPress={() => addInfo('Faible en glycémie')} />
                    <OurButton style={styles.button} text='Hallal' onPress={() => addInfo('Hallal')} />
                    <OurButton style={styles.button} text='Casher' onPress={() => addInfo('Casher')} />
                </View>
                <OurTextInput
          placeholder="Arachide, gluten..."
          onChangeText={(value) => setAllergie(value)}
          value={allergie}
        />
                <View style={styles.valider}>
                <OurButton style={styles.button} text='Valider' onPress={() => addInfo('Casher')} />
                </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    button: {
        marginrught: 10,
    }
    })
import { Text, View, StyleSheet } from 'react-native';
//nos imports
import convertColor from '../modules/convertColor';
import OurButton from '../components/Button';
import Title from '../components/Title';

export default function UserParametersScreen() {
    return (
        <View style={styles.container}>
            <Title h2 isCentered={true}>Paramètres</Title>
            <View>
                <OurButton color='caféaulaitfroid' text='Profil' onPress={() => handleOnPress()} />
                <OurButton color='caféaulaitfroid' text='Confidentialité' onPress={() => handleOnPress()} />
                <OurButton color='caféaulaitfroid' text='Géolocalisation' onPress={() => handleOnPress()} />
                <OurButton color='caféaulaitfroid' text='Autres' onPress={() => handleOnPress()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        margin: 35,
    },
});

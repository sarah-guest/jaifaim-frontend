import { Text, View, StyleSheet } from 'react-native';
//nos imports
import convertColor from '../modules/convertColor';
import OurButton from '../components/Button';
import Title from '../components/Title';

export default function UserParametersScreen() {
    return (
        <View style={styles.container}>
            <Title h1 isCentered={true}>Paramètres</Title>
            <View style={{ marginTop: 20 }}>
                <OurButton color='caféaulaitfroid' text='Informations personnelles' onPress={() => handleOnPress()} />
                <OurButton color='caféaulaitfroid' text='Confidentialité' onPress={() => handleOnPress()} />
                <OurButton color='caféaulaitfroid' text='Sécurité' onPress={() => handleOnPress()} />
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

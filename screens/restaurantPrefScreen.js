import { Text, View, StyleSheet, ScrollView } from 'react-native';
import OurButton from '../components/Button';
import Title from '../components/Title';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import convertColor from '../modules/convertColor';
export default function RestaurantPrefScreen({ navigation }) {
    //const handle

    return (
        <View style={styles.container}>
            <View style={styles.manger}>
                <Title style={styles.titre} h1> MANGER</Title>
            </View>

            <View style={styles.list}></View>

            <ScrollView>
                <View style={styles.manger}></View>
                <Title style={styles.titre}
                    h5={true}>Votre cuisine est plutôt...</Title>
                <View style={styles.buttons}>
                    <OurButton style={styles.button} text='Gourmet' onPress={() => addInfo('Familial')} />
                    <OurButton style={styles.button} text='Frachouillarde' onPress={() => addInfo('Familial')} />
                    <OurButton style={styles.button} text='Bistronomie' onPress={() => addInfo('Familial')} />
                    <OurButton style={styles.button} text='Café cosy' onPress={() => addInfo('Familial')} />
                    <OurButton style={styles.button} text='Petite Bourse' onPress={() => addInfo('Familial')} />
                </View>
                <Title style={styles.titre}
                    h5={true}>L'atmosphère du lieu</Title>
                <View style={styles.buttons}>
                    <OurButton style={styles.button} text="Groupe d'amis" onPress={() => addInfo("Groupe d'amis")} />
                    <OurButton style={styles.button} text='Famille' onPress={() => addInfo('Familial')} />
                    <OurButton style={styles.button} text='Tête à tête' onPress={() => addInfo('Familial')} />
                </View>
                <Title styles={styles.titre}
                    h5={true}>Les réservations</Title>
                <View style={styles.buttons}>
                    <OurButton text='Oui' onPress={() => addInfo('Familial')} />
                    <OurButton text='Non' onPress={() => addInfo('Familial')} />
                </View>
                <Title style={styles.titre}
                    h4={true}>Autres</Title>
                <View style={styles.buttons}>
                    <OurButton text='Accueil PMR' onPress={() => addInfo('Familial')} />
                    <OurButton text='Animaux acceptés' onPress={() => addInfo('Familial')} />
                </View>
                <Title style={styles.titre}
                    h5={true}>Réseaux Sociaux</Title>
                <View style={styles.logo}>
                    <FontAwesomeIcon name={'twitter'} size={32} color={convertColor('caféaulaitchaud')}/>
                    <FontAwesomeIcon name={'facebook'} size={32} color={convertColor('caféaulaitchaud')}/>
                    <FontAwesomeIcon name={'instagram'} size={32} color={convertColor('caféaulaitchaud')}/>
                </View>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
        justifyContent: 'center',
        alignItems: 'flex-start',
        
    },
    manger: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50

    },
    list: {
        marginTop: 40,
    },
    titre: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',

    },
    logo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 160,
        color:convertColor('caféaulaitchaud'),
       },
       
    buttons: {
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    button: {
        marginrught: 10,
    }
});

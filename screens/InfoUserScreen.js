import { View, Text, Button, StyleSheet } from 'react-native';
//imports redux
import { useDispatch, useSelector } from 'react-redux';
import { setProfilGourmand } from '../reducers/user';
//import de nos composants
import Title from '../components/Title';
import OurButton from '../components/Button';


export default function InfoScreen({ navigation, route }) {
    const dispatch = useDispatch();
    
   // type='user'
    const user = useSelector(state => state.user.value);
//fonction qui récuppère les infos des boutons et le mets dans le reducer
    const addInfo = (profilGourmand) => {
        dispatch(setProfilGourmand(profilGourmand));
        navigation.navigate('UserPref');
        console.log(user);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titre}>
        <Title h2> Quel type d'endroit cherches-tu?</Title>
            </View>
        <View style={styles.buttons}>
            <OurButton text='Restaurant Familial' onPress={() => addInfo('Familial')} />
            <OurButton text='Café Cozy' onPress={() => addInfo('Café Cozy')} />
            <OurButton text='Fin Gourmet' onPress={() => addInfo('Fin Gourmet')} />
            <OurButton text='Fin du mois' onPress={() => addInfo('Fin du mois')} />
            <OurButton text='Bistronomie' onPress={() => addInfo('Familial')} />
            <OurButton text='Surprenez moi !' onPress={() => addInfo('Surprenez moi')} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titre:{
        marginTop:'30%',
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:'10%'
    },
    buttons:{
        marginTop:'10%',
        flex:1,
        
     
    },
});
     //  <Title name={styles.titre} 
     //h5={true}>Je suis plutôt</Title>   
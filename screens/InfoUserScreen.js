import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProfilGourmand } from '../reducers/user';
import OurButton from '../components/Button';
//import Title from '../components/Title';

export default function InfoScreen({ navigation, route }) {
    const dispatch = useDispatch();
    
    type='user'
    const user = useSelector(state => state.user.value);
//fonction qui récuppère les infos des boutons et le mets dans le reducer
    const addInfo = (profilGourmand) => {
        dispatch(setProfilGourmand(profilGourmand));
        navigation.navigate('UserPref');
        console.log(user);
    };

    return (
        <View style={styles.container}>
            <OurButton text='Restaurant Familial' onPress={() => addInfo('Familial')} />
            <OurButton text='Café Cozy' onPress={() => addInfo('Café Cozy')} />
            <OurButton text='Fin Gourmet' onPress={() => addInfo('Fin Gourmet')} />
            <OurButton text='Fin du mois' onPress={() => addInfo('Fin du mois')} />
            <OurButton text='Bistronomie' onPress={() => addInfo('Familial')} />
            <OurButton text='Surprenez moi !' onPress={() => addInfo('Surprenez moi')} />
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
     //  <Title name={styles.titre} 
     //h5={true}>Je suis plutôt</Title>   
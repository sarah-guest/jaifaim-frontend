import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addUserInfo } from '../reducers/user';
import OurButton from '../components/Button';
import Title from '../components/Title';

export default function InfoScreen({ navigation, route }) {


    const dispatch = useDispatch();

    const addInfo = (newInfo) => {
        dispatch(addUserInfo(newInfo));
    };

    return (
        <View style={styles.container}>
             <Title name={styles.titre} 
      h5={true}>Je suis plutôt</Title>   
            <OurButton text='Familial' onPress={() => addInfo('Familial')} />
            <OurButton text='Café Cozy' onPress={() => addInfo('Café Cozy')} />
            <OurButton text='Fin Gourmet' onPress={() => addInfo('Fin Gourmet')} />
            <OurButton text='Fin du mois' onPress={() => addInfo('Fin du mois')} />
            <OurButton text='Surprenez moi' onPress={() => addInfo('Surprenez moi')} />
           
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
import { useEffect, useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function WelcomeScreen({ navigation }) {
    //On récupère l'utilisateur dans le reducer
    const username = useSelector((state) => state.user.value.username)
    //On initialise une variable firstname
    const [firstname, setFirstname] = useState('');

    //On fetch l'utilisateur pour récupérer son firstname dans la base de données
    fetch('http://192.168.10.130:3000/users/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    }).then(response => response.json())
        .then(data => {
            //Si l'utilisateur existe
            if (data.result) {
                setFirstname(data.data.firstname)
            } else {
                setFirstname(username)
            }
        });

    console.log(firstname)

    return (
        <View style={styles.container}>
            <Text>Bienvenue {firstname}</Text>
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

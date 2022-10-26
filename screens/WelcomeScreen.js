import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function WelcomeScreen({ navigation, route }) {
    //On récupère l'utilisateur dans le reducer
    const user = useSelector((state) => state.user.value.username)
    //On récupère le restaurant dans le reducer
    const name = useSelector((state) => state.restaurant.value.username)

    //On détermine le type d'utilisateur pour savoir quoi afficher dans l'écran
    let { type } = route.params;

    //On initialise des variables pour le nom à afficher
    const [userFirstname, setUserFirstname] = useState('');
    const [restaurantName, setRestaurantName] = useState('');

    //On fetch l'utilisateur OU le restaurant pour récupérer le firstname OU name dans la base de données
    let path = ''
    let whatUser = ''

    if (type === 'user') {
        path = 'users';
        whatUser = user;
    }

    else if (type === 'restaurant') {
        path = 'restaurants';
        whatUser = name;
    }

    fetch(`http://192.168.0.20:3000/${path}/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: whatUser }),
    }).then(response => response.json())
        .then(data => {
            //Si l'utilisateur existe
            if (type === 'user') {
                console.log(data)
                data.result ? setUserFirstname(data.data.firstname) : setUserFirstname(userFirstname)
            } else if (type === 'restaurant') {
                data.result ? setRestaurantName(data.data.name) : setRestaurantName(restaurantName)
            }
        });

    if (type === 'user') {
        return (
            <View style={styles.container}>
                <Text>Bienvenue {userFirstname}</Text>
            </View>
        );
    }
    if (type === 'restaurant') {
        return (
            <View style={styles.container}>
                <Text>Bienvenue {restaurantName}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

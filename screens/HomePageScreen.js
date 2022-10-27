import { useState, useEffect } from 'react';
import {
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet
} from 'react-native';
import Meal from '../components/Meal';


export default function HomePageScreen({ navigation }) {
    //const IP_ADDRESS = '192.168.10.130';
    const IP_ADDRESS = '192.168.1.36';

    const [mealsData, setMealsData] = useState([]);

    //on récupère les plats du jour
    useEffect(() => {
        fetch(`http://${IP_ADDRESS}:3000/users/getplatsdujour`)
            .then(res => res.json())
            .then(data => {
                //on vérifie s'il y a des données
                if (data !== null) {
                    data = data.restaurants;
                    for (const restaurant of data) {
                        for (const dailyMeal of restaurant.platsdujour) {
                            //on crée des objets comprenant les éléments requis
                            let pdj = {
                                restaurant: restaurant.name,
                                meal: dailyMeal.name,
                                src: dailyMeal.src,
                                date: dailyMeal.date,
                            }
                            //on les push dans le tableau s'ils n'y sont pas encore
                            if (!mealsData.includes(pdj)) {
                                mealsData.push(pdj)
                            }
                        }
                    }
                }
            })
    }, []);

    const meals = mealsData.map((data, i) => {
        return (
            <Meal key={i} src={data.src} meal={data.meal} restaurant={data.restaurant} />
        )
    })

    return (
        <ImageBackground
            source={require('../assets/images/background.jpg')}
            style={styles.background}
            blurRadius={0}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    {/* Populaires */}
                    <ScrollView style={styles.scroll} horizontal={true}>
                        {meals}
                    </ScrollView>

                    {/* Consultés récemment */}

                    {/* Coups de coeur de l'équipe */}

                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        margin: 30,
    },
    scroll: {
        marginTop: 30,
    },
});

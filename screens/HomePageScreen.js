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
        //on crée un tableau dans lequel push les données
        const updatedMealsData = mealsData;

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
                            updatedMealsData.push(pdj)
                            if (!mealsData.includes(pdj)) {
                            }
                        }
                    }
                }
            })
        //on set dans mealsData les données récoltées
        setMealsData(updatedMealsData)
    }, [mealsData]);

    //                         PROBLÈME 1 : DEVRAIT SE REMPLIR MAIS RESTE VIDE JUSQU'À CE QU'ON ACTUALISE
    //                         PROBLÈME 2 : charge en double les éléments à chaque actualisation
    console.log(mealsData)

    const meals = mealsData.map((data, i) => {
        return (
            <Meal key={i} {...data} />
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
                    <ScrollView
                        style={styles.scroll}
                        horizontal={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
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

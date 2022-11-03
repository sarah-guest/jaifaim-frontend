// IMPORTS REACT
import { useState, useEffect } from 'react';
// IMPORTS COMPOSANTS
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import Meal from '../components/Meal';
import Title from '../components/Title';
// IMPORTS AUTRES
import IP_ADDRESS from '../modules/ipAddress';
import convertColor from '../modules/convertColor';

export default function HomeScreen() {
  // SI RECHERCHE on récupère le texte
  const [isSearched, setIsSearched] = useState('');
  const searchMeal = (search) =>
    search !== '' ? setIsSearched(search) : setIsSearched('');

  // On crée un état dans lequel stocker les plats à afficher
  // Puis on récupère les plats du jour
  const [mealsData, setMealsData] = useState([]);
  const [mealsOfTheDayData, setMealsOfTheDayData] = useState([]);
  const today = new Date().toDateString();
  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/getplatsdujour`)
      .then((res) => res.json())
      .then((data) => {
        if (data !== null) {
          //TOUS : on set dans mealsData les plats dans l'ordre du plus récent au plus ancien
          data.platsdujour = data.platsdujour.sort(function (a, b) {
            //on transforme les date en nombres et on les soustrait
            return new Date(b.date) - new Date(a.date);
          });
          //on récupère les données triées
          setMealsData(data.platsdujour);

          //PLATS DU JOUR UNIQUEMENT
          //on récupère uniquement les plats du jour
          setMealsOfTheDayData(
            data.platsdujour.filter(
              (e) => new Date(e.date).toDateString() === today
            )
          );
        }
      });
  }, []);

  // On affiche les plats DU JOUR
  const mealsOfTheDay = mealsOfTheDayData.map((data, i) => {
    return <Meal key={i} {...data} />;
  });

  // On affiche TOUS les plats
  const mealsWithoutToday = mealsData.filter(
    (e) => new Date(e.date).toDateString() !== today
  );
  const meals = mealsWithoutToday.map((data, i) => {
    return <Meal isScaledDown={true} key={i} {...data} />;
  });

  // On affiche les plats RECHERCHÉS
  const searchedMealsData = mealsData.filter((e) =>
    e.meal.includes(isSearched)
  );
  const searchedMeals = searchedMealsData.map((data, i) => {
    return <Meal key={i} {...data} />;
  });

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      blurRadius={60}
    >
      <SafeAreaView style={styles.container}>
        <SearchBar searchMeal={searchMeal} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {isSearched !== '' ? (
            <View>
              {/* RECHERCHE */}
              <Title h4 isLight={true}>
                Résultats pour "{isSearched}" 👀
              </Title>
              <ScrollView
                style={styles.scroll}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {searchedMeals}
              </ScrollView>
            </View>
          ) : (
            <View>
              {mealsOfTheDay.length > 0 && (
                <View>
                  {/* MENUS DU JOUR */}
                  <Title h2 isLight={true}>
                    Menus du jour
                  </Title>
                  <ScrollView
                    style={styles.scroll}
                    horizontal={true}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                  >
                    {mealsOfTheDay}
                  </ScrollView>
                </View>
              )}

              {/* MENUS RÉCENTS */}
              <Title h4 isLight={true}>
                Menus récents
              </Title>
              <ScrollView
                style={styles.scroll}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {meals}
              </ScrollView>
            </View>
          )}
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
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30,
  },
  scroll: {
    marginTop: 10,
    marginBottom: 30,
  },
  deleteButton: {
    fontSize: 20,
    color: convertColor('sable'),
  },
});

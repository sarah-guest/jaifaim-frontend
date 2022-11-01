import { useState, useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
//import fontAwesome
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
//imports de nos composants
import SearchBar from '../components/SearchBar';
import Meal from '../components/Meal';
import Title from '../components/Title';
import IP_ADDRESS from '../modules/ipAddress';
import convertColor from '../modules/convertColor';

export default function HomeScreen() {
  //SI RECHERCHE on récupère le texte
  const [isSearched, setIsSearched] = useState('');
  const searchMeal = search => search !== '' ? setIsSearched(search) : setIsSearched('')

  //on récupère les éléments likés
  const liked = useSelector((state) => state.likedMeals.value);

  //on crée un état dans lequel stocker les plats à afficher
  //puis on récupère les plats du jour
  const [mealsData, setMealsData] = useState([]);
  const [mealsOfTheDayData, setMealsOfTheDayData] = useState([]);
  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/getplatsdujour`)
      .then((res) => res.json())
      .then((data) => {
        //on set dans mealsData les données récoltées
        data !== null && setMealsData(data.platsdujour);

        //on set dans mealsOfTheDayData les données datant d'aujourd'hui
        const today = new Date().toJSON().slice(0, 10)
        const mealDate = data.platsdujour.date
        if (data !== null && mealDate !== undefined) {
          mealDate.slice(0, 10) === today && setMealsOfTheDayData(data.platsdujour)
        }
      });
  }, []);

  //on affiche les plats
  const meals = mealsData.map((data, i) => {
    const isLiked = liked.some((e) => e.meal === data.meal)
    return <Meal key={i} isLiked={isLiked} {...data} />;
  });

  //on affiche les plats du jour
  const mealsOfTheDay = mealsOfTheDayData.map((data, i) => {
    const isLiked = liked.some((e) => e.meal === data.meal)
    return <Meal key={i} isLiked={isLiked} {...data} />;
  });

  //on affiche les plats recherchés
  const searchedMealsData = mealsData.filter((e) => e.meal === isSearched);
  const searchedMeals = searchedMealsData.map((data, i) => {
    const isLiked = liked.some((e) => e.meal === data.meal)
    return <Meal key={i} isLiked={isLiked} {...data} />;
  });

  //on affiche les plats likés
  // const likedMeals = liked.map((data, i) => {
  //   return <Meal key={i} {...data} isLiked={true} />;
  // });

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
          )
            : (
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
      </SafeAreaView >
    </ImageBackground >
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
  }
});

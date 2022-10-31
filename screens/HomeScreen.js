import { useState, useEffect } from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
//imports de nos composants
import SearchBar from '../components/SearchBar';
import Meal from '../components/Meal';
import Title from '../components/Title';

export default function HomeScreen({ navigation }) {
  //const IP_ADDRESS = '192.168.10.136';
  const IP_ADDRESS = '192.168.1.36';

  //on récupère les éléments likés
  const liked = useSelector((state) => state.likedMeals.value);

  //on crée un état dans lequel stocker les plats à afficher
  const [mealsData, setMealsData] = useState([]);
  //on récupère les plats du jour
  useEffect(() => {
    fetch(`http://${IP_ADDRESS}:3000/users/getplatsdujour`)
      .then((res) => res.json())
      .then((data) => {
        //on set dans mealsData les données récoltées
        data !== null && setMealsData(data.platsdujour);
      });
  }, []);

  //on affiche les plats du jour
  const meals = mealsData.map((data, i) => {
    const isLiked = liked.some((e) => e.meal === data.meal);
    return <Meal key={i} isLiked={isLiked} {...data} />;
  });

  const likedMeals = liked.map((data, i) => {
    console.log(likedMeals)
    return <Meal key={i} {...data} isLiked={true} />;
  });

  return (
    <ImageBackground
      source={require('../assets/images/background.jpg')}
      style={styles.background}
      blurRadius={60}
    >
      <SafeAreaView style={styles.container}>
        <SearchBar />
        <ScrollView>
          {/* Populaires */}
          <Title h2 isLight={true}>
            Menus du jour
          </Title>
          <ScrollView
            style={styles.scroll}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            {meals}
          </ScrollView>

          {/* Derniers consultés */}
          {likedMeals.length > 0 && (
            <View>
              <Title h4 isLight={true}>
                Aimés récemment 👀
              </Title>
              <ScrollView
                style={styles.scroll}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                {likedMeals}
              </ScrollView>
            </View>
          )}

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
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 30,
    marginRight: 30,
  },
  scroll: {
    marginTop: 10,
    marginBottom: 30,
  },
});

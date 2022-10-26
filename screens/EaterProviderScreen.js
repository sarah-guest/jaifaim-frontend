import { Image, Text, View, StyleSheet } from 'react-native';
import OurButton from '../components/Button';

export default function EaterProviderScreen({ navigation }) {
  //On crée une qui définit si on est user...
  const handleSignUpUser = () => {
    navigation.navigate('SignUp', {type:'user'});
  };
  //...ou un restaurant
  const handleSignUpRestaurant=()=>{
    navigation.navigate('SignUp',{type:'restaurant'});
  };
  
  return (
    <View style={styles.container}>
      <Text>J'ai</Text>
     
       <OurButton 
       text="...faim" 
       onPress={handleSignUpUser} 
       color="pingouin" />

      <OurButton 
      text="...à manger" 
      onPress={handleSignUpRestaurant} 
      color="pingouin" 
      /> 
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

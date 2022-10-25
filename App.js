import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LandingScreen from './screens/LandingScreen';
import DemoScreen from './screens/DemoScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
const Stack= createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name= 'Landing' component={LandingScreen} />
      <Stack.Screen name='Demo' component={DemoScreen}/>
      <Stack.Screen name ='SingIn' component={SignInScreen}/>
      <Stack.Screen name ='SingUp' component={SignUpScreen}/>
     </Stack.Navigator>
    </NavigationContainer>
  );
}


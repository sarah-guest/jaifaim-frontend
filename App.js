// REDUX
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import restaurant from './reducers/restaurant';
import temporary from './reducers/temporary';
// NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// STYLE NAVIGATION BAR
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// SCREENS
import LandingScreen from './screens/LandingScreen';
import DemoScreen from './screens/DemoScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import EaterProviderScreen from './screens/EaterProviderScreen';
import MapScreen from './screens/MapScreen';
import HomePageScreen from './screens/HomePageScreen';
import PdjFormScreen from './screens/PdjFormScreen';
// // SCREENS POUR TAB
import ProfileScreen from './screens/ProfileScreen';
import SnapScreen from './screens/SnapScreen';
// REDUX
const store = configureStore({
  reducer: { user, restaurant, temporary },
});

const getIconName = (routeName) => {
  switch (routeName) {
    case 'Home': // commun: feed pour users, dashboard pour restaurants
      return 'home';
    case 'Map': // users: vue restaurants
      return 'map';
    case 'Profile': // commun
      return 'user';
    case 'Snap': // restaurants: prise photo plat du jour
      return 'camera';
    case 'Questions': // restaurants: Q&A
      return 'comments';
  }
};
// NAVIGATION
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Ce composant renvoie la TabNavigation pour restaurant OU user selon le reducer
const TabNavigation = () => {
  // RESTAURANT NAVIGATION
  const RestaurantNavigation = (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <FontAwesome
            name={getIconName(route.name)}
            size={size}
            color={color}
          />
        ),
        // INACTIVE TABS COLORS
        tabBarInactiveBackgroundColor: '#7F5539',
        tabBarInactiveTintColor: '#DDB892',
        // ACTIVE TABS COLORS
        tabBarActiveBackgroundColor: '#DDB892',
        tabBarActiveTintColor: '#7F5539',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={LandingScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );

  // USERNAVIGATION
  const UserNavigation = (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => (
          <FontAwesome
            name={getIconName(route.name)}
            size={size}
            color={color}
          />
        ),
        tabBarInactiveBackgroundColor: '#7F5539',
        tabBarInactiveTintColor: '#DDB892',
        tabBarActiveBackgroundColor: '#DDB892',
        tabBarActiveTintColor: '#7F5539',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={LandingScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );

  return UserNavigation; // Todo: mettre condition ici pour renvoyer navigation user ou resto !
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Demo" component={DemoScreen} />
          <Stack.Screen name="EaterProvider" component={EaterProviderScreen} />
          <Stack.Screen
            name="HomePage"
            component={HomePageScreen}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Snap" component={SnapScreen} />
          <Stack.Screen name="PdjForm" component={PdjFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// REDUX
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import restaurant from './reducers/restaurant';
import likedMeals from './reducers/likedMeals';
import temporary from './reducers/temporary';
// NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// STYLE NAVIGATION BAR
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// SCREENS
import AskNameScreen from './screens/AskNameScreen';
import DashboardScreen from './screens/DashboardScreen';
import DemoScreen from './screens/DemoScreen';
import EaterProviderScreen from './screens/EaterProviderScreen';
import FaqScreen from './screens/FaqScreen';
import HomeScreen from './screens/HomeScreen';
import InfoRestaurantScreen from './screens/InfoRestaurantScreen';
import InfoUserScreen from './screens/InfoUserScreen';
import LandingScreen from './screens/LandingScreen';
import MapScreen from './screens/MapScreen';
import PdjFormScreen from './screens/PdjFormScreen';
import PdjScreen from './screens/PdjScreen';
import PreferencesScreen from './screens/PreferencesScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import SnapScreen from './screens/SnapScreen';
import UserParametersScreen from './screens/UserParametersScreen';
import UserPrefScreen from './screens/UserPrefScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { View, Image, StyleSheet } from 'react-native';

const store = configureStore({
  reducer: { user, restaurant, likedMeals, temporary },
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
const TabNavigation = ({ route }) => {
  const type = route.params;
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
        tabBarStyle: styles.tab,
        tabBarItemStyle: {
          padding: 5,
        },
        // INACTIVE TABS COLORS
        tabBarInactiveBackgroundColor: '#7F5539',
        tabBarInactiveTintColor: '#DDB892',
        // ACTIVE TABS COLORS
        tabBarActiveBackgroundColor: '#DDB892',
        tabBarActiveTintColor: '#7F5539',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={DashboardScreen} />
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
        tabBarStyle: styles.tab,
        tabBarItemStyle: {
          padding: 5,
        },
        tabBarInactiveBackgroundColor: '#7F5539',
        tabBarInactiveTintColor: '#DDB892',
        tabBarActiveBackgroundColor: '#DDB892',
        tabBarActiveTintColor: '#7F5539',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );

  if (type.type === 'restaurant') {
    return RestaurantNavigation;
  } else {
    return UserNavigation;
  }
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
          <Stack.Screen name="Demo" component={DemoScreen} />
          <Stack.Screen name="EaterProvider" component={EaterProviderScreen} />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ animation: 'fade' }}
          />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="AskName" component={AskNameScreen} />
          <Stack.Screen name="InfoUser" component={InfoUserScreen} />
          <Stack.Screen
            name="InfoRestaurant"
            component={InfoRestaurantScreen}
          />
          <Stack.Screen name="UserPref" component={UserPrefScreen} />
          <Stack.Screen name="Preferences" component={PreferencesScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Snap" component={SnapScreen} />
          <Stack.Screen name="Faq" component={FaqScreen} />
          <Stack.Screen
            name="UserParameters"
            component={UserParametersScreen}
          />
          <Stack.Screen name="Pdj" component={PdjScreen} />
          <Stack.Screen name="PdjForm" component={PdjFormScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    elevation: 0,
    height: 50,
    paddingBottom: 0,
    bottom: 30,
    left: 30,
    right: 30,
    borderColor: 'transparent',
    borderTopWidth: 0,
    overflow: 'hidden',
    borderRadius: 30,
  },
});

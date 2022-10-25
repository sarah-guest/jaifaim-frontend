// REDUX
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
// NAVIGATION
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// SCREENS
import LandingScreen from './screens/LandingScreen';
import DemoScreen from './screens/DemoScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import EaterProviderScreen from './screens/EaterProviderScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();
const store = configureStore({
  reducer: { user },
});

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Demo" component={DemoScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="EaterProvider" component={EaterProviderScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeView from './views/HomeView/HomeView';
import InGame from './views/InGame/InGame';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
		<StatusBar hidden />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeView" component={HomeView} />
        <Stack.Screen name="InGame" component={InGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

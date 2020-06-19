import 'react-native-gesture-handler';

import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import Store from './redux/reducer/store';

import HomeView from './views/HomeView/HomeView';
import LoginView from './views/LoginView/LoginView';
import InGame from './views/InGame/InGame';
import DefeatView from './views/DefeatView/DefeatView';
import VictoryView from './views/VictoryView/VictoryView';

const Stack = createStackNavigator();
console.disableYellowBox = true;
const App: () => React$Node = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeView" component={HomeView} />
          <Stack.Screen name="InGame" component={InGame} />
          <Stack.Screen name="LoginView" component={LoginView} />
          <Stack.Screen name="DefeatView" component={DefeatView} />
          <Stack.Screen name="VictoryView" component={VictoryView} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

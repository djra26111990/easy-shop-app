import React from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import ProductContainer from './Screens/Products/ProductContainer';
import Header from './Shared/Header'
import { NavigationContainer } from '@react-navigation/native'
import Main from './Navigators/Main'
import { Provider } from 'react-redux'
import store from './Redux/store'

//LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  )
}

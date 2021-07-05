import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import HomeNavegator from './HomeNavigator'
import CartNavegator from './CartNavigator'
import CartIcon from '../Shared/CartIcon'

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
      <Tab.Navigator
        initialRouteName='Home'
        tabBarOptions={{
          keyboardHidesTabBar: true,
          showLabel: false,
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name='Home'
          component={HomeNavegator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name='home' color={color} size={30} />
            ),
          }}
        />
        <Tab.Screen
          name='Cart'
          component={CartNavegator}
          options={{
            tabBarIcon: ({ color }) => (
              <View>
                <Icon name='shopping-cart' color={color} size={30} />
                <CartIcon />
              </View>
            ),
          }}
        />

        {/*{context.stateUser.user.isAdmin == true ? (
          
        ) : null}*/}

        <Tab.Screen
          name='Admin'
          component={HomeNavegator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name='cog' color={color} size={30} />
            ),
          }}
        />

        <Tab.Screen
          name='User'
          component={HomeNavegator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name='user' color={color} size={30} />
            ),
          }}
        />
      </Tab.Navigator>
    )
}

export default Main;
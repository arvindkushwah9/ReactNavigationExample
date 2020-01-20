//This is an example code for Bottom Navigation//
import React from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
import Ionicons from 'react-native-vector-icons/Ionicons';
//import Ionicons to show the icon for bottom options
 
//For React Navigation 3+
//import {
//  createStackNavigator,
//  createBottomTabNavigator,
//  createAppContainer,
//} from 'react-navigation';
 
//For React Navigation 4+
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
 
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Login from './src/Auth/Login';
import Registration from './src/Auth/Registration';
import rootReducer from './src/reducers/index.js';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import FlashMessage from "react-native-flash-message";
import Storage from './src/helpers/storage';
import { isSignedIn } from './src/helpers/storage';
import NavigationService from './src/helpers/NavigationService';

import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



const HomeStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Home: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
    Login: { screen: Login },
    Registration: { screen: Registration },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Home',
      //Header title
    },
  }
);
const SettingsStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Settings',
      //Header title
    },
  }
);

const ProfileStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Profile: { screen: ProfileScreen },
    Settings: { screen: SettingsScreen },
    Details: { screen: DetailsScreen },
  },
  {
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: '#42f44b',
      },
      headerTintColor: '#FFFFFF',
      title: 'Profile',
      //Header title
    },
  }
);

const RootStack = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
    Profile: { screen: ProfileStack },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-settings${focused ? '' : ''}`;
        }

        else if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : ''}`;
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#42f44b',
      inactiveTintColor: 'gray',
    },
  }
);

const Navigation = createAppContainer(RootStack);

const LandingNavigation = createAppContainer(HomeStack);


// Render the app container component with the provider around it
export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false
    };
  }

  componentDidMount() {
    isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  render() {
    const { checkedSignIn, signedIn } = this.state;

    // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
    if (!checkedSignIn) {
      return null;
    }

    if (signedIn) {
       return (
          <View style={{ flex: 1 }}>
            <Provider store={store}>
              <Navigation
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
               />
              <View ref={"otherView1"} />
              <View ref={"otherView2"} />
              <View ref={"otherView3"} />
              <FlashMessage position="top" /> 
            </Provider>
          </View>

        );
    } else {
       return (
        <View style={{ flex: 1 }}>
          <Provider store={store}>
            <LandingNavigation
              ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
             />
            <View ref={"otherView1"} />
            <View ref={"otherView2"} />
            <View ref={"otherView3"} />
            <FlashMessage position="top" /> 
          </Provider>
        </View>
      );
    }
     
  }
}
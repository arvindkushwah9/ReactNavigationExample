//This is an example code for Bottom Navigation//
import React from 'react';
//import react in our code.
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
//import all the basic component we have used
import Login from '../Auth/Login';
import ProfileScreen from './ProfileScreen';
import Interceptor from "../helpers/interceptor";
import Storage from '../helpers/storage'
import { isSignedIn } from '../helpers/storage';

export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        signedIn: false,
        checkedSignIn: false
      };
    }

   componentDidMount() {
    // this._bootstrapAsync();
       isSignedIn()
      .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
      .catch(err => alert("An error occurred"));
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'ProfileScreen' : 'Login');
  };

    onLogOutPress = () => {
      Storage.removeItem("user").then(() => {
          Interceptor.resetHeaders();
          this.props.navigation.navigate('Login');
      });
    };

  //Home Screen to show in Home Option
  render() {
    const { checkedSignIn, signedIn } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginTop: 50, fontSize: 25 }}>Home!</Text>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Settings')}>
            <Text>Go to settng Tab2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Details')}>
            <Text>Open Details Screen</Text>
          </TouchableOpacity>

          { signedIn === true ?
            <TouchableOpacity
            style={styles.button}
            onPress={this.onLogOutPress} >
             <Text>Logout</Text>
            </TouchableOpacity>
          
          : 
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text>Login</Text>
            </TouchableOpacity>
        }
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: 300,
    marginTop: 16,
  },
});
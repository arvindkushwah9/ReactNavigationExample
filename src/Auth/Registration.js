import React, { Component, Fragment } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, Alert,TouchableOpacity, StyleSheet } from 'react-native';
import Forgot from './Forgot';
import Login from './Login';
import { connect } from 'react-redux';
import { signupUser } from '../actions/auth';

export class Registration extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      first_name: '',
      last_name: '',
    };
    this.registerUser = this.registerUser.bind(this);
    this.onRegistrationFail = this.onRegistrationFail.bind(this);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

  registerUser() {
    this.props.signupUser(this.state)
  }

  onRegistrationFail() {
    this.setState({
      error: 'Registration Failed',
      loading: false
    });
  }

  componentDidMount() {
     console.log('Registration*********************');
     // Actions.forgot()
  }

  render() {
    const { email, password, password_confirmation, first_name, last_name, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;
    return (
     <View style={styles.container}>
        <TouchableHighlight style={styles.buttonContainer} >
            <Text>Registration</Text>
        </TouchableHighlight>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="First Name"
              value={first_name}
              underlineColorAndroid='transparent'
              onChangeText={(first_name) => this.setState({first_name})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Last Name"
              value={last_name}
              underlineColorAndroid='transparent'
              onChangeText={(last_name) => this.setState({last_name})}/>
        </View>

        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password Confirmation"
              value={password_confirmation}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password_confirmation) => this.setState({password_confirmation})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.registerUser}>
          <Text style={styles.loginText}>Register</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Home')}>
            <Text>Go to Home Page</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Login')} >
            <Text>Login</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#DCDCDC',
    backgroundColor: '#DCDCDC',
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#42f44b",
  },
  loginText: {
    color: 'white',
  }
});


const mapStateToProps = state => {
  return {
    storeObject: state
  }
}
mapDispatchToProps = dispatch => {
  return {
    signupUser: params => dispatch(signupUser(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration)

import React, { Component, Fragment } from 'react';
import { View, Text, TextInput, TouchableHighlight, Image, Alert,TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Forgot from './Forgot';
import Registration from './Registration';
import { loginUser } from '../actions/auth';
import { connect } from 'react-redux';
import { genericStyles } from '../Styles/genericStyles'


export class Login extends Component {

	constructor(props){
    super(props);
    this.state = {
      email   : '',
      password: '',
      loading: false,
    };
    this.loginUser = this.loginUser.bind(this);
    this.onLoginFail = this.onLoginFail.bind(this);
  }

  onClickListener = (viewId) => {
    Alert.alert("Alert", "Button pressed "+viewId);
  }

	componentDidMount() {
    // console.log('Login page', this.props);
  }

  loginUser() {
    this.setState({ loading: true})
    this.props.loginUser(this.state)
  }

  onLoginFail() {
    this.setState({
      error: 'Login Failed',
      loading: false
    });
  }


  Loader() {
    if (this.state.loading) {
      return (
        <View style={[genericStyles.container, genericStyles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View> 
      )
    }
  }


  render() {
  	const { email, password, error, loading } = this.state;
    const { form, section, errorTextStyle } = styles;
    return (
     <View style={styles.container}>
         {this.Loader()}
     		<TouchableHighlight style={styles.buttonContainer} >
            <Text>Login</Text>
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
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.loginUser}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Home')} >
            <Text>Go to Home Page</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Registration')} >
            <Text>Register</Text>
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
    loginUser: params => dispatch(loginUser(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)


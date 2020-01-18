import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Forgot from './Forgot';


export class Settings extends Component {

	componentDidMount() {
     console.log('IM Settings');
  }

  render() {
    return (
      <View>
        <Text>This is the Settings screen</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Settings')}           
          >
              <Text style={{ fontSize: 16 }}>Go to home screen</Text>
          </TouchableOpacity>
      </View>
    )
  }
};

export default Settings;
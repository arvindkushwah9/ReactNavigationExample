import { StyleSheet } from 'react-native';

export const genericStyles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ffffff'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
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
    backgroundColor: "#00b5ec",
    color: 'white',
  },
   loginText: {
    color: 'white',
  }
});
import {StyleSheet, Platform, Dimensions, Image} from 'react-native';
import Colors from './Colors';

const {width, height} = Dimensions.get('window');

export const globalStyle = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.BgGray,
    padding: 25,
  },
  scrollContainer: {
    flex: 1,
  },
  secHeader: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.Black,
    marginBottom: 15,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  row: {
    paddingBottom: 15,
  },

  //Buttons
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Red,
    height: 50,
    borderRadius: 25,
    marginTop: 20,
  },
  logButtonText: {
    color: Colors.White,
    fontSize: 20,
    fontWeight: '700',
  },
  logoWrapper: {
    height: 30,
    marginBottom: 25,
    marginTop: 25,
  },
  logo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
});

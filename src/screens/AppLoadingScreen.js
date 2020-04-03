/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
function AppLoadingScreen({navigation}) {
  const userInformation = useSelector((state) => state.atuth.userInfo);

  useEffect(() => {
    if (userInformation.name) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Login');
    }
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Loading ...</Text>
    </View>
  );
}
export default AppLoadingScreen;

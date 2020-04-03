/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {TextField} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {userSignIn} from '../redux/actions/authAction';
import {showMessage} from 'react-native-flash-message';

import {globalStyle} from '../styles/Style';
import Colors from '../styles/Colors';

function SignInScreen({navigation}) {
  const [userData, updateUserData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const [errors, updateErrors] = useState({});
  const userList = useSelector((state) => state.atuth.userList);
  const dispatch = useDispatch();

  const updateField = (name, value) => {
    updateUserData({
      ...userData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    let errors = {};
    let email = userData.userEmail;
    let password = userData.userPassword;

    if (!email || !password) {
      if (!email && !password) {
        errors.userEmail = 'Should not be empty';
        errors.userPassword = 'Should not be empty';
      } else {
        if (!email) {
          errors.userEmail = 'Should not be empty';
        }

        if (!password) {
          errors.userPassword = 'Should not be empty';
        }
      }
    } else {
      if (email) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
          errors.userEmail = 'Not a wwww valid email';
        } else {
          if (userList.length > 0) {
            let userArray = userList.filter(function (user) {
              return (
                user.email == userData.userEmail &&
                user.password == userData.userPassword
              );
            });

            if (userArray.length === 0) {
              showMessage({
                message: 'Invalid user namer or password',
                type: 'danger',
              });
            } else {
              signIn(userArray[0]);
            }
          } else {
            showMessage({
              message: 'Invalid user namer or password',
              type: 'danger',
            });
          }
        }
      }
    }
    updateErrors(errors);
  };

  const signIn = (data) => {
    dispatch(userSignIn(data));
    navigation.navigate('App');
  };

  return (
    <View style={globalStyle.conatiner}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps={'handled'}>
        <View style={globalStyle.row}>
          <TextField
            labelTextStyle={{
              fontWeight: '400',
            }}
            labelFontSize={16}
            fontSize={18}
            // value={this.state.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            onChangeText={(e) => updateField('userEmail', e)}
            returnKeyType="next"
            label="Email"
            textColor={Colors.Black}
            baseColor={Colors.GrayDark}
            tintColor={Colors.Red}
            error={errors.userEmail}
            activeLineWidth={2}
          />
        </View>
        <View style={globalStyle.row}>
          <TextField
            labelTextStyle={{
              fontWeight: '400',
            }}
            labelFontSize={16}
            fontSize={18}
            enablesReturnKeyAutomatically={true}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={true}
            clearTextOnFocus={Platform.OS != 'ios' ? false : true}
            onChangeText={(e) => updateField('userPassword', e)}
            textColor={Colors.Black}
            baseColor={Colors.GrayDark}
            tintColor={Colors.Red}
            blurOnSubmit={true}
            returnKeyType="done"
            label="Password"
            error={errors.userPassword}
            activeLineWidth={2}
          />
        </View>

        <TouchableOpacity style={globalStyle.button} onPress={onSubmit}>
          <Text style={globalStyle.logButtonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.bottomText}>
          {"Don't have an account ?"}
          <Text
            onPress={() => {
              navigation.navigate('SignUp');
            }}
            style={styles.signUpText}>
            {' Sign Up'}
          </Text>
        </Text>
      </ScrollView>
      <View style={globalStyle.logoWrapper}>
        <Image
          style={globalStyle.logo}
          source={require('../../static/images/BUS.png')}
        />
      </View>
    </View>
  );
}
export default SignInScreen;

const styles = StyleSheet.create({
  bottomText: {
    color: Colors.Black,
    fontSize: 14,
    marginTop: 35,
    textAlign: 'center',
  },
  signUpText: {
    paddingHorizontal: 14,
    fontWeight: '700',
    color: Colors.Red,
  },
});

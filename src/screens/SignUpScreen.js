/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {userSignUp} from '../redux/actions/authAction';

import {globalStyle} from '../styles/Style';
import Colors from '../styles/Colors';

function nameConverter(str) {
  var name = str.toLowerCase();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function SignUpScreen({navigation}) {
  const [userData, updateUserData] = useState({
    firstName: '',
    lastName: '',
    userEmail: '',
    userPassword: '',
    userPasswordConfirm: '',
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
    let firstName = userData.firstName;
    let lastName = userData.lastName;
    let email = userData.userEmail;
    let password = userData.userPassword;
    let passwordConfirm = userData.userPasswordConfirm;

    if (!email || !password || !passwordConfirm || !firstName || !lastName) {
      if (!firstName && !lastName && !email && !password && !passwordConfirm) {
        errors.firstName = 'Should not be empty';
        errors.lastName = 'Should not be empty';
        errors.userEmail = 'Should not be empty';
        errors.userPassword = 'Should not be empty';
        errors.userPasswordConfirm = 'Should not be empty';
      } else {
        if (!firstName) {
          errors.firstName = 'Should not be empty';
        }

        if (!lastName) {
          errors.lastName = 'Should not be empty';
        }

        if (!email) {
          errors.userEmail = 'Should not be empty';
        }

        if (!password) {
          errors.userPassword = 'Should not be empty';
        }

        if (!passwordConfirm) {
          errors.userPasswordConfirm = 'Should not be empty';
        }
      }
    } else {
      if (email) {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(email) === false) {
          errors.userEmail = 'Not a wwww valid email';
        } else if (password != passwordConfirm) {
          errors.userPasswordConfirm = 'Password not match';
        } else {
          if (userList.length > 0) {
            let userArray = userList.filter(function (user) {
              return user.email == userData.userEmail;
            });

            if (userArray.length === 0) {
              registerUser();
            } else {
              errors.userEmail = 'email already exsist';
            }
          } else {
            registerUser();
          }
        }
      }
    }
    updateErrors(errors);
  };

  const registerUser = () => {
    var firstName = nameConverter(userData.firstName);
    var lsetName = nameConverter(userData.lastName);

    let newUser = {
      name: firstName + ' ' + lsetName,
      email: userData.userEmail,
      password: userData.userPassword,
    };

    dispatch(userSignUp(newUser));
    navigation.navigate('App');
  };

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}>
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
              // ref={this.firstNameRef}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(e) => updateField('firstName', e)}
              // onSubmitEditing={this.onSubmitEmail}
              returnKeyType="next"
              label="First Name"
              textColor={Colors.Black}
              baseColor={Colors.GrayDark}
              tintColor={Colors.Red}
              error={errors.firstName}
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
              // ref={this.lastNameRef}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(e) => updateField('lastName', e)}
              // onSubmitEditing={this.onSubmitEmail}
              returnKeyType="next"
              label="Last Name"
              textColor={Colors.Black}
              baseColor={Colors.GrayDark}
              tintColor={Colors.Red}
              error={errors.lastName}
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
              // ref={this.emailRef}
              // value={this.state.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(e) => updateField('userEmail', e)}
              // onSubmitEditing={this.onSubmitEmail}
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
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
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
          <View style={globalStyle.row}>
            <TextField
              labelTextStyle={{
                fontWeight: '400',
              }}
              labelFontSize={16}
              fontSize={18}
              // ref={this.confirmPasswordRef}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              onChangeText={(e) => updateField('userPasswordConfirm', e)}
              textColor={Colors.Black}
              baseColor={Colors.GrayDark}
              tintColor={Colors.Red}
              blurOnSubmit={true}
              returnKeyType="done"
              label="Confirm Password"
              error={errors.userPasswordConfirm}
              activeLineWidth={2}
            />
          </View>

          <TouchableOpacity style={globalStyle.button} onPress={onSubmit}>
            <Text style={globalStyle.logButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* <View style={styles.rowButton}>
          <Text style={styles.signUpText} />
        </View> */}
        </ScrollView>
        <View style={globalStyle.logoWrapper}>
          <Image
            style={globalStyle.logo}
            source={require('../../static/images/BUS.png')}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
export default SignUpScreen;

const styles = StyleSheet.create({
  signUpText: {
    paddingHorizontal: 14,
    textAlign: 'center',
    color: '#008080',
    fontSize: 14,
    marginTop: 35,
  },
});

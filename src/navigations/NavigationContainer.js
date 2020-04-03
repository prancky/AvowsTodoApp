import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Animated,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  NavigationActions,
  createSwitchNavigator,
} from '@react-navigation/compat';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HomeScreen,
  ProfileScreen,
  SignInScreen,
  SignUpScreen,
  AppLoadingScreen,
} from '../screens';
import DrawerContent from '../components/Drawer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';

import {TouchableOpacity} from 'react-native';
import {Appbar, Avatar, Portal, FAB} from 'react-native-paper';
import Colors from '../styles/Colors';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Drawer = createDrawerNavigator();

const Header = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  return (
    <Appbar.Header
      style={{
        backgroundColor: Colors.Red,
      }}>
      {previous ? (
        <Appbar.BackAction onPress={navigation.pop} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}>
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
          />
        </TouchableOpacity>
      )}
    </Appbar.Header>
  );
};

function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          headerTitle: 'SignIn',
          headerStyle: {
            backgroundColor: Colors.Red,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerTitle: 'Sign-Up',
          headerStyle: {
            backgroundColor: Colors.Red,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

function completeList() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({scene, previous, navigation}) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: ({scene, previous, navigation}) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function BottomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      shifting={true}
      sceneAnimationEnabled={false}>
      <Tab.Screen
        name="Pending Tasks"
        component={Home}
        options={{
          tabBarIcon: 'account-child',
          tabBarColor: Colors.Red,
        }}
      />
      <Tab.Screen
        name="Complete Tasks"
        component={completeList}
        options={{
          tabBarIcon: 'account-card-details-outline',
          tabBarColor: Colors.Red,
        }}
      />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNav} />
    </Drawer.Navigator>
  );
}

const RootNavigator = createSwitchNavigator(
  {
    Loading: AppLoadingScreen,
    Login: Auth,
    App: RootStack,
  },
  {
    initialRouteName: 'Loading',
  },
);

export default RootNavigator;

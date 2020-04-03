import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {userLogOut} from '../redux/actions/authAction';

export default function DrawerContent(props) {
  const userInformation = useSelector((state) => state.atuth.userInfo);
  const userToDoList = useSelector((state) => state.userData.toDoList);
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userLogOut());
    props.navigation.navigate('Login');
  };

  let taskArray = userToDoList.filter(function (user) {
    return user.active == true;
  });
  let pendingCount = userToDoList.length - taskArray.length;

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Avatar.Image
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
            size={50}
          />
          <Title style={styles.title}>{userInformation.name}</Title>
          <Caption style={styles.caption}>{userInformation.email}</Caption>
        </View>
        <Drawer.Section />
        <Drawer.Section>
          <DrawerItem
            icon={({color, size}) => (
              <Image
                style={styles.image}
                source={require('../../static/images/checked.png')}
              />
            )}
            label={'Completed Tasks ' + taskArray.length + '.'}
            onPress={() => {}}
          />
          <DrawerItem
            icon={({color, size}) => (
              <Image
                style={styles.image}
                source={require('../../static/images/unchecked.png')}
              />
            )}
            label={'Pending Task ' + pendingCount + '.'}
            onPress={() => {}}
          />
        </Drawer.Section>
        <TouchableRipple onPress={logOut}>
          <View style={styles.preference}>
            <Text>Log Out</Text>
          </View>
        </TouchableRipple>
      </View>
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  image: {
    width: 28,
    height: 28,
  },
});

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
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {List, FAB} from 'react-native-paper';

import {useDispatch, useSelector} from 'react-redux';
import {
  addTodoItem,
  updateTodoItem,
  deleteTodoItem,
} from '../redux/actions/userAction';
import {showMessage} from 'react-native-flash-message';

import {globalStyle} from '../styles/Style';
import Colors from '../styles/Colors';
import Task from '../components/Home/Task';

function ProfileScreen() {
  const userInformation = useSelector((state) => state.atuth.userInfo);
  const userToDoList = useSelector((state) => state.userData.toDoList);
  const dispatch = useDispatch();
  let taskArray = userToDoList.filter(function (user) {
    return user.active == true;
  });

  const [toDoList, updateToDoList] = useState(taskArray);
  // useEffect(() => {
  //   updateToDoList(userToDoList);
  // });

  const deleteTaskCallBack = (data) => {
    dispatch(deleteTodoItem(data));
  };

  const updateTaskCallBack = (data) => {
    dispatch(updateTodoItem(data));
  };

  return (
    <>
      <View style={globalStyle.conatiner}>
        <>
          <Text style={globalStyle.secHeader}>
            Hello, {userInformation.name}!
          </Text>
          <Text style={styles.smText}>Pending Task's</Text>
        </>

        {taskArray && taskArray.length > 0 && (
          <View style={globalStyle.scrollContainer}>
            <FlatList
              data={taskArray}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Task
                  data={item}
                  removeTask={deleteTaskCallBack}
                  updateTask={updateTaskCallBack}
                />
              )}
              keyExtractor={(item) => 'key_' + item.id}
            />
          </View>
        )}
      </View>
    </>
  );
}
export default ProfileScreen;

const styles = StyleSheet.create({
  smText: {
    fontSize: 15,
    marginTop: -20,
    marginBottom: 10,
    fontWeight: '100',
    color: Colors.Black,
  },
  lgText: {
    fontSize: 35,
    fontWeight: '700',
    color: Colors.Black,
  },
});

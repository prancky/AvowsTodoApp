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

function HomeScreen() {
  const userInformation = useSelector((state) => state.atuth.userInfo);
  const userToDoList = useSelector((state) => state.userData.toDoList);
  const dispatch = useDispatch();

  let taskArray = userToDoList.filter(function (user) {
    return user.active == false;
  });

  const [addToList, updateAddToList] = useState([]);

  const addItem = () => {
    if (addToList.length < 2) {
      let item = {
        id: addToList.length > 0 ? addToList[addToList.length - 1].id + 1 : 1,
        name: '',
        active: false,
      };
      updateAddToList([...addToList, item]);
    }
  };

  const deleteTaskCallBack = (data) => {
    if (data.type === 'Add') {
      let taskArray = addToList.filter(function (user) {
        return user.id !== data.id;
      });
      updateAddToList(taskArray);
    } else {
      dispatch(deleteTodoItem(data));
    }
  };

  const addTaskCallBack = (data) => {
    deleteTaskCallBack(data);
    let item = {
      id:
        userToDoList.length > 0
          ? userToDoList[userToDoList.length - 1].id + 1
          : 1,
      name: data.name,
      active: false,
    };
    dispatch(addTodoItem(item));
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

        {addToList && addToList.length > 0 && (
          <View style={globalStyle.scrollContainer}>
            <FlatList
              data={addToList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'handled'}
              renderItem={({item}) => (
                <Task
                  data={item}
                  addTask={addTaskCallBack}
                  removeTask={deleteTaskCallBack}
                />
              )}
              keyExtractor={(item) => 'key_' + item.id}
            />
          </View>
        )}
        {taskArray && taskArray.length > 0 && (
          <View style={globalStyle.scrollContainer}>
            <FlatList
              data={taskArray}
              keyboardShouldPersistTaps={'handled'}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <Task
                  data={item}
                  addTask={addTaskCallBack}
                  removeTask={deleteTaskCallBack}
                  updateTask={updateTaskCallBack}
                />
              )}
              keyExtractor={(item) => 'key_' + item.id}
            />
          </View>
        )}
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            bottom: 10,
            right: 16,
            backgroundColor: Colors.Red,
          }}
          onPress={addItem}
          color="white"
        />
      </View>
    </>
  );
}
export default HomeScreen;

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

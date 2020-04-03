import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {CheckBox} from 'react-native-elements';

import Colors from '../../../styles/Colors';

import Edit from './edit';
import Add from './add';

//data
export default function Task(props) {
  const [taskStatus, updateTaskStatus] = useState(props.data.active);

  const onCheckBoxClick = () => {
    updateTaskStatus(!taskStatus);
    let data = {
      id: props.data.id,
      name: props.data.name,
      active: !taskStatus,
    };
    props.updateTask(data);
  };

  return (
    <View style={styles.card}>
      <View>
        {props.data.name.trim() !== '' && (
          <CheckBox
            checkedIcon={
              <Image
                style={styles.image}
                source={require('../../../../static/images/checked.png')}
              />
            }
            uncheckedIcon={
              <Image
                style={styles.image}
                source={require('../../../../static/images/unchecked.png')}
              />
            }
            checked={taskStatus}
            onPress={() => onCheckBoxClick()}
            containerStyle={{
              padding: 0,
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 0,
              marginRight: 0,
            }}
          />
        )}
      </View>
      <View style={{flex: 2}}>
        <View style={styles.flexContainer}>
          <View style={styles.textWrapper}>
            {props.data.name.trim() !== '' && (
              <Edit removeTask={props.removeTask} data={props.data} />
            )}
            {props.data.name.trim() === '' && (
              <Add
                addTask={props.addTask}
                removeTask={props.removeTask}
                data={props.data}
              />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    backgroundColor: Colors.White,
    shadowColor: Colors.ShadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginBottom: 1.2,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 5,
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    marginLeft: 10,
    flexGrow: 1,
  },
  image: {
    width: 35,
    height: 35,
  },
});

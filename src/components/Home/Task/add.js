import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Input} from 'react-native-elements';
import {TextField} from 'react-native-material-textfield';

import Colors from '../../../styles/Colors';

export default function AddTask(props) {
  const [taskName, updateTaskName] = useState('');

  const [errors, updateErrors] = useState({});

  const onSubmit = () => {
    let errors = {};
    if (!taskName) {
      errors.taskName = 'Should not be empty';
    } else {
      let data = {
        id: props.data.id,
        type: 'Add',
        name: taskName,
      };
      props.addTask(data);
    }
    updateErrors(errors);
  };

  return (
    <View style={styles.mainFlexConatiner}>
      <View style={{flex: 2}}>
        <TextField
          labelTextStyle={{
            fontWeight: '400',
          }}
          labelFontSize={16}
          fontSize={18}
          autoCapitalize="none"
          autoCorrect={false}
          enablesReturnKeyAutomatically={true}
          onChangeText={(e) => {
            updateTaskName(e);
          }}
          returnKeyType="next"
          label="Task Name"
          textColor={Colors.Black}
          baseColor={Colors.GrayDark}
          tintColor={Colors.Red}
          error={errors.taskName}
          activeLineWidth={2}
        />
      </View>

      <TouchableOpacity onPress={onSubmit}>
        <Image
          style={styles.imageButton}
          source={require('../../../../static/images/donebtn.png')}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          let data = {
            id: props.data.id,
            type: 'Add',
          };
          props.removeTask(data);
        }}>
        <Image
          style={styles.imageButton}
          source={require('../../../../static/images/deletebtn.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainFlexConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.Red,
  },
  description: {
    color: Colors.Black,
  },
  imageButton: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  inputContainerStyle: {
    borderBottomColor: Colors.GrayDark,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.Black,
    minHeight: 30,
  },
  containerStyle: {
    paddingHorizontal: 0,
  },
});

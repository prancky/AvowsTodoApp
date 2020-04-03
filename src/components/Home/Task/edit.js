import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../../../styles/Colors';

export default function EditTask(props) {
  return (
    <View style={styles.mainFlexConatiner}>
      <View>
        <Text style={styles.name}>Task Name</Text>
        <Text style={styles.description}>{props.data.name}</Text>
      </View>
      <View style={styles.flexContainer}>
        {/*<TouchableOpacity
          onPress={() => {
            props.updateTask(props.data.id);
          }}>
          <Image
            style={styles.imageButton}
            source={require('../../../../static/images/editbtn.png')}
          />
        </TouchableOpacity>*/}
        <TouchableOpacity
          onPress={() => {
            props.removeTask(props.data.id);
          }}>
          <Image
            style={styles.imageButton}
            source={require('../../../../static/images/deletebtn.png')}
          />
        </TouchableOpacity>
      </View>
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
});

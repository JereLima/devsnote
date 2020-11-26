import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Image,
  FlatList,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default ({data, index, onPress}) => {
  return (
    <TouchableHighlight style={styles.flat} onPress={() => onPress(index)}>
      <Text style={styles.textnote}>{data.title}</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  flat: {
    flex: 1,
    marginTop: 5,
    padding: 15,
    width: '100%',
    backgroundColor: '#8b8c89',
  },
  textnote: {
    fontSize: 25,
    color: '#ffffff'
  }
});

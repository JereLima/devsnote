import {useSelector, useDispatch} from 'react-redux';
import {useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, SafeAreaView, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  State,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';

export default () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const list = useSelector((state) => state.notes.list);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState('new');

  useEffect(() => {
    if (route.params?.key != undefined && list[route.params.key]) {
      setStatus('edit');
      setTitle(list[route.params.key].title);
      setBody(list[route.params.key].body);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação',
      headerRight: () => (
        <TouchableOpacity
          underlayColor="transparent"
          onPress={handleSaveButton}
          style={{padding: 10}}>
          <Image
            source={require('../assets/save.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      ),

      headerLeft: () => (
        <TouchableOpacity style={{padding: 10}} onPress={handleCloseButton}>
          <Image
            source={require('../assets/close.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      ),
    });
  }, [status, title, body]);

  const handleCloseButton = () => {
    navigation.goBack();
  };

  const handleSaveButton = () => {
    if (title == '' && body == '') {
      alert('Nada para salvar ainda 😐');
    } else if (title == '') {
      alert('Você esqueceu o Titulo 😅');
    } else if (body == '') {
      alert('Voce não anotou nada ainda 😅');
    } else {
      if (status == 'edit') {
        dispatch({
          type: 'EDIT_NOTE',
          payload: {
            key: route.params.key,
            title,
            body,
          },
        });
      }
      dispatch({
        type: 'ADD_NOTE',
        payload: {title, body},
      });
      
      navigation.goBack();
    }
  };

  const handleDeletNote = () => {
    dispatch({
      type: 'DEL_NOTE',
      payload: {key:route.params.key}
    });
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
        <TextInput
          value={title}
          placeholder="Titulo"
          style={styles.textInput}
          onChangeText={(t) => setTitle(t)}
          autoFocus={true}
        />
        <TextInput
          value={body}
          onChangeText={(t) => setBody(t)}
          multiline={true}
          textAlignVertical="top"
          placeholder="Anotação"
          style={styles.textInputBody}
        />        
      {status === 'edit' &&
        
          <TouchableOpacity style={styles.del} onPress={handleDeletNote}> 
            <Text style={styles.textDel}> Excluir </Text>
          </TouchableOpacity>
        }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    minWidth: '90%',
    width: '90%',
    height: 50,
    fontSize: 25,
    padding: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInputBody: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    minWidth: '90%',
    width: '90%',
    maxWidth: '90%',
    fontSize: 25,
    padding: 10,
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  del: {
    width:400,
    backgroundColor: '#ff3333',
    height: 40,
    justifyContent:'center',
    alignItems:'center'
  },
  textDel: {
    color: 'white',
    fontSize:18
  },
});

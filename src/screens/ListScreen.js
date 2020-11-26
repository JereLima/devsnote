import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, SafeAreaView, StyleSheet, Button, Image, FlatList } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux'
import NoteItem from '../components/NoteItem'

export default () => {
    const navigation = useNavigation();
    const list = useSelector(state => state.notes.list)
    //const list = []
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:'Notas',
            headerRight: () => (
                <TouchableOpacity  onPress={()=>navigation.navigate('EditNote')}>
                   <Image source={require('../assets/more.png')} style={{width:24, height:24, margin:10}} /> 
                </TouchableOpacity>
            )
        })
    }, [])

    const handleNotePress = (index) => {
        navigation.navigate('EditNote', {
            key:index
        })
    }

    return(
        <SafeAreaView style={styles.container}>
            {list.length > 0 && 
                <FlatList
                    data={list}
                    renderItem={({item, index})=>(
                    <NoteItem 
                        data={item}
                        index={index}
                        onPress={handleNotePress}
                        />
                    )}
                    keyExtractor={(item, index)=>index.toString()}
            />
            }
            {list.length == 0 && 
                <View style={styles.nonotes}>
                    <Image source={require('../assets/note.png')} style={{margin:5, width:100, height:100}} />
                    <Text style={{color:'#fff', fontWeight:'bold', fontSize:20}}>Nenhuma nota a exibir</Text>
                </View>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    nonotes:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ccc',
        width:'100%',
        height:'100%'
    }
})
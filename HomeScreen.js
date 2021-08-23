/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {AsyncStorage} from 'react-native';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const HomeScreen = ({navigation}) => {
  //   const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = React.useState([]);
  const [input, setInput] = useState('');
  const [modalVisible, setModalVisible] = React.useState(false);
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // };

  const AddItem = async () => {
    try {
      // if (text.length > 0) {
      setModalVisible(!modalVisible);
      console.log('Input', input);

      text.push(input);
      await AsyncStorage.setItem('dd', JSON.stringify(text));
      setInput('');
      GetItem();
      // }
    } catch (error) {
      console.log('Error saving data', error);
    }
  };

  const GetItem = async () => {
    let getTask;
    try {
      getTask = await AsyncStorage.getItem('dd');
      setText(JSON.parse(getTask));
    } catch (error) {
      console.log('Error saving data', error);
    }
    console.log('str=====', JSON.parse(getTask));
  };

  const onDelete = async t => {
    let filtered = text.filter(te => te !== t);
    setText(filtered);
    await AsyncStorage.setItem('dd', JSON.stringify(filtered));
    console.log('text', filtered);
  };

  useEffect(() => {
    GetItem();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: 30,
      }}>
      <Button
        title="Add New Task"
        onPress={() => {
          setModalVisible(true);
        }}
      />

      {text ? (
        <ScrollView style={styles.scrollView}>
          {text.map((t, i) => {
            return (
              <View style={styles.taskView}>
                <TouchableOpacity
                  style={styles.delete}
                  onPress={() => onDelete(t)}>
                  <Text style={{color: 'white', textAlign: 'center'}}>X</Text>
                </TouchableOpacity>
                <Text key={i} style={styles.text2}>
                  {t}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      ) : (
        <Text style={{textAlign: 'center', marginVertical: 20}}>
          No tasks to do!
        </Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Hello World!</Text> */}

            <TextInput
              style={styles.input}
              onChangeText={e => setInput(e)}
              placeholder="Input task text"
            />
            {/* <Text>{input}</Text> */}
            <Pressable
              disabled={!input}
              style={[styles.button, styles.buttonOpen]}
              onPress={() => {
                AddItem();
              }}>
              <Text style={styles.textStyle}>Create Task</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setInput('');
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
      {/* <TouchableOpacity style={styles.box}>
        <Text style={styles.text} onPress={() => Alert.alert('Hi! Beautiful')}>
          Touch here
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  box: {
    width: 150,
    marginTop: 5,
    textAlign: 'center',
    padding: 15,
    backgroundColor: 'aqua',
  },
  delete: {
    padding: 2.5,
    width: 22,
    // height: 21,
    color: 'white',
    borderRadius: 15,
    backgroundColor: 'orangered',
  },
  text2: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'silver',
    // marginVertical: 5,
    width: '100%',
    // padding: 5,
    // marginVertical: 10,
    fontSize: 19,
  },
  taskView: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'silver',
    marginTop: 5,
    padding: 5,
    borderRadius: 15,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
    marginVertical: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.6,
    borderRadius: 5,
    padding: 10,
  },
  scrollView: {
    width: '100%',
    margin: 10,
    padding: 15,
  },
});

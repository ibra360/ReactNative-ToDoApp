/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
// import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Button,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const DetailsScreen = ({navigation}) => {
  //   const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const [text, setText] = React.useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <TextInput
        style={styles.input}
        onChangeText={e => {
          setText(e.target.value);
        }}
        placeholder="Input task text"
      />
      <Button title="Add Task" onPress={() => navigation.navigate('Home')} />
      {/* <Button
        title="Go to Contact"
        onPress={() => navigation.navigate('Contact')}
      /> */}
    </View>
  );
};

export default DetailsScreen;
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.6,
    borderRadius: 5,
    padding: 10,
  },
});

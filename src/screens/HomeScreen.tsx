import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DarkMode from '../modules/DarkMode';

function HomeScreen() {
  const [isDarkMode, setIsDarkMode] = useState<null | boolean>(null);

  const handleDarkMode = async () => {
    const deviceIsDarkMode = await DarkMode.isDarkMode();
    setIsDarkMode(deviceIsDarkMode);
  };

  useEffect(() => {
    handleDarkMode();
  }, []);

  const refreshHandler = async () => {
    handleDarkMode();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <Pressable
          style={({pressed}) => [
            styles.refreshButton,
            {opacity: pressed ? 0.65 : 1},
          ]}
          onPress={refreshHandler}>
          <Icon name="refresh-ccw" size={20} color="#00008B" />
          <Text style={styles.refreshText}>refresh</Text>
        </Pressable>
        <Text style={styles.title}>Native Modules examples</Text>
        <Text style={styles.text}>{`Dark mode: ${
          isDarkMode ? 'on' : 'off'
        }`}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  content: {
    backgroundColor: Colors.lighter,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: 'black',
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: 'black',
  },
  refreshButton: {
    marginLeft: 'auto',
    marginTop: 15,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#00008B',
    borderWidth: 1,
    padding: 4,
    borderRadius: 10,
  },
  refreshText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#00008B',
  },
});

export default HomeScreen;

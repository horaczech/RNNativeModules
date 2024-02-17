import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DarkMode from './modules/DarkMode';

function App() {
  const [isDarkMode, setIsDarkMode] = useState<null | boolean>(null);

  useEffect(() => {
    (async () => {
      const deviceIsDarkMode = await DarkMode.isDarkMode();
      setIsDarkMode(deviceIsDarkMode);
    })();
  }, []);

  const backgroundColor = isDarkMode ? Colors.darker : Colors.lighter;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor}]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor}}>
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
  },
  title: {
    fontSize: 22,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;

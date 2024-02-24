import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DarkMode from '../modules/DarkMode';
import {RootStackScreenProps} from '../types/navigation.ts';

function HomeScreen({navigation}: RootStackScreenProps<'Home'>) {
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
        <View style={styles.item}>
          <Text style={styles.text}>{`Dark mode: ${
            isDarkMode ? 'on' : 'off'
          }`}</Text>
        </View>
        <Pressable style={styles.item}>
          <Text
            onPress={() => navigation.navigate('NewCalendarEvent')}
            style={styles.itemText}>
            Add event to calendar
          </Text>
        </Pressable>
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
  item: {
    marginTop: 20,
    borderBottomColor: '#5e5e5e',
    borderBottomWidth: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ececec',
  },
  itemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default HomeScreen;

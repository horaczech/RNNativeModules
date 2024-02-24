import React, {useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const Header = ({route}: NativeStackHeaderProps) => {
  const screenTitle = useMemo(() => {
    switch (route.name) {
      case 'Home':
        return 'Home';
      case 'NewCalendarEvent':
        return 'New Event';
      default:
        return route.name;
    }
  }, [route.name]);

  return (
    <View style={styles.header}>
      <Text style={styles.text}>{screenTitle}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    backgroundColor: '#293c67',
  },
  text: {
    color: '#fff',
    fontSize: 23,
    textAlign: 'center',
  },
});

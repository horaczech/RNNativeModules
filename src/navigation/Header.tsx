import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';

const Header = ({route}: NativeStackHeaderProps) => {
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{route.name}</Text>
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

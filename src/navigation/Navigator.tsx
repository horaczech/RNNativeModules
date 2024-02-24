import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import Header from './Header';
import NewCalendarEventScreen from '../screens/NewCalendarEventScreen';
import {RootNavigatorParamList} from '../types/navigation.ts';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: Header,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="NewCalendarEvent"
        component={NewCalendarEventScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;

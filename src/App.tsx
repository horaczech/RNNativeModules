import React from 'react';
import Navigation from './navigation';
import {StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.lighter} />
      <Navigation />
      <Toast />
    </>
  );
}

export default App;

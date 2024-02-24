import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Controller, useForm} from 'react-hook-form';
import Calendar from '../modules/Calendar';
import Toast from 'react-native-toast-message';
import {RootStackScreenProps} from '../types/navigation.ts';
import {requestCalendarPermission} from '../utils/permissions.ts';

type EventForm = {
  title: string;
  location: string;
};

function NewCalendarEventScreen({
  navigation,
}: RootStackScreenProps<'NewCalendarEvent'>) {
  const {control, handleSubmit} = useForm<EventForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const submitHandler = async (data: EventForm) => {
    try {
      const havePermission = await requestCalendarPermission();
      if (!havePermission) {
        throw new Error('No permission');
      }
      await Calendar.addEvent(data.title, data.location);
    } catch (e) {
      console.log('error', e);
      Toast.show({
        type: 'error',
        text1: 'Error',
      });
    } finally {
      Toast.show({
        type: 'success',
        text1: `Event ${data.title} added`,
      });
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.content}>
        <Text style={styles.title}>Title</Text>
        <Controller
          control={control}
          render={({field: {onChange, ...otherFieldProps}}) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              {...otherFieldProps}
            />
          )}
          name="title"
          defaultValue=""
        />
        <Text style={styles.title}>Location</Text>
        <Controller
          control={control}
          render={({field: {onChange, ...otherFieldProps}}) => (
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              {...otherFieldProps}
            />
          )}
          name="location"
          defaultValue=""
        />
        <Button title="Submit" onPress={handleSubmit(submitHandler)} />
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
    marginHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default NewCalendarEventScreen;

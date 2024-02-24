import {Platform, PermissionsAndroid} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export async function requestCalendarPermission() {
  if (Platform.OS === 'ios') {
    const res = await check(PERMISSIONS.IOS.CALENDARS_WRITE_ONLY);
    if (res !== RESULTS.GRANTED) {
      const requestRes = await request(PERMISSIONS.IOS.CALENDARS_WRITE_ONLY);
      return requestRes === RESULTS.GRANTED;
    }
    return false;
  } else {
    const res = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      {
        title: 'Calendar Permission',
        message: 'This app needs access to your calendar',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return res === PermissionsAndroid.RESULTS.GRANTED;
  }
}

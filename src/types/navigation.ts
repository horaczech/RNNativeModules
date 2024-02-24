import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootNavigatorParamList = {
  Home: undefined;
  NewCalendarEvent: undefined;
};

export type RootStackScreenProps<T extends keyof RootNavigatorParamList> =
  NativeStackScreenProps<RootNavigatorParamList, T>;

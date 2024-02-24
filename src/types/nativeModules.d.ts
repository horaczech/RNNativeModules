import 'react-native';

interface DarkModeInterface {
  isDarkMode(): Promise<boolean>;
}

interface CalendarInterface {
  addEvent(name: string, location: string): Promise<void>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    DarkMode: DarkModeInterface;
    Calendar: CalendarInterface;
  }
}

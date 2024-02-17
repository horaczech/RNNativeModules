import 'react-native';

interface DarkModeInterface {
  isDarkMode(): Promise<boolean>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    DarkMode: DarkModeInterface;
  }
}

//
//  RCTDarkModeModule.h
//  RNNativeModules
//
//  Created by Petr Horacek on 17.02.2024.
//
#import <React/RCTBridgeModule.h>

#ifndef RCTDarkModeModule_h
#define RCTDarkModeModule_h

@interface RCT_EXTERN_MODULE(DarkMode, NSObject)
RCT_EXTERN_METHOD(isDarkMode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end

#endif /* RCTDarkModeModule_h */

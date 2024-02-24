// CalendarManagerBridge.m
#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Calendar, NSObject)

RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
@end

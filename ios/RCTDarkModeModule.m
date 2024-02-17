#import "RCTDarkModeModule.h"

@implementation DarkMode : NSObject

//RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(isDarkMode:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if (@available(iOS 12.0, *)) {
        switch (UITraitCollection.currentTraitCollection.userInterfaceStyle) {
            case UIUserInterfaceStyleDark:
                resolve(@(YES));
                break;
            case UIUserInterfaceStyleLight:
            case UIUserInterfaceStyleUnspecified:
            default:
                resolve(@(NO));
                break;
        }
    } else {
        resolve(@(NO));
    }
}

@end

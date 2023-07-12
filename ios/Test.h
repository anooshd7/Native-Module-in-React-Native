#ifdef __cplusplus
#import "react-native-test.h"
#endif

#ifdef RCT_NEW_ARCH_ENABLED
#import "RNTestSpec.h"

@interface Test : NSObject <NativeTestSpec>
#else
#import <React/RCTBridgeModule.h>

@interface Test : NSObject <RCTBridgeModule>
#endif

@end

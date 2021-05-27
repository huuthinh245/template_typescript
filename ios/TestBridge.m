//
//  TestBridge.m
//  mpds
//
//  Created by Thinh on 15/04/2021.
//
#import <React/RCTBridgeModule.h>
@interface RCT_EXTERN_MODULE(Test, NSObject)
RCT_EXTERN_METHOD(addEvent:(NSString *)name location:(NSString *)location date:(nonnull NSNumber *)date)
RCT_EXTERN_METHOD(multiply:(float)a withB:(float)b
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)
@end


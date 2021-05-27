//
//  Test.swift
//  mpds
//
//  Created by Thinh on 15/04/2021.
//

import Foundation
@objc(Test)
class Test:NSObject {
  @objc(addEvent:location:date:)
  func addEvent(_ name: String, location: String, date: NSNumber) -> Void {
    // Date is ready to use!
    print("\("Thinh")-\(location)-\(date)" )
  }
  
  @objc(multiply:withB:withResolver:withRejecter:)
  func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
      resolve(a*b)
  }
  @objc func checkStatus() {
//   PTDispatcher.share
  }
  
}

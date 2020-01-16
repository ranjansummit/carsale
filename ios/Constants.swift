////
////  Constants.swift
////  Bhatbhate_react
////
////  Created by sunil-71 on 9/17/19.
////  Copyright © 2019 Facebook. All rights reserved.
////
//
//import Foundation
//import EsewaSDK
//struct Constants {
//  
//  static let schemeDevelopment = true // true for uat false for production
//  
//  static let clientId = 1
//  
////  static var webSocketURL: WebSocket {
////    return schemeDevelopment ? WebSocket(url: URL(string: "ws://staging.andmine.com:6969/")!): WebSocket(url: URL(string: "ws://staging.andmine.com:7979/")!)
////  }
//  
//  static var clientSecret:String{
//    return schemeDevelopment ? "JzSUAyr1T6hy43x9X3InoEyMVrxnbryWlRKAP7CV" : "W8ZZci58qPeERpaIKyA38GDesnpTnXXxrNxxnIL2"
//  }
//  
//  static var esewaRedirectURL:String{
//    return schemeDevelopment ? "http://uat.bhatbhate.net/api/v1/esewa/redirect" : "http://bhatbhate.net/api/v1/esewa/redirect"
//  }
//  
////  struct Esewa {
////    //static let sandbox = true // true for test account false for real account
////    static var merchantID:String { return schemeDevelopment ? "KBYXFAkSBRFZMRYWA1sHDhYNCBYXFAkSBRE=" : "JxsEAwMbChEcXz01WiQgRicxJCcnPyAnLg=="}
////    static var merchantSecret:String{return schemeDevelopment ? "ERYWA08QBAhXERYWA08QBAhXERYWA08QBAg=" : "DQcRB1tcRAcRBAcHHwAHDksXAAdLFA4eRQscEV0HHwAHCQ0YERY=" }
////
////  }
//  
//  struct Esewa {
//    static let sandbox = true // true for test account false for real account
//    static var merchantID:String { return Esewa.sandbox ? "KBYXFAkSBRFZMRYWA1sHDhYNCBYXFAkSBRE=" : "JxsEAwMbChEcXz01WiQgRicxJCcnPyAnLg=="}
//    static var merchantSecret:String{return Esewa.sandbox ? "ERYWA08QBAhXERYWA08QBAhXERYWA08QBAg=" : "" }
//    static var environment: EsewaSDKEnvironment{
//      return sandbox ? .development : .production
//    }
//  }
//}

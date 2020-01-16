////
////  EsewaViewController.swift
////  Bhatbhate_react
////
////  Created by sunil-71 on 9/17/19.
////  Copyright © 2019 Facebook. All rights reserved.
////
//
//import Foundation
//
//import EsewaSDK
//
// @objc(EsewaGateway)
// class EsewaGateway: NSObject{
//
//     var productID: String!
//
//   // Keep it in class instance
//    var sdk: EsewaSDK!
//
//  @objc
//  static var esewaSuccess = false
//
//  static var esewaResponse:[String: String]? = nil
//
//  var appdelegate : AppDelegate = (UIApplication.shared.delegate as? AppDelegate)!
//
// //  let viewController = UIApplication.shared.keyWindow!.rootViewController as! YourViewController
//
// //  let objViewController =  UIApplication.shared.keyWindow!.rootViewController
//
//
//   @objc
//   static var isOn = false
//
//
////  , productId: String
//    @objc
//  func turnOn(_ amount: String, productId: String)
//      {
//      EsewaGateway.isOn = true
//      // print("Bulb is now ON")
////       print("values", amount, productId)
//      let dispatch = DispatchQueue.main.async {
//        let ad = UIApplication.shared.delegate as! AppDelegate
//        self.sdk = EsewaSDK(inViewController: ad.window.rootViewController!, environment: Constants.Esewa.environment, delegate: self)
////     self.sdk.initiatePayment(merchantId: Constants.Esewa.merchantID, merchantSecret: Constants.Esewa.merchantSecret, productName: "Credit Purchase", productAmount: amount, productId: productId, callbackUrl: Constants.esewaRedirectURL)
//       self.sdk.initiatePayment(merchantId: "JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R", merchantSecret: "BhwIWQQADhIYSxILExMcAgFXFhcOBwAKBgAXEQ==", productName: "Credit Purchase", productAmount: "10", productId: productId, callbackUrl: Constants.esewaRedirectURL)
//      }
//    }
//
//   @objc
//   func turnOff() {
//     EsewaGateway.isOn = false
//     print("Bulb is now OFF")
//   }
//
//   @objc
//   func getStatus(_ callback: RCTResponseSenderBlock) {
//
////     callback([NSNull(), EsewaGateway.isOn])
//    callback([NSNull(), EsewaGateway.esewaSuccess])
//
//   }
//
//   @objc
//   static func requiresMainQueueSetup() -> Bool {
//     return true
//   }
// }
// func saveResponse(){
//  EsewaGateway.esewaSuccess = true
//  print("success", EsewaGateway.esewaSuccess)
//}
//
//func failureResponse(){
//  EsewaGateway.esewaSuccess = false
//}
//   extension EsewaGateway:EsewaSDKPaymentDelegate{
//     func onEsewaSDKPaymentSuccess(info: [String : Any]) {
//      print("response", info)
//      EsewaGateway.esewaResponse = info as? [String:String]
//      print("esewa response", EsewaGateway.esewaResponse!)
//      saveResponse()
//     }
//
//     func onEsewaSDKPaymentError(errorDescription: String) {
//       print("esewa failure response",errorDescription)
//      failureResponse()
//     }
//   }

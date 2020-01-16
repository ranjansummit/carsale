import React, {Component} from 'react';
import {Router, Scene} from 'react-native-router-flux';
import {
  StyleSheet,
  Platform,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Splash from './components/Splash/Splash';

import NavBarComponent from './components/NavBar/NavBarComponent';
import NavBarSell from './components/NavBar/NavBarSell';
import Search from './components/NavBar/SearchBuy';
import SearchSell from './components/NavBar/SearchSell';
import Notification from './components/NavBar/Notification';
import Like from './components/NavBar/Like';

import TabBarComponent from './components/TabBar/TabBarComponent';
import AddVehicle from './components/TabBar/AddVehicle/AddVehicle';
import Add1 from './components/TabBar/AddVehicle/Add1';
import Add2 from './components/TabBar/AddVehicle/Add2';
import NavBarAddVehicle from './components/TabBar/AddVehicle/NavBarAddVehicle';
import Preview from './components/TabBar/AddVehicle/Preview';

import BuyList from './components/TabBar/PreLogin/BuyList';
import BuyDetails from './components/TabBar/PreLogin/BuyDetails';
import LoginFirst from './components/TabBar/PreLogin/LoginFirst';
import PreSearch from './components/TabBar/PreLogin/PreSearch';
import PreLoginNavBar from './components/TabBar/PreLogin/PreLoginNavBar';

// import FBLogin from './components/Login/FBLogin';
import Login from './components/Login/Login';

import ForgotPassword from './components/Login/ForgotPassword';
import ResetPassword from './components/Login/ResetPassword';
import CreateAccount from './components/Login/CreateAccount';
import VerifyUser from './components/Login/VerifyUser';

import Storage from './components/storage/Storage';

import LoggedinBuy from './components/TabBar/LoginBuy/LoggedinBuy';
import LoggedinDetails from './components/TabBar/LoginBuy/LoggedinDetails';
import SellerInfo from './components/TabBar/LoginBuy/SellerInfo';

import LikeDetails from './components/NavBar/LikeDetails';

import Sell from './components/TabBar/Sell/Sell';
import SellDetails from './components/TabBar/Sell/SellDetails';

// import OpenCamera from './components/TabBar/AddVehicle/CameraOpen';
import OpenCamera1 from './components/TabBar/AddVehicle/Camera/OpenCamera1';
import OpenCamera2 from './components/TabBar/AddVehicle/Camera/OpenCamera2';
import OpenCamera3 from './components/TabBar/AddVehicle/Camera/OpenCamera3';
import OpenCamera4 from './components/TabBar/AddVehicle/Camera/OpenCamera4';
import NavBarCamera from './components/TabBar/AddVehicle/Camera/NavBarCamera';

import Credits from './components/TabBar/Credits/Credits';
import Others from './components/TabBar/Others/Others';
import HelpAndFeedback from './components/TabBar/Others/HelpAndFeedback';

import Profile from './components/profile/Profile';
import ChangePassword from './components/profile/ChangePassword';
import NavBar from './components/profile/NavBar';

import IconColor from './components/common/Button/IconColor';
import {TermsConditions} from './components/TabBar/Others/TermsConditions';
import Theme from './components/common/Utility/Colors';

import Edit1 from './components/TabBar/EditVehicle/Edit1';
import Edit2 from './components/TabBar/EditVehicle/Edit2';
import Edit3 from './components/TabBar/EditVehicle/Edit3';
import NavBarEditVehicle from './components/TabBar/EditVehicle/NavBarEditVehicle';
import EditPreview from './components/TabBar/EditVehicle/EditPreview';

import TransactionHistory from './components/TabBar/Others/TransactionHistory';
import AboutUsClass from './components/TabBar/Others/AboutUs';

import PayCash from './components/TabBar/Credits/Cash/PayCash';
import PayEsewa from './components/TabBar/Credits/Esewa/PayEsewa';
import ProceedEsewa from './components/TabBar/Credits/Esewa/ProceedEsewa';
import GenerateQR from './components/TabBar/Credits/SellCredit/GenerateQR';
import ScanQRSell from './components/TabBar/Credits/SellCredit/ScanQRSell';
import SwitchCode from './components/TabBar/Credits/SellCredit/SwitchCode';

import ScanToPay from './components/TabBar/Credits/ScanQR/ScanToPay';
import EnterCode from './components/TabBar/Credits/ScanQR/EnterCode';
// var backButtonPressedOnceToExit = false;

let screenHeight = Dimensions.get('window').height;

class RouterComponent extends Component {
  constructor() {
    super();
    this.state = {
      logggedIn: false,
    };
  }
  onLeftPressed() {
    console.log('back');
    Promise.resolve(Storage.getLoggedin()).then(function(value) {
      // console.log("rantest valuesss", value);
      if (value === '0') {
        return Actions.buyl();
      } else {
        console.log('login');
        return Actions.loggedinBuy();
      }
    });
  }
  // backpressed() {
  //   // Actions.edit3();
  // }
  // filterIcon = () => (
  //   <TouchableHighlight onPress={() => Actions.buyl}>
  //     <Icon name="arrow-left" size={30} />
  //   </TouchableHighlight>
  // );
  render() {
    // Promise.resolve(Storage.getLoggedin()).then(function(value) {
    //   // console.log("rantest valuesss", value);
    //   if (value == "0") {
    //     this.setState({ loggedIn: false });
    //   } else {
    //     this.setState({ loggedIn: true });
    //   }
    // });
    return (
      <Router>
        <Scene key="root" tabs>
          {/* <Scene key="main" hideNavBar hideTabBar> */}
          {/* <Stack key="root" tabs> */}
          <Scene key="splash" component={Splash} hideNavBar hideTabBar />
          {/* </Scene> */}
          {/* <Scene
            key="fbLogin"
            component={FBLogin}
            // navBar={PreLoginNavBar}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
          /> */}
          <Scene
            key="buyl"
            component={BuyList}
            navBar={PreLoginNavBar}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
          />
          <Scene
            key="preSearch"
            component={PreSearch}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.buyl();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.buyl()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
          />
          <Scene
            key="buydetails"
            component={BuyDetails}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.buyl();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.buyl()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="loggedinBuy"
            component={LoggedinBuy}
            navBar={NavBarComponent}
            tabBarComponent={TabBarComponent}
          />
          <Scene
            key="loggedinDetails"
            component={LoggedinDetails}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.loggedinBuy();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.loggedinBuy()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="sellerInfo"
            component={SellerInfo}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.loggedinDetails();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.loggedinDetails()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="sell"
            component={Sell}
            navBar={NavBarSell}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}

            // onEnter={() => this.props.sellList()}
          />

          <Scene
            key="loginfirst"
            component={LoginFirst}
            navBar={NavBarComponent}
            tabBarComponent={TabBarComponent}
          />
          <Scene
            key="sellDetails"
            component={SellDetails}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.sell();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.sell()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="credits"
            component={Credits}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
          />
          <Scene
            key="payCash"
            component={PayCash}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.credits();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.credits()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="esewa"
            component={PayEsewa}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.credits();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.credits()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="proceedEsewa"
            component={ProceedEsewa}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.esewa();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.esewa()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="genQR"
            component={GenerateQR}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.credits();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.credits()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="switchCode"
            component={SwitchCode}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.scanToSell();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.scanToSell()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="scanToSell"
            component={ScanQRSell}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.genQR();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.genQR()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="scanToPay"
            component={ScanToPay}
            hideNavBar
            tabBarComponent={TabBarComponent}
          />
          <Scene
            key="enterCode"
            component={EnterCode}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.scanToPay();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.scanToPay()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="others"
            component={Others}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
          />
          <Scene
            key="about_us"
            component={AboutUsClass}
            hideTabBar
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.others();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.others()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="transactionList"
            component={TransactionHistory}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.others();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.others()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="profile"
            component={Profile}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.others();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.others()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
            tintColor="white"
            rightTitle="Change Password"
            onRight={() => {
              Actions.changePassword();
            }}
          />
          <Scene
            key="changePassword"
            component={ChangePassword}
            tabBarComponent={TabBarComponent}
            hideNavBar
            // navBar={NavBar}
            // navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.profile();
            // }}
            // rightTitle="Save Password"
            // onRight={() => {
            //   // Actions.changePassword();
            // }}
          />

          <Scene
            key="search"
            component={Search}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // // onLeft={() => {
            // //   Actions.buyl();
            // // }}
            // onLeft={this.onLeftPressed}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => this.onLeftPressed()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="searchSell"
            component={SearchSell}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.sell();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.sell()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="notify"
            component={Notification}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // // onLeft={() => {
            // //   Actions.buyl();
            // // }}
            // onLeft={this.onLeftPressed}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => this.onLeftPressed()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="like"
            component={Like}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // // onLeft={() => {
            // //   Actions.buyl();
            // // }}
            // onLeft={this.onLeftPressed}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => this.onLeftPressed()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="likeDetails"
            component={LikeDetails}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // hideTabBar
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.like();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.like()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="icon"
            component={IconColor}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.buyl();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.buyl()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="login"
            component={Login}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            hideTabBar
            tintColor="white"
            rightTitle="Cancel"
            onRight={() => {
              Actions.buyl();
            }}
            // renderRightButton={() => (
            //   <TouchableHighlight
            //     style={{marginLeft: 5}}
            //     onPress={() => Actions.buyl()}>
            //     <Icon name="arrow-right" size={25} color="white" />
            //   </TouchableHighlight>
            // )}
          />

          <Scene
            key="forgotPw"
            component={ForgotPassword}
            navigationBarStyle={styles.navigationBarStyle}
            hideTabBar
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.login();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.login()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="resetpw"
            component={ResetPassword}
            navigationBarStyle={styles.navigationBarStyle}
            hideTabBar
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.forgotPw();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.forgotPw()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="createAcc"
            component={CreateAccount}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            hideTabBar
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.login();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.login()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="verifyUser"
            component={VerifyUser}
            navigationBarStyle={styles.navigationBarStyle}
            tabBarComponent={TabBarComponent}
            hideTabBar
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.createAcc();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.createAcc()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="helpFeedback"
            component={HelpAndFeedback}
            // tabBarComponent={TabBarComponent}
            hideTabBar
            title="Help & Feedback"
            titleStyle={{textAlign: 'center', flex: 1, color: 'white'}}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.others();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.others()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
            ti
          />

          <Scene
            key="addvehicle"
            component={AddVehicle}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.sell();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.sell()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="add1"
            component={Add1}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.addvehicle();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.addvehicle()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="preview"
            component={Preview}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.add2();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.add2()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          {/* <Scene
            key="openCam"
            component={OpenCamera}
            navigationBarStyle={styles.navigationBarStyle}
            // tabBarComponent={TabBarComponent}
            hideTabBar
            leftTitle="Cancel"
            tintColor="white"
            onLeft={() => {
              Actions.add2();
            }}
          /> */}
          <Scene
            key="editPreview"
            component={EditPreview}
            tabBarComponent={TabBarComponent}
            // navBar={NavBarAddVehicle}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.edit3();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.edit3()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="edit3"
            component={Edit3}
            // hideTabBar
            tabBarComponent={TabBarComponent}
            navBar={NavBarEditVehicle}
          />

          <Scene
            key="add2"
            component={Add2}
            tabBarComponent={TabBarComponent}
            navBar={NavBarAddVehicle}
          />
          <Scene
            key="openCam1"
            component={OpenCamera1}
            // navigationBarStyle={styles.navigationBarStyle}
            // navBar={NavBarCamera}

            hideNavBar
            // tabBarComponent={TabBarComponent}
            hideTabBar
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   // if (this.props.editval === true) {
            //   //   Actions.edit3();
            //   // } else {
            //   //   Actions.add2();
            //   // }
            //   Actions.add2();
            // }}
            // onExit={() => Actions.refs.OpenCamera1.pausePreview()}
            // onBack={() => this.backpressed()}
          />
          <Scene
            key="openCam2"
            component={OpenCamera2}
            // navigationBarStyle={styles.navigationBarStyle}
            // tabBarComponent={TabBarComponent}
            hideTabBar
            hideNavBar
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.add2();
            // }}
            // onExit={() => Actions.refs.OpenCamera2.pausePreview()}
            // onLeft={() => {
            //   if (this.props.editval === true) {
            //     Actions.edit3();
            //   } else {
            //     Actions.add2();
            //   }
            // }}
          />
          <Scene
            key="openCam3"
            component={OpenCamera3}
            navigationBarStyle={styles.navigationBarStyle}
            hideTabBar
            hideNavBar
          />
          <Scene key="openCam4" component={OpenCamera4} hideTabBar hideNavBar />
          <Scene
            key="termsConditions"
            component={TermsConditions}
            hideTabBar
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.others();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.others()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />

          <Scene
            key="edit1"
            component={Edit1}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.sell();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.sell()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          <Scene
            key="edit2"
            component={Edit2}
            tabBarComponent={TabBarComponent}
            navigationBarStyle={styles.navigationBarStyle}
            // leftTitle="Cancel"
            // tintColor="white"
            // onLeft={() => {
            //   Actions.edit1();
            // }}
            renderLeftButton={() => (
              <TouchableOpacity
                style={{marginLeft: 5}}
                onPress={() => Actions.edit1()}>
                <Icon name="arrow-left" size={25} color="white" />
              </TouchableOpacity>
            )}
          />
          {/* </Stack> */}
        </Scene>
        {/* <Router ...>
     <Scene tabs>
       <Scene />        // Scene1
       <Scene key='QR' onEnter={()=>Actions.refs.QR.startCamera()} onExit={()=>Actions.refs.QR.stopCamera()} />        // Scene2
     </Scene>
   </Router> */}
      </Router>
    );
  }
}
const styles = StyleSheet.create({
  navigationBarStyle: {
    backgroundColor: Theme.colors.navyBlue,
  },
});
// const mapStateToProps = state => {
//   console.log("edit value in router", state.vehicle.editVal);
//   return {
//     addval: state.vehicle.addVal,
//     editval: state.vehicle.editVal
//   };
// };

// export default connect(
//   mapStateToProps,
//   {}
// )(RouterComponent);

export default RouterComponent;

// if (Actions.state.index === 0) {
//   return false
// }
// Actions.pop()
// return true

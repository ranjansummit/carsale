import {fork} from 'redux-saga/effects';
import {
  watchPreLoginList,
  watchPreLoginDetails,
  watchPreLoginSearch,
  watchModelList,
  watchEngineList,
  watchUserLogin,
  watchLoginList,
  watchLoginDetails,
  watchSellDetails,
  watchNotifySeller,
  watchAddWish,
  watchRemoveWish,
  watchSellList,
  watchGetWish,
  watchAddFirst,
  watchAddSecond,
  watchSaveImage1,
  watchSaveImage2,
  watchSaveImage3,
  watchSaveImage4,
  // watchAddFirst
  //publish vehicle
  watchPublishVehicle,
  watchRemoveVehicle,
  watchFirstImage,
  watchSecondImage,
  watchThirdImage,
  watchFourthImage,
  //save device image
  watchSaveDeviceImage1,
  watchSaveDeviceImage2,
  watchSaveDeviceImage3,
  watchSaveDeviceImage4,
  //edit device image
  watchEditDeviceImage1,
  watchEditDeviceImage2,
  watchEditDeviceImage3,
  watchEditDeviceImage4,
  //seller info
  watchSellerInfo,
  //1st edit
  watchEditFirst,
  watchEditSecond,
  watchRemoveLike,
  //edit button clicked
  watchEditClicked,
  //profile
  watchProfileDetails,
  watchSaveUserImage,
  //save vehicles
  watchSaveVehicles,
  watchSaveCamVehicles,
  //edit vehicles
  watchEditVehicles,
  watchEditCamVehicles,
  watchTransactionlist,
  watchDeleteTransaction,
  watchEditVehiclePrice,
  watchPreSearchVehicle,
  watchSearchVehicle,
  watchSearchOwnVehicle,
  watchMarkAsSold,
  watchRegisterUser,
  watchSaveMobile,
  watchResendCode,
  watchVerifyUser,
  watchPasswordChange,
  watchSendFeedback,
  watchForgotPassword,
  //change pw in case of forgot pw
  watchResetPassword,
  watchSaveText,
  watchGenerateQR,
  watchConfirmQR,
  watchConfirmCode,
  watchUseCoupon,
  watchGetShops,
  //to save credit
  watchSaveCredit,
  watchGenerateProductId,
  //app settings
  watchGetAppSettings,
} from './index';

export default function* rootSaga() {
  yield fork(watchPreLoginList);
  yield fork(watchPreLoginDetails);
  yield fork(watchPreLoginSearch);
  yield fork(watchModelList);
  yield fork(watchEngineList);

  yield fork(watchUserLogin);
  yield fork(watchLoginList);
  yield fork(watchLoginDetails);
  yield fork(watchSellDetails);
  yield fork(watchNotifySeller);
  yield fork(watchAddWish);
  yield fork(watchRemoveWish);
  yield fork(watchSellList);
  yield fork(watchGetWish);
  yield fork(watchAddFirst);
  yield fork(watchAddSecond);
  yield fork(watchSaveImage1);
  yield fork(watchSaveImage2);
  yield fork(watchSaveImage3);
  yield fork(watchSaveImage4);
  yield fork(watchPublishVehicle);
  yield fork(watchRemoveVehicle);
  // yield fork(watchAddFirst);
  yield fork(watchFirstImage);
  yield fork(watchSecondImage);
  yield fork(watchThirdImage);
  yield fork(watchFourthImage);
  //save device image
  yield fork(watchSaveDeviceImage1);
  yield fork(watchSaveDeviceImage2);
  yield fork(watchSaveDeviceImage3);
  yield fork(watchSaveDeviceImage4);
  //edit device image
  yield fork(watchEditDeviceImage1);
  yield fork(watchEditDeviceImage2);
  yield fork(watchEditDeviceImage3);
  yield fork(watchEditDeviceImage4);
  //seller info
  yield fork(watchSellerInfo);
  yield fork(watchEditFirst);
  yield fork(watchEditSecond);

  yield fork(watchRemoveLike);
  //edit button
  yield fork(watchEditClicked);
  yield fork(watchProfileDetails);
  yield fork(watchSaveUserImage);
  yield fork(watchSaveVehicles);
  yield fork(watchSaveCamVehicles);
  yield fork(watchEditVehicles);
  yield fork(watchEditCamVehicles);
  yield fork(watchTransactionlist);
  yield fork(watchDeleteTransaction);
  yield fork(watchEditVehiclePrice);
  yield fork(watchPreSearchVehicle);
  yield fork(watchSearchVehicle);
  yield fork(watchSearchOwnVehicle);
  yield fork(watchMarkAsSold);
  yield fork(watchRegisterUser);
  yield fork(watchSaveMobile);
  yield fork(watchResendCode);
  yield fork(watchVerifyUser);
  yield fork(watchPasswordChange);
  yield fork(watchSendFeedback);
  yield fork(watchForgotPassword);
  yield fork(watchResetPassword);
  yield fork(watchSaveText);
  yield fork(watchGenerateQR);
  yield fork(watchConfirmQR);
  yield fork(watchConfirmCode);
  yield fork(watchUseCoupon);
  yield fork(watchGetShops);
  yield fork(watchSaveCredit);
  yield fork(watchGenerateProductId);
  yield fork(watchGetAppSettings);
}

/* eslint-disable no-unused-vars */
/* eslint-disable radix */
import {LoginApi, SaveVehicleApi, PreloginApi} from './Api';
import {Alert} from 'react-native';
import Constant from '../components/constant/Constant';

function publishvehicle(id) {
  let formdata = new FormData();
  formdata.append('id', id);
  console.log('payload', formdata);
  const res = LoginApi.post('v1/publish-vehicle', formdata)
    .then(response => {
      console.log('response test', response.data.message);
      return response.data;
    })
    .catch(function(e) {
      let error_msg = e.response.data.message;
      console.log(e.response);
      // Alert.alert(error_msg);
      return e.response.data;
    });

  return res;
}

function removevehicle(id) {
  const res = LoginApi.delete('v1/vehicles/' + id)
    .then(response => {
      console.log('remove vehicle response', response.data.message);
      return response.data.message;
    })
    .catch(function(e) {
      let error_msg = e.response.data.message;
      // Alert.alert(error_msg);
      return e.response.data.error;
    });

  return res;
}

function saveVehicles(formData) {
  console.log('formdata in service', formData);
  const res = SaveVehicleApi.post('v1/vehicles', formData)
    .then(response => {
      console.log('save vehicles response', response.data);
      // return response.data.error;
      return response.data;
    })
    .catch(function(e) {
      // let error_msg = e.response.data.message;
      // Alert.alert(error_msg);
      // return e.response.data;
      // return response.data;
      console.log('error save vehicle', e.response);
      return e.response.data;
    });
  return res;
}

function editVehiclePrice(formData) {
  const res = LoginApi.post('v1/vehicle/price/edit', formData)
    .then(response => {
      console.log('edited price of vehicle', response.data);
      return response.data;
    })
    .catch(function(e) {
      let error_msg = e.response.data;
      console.log('error', e);
      return e.response.data;
    });

  return res;
}
function presearchVehicle(brand, model, price, rating, order) {
  console.log('brand', brand);
  console.log('model', model);
  console.log('price', price);
  console.log('rating', rating);
  console.log('order', order);
  const res = PreloginApi.get('v1/search/prelogin', {
    params: {
      brand: brand.toString(),
      model: model.toString(),
      price: price,
      rating: rating,
      order_by: order.toString(),
      offset: 0,
      limit: 100,
      client_id: Constant.ClientID.toString(),
      client_secret: Constant.ClientSecret,
    },
  })
    .then(response => {
      console.log('pre search vehicle', response.data);
      return response.data;
    })
    .catch(function(e) {
      let error_msg = e.response.data;
      console.log(e.response.data);
      return e.response.data;
    });

  return res;
}
function searchVehicle(brand, model, price, rating, order) {
  console.log('brand', brand);
  console.log('model', model);
  console.log('price', price);
  console.log('rating', rating);
  console.log('order', order);
  const res = LoginApi.get('v1/search', {
    params: {
      brand: brand.toString(),
      model: model.toString(),
      price: parseInt(price),
      rating: parseInt(rating),
      order_by: order.toString(),
      offset: 0,
      limit: 50,
    },
  })
    .then(response => {
      console.log('search vehicle', response.data);
      return response.data;
    })
    .catch(function(e) {
      let error_msg = e.response.data;
      console.log(e);
      return e.response.data;
    });

  return res;
}

function searchOwnVehicle(brand, model, price, rating, order) {
  console.log('brand', brand);
  console.log('model', model);
  console.log('price', price);
  console.log('rating', rating);
  console.log('order', order);
  const res = LoginApi.get('v1/search', {
    params: {
      brand: brand.toString(),
      model: model.toString(),
      price: parseInt(price),
      rating: parseInt(rating),
      order_by: order.toString(),
      offset: 0,
      limit: 50,
      own: 'own',
    },
  })
    .then(response => {
      console.log('search own vehicle', response.data);
      return response.data;
    })
    .catch(function(e) {
      let error_msg = e.response.data;
      console.log(e);
      return e.response.data;
    });

  return res;
}

function markedSoldService(id) {
  const res = LoginApi.delete('v1/vehicle/sold' + id)
    .then(response => {
      console.log('mark vehicle as sold response', response.data.message);
      return response.data.message;
    })
    .catch(function(e) {
      let error_msg = e.response.data.message;
      // Alert.alert(error_msg);
      return e.response.data.error;
    });

  return res;
}

export const VehicleService = {
  publishvehicle,
  removevehicle,
  saveVehicles,
  editVehiclePrice,
  presearchVehicle,
  searchVehicle,
  searchOwnVehicle,
  markedSoldService,
};

/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
// import { AsyncStorage } from "react-native";
// import AsyncStorage from "@react-native-community/async-storage";
import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  // static async removeCredits(credits) {
  //   try {
  //     await AsyncStorage.removeItem(credits);
  //     return true;
  //   } catch (exception) {
  //     return false;
  //   }
  // }
  static async logout() {
    console.log('logout');
    AsyncStorage.clear();
  }
  static async settokenType(token) {
    // value = '';
    try {
      var value = JSON.stringify(token);
      // value = token;
      console.log('testing man' + value);

      // await AsyncStorage.setItem('tokentype', token);
      await AsyncStorage.setItem('tokentype', value);
      console.log('Data saved successfully');
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async retrieveSessionToken() {
    try {
      let token = await AsyncStorage.getItem('tokentype');
      if (token !== null) {
        console.log('Session tokens', token);
        return token;
      }
    } catch (error) {
      console.log('Error while storing the token');
    }
  }

  static async savebearer(bearer) {
    value = '';
    try {
      value = bearer;
      // console.log("testing man" + bearer);
      console.log('testing man', value);

      await AsyncStorage.setItem('bearer', bearer);
      console.log('Data saved successfully');
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getBearertoken() {
    try {
      let token = await AsyncStorage.getItem('bearer');
      if (token !== null) {
        console.log('Session tokenRanjantest', token);
        return token;
      }
    } catch (error) {
      console.log('Error while storing the token');
    }
  }

  static async setLogedin(logedin) {
    value = '0';
    try {
      value = logedin;

      await AsyncStorage.setItem('logedin', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getLoggedin() {
    try {
      let token = await AsyncStorage.getItem('logedin');
      if (token !== null) {
        console.log('val', token);
        return token;
      } else {
        token = '0';
        return token;
      }
    } catch (error) {
      console.log('Error while storing the token');

      return '0';
    }
  }

  static async setCredit(credits) {
    value = '0';
    try {
      value = JSON.stringify(credits);

      await AsyncStorage.setItem('credits', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getCredits() {
    try {
      let token = await AsyncStorage.getItem('credits');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      console.log('Error while storing the token');
      return '0';
    }
  }

  static async setemail(email) {
    value = '0';
    try {
      value = email;

      await AsyncStorage.setItem('email', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getEmail() {
    try {
      let token = await AsyncStorage.getItem('email');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }

  static async setImage(image) {
    value = '0';
    try {
      value = image;

      await AsyncStorage.setItem('imageurl', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getImage() {
    try {
      let token = await AsyncStorage.getItem('image');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }

  static async setMobile(mobile) {
    value = '0';
    try {
      value = mobile;

      await AsyncStorage.setItem('mobile', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getMobile() {
    try {
      let token = await AsyncStorage.getItem('mobile');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }

  static async setVarified(verify) {
    value = '0';
    try {
      value = verify;

      await AsyncStorage.setItem('verify', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getverify() {
    try {
      let token = await AsyncStorage.getItem('verify');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }

  static async setMode(mode) {
    value = '0';
    try {
      value = JSON.stringify(mode);

      await AsyncStorage.setItem('mode', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getMode() {
    try {
      let token = await AsyncStorage.getItem('mode');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }

  static async setfacebook(facebook) {
    value = '0';
    try {
      value = JSON.stringify(facebook);

      await AsyncStorage.setItem('facebook', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getfacebook() {
    try {
      let token = await AsyncStorage.getItem('facebook');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }

  static async setname(name) {
    value = '0';
    try {
      value = name;

      await AsyncStorage.setItem('name', value);
      console.log('Data saved successfullylogin', value);
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getname() {
    try {
      let token = await AsyncStorage.getItem('name');
      if (token !== null) {
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }
  static async setLatitude(latitude) {
    value = '';
    try {
      value = JSON.stringify(latitude);
      await AsyncStorage.setItem('latitude', value);
      console.log('latitude saved successfullylogin');
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getLatitude() {
    try {
      let token = await AsyncStorage.getItem('latitude');
      if (token !== null) {
        console.log('latitude ', token);
        return token;
      }
    } catch (error) {
      console.log('Error while storing the token');
      return '0';
    }
  }
  static async setLongitude(longitude) {
    value = '';
    try {
      value = JSON.stringify(longitude);

      await AsyncStorage.setItem('longitude', value);
      console.log('Data saved successfullylogin');
      // Rest of your code
    } catch (error) {
      console.log(error.toString);
    }
  }

  static async getLongitude() {
    try {
      let token = await AsyncStorage.getItem('longitude');
      if (token !== null) {
        console.log(' storing the token', token);
        return token;
      }
    } catch (error) {
      return '0';
      console.log('Error while storing the token');
    }
  }
}

export default Storage;

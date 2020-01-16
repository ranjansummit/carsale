import React from 'react';
import {View} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const ErrorIcon = () => {
  return (
    <View>
      <Icon size={20} color={'red'} name={'error'} />
    </View>
  );
};

const styles = {
  errorStyle: {
    position: 'absolute',
    top: 0,
    left: 300,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default ErrorIcon;

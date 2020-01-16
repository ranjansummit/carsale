import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import Theme from './Colors';

const Spinner = ({size}) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator
        size={size || 'large'}
        animating={true}
        color={Theme.colors.navyBlue}
      />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 9999,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
};

export default Spinner;

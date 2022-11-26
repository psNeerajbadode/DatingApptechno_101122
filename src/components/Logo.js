import {Image, StyleSheet} from 'react-native';
import React from 'react';
const Logo = ({bottom}) => {
  return (
    <Image
      resizeMode="contain"
      source={require('../assets/icons/logo.png')}
      style={{
        position: 'absolute',
        bottom: bottom || 30,
        height: 158,
        width: 158,
        alignSelf: 'center',
      }}
    />
  );
};

export default Logo;

const styles = StyleSheet.create({});

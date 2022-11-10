import {StyleSheet, View} from 'react-native';
import React from 'react';

const ButtonView = ({children, height, backgroundColor}) => {
  return (
    <View
      style={{
        height: height || 90,
        width: '100%',
        backgroundColor: backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#37373710',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        flexDirection: 'row',
      }}>
      {children}
    </View>
  );
};

export default ButtonView;

const styles = StyleSheet.create({});

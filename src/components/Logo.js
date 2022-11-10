import {StyleSheet, View} from 'react-native';
import React from 'react';
import TextFormatted from './TextFormatted';
import {theme} from '../utils/Constants';
import {useSelector} from 'react-redux';

const Logo = ({bottom}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View
      style={{
        position: 'absolute',
        bottom: bottom || 30,
        height: 158,
        width: 158,
        borderRadius: 80,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <TextFormatted
        style={{
          fontSize: 22,
          fontWeight: '700',
          color:
            ThemeMode.themecolr == 'Red'
              ? theme.colors.red
              : ThemeMode.themecolr == 'Blue'
              ? theme.colors.Blue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.Green
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.Purple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.Yellow
              : theme.colors.red,
        }}>
        LOGO
      </TextFormatted>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({});

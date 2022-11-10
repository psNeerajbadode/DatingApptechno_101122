import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import TextFormatted from './TextFormatted';
import {theme} from '../utils/Constants';
import {useSelector} from 'react-redux';

const Sheetbutton = ({
  onPress,
  ButtonName,
  opacity,
  marginBottom,
  marginTop,
  disabled,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        alignSelf: 'center',
        marginTop: marginTop || 30,
        opacity: opacity,
        marginBottom: marginBottom,
      }}>
      <LinearGradient
        colors={theme.colors.primaryWhite}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          paddingVertical: 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 40,
          width: 200,
          height: 50,
        }}>
        <TextFormatted
          style={{
            fontSize: 18,
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
                : ThemeMode.themecolr == 'yellow'
                ? theme.colors.Yellow
                : theme.colors.red,
            zIndex: 30,
          }}>
          {ButtonName}
        </TextFormatted>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Sheetbutton;

const styles = StyleSheet.create({});

import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextFormatted from './TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import {ActivityIndicator} from 'react-native';
import {theme} from '../utils/Constants';
import {useSelector} from 'react-redux';

const Button = ({
  buttonName,
  onPress,
  flexDirection,
  color,
  Icon,
  buttonColor,
  disabled,
  marginTop,
  marginBottom,
  width,
  height,
  opacity,
  fontSize,
  Loading,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        alignSelf: 'center',
        marginTop: marginTop || 30,
        marginBottom: marginBottom,
      }}>
      <LinearGradient
        colors={
          buttonColor ||
          (ThemeMode.themecolr == 'Red'
            ? theme.colors.primaryOn
            : ThemeMode.themecolr == 'Blue'
            ? theme.colors.primaryBlue
            : ThemeMode.themecolr == 'Green'
            ? theme.colors.primaryGreen
            : ThemeMode.themecolr == 'Purple'
            ? theme.colors.primaryPurple
            : ThemeMode.themecolr == 'Yellow'
            ? theme.colors.primaryYellow
            : theme.colors.primaryOn)
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={{
          opacity: opacity,
          paddingVertical: 12,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 40,
          flexDirection: flexDirection,
          width: width || 200,
          height: height || 50,
        }}>
        {Loading ? (
          <ActivityIndicator size={'large'} color={theme.colors.primary} />
        ) : (
          <View>
            {Icon}
            <TextFormatted
              style={{
                fontSize: fontSize || 18,
                fontWeight: '700',
                color: color || theme.colors.primary,
                zIndex: 30,
              }}>
              {buttonName}
            </TextFormatted>
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});

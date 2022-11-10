import {StyleSheet, View, ActivityIndicator} from 'react-native';
import React from 'react';
import {theme} from '../utils/Constants';
import {useSelector} from 'react-redux';

const ActivityLoader = ({style, color}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View>
      <ActivityIndicator
        style={style}
        size={'large'}
        color={
          color ||
          (ThemeMode.themecolr == 'Red'
            ? theme.colors.red
            : ThemeMode.themecolr == 'Blue'
            ? theme.colors.Blue
            : ThemeMode.themecolr == 'Green'
            ? theme.colors.Green
            : ThemeMode.themecolr == 'Purple'
            ? theme.colors.Purple
            : ThemeMode.themecolr == 'Yellow'
            ? theme.colors.Yellow
            : theme.colors.red)
        }
      />
    </View>
  );
};

export default ActivityLoader;

const styles = StyleSheet.create({});

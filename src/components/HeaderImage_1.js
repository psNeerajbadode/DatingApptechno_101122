import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import Statusbar from './Statusbar';
import {useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  ReddarkImage,
  RedlightImage,
  YellowlightImage,
} from '../utils/CustomImages';

const HeaderImage_1 = ({children, height, marginBottom, source}) => {
  const ThemeMode = useSelector(state => state.Theme);

  return (
    <ImageBackground
      style={{
        height: height || 169,
        width: '100%',
        paddingTop: 30,
        marginBottom: marginBottom || 15,
      }}
      source={
        source || ThemeMode.themecolr == 'Red'
          ? ThemeMode.selectedTheme
            ? RedlightImage.Bg_Img1
            : ReddarkImage.Bg_Img1
          : ThemeMode.themecolr == 'Blue'
          ? ThemeMode.selectedTheme
            ? BluelightImage.Bg_Img1
            : BluelightImage.Bg_Img1
          : ThemeMode.themecolr == 'Green'
          ? ThemeMode.selectedTheme
            ? GreenlightImage.Bg_Img1
            : GreenlightImage.Bg_Img1
          : ThemeMode.themecolr == 'Purple'
          ? ThemeMode.selectedTheme
            ? PurplelightImage.Bg_Img1
            : PurplelightImage.Bg_Img1
          : ThemeMode.themecolr == 'Yellow'
          ? ThemeMode.selectedTheme
            ? YellowlightImage.Bg_Img1
            : YellowlightImage.Bg_Img1
          : ThemeMode.selectedTheme
          ? RedlightImage.Bg_Img1
          : ReddarkImage.Bg_Img1
      }
      resizeMode="stretch">
      <Statusbar
        backgroundColor={'transparent'}
        hidden={false}
        barStyle={'light-content'}
      />
      {children}
    </ImageBackground>
  );
};

export default HeaderImage_1;
const styles = StyleSheet.create({});

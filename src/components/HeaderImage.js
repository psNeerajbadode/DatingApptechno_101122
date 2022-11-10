import { ImageBackground, StyleSheet } from 'react-native';
import React from 'react';
import Statusbar from './Statusbar';
import { useSelector } from 'react-redux';
import { BluelightImage, GreenlightImage, PurplelightImage, ReddarkImage, RedlightImage, YellowlightImage } from '../utils/CustomImages';

const HeaderImage = ({ children, height, marginBottom, source }) => {
  const ThemeMode = useSelector(state => state.Theme);

  return (
    <ImageBackground
      style={{ height: height || 300, width: '100%', paddingTop: 30, marginBottom: marginBottom || 0 }}
      //source={ThemeMode.selectedTheme ? require('../assets/images/Group.png') : require('../assets/images/Bg_dark2.png')}
      source={
        source || ThemeMode.themecolr == 'Red'
          ? ThemeMode.selectedTheme
            ? RedlightImage.Bg_Img2
            : ReddarkImage.Bg_Img2
          : ThemeMode.themecolr == 'Blue'
          ? ThemeMode.selectedTheme
            ? BluelightImage.Bg_Img2
            : BluelightImage.Bg_Img2
          : ThemeMode.themecolr == 'Green'
          ? ThemeMode.selectedTheme
            ? GreenlightImage.Bg_Img2
            : GreenlightImage.Bg_Img2
          : ThemeMode.themecolr == 'Purple'
          ? ThemeMode.selectedTheme
            ? PurplelightImage.Bg_Img2
            : PurplelightImage.Bg_Img2
          : ThemeMode.themecolr == 'Yellow'
          ? ThemeMode.selectedTheme
            ? YellowlightImage.Bg_Img2
            : YellowlightImage.Bg_Img2
          : ThemeMode.selectedTheme
          ? RedlightImage.Bg_Img2
          : ReddarkImage.Bg_Img2
      }
      resizeMode="stretch"
    >
      <Statusbar backgroundColor={'transparent'} hidden={false} barStyle={'light-content'} />
      {children}
    </ImageBackground>
  );
};
export default HeaderImage;
const styles = StyleSheet.create({});

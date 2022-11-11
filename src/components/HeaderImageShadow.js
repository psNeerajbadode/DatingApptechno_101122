import { ImageBackground, StyleSheet, Dimensions, View } from 'react-native';
import React from 'react';
import Statusbar from './Statusbar';
import { useDispatch, useSelector } from 'react-redux';
import { BluelightImage, GreenlightImage, PurplelightImage, ReddarkImage, RedlightImage, YellowlightImage } from '../utils/CustomImages';

const HeaderImageShadow = ({ children, source, height }) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dispatch = useDispatch();
  return (
    <View>
      <ImageBackground
        style={{ height: height || Dimensions.get('screen').height * 0.44, width: '100%', paddingTop: 30 }}
        source={
          source || ThemeMode.themecolr == 'Red'
            ? ThemeMode.selectedTheme
              ? RedlightImage.Bg_Img3
              : ReddarkImage.Bg_Img3
            : ThemeMode.themecolr == 'Blue'
            ? ThemeMode.selectedTheme
              ? BluelightImage.Bg_Img3
              : BluelightImage.Bg_Img3
            : ThemeMode.themecolr == 'Green'
            ? ThemeMode.selectedTheme
              ? GreenlightImage.Bg_Img3
              : GreenlightImage.Bg_Img3
            : ThemeMode.themecolr == 'Purple'
            ? ThemeMode.selectedTheme
              ? PurplelightImage.Bg_Img3
              : PurplelightImage.Bg_Img3
            : ThemeMode.themecolr == 'Yellow'
            ? ThemeMode.selectedTheme
              ? YellowlightImage.Bg_Img3
              : YellowlightImage.Bg_Img3
            : ThemeMode.selectedTheme
            ? RedlightImage.Bg_Img3
            : ReddarkImage.Bg_Img3
        }
        resizeMode="stretch"
      >
        <Statusbar backgroundColor={'transparent'} hidden={false} barStyle={'light-content'} />
        {children}
      </ImageBackground>
    </View>
  );
};

export default HeaderImageShadow;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  useWindowDimensions,
  ImageBackground,
  Image,
} from 'react-native';
import React from 'react';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';
import Statusbar from '../../components/Statusbar';
import {useSelector} from 'react-redux';
const Splash = ({navigation}) => {
  const dimension = useWindowDimensions();
  const Staps = useSelector(state => state.Stap);
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <ImageBackground
      resizeMode="stretch"
      source={
        ThemeMode.themecolr == 'Red'
          ? require('../../assets/images/Splesh_new.png')
          : ThemeMode.themecolr == 'Blue'
          ? require('../../assets/images/Splesh_blue.png')
          : ThemeMode.themecolr == 'Green'
          ? require('../../assets/images/Splesh_green.png')
          : ThemeMode.themecolr == 'Purple'
          ? require('../../assets/images/Splesh_purple.png')
          : ThemeMode.themecolr == 'Yellow'
          ? require('../../assets/images/Splesh_yellow.png')
          : require('../../assets/images/Splesh_new.png')
      }
      style={{flex: 1, justifyContent: 'center'}}>
      <Statusbar
        backgroundColor={'transparent'}
        hidden={false}
        barStyle={'light-content'}
      />
      <TextFormatted
        style={{
          alignSelf: 'center',
          color: theme.colors.primary,
          fontSize: 25,
          fontWeight: '500',
          letterSpacing: 4,
          position: 'absolute',
          top: '14.5%',
        }}>
        WELCOME
      </TextFormatted>
      <AnimatedCircularProgress
        style={{alignSelf: 'center', marginTop: dimension.width - 480}}
        size={160}
        duration={1200}
        width={10}
        fill={100}
        rotation={0}
        tintColor="#ffffff1a"
        backgroundColor="#ffffff1a"
        tintColorSecondary="#fff"
        padding={10}
        onAnimationComplete={() => {
          navigation.replace(
            Staps.Leng == null ? 'LanguageSelection' : 'Login',
          );
          // navigation.replace('step4');
          // navigation.replace('HomePage');
        }}
        renderCap={({center}) => (
          <Circle cx={center.x} cy={center.y} r="5" fill="#fff" />
        )}>
        {fill => (
          <TextFormatted
            style={{color: '#fff', fontWeight: '700', fontSize: 26}}>
            {parseInt(fill) + '%'}
          </TextFormatted>
        )}
      </AnimatedCircularProgress>
      {/* <TextFormatted
        style={{
          alignSelf: 'center',
          color: theme.colors.primary,
          fontSize: 16,
          fontWeight: '400',
        }}>
        Loading...
      </TextFormatted> */}
      <Image
        resizeMode="contain"
        source={require('../../assets/icons/logo.png')}
        style={{
          position: 'absolute',
          bottom: 30,
          height: 158,
          width: 158,
          alignSelf: 'center',
        }}
      />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});

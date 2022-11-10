import {
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {theme} from '../utils/Constants';
import Statusbar from './Statusbar';
import TextFormatted from './TextFormatted';
import Button from './Button';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from '@react-native-community/netinfo';
const Netinforsheet = () => {
  const Dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  const [modelset, setModelset] = useState();
  const Netconnet = () => {
    return NetInfo.addEventListener(state => {
      console.log(state.isConnected);
      const Connection = state.isConnected;
      setModelset(Connection);
    });
  };

  useEffect(() => {
    Netconnet();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={!modelset}
      onRequestClose={() => Netconnet()}>
      <View
        style={{
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
          height: Dimension.width * 1.6,
          position: 'absolute',
          bottom: 0,
          alignSelf: 'center',
          width: '100%',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <Statusbar backgroundColor={'#00000077'} />
        <LinearGradient
          colors={
            ThemeMode.themecolr == 'Red'
              ? theme.colors.primaryOn
              : ThemeMode.themecolr == 'Blue'
              ? theme.colors.primaryBlue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.primaryGreen
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.primaryPurple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.primaryYellow
              : theme.colors.primaryOn
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 25,
            paddingTop: 28,
            width: 150,
            height: 150,
            borderRadius: 100,
            overflow: 'hidden',
            marginVertical: 30,
          }}>
          <Image
            style={{width: 120, height: 120, alignSelf: 'center'}}
            resizeMode="contain"
            source={require('../assets/icons/Netinfo23.png')}
          />
        </LinearGradient>
        <TextFormatted
          style={{
            fontSize: 26,
            fontWeight: '700',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginTop: 15,
            textAlign: 'center',
          }}>
          Connection lost
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginTop: 15,
            textAlign: 'center',
          }}>
          Seems like you are not connected to the internet. Check your
          connection and try again.
        </TextFormatted>
        <View style={{position: 'absolute', bottom: 25, alignSelf: 'center'}}>
          <Button
            buttonName={'Try Again'}
            buttonColor={[theme.colors.darkGrey, theme.colors.darkGrey]}
            onPress={() => {
              Netconnet();
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Netinforsheet;

const styles = StyleSheet.create({});

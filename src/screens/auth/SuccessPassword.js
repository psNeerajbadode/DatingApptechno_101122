import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import {theme} from '../../utils/Constants';
import Button from '../../components/Button';
import TextFormatted from '../../components/TextFormatted';
import {PASSCODE} from '../../redux/actions/ActionType';
import {useSelector} from 'react-redux';
import Netinforsheet from '../../components/Netinforsheet';

const SuccessPassword = ({navigation}) => {
  const isCode = useSelector(state => state.currentRecovery);
  const ThemeMode = useSelector(state => state.Theme);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage>
        <Header
          title={isCode == PASSCODE ? 'Passcode Recovery' : 'Password Recovery'}
          left
          marginTop={25}
        />
        <View style={{height: 20}} />
        <Logo />
      </HeaderImage>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
        <View style={{marginHorizontal: 30, alignItems: 'center'}}>
          <Image
            source={require('../../assets/icons/checked.png')}
            style={{
              height: 97,
              width: 97,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />
          <TextFormatted
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginTop: 20,
            }}>
            Awesome!
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginTop: 10,
            }}>
            Your {isCode == PASSCODE ? 'passcode' : 'password'} has been
            successfully reset
          </TextFormatted>
        </View>
      </ScrollView>
      <Button
        buttonName={'Go to login'}
        marginBottom={30}
        onPress={() => navigation.replace('Login')}
      />
      <Netinforsheet />
    </View>
  );
};

export default SuccessPassword;

const styles = StyleSheet.create({});

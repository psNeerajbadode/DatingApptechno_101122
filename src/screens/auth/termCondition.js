import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import {useSelector} from 'react-redux';
import Netinforsheet from '../../components/Netinforsheet';
import {STAP} from '../../redux/actions/ActionType';

const TermCondition = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage>
        <Header title={'Terms & Conditions'} />
        <View
          style={{
            height: 147,
            width: 147,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 50,
          }}>
          <Image
            source={require('../../assets/images/notes.png')}
            style={{height: 100, width: 100, resizeMode: 'contain'}}
          />
        </View>
      </HeaderImage>
      <ScrollView style={{marginHorizontal: 20}}>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginTop: 40,
            marginBottom: 20,
          }}>
          Before using our app please agree our terms and conditions in order to
          proceded
        </TextFormatted>
        <Menu_Trem
          color={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          tintColor={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          title={'Terms & Conditions'}
        />
        <Menu_Trem
          color={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          tintColor={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          title={'Privacy notice'}
        />
        <Menu_Trem
          color={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          tintColor={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          title={'Security tips'}
        />
      </ScrollView>
      <Netinforsheet />
    </View>
  );
};
const Menu_Trem = ({title, onPress, color, tintColor}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{paddingVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
    <TextFormatted
      style={{
        fontSize: 16,
        fontWeight: '700',
        color: color,
        flex: 1,
      }}>
      {title}
    </TextFormatted>

    <Image
      resizeMode="contain"
      source={require('../../assets/icons/chevron_down_ico.png')}
      style={{
        marginTop: 0,
        height: 12,
        width: 10,
        transform: [{rotate: '-90deg'}],
        tintColor: tintColor,
      }}
    />
  </TouchableOpacity>
);
export default TermCondition;

const styles = StyleSheet.create({});

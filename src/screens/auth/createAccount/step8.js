import {Image, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import Pagination from '../../../components/Pagination';
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import Button from '../../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import Netinforsheet from '../../../components/Netinforsheet';

const Step8 = ({navigation}) => {
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage_1 height={170} marginBottom={1}>
        <Pagination
          title={'Create account'}
          subTitle={'Complete'}
          position={8}
        />
      </HeaderImage_1>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Image
            source={require('../../../assets/icons/checked.png')}
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
              textAlign: 'center',
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
              marginHorizontal: 49,
              marginTop: 10,
              textAlign: 'center',
            }}>
            Great, you have completed your profile and you are ready to start
            using your
          </TextFormatted>
        </View>
        <View style={{marginVertical: 15}}>
          <Button
            color={'#fff'}
            buttonName={'Start Tour'}
            onPress={() => navigation.replace('HomeNavigation')}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              marginTop: 20,
              textAlign: 'center',
            }}>
            Start without guidance
          </TextFormatted>
        </View>
      </ScrollView>
      <Netinforsheet />
    </View>
  );
};

export default Step8;

const styles = StyleSheet.create({});

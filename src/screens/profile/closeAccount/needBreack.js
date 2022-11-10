import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {theme} from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import Button from '../../../components/Button';

const NeedBreack = ({refRBSheet, onPress, Loading}) => {
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={510}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {borderTopLeftRadius: 40, borderTopRightRadius: 40},
      }}>
      <StatusBar backgroundColor={'#00000077'} />

      <TouchableOpacity
        onPress={() => {
          refRBSheet.current.close();
        }}
        style={{
          alignSelf: 'flex-end',
          marginRight: 30,
          marginTop: 5,
        }}>
        <Image
          source={require('../../../assets/icons/close_immg.png')}
          style={{
            height: 5,
            width: 5,
            resizeMode: 'contain',
            alignSelf: 'flex-end',
            padding: 8,
            tintColor:
              /* ThemeMode.selectedTheme
              ?  */ theme.colors.primaryBlack,
            /*   : theme.colors.primary, */
          }}
        />
      </TouchableOpacity>
      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: theme.colors.primaryBlack,
            textAlign: 'center',
            marginHorizontal: 34,
            marginTop: 20,
          }}>
          Are you sure you want to delete your account?
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: theme.colors.darkGrey,
            textAlign: 'center',
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          If you need your account, you will permanently lose your profile,
          mesages, photos and matches. If you delete your account, this action
          cannot be undone.
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: theme.colors.darkGrey,
            textAlign: 'center',
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          If you’d like rather keep your account but not be shown to others, you
          can hide your account instead. You can turn this off in settings.
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '400',
            color: theme.colors.darkGrey,
            textAlign: 'center',
            marginHorizontal: 30,
            marginTop: 20,
          }}>
          Are you sure you want to delete your account?
        </TextFormatted>
      </ScrollView>
      <Button
        onPress={onPress}
        Loading={Loading}
        buttonName={'Delete account'}
        marginBottom={20}
      />
    </RBSheet>
  );
};

export default NeedBreack;

const styles = StyleSheet.create({});

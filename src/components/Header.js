import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import TextFormatted from './TextFormatted';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const Header = ({title, left, marginTop, onPress, right, T_marginRight}) => {
  const navigation = useNavigation();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: marginTop || 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {left || (
        <TouchableOpacity onPress={() => navigation.goBack() || onPress}>
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../assets/icons/back.png')
                : require('../assets/icons/back_dark.png')
            }
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      )}
      <TextFormatted
        style={{
          fontSize: 16,
          fontWeight: '700',
          color: '#fff',
          flex: 1,
          textAlign: 'center',
          marginRight: T_marginRight || (left ? 0 : 40),
        }}>
        {title}
      </TextFormatted>
      {right}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});

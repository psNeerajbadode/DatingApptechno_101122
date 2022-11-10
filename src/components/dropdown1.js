import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {theme} from '../utils/Constants';
import TextFormatted from './TextFormatted';
import {useSelector} from 'react-redux';

const Dropdown1 = ({
  value,
  onChange,
  data,
  height,
  title,
  renderRightIcon,
  position,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={{marginTop: 20}}>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          marginLeft: 40,
        }}>
        {title}
      </TextFormatted>
      <Dropdown
        itemContainerStyle={{
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        }}
        itemTextStyle={{
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
        }}
        // backgroundColor={ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack}
        style={{
          ...styles.dropdown,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        }}
        dropdownPosition={position || 'bottom'}
        containerStyle={{
          borderRadius: 20,
          marginTop: -25,
          marginBottom: 35,
          overflow: 'hidden',
          // backgroundColor: ThemeMode.selectedTheme
          //   ? theme.colors.primary
          //   : theme.colors.primaryBlack,
          // color: ThemeMode.selectedTheme
          //   ? theme.colors.primary
          //   : theme.colors.primaryBlack,
        }}
        placeholderStyle={{
          ...styles.placeholderStyle,
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
        }}
        selectedTextStyle={{
          ...styles.selectedTextStyle,
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        }}
        activeColor={
          ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack
        }
        data={data}
        maxHeight={height || 200}
        labelField="label"
        valueField="value"
        value={value}
        onChange={onChange}
        renderRightIcon={() =>
          renderRightIcon || (
            <Image
              source={require('../assets/icons/chevron_down_ico.png')}
              resizeMode="contain"
              style={{
                width: 9,
                height: 9,
                tintColor: ThemeMode.selectedTheme
                  ? theme.colors.primaryBlack
                  : theme.colors.darkGrey,
              }}
            />
          )
        }
        // renderLeftIcon={() => <Image source={require('../../Assets/Icons/Gender.png')} style={{ height: 18, width: 18, resizeMode: 'contain' }} />}
      />
    </View>
  );
};

export default Dropdown1;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    marginTop: 5,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingHorizontal: 15,
    shadowColor: '#8490ae85',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    paddingLeft: 10,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    paddingLeft: 10,
  },
});

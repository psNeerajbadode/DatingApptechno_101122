import {StyleSheet, useWindowDimensions, View} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import TextFormatted from './TextFormatted';
import {theme} from '../utils/Constants';
import {useSelector} from 'react-redux';

const DropDown = ({
  label,
  labelColor,
  items,
  onSelect,
  placeholder,
  selected,
  width,
  marginLeft,
  top,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimensions = useWindowDimensions();

  return (
    <View
      style={{
        marginTop: 20,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '600',
          color:
            labelColor || ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
          marginLeft: marginLeft || 40,
        }}>
        {label}
      </TextFormatted>
      <SelectDropdown
        data={items}
        onSelect={onSelect}
        defaultValue={'hiii'}
        defaultButtonText={placeholder}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
        buttonStyle={{
          ...styles.dropdown1BtnStyle,
          width: width || dimensions.width - 40,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        }}
        buttonTextStyle={{
          color: selected
            ? ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
            : '#8490AE',
          textAlign: 'left',
          fontFamily: 'Rubik-Regular',
          fontSize: 14,
        }}
        renderDropdownIcon={isOpened => {
          return (
            <Icon name={'chevron-down-sharp'} color={'#8490AE'} size={18} />
          );
        }}
        dropdownIconPosition={'right'}
        dropdownStyle={{
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
          marginTop: top || -25,
          borderRadius: 20,
        }}
        rowStyle={{
          borderBottomColor: '#C5C5C5',
          borderBottomWidth: 0,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        }}
        rowTextStyle={{
          ...styles.dropdown1RowTxtStyle,
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
        }}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown1BtnStyle: {
    // marginHorizontal: 20,
    height: 50,

    borderRadius: 20,
    alignSelf: 'center',
    shadowColor: '#8490ae85',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 10,
    marginVertical: 5,
    paddingHorizontal: 15,
  },

  dropdown1RowTxtStyle: {
    textAlign: 'left',
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    marginLeft: 25,
  },
});

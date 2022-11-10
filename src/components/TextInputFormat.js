import {StyleSheet, TextInput, View} from 'react-native';
import React from 'react';
import TextFormatted from './TextFormatted';
import {theme} from '../utils/Constants';
import {useSelector} from 'react-redux';

const TextInputFormat = ({
  right,
  placeholder,
  style,
  height,
  label,
  containerStyle,
  keyboardType,
  value,
  onChangeText,
  labelColor,
  borderWidth,
  mess,
  showMess,
  marginHorizontal,
  leftlabel,
  placeholderTextColor,
  ...props
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={containerStyle}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginRight: 20,
          marginLeft: leftlabel || 40,
        }}>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: labelColor,
            flex: 1,
          }}>
          {label}
        </TextFormatted>
        {!showMess || (
          <TextFormatted
            style={{
              fontSize: 12,
              fontWeight: '300',
              color: '#EA4A5A',
              width: '70%',
              textAlign: 'right',
            }}>
            {mess}
          </TextFormatted>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
          marginHorizontal: marginHorizontal || 20,
          borderRadius: 20,
          paddingHorizontal: 20,
          borderWidth: borderWidth,
          borderColor: '#EA4A5A',
          marginTop: 5,
          height: height || 50,
          shadowColor: '#8490ae85',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 10,
        }}>
        <TextInput
          {...props}
          //   secureTextEntry
          // multiline
          // editable

          placeholder={placeholder}
          keyboardType={keyboardType || 'default'}
          placeholderTextColor={placeholderTextColor || '#8490AE'}
          value={value}
          onChangeText={onChangeText}
          style={[
            style,
            {
              fontSize: 14,
              fontFamily: 'Rubik-Regular',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              flex: 1,
              padding: 0,
            },
          ]}
        />
        {right}
      </View>
    </View>
  );
};

export default TextInputFormat;

const styles = StyleSheet.create({});

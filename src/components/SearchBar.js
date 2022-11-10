import {
  Image,
  StyleSheet,
  TextInput,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {theme} from '../utils/Constants';
import {useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../utils/CustomImages';

const SearchBar = ({
  value,
  onChangeText,
  onPress,
  borderRadius,
  placeholder,
  Cross,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();
  return (
    <View
      style={{
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
        height: 65,
        width: dimension.width - 40,
        alignSelf: 'center',
        borderRadius: borderRadius || 20,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 22,
        paddingRight: 26,
        shadowColor: '#8490ae85',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 10,
        position: 'absolute',
        bottom: 0,
      }}>
      <Image
        source={
          ThemeMode.themecolr == 'Red'
            ? RedlightImage.search
            : ThemeMode.themecolr == 'Blue'
            ? BluelightImage.search_blue
            : ThemeMode.themecolr == 'Green'
            ? GreenlightImage.search_green
            : ThemeMode.themecolr == 'Purple'
            ? PurplelightImage.search_purple
            : ThemeMode.themecolr == 'Yellow'
            ? YellowlightImage.search_yellow
            : RedlightImage.search
        }
        style={{height: 38, width: 38, resizeMode: 'contain'}}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'#8490AE'}
        value={value}
        onChangeText={onChangeText}
        style={{
          marginLeft: 15,
          marginRight: 10,
          fontSize: 14,
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          fontFamily: 'Rubik-Regular',
          flex: 1,
        }}
      />
      {Cross || value?.length < 1 || (
        // <Icon name="close" size={20} color={'#000'} onPress={onPress} />
        <TouchableOpacity onPress={onPress}>
          <Image
            resizeMode="contain"
            source={require('../assets/icons/close_immg.png')}
            style={{
              tintColor: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.darkGrey,
              width: 13,
              height: 13,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});

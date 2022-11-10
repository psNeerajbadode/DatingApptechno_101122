import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {theme} from '../../utils/Constants';
import Header from '../../components/Header';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Dropdown1 from '../../components/dropdown1';
import ButtonView from '../../components/buttonView';
import Button from '../../components/Button';
import {useSelector} from 'react-redux';
import TextFormatted from '../../components/TextFormatted';
import {Slider} from '@miblanchard/react-native-slider';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import BottomSheet from '../../components/bottomSheet';
import Netinforsheet from '../../components/Netinforsheet';

import {STAP} from '../../redux/actions/ActionType';
const FilterLocation = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [country, setCountry] = useState('1');
  const [Kmmajor, setKmmajor] = useState('km');
  const [setkm, setSetkm] = useState(10);
  const refRBSheet = useRef();

  const [distance, setDistance] = useState();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
      <HeaderImage_1 height={155}>
        <Header
          marginTop={20}
          title={'Filter location'}
          right={
            <TouchableOpacity
              style={{position: 'absolute', right: 0}}
              onPress={() => refRBSheet.current.open()}>
              <Image
                source={
                  ThemeMode.selectedTheme
                    ? require('../../assets/icons/Settings.png')
                    : require('../../assets/icons/Settings_dark.png')
                }
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          }
        />
      </HeaderImage_1>
      <ScrollView>
        <Dropdown1
          title={'Filter by country'}
          data={[{label: 'Italy', value: '1'}]}
          value={country}
          onChange={item => setCountry(item.value)}
          height={100}
        />
        <Dropdown1
          title={'Filter by city'}
          data={[{label: 'Rome', value: '1'}]}
          value={country}
          onChange={item => setCountry(item.value)}
          height={100}
          renderRightIcon={
            <Image
              source={require('../../assets/icons/user_outline.png')}
              style={{height: 24, width: 24, resizeMode: 'contain'}}
            />
          }
        />
        <Dropdown1
          title={'Select unit of measure'}
          data={[{label: 'Km', value: '1'}]}
          value={country}
          onChange={item => setCountry(item.value)}
          height={100}
        />
        <View style={{height: 20}} />
        <SliderView
          header={'Max distance'}
          min={0}
          max={150}
          value={setkm}
          onValueChange={setSetkm}
          val={parseInt(setkm).toFixed(0)}
        />
      </ScrollView>
      <BottomSheet refRBSheet={refRBSheet} height={235}>
        <Setting
          distance={distance}
          setdistance={setDistance}
          refRBSheet={refRBSheet}
        />
      </BottomSheet>
      <ButtonView>
        <Button
          buttonName={'Save'}
          marginTop={1}
          color={theme.colors.primary}
        />
      </ButtonView>
      <Netinforsheet />
    </View>
  );
};

const SliderView = ({header, min, max, value, onValueChange, val}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const colorMode =
    ThemeMode.themecolr == 'Red'
      ? theme.colors.red
      : ThemeMode.themecolr == 'Blue'
      ? theme.colors.Blue
      : ThemeMode.themecolr == 'Green'
      ? theme.colors.Green
      : ThemeMode.themecolr == 'Purple'
      ? theme.colors.Purple
      : ThemeMode.themecolr == 'Yellow'
      ? theme.colors.Yellow
      : theme.colors.red;
  return (
    <View style={{marginHorizontal: 20, marginTop: 30}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            flex: 1,
          }}>
          {header}
        </TextFormatted>
        <TextFormatted
          style={{fontSize: 14, fontWeight: '600', color: colorMode}}>
          {val} km
        </TextFormatted>
      </View>
      <Slider
        value={value}
        onValueChange={onValueChange}
        minimumValue={min}
        maximumValue={max}
        containerStyle={{height: 50}}
        trackStyle={{height: 6, borderRadius: 10}}
        minimumTrackTintColor={colorMode}
        maximumTrackTintColor={'#FAFAFA'}
        renderThumbComponent={() => (
          <Image
            source={
              ThemeMode.themecolr == 'Red'
                ? RedlightImage.sliderImager
                : ThemeMode.themecolr == 'Blue'
                ? BluelightImage.sliderImage_bluer
                : ThemeMode.themecolr == 'Green'
                ? GreenlightImage.sliderImage_green
                : ThemeMode.themecolr == 'Purple'
                ? PurplelightImage.sliderImage_purple
                : ThemeMode.themecolr == 'Yellow'
                ? YellowlightImage.sliderImage_yellow
                : RedlightImage.sliderImager
            }
            style={{height: 34, width: 34, resizeMode: 'contain'}}
          />
        )}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextFormatted
          style={{fontSize: 12, fontWeight: '400', color: '#8490AE'}}>
          +{min}
        </TextFormatted>
        <TextFormatted
          style={{fontSize: 12, fontWeight: '400', color: '#8490AE'}}>
          +{max}
        </TextFormatted>
      </View>
    </View>
  );
};

const Setting = ({setdistance, distance, refRBSheet}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();

  return (
    <View>
      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginHorizontal: 20,
            marginTop: 10,
            marginBottom: 0,
          }}>
          Select Unit of Measure
        </TextFormatted>

        {/*   <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 40,
            marginTop: 25,
          }}>
          km/miles
        </TextFormatted> */}
        <View style={{marginTop: -20, marginBottom: 10}}>
          <Dropdown1
            data={[
              {label: 'Kilometer ', value: 'km'},
              {label: 'Millimeter ', value: 'mm'},
            ]}
            value={distance}
            onChange={item => setdistance(item.value)}
            height={150}
          />
        </View>
      </ScrollView>

      <ButtonView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#8490AE',
            width: dimension.width / 2 - 20,
            textAlign: 'center',
          }}
          onPress={() => refRBSheet.current.close()}>
          Cancel
        </TextFormatted>
        <Button
          buttonName={'Select'}
          marginTop={1}
          marginBottom={1}
          width={dimension.width / 2 - 20}
          onPress={() => {
            refRBSheet.current.close();
            setdistance(distance);
          }}
        />
      </ButtonView>
    </View>
  );
};
export default FilterLocation;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    marginTop: 10,
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
    marginBottom: 10,
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

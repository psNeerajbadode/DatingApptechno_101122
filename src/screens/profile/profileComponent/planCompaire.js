import { FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Fontisto from 'react-native-vector-icons/Fontisto';
import TextFormatted from '../../../components/TextFormatted';
import { useSelector } from 'react-redux';
import { BluelightImage, GreenlightImage, PurplelightImage, ReddarkImage, RedlightImage, YellowlightImage } from '../../../utils/CustomImages';

const PlanCompaire = ({ refRBSheet }) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();
  const data = [{}];
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={470}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: { backgroundColor: '#8490AE' },
        container: { borderTopLeftRadius: 40, borderTopRightRadius: 40 },
      }}
    >
      <StatusBar backgroundColor={'#00000077'} />
      <ImageBackground
        source={
          ThemeMode.themecolr == 'Red'
            ? ThemeMode.selectedTheme
              ? RedlightImage.ViewPlanBg
              : ReddarkImage.ViewPlanBg
            : ThemeMode.themecolr == 'Blue'
            ? ThemeMode.selectedTheme
              ? BluelightImage.ViewPlanBg_blue
              : BluelightImage.ViewPlanBg_blue
            : ThemeMode.themecolr == 'Green'
            ? ThemeMode.selectedTheme
              ? GreenlightImage.ViewPlanBg_green
              : GreenlightImage.ViewPlanBg_green
            : ThemeMode.themecolr == 'Purple'
            ? ThemeMode.selectedTheme
              ? PurplelightImage.ViewPlanBg_purple
              : PurplelightImage.ViewPlanBg_purple
            : ThemeMode.themecolr == 'Yellow'
            ? ThemeMode.selectedTheme
              ? YellowlightImage.ViewPlanBg_yellow
              : YellowlightImage.ViewPlanBg_yellow
            : ThemeMode.selectedTheme
            ? RedlightImage.ViewPlanBg
            : ReddarkImage.ViewPlanBg
        }
        style={{ flex: 1, marginTop: -25 }}
        resizeMode="cover"
      >
        <View style={{ height: 4, width: 36, backgroundColor: '#fff', borderRadius: 10, alignSelf: 'center', marginTop: 10 }} />

        <Fontisto
          name="close-a"
          size={14}
          color="#fff"
          style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 5, padding: 10 }}
          onPress={() => refRBSheet.current.close()}
        />
        <ScrollView>
          <View style={{ flexDirection: 'row', marginTop: 10, marginHorizontal: 20 }}>
            <View style={{ width: (dimension.width - 40) / 4 }} />
            <TextFormatted style={{ fontSize: 18, fontWeight: '600', color: '#fff', width: (dimension.width - 40) / 4, textAlign: 'center' }}>
              Basic
            </TextFormatted>
            <TextFormatted style={{ fontSize: 18, fontWeight: '600', color: '#fff', width: (dimension.width - 40) / 4, textAlign: 'center' }}>
              Pro
            </TextFormatted>
            <TextFormatted style={{ fontSize: 18, fontWeight: '600', color: '#fff', width: (dimension.width - 40) / 4, textAlign: 'center' }}>
              Elite
            </TextFormatted>
          </View>
          <View style={{ height: 20 }} />
          <RowView source={require('../../../assets/icons/like.png')} first={'300'} second={'1000'} third={'5000'} dimension={dimension} />
          <RowView source={require('../../../assets/icons/flower.png')} first={'30'} second={'100'} third={'150'} dimension={dimension} />
          {/* <RowView source={require('../../../assets/icons/Rocket.png')} first={'3'} second={'10'} third={'15'} dimension={dimension} /> */}
          <RowView source={require('../../../assets/icons/camera.png')} first={'5'} second={'10'} third={'15'} dimension={dimension} />
          <RowView source={require('../../../assets/icons/youtube.png')} first={'1'} second={'3'} third={'5'} dimension={dimension} />
        </ScrollView>
      </ImageBackground>
    </RBSheet>
  );
};

const RowView = ({ first, second, third, source, dimension }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: 67,
        marginHorizontal: 25,

        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#FFFFFF33',
        marginTop: 10,
        marginHorizontal: 16,
        width: dimension.width - 40,
      }}
    >
      <View style={{ width: (dimension.width - 40) / 4 }}>
        <Image source={source} style={{ height: 40, width: 40, resizeMode: 'contain' }} />
      </View>
      <TextFormatted style={{ fontSize: 18, fontWeight: '600', color: '#fff', width: (dimension.width - 40) / 4 }}>{first}</TextFormatted>
      <TextFormatted style={{ fontSize: 18, fontWeight: '600', color: '#fff', width: (dimension.width - 40) / 4 }}>{second}</TextFormatted>
      <TextFormatted style={{ fontSize: 18, fontWeight: '600', color: '#fff', width: (dimension.width - 40) / 4 }}>{third}</TextFormatted>
    </View>
  );
};

export default PlanCompaire;

const styles = StyleSheet.create({});

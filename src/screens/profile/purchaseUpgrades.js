import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Carousel from 'react-native-snap-carousel';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import {useSelector} from 'react-redux';
import Sheetbutton from '../../components/Sheetbutton';

const PurchaseUpgrades = ({refRBSheet, refRBSheet2}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(0);
  const [select, setSelect] = useState('10 Flowers');
  const upgradeData = [
    {
      img: ThemeMode.selectedTheme
        ? require('../../assets/icons/plan_flower1.png')
        : require('../../assets/icons/plan_flower2.png'),
      flowers: [
        {qut: '10 Flowers', price: '0,25€'},
        {qut: '50 Flowers', price: '0,99€', offer: 'Savings of 25%'},
        {qut: '100 Flowers', price: '1,99€', offer: 'Savings of 50%'},
      ],
    },
    {
      img: ThemeMode.selectedTheme
        ? require('../../assets/icons/plan_flower1.png')
        : require('../../assets/icons/plan_flower2.png'),
      flowers: [
        {qut: '1 Boost', price: '0,99€'},
        {qut: '5 Boost', price: '0,99€', offer: 'Savings of 25%'},
        {qut: '10 Boost', price: '1,99€', offer: 'Savings of 50%'},
      ],
    },
  ];
  const colormode =
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
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={620}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        wrapper: {},
        // draggableIcon: { backgroundColor: '#8490AE' },
        container: {borderTopLeftRadius: 40, borderTopRightRadius: 40},
      }}>
      <StatusBar backgroundColor={'#00000077'} />

      {ThemeMode.themecolr == 'Red' ? (
        <ImageBackground
          resizeMode="cover"
          style={{width: '100%', marginTop: -(dimension.width * 0.08)}}
          source={
            ThemeMode.selectedTheme
              ? require('../../assets/images/ViewPlanBg.png')
              : require('../../assets/images/ViewPlanBg_dark.png')
          }>
          <View
            style={{
              height: 4,
              width: 34,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />

          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
              setSelect('');
            }}
            style={{alignSelf: 'flex-end'}}>
            <Image
              source={require('../../assets/icons/close_immg.png')}
              style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
                marginRight: 30,
                marginTop: 10,
                padding: 10,
                tintColor: theme.colors.primary,
              }}
            />
          </TouchableOpacity>

          <Carousel
            data={upgradeData}
            sliderWidth={dimension.width}
            itemWidth={dimension.width - 40}
            renderItem={({item, index}) => (
              <View style={{marginTop: 0}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  <Image
                    source={item.img}
                    style={{height: 112, width: 112, resizeMode: 'contain'}}
                  />
                </View>
                <View style={{height: 10}} />
                {item.flowers.map((v, i) => (
                  <TouchableOpacity
                    onPress={() => setSelect(v.qut)}
                    style={{
                      marginHorizontal: 28,
                      marginVertical: 5,
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor:
                        select == v.qut ? theme.colors.primary : 'transparent',
                      paddingVertical: 20,
                      borderRadius: 10,
                    }}>
                    <TextFormatted
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color:
                          select == v.qut ? colormode : theme.colors.primary,
                        textAlign: 'center',
                      }}>
                      {v.qut}
                    </TextFormatted>
                    <TextFormatted
                      style={{
                        fontSize: 30,
                        fontWeight: '700',
                        color:
                          select == v.qut ? colormode : theme.colors.primary,
                        textAlign: 'center',
                      }}>
                      {v.price}
                    </TextFormatted>
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor:
                          select == v.qut
                            ? v?.offer && colormode
                            : v?.offer && theme.colors.primary,
                        paddingVertical: 2,
                        paddingHorizontal: 6,
                        right: 0,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 10,
                      }}>
                      <TextFormatted
                        style={{
                          textTransform: 'uppercase',
                          fontSize: 11,
                          fontWeight: '600',
                          color:
                            select == v.qut
                              ? v?.offer && theme.colors.primary
                              : v?.offer && ThemeMode.themecolr == 'Red'
                              ? theme.colors.red
                              : ThemeMode.themecolr == 'Blue'
                              ? theme.colors.Blue
                              : ThemeMode.themecolr == 'Green'
                              ? theme.colors.Green
                              : ThemeMode.themecolr == 'Purple'
                              ? theme.colors.Purple
                              : ThemeMode.themecolr == 'Yellow'
                              ? theme.colors.Yellow
                              : theme.colors.red,
                          textAlign: 'center',
                        }}>
                        {v?.offer}
                      </TextFormatted>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            onSnapToItem={index => setActive(index)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            {Array(2)
              .fill('')
              .map((v, i) => (
                <View
                  style={{
                    height: 10,
                    width: active == i ? 25 : 10,
                    backgroundColor: '#fff',
                    opacity: active == i ? 1 : 0.3,
                    borderRadius: 20,
                    margin: 3,
                  }}
                />
              ))}
          </View>

          <Sheetbutton
            opacity={select != '' ? 1 : 0.5}
            disabled={select != '' ? false : true}
            marginBottom={20}
            marginTop={1}
            onPress={() => {
              refRBSheet2.current.open();
              refRBSheet.current.close();
            }}
            ButtonName={'Buy now'}
          />
        </ImageBackground>
      ) : (
        <LinearGradient
          style={{width: '100%', marginTop: -(dimension.width * 0.08)}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={
            ThemeMode.themecolr == 'Blue'
              ? theme.colors.primaryBlue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.primaryGreen
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.primaryPurple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.primaryYellow
              : theme.colors.primaryOn
          }>
          <View
            style={{
              height: 4,
              width: 34,
              backgroundColor: '#fff',
              borderRadius: 10,
              marginTop: 10,
              alignSelf: 'center',
            }}
          />

          <TouchableOpacity
            onPress={() => {
              refRBSheet.current.close();
              setSelect('');
            }}
            style={{alignSelf: 'flex-end'}}>
            <Image
              source={require('../../assets/icons/close_immg.png')}
              style={{
                height: 15,
                width: 15,
                resizeMode: 'contain',
                alignSelf: 'flex-end',
                marginRight: 30,
                marginTop: 10,
                padding: 10,
                tintColor: theme.colors.primary,
              }}
            />
          </TouchableOpacity>

          <Carousel
            data={upgradeData}
            sliderWidth={dimension.width}
            itemWidth={dimension.width - 40}
            renderItem={({item, index}) => (
              <View style={{marginTop: 0}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 10,
                  }}>
                  <Image
                    source={item.img}
                    style={{height: 112, width: 112, resizeMode: 'contain'}}
                  />
                </View>
                <View style={{height: 10}} />
                {item.flowers.map((v, i) => (
                  <TouchableOpacity
                    onPress={() => setSelect(v.qut)}
                    style={{
                      marginHorizontal: 28,
                      marginVertical: 5,
                      borderWidth: 2,
                      borderColor: '#fff',
                      backgroundColor:
                        select == v.qut ? theme.colors.primary : 'transparent',
                      paddingVertical: 20,
                      borderRadius: 10,
                    }}>
                    <TextFormatted
                      style={{
                        fontSize: 16,
                        fontWeight: '400',
                        color:
                          select == v.qut ? colormode : theme.colors.primary,
                        textAlign: 'center',
                      }}>
                      {v.qut}
                    </TextFormatted>
                    <TextFormatted
                      style={{
                        fontSize: 30,
                        fontWeight: '700',
                        color:
                          select == v.qut ? colormode : theme.colors.primary,
                        textAlign: 'center',
                      }}>
                      {v.price}
                    </TextFormatted>
                    <View
                      style={{
                        position: 'absolute',
                        backgroundColor:
                          select == v.qut
                            ? v?.offer && colormode
                            : v?.offer && theme.colors.primary,
                        paddingVertical: 2,
                        paddingHorizontal: 6,
                        right: 0,
                        borderTopRightRadius: 8,
                        borderBottomLeftRadius: 10,
                      }}>
                      <TextFormatted
                        style={{
                          textTransform: 'uppercase',
                          fontSize: 11,
                          fontWeight: '600',
                          color:
                            select == v.qut
                              ? v?.offer && theme.colors.primary
                              : v?.offer && ThemeMode.themecolr == 'Red'
                              ? theme.colors.red
                              : ThemeMode.themecolr == 'Blue'
                              ? theme.colors.Blue
                              : ThemeMode.themecolr == 'Green'
                              ? theme.colors.Green
                              : ThemeMode.themecolr == 'Purple'
                              ? theme.colors.Purple
                              : ThemeMode.themecolr == 'Yellow'
                              ? theme.colors.Yellow
                              : theme.colors.red,
                          textAlign: 'center',
                        }}>
                        {v?.offer}
                      </TextFormatted>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            onSnapToItem={index => setActive(index)}
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            {Array(2)
              .fill('')
              .map((v, i) => (
                <View
                  style={{
                    height: 10,
                    width: active == i ? 25 : 10,
                    backgroundColor: '#fff',
                    opacity: active == i ? 1 : 0.3,
                    borderRadius: 20,
                    margin: 3,
                  }}
                />
              ))}
          </View>

          <Sheetbutton
            opacity={select != '' ? 1 : 0.5}
            disabled={select != '' ? false : true}
            marginBottom={20}
            marginTop={1}
            onPress={() => {
              refRBSheet2.current.open();
              refRBSheet.current.close();
            }}
            ButtonName={'Buy now'}
          />
        </LinearGradient>
      )}
    </RBSheet>
  );
};

export default PurchaseUpgrades;

const styles = StyleSheet.create({});

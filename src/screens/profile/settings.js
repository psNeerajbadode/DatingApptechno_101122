import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {theme} from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import Header from '../../components/Header';
import TextFormatted from '../../components/TextFormatted';
import LinearGradient from 'react-native-linear-gradient';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BottomSheet from '../../components/bottomSheet';
import Button from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import PurchaseUpgrades from './purchaseUpgrades';
import Payment from './payment';
import {useDispatch, useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import Sheetbutton from '../../components/Sheetbutton';
import Netinforsheet from '../../components/Netinforsheet';
import axios from 'axios';
import ActivityLoader from '../../components/ActivityLoader';
const Settings = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const navigation = useNavigation();
  const dimension = useWindowDimensions();
  const [active, setActive] = useState(0);
  const [plandatas, setPlandatas] = useState();
  const [Loading, setLoading] = useState(false);
  const Gift_img =
    ThemeMode.themecolr == 'Red'
      ? RedlightImage.Gift
      : ThemeMode.themecolr == 'Blue'
      ? BluelightImage.Gift_blue
      : ThemeMode.themecolr == 'Green'
      ? GreenlightImage.Gift_green
      : ThemeMode.themecolr == 'Purple'
      ? PurplelightImage.Gift_purple
      : ThemeMode.themecolr == 'Yellow'
      ? YellowlightImage.Gift_yellow
      : RedlightImage.Gift;

  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();

  const upgradeData = [
    {
      img: require('../../assets/icons/flower.png'),
      flowers: [
        {qut: '10 Flowers', price: '0,25€'},
        {qut: '50 Flowers', price: '0,99€', offer: 'Savings of 25%'},
        {qut: '100 Flowers', price: '1,99€', offer: 'Savings of 50%'},
      ],
    },
    {
      img: require('../../assets/icons/Rocket.png'),
      flowers: [
        {qut: '1 Boost', price: '0,99€'},
        {qut: '5 Boost', price: '0,99€', offer: 'Savings of 25%'},
        {qut: '10 Boost', price: '1,99€', offer: 'Savings of 50%'},
      ],
    },
  ];

  const getPlans = () => {
    setLoading(true);
    axios({
      method: 'get',
      url:'https://technorizen.com/Dating/webservice/get_plans',
    }).then(response => {
      setLoading(false);
      setPlandatas(response.data.result);    
    });
  };
 // console.log('plandatas',plandatas);
useEffect(() => {
  getPlans();
}, [])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
      }}>
           <HeaderImage_1 height={130} marginBottom={1}>
        <Header
          left
          title={'Settings'}
          right={
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={
                  ThemeMode.selectedTheme
                    ? require('../../assets/icons/close.png')
                    : require('../../assets/icons/close_dark.png')
                }
                style={{height: 40, width: 40, resizeMode: 'contain'}}
              />
            </TouchableOpacity>
          }
        />
      </HeaderImage_1>

        {Loading ? 
         <View
         style={{
           flex: 1,
           backgroundColor: ThemeMode.selectedTheme
             ? theme.colors.primary
             : theme.colors.primaryBlack,
             justifyContent:'center'
         }}>
         <ActivityLoader />
         </View>
         :
        <View>
             
      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 30,
            marginTop: 20,
          }}>
          My Plan
        </TextFormatted>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={plandatas}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('viewPlan', {currentIndex: index})
              }
              style={{
                marginLeft: 20,
                width: 230,
                height: 270,
                backgroundColor: ThemeMode.selectedTheme
                  ? theme.colors.primary
                  : theme.colors.primaryBlack,
                borderRadius: 20,
                shadowColor: '#8490ae85',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 10,
                marginTop: 20,
                marginBottom: 15,
              }}>
              <View>
                <ImageBackground
                  source={
                    index == 0
                      ? ThemeMode.themecolr == 'Red'
                        ? RedlightImage.planBg
                        : ThemeMode.themecolr == 'Blue'
                        ? BluelightImage.planBg_blue
                        : ThemeMode.themecolr == 'Green'
                        ? GreenlightImage.planBg_green
                        : ThemeMode.themecolr == 'Purple'
                        ? PurplelightImage.planBg_purple
                        : ThemeMode.themecolr == 'Yellow'
                        ? YellowlightImage.planBg_yellow
                        : RedlightImage.planBg
                      : require('../../assets/images/planBg_1.png')
                  }
                  style={{height: 220, width: 230}}
                  imageStyle={{borderRadius: 20}}
                  resizeMode="cover">
                  <TextFormatted
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      color: theme.colors.primary,
                      margin: 20,
                    }}>
                    {item.name}
                  </TextFormatted>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 10,
                          marginHorizontal: 22,
                        }}>
                        <Image
                          source={{uri:item.like_image}}
                          style={{height: 34, width: 34, resizeMode: 'contain'}}
                        />
                        <TextFormatted
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: theme.colors.primary,
                            marginTop: 10,
                          }}>
                          {item.like}
                        </TextFormatted>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 10,
                          marginHorizontal: 22,
                        }}>
                        <Image
                           source={{uri:item.flower_image}}
                          style={{height: 34, width: 34, resizeMode: 'contain'}}
                        />
                        <TextFormatted
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: theme.colors.primary,
                            marginTop: 10,
                          }}>
                         {item.flower}
                        </TextFormatted>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 10,
                          marginHorizontal: 22,
                        }}>
                        <Image
                          source={{uri:item.picture_image}}
                          style={{height: 34, width: 34, resizeMode: 'contain'}}
                        />
                        <TextFormatted
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: theme.colors.primary,
                            marginTop: 10,
                          }}>
                          {item.image}
                        </TextFormatted>
                      </View>

                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 10,
                          marginHorizontal: 22,
                        }}>
                        <Image
                          source={{uri:item.video_image}}
                          style={{height: 34, width: 34, resizeMode: 'contain'}}
                        />
                        <TextFormatted
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: theme.colors.primary,
                            marginTop: 10,
                          }}>
                         {item.video}
                        </TextFormatted>
                      </View>
            
                  </View>
                </ImageBackground>
                <ImageBackground
                  source={require('../../assets/images/plan.png')}
                  style={{
                    height: 80,
                    width: 80,
                    position: 'absolute',
                    marginTop: -15,
                    right: 15,
                    alignItems: 'center',
                  }}
                  resizeMode="contain">
                  <TextFormatted
                    style={{
                      fontSize: 12,
                      fontWeight: '300',
                      color: /* ThemeMode.selectedTheme ? */
                         theme.colors.primaryBlack,
                   /*      : theme.colors.primary, */
                      textAlign: 'center',
                      marginTop: 20,
                    }}>
                    From
                  </TextFormatted>
                  <TextFormatted
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color:
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
                          : theme.colors.red,
                      textAlign: 'center',
                      marginTop: 2,
                    }}>
                    {item.price}
                  </TextFormatted>
                </ImageBackground>
                <TextFormatted
                  style={{
                    fontSize: 15,
                    fontWeight: '700',
                    color:
                      index == 0
                        ? ThemeMode.themecolr == 'Red'
                          ? theme.colors.red
                          : ThemeMode.themecolr == 'Blue'
                          ? theme.colors.Blue
                          : ThemeMode.themecolr == 'Green'
                          ? theme.colors.Green
                          : ThemeMode.themecolr == 'Purple'
                          ? theme.colors.Purple
                          : ThemeMode.themecolr == 'Yellow'
                          ? theme.colors.Yellow
                          : theme.colors.red
                        : '#8490AE',
                    textAlign: 'center',
                    marginTop: 15,
                  }}>
                  {index == 0 ? 'Current Plan' : 'Upgrade Plan'}
                </TextFormatted>
              </View>
              {index > 0 && (
                <View
                  style={{
                    backgroundColor: '#1A1D25B2',
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    position: 'absolute',
                    borderRadius: 20,
                  }}>
                  <TextFormatted
                    style={{
                      fontWeight: '900',
                      fontSize: 30,
                      color: theme.colors.primary,
                    }}>
                    Coming soon...
                  </TextFormatted>
                </View>
              )}
            </TouchableOpacity>
          )}
        />
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 30,
            marginTop: 15,
            marginBottom: 10,
          }}>
          Settings
        </TextFormatted>

        <ButtonRow
          title={'Profile settings'}
          onPress={() => navigation.navigate('profileSetting')}
        />
        <ButtonRow
          title={'Purchase upgrades'}
          onPress={() => refRBSheet1.current.open()}
        />
        <ButtonRow
          title={'Appearance'}
          onPress={() => navigation.navigate('appearance')}
        />
        <ButtonRow
          title={'Security'}
          onPress={() => navigation.navigate('security')}
        />
        <ButtonRow
          title={'About Us'}
          onPress={() => navigation.navigate('aboutUs')}
        />
        <View style={{height: 20}} />
      </ScrollView>

      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <LinearGradient
          colors={
            ThemeMode.themecolr == 'Red'
              ? theme.colors.primaryOn
              : ThemeMode.themecolr == 'Blue'
              ? theme.colors.primaryBlue
              : ThemeMode.themecolr == 'Green'
              ? theme.colors.primaryGreen
              : ThemeMode.themecolr == 'Purple'
              ? theme.colors.primaryPurple
              : ThemeMode.themecolr == 'Yellow'
              ? theme.colors.primaryYellow
              : theme.colors.primaryOn
          }
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            height: 92,
            width: '100%',
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}>
          <TextFormatted
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: theme.colors.primary,
              flex: 1,
              marginRight: 10,
            }}>
            Refer a friend and get rewarded
          </TextFormatted>

          <Image
            source={Gift_img}
            style={{height: 55, width: 55, resizeMode: 'contain'}}
          />
        </LinearGradient>
      </TouchableOpacity>
      <BottomSheet refRBSheet={refRBSheet} height={500}>
        <LinearGradient
          style={{flex: 1, marginTop: -25}}
          start={{x: 0, y: 0}}
          y={{x: 1, y: 1}}
          colors={
            ThemeMode.themecolr == 'Red'
              ? theme.colors.primaryOn
              : ThemeMode.themecolr == 'Blue'
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
          <Fontisto
            name="close-a"
            size={14}
            color="#fff"
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              marginVertical: 5,
              paddingHorizontal: 10,
            }}
            onPress={() => refRBSheet.current.close()}
          />
          <TextFormatted
            style={{
              fontSize: 20,
              fontWeight: '600',
              color: theme.colors.primary,
              marginHorizontal: 20,
              marginTop: 0,
              marginBottom: 0,
            }}>
            Select your type
          </TextFormatted>
          <ScrollView>
            <Image
              source={Gift_img}
              style={{
                height: 148,
                width: 148,
                resizeMode: 'contain',
                alignSelf: 'center',
                marginTop: 20,
              }}
            />
            <TextFormatted
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: theme.colors.primary,
                textAlign: 'center',
                marginHorizontal: 30,
                marginTop: 30,
              }}>
              Get 1 month pro plan for free by inviting a friend to ...
            </TextFormatted>
            <TextFormatted
              style={{
                fontSize: 14,
                fontWeight: '400',
                color: theme.colors.primary,
                textAlign: 'center',
                marginHorizontal: 30,
                marginTop: 30,
              }}>
              Share your unique link below to invite friends to ... Once they
              start using the app, you will get one month on the basic plan
              free.
            </TextFormatted>
          </ScrollView>

          <Sheetbutton
            marginTop={0}
            marginBottom={20}
            ButtonName={'Copy referal link'}
            onPress={() => refRBSheet.current.close()}
          />
        </LinearGradient>
      </BottomSheet>
      <PurchaseUpgrades refRBSheet={refRBSheet1} refRBSheet2={refRBSheet2} />
      <Payment refRBSheet={refRBSheet2} isPlan={true} />
      <Netinforsheet />
        </View>
        }

    </View>
  );
};

const ButtonRow = ({title, onPress}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 30,
        paddingVertical: 5,
        marginVertical: 5,
      }}>
      <TextFormatted
        style={{
          fontSize: 15,
          fontWeight: '600',
          color: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
          flex: 1,
        }}>
        {title}
      </TextFormatted>
      <Image
        resizeMode="contain"
        source={require('../../assets/icons/chevron_down_ico.png')}
        style={{
          marginTop: 0,
          height: 12,
          width: 10,
          transform: [{rotate: '-90deg'}],
          tintColor: ThemeMode.selectedTheme
            ? theme.colors.primaryBlack
            : theme.colors.primary,
        }}
      />
    </TouchableOpacity>
  );
};
export default Settings;

const styles = StyleSheet.create({});

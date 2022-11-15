import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Swiper from 'react-native-swiper';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import PlanCompaire from './profileComponent/planCompaire';
import RBSheet from 'react-native-raw-bottom-sheet';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Button from '../../components/Button';
import Payment from './payment';
import {useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  ReddarkImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';
import Netinforsheet from '../../components/Netinforsheet';
import axios from 'axios';
const ViewPlan = ({navigation}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const Staps = useSelector(state => state.Stap);
  const [plandata, setPlandata] = useState();
  const {params = {}} = useRoute();
  const [slide, setSlide] = useState(params.currentIndex);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const dimension = useWindowDimensions();
  const data = [
    {
      title: 'Basic',
      plan: [
        {
          like: '300 Like',
          flower: '30 Flowers',
          boost: '3 Boost',
          pic: '5 Photo',
          video: '1 Video',
        },
      ],
    },
  ];

  const getPlanData = () => {
    axios({
      method: 'get',
      url: `https://technorizen.com/Dating/webservice/get_plans`,
    }).then(response => {
      console.log('setPlandata=>', response.data.result[0].name);
      setPlandata(response.data.result);
    });
  };

  useEffect(() => {
    getPlanData();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Swiper
        showsButtons={true}
        loop={false}
        index={params.currentIndex}
        onIndexChanged={index => setSlide(index)}
        buttonWrapperStyle={{paddingHorizontal: 0}}
        nextButton={
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/P_sidebar.png')
                : require('../../assets/icons/next_dark.png')
            }
            style={{height: 145, width: 25, resizeMode: 'contain'}}
          />
        }
        prevButton={
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/N_sidebar.png')
                : require('../../assets/icons/prev_dark.png')
            }
            style={{height: 145, width: 25, resizeMode: 'contain'}}
          />
        }
        activeDotStyle={{
          height: 10,
          width: 25,
          backgroundColor: '#fff',
          borderRadius: 30,
        }}
        dotStyle={{
          height: 10,
          width: 10,
          backgroundColor: '#fff',
          borderRadius: 20,
          opacity: 0.3,
        }}
        paginationStyle={{marginBottom: 80}}>
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
          style={{flex: 1}}
          resizeMode="cover">
          <View style={{height: 100}} />
          <TextFormatted
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: theme.colors.primary,
              textAlign: 'center',
            }}>
            {plandata[0]?.name}
          </TextFormatted>
          <View
            style={{
              marginVertical: 30,
              position: 'absolute',
              top: '25%',
              alignSelf: 'center',
            }}>
            <Container
              source={require('../../assets/icons/like.png')}
              title={plandata[0]?.like + ' ' + 'Like'}
              subtitle={'per month'}
            />
            <Container
              source={require('../../assets/icons/flower.png')}
              title={plandata[0]?.flower + ' ' + 'Flowers'}
              subtitle={'per month'}
            />

            <Container
              source={require('../../assets/icons/camera.png')}
              title={plandata[0]?.image + ' ' + 'Photo'}
            />
            <Container
              source={require('../../assets/icons/youtube.png')}
              title={plandata[0]?.video + ' ' + 'Video'}
            />
          </View>
        </ImageBackground>
        <ImageBackground
          source={
            ThemeMode.selectedTheme
              ? require('../../assets/images/pro_plan.png')
              : require('../../assets/images/pro_plan_dark.png')
          }
          style={{flex: 1}}
          resizeMode="cover">
          <View style={{height: 100}} />
          <TextFormatted
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: theme.colors.primary,
              textAlign: 'center',
            }}>
            {plandata[1]?.name}
          </TextFormatted>

          <View
            style={{
              marginVertical: 30,
              position: 'absolute',
              top: '25%',
              alignSelf: 'center',
            }}>
            <Container
              source={require('../../assets/icons/like.png')}
              title={plandata[1]?.like + ' ' + 'Like'}
              subtitle={'per month'}
            />
            <Container
              source={require('../../assets/icons/flower.png')}
              title={plandata[1]?.flower + ' ' + 'Flowers'}
              subtitle={'per month'}
            />

            <Container
              source={require('../../assets/icons/camera.png')}
              title={plandata[1]?.image + ' ' + 'Photo'}
            />
            <Container
              source={require('../../assets/icons/youtube.png')}
              title={plandata[1]?.video + ' ' + 'Video'}
            />
          </View>
        </ImageBackground>
        <ImageBackground
          source={
            ThemeMode.selectedTheme
              ? require('../../assets/images/pro_plan.png')
              : require('../../assets/images/pro_plan_dark.png')
          }
          style={{flex: 1}}
          resizeMode="cover">
          <View style={{height: 100}} />
          <TextFormatted
            style={{
              fontSize: 32,
              fontWeight: '700',
              color: theme.colors.primary,
              textAlign: 'center',
            }}>
            {plandata[2]?.name}
          </TextFormatted>
          <View
            style={{
              marginVertical: 30,
              position: 'absolute',
              top: '25%',
              alignSelf: 'center',
            }}>
            <Container
              source={require('../../assets/icons/like.png')}
              title={plandata[2]?.like + ' ' + 'Like'}
              subtitle={'per month'}
            />
            <Container
              source={require('../../assets/icons/flower.png')}
              title={plandata[2]?.flower + ' ' + 'Flowers'}
              subtitle={'per month'}
            />

            <Container
              source={require('../../assets/icons/camera.png')}
              title={plandata[2]?.image + ' ' + 'Photo'}
            />
            <Container
              source={require('../../assets/icons/youtube.png')}
              title={plandata[2]?.video + ' ' + 'Video'}
            />
          </View>
        </ImageBackground>
      </Swiper>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          marginTop: 40,
          marginHorizontal: 20,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/back.png')
                : require('../../assets/icons/back_dark.png')
            }
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '700',
            color: theme.colors.primary,
            flex: 1,
            textAlign: 'center',
          }}>
          Subscription Plans
        </TextFormatted>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <Image
            source={
              ThemeMode.selectedTheme
                ? require('../../assets/icons/matches.png')
                : require('../../assets/icons/matches_dark.png')
            }
            style={{height: 40, width: 40, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 92,
          width: '100%',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          position: 'absolute',
          backgroundColor: '#fff',
          justifyContent: 'center',
          bottom: 0,
        }}>
        <TextFormatted
          style={{
            fontSize: 20,
            fontWeight: '700',
            color:
              slide == 0
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
            alignSelf: 'center',
            padding: 10,
          }}
          onPress={() => (slide > 0 ? refRBSheet1.current.open() : '')}>
          {slide == 0 ? 'Current Plan' : 'Upgrade Plan'}
        </TextFormatted>
      </View>
      <PlanCompaire refRBSheet={refRBSheet} />
      <UpgradePlan refRBSheet={refRBSheet1} />
      <Netinforsheet />
    </View>
  );
};

const UpgradePlan = ({refRBSheet}) => {
  const ThemeMode = useSelector(state => state.Theme);
  const planData = [
    {plan: '1 month', price: '0,99€'},
    {plan: '6 month', price: '3,99€', saving: 'Savings of 25%'},
    {plan: '1 year', price: '5,99€', saving: 'Savings of 50%'},
  ];
  const [selected, setSelected] = useState();
  const refRBSheet2 = useRef();
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={610}
      closeOnPressBack={true}
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {borderTopLeftRadius: 40, borderTopRightRadius: 40},
      }}>
      <StatusBar backgroundColor={'#00000077'} />
      <ImageBackground
        source={
          ThemeMode.selectedTheme
            ? require('../../assets/images/ViewPlanBg.png')
            : require('../../assets/images/ViewPlanBg_dark.png')
        }
        style={{flex: 1, marginTop: -25}}
        resizeMode="cover">
        <View
          style={{
            height: 4,
            width: 36,
            backgroundColor: '#fff',
            borderRadius: 10,
            alignSelf: 'center',
            marginTop: 10,
          }}
        />
        <Fontisto
          name="close-a"
          size={14}
          color="#fff"
          style={{
            alignSelf: 'flex-end',
            marginRight: 20,
            marginTop: 5,
            padding: 10,
          }}
          onPress={() => {
            // setSelected('');
            refRBSheet.current.close();
          }}
        />
        <ScrollView>
          <TextFormatted
            style={{
              fontSize: 26,
              fontWeight: '700',
              color: '#fff',
              textAlign: 'center',
              marginHorizontal: 30,
              marginTop: 5,
            }}>
            How many months do you want to buy?
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: '#fff',
              textAlign: 'center',
              marginHorizontal: 50,
              marginTop: 19,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </TextFormatted>
          {planData.map((v, i) => (
            <TouchableOpacity
              onPress={() => setSelected(v.plan)}
              style={{
                marginHorizontal: 30,
                borderWidth: 2,
                backgroundColor:
                  selected == v.plan ? theme.colors.primary : 'transparent',
                borderColor: theme.colors.primary,
                marginTop: 15,
                paddingVertical: 15,
                borderRadius: 10,
              }}>
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  color:
                    selected == v.plan
                      ? theme.colors.red
                      : theme.colors.primary,
                  textAlign: 'center',
                }}>
                {v.plan}
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 32,
                  fontWeight: '700',
                  color:
                    selected == v.plan
                      ? theme.colors.red
                      : theme.colors.primary,
                  textAlign: 'center',
                  marginTop: 5,
                }}>
                {v.price}
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  color:
                    selected == v.plan
                      ? theme.colors.primary
                      : theme.colors.red,
                  textAlign: 'center',
                  position: 'absolute',
                  right: 0,
                  backgroundColor:
                    selected == v.plan
                      ? v?.saving && theme.colors.red
                      : v?.saving && theme.colors.primary,
                  paddingVertical: 3,
                  paddingHorizontal: 6,
                  borderTopRightRadius: 8,
                  borderBottomLeftRadius: 10,
                }}>
                {v?.saving}
              </TextFormatted>
            </TouchableOpacity>
          ))}
          <Button
            marginBottom={30}
            buttonColor={
              selected ? ['#fff', '#fff'] : ['#FFFFFF80', '#FFFFFF80']
            }
            buttonName="Upgrade"
            color={theme.colors.red}
            disabled={selected ? false : true}
            onPress={() => refRBSheet2.current.open()}
          />
        </ScrollView>
      </ImageBackground>
      <Payment refRBSheet={refRBSheet2} />
    </RBSheet>
  );
};
const Container = ({title, subtitle, source}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        height: 70,
        width: 250,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#FFFFFF33',
        marginTop: 10,
      }}>
      <Image
        source={source}
        style={{height: 40, width: 40, resizeMode: 'contain'}}
      />
      <View style={{marginLeft: 15}}>
        <TextFormatted
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: theme.colors.primary,
          }}>
          {title}
        </TextFormatted>
        {subtitle && (
          <TextFormatted
            style={{
              fontSize: 15,
              fontWeight: '400',
              color: theme.colors.primary,
            }}>
            {subtitle}
          </TextFormatted>
        )}
      </View>
    </View>
  );
};

export default ViewPlan;

const styles = StyleSheet.create({});

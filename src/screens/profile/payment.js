import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import TextFormatted from '../../components/TextFormatted';
import {theme} from '../../utils/Constants';
import ButtonView from '../../components/buttonView';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import {Divider} from 'react-native-paper';
import AddNewCard from './profileComponent/addNewCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../utils/CustomImages';

const Payment = ({refRBSheet, isPlan}) => {
  const dimension = useWindowDimensions();
  const [autoPayment, setAutoPayment] = useState(true);
  const [selectedType, setSelectedType] = useState(3);
  const [credit, setCredit] = useState(true);
  const ThemeMode = useSelector(state => state.Theme);
  const refRBSheet1 = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={600}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        },
      }}>
      <StatusBar backgroundColor={'#00000077'} />
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
            marginBottom: 15,
          }}>
          Choose payment method
        </TextFormatted>
        <PaymentButton
          source={require('../../assets/icons/Paypal.png')}
          title={'PayPal'}
          onPress={() => setSelectedType(1)}
          transform={
            selectedType == 1 ? [{rotate: '-90deg'}] : [{rotate: '0deg'}]
          }
        />
        <PaymentButton
          source={require('../../assets/icons/google.png')}
          title={'Google Pay'}
          height={30}
          width={34}
          onPress={() => setSelectedType(2)}
          transform={
            selectedType == 2 ? [{rotate: '-90deg'}] : [{rotate: '0deg'}]
          }
        />
        <PaymentButton
          source={require('../../assets/icons/credit_card.png')}
          title={'Credit Card'}
          onPress={() => setCredit(!credit)}
          transform={
            credit == true ? [{rotate: '-90deg'}] : [{rotate: '0deg'}]
          }>
          {credit == true && (
            <View>
              <Divider />
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginTop: 10,
                  paddingVertical: 5,
                }}>
                <Image
                  source={require('../../assets/icons/Mastercard.png')}
                  style={{height: 35, width: 35, resizeMode: 'contain'}}
                />
                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  5333 **** **** 1798
                </TextFormatted>

                <Image
                  source={
                    ThemeMode.themecolr == 'Red'
                      ? RedlightImage.check_red
                      : ThemeMode.themecolr == 'Blue'
                      ? BluelightImage.check_blue
                      : ThemeMode.themecolr == 'Green'
                      ? GreenlightImage.check_green
                      : ThemeMode.themecolr == 'Purple'
                      ? PurplelightImage.check_purple
                      : ThemeMode.themecolr == 'Yellow'
                      ? YellowlightImage.check_yellow
                      : RedlightImage.check_red
                  }
                  style={{height: 28, width: 28, resizeMode: 'contain'}}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 15,
                  paddingVertical: 5,
                }}
                onPress={() => refRBSheet1.current.open()}>
                <Image
                  source={require('../../assets/icons/C_plus.png')}
                  style={{
                    height: 24,
                    width: 24,
                    resizeMode: 'contain',
                    tintColor:
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
                  }}
                />

                <TextFormatted
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: ThemeMode.selectedTheme
                      ? theme.colors.primaryBlack
                      : theme.colors.primary,
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  Add new card
                </TextFormatted>
              </TouchableOpacity>
            </View>
          )}
        </PaymentButton>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 22,
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '400',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              flex: 1,
              marginRight: 23,
            }}>
            Enable automatic monthly payment with the selected card
          </TextFormatted>
          <TouchableOpacity
            onPress={() => setAutoPayment(!autoPayment)}
            style={{alignItems: 'center', alignSelf: 'center', padding: 2}}>
            <Image
              resizeMode="contain"
              style={{width: 58, height: 33}}
              source={
                ThemeMode.themecolr == 'Red'
                  ? autoPayment
                    ? RedlightImage.On_switchs
                    : RedlightImage.Off_switchs
                  : ThemeMode.themecolr == 'Blue'
                  ? autoPayment
                    ? BluelightImage.On_switchs_blue
                    : BluelightImage.Off_switchs_blue
                  : ThemeMode.themecolr == 'Green'
                  ? autoPayment
                    ? GreenlightImage.On_switchs_green
                    : GreenlightImage.Off_switchs_green
                  : ThemeMode.themecolr == 'Purple'
                  ? autoPayment
                    ? PurplelightImage.On_switchs_purplle
                    : PurplelightImage.Off_switchs_purplle
                  : ThemeMode.themecolr == 'Yellow'
                  ? autoPayment
                    ? YellowlightImage.On_switchs_yellow
                    : YellowlightImage.Off_switchs_yellow
                  : autoPayment
                  ? RedlightImage.On_switchs
                  : RedlightImage.Off_switchs
              }
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ButtonView height={100}>
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
          buttonName={'Continue'}
          color={theme.colors.primary}
          marginTop={1}
          marginBottom={1}
          width={dimension.width / 2 - 20}
          onPress={() => refRBSheet2.current.open()}
        />
      </ButtonView>
      <AddNewCard refRBSheet={refRBSheet1} refRBSheet2={refRBSheet1} />
      <RecapPayment
        refRBSheet={refRBSheet2}
        refRBSheet2={refRBSheet2}
        refRBSheet3={refRBSheet3}
        isPlan={isPlan}
      />
      <SuccessPayment refRBSheet={refRBSheet3} />
    </RBSheet>
  );
};

const RecapPayment = ({refRBSheet, refRBSheet2, refRBSheet3, isPlan}) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={330}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        },
      }}>
      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginHorizontal: 20,
            marginTop: 30,
          }}>
          You are about to buy...
        </TextFormatted>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          {!isPlan ? (
            <TextFormatted
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: theme.colors.darkGrey,
                marginLeft: 10,
                flex: 1,
              }}>
              1 Month
            </TextFormatted>
          ) : (
            <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
              <Image
                source={require('../../assets/icons/Rocket.png')}
                style={{height: 24, width: 24, resizeMode: 'contain'}}
              />
              <TextFormatted
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: ThemeMode.selectedTheme
                    ? theme.colors.primaryBlack
                    : theme.colors.primary,
                  marginLeft: 10,
                }}>
                10
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: theme.colors.darkGrey,
                  marginLeft: 10,
                  flex: 1,
                }}>
                Boost
              </TextFormatted>
            </View>
          )}
          <TextFormatted
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }}>
            1,99 €
          </TextFormatted>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: 20,
            marginVertical: 20,
          }}>
          <TextFormatted
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
              flex: 1,
            }}>
            Total price
          </TextFormatted>
          <TextFormatted
            style={{
              fontSize: 26,
              fontWeight: '700',
              color: ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary,
            }}>
            1,99 €
          </TextFormatted>
        </View>
      </ScrollView>
      <ButtonView height={100}>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '700',
            color: '#8490AE',
            width: dimension.width / 2 - 20,
            textAlign: 'center',
          }}
          onPress={() => refRBSheet2.current.close()}>
          Cancel
        </TextFormatted>
        <Button
          buttonName={'Continue'}
          color={theme.colors.primary}
          marginTop={1}
          marginBottom={1}
          width={dimension.width / 2 - 20}
          onPress={() => {
            refRBSheet3.current.open();
            refRBSheet2.current.close();
          }}
        />
      </ButtonView>
    </RBSheet>
  );
};
const SuccessPayment = ({refRBSheet}) => {
  const navigation = useNavigation();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={500}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        wrapper: {},
        draggableIcon: {backgroundColor: '#8490AE'},
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: ThemeMode.selectedTheme
            ? theme.colors.primary
            : theme.colors.primaryBlack,
        },
      }}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image
          source={require('../../assets/icons/checked.png')}
          style={{
            height: 97,
            width: 97,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: 40,
          }}
        />
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginHorizontal: 20,
            marginTop: 20,
            alignSelf: 'center',
          }}>
          Well done!
        </TextFormatted>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginHorizontal: 50,
            marginTop: 5,
            textAlign: 'center',
          }}>
          The payment has been successful.
        </TextFormatted>
      </View>
      <Button
        buttonName={'Start match'}
        color={theme.colors.primary}
        marginBottom={20}
        onPress={() => navigation.navigate('homePage')}
      />
    </RBSheet>
  );
};
const PaymentButton = ({
  source,
  title,
  children,
  transform,
  onPress,
  height,
  width,
}) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: ThemeMode.selectedTheme
          ? theme.colors.primary
          : theme.colors.primaryBlack,
        marginVertical: 7,
        shadowColor: '#8490ae85',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Image
          source={source}
          style={{
            height: height || 35,
            width: width || 35,
            resizeMode: 'contain',
          }}
        />
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary,
            marginLeft: 10,
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
            transform: transform,
            tintColor: '#8490AE',
          }}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({});

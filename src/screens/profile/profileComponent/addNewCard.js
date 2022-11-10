import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TextFormatted from '../../../components/TextFormatted';
import {theme} from '../../../utils/Constants';
import TextInputFormat from '../../../components/TextInputFormat';
import ButtonView from '../../../components/buttonView';
import Button from '../../../components/Button';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaskInput from '../../../components/maskInput';
import {useSelector} from 'react-redux';
import {
  BluelightImage,
  GreenlightImage,
  PurplelightImage,
  RedlightImage,
  YellowlightImage,
} from '../../../utils/CustomImages';
import {ShowToast} from '../../../utils/Baseurl';

const AddNewCard = ({refRBSheet, refRBSheet2}) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  // const [cardNumber, setCardNumber] = useState('5105105105105100');
  const [cardNumber, setCardNumber] = useState('');
  const [cardspac, setCardspac] = useState();
  const [_, setrefresh] = useState({});
  const [holderName, seTHolderName] = useState();
  const [expiryDate, setExpiryDate] = useState([]);
  const [cvv, setCvv] = useState();
  const ex_year = expiryDate.slice(3, 5);
  const c_month = expiryDate.slice(0, 2);
  const [ValidText, setValidText] = useState(false);

  const cardtValidation = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro:
      /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
  };

  const c_valid = () => {
    if (
      ex_year < new Date().getFullYear().toString().slice(2, 4) &&
      c_month >= new Date().getMonth().toString() &&
      parseInt(c_month) > 0 &&
      parseInt(c_month) <= 12
    ) {
      refRBSheet.current.close();
      setValidText(false);
    } else {
      setValidText(true);
    }
  };
  useEffect(() => {
    setCardNumber(cardNumber.split(' ').join(''));
  }, [cardNumber]);
  return (
    <RBSheet
      ref={refRBSheet}
      closeOnDragDown={true}
      height={dimension.width * 1.77}
      closeOnPressBack={true}
      dragFromTopOnly
      keyboardAvoidingViewEnabled={true}
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
        <ImageBackground
          source={
            ThemeMode.themecolr == 'Red'
              ? RedlightImage.card
              : ThemeMode.themecolr == 'Blue'
              ? BluelightImage.card_blue
              : ThemeMode.themecolr == 'Green'
              ? GreenlightImage.card_green
              : ThemeMode.themecolr == 'Purple'
              ? PurplelightImage.card_purple
              : ThemeMode.themecolr == 'Yellow'
              ? YellowlightImage.card_yellow
              : RedlightImage.card
          }
          style={{
            height: 200,
            width: dimension.width - 40,
            alignSelf: 'center',
            marginTop: 20,
          }}
          imageStyle={{borderRadius: 40}}
          resizeMode="cover">
          <View style={{height: 110}} />
          <View style={{marginHorizontal: 20}}>
            <TextFormatted
              style={{
                fontSize: !cardspac ? 30 : 23,
                fontWeight: '700',
                color: theme.colors.primary,
              }}>
              {!cardspac ? '**** **** **** ****' : cardspac}
            </TextFormatted>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <TextFormatted
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: theme.colors.primary,
                  marginRight: 15,
                  flex: 1,
                  textTransform: 'uppercase',
                }}>
                {!holderName ? 'Name Surname' : holderName}
              </TextFormatted>
              <TextFormatted
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                  color: theme.colors.primary,
                }}>
                {!expiryDate ? '**/**' : expiryDate}
              </TextFormatted>
            </View>
          </View>
        </ImageBackground>
        <MaskInput
          value={cardNumber}
          onChangeText={v => {
            setCardNumber(v);
            setCardspac(v);
          }}
          maxLength={19}
          type="credit-card"
          label={'Card Number'}
          placeholder={'**** **** **** ****'}
          containerStyle={{marginTop: 20}}
          right={
            <Image
              source={
                cardtValidation.mastercard.test(cardNumber)
                  ? require('../../../assets/icons/Mastercard.png')
                  : cardtValidation.visa.test(cardNumber)
                  ? require('../../../assets/icons/Visa_Inc_logo.png')
                  : cardtValidation.amex.test(cardNumber)
                  ? require('../../../assets/icons/amax.png')
                  : cardtValidation.dankort.test(cardNumber)
                  ? require('../../../assets/icons/dankort.png')
                  : cardtValidation.diners.test(cardNumber)
                  ? require('../../../assets/icons/diners.png')
                  : cardtValidation.discover.test(cardNumber)
                  ? require('../../../assets/icons/discover.png')
                  : cardtValidation.electron.test(cardNumber)
                  ? require('../../../assets/icons/electron.png')
                  : cardtValidation.interpayment.test(cardNumber)
                  ? require('../../../assets/icons/interpayment.png')
                  : cardtValidation.jcb.test(cardNumber)
                  ? require('../../../assets/icons/jcb.png')
                  : cardtValidation.maestro.test(cardNumber)
                  ? require('../../../assets/icons/Maestro.png')
                  : cardtValidation.unionpay.test(cardNumber)
                  ? require('../../../assets/icons/UnionPay.png')
                  : ''
              }
              resizeMode="contain"
              style={{width: 49, height: 16}}
            />
          }
        />
        <TextInputFormat
          labelColor={
            ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          value={holderName}
          onChangeText={seTHolderName}
          label={'Card Holder Name'}
          placeholder={'Enter name on your card'}
          containerStyle={{marginTop: 20}}
        />

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            marginBottom: 20,
          }}>
          <MaskInput
            value={expiryDate}
            onChangeText={setExpiryDate}
            type={'datetime'}
            maxLength={5}
            options={{
              format: 'MM/YY',
            }}
            labelColor={
              /*  ValidText == true
                ? theme.colors.red
                : */ ThemeMode.selectedTheme
                ? theme.colors.primaryBlack
                : theme.colors.primary
            }
            label={
              /*  ValidText == true ? 'Invalid Experation Date' : */ 'Experation Date'
            }
            marginHorizontal={5}
            marginLeft={20}
            placeholder={'MM/YY'}
            containerStyle={{flex: 1, marginTop: 20}}
          />
          <MaskInput
            value={cvv}
            onChangeText={setCvv}
            type={'only-numbers'}
            marginLeft={20}
            maxLength={3}
            label={'Security Code'}
            marginHorizontal={5}
            containerStyle={{flex: 1, marginTop: 20}}
            placeholder={'***'}
          />
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
          onPress={() => {
            refRBSheet.current.close();
            // refRBSheet2.current.close();
          }}>
          Cancel
        </TextFormatted>
        <Button
          opacity={!cardNumber || !holderName || !expiryDate || !cvv ? 0.5 : 1}
          buttonName={'Save Card'}
          color={theme.colors.primary}
          marginTop={1}
          marginBottom={1}
          width={dimension.width / 2 - 20}
          disabled={
            !cardNumber || !holderName || !expiryDate || !cvv ? true : false
          }
          onPress={() => refRBSheet.current.close() /*  c_valid() */}
        />
      </ButtonView>
    </RBSheet>
  );
};

export default AddNewCard;

const styles = StyleSheet.create({});

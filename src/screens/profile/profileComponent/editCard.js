import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import TextFormatted from '../../../components/TextFormatted';
import { theme } from '../../../utils/Constants';
import TextInputFormat from '../../../components/TextInputFormat';
import ButtonView from '../../../components/buttonView';
import Button from '../../../components/Button';
import { TextInputMask } from 'react-native-masked-text';
import MaskInput from '../../../components/maskInput';
import { useDispatch, useSelector } from 'react-redux';

import RBSheet from 'react-native-raw-bottom-sheet';
const EditCard = ({ refRBSheet3 }) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  const [cardNumber, setCardNumber] = useState('1234 5678 9123 4567');
  const [holderName, seTHolderName] = useState('Alexander Doe');
  const [expiryDate, setExpiryDate] = useState('01/29');
  const [cvv, setCvv] = useState('123');
  return (
    <RBSheet
      ref={refRBSheet3}
      closeOnDragDown={true}
      height={600}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        wrapper: {},
        draggableIcon: { backgroundColor: '#8490AE' },
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
        },
      }}
    >
      <StatusBar backgroundColor={'#00000077'} />
      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
            marginLeft: 25,
          }}
        >
          Edit Card
        </TextFormatted>
        <ImageBackground
          source={require('../../../assets/images/card_1.png')}
          style={{ height: 200, width: dimension.width - 40, alignSelf: 'center', marginTop: 20, marginBottom: 20 }}
          imageStyle={{ borderRadius: 40 }}
          resizeMode="cover"
        >
          <View style={{ height: 110 }} />
          <View style={{ marginHorizontal: 25 }}>
            <TextFormatted style={{ fontSize: 21, fontWeight: '700', color: theme.colors.primary }}>{cardNumber}</TextFormatted>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
              <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primary, flex: 1 }}>{holderName}</TextFormatted>
              <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primary }}>{expiryDate}</TextFormatted>
            </View>
          </View>
        </ImageBackground>
        {/* <TextInputMask
          type={'credit-card'}
          options={{
            obfuscated: false,
            issuer: 'visa-or-mastercard',
          }}
          // maxLength={}
          value={cardNumber}
          onChangeText={setCardNumber}
          style={{
            backgroundColor: theme.colors.primary,
            marginHorizontal: 20,
            borderRadius: 20,
            paddingHorizontal: 20,
            height: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            flex: 1,
          }}
        /> */}
        <MaskInput
          value={cardNumber}
          onChangeText={setCardNumber}
          type="credit-card"
          label={'Card Number'}
          right={<Image source={require('../../../assets/icons/Visa_Inc_logo.png')} style={{ height: 16, width: 49, resizeMode: 'contain' }} />}
        />
        <TextInputFormat
          value={holderName}
          onChangeText={seTHolderName}
          label={'Card Holder Name'}
          placeholder={'Enter name on your card'}
          containerStyle={{ marginTop: 20 }}
        />
        <View style={{ flexDirection: 'row', marginHorizontal: 15, marginBottom: 20 }}>
          {/* <TextInputFormat
            value={expiryDate}
            onChangeText={setExpiryDate}
            label={'Expiration Date'}
            placeholder={'MM/YY'}
            containerStyle={{ flex: 1, marginTop: 20 }}
            marginHorizontal={5}
            leftlabel={20}
          />
          <TextInputFormat
            value={cvv}
            onChangeText={setCvv}
            label={'Security Code'}
            placeholder={'***'}
            containerStyle={{ flex: 1, marginTop: 20 }}
            marginHorizontal={5}
            leftlabel={20}
          /> */}
          <MaskInput
            value={expiryDate}
            onChangeText={setExpiryDate}
            type={'datetime'}
            options={{
              format: 'DD/MM',
            }}
            label={'Experation Date'}
            marginHorizontal={5}
            marginLeft={20}
            containerStyle={{ flex: 1, marginTop: 20 }}
          />
          <MaskInput
            value={cvv}
            onChangeText={setCvv}
            type={'only-numbers'}
            marginLeft={20}
            maxLength={3}
            label={'Security Code'}
            marginHorizontal={5}
            containerStyle={{ flex: 1, marginTop: 20 }}
          />
        </View>
      </ScrollView>
      <ButtonView height={100}>
        <TextFormatted
          style={{ fontSize: 18, fontWeight: '700', color: '#8490AE', width: dimension.width / 2 - 20, textAlign: 'center' }}
          onPress={() => refRBSheet3.current.close()}
        >
          Cancel
        </TextFormatted>
        <Button
          buttonColor={theme.colors.primaryOn}
          buttonName={'Edit Card'}
          color={theme.colors.primary}
          marginTop={1}
          marginBottom={1}
          width={dimension.width / 2 - 20}
          onPress={() => refRBSheet3.current.close()}
        />
      </ButtonView>
    </RBSheet>
  );
};

export default EditCard;

const styles = StyleSheet.create({});

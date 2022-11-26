import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../../src/screens/auth/Splash';
import LanguageSelection from '../../src/screens/auth/LanguageSelection';
import Login from '../../src/screens/auth/Login';
import PasswordRecovery from '../../src/screens/auth/PasswordRecovery';
import Signup from '../../src/screens/auth/Signup';
import EmailOtp from '../../src/screens/auth/EmailOtp';
import ChangePassword from '../../src/screens/auth/ChangePassword';
import SuccessPassword from '../../src/screens/auth/SuccessPassword';
import FingerPrint from '../../src/screens/auth/FingerPrint';
import PassCode from '../../src/screens/auth/PassCode';
import RecoveryPassCode from '../../src/screens/auth/RecoveryPassCode';
// import ForgotPasscode from '../../src/screens/auth/ForgotPasscode';
// import EmailPasscode from '../../src/screens/auth/EmailPasscode';
import TermCondition from '../../src/screens/auth/termCondition';
import Step1 from '../../src/screens/auth/createAccount/step1';
import Step2 from '../../src/screens/auth/createAccount/step2';
import Step3 from '../../src/screens/auth/createAccount/step3';
import Step4 from '../../src/screens/auth/createAccount/step4';
import Step5 from '../../src/screens/auth/createAccount/step5';
import Step6 from '../../src/screens/auth/createAccount/step6';
import Step7 from '../../src/screens/auth/createAccount/step7';
import Step8 from '../../src/screens/auth/createAccount/step8';

import HomePage from '../screens/home/homePage';
import PlayVideo from '../screens/profile/profileComponent/playVideo';
import ViewSelfMedia from '../screens/profile/viewSelfmedia';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen component={Splash} name="Splash" />
      <Stack.Screen component={LanguageSelection} name="LanguageSelection" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={PasswordRecovery} name="PasswordRecovery" />
      <Stack.Screen component={EmailOtp} name="EmailOtp" />
      <Stack.Screen component={Signup} name="Signup" />
      <Stack.Screen component={ChangePassword} name="ChangePassword" />
      <Stack.Screen component={SuccessPassword} name="SuccessPassword" />
      <Stack.Screen component={FingerPrint} name="FingerPrint" />
      <Stack.Screen component={PassCode} name="PassCode" />
      <Stack.Screen component={RecoveryPassCode} name="RecoveryPassCode" />
      <Stack.Screen component={TermCondition} name="TermCondition" />
      <Stack.Screen component={Step1} name="step1" />
      <Stack.Screen component={Step2} name="step2" />
      <Stack.Screen component={Step3} name="step3" />
      <Stack.Screen component={Step4} name="step4" />
      <Stack.Screen component={Step5} name="step5" />
      <Stack.Screen component={Step6} name="step6" />
      <Stack.Screen component={Step7} name="step7" />
      <Stack.Screen component={Step8} name="step8" />
      <Stack.Screen component={HomePage} name="HomePage" />
      <Stack.Screen component={PlayVideo} name="playVideo" />
      <Stack.Screen name="viewSelfMedia" component={ViewSelfMedia} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});

import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from '../screens/home/homePage';
import UserProfile from '../screens/home/userProfile';
import ViewImage from '../screens/home/homeComponent/viewImage';
import MyProfile from '../screens/profile/myProfile';
import Message from '../screens/messages/message';
import EditProfile from '../screens/profile/editProfile';
import Settings from '../screens/profile/settings';
import ViewPlan from '../screens/profile/viewPlan';
import ProfileSetting from '../screens/profile/profileSetting';
import EditPassions from '../screens/profile/editPassions';
import SelectYourType from '../screens/profile/selectYourType';
import FilterLocation from '../screens/profile/filterLocation';
import AboutUs from '../screens/profile/aboutUs';
import Security from '../screens/profile/security';
import ChangeLanguage from '../screens/profile/ChangeLanguage';
import ChatList from '../screens/messages/chatList';
import Chats from '../screens/messages/chats';
import Appearance from '../screens/profile/appearance';
import ViewSelfMedia from '../screens/profile/viewSelfmedia';
import Images from '../screens/profile/profileComponent/images';
import PlayVideo from '../screens/profile/profileComponent/playVideo';
import TermCondition from '../screens/auth/termCondition';
import Login from '../screens/auth/Login';

const Stack = createNativeStackNavigator();
const HomeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomePage"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="homePage" component={HomePage} />
      <Stack.Screen name="userProfile" component={UserProfile} />
      <Stack.Screen name="viewImage" component={ViewImage} />
      <Stack.Screen name="myProfile" component={MyProfile} />
      <Stack.Screen name="message" component={Message} />
      <Stack.Screen name="chatList" component={ChatList} />
      <Stack.Screen name="chats" component={Chats} />
      <Stack.Screen name="editProfile" component={EditProfile} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="viewPlan" component={ViewPlan} />
      <Stack.Screen name="profileSetting" component={ProfileSetting} />
      <Stack.Screen name="editPassions" component={EditPassions} />
      <Stack.Screen name="selectYourType" component={SelectYourType} />
      <Stack.Screen name="filterLocation" component={FilterLocation} />
      <Stack.Screen name="aboutUs" component={AboutUs} />
      <Stack.Screen name="security" component={Security} />
      <Stack.Screen name="ChangeLanguage" component={ChangeLanguage} />
      <Stack.Screen name="appearance" component={Appearance} />
      <Stack.Screen name="viewSelfMedia" component={ViewSelfMedia} />
      <Stack.Screen name="playVideo" component={PlayVideo} />
      <Stack.Screen name="TermCondition" component={TermCondition} />
      <Stack.Screen name="images" component={Images} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;

const styles = StyleSheet.create({});

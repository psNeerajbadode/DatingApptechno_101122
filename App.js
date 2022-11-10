import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import AppNavigation from './src/navigation/appNavigation';
import {MenuProvider} from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';
import TextFormatted from './src/components/TextFormatted';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MenuProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen component={AppNavigation} name="AppNavigation" />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast
            visibilityTime={1500}
            autoHide={true}
            config={{
              success: props => (
                <View
                  style={{
                    ...styles.toastContainer,
                  }}>
                  <TextFormatted
                    style={{
                      ...styles.toasttext,
                    }}>
                    {props.text1}
                  </TextFormatted>
                </View>
              ),
              error: props => (
                <View
                  style={{
                    ...styles.toastContainer,
                  }}>
                  <TextFormatted
                    style={{
                      ...styles.toasttext,
                    }}>
                    {props.text1}
                  </TextFormatted>
                </View>
              ),
            }}
          />
        </MenuProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  toastContainer: {
    backgroundColor: '#fff',
    width: '90%',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 10,
  },
  toasttext: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 12,
    textTransform: 'capitalize',
  },
});

export const Baseurl = 'https://technorizen.com/Dating/webservice/';
import Toast from 'react-native-toast-message';
export const ShowToast = (msg, type = 'success', otherProps = {}) =>
  Toast.show({text1: msg, type, ...otherProps});

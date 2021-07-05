import { Platform } from 'react-native'

let baseURL = '';

{ Platform.OS == 'android'
  ? baseURL = 'http://192.168.200.10:5000/api/v1/'
  : baseURL = 'http://localhost:5000/api/v1/'
}

export default baseURL

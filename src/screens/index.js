import { Navigation } from 'react-native-navigation';

import Home from './home/Home';
import SavePage from './save-page/SavePage';

export function registerScreens(){
  Navigation.registerComponent('example.Home', () => Home);
  Navigation.registerComponent('page.SavePage', () => SavePage);
}
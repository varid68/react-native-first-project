import React from 'react';
import { Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import { Header, Icon, Body } from 'native-base';

export default class CustomHeader extends React.Component {

  showAlert() {
    Alert.alert(
      'Hapus Semua',
      'Waktu tersimpan yang dihapus tidak dapat dikembalikan lagi, Apakah anda '
      + 'yakin ingin menghapus semua waktu yang tersimpan?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => AsyncStorage.removeItem('saved').then(() => this.setState({ saved: null })) },
      ],
      { cancelable: false }
    );
  }


  render() {
    return (
      <Header
        style={{ backgroundColor: '#009688' }}
        androidStatusBarColor='#00897B'>

        <TouchableOpacity
          onPress={() => this.props.pop()}
          style={{ alignSelf: 'center', width: 40 }}>
          <Icon name='arrow-dropleft' style={{ color: '#fff', fontSize: 45 }} />
        </TouchableOpacity>

        <Body>
          <Text style={{ color: '#fff', fontSize: 16 }}>Riwayat Waktu</Text>
          <Text style={{ color: '#fff' }}>Terbit Terbenam Disimpan</Text>
        </Body>

        <TouchableOpacity
          onPress={() => this.showAlert()}
          style={{ alignSelf: 'center', marginRight: 10 }}>
          <Icon name='ios-trash-outline' style={{ color: '#fff' }} />
        </TouchableOpacity>
      </Header>
    );
  }

}
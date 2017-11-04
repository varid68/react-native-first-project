import React from 'react';
import { Container, Content } from 'native-base';
import { View, Text, AsyncStorage, Dimensions } from 'react-native';

// IMPORT COMPONENTS
import Header from './components/CustomHeader';
import SavePageList from './components/SavePageList';

export default class SavePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      saved: []
    };
  }


  componentDidMount() {
    this.getStorage();
  }


  static navigatorStyle = {
    navBarHidden: true
  }


  getStorage() {
    AsyncStorage.getItem('saved').then(val => {
      this.setState({ saved: JSON.parse(val) });
    });
  }


  pop() {
    this.props.navigator.pop({
      animated: true,
      animationType: 'fade'
    });
  }


  render() {
    const { saved } = this.state;
    const height = Dimensions.get('window').height - 70;

    return (
      <Container>
        <Header
          get={this.getStorage.bind(this)}
          pop={this.pop.bind(this)} />

        <Content>
          {saved != null
            ? <SavePageList
              datas={saved}
              getStorage={this.getStorage.bind(this)} />
            : <View style={{ flex: 1, justifyContent: 'center', height: height }}>
              <Text style={{ textAlign: 'center' }}>Belum ada data untuk ditampilkan</Text>
            </View>
          }
        </Content>
      </Container>
    );
  }

  
}

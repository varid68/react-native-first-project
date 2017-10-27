import React from 'react';
import { Container } from 'native-base';
import { View, Text, AsyncStorage } from 'react-native';

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
    let { saved } = this.state;

    return (
      <Container>
        <Header
          pop={this.pop.bind(this)} />

        {saved != null
          ? <View>
            {saved.map((item, key) =>
              <SavePageList
                item={item}
                key={key}
                getStorage={this.getStorage.bind(this)} />
            )}
          </View>
          : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center' }}>Belum ada data untuk ditampilkan</Text>
          </View>
        }
      </Container>
    );
  }

}
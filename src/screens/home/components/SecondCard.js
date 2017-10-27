import React from 'react';
import { Card, CardItem, Body, Button } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';

export const SecondCard = (props) => {

  const { sunrise, sunset, solar_noon, day_length, civil_twilight_begin, civil_twilight_end,
    nautical_twilight_begin, nautical_twilight_end, astronomical_twilight_begin, astronomical_twilight_end } = props.time;

  return (
    <Card style={{ marginBottom: 20 }}>
      <CardItem style={styles.card}>
        <Body>
          <Text style={{ color: '#009688' }}>Waktu Terbit Terbenam</Text>
          {<Text > {props.date} </Text>}
          <View style={styles.lineView}>
            <Text style={styles.line}></Text>
          </View>
          <Text style={{ marginTop: 20 }}>Waktu Matahari Terbit</Text>
          <Text style={{ color: '#000' }}>{sunrise}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Matahari Terbenam</Text>
          <Text style={{ color: '#000' }}>{sunset}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Matahari Tepat di atas (Tengah Hari)</Text>
          <Text style={{ color: '#000' }}>{solar_noon}</Text>

          <Text style={{ marginTop: 15 }}>Panjang Waktu Matahari Bersinar</Text>
          <Text style={{ color: '#000' }}>{day_length}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Civil Twilight Dimulai</Text>
          <Text style={{ color: '#000' }}>{civil_twilight_begin}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Civil Twilight Berakhir</Text>
          <Text style={{ color: '#000' }}>{civil_twilight_end}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Nautical Twilight Dimulai</Text>
          <Text style={{ color: '#000' }}>{nautical_twilight_begin}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Nautical Twilight Berakhir</Text>
          <Text style={{ color: '#000' }}>{nautical_twilight_end}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Astronomical Twilight Dimulai</Text>
          <Text style={{ color: '#000' }}>{astronomical_twilight_begin}</Text>

          <Text style={{ marginTop: 15 }}>Waktu Astronomical Twilight Berakhir</Text>
          <Text style={{ color: '#000' }}>{astronomical_twilight_end}</Text>

          <Button
            transparent
            style={{ alignSelf: 'flex-end' }}
            onPress={() => props.storeToStorage()}>

            <Text style={{ color: '#FFC107' }}>SIMPAN</Text>
          </Button>
        </Body>
      </CardItem>
    </Card>
  );
};

export default SecondCard;

const styles = StyleSheet.create({
  card: {
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10
  },

  lineView: {
    flex: 1,
    flexDirection: 'row'
  },
  line: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderStyle: 'solid'
  }
});
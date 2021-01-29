import React, { Component } from "react";
import { ImageBackground, StyleSheet, View, Image } from "react-native";

import {
  Header,
  Title,
  Input,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Picker,
  Form,
} from "native-base";
import * as Font from "expo-font";

const image = { uri: "https://reactjs.org/logo-og.png" };

const bg = require("./assets/bg.png");
const currencyLogo = require("./assets/currencyLogo.png");


export default class HeaderNoShadow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      fontsLoaded: false,
    };
  }

  onValueChange(value) {
    this.setState({
      selected: value,
    });
  }

  async loadFonts() {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Montserrat: require("./assets/fonts/Montserrat/Montserrat-Bold.ttf"),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      "Montserrat-SemiBold": {
        uri: require("./assets/fonts/Montserrat/Montserrat-SemiBold.ttf"),
        fontDisplay: Font.FontDisplay.FALLBACK,
      },
    });
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
  }

  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("./assets/bg.png")}
            style={styles.image}
          >
            <Header noShadow>
              <Left>
                <Title>C_Exchange</Title>
              </Left>

              <Right>
                <Button transparent>
                  <Icon name="settings" />
                </Button>
              </Right>
            </Header>

            <Content style={styles.container}>
              <Image source={currencyLogo} style={styles.currencyLogo} />

              <Form style={styles.container}>
                <View style={styles.field}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    placeholder="Select your SIM"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    style={{ width: undefined }}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                    style={styles.ratePicker}
                  >
                    <Picker.Item label="USD" value="key0" />
                    <Picker.Item label="ATM" value="key1" />
                    <Picker.Item label="Deb" value="key2" />
                    <Picker.Item label="Cre" value="key3" />
                    <Picker.Item label="Net" value="key4" />
                  </Picker>
                  <Input
                    placeholder="Enter Value"
                    style={styles.currencyInput}
                    keyboardType="numeric"
                    keyboardAppearance="light"
                  />
                </View>
              </Form>
              <Text style={styles.currencyText}>1 USD = 1 NR</Text>
            </Content>
          </ImageBackground>
        </View>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0",
  },
  currencyLogo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
    width: 100,
    height: 100,
  },
  field: {
    flexDirection: "row",
  },
  currency: {
    marginTop: 10,
    flex: 1,
    marginLeft: 5,

    //alignSelf: "flex-start"
    justifyContent: "space-between",
    height: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 3,
  },
  currencyInput: {
    marginTop: 10,
    flex: 3,
    marginRight: 5,

    //alignSelf: "flex-start"
    justifyContent: "space-between",
    height: 30,
    backgroundColor: "white",
    borderLeftWidth: 5,
    borderColor: "darkslategray",
    paddingLeft: 10,
    borderRadius: 3,
    height: 40,
  },
  ratePicker: {
    marginTop: 10,
    flex: 1,
    marginLeft: 5,
    //alignSelf: "flex-start"
    justifyContent: "space-between",
    height: 30,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "yellow",
    borderRadius: 3,
    height: 40,
  },

  currencyText: {
    marginLeft: 5,
    marginTop: 10,
    alignSelf: "center",
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    fontFamily: "Montserrat",
  },
});

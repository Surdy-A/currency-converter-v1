import React, { Component, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  Image,
  TextInput,
} from "react-native";
import {
  Header,
  Title,
  Input,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Text,
  Picker,
  Form,
} from "native-base";
import Api from "./components/Api";
import { useFonts } from "expo-font";

const image = { uri: "https://reactjs.org/logo-og.png" };

const bg = require("./assets/bg.png");
const currencyLogo = require("./assets/currencyLogo.png");
const endpoint = "latest";
const api_key = "e00648f89527be1d3a00e3792ce96add";

const base_url = "https://api.currencyscoop.com/v1/";

function App() {
  let baseRate = 3.6752;
  const [rates, setRates] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [selected, setSelected] = useState("AED");
  const [currencyOutput, setCurrencyOutput] = useState("AFN");

  const [currencyInput, setCurrencyInput] = useState(baseRate);
  const [amountOutput, setAmountOutput] = useState(1);
  const [answer, setAnswer] = useState();

  let fromValue = 3.122;
  let toValue = 3.122;
  let otherValue = 3.122;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const [loaded] = useFonts({
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  const onValueChange = (value) => {
    setSelected(value);
    console.log("selected " + selected);
  };

  const onCurrencyOutputChange = (value) => {
    setCurrencyOutput(value);
    console.log("selected " + currencyOutput);
  };

  const handleCurrencyInput = (currencyInput) => {
    currencyInput = parseFloat(currencyInput.replace(/[-, ]/g, ""));
    if (Number.isNaN(currencyInput)) return (currencyInput = 1);
    setAmountOutput(calculate(amountOutput));
    setCurrencyInput(calculate(currencyInput));
  };

  const handleAmountOutput = (amountOutput) => {
    amountOutput = parseFloat(amountOutput.replace(/[-, ]/g, ""));
    if (Number.isNaN(amountOutput)) return (amountOutput = 1);
    setCurrencyInput(calculate(currencyInput));

    setAmountOutput(calculate(amountOutput));
  };

  const calculate = (amountOutput) => {
    let answer;
    {
      rates
        ? Object.entries(rates).forEach(([key, value]) => {
            currencyOutput == key ? (toValue = value) : (otherValue = value);
            selected == key ? (fromValue = value) : (otherValue = value);
          })
        : null;
    }

    console.log("from value = to value " + fromValue + " " + toValue);
    if (fromValue < toValue) {
      answer = toValue / fromValue;
    } else {
      answer = toValue / fromValue;
    }
    return answer;
  };

  useEffect(() => {
    fetchAPI = async () => {
      try {
        const rates = await fetch(base_url + endpoint + "?api_key=" + api_key);

        const currency = await fetch(
          base_url + "currencies" + endpoint + "?api_key=" + api_key
        );

        const dataJSON = await rates.json();
        const currencyJSON = await currency.json();

        if (dataJSON && currencyJSON) {
          setRates(dataJSON.response.rates);
          setCurrency(Object.values(currencyJSON.response.fiats));
          //console.log(dataJSON.response.rates);
          //console.log(currencyJSON.response.fiats);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchAPI();
  }, [currencyInput, amountOutput, selected, currencyOutput]);

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require("./assets/bg.png")} style={styles.image}>
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
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Currency"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={selected}
                onValueChange={onValueChange}
                style={styles.ratePicker}
              >
                {currency
                  ? currency.map((country, id) => (
                      <Picker.Item
                        label={country.currency_name}
                        value={country.currency_code}
                        key={id}
                      />
                    ))
                  : null}
              </Picker>
              <Input
                placeholder={"Enter Value e.g " + baseRate}
                style={styles.currencyInput}
                keyboardType="numeric"
                keyboardAppearance="light"
                onChangeText={handleCurrencyInput}
                value={answer}
                
              />
            </View>
            {/* To Field */}

            <View style={styles.field}>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select Currency"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={currencyOutput}
                onValueChange={onCurrencyOutputChange}
                style={styles.ratePicker}
              >
                {currency
                  ? currency.map((country, id) => (
                      <Picker.Item
                        label={country.currency_name}
                        value={country.currency_code}
                        key={id}
                      />
                    ))
                  : null}
              </Picker>
              <Input
                style={styles.currencyInput}
                keyboardType="numeric"
                keyboardAppearance="light"
                onChangeText={handleAmountOutput}
                    defaultValue={baseRate}
           value={amountOutput.toString()}
           underlineColorAndroid='transparent'  

              />
            </View>
          </Form>
          <Text style={styles.currencyText}>
            {selected == currencyOutput
              ? "1 " + selected + " = " + "1 " + currencyOutput
              : ""}{" "}
            {amountOutput} {currencyInput}
          </Text>
          {rates
            ? Object.entries(rates).map(([key, value]) => (
                <Text>
                  {currencyOutput == key
                    ? (toValue = value)
                    : (otherValue = value)}
                </Text>
              ))
            : null}
          {/* {console.log("From value "+fromValue)}
          {console.log("currency Input "+ currencyInput)}
          {console.log()}
          {console.log("To value "+toValue)}
          {console.log("currency Outpuut "+ currencyOutput)} */}
          {console.log("currency output " + currencyOutput)}
          <Text>Answer</Text>
        </Content>
      </ImageBackground>
    </View>
  );
}

export default App;

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
    fontFamily: "Roboto_medium",
  },
});

import React, { useEffect, useState } from "react";
import { View } from "native-base";
import { Text } from "react-native";
import axios from "axios";

export default function Api() {
  const [countries, setCountries] = useState(null);
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [error, setError] = useState(false)
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState();

  const [error, setError] = useState("");

  const endpoint = "latest";
  const api_key = "e00648f89527be1d3a00e3792ce96add";

  const base_url = "https://api.currencyscoop.com/v1/";

  const fetchAPI = async () => {
    try {
      const data = await fetch(base_url + endpoint + "?api_key=" + api_key);

      const currency = await fetch(
        base_url + "currencies" + endpoint + "?api_key=" + api_key
      );

      const dataJSON = await data.json();
      const currencyJSON = await currency.json();

      if (dataJSON && currencyJSON) {
        setData(dataJSON.response.rates);
        setCurrency(currencyJSON.response.fiats);
        console.log();
        console.log(currencyJSON.response.fiats);
        setError(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  // useEffect(() => {
  //   const gettingCountries = async () => {
  //     const endpoint = "latest"
  //     const api_key = 'e00648f89527be1d3a00e3792ce96add'

  //     const base_url = "https://api.currencyscoop.com/v1/"

  //     try {
  //       setLoading(true)
  //       const res = await axios.get(base_url + endpoint + "?api_key=" + api_key)
  //       const countryRes = await axios.get(
  //         base_url + "currencies" + "?api_key=" + api_key
  //       )
  //       setCountries(Object.values(countryRes.data.response.fiats))
  //       //console.log(Object.values(countryRes.data.response.fiats))

  //       setRates(res.data.response.rates)
  //       console.log(res.data.response.rates)

  //       setLoading(false)
  //     } catch (error) {
  //       console.log(error)

  //       setLoading(false)
  //       setError(true)
  //     }
  //   }
  //   gettingCountries()
  // }, [])

  // function getKeyByValue(object, value) {
  //   return Object.keys(object).find(key => object[key] === value);
  // }

  return (
    <View>
      {/* {countries? countries.map((country, id) =>(
              rates?
                Object.entries(rates).map(([key, value]) => (
                    <Text >
                        
                      { key='EUR'? key :value }
                    </Text>
                    
                )):
                null
            
           )):
           null
           }

          {rates?
                  Object.entries(rates).map(([key, value]) => (
                      <Text >
                          
                        { key='EUR'? key :value }
                      </Text>
                      
                  )):
                  null
              }
            
            {/* <Text>{rates.map}</Text> */}

      {/* {rates? rates.map((country, id) =>(
             <Text key={id}>
               {country.currency_name}
             </Text>
           )):
           null
           } */}
    </View>
  );
}

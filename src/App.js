import React, { useState, useEffect} from 'react';
import {
  MenuItem, 
  FormControl,
  Select,
  Card,
  CardContent
} from "@material-ui/core";

import Map from './Map'
import InfoBox from './InfoBox';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import './App.css';


function App() {
  const [countries, setCountries] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState('Worldwide');
  const [countryData, setCountryData] = useState([]);
  const [ tableData, setTableData] = useState([]);


  // UseEffect  = Runs code based on a given condition AFTER rendring; during DOM updates

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => { 
        const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2 
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
      });

      await fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then( data => {
      
      setCountryData(data);
      
    })
    };
  
    getCountriesData();
  }, []);

  const OnCountryChange = async (event) => {
    const countryCode = event.target.value; 
    setSelectedCountry(countryCode);
    
    const url = countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/countries/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then( data => {
      setCountryData(data);
    })
  };

  
  return (
    <div className="app">
    <div className="app_left">
        <div className ="app__header"> 
          <h1>Covid-19 Tracker </h1> 
            <FormControl className="app__dropdown"> 
              <Select variant="outlined" onChange={OnCountryChange} value={selectedCountry}> 
                <MenuItem value="Worldwide">Worldwide</MenuItem>
                  {countries.map((country) => ( 
                <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
              </Select> 
              </FormControl> 
          </div>

        <div className="app__stats">  
          <InfoBox title="Cases Today" total={countryData.cases} cases={countryData.todayCases} />
          <InfoBox title="Deaths Today"  total={countryData.deaths} cases={countryData.todayCases} />
          <InfoBox title="Recoveries Today"  total={countryData.recovered} cases={countryData.todayRecovered} />

        </div>

        <Map />
        

                
    {/* Map */}

    </div>
    <Card className="app__right">
          <CardContent>
            <h3>Live Cases by Country</h3>
                
                <Table countries={tableData}> </Table> 
                <LineGraph />

          </CardContent>
        </Card>
    </div>
     
  );
}

export default App;

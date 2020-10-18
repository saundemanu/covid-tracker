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

//required for using leaflet Map API
import "leaflet/dist/leaflet.css";



function App() {
  const [countries, setCountries] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState('Worldwide');
  const [countryData, setCountryData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState( {lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3);

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
          setMapCountries(countries);
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
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
      setSelectedCountry(countryCode);

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
          <InfoBox 
          onClick={(e) => setCasesType("cases")} 
            title="Cases Today" 
            total={countryData.cases} 
            cases={countryData.todayCases} 
            />
          <InfoBox 
          onClick={(e) => setCasesType("deaths")}
          title="Deaths Today"  
          total={countryData.deaths}
           cases={countryData.todayCases} 
           />
          <InfoBox
          onClick={(e) => setCasesType("recovered")}
           title="Recoveries Today" 
            total={countryData.recovered} 
            cases={countryData.todayRecovered} 
            />

        </div>
        <Map center={mapCenter} zoom={mapZoom} casesType={casesType} countries={mapCountries}/>


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

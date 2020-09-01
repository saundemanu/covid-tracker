import React, { useState, useEffect} from 'react';
import {
  MenuItem, 
  FormControl,
  Select,
} from "@material-ui/core";

import InfoBox from './infobox';
import './App.css';


function App() {
  const [countries, setCountries] = useState([]); 
  const [selectedCountry, setSelectedCountry] = useState('Worldwide')



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

          setCountries(countries);
      });
    };
  
    getCountriesData();
  }, []);

  const OnCountryChange =  (event) => {
    const countryCode = event.target.value; 

    setSelectedCountry(countryCode);
  }

  
  return (
    <div className="app">
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

      <app className="app__stats">
      <InfoBox title="Covid-19 Cases" total={2000} cases={2000} />
      <InfoBox title="Deaths"  total={5000} cases={1000} />
      <InfoBox title="Recoveries"  total={2300} cases={4000} />
          
      </app>

    {/* Table */}
    {/* Graph */}

    {/* Map */}

    </div>
  );
}

export default App;

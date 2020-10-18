import React from "react";
import numeral from "numeral";
import { Circle, Popup} from "react-leaflet";
 
const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 800,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 2000,
    
  }; 


export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => ( a.cases > b.cases ? -1 : 1));
    return sortedData;
}

export const showDataOnMap = (data,  casesType='cases') => {
  
    data.map((country) => ( 
        <Circle
            center={[ country.countryInfo.lat, country.countryInfo.long ]}
            fillOpacity={0.4}
            radius={Math.sqrt(country[casesType])* casesTypeColors[casesType].multiplier}>
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType.hex]}
            
           <Popup>
                 <h1>Popup</h1>   
          </Popup>
          </Circle>
      )
    )};
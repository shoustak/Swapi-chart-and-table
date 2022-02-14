import {
    fetchVehicles,
    setPilots,
    setPlanets,
    calculateHighest
  } from "../api/api";
  import { useEffect, useState } from "react";
  
  const BASE_URL = "https://swapi.dev/api/vehicles/";
  
  const Table = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const fetchVehicle = await fetchVehicles(BASE_URL);
          const pilots = await setPilots(fetchVehicle);
          const planets = await setPlanets(pilots);
          const highest = await calculateHighest(planets);
          setData(highest);
          setLoading(false);
        } catch (error) {
          setError(true);
        }
      };
      fetchData();
    }, []);
  
    return (
      <div className="App">
        {loading
          ? <h1>Loading..</h1>
          : error
          ? <h5>There is an error, please try again :) ..</h5>
          : data && (
              <table>
                <tbody>
                  <tr>
                    <td>
                      <b>
                        <u>Vehicle name: </u>
                      </b>
                      {data[0]}
                    </td>
                  </tr>
                  <tr>
                    {data[1].map((d, i) => (
                      <td key={i}>
                        <b>
                          <u>Planet name: </u>
                        </b>
                        {d[1]}
                        <br/>
                        <b>
                          <u>Planet population: </u>
                        </b>
                        {parseInt(d[2]).toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    {data[1].map((d, i) => (
                      <td key={i}>
                        <b>
                          <u>Pilot name: </u>
                        </b>
                        {d[0]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
      </div>
    );
  };
  
  export default Table;
  
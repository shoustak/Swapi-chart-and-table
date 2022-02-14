import React, { useEffect, useState } from 'react'
import { getPlanetsGraph } from '../api/api'
import Bar from './Bar';
import { getBarHeight } from '../helpers/chartHelper'

const planetsToDisplay = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

const BASE_URL = "https://swapi.py4e.com/api/planets/"

const Chart = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const planetsData = await getPlanetsGraph(BASE_URL, planetsToDisplay)
                setData(planetsData)
                setLoading(false)
            } catch (error) {
                setError(true)
            }

        }
        getData()
    }, [])

    const heightData = data && getBarHeight(data)

    return (
        <>
            {loading ? <h1>Loading..</h1>
                : error
                ? <h5>There is an error, please try again :) ..</h5>
                : <div className="container">
                <div className="chartContainer">
                    {heightData && heightData.map(({ name, height, population }, i) => {
                        return (
                            <div className="barContainer" key={i}>
                                <p className="population">
                                     {parseInt(population).toLocaleString()}
                                </p>
                                <Bar numberOfPlantes={data.length} height={`${height}px`} />
                                <p className="name">{name}</p>
                            </div>
                        );
                    })}
                </div>
            </div>}
        </>
    )
}

export default Chart
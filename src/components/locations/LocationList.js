import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const LocationList = () => {
    const [locations, setLocations] = useState([])



    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationsArray) => {
                    setLocations(locationsArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )
    return <>
    <h2>Locations</h2>
        <article className="locations">
            <ul>
            {
                locations.map(
                    (location) => {
                        return <section className="location" key={`location--${location.id}`}>
                            <li>{location.address}
                            <ul><li>{location.squareFootage} square feet</li></ul>
                            </li>
                        </section>
                    }
                )
            }
            </ul>
        </article>
    </>
}
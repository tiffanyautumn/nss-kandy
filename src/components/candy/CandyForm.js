import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CandyForm = () => {
    const navigate = useNavigate()
    const [types, settypes] = useState([])

    const [product, update] = useState({
        name: "",
        typeId: "",
        price: ""
    })
    /*
        TODO: Use the useNavigation() hook so you can redirect
        the user to the ticket list
    */

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/types`)
                .then(response => response.json())
                .then((typesArray) => {
                    settypes(typesArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        // TODO: Create the object to be saved to the API
        const ticketToSendToAPI = {
            name: product.name,
            typeId: product.typeId,
            price: product.price
            
        }

    
        // TODO: Perform the fetch() to POST the object to the API
        return fetch (`http://localhost:8088/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticketToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/products")
            })
    }

    return (
        <form className="candyForm">
            <h2 className="candyForm__title">New Product</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="product name"
                        value={product.name}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.name = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">price:</label>
                    <input
                        required autoFocus
                        type="number"
                        className="form-control"
                        placeholder="1.00"
                        // step="0.01"
                        // min="0"
                        value={product.price}
                        onChange={
                            (evt) => {
                                const copy = {...product}
                                copy.price = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="typeId">Select a Type:</label>
                    {
                        types.map(
                            (type) => {
                            return (
                                <div className="radiotype" key={type.id}>
                            
                                    <input type="radio"
                                        value={type.id}
                                        onChange={(evt) => {
                                        const copy = {...product}
                                        copy.typeId = parseInt(evt.target.value)
                                        update(copy)
                                    }
                            } /> 
                            <label>{type.name}</label>
                            </div>)
                       })
                    }
                </div>
            </fieldset>

            <button
                onClick= {(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    )
}
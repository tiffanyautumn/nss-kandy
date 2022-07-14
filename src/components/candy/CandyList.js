import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export const CandyList = () => {
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])
    const [high, setHigh] = useState(false)
    const navigate = useNavigate();

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=type`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                    setFiltered(productsArray)
                    
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    
    useEffect(
        () => {
            if (high) {
                const highProducts = products.filter(product => product.price > 2.00)
                setFiltered(highProducts)
            }
            else {
                setFiltered(products)
            }
        },
        [high]
    )

    useEffect(
        () => {
            if (kandyUserObject.staff) {
                setFiltered(filteredProducts)
            }
            else {
                setFiltered(products)
            }
        },
        [products]
    )

    return <>
        {
            kandyUserObject.staff
                ? <>
                <button onClick={() => {setHigh(true)}}>High Priced Item</button>
                <button onClick={() => {setHigh(false)}}>Show all</button>
                <button onClick={() => navigate("/product/create")}>New Product?</button>
                </>
                : ""
        }
        
    <h2>Products</h2>
        <article className="products">
            <ul>
            {
                filteredProducts
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(
                    (product) => {
                        return <section className="product" key={`product--${product.id}`}>
                            <li>{product.name} ${product.price}  {product.type.name} </li>
                        </section>
                    }
                )
                
            }
            </ul>
        </article>
    </>
}
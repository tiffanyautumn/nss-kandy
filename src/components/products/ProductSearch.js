import { useState } from "react"
import { useEffect } from "react"

export const ProductSearch = () => {

    const [searchTerms, setSearchTerms] = useState("")
    const [products, setProducts] = useState([])
    const [filteredProducts, setFiltered] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/products?_expand=type`)
                .then(response => response.json())
                .then((productsArray) => {
                    setProducts(productsArray)
                    
                })
        },
        [] // When this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            const searchedProducts = products.filter(product => 
                product.name.toLowerCase().startsWith(searchTerms.toLowerCase()))
            setFiltered(searchedProducts)
        },
        [ searchTerms ]
    )

    return (
        <>
        <div>
        <input 
            onChange={
                (changeEvent) => {
                    setSearchTerms(changeEvent.target.value)
                }
            }
        type="text" placeholder="Enter search terms"></input>
        </div>
            {
                searchTerms !== ""
                ?
                <div>
                <h2>Products</h2>
                <article className="products">
                    <ul>
                    {
                        filteredProducts
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(
                            (product) => {
                                return <section className="product" key={`product--${product.id}`}>
                                    <li>{product.name} ${product.price}</li>
                                </section>
                            }
                        )
                        
                        }
                    </ul>
                </article>
                </div>
               : ""
            }
            </>
    )
}
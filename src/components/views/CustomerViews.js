import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { ProductList } from "../products/ProductList"
import { ProductSearch } from "../products/ProductSearch"

export const CustomerViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet />
				</>
			}>
                <Route path="products" element={ <ProductList />} />
                <Route path="products/search" element={ <ProductSearch /> } />
				<Route path="locations" element={ <LocationList />} />

			</Route>
		</Routes>
	) 
}

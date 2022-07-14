import { Outlet, Route, Routes } from "react-router-dom"
import { CandyForm } from "../candy/CandyForm"
import { CandyList } from "../candy/CandyList"
import { LocationList } from "../locations/LocationList"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet />
				</>
			}>
				<Route path="locations" element={ <LocationList />} />
				<Route path="products" element={ <CandyList />} />
				<Route path="product/create" element={ <CandyForm />} />
			</Route>
		</Routes>
	) 
}


import { Outlet, Route, Routes } from "react-router-dom"
import { ProductForm } from "../products/ProductForm"
import { ProductList } from "../products/ProductList"
import { LocationList } from "../locations/LocationList"
import { EmployeeList } from "../../employees/EmployeeList"
import { EmployeeForm } from "../../employees/EmployeeForm"
import { EmployeeDetails } from "../../employees/EmployeeDetails"
import { CustomerList } from "../customers/CustomerList"
import { CustomerDetails } from "../customers/CustomerDetails"

export const EmployeeViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>

					<Outlet />
				</>
			}>
// 				<Route path="locations" element={ <LocationList />} />
// 				<Route path="products" element={ <ProductList />} />
// 				<Route path="product/create" element={ <ProductForm />} />
                <Route path="employees" element={ <EmployeeList />} />
                <Route path="employees/new" element={ <EmployeeForm />} />
                <Route path="employees/:employeeId" element={ <EmployeeDetails /> } />
                <Route path="customers" element={ <CustomerList />} />
                <Route path="customers/:customerId" element={ <CustomerDetails /> } />
// 			</Route>
// 		</Routes>
	) 
}

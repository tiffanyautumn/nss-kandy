import { useEffect, useState } from "react"
import { Employee } from "./Employee"
import { useNavigate } from "react-router-dom"

export const EmployeeList = () => {
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch (`http://localhost:8088/employees?_expand=user&_expand=location`)
                .then(response => response.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
                })
        },
        []
    )

    return <><button onClick={() => navigate("/employees/new")}>New Employee?</button>
    <article className="employees">
        <h2>Employees</h2>
        {
            employees.map(employee => <Employee key={`employee--${employee.user.id}`} 
                id={employee.user.id} 
                fullName={employee.user.fullName} 
                 />)
        }
    </article>
    </>


}
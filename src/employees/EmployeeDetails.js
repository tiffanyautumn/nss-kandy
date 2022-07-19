import { useEffect, useState} from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    const {employeeId} =useParams()
    const [employee, updateEmployee] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=location&_expand=user&userId=${employeeId}`)
            .then(response => response.json())
            .then((data) => {
                const singleEmployee = data[0]
                updateEmployee(singleEmployee)
            })
        },
        [employeeId]
    )

    return <section className="employee">
        <header>{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Rate: {employee.payRate}</div>
        <div>Location: {employee?.location?.name}</div>
        
    </section>
}
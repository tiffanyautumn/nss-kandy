import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export const EmployeeForm = () => {
    const navigate = useNavigate()
    const [locations, setLocations] = useState([])
    //sets initial state of the form 
    const [user, setUser] = useState({
        email: "",
        isStaff: true,
        fullName: ""
    })
    const [employee, update] = useState({
        locationId: 0,
        startdate: "",
        payRate: 0,
        userId: 0

    })

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

    const updateUser = (evt) => {
        const copy = { ...user }
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }


    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You clicked the button")

        const employeeToSendToAPI = {
            locationId: parseFloat(employee.locationId),
            startdate: employee.startdate,
            payRate: parseFloat(employee.payRate)
        }

        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                employeeToSendToAPI.userId = createdUser.id;
                return fetch("http://localhost:8088/employees", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToSendToAPI)
                })

            })
            .then(() => {
                navigate("/employees")
            })

    }






    return (<>
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <label htmlFor="fullName"> Full Name </label>
                <input onChange={updateUser}
                    type="text" id="fullName" className="form-control"
                    placeholder="Enter your name" required autoFocus />
            </fieldset>
            <fieldset>
                <label htmlFor="email"> Email address </label>
                <input onChange={updateUser}
                    type="email" id="email" className="form-control"
                    placeholder="Email address" required />
            </fieldset>
            <fieldset>
                <label htmlFor="payRate"> payrate </label>
                <input type="number" id="payRate" className="form-control"
                    placeholder="0" required
                    value={employee.payRate}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.payRate = (evt.target.value)
                            update(copy)
                        }
                    } />
            </fieldset>
            <fieldset>
                <label htmlFor="locationId"> location </label>
                {
                    locations.map(
                        (location) => {
                            return (
                                <div className="radiotype" key={location.id}>
                                    <input type="radio"
                                        value={location.id}
                                        onChange={
                                            (evt) => {
                                                const copy = { ...employee }
                                                copy.locationId = (evt.target.value)
                                                update(copy)
                                            }
                                        } />
                                    <label>{location.name}</label>
                                </div>)
                        })
                }
            </fieldset>
            <fieldset>
                <input type="date"
                    value={employee.startdate}
                    onChange={
                        (evt) => {
                            const copy = { ...employee }
                            copy.startdate = (evt.target.value)
                            update(copy)
                        }
                    }
                    id="payRate" className="form-control"
                    placeholder="startdate" required />
            </fieldset>


            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Ticket
            </button>
        </form>
    </>
    )
}
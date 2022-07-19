import { Link } from "react-router-dom"

export const Employee = ({ id, fullName }) => {

            return <section className="employee" >
                <div>
                    <Link to={`/employees/${id}`}>{fullName}</Link>
                </div>
                
            </section>
}
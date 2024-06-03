import React, { useEffect, useRef, useState } from 'react'

function EmployeeForm() {
    let countrySelectRef = useRef();
    let departmentSelectRef = useRef();
    let genderSelectRef = useRef();

    let [countryList, setCountryList] = useState([]);
    let [departmentList, setDepartmentList] = useState([]);
    let [genderList, setGenderList] = useState([]);
    let [employee, setEmployee] = useState([]);
    useEffect(() => {
        getCountriesListFromServer();
        getDepartmentListFromServer();
        getGenderListFromServer();
    }, []);


    let getCountriesListFromServer = async () => {
        let reqOptions = {
            method: "GET"
        }
        let JSONData = await fetch("http://localhost:4567/countryList", reqOptions);
        let JSOData = await JSONData.json();
        setCountryList(JSOData);
        console.log(JSOData);
    }

    let getDepartmentListFromServer = async () => {
        let reqOptions = {
            method: "GET"
        }
        let JSONData = await fetch("http://localhost:4567/departmentList", reqOptions);
        let JSOData = await JSONData.json();
        setDepartmentList(JSOData);
        console.log(JSOData);
    }
    let getGenderListFromServer = async () => {
        let reqOptions = {
            method: "GET"
        }
        let JSONData = await fetch("http://localhost:4567/genderList", reqOptions);
        let JSOData = await JSONData.json();
        setGenderList(JSOData);
        console.log(JSOData);
    }


    let getEmployeesFromServer = async () => {

        let reqOption = {
            method: "GET"
        }
        let url = `http://localhost:4567/employees?country=${countrySelectRef.current.value}&department=${departmentSelectRef.current.value}&gender=${genderSelectRef.current.value}`
        console.log(url);
        let JSONData = await fetch(url, reqOption);
        let json = await JSONData.json();
        setEmployee(json);
        console.log(json);
    }


    return (
        <div>
            <form className='data'>
                <div>
                    <label>Country</label>
                    <select ref={countrySelectRef}>
                        {countryList.map((ele, i) => (
                            <option key={i} value={ele}>
                                {ele}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Department</label>
                    <select ref={departmentSelectRef}>
                        {departmentList.map((ele, i) => (
                            <option key={i} value={ele}>
                                {ele}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Gender</label>
                    <select ref={genderSelectRef}>
                        {genderList.map((ele, i) => (
                            <option key={i} value={ele}>
                                {ele}
                            </option>
                        ))}
                    </select>
                </div>

            </form>
            <form>
                <div>
                    <button type='button' onClick={() => {
                        getEmployeesFromServer();
                    }}>Get Employees</button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>ProfilePic</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Department</th>
                        <th>Country</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employee.map((ele, i) => {
                        return <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{ele.id}</td>
                            <td>{ele.firstName}</td>
                            <td>{ele.lastName}</td>
                            <td><img alt='' src={ele.profilePic}></img></td>
                            <td>{ele.email}</td>
                            <td>{ele.gender}</td>
                            <td>{ele.age}</td>
                            <td>{ele.department}</td>
                            <td>{ele.country}</td>
                            <td>₹{ele.salary}</td>
                        </tr>
                    })}

                </tbody>
                <tfoot>

                </tfoot>
            </table>
        </div>
    )
}

export default EmployeeForm
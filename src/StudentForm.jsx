import { useState } from "react";
import "./StudentForm.css"

const StudentForm = ({ existingStudent = {}, updateCallback}) => {
    const [name,setName] = useState(existingStudent.name || "" );
    const [gender, setGender] = useState(existingStudent.gender || "" );
    const [school, setSchool] = useState(existingStudent.school || "" );

    const updating = Object.entries(existingStudent).length !== 0
    
    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            name,
            gender,
            school
        }
        const url = "http://127.0.0.1:4000/" + (updating ? `update_student/${existingStudent.id}`: "create_student")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }
        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallback()
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name: </label>
                <input 
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="Gender">Gender: </label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="" disabled>Select gender</option>
                    <option value="0">Male</option>
                    <option value="1">Female</option>
                    <option value="2">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="school">School: </label>
                <input 
                    type="text"
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                />
            </div>
            <button className="btn-submit" type="submit">{updating ? "Update" : "Create"}</button>
        </form> 
    );
};

export default StudentForm
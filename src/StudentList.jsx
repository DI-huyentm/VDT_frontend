import React from "react";
import "./StudentList.css";

const StudentList = ({ students, updateStudent, updateCallback}) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:4000/delete_student/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }


    return <div>
        <h2>VDT Students Management</h2>
        <table className="student-table">
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Gender</th>
                    <th>School</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.gender === 0 ? "Male" : (student.gender === 1 ? "Female" : "Other")}</td>
                        <td>{student.school}</td>
                        <td>
                            <button className="btn-update" onClick={() => updateStudent(student)}>Update</button>
                            <button className="btn-delete" onClick={() => onDelete(student.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
}

export default StudentList
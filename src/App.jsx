import { useState, useEffect } from 'react'
import StudentList from './StudentList'
import reactLogo from './assets/react.svg'
import './App.css'
import StudentForm from './StudentForm'

function App() {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});  

  useEffect(() => {
    fetchStudents()
  }, []);

  const fetchStudents = async () => {
    const response = await fetch("http://127.0.0.1:4000/students")
    const data = await response.json()
    setStudents(data.students)
    console.log(data.students)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStudent({})
  }

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  }

  const openEditModal = (student) => {
    if (isModalOpen) return;
    setCurrentStudent(student)
    setIsModalOpen(true)
  }

  const onUpdate = () => {
    closeModal()
    fetchStudents()
  }


  return (
    <>
        <StudentList students={students} updateStudent={openEditModal} updateCallback={onUpdate} />
        <button className='btn-add' onClick={openCreateModal}>Add New Students</button>
        { isModalOpen && <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={closeModal}>&times;</span>
            <StudentForm existingStudent={currentStudent} updateCallback={onUpdate} />
          </div>
        </div>
        }
    </>
  );
}

export default App

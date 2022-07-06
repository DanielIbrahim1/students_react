import { useState } from 'react';
import './App.css';


function App() {
  const SERVER = " http://localhost:3004/posts";
  const [myStudents, setmyStudents] = useState([]);
  const getDataFromDB = async () => {
    setmyStudents(await fetch(SERVER).
      then(response => response.json()))
  }
  const [Student, setStudent] = useState("");
  const [Title, setTitle] = useState("");
  // const [Id, setId] = useState("");


  const addDataToDB = () => {
    console.log("test")
    const data = {
      "student": Student,
      "title": Title
    };

    fetch(SERVER, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  };

  const deleteFromDB = (id) => {
    // let students = myStudents
    fetch(`http://localhost:3004/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .then(response => {
        return response.json()
      })


  }

  return (
    <div>
      <h2> Adding Students</h2>
      Student <input value={Student} onChange={(e) => setStudent(e.target.value)}></input> {" "}
      Author <input value={Title} onChange={(e) => setTitle(e.target.value)}></input> {" "}
      <button onClick={() => addDataToDB()}> Add data</button>
      <hr></hr>
      <h2>Dispaly all students</h2>
      <button onClick={() => getDataFromDB()}> Get data</button>
      {myStudents.map((stu, ind) => <div key={ind} > {stu.title} {" "} {stu.student} <button onClick={() => deleteFromDB(stu.id)}> Delete student</button> </div>)}
    </div>
  );
}

export default App;

// value={Id} onChange={(e) => setId(e.target.value)}
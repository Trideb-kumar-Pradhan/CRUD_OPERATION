
// import React, { useState, useEffect } from "react";
// import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
// import Swal from "sweetalert2";
// import "bootstrap/dist/css/bootstrap.min.css";

// const StudentList = () => {
//   const [students, setStudents] = useState([]);
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [newStudent, setNewStudent] = useState({ memberId: "", name: "", email: "", age: "" });
//   const limit = 10;

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/students?page=${page}&limit=${limit}&search=${search}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setStudents(data.data);
//         setTotalPages(data.totalPages);
//       })
//       .catch((error) => {
//         console.error("Error fetching students:", error);
//         Swal.fire("Error", error.message, "error");
//       });
//   }, [page, search]);

//   const handleDelete = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         fetch(`http://localhost:5000/api/students/${id}`, { method: "DELETE" })
//           .then((res) => res.json())
//           .then(() => {
//             setStudents(students.filter((student) => student.id !== id));
//             Swal.fire("Deleted!", "The student record has been deleted.", "success");
//           })
//           .catch((error) => {
//             console.error("Error deleting student:", error);
//             Swal.fire("Error", error.message, "error");
//           });
//       }
//     });
//   };

//   const handleAddStudent = () => {
//     fetch("http://localhost:5000/api/students", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newStudent),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setStudents([...students, data]);
//         setShowModal(false);
//         setNewStudent({ memberId: "", name: "", email: "", age: "" });
//         Swal.fire("Success", "New student added!", "success");
//       })
//       .catch((error) => {
//         console.error("Error adding student:", error);
//         Swal.fire("Error", error.message, "error");
//       });
//   };

//   return (
//     <div className="container mt-4">
//       <h2>All Members</h2>
//       <InputGroup className="mb-3">
//         <Form.Control placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
//       </InputGroup>
//       <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
//         Add New Member
//       </Button>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Member ID</th>
//             <th>Member Name</th>
//             <th>Member Email</th>
//             <th>Age</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.id}>
//               <td>{student.member_id}</td>
//               <td>{student.name}</td>
//               <td>{student.email}</td>
//               <td>{student.age}</td>
//               <td>
//                 <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>
//                   🗑️
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Pagination>
//         <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
//         <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
//         <Pagination.Item active>{page}</Pagination.Item>
//         <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages} />
//         <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
//       </Pagination>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Member</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Member ID</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newStudent.memberId}
//                 onChange={(e) => setNewStudent({ ...newStudent, memberId: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newStudent.name}
//                 onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={newStudent.email}
//                 onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Age</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newStudent.age}
//                 onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleAddStudent}>
//             Add Member
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default StudentList;
import React, { useState, useEffect } from "react";
import { Table, Button, Form, InputGroup, Pagination, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({ memberId: "", name: "", email: "", age: "" });
  const limit = 10;

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetch(`${backendUrl}/api/students?page=${page}&limit=${limit}&search=${search}`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.data);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        Swal.fire("Error", error.message, "error");
      });
  }, [page, search, backendUrl]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${backendUrl}/api/students/${id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then(() => {
            setStudents(students.filter((student) => student.id !== id));
            Swal.fire("Deleted!", "The student record has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting student:", error);
            Swal.fire("Error", error.message, "error");
          });
      }
    });
  };

  const handleAddStudent = () => {
    fetch(`${backendUrl}/api/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newStudent),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents([...students, data]);
        setShowModal(false);
        setNewStudent({ memberId: "", name: "", email: "", age: "" });
        Swal.fire("Success", "New student added!", "success");
      })
      .catch((error) => {
        console.error("Error adding student:", error);
        Swal.fire("Error", error.message, "error");
      });
  };

  return (
    <div className="container mt-4">
      <h2>All Members</h2>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      </InputGroup>
      <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
        Add New Member
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Member Name</th>
            <th>Member Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.member_id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(student.id)}>
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.First onClick={() => setPage(1)} disabled={page === 1} />
        <Pagination.Prev onClick={() => setPage(page - 1)} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={() => setPage(page + 1)} disabled={page === totalPages} />
        <Pagination.Last onClick={() => setPage(totalPages)} disabled={page === totalPages} />
      </Pagination>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Member ID</Form.Label>
              <Form.Control
                type="text"
                value={newStudent.memberId}
                onChange={(e) => setNewStudent({ ...newStudent, memberId: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                value={newStudent.age}
                onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Add Member
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentList;

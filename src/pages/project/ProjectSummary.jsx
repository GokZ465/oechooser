import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import Avatar from "../../components/navbar/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useLogout } from "../../hooks/useLogout";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore("projects");
  const { addDocument, response } = useFirestore(project.name);
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();
  let navigate = useNavigate();
  // const handleClick = (e) => {
  //   deleteDocument(project.id);
  //   navigate("/");
  // };
  const [student, setStudent] = useState({});
  const handleApprove = (e) => {
    e.preventDefault();
    console.log(user);

    addDocument({
      name: project.name,
      Maxslots: project.slots,
      students: [user.uid, user.email, user.displayName],
    });
    toast("You have successfully enrolled", {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      position: toast.POSITION.TOP_CENTER,
    });
    setTimeout(function () {
      navigate("/");
      logout();
      window.location.reload();
    }, 1200);
  };
  // const handleReject = () => {
  //   navigate("/pending");
  // };

  return (
    <div>
      <div style={{width:"70vh" , height:"50vh"}} className="designCard project-summary">
        <h1 className=" page-title">Sum of {project.name}</h1>
        {/* <p>Requested By {project.}</p> */}
        <h4>Course Details : {project.details}</h4>
        <h4>Total Nuber of slots allocated : {project.slots} %</h4>
        {/* <p className="due-date">
          Request expires by {project.dueDate.toDate().toDateString()}
        </p> */}
        <p className="details">{project.details}</p>
        <h4>Departments </h4>
        <div className="assigned-users">
          {project.assignedUsersList.map((user) => (
            <div key={user.uid}>
              <ul>
                <li>
                  <h3 style={{ margin: "1rem" , color:"#6649b8" }}> {user && user.Name}</h3>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* {user.uid === project.createdBy.id ? (
        <button className="btn" onClick={handleClick}>
          Delete Request
        </button>
      ) : */}

      <div className="btn-container">
        <button
          style={{ margin: "10px" }}
          className="btn"
          onClick={handleApprove}
        >
          Enroll
        </button>
        {/* <button
          style={{ margin: "10px", borderColor: "red", color: "red" }}
          className="btn btn-reject"
          onClick={handleReject}
        >
          Reject Loan
        </button> */}
      </div>
    </div>
  );
}

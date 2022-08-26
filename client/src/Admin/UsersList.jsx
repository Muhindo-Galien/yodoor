import React, { useEffect, useState } from "react";
import "./globalAdmin.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { DataGrid } from "@material-ui/data-grid";
import { allHotelRooms } from "../redux/actions/hotel";
import { allBlogs, myUsers} from "../redux/actions/blog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
// import MetaData from "../layout/MetaData";

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const token = useSelector((state) => state.token);

  const deleteOrderHandler = (id) => {
    console.log("deleted");
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    let res = await myUsers(token);
    setAllUsers(res.data);
  };
  console.log(allUsers);
  useEffect(() => {
    loadBlogs();
    loadHotels();
  }, []);

  const loadBlogs = async () => {
    let res = await allBlogs();
    setBlogs(res.data);
  };
  const loadHotels = async () => {
    let res = await allHotelRooms();
    setHotels(res.data);
  };
  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 1 },
    {
      field: "username",
      headerName: "USERNAME",
      type: "string",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "EMAIL-ADDRESS",
      type: "string",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/edit/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  allUsers &&
    allUsers.forEach((item) => {
      rows.push({
        id: item._id,
        email: item.email,
        username: item.name,
      });
    });
  return (
    <>
      <div className="adminHeader">
        <div className="dashboard-text">
          <div className="row">
            <div className="col-md-3 col-6">
              <div className="hotels">
                <h1>{hotels.length} Hotels</h1>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="blogs">
                <h1>{blogs.length} Blogs</h1>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="users">
                <h1>{allUsers.length} Users</h1>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="Verification">
                <h1>{hotels.length} Verified</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL USERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default UsersList;

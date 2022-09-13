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

const GlobalAdmin = () => {
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

  let totalAmount = hotels.length;

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [hotels.length, blogs.length],
      },
    ],
  };
  const columns = [
    { field: "id", headerName: "Hotel ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "verified"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "Name",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
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
            <Link to={`/admin/edit/hotel/${params.getValue(params.id, "id")}`}>
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

  hotels &&
    hotels.forEach((item) => {
      rows.push({
        id: item._id,
        Name: item.title,
        amount: item.price,
        status: item.verified,
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
          <h1 id="productListHeading">ALL HOTELS</h1>

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

export default GlobalAdmin;

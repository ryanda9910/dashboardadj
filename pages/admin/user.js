import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";


import { db, storage } from "../../module/firebase";
import Paper from "@material-ui/core/Paper";
import {
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Table,
  Button,
  Modal,
  TextField,
} from "@material-ui/core";
import { convertToRupiah } from "../../module/function";
import { useForm } from "../../components/Hooks/useForm";
import { Delete, Edit } from "@material-ui/icons";


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "100vh",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: 20,
  },
  textfield: {
    margin: 20,
  },
}));


const  UserProfile=()=>{
  const [usersData, setUsersData] = useState([]);
  const classes = useStyles();
  const getData = () => {
    db.collection("users").onSnapshot((snapshot) => {
      setUsersData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <TableContainer component={Paper}>
    <Table aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell style={{ fontSize: 12 }}>No</TableCell>
          <TableCell style={{ fontSize: 12 }}>Nama</TableCell>
          <TableCell style={{ fontSize: 12 }}>Email</TableCell>
          <TableCell style={{ fontSize: 12 }}>No Telepon</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {usersData.map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <p>{index + 1}</p>
            </TableCell>
            <TableCell style={{ fontSize: 12 }}>{item.firstname} {" "} {item.lastname}</TableCell>
            <TableCell style={{ fontSize: 12 }}>{item.email}</TableCell>
            <TableCell style={{ fontSize: 12 }}>{item.phonenumber}</TableCell>
            {/* <TableCell>
              <Button  onClick={() => openeditInput(item)}>
                <Edit style={{ color: "green" }} />
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => deleteData(item.id)}>
                <Delete style={{ color: "red" }} />
              </Button> */}
            {/* </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

UserProfile.layout = Admin;

export default UserProfile;

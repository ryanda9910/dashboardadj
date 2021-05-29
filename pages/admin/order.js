/*eslint-disable*/
import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes, { number } from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";
// layout for this page
import Admin from "layouts/Admin.js";

import { db } from "../../module/firebase";
import Paper from "@material-ui/core/Paper";
import {
  TableCell,
  TableRow,
  TableBody,
  TableHead,
  TableContainer,
  Table,
  Button,
  MenuItem,
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

const Order = () => {
  const statusProduk = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 1,
      label: 1,
    },
  ];
  const [openModal, setopenModal] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [orderId, setorderId] = useState("");
  const [valueprodukStatus, setvaluerProdukStatus] = useState("");
  const [errorStatusProduk, seterrorStatusProduk] = useState(false);
  const [form, setForm] = useForm({
    statusProduk: "",
    orderId: "",
  });
  const classes = useStyles();
  const getData = () => {
    db.collection("order").onSnapshot((snapshot) => {
      setOrderData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  };

  const handlecloseModal = () => {
    setopenModal(false);
  };
  const editStatusProduk = (event) => {
    setForm("statusProduk", Number(event.target.value));
  };

  const updateData = async () => {
    try {
      db.collection("order").doc(form.orderId).update({
        status: form.statusProduk,
      });
      setopenModal(false);
      alert("Berhasil Update Status");
    } catch (error) {
      alert("Gagal Update Status");
    }
  };

  const openeditInput = (item) => {
    setopenModal(true);
    setForm("orderId", item.id);
    setvaluerProdukStatus(item.status);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell style={{ fontSize: 12 }}>No</TableCell>
              <TableCell style={{ fontSize: 12 }}>Order ID</TableCell>
              <TableCell style={{ fontSize: 12 }}>Pelanggan</TableCell>
              <TableCell style={{ fontSize: 12 }}>Produk</TableCell>
              <TableCell style={{ fontSize: 12 }}>Alamat</TableCell>
              <TableCell style={{ fontSize: 12 }}>Ekspedisi</TableCell>
              <TableCell style={{ fontSize: 12 }}>Ongkos Kirim</TableCell>
              <TableCell style={{ fontSize: 12 }}>Pembayaran</TableCell>
              <TableCell style={{ fontSize: 12 }}>Harga Produk</TableCell>
              <TableCell style={{ fontSize: 12 }}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p>{index + 1}</p>
                </TableCell>
                <TableCell style={{ fontSize: 12 }}>{item.orderId}</TableCell>
                <TableCell style={{ fontSize: 12 }}>{item.name}</TableCell>
                <TableCell style={{ fontSize: 12 }}>{item.items}</TableCell>
                <TableCell style={{ fontSize: 12 }}>{item.address}</TableCell>
                <TableCell style={{ fontSize: 12 }}>{item.courier}</TableCell>
                <TableCell style={{ fontSize: 12 }}>
                  {convertToRupiah(item.shippingcost)}
                </TableCell>
                <TableCell style={{ fontSize: 12 }}>
                  {item.payment === "GPY"
                    ? "Gopay"
                    : item.payment === "CRD"
                    ? "Credit Card"
                    : item.payment === "TRF"
                    ? "Bank Transfer"
                    : null}
                </TableCell>
                <TableCell style={{ fontSize: 12 }}>
                  {convertToRupiah(item.productprice)}
                </TableCell>
                <TableCell style={{ fontSize: 12 }}>
                  {convertToRupiah(item.total)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Order.layout = Admin;

export default Order;

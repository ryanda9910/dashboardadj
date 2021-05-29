import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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

const Product = () => {
  const [openModal, setopenModal] = useState(false);
  const [categoryProduct, setCategoryProduct]=useState([]);
  const [idProduct, setIdProduct] = useState("");
  const [editNameProduct, setEditNameProduct] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editWeight, setEditWeight] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [openModalEdit, setopenModalEdit] = useState(false);
  const [form, setForm] = useForm({
    nameproduct: "",
    categoryproduct: "",
    descproduct: "",
    priceproduct: "",
    imgproduct: "",
    weight:""
  });
  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState([]);
  const classes = useStyles();
  const handleopenModal = () => {
    setopenModal(true);
  };
  const handlecloseModal = () => {
    setopenModal(false);
    setopenModalEdit(false);
    setEditNameProduct("");
    setEditCategory("");
    setEditDesc(""); 
    setEditWeight("")
    setEditPrice("");
  };

  const editFilesImages = (event) => {
    const { target } = event;
    if (target.value.length > 0) {
      setFile(event.target.files[0]);
    } 
  };

  const handleChangeFiles=(event)=>{
    setFile(event.target.files[0]);
  }
  
  const onChangeNameProduct = (event) => {
    setForm("nameproduct", event.target.value);
  };
  const onChangeCategoryProduct = (event) => {
    setForm("categoryproduct", event.target.value);
  };

  const onChangePriceProduct = (event) => {
    setForm("priceproduct", event.target.value);
  };

  const onChangeWeightProduct= (event) => {
    setForm("weight", event.target.value);
  };

  const onChangeDescProduct = (event) => {
    setForm("descproduct", event.target.value);
  };

  const onEditNameProduct = (event) => {
    setEditNameProduct(event.target.value);
  };

  const onEditCategory = (event) => {
    setEditCategory(event.target.value);
  };

  const onEditPriceProduct = (event) => {
    setEditPrice(event.target.value);
  };

  const onEditDescProduct = (event) => {
    setEditDesc(event.target.value);
  };

  const onEditWeightProduct=(event)=>{
    setEditWeight(event.target.value)
  }

  const getData = () => {
    db.collection("product").onSnapshot((snapshot) => {
      setProductData(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
    db.collection("category").onSnapshot((snapshot) => {
      setCategoryProduct(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });
  };

  const deleteData = (id) => {
    db.collection("product")
      .doc(id)
      .delete()
      .then(() => {
        alert("Sukses Menghapus data");
      })
      .catch((error) => {
        alert("Gagal Menghapus data", error);
      });
  };

  const openeditInput = (item) => {
    setopenModalEdit(true);
    setIdProduct(item.id);
    setEditNameProduct(item.name);
    setEditCategory(item.category);
    setEditPrice(item.price);
    setEditDesc(item.desc);
    setEditWeight(item.weight)
  };

  /* UPDATE DATA */
  const updateData = async () => {
    try {
      if (file!=null||file!=undefined) {
        event.preventDefault();
        await storage.ref(`/images_product/${file.name}`).put(file);
        storage
          .ref("images_product")
          .child(file.name)
          .getDownloadURL()
          .then(async (url) => {
            setFile(null);
            db.collection("product")
              .doc(idProduct)
              .update({
                name: editNameProduct,
                desc: editDesc,
                price: editPrice,
                category: editCategory,
                weight: Number(editWeight),
                image_url: await url,
              });
          });
      } else  {
        db.collection("product").doc(idProduct).update({
          name: editNameProduct,
          desc: editDesc,
          price: editPrice,
          weight: Number(editWeight),
          category: editCategory,
        });
      }
      alert("Sukses Update Produk");
    } catch (error) {
      alert("Gagal Update Produk");
    }
    setopenModalEdit(false);
  };

  useEffect(() => {
    getData();
  }, []);

  /* ADD DATA */
  const handleUpload = async (event) => {
    try {
      event.preventDefault();
      await storage.ref(`/images_product/${file.name}`).put(file);
      storage
        .ref("images_product")
        .child(file.name)
        .getDownloadURL()
        .then(async (url) => {
          setFile(null);
          db.collection("product")
            .doc()
            .set(
              {
                name: form.nameproduct,
                desc: form.descproduct,
                price: form.priceproduct,
                category: form.categoryproduct,
                weight: Number(form.weight),
                image_url: await url,
              },
              { merge: true }
            );
        });
      alert("Sukses Menambahkan Produk");
    } catch (error) {
      alert("Gagal Menambahkan Produk");
    }
    setopenModal(false);
  };

  const bodyModal = (
    <div
      className={classes.paper}
      style={{ justifyItems: "center", alignItems: "center" }}
    >
      <h2>InputProduk</h2>
      <TextField
        fullWidth
        label={"Nama Produk"}
        size='small'
        type='text'
        variant='outlined'
        className={classes.textfield}
        onChange={onChangeNameProduct}
      />
      <FormControl  fullWidth className={classes.textfield}>
        <InputLabel> Category Produk </InputLabel>
        <Select
          value={form.categoryproduct}
          onChange={onChangeCategoryProduct}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {categoryProduct.map((item,index)=>(
            <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label='Dekripsi Produk'
        size='small'
        type='text'
        variant='outlined'
        className={classes.textfield}
        onChange={onChangeDescProduct}
      />
      <TextField
        fullWidth
        label='Berat Produk'
        size='small'
        type='text'
        variant='outlined'
        className={classes.textfield}
        onChange={onChangeWeightProduct}
      />
      <TextField
        fullWidth
        label='Harga Produk'
        type='text'
        size='small'
        variant='outlined'
        className={classes.textfield}
        onChange={onChangePriceProduct}
      />
      <TextField
        type='file'
        fullWidth
        size='small'
        variant='outlined'
        className={classes.textfield}
        onChange={(event) => handleChangeFiles(event)}
      />
      <Button
        className={classes.button}
        color='secondary'
        type='button'
        variant='contained'
        onClick={handlecloseModal}
      >
        Cancel
      </Button>
      <Button
        className={classes.button}
        color='primary'
        type='button'
        variant='contained'
        onClick={handleUpload}
      >
        OK
      </Button>
    </div>
  );

  const bodyModalEdit = (
    <div
      className={classes.paper}
      style={{ justifyItems: "center", alignItems: "center" }}
    >
      <h2 id='simple-modal-title'>InputProduk</h2>
      <TextField
        fullWidth
        label={"Nama Produk"}
        size='small'
        type='text'
        variant='outlined'
        value={editNameProduct}
        className={classes.textfield}
        onChange={onEditNameProduct}
      />
       <FormControl  fullWidth className={classes.textfield}>
        <InputLabel> Category Produk </InputLabel>
        <Select
          value={editCategory}
          onChange={onEditCategory}>
          <MenuItem value={editCategory}>
            <em>None</em>
          </MenuItem>
          {categoryProduct.map((item,index)=>(
            <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label='Dekripsi Produk'
        size='small'
        type='text'
        variant='outlined'
        value={editDesc}
        className={classes.textfield}
        onChange={onEditDescProduct}
      />
      <TextField
        fullWidth
        label='Harga Produk'
        type='text'
        size='small'
        variant='outlined'
        value={editPrice}
        className={classes.textfield}
        onChange={onEditPriceProduct}
      />
      <TextField
        fullWidth
        label='Berat Produk'
        size='small'
        type='text'
        variant='outlined'
        value={editWeight}
        className={classes.textfield}
        onChange={onEditWeightProduct}
      />
      <TextField
        type='file'
        fullWidth
        size='small'
        variant='outlined'
        className={classes.textfield}
        onChange={editFilesImages}
      />
      <Button
        className={classes.button}
        color='secondary'
        type='button'
        variant='contained'
        onClick={handlecloseModal}
      >
        Cancel
      </Button>
      <Button
        className={classes.button}
        color='primary'
        type='button'
        variant='contained'
        onClick={updateData}
      >
        OK
      </Button>
    </div>
  );
  return (
    <>
      <Button
        color='primary'
        type='button'
        variant='contained'
        onClick={handleopenModal}
      >
        Tambah Produk
      </Button>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Gambar</TableCell>
              <TableCell>Nama Produk</TableCell>
              <TableCell>Deskripsi Produk</TableCell>
              <TableCell>Kategori Produk</TableCell>
              <TableCell>Berat (Kg)</TableCell>
              <TableCell>Harga Produk</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p>{index + 1}</p>
                </TableCell>
                <TableCell>
                  <img
                    src={item.image_url}
                    width='40'
                    height='40'
                    style={{ borderRadius: 20 }}
                  />
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.desc}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell style={{textAlign:'center'}}>{item.weight}</TableCell>
                <TableCell>
                  {convertToRupiah(item.price)}
                </TableCell>
                <TableCell>
                  <Button  onClick={() => openeditInput(item)}>
                    <Edit style={{ color: "green" }} />
                  </Button>
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteData(item.id)}>
                    <Delete style={{ color: "red" }} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openModal}
        onClose={handlecloseModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {bodyModal}
      </Modal>
      <Modal
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        open={openModalEdit}
        onClose={handlecloseModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {bodyModalEdit}
      </Modal>
    </>
  );
};

Product.layout = Admin;

export default Product;

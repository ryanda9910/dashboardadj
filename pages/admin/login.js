import React, { useState } from "react";
// MUI Core
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useForm } from "../../components/Hooks/useForm";
import bcrypt from "bcryptjs";
import { InputAdornment } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { db } from "../../module/firebase";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
}));

export default function Login() {
  const [form, setForm] = useForm({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [error, setError] = useState("");
  const [maskPassword, setmaskPassword] = useState(true);
  const classes = useStyles();

  const onChangeEmail = async (event) => {
    setForm("email", event.target.value);
  };
  const onChangePassword = async (event) => {
    setForm("password", event.target.value);
  };

  const openMaskedPassword = () => {
    setmaskPassword(!maskPassword);
  };

  const onLogin = async () => {
    try {
      const query = await db
        .collection("admin")
        .where("email", "==", form.email)
        .get();
      const snapshot = query.docs[0];
      const data = snapshot.data();
      const validPassword = bcrypt.compareSync(form.password, data.password);
      if (validPassword) {
        setError("");
        router.push({
          pathname: "/admin/user",
        });
        localStorage.setItem("userId", data.id);
      } else {
        setError("Invalid Password");
      }
    } catch (error) {
      setError("Invalid Email");
    }
  };

  return (
    <Container className={classes.container} maxWidth='xs'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <h1>Dashboard</h1>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Email'
                name='email'
                size='small'
                variant='outlined'
                onChange={(event) => onChangeEmail(event)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => onChangePassword(event)}
                fullWidth
                label='Password'
                name='password'
                size='small'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      {maskPassword ? (
                        <VisibilityOff onClick={openMaskedPassword} />
                      ) : (
                        <Visibility onClick={openMaskedPassword} />
                      )}
                    </InputAdornment>
                  ),
                }}
                type={maskPassword ? "password" : "text"}
                variant='outlined'
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!form.email || form.password === "" ? true : false}
            color='secondary'
            fullWidth
            type='button'
            variant='contained'
            onClick={onLogin}
          >
            Log in
          </Button>
        </Grid>
      </Grid>
      <p style={{ color: "red" }}>{error}</p>
    </Container>
  );
}

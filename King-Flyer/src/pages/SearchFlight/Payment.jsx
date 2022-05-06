import { CreditCard, SendRounded } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  Fade,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 300,
  bgcolor: "#eee",
  border: "1px solid rgb(65, 65, 65)",
  borderRadius: "15px",
  p: 2,
};

const Payment = ({ open, setOpen, cost, setBook }) => {
  const [card, setCard] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [cvv, setCvv] = useState(null);
  const [loading, setLoading] = useState(false);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const pay = async (e) => {
    e.preventDefault();
    if (card !== null && month !== null && year !== null && cvv !== null) {
      setLoading(true);
      await setTimeout(() => {
        setLoading(false);
        setBook(false);
        setOpen(false);
      }, 2000);
    } else {
      alert("fill all card details");
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={(e) => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h4" component="h2">
            Payment
          </Typography>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Cost : Rs{cost}/-
          </Typography>

          <Box sx={{ mt: 2, mb: 2 }}>
            <TextField
              id="input-with-icon-textfield"
              label="Card number"
              fullWidth
              value={card}
              onChange={(e) => {
                setCard(e.target.value);
                console.log(e.target.value);
              }}
              placeholder="0000-0000-0000-0000"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CreditCard />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  id="input-with-icon-textfield"
                  label="MM"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  type="number"
                  placeholder="MM"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={1}>
                <Typography
                  variant="h3"
                  color="#6e6e6e"
                  component="div"
                  textAlign="center"
                >
                  /
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="input-with-icon-textfield"
                  label="YY"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  type="number"
                  placeholder="YY"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="input-with-icon-textfield"
                  label="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  type="number"
                  placeholder="CVV"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={1}>
            <Grid item xs={12}>
              <LoadingButton
                size="large"
                fullWidth
                onClick={pay}
                endIcon={<SendRounded />}
                loading={loading}
                loadingPosition="end"
                variant="contained"
              >
                Pay
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
};

export default Payment;

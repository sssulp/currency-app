import { Container, Typography, Grid, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

// components
import InputAmount from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import { CurrencyContext } from './context/CurrencyContext';

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext);

  const [ resultCurrency, setResultCurrency ] = useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];

  useEffect(() => {
    if(firstAmount) {
      axios("https://api.freecurrencyapi.com/v1/latest", {
        params: {
          apikey: "vwOtPq8Enj9fHnx3DWjfYseSSaDaEn3Xt44gGkry",
          base_currency: codeFromCurrency,
          currencies: codeToCurrency
        }
      })
      .then(res => setResultCurrency(res.data.data[codeToCurrency]))
      .catch(error => console.log(error))
    }
  }, [firstAmount, fromCurrency, toCurrency]);

  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 1,
    padding: "2.5rem 1.25rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant='h5' sx={{marginBottom: "2rem"}}>Currency Converter</Typography>
      <Grid container spacing={2}>
        <InputAmount />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
        <SwitchCurrency />
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

      {firstAmount ? (
        <Box sx={{textAlign: "left", marginTop: "1rem"}}>
          <Typography>{firstAmount} {fromCurrency} =</Typography>
          <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold" }}>{resultCurrency*firstAmount} {toCurrency} </Typography>
        </Box>
      ) : ""}
    </Container>
  )
}

export default App
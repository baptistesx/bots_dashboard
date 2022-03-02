import { Typography } from "@mui/material";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import React from "react";
import GlobalLayout from "../components/layout/GlobalLayout";
import CustomPaypalButton from "../components/users/CustomPaypalButton";
import { PAYPAL_CURRENCY } from "../utils/constants";

function GetLicence() {
  return (
    <GlobalLayout>
      <Typography variant="h1">Get the Premium licence</Typography>

      <Typography variant="body">
        Turn your account Premium for only 5€/month !
      </Typography>

      {/* //TODO: update client-id */}
      <PayPalScriptProvider
        options={{
          "client-id": "test",
          components: "buttons",
          currency: "EUR",
        }}
      >
        <CustomPaypalButton currency={PAYPAL_CURRENCY} showSpinner={false} />
      </PayPalScriptProvider>
    </GlobalLayout>
  );
}

export default GetLicence;

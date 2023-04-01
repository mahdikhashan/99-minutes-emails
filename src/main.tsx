import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { StoreProvider } from "./services/store/store";
import { DialogProvider } from "./services/alertDialog/alertDialogContext";
import { ColorModeScript } from "@chakra-ui/react";
import { theme } from "./ui/theme";
import { client } from "./services/client";
import { Provider } from "react-redux";
import { store } from "./services/redux/redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <StoreProvider>
        <ApolloProvider client={client}>
          <Provider store={store}>
            <DialogProvider>
              <ColorModeScript initialColorMode={theme.initialColorMode} />
              <App />
            </DialogProvider>
          </Provider>
        </ApolloProvider>
      </StoreProvider>
    </ChakraProvider>
  </React.StrictMode>
);

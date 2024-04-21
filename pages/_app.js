import "@/styles/globals.scss";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../store";
import {PersistGate} from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
let persistor = persistStore(store); 

export default function App({ Component, pageProps }) {
  return(
    <>
      <Head>
        <title>Mak Mart</title>
        <meta name="description" content="Online Shopping Service for all your needs." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon_MakMart.png"/>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps}/> 
        </PersistGate>

      </Provider>
    </>
  );
}

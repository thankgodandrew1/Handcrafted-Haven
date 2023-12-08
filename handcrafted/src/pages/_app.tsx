import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React, { Fragment } from 'react'
// import { ProvideAuth } from "../components/context/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Component {...pageProps} />
    </Fragment>
  )
}

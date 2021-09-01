import 'styles/app-global.scss';
import type { AppProps } from 'next/app';
import Router, { withRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import { wrapper } from "../redux/store"
import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import axios from '../axios';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [preloader, setPreLoader] = useState(false);

  return (
    <>
      {preloader ? (<Loader />) : (
        <Component
          {...pageProps}
          router={router}
          setPreLoader={setPreLoader}
        />
      )}
    </>
  )
}

export default wrapper.withRedux(withRouter(MyApp));

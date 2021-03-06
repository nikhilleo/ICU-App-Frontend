import 'styles/app-global.scss';
import type { AppProps } from 'next/app';
import { withRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import { wrapper } from "../redux/store"
import { useState } from 'react';
import Loader from 'components/Loader';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [preloader, setPreLoader] = useState(false);

  return (
    <>
      {preloader ? (<Loader />) : null}
      <Component
        {...pageProps}
        router={router}
        setPreLoader={setPreLoader}
      />
    </>
  )
}

export default wrapper.withRedux(withRouter(MyApp));

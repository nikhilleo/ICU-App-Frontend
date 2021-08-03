import 'styles/app-global.scss';
import type { AppProps } from 'next/app';
import { withRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import { wrapper } from "../redux/store"

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Component
      {...pageProps}
      router={router}
    />
  )
}

export default wrapper.withRedux(withRouter(MyApp));

import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import SiteNavbar from '../components/SiteNavbar';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <SiteNavbar currentUser={currentUser}/>
      <Component 
        {...pageProps} currentUser={currentUser}
      />
    </div>
  );
};

AppComponent.getInitialProps = async (context) => {
  let pageProps = {};
  let currentUser = null;
  const client = buildClient(context.ctx);
  try {
    const { data } = await client.get('/api/users/currentuser');
    currentUser = data.currentUser;
    if (context.Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(context.ctx, client, data.currentUser);
    }
  }
  catch {}
  return {pageProps, currentUser};
};

export default AppComponent;
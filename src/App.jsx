// React
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Redux
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// Pages components
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import CardPage from './pages/card-page/cardpage.component';
import CardSetsPage from './pages/card-sets-page/card-sets-page.component';
import CollectionPage from './pages/collection/collection.component';
import Page404 from './pages/page404/page404.component';
import Footer from './components/footer/footer.component';
import Validation from './pages/validation/validation-page.component';
import AccountUserPage from './pages/account-user/account-user.component';
import AccountAdminPage from './pages/account-admin/account-admin.component';
import ShippingPage from './pages/shipping/shipping-page.component';

// Chakra UI
import { Grid } from '@chakra-ui/react';

// CSS
import './App.css';

const App = ({ currentUser, location }) => {
  return (
    <Grid className='App'>
      <Header />
      <Grid mt={12}>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          <Route exact path='/card-sets' component={CardSetsPage} />

          <Route path='/card-sets/:collectionId/:cardId' component={CardPage} />
          <Route path='/card-sets/:collectionId' component={CollectionPage} />
          <Route
            exact
            path='/sign-in'
            render={() =>
              currentUser ? <Redirect to='/shop' /> : <SignInAndSignUp />
            }
          />
          <Route path='/account-user/:userId' component={AccountUserPage} />
          <Route
            path='/account-admin/:adminId/shipping'
            component={ShippingPage}
          />
          <Route path='/account-admin/:adminId' component={AccountAdminPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route path='/validation' component={Validation} />
          <Route component={Page404} />
        </Switch>
        {location.pathname === '/' ||
        location.pathname === '/sign-in' ||
        location.pathname === '/checkout' ? null : (
          <Footer />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

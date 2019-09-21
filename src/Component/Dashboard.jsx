import React from 'react';
import { Container, CssBaseline } from '@material-ui/core';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Footer from './dashboard/Footer';
import Nav from './dashboard/Nav';
import SideBar from './dashboard/Sidebar';
import useStyles from './dashboard/style';
import ViewPrimary from './ViewPrimary';
import NewRequestPage from './NewRequest/NewRequestPage';
import RequestPage from './Request/RequestPage';
import { getUser } from '../redux/actions/user';
import SinIn from './SignIn';
import { userResult } from '../redux/selectors/index';
import { isValid } from '../service/userService';
import Home from './Home';


export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state) => userResult(state));
  const dispatch = useDispatch();
  console.log(`logeado is ${isValid()}`);

  // console.log('----userstore-----');
  // console.log(userstore);
  // console.log('-----user------');
  // console.log(user);
  // console.log('-----esValido------');
  // console.log(isValid());
  const singIn = (bodyUser) => {
    dispatch(getUser(bodyUser));
  };


  const layour = () => (
    <div className={classes.root}>
      <CssBaseline />
      <Nav classes={classes} handleDrawerOpen={() => setOpen(true)} open={open} />
      <SideBar classes={classes} handleDrawerClose={() => setOpen(false)} open={open} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Route path="/home" component={Home} />
          <Route path="/expediente" component={ViewPrimary} />
          <Route path="/solicitud/new" component={NewRequestPage} />
          <Route path="/solicitud/:solicitudId" component={RequestPage} />
          <Route
            exact
            path="/"
            render={() => (isValid() ? <Redirect to="/home" /> : <SinIn onLogin={singIn} />)}
          />
        </Container>
        <Footer classes={classes} />
      </main>
    </div>
  );

  const welcom = () => (
    <div className={classes.root}>
      <Route
        exact
        path="/"
        render={() => (isValid() ? <Redirect to="/home" /> : <SinIn onLogin={singIn} />)}
      />
    </div>
  );
  const renderSwitch = () => (isValid() ? layour() : welcom());

  return (
    <Switch>
      {renderSwitch()}
    </Switch>
  );
}

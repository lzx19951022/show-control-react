import React,{useState, useEffect,useCallback} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import UILink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import indexImg from'./indexPic.jpg'
import SettingsInputComponentOutlinedIcon from '@material-ui/icons/SettingsInputComponentOutlined';
import Func from '../function/function';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <UILink color="inherit" href="https://material-ui.com/">
        Your Website
      </UILink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${indexImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


  

export default function SignInSide() {
  const func = new Func();
  const [CGip, setCGip] = useState('');
  const [CGport, setCGport] = useState('');

  const [connectStatus, setConnectStatus] = useState('连接');
  

  const classes = useStyles();

  const handleClick = useCallback( () => {
    setConnectStatus('连接中')
    const cgData= {ip: CGip, port: CGport}
     fetch(`http://127.0.0.1:3000/api/cg/connect`, {
       method: 'post',
       headers: {
         'Content-type': 'application/json'
       },
       body: JSON.stringify(cgData)
     }).then(response => {
      if (response.ok) {
      return response.text()
      }
      }).then(response => {
        setConnectStatus(response)
      })
  })
  useEffect(() => {
    // 更新
     if(connectStatus == 'true') {
      setConnectStatus('连接成功！请点击下方的进入控制台') 
     }
  });
 



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <SettingsInputComponentOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           连接CG服务器
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="CGip"
              label="请输入CG服务器地址，本机请输入localhost"
              name="CGip"
              autoComplete="email"
              autoFocus
              onChange = {e => setCGip(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="CGport"
              label="请输入CG端口号"
              type="text"
              id="CGport"
              autoComplete="current-password"
              onChange={e => setCGport(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleClick}
            >
              {connectStatus}
            </Button>
            <Link to='/control-center' >
              进入控制中心
            </Link>

           
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
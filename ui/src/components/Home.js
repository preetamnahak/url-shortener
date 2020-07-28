import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import NavigationIcon from '@material-ui/icons/Navigation';
import AssignmentIcon from '@material-ui/icons/Assignment';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import $ from 'jquery'
import copy from 'clipboard-copy';
import toastr from 'toastr';
import 'toastr/build/toastr.css';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  links: {
    padding : theme.spacing(2),
    marginTop: theme.spacing(1),
    width : "100%",
    display : "inline",
    fontSize : "1.2rem",
    alignItems: 'center',
    color : "green"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '60%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  footer: {
    backgroundColor: '#0d47a1',
    color : 'white',
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  headerBadge: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    }
  },
}));

function copyIt(val){
  let resPromise = copy(val);
  resPromise.then(res => {
    toastr.success("Link copied to clipboard")
  },
  err => {
    toastr.info("Couldn't copy link")
  })
}
export default function Home() {
  const classes = useStyles();

  const [longurl, setLongUrl] = useState("")
  const [shortUrl, setShortUrl] = useState("")


  const copyLink = ()=> {
    if(shortUrl) copyIt(shortUrl)
    else toastr.warning("Nothing to copy", "Warning")
  }

  const navigate = () => {
    if(shortUrl){
      window.open(shortUrl)
    }
    else{
      toastr.warning("Nothing to navigate", "Warning")
    }
  }

  const submit = () => {
    if(longurl){
        $.ajax({
          type: "POST",
          url: "/fetch-short-url",
          data : {
            long_url : longurl
          },
          success : function(res){
            if(res.status === "success"){
                let su = window.location + "navigate?q=" + res.message
                setShortUrl(su)
                copyIt(su)
            }
            else{
                toastr.warning(res.message, "Warning")
            }
          },
          error : function(err){
            toastr.error("Something went wrong", "Error")
          }
        })
    }
    else{
      toastr.warning("URL can't be empty", "Warning")
    }
  }
  let sUrl = shortUrl?shortUrl:"Your shortened URL will appear here"

  return (
   <React.Fragment>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
              <b>SHORTIFY</b>
          </Typography>
        </Toolbar>
      </AppBar>
    
    <Container component="main" maxWidth="md">
      <div className={classes.paper} maxWidth="xs">
        <Avatar className={classes.avatar}>
          <WbIncandescentIcon />
        </Avatar>
        <Typography component="h1" variant="h5" align='center' color="primary">
          Shortify your Long URL
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item md={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="longurl"
                variant="outlined"
                required
                fullWidth
                id="longurl"
                label="Enter your URL"
                autoFocus
                value={longurl} 
                onChange={e => setLongUrl(e.target.value)}
              />
            </Grid>
            <Grid item md={8}></Grid>
            <Grid item md={4} sm={12}>
              <Button
                onClick = {() => submit()}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
              Generate
            </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <center>
        <Paper className={classes.links}>
          {sUrl}
          <IconButton aria-label="delete" title="Visit URL" onClick={() => navigate()}>
            <NavigationIcon />
          </IconButton>
          <IconButton aria-label="delete" title="Copy URL" onClick={() => copyLink()}>
            <AssignmentIcon />
          </IconButton>
        </Paper>
        

      </center>
    </Container>
  </React.Fragment>
  );
}

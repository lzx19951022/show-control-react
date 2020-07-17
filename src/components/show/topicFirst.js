import React, { useEffect,useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { makeStyles, formatMs } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems} from './listItems';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { green } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    paddingLeft: 3,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(25),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export  function Topic1() {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const [topicTitleNum, setTopicTitleNum] = React.useState([])
  const [topicData, setTopicdata] = React.useState([])
  const [CGstatus, setCGstatus] = React.useState('正在尝试连接')

  const setTopictitleId = () => {
        let data = topicTitleNum.map(id => id)
        let id = Date.now()
        data.push(id)
        setTopicTitleNum(data)
         
    }


  const checkStatus = () => {
    fetch(`http://127.0.0.1:3000/api/cg/status`).then(response => {
    if(response.ok) {
      return response.text()
    } else {
      setCGstatus('无法连接到api')
    }
  }).then( response => {
    console.log(response)
    if(response == 'true') {
      setCGstatus('cg引擎已连接')
    } else if (response == 'false') {
      setCGstatus('cg引擎断线')
    } else {
      setCGstatus('CG连接出错')
    }
  })

  }

  const setTopictitleId2 = () => {
    let data = topicTitleNum.map(id => id)
    setTopicTitleNum(data.slice(0,-1))
     
  }


  const saveData = (e,id) => {
    let titledata = {
      data: e,
      id: id,
      play: false
    }

    if(topicData.length == 0){
      let formerData = topicData.map(item => item)
      formerData.push(titledata)
      setTopicdata(formerData)
    } else {    

      let formerData = topicData.map(item => item)
      const isNotInclude = (data) => data.id != titledata.id 

      if(formerData.every(isNotInclude)){
        formerData.push(titledata)
        setTopicdata(formerData)
      } else {
        formerData.map(item =>{
          if(item.id == titledata.id) {
            item.data = titledata.data
          }else {
            return item
          }
        })
        setTopicdata(formerData)
     }
    }

    
 }

  const handlePlay = useCallback( id => {

    let formerData = topicData.map(item => item)
    formerData.map(item => {
      if(item.id == id) {
        item.play = true;
        //修改播出状态指示灯
        ReactDOM.render(<div style={{backgroundColor: 'red'}}>播出中</div>, document.getElementById(`div${id}`));
      } else{
        item.play = false;
        ReactDOM.render(<div style={{backgroundColor: 'green'}}>准备播出</div>, document.getElementById(`div${item.id}`));
      }
    })

    setTopicdata(formerData)

    topicData.map(item => {
      if(item.id == id) {

        fetch(`http://127.0.0.1:3000/api/cg/update`, {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({data:item.data})
        }).then(response => {
         if (response.ok) {
         return response.text()
         }
         }).then(response => {
           console.log(response)
         })
      }
    })
  })

  const handelColor = id => {
    topicData.map(item => {
       if(item.id == id) {
          if(item.play) {
            return true;
          } 
       } else {
         return false;
       }
      }
    )
  }



  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return(
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            随风扯淡秀
          </Typography>
          <div></div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={true}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} component="h1" >
              标题
              <Button variant="contained" color="primary" onClick={setTopictitleId}>
              新增
              </Button>
              <Button variant="contained" color="primary" onClick={setTopictitleId2}>
              删除
              </Button>
          </Grid>
          
          <br/>
          <Box component="span">
          {topicTitleNum.map(id =>{
          return(
            <span key={id}>
            <FormControl fullWidth>
          <InputLabel htmlFor={id.toString()}>填写标题{topicData.map(item => {
            if (id == item.id) {
              if(item.data.length <= 15) {
              return <span style={{marginLeft: '15px'}}>剩余：{15 - (item.data.length)}</span>
              } else if(item.data.length) {
              return <span style={{marginLeft: '15px'}}>已超出：{Math.abs(15 - (item.data.length))}</span>
              }
            } 
          })}字
          </InputLabel>
            <Input
            id={id.toString()}
            type='text'
            onChange={(e) => saveData(e.target.value,id)}
            />
            </FormControl>
            <Button variant="contained" color='primary' onClick={()=>handlePlay(id)}>
            播出
            </Button>
            <div  style={{backgroundColor: "green" ,fontSize:'1em'} } id ={`div${id}`}>准备播出</div>
            </span>

          )

        })}
        
      </Box>
          
        </Container>
      </main>
    </div>
    
  )

};
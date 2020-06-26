import React,{useState} from 'react';
import './App.css';
import { AppBar, Toolbar, Typography, IconButton, Card, Grid, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TwitterIcon from '@material-ui/icons/Twitter';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Axios from 'axios';
import Tweets from './components/tweets'
import {useSelector,useDispatch} from 'react-redux';
import {addSearchedData,loadedDataCount} from './redux/ruleAction';
import CircularProgress from '@material-ui/core/CircularProgress';
const useStyles = makeStyles({
  root:{
    backgroundColor:'black'
  },
  search:{
    display:'flex',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px'
  }
})

function App() {
  const classes = useStyles();
  const [searchInput,setSearchInput]=useState('');
  const [notificationBadge,setNotificationBadge]=useState('0');
  const [statuses,setStatuses]=useState([]);
  const [isLoading,setLoading]=useState(false)
  const dispatch=useDispatch();
  const allStatuses=useSelector(state=>state.statuses);
  const loadCount=useSelector(state=>state.loaded);    // the total no. of tweets loaded count value is being retrieved from redux store; 
  const onSubmitSearch=(event)=>{
    if (event.key === 'Enter') {
      setLoading(true)
      Axios.get(`/search?search=${event.target.value}&count=${100}`)
      .then(res=>{
                  setLoading(false)
                  dispatch(addSearchedData(res.data));
                  dispatch(loadedDataCount(25));
                  let {statuses}=res.data
                  statuses=statuses.splice(0,25)
                  setStatuses(statuses);
                  setNotificationBadge(statuses.length)}).catch(err=>{setLoading(false);console.log(err)})
    }
  }
  const handleLoadMore=()=>{
    // let newStatuses=allStatuses.splice(loadCount,10);
    // setStatuses([...statuses,...newStatuses]);
    // setNotificationBadge(newStatuses.length);
    setLoading(true);
    Axios.get(`/loadmore?search=${searchInput}&skip=${loadCount}`)
    .then(res=>{
      setLoading(false);
      let {data}=res;
      setStatuses([...statuses,...data.statuses]);
      dispatch(loadedDataCount(loadCount+data.statuses.length));
      setNotificationBadge(data.statuses.length)
    }).catch(err=>{setLoading(false);console.log(err)})
  }
  return (
    <div>
      <AppBar position="fixed">
       <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <TwitterIcon/>
        </IconButton>
          <Typography variant="h5">
         Twitter Clone
       </Typography>
       <div className={classes.search}>
        <SearchIcon color='primary'/>
        <InputBase value={searchInput} onChange={event=>setSearchInput(event.target.value)} placeholder="search and press Enter" color='primary' onKeyDown={onSubmitSearch}/>
       </div>
       <IconButton color="inherit" style={{marginLeft: 'auto'}}>
        <Badge badgeContent={'+'+notificationBadge} color="secondary">
          <NotificationsIcon />
        </Badge>
        </IconButton>
      </Toolbar>
     </AppBar>
     <Grid container
        direction="column"
        justify="center"
        alignItems="center" 
        spacing={5} style={{ marginTop:'50px'}}>
        {
          statuses.map(status=>(
            <Grid item xs={12} md={12} style={{margin: 'auto', width: 530,padding:10}}>
              <Tweets status={status}/>
            </Grid>
          ))
        }
      <Grid item xs={12} md={12} style={{margin: 'auto',padding:20}}>
      {
        statuses.length!=0 ? 
          <Button onClick={handleLoadMore} style={{margin:'0 auto'}}>
          {
            isLoading ? <CircularProgress /> : 'Load More'
          }
        </Button> : isLoading ? <CircularProgress /> : <Typography style={{margin:'0 auto'}}>
          Nothing to show please search something!!!
        </Typography>
      }
      </Grid>

      </Grid>
   
    </div>
  );
}
export default App;

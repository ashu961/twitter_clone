let express=require('express');
let path=require('path');
let app=express();
const mongoose = require('mongoose');
require('./models/search');
const Search = mongoose.model('searches');
mongoose.connect('mongodb+srv://ashutosh:ashutosh@1@project2-prod-a0jgh.mongodb.net/twitter_clone?retryWrites=true&w=majority', { useNewUrlParser: true });
let Twit = require('twit');
let T = new Twit({
    consumer_key:         'HlEmMglQgaUlXdsi0f3n7Bmsy',
    consumer_secret:      'QfNbOMIkraaS700ogUbjqrPYbLQ2PcHntAB4KwlhD4p4JXkUXN',
    access_token:         '1239493661286531072-Ya7jfJMeRqsQwzbNeg3AXt9FGoUuV6',
    access_token_secret:  '1aFNEnSba7sdxrT5b6D3uQ6K7R6IsCNu4MQC9F9c5SdU8',
  });

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.get('/search',function(req,res){
    T.get('search/tweets', { q: req.query.search , count: req.query.count }, function(err, data, response) {
      let search;
        try{
          search=new Search({
            searchQuery: req.query.search,
            statuses:data.statuses
          }).save()
        }catch(e){
          console.log(e)
        }
        data.statuses=data.statuses.splice(0,25);

        res.send(data);
      })   
});
app.get('/loadmore',async (req,res)=>{
  let {skip,search}=req.query;
  let searchedData = await Search.findOne({searchQuery:search}).sort({createdAt: -1});
  //console.log(searchedData)
  searchedData.statuses=searchedData.statuses.splice(skip,10);
  //console.log(searchedData.statuses.length)
  res.send(searchedData);
})
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});
app.listen('3000',function(){
    console.log('starting the server at localhost:3000');
});
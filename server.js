const express   = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl');
const shortUrl = require('./models/shortUrl');

const app = express()


mongoose.connect("mongodb://127.0.0.1:27017/shortUrls", {
    useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(()=>console.log('connected>>>>>>>>>>>>>>>>>>>'))
.catch(e=>console.log(e, '<<<<<<<<<<<<<<'));

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))



app.get('/',async (req, res)=>{

    const shortUrlList = await ShortUrl.find()

res.render('index', {shortUrls : shortUrlList})

})


app.post('/shortUrls', async (req, res)=>{

   await ShortUrl.create({fullUrl : req.body.fullUrl})

   res.redirect('/')

})


app.get('/:shortUrl', async(req, res)=>{

 const foundShortUrl = await  ShortUrl.findOne({shortUrl : req.params.shortUrl})

 if(!foundShortUrl){
    return res.sendStatus(404)
 }

        foundShortUrl.clicks++
        foundShortUrl.save()

res.redirect(foundShortUrl.fullUrl)
})

app.listen(process.env.PORT || 5000)
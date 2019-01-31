
const express = require('express')
const jwt = require('jsonwebtoken')
const app = express()
const passport=require('passport')
const passportJWT=require('passport-jwt')
const secret='thisismysecret'
const JwtStrategy =passportJWT.Strategy;
const ExtractJwt =passportJWT.ExtractJwt;
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: false })
var cors = require('cors')
var session = require('express-session')
const manager = require('./Manager')


var cookieParser = require('cookie-parser')
app.options('*', cors())
app.use(cookieParser())


var Users=manager.Users
var users= new Users()

var opts = {
    secretOrKey : secret,
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtStrategy=new JwtStrategy(opts,function(payLoad,next){
    const user=users.find(user=>user.mail===payLoad.user)
    console.log(payLoad.user)
    if(user){
        next(null,user)
    }
    else{
        next(null,false)
    }
})

passport.use(jwtStrategy)



app.get('/', function(req, res) {
  res.send('Hello World!')
})



/**
 * récupérer un evenement à partir de son id
 */
app.get('/getEvent',(req,res)=>{
    let user=users.getUser(extractJWT(req))
    let event=user.getEvent(req.query.id)
    res.send(event)
})

/**
 * recupérer la liste des evenements d'un utilisateur
 */
app.get('/getEventsList',(req,res)=>{
    let user=users.getUser(extractJWT(req))
    let events=user.getAllEvents()
    res.send(events)
})

/**
 *ajoute un evenement 
 */
app.post('/addEvent',urlEncodedParser,(req,res)=>{
    let user=users.getUser(extractJWT(req))
    let titre=req.body.titre
    let date=req.body.date
    let answer=user.addEvent(titre,date)
    res.send(answer)
})

app.get('/deleteEvent',(req,res)=>{
    let user=users.getUser(extractJWT(req))
    let id=parseInt(req.query.id)
    let answer=user.deleteEvent(id)
    res.send(answer)
})

/**
 * extrait le jwt de la requete
 * @param {requete} req 
 */
function extractJWT(req){
    return req.cookies.jwt
}

/**
 * créer un compte
 * 
 */
app.post('/createCompte',urlEncodedParser,(req,res)=>{
    let nom=req.body.nom
    let prenom=req.body.prenom
    let email=req.body.email
    let pwd=req.body.password
    let answer=users.addUser(nom,prenom,email,pwd)    
    res.send(answer)
})

/**
 * authentification
 */
app.post('/login', urlEncodedParser, (req,res)=>{
    let jwt=identification(req)

    if(jwt.error){
        res.status(401).json(jwt)
    }
    res.cookie('jwt',jwt.jwt)   
    res.send({res:'Connexion accepté',jwt})
    
})



app.get('/public', (req, res) => {
    res.send('I am public folks!')
 })


  
app.get('/user',(req,res)=>{
      res.send('molina')
})
  
app.get('/private', passport.authenticate('jwt', { session: false }), (req, res) => {    
   res.send('hello')
})
  





app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
  })

app.get('/users',(req,res)=>{  
    res.send(users)
})





function identification(req){
    const email = req.body.email
    const password = req.body.password   
    if (!email || !password) {        
        return { error: 'Email or password was not provided.'}
    }
    // this is usually a database call instead of a find in an array
    const user = users.listUser.find(user => user.email === email)
    if (!user || user.password !== password) {
        return { error: 'Email / password do not match.'}
    }   
    const userJwt = jwt.sign({
         email: user.email,
         password: user.password }, secret)    
    return { jwt: userJwt }
 }


 
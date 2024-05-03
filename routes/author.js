const express = require('express')
const router = express.Router()
const Author = require('../models/author')

//all author routes
router.get('/', async (req,res)=>{

  let searchOptions = {}
  if(req.query.name != null && req.query.name !== ''){
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  await Author.find(searchOptions).then((authors)=>{
    console.log('authors', authors);
    res.render('authors/index', {
      authors: authors, 
      searchOptions: req.query
    })
  }).catch((err)=>{
    res.redirect('/')
  })

})

//new author routes
router.get('/new', (req,res)=>{
  res.render('authors/new', {author : new Author()})
})

//Create author routes
router.post('/', async (req,res)=>{
  const author = new Author({
    name : req.body.name
  })
  await author.save().then(()=>{
      res.redirect(`authors`)
  }).catch((err)=>{
    res.render('authors/new',{
      author: author,
      errorMessage: 'Error creating author'
    })
  })
  // res.send(req.body.name)
})


module.exports = router
 
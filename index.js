const fs = require('fs')
const http = require('http')
const url = require('url')
const replaceTemplate = require('./modules/replaceTemplate')

// Read data from file
const data = fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

// Templates
const tempHome = fs.readFileSync(`${__dirname}/templates/home.html`, 'utf-8')
const tempDetail = fs.readFileSync(`${__dirname}/templates/detail.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`, 'utf-8')

// Create server
const server = http.createServer((request, response) => {
  const {query, pathname} = url.parse(request.url, true)
  
  // Homepage, Pokemon list
  if (pathname === '/') {
    response.writeHead(200, {'Content-type': 'text/html'})
    const pokemonsHtml = dataObj.map(
      elem => replaceTemplate(tempCard, elem)
      ).join('')
    const output = tempHome.replace('{%POKEMON_LIST%}', pokemonsHtml)
    response.end(output)

  // Pokemon Detail
  } else if (pathname === '/pokemon') {
    response.writeHead(200,
      {'Content-type': 'text/html'})
    const pokemon = dataObj[query.id]
    const pokemonHtml = replaceTemplate(tempDetail, pokemon)
    response.end(pokemonHtml)

  // API
  } else if (pathname === '/api') {
    response.writeHead(200,
      {'Content-type': 'application/json'})
    response.end(data)
  
  // Page not found
  } else {
    response.writeHead(404, {
        'Content-type': 'text/html'})
    response.end('<h1>Page not found!</h1>')
  }
})

// Server listening
server.listen(8000, '127.0.0.1', () => {
  console.log('Start listening the requests...')
})

'use strict';
const locationRepo = require("../core/locationRepo");
const accidentsRankedByMakeForLocation = require("../core/accidentsRankedByMakeForLocation");


function thisYear() {
  return new Date().getFullYear();
}

function homeHandler (request, h) {
  const location = locationRepo.findByName(request.params.location) || locationRepo.findAll()[0];
  const title = `Accidents in ${location.name}` ;
  const results = accidentsRankedByMakeForLocation(location.id);

  return h.view('home', {
    title,
    location,
    results,
    message: 'Hello world!',
    year: thisYear
  });
}

function home(server) {
  server.route({ method: 'GET', path: '/', handler: homeHandler });
  server.route({ method: 'GET', path: '/location/{location}', handler: homeHandler });
}


module.exports = home

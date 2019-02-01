/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
    
      let input = req.query.input;
     
      let response = {};
      response.initNum = convertHandler.getNum(input);
      response.initUnit = convertHandler.getUnit(input);
    
      if (response.initNum === 'invalid input' && response.initUnit === 'invalid input') 
        response.string = 'invalid number and unit';
      else if (response.initNum === 'invalid input') 
        response.string = 'invalid number';
      else if (response.initUnit === 'invalid input')
        response.string = 'invalid unit';
      else {    
        response.returnNum = convertHandler.convert(response.initNum, response.initUnit);
        response.returnUnit = convertHandler.getReturnUnit(response.initUnit);
        response.string = convertHandler.getString(response.initNum, response.initUnit, response.returnNum, response.returnUnit);
      }

      res.status(200).json(response);
    });
    
};

/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getFirstLetter = function(input) {
    let regex = /[a-z]/i;
    return input.search(regex);
  }
  
  this.getNum = function(input) {
    var result;
    let pos = this.getFirstLetter(input);
    if (pos < 0) //units not found
      result = 'invalid input';
    else if (pos === 0)    //no number given, default to 1
      result = 1;
    else {
      result = input.substring(0, pos);
      if (result.indexOf('/', result.indexOf('/') + 1) > 0)    //if more than one fraction found
        result = 'invalid input';
      if (result.indexOf('.', result.indexOf('.') + 1) > 0)    //if more than one decimal found
        result = 'invalid input';
    }  
    return result;
  };
  
  this.getUnit = function(input) {
    var result;
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    
    let pos = this.getFirstLetter(input);
    if (pos < 0) //units not found
      result = 'invalid input';
    else {
      result = input.substring(pos);
      if (!validUnits.includes(result.toLowerCase()))
        result = 'invalid input';
    }
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    const Units = {
      gal: 'l',
      l: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    }
    
    return Units[initUnit.toLowerCase()];    
  };

  this.spellOutUnit = function(unit, num) {
    const UnitSpell = {
      gal: 'gallon',
      l: 'liter',
      mi: 'mile',
      km: 'kilometer',
      lbs: 'pound',
      kg: 'kilogram'
    }

    return UnitSpell[unit.toLowerCase()];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;

    const ConversionTable = {
      gal: galToL,
      l: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg
    };
    
    // round to 5 decimal digits
    result = Math.round(eval(initNum) * ConversionTable[initUnit.toLowerCase()] * 10**5) / 10**5;

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var initUnitSpell =  this.spellOutUnit(initUnit) + ((eval(initNum) > 1) ? 's': '');
    var returnUnitSpell =  this.spellOutUnit(returnUnit) + ((eval(returnNum) > 1) ? 's': '');
    return (initNum + ' ' + initUnitSpell + ' convert' + ((eval(initNum) > 1) ? '': 's') + ' to ' + returnNum + ' ' + returnUnitSpell) ;
  };
  
}

module.exports = ConvertHandler;

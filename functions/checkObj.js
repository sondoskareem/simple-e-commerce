const NotEmpty = require('../functions/NotEmpty')


  exports.ObjNotExpected = function(data){
	  let check = true
    Object.keys(data).forEach(function(key) {
		if (!NotEmpty.NotEmpty(data[key]))check=false
	})
	// console.log(data)
	return check
    }
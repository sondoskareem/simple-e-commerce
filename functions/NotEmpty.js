exports.NotEmpty = function(e) {
	// e = e.trim()
	// console.log(e)
	switch (e) {
	  case "":
    //   case e.trim().length == 0:
	  case 0:
	  case "0":
	  case null:
	  case 'null':
	  case 'Null':
	  case false:
	  case typeof(e) == "undefined":
		return false;
	  default:
		return true;
	}
  }


Meteor.publish("cobros",function(params){
  	return Cobros.find(params);
});

Meteor.publish("cobrosR",function(params){
  	return Cobros.aggregate([{
	    $group : {
	        _id : {obra :"$obra_id", mes:"$mes_id"},
	        totalCIva : { $sum : "$cIva" },
	        totalSIva : { $sum : "$cSinIva" }
	    }
	}]);
});


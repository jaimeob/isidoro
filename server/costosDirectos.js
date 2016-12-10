Meteor.publish("costosDirectos",function (params) {
	return CostosDirectos.find(params)
});

var script_url = "https://script.google.com/macros/s/AKfycbzdc9gvfn4ppGlJIKEcU88oaAgFID2m73HBHagxMs_iTodX6GVw/exec";
var $form = $("form#subForm");

var today = new Date();
var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || "");
		} else {
			o[this.name] = this.value || "";
		}
	});
	return o;
};

$("#subForm").on("submit", function(e) {
	e.preventDefault();
	var name = document.getElementById("Name").value;
	var email = document.getElementById("Email").value;
	var data = $form.serializeObject();
	data["DateSignedUp"] = date;
	var dataAsJson = $.ajax({
		url: script_url,
		method: "GET",
		dataType: "json",
		data: data
	});

	alert("Your form was submitted successfully.");
	$("form#subForm").trigger("reset");
});

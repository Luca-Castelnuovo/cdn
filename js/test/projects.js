$("#submit").click(function () {
	var e = $("input[name=type]"),
		t = $("input[name=id]"),
		a = $("input[name=project_name]"),
		n = $("input[name=project_delete]"),
		o = $("input[name=CSRFtoken]"),
		l = "",
		r = "";
	if ("" == e.val()) return !1;
	if ("" == o.val()) return !1;
	if ("add" == e.val()) {
		if ("" == a.val()) return !1;
		l = "Project succesfully created!", r = "Project not created!"
	}
	if ("delete" == e.val()) {
		if ("" == n.val()) return !1;
		if ("" == t.val()) return !1;
		l = "Project succesfully deleted!", r = "Project not deleted!"
	}
	var c = "project_id=" + t.val() + "&project_name=" + a.val() + "&CSRFtoken=" + o.val() + "&type=projects&project_type=" + e.val() + "&project_delete=" + n.val();
	console.log(c), $(".text").attr("disabled", "true");
	var i = $(".login"),
		d = i.find("button > .state");
	return i.addClass("loading"), d.html("Proccessing"), $.ajax({
		url: "/process.php",
		type: "GET",
		data: c,
		cache: !1,
		dataType: "JSON",
		success: function (e) {
			e.status ? (i.addClass("ok"), d.html(l), setTimeout(function () {
				window.location.replace("/home")
			}, 500)) : (i.addClass("error"), d.html(r), setTimeout(function () {
				window.location.replace("/home")
			}, 1e3))
		}
	}), !1
});
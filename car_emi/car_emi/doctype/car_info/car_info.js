// Copyright (c) 2016, Frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on('Car Info', {
	refresh: function(frm) {

	frm.add_custom_button(__('Employees'), function() {
				// frappe.set_route('query-report', 'Employees', {Appointment:frm.doc.name});
				console.log("helllllllllloooooooooo");
	});


	}
});

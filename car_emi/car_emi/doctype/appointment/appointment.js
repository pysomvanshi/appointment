// Copyright (c) 2016, Frappe and contributors
// For license information, please see license.txt

frappe.ui.form.on('Appointment', {
	refresh: function(frm) {

	},
	calendar: function(frm) {
		var url,data;
		data=window.location.origin
		url=data + "/desk#Calendar/Appointment";		
		window.open(url,"_self");
	}
});

frappe.ui.form.on("Appointment", "validate", function(frm,doc) {
    if(frm.doc.starts_on && frm.doc.ends_on){
		if(frm.doc.starts_on >frm.doc.ends_on){
			msgprint(__("Start Time should be greater than End Time"));
			validated = false;
		}
	}
});

frappe.ui.form.on("Appointment", "starts_on", function(frm,doc) {
    if(frm.doc.starts_on){
		frm.doc.starts = frm.doc.starts_on 
	}
});

frappe.ui.form.on("Appointment", "refresh", function(frm,doc) {
    if((frm.doc.status=='Cancel') || (frm.doc.status=='Completed')){
		cur_frm.set_df_property('customer', 'read_only', 1);
		cur_frm.set_df_property('starts_on', 'read_only', 1);
		cur_frm.set_df_property('ends_on', 'read_only', 1);
		cur_frm.set_df_property('employee', 'read_only', 1);		
		cur_frm.set_df_property('status', 'read_only', 1);		
		refresh_field("customer")
		refresh_field("starts_on")
		refresh_field("ends_on")
		refresh_field("employee")		
		refresh_field("status")
		
	}
});

cur_frm.fields_dict['employee'].get_query = function(doc) {
		return {
			filters: {"designation": "Sales person"}
		}
	}
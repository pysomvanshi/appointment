
frappe.views.calendar["Appointment"] = {
	field_map: {
		"start": "starts_on",
		"end": "ends_on",
		"id": "Customer",
		"allDay": "all_day",
		"title": "customer",
		"status": "status",
		"name": "name"
	},
	/*style_map: {
		"Open": "open",
		"Confirm": "confirm",
		"Cancel": "cancel",
		"Completed":"completed"
	},*/

	get_css_class: function(data) {
		if(data.status==="Open") {
			return "open";
		} else if(data.status==="Confirm") {
			return "warning";
		}else if(data.status==="Completed") {
			return "success";
		} else {
			return "danger";
		}
	},
	gantt: true,
	gantt_scale: "hours",
	filters: [
		{
			"fieldtype": "Link",
			"fieldname": "employee_name",
			"options": "Employee",
			"label": __("Employee"),
			"get_query": function() {
				return {
					filters: {"designation": "Sales person"}
				}
			}
		},
	],
	get_events_method: "car_emi.car_emi.doctype.appointment.appointment.get_events"

}


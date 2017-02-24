frappe.views.calendar["Car Info"] = {
	field_map: {
		"start": "starts_on",
		"end": "ends_on",
		"id": "name",
		"allDay": "all_day",
		"title": "subject",
		"status": "event_type",
	},
	get_events_method: "frappe.desk.doctype.event.event.get_events"
}
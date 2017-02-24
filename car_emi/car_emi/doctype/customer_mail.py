# def update_completed_and_requested_qty(stock_entry, method):

def validate_customer(customer, method):
	# called via User hook
	# if "sales_person" in [d.role for d in doc.get("user_roles")]:
	# 	if not frappe.db.get_value("Customer", {"customer_name": doc.name}):
	# 		frappe.msgprint(_("Please set User ID field in an Employee record to set Employee Role"))
	# 		doc.get("user_roles").remove(doc.get("user_roles", {"role": "Employee"})[0])	


	frappe.sendmail(recipients=customer.sales_person.email, subject=frappe._("Appointment Scheduled."),
				content = { "Customer Name":"customer.customer_name", "Contact No.":"customer.mobile_no", "Time":"customer.take_appointment"})


	frappe.sendmail(recipients=customer.email, subject=frappe._("Appointment Scheduled."),
				content = { "Sales Person":"customer.sales_person", "Contact No.":"sales_person.mobile_no", "Time":"customer.take_appointment"})



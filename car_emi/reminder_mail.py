



# def update_completed_and_requested_qty(stock_entry, method):

def send_appointment_mail(customer,sales_person,take_appointment):
	msg = "Your Appointment has been Scheduled at"+	take_appointment+"\n"+"sales_person:"+salesperson;
	frappe.sendmail(
			recipients=customer,
			sender=frappe.session.user,
			subject="Appointment",
			message=msg
	)
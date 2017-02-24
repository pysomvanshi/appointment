# -*- coding: utf-8 -*-
# Copyright (c) 2015, Frappe and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
import json

class CommandFailedError(Exception):
	pass


class Appointment(Document):
	pass

	def validate(self):
		assign_app = frappe.db.sql("""select customer,starts_on,ends_on from `tabAppointment` where status in ('Open','Confirm') 
			and ((starts_on >= '%s' and starts_on <= '%s') or (ends_on >= '%s' and ends_on <= '%s')) 
			and employee = '%s'"""%(self.starts_on, self.ends_on,self.starts_on, self.ends_on, self.employee),as_list=1)
		if assign_app:
			for app in assign_app:
				if app[0] != self.name:
					frappe.throw(_("Appointment '{0}' is already scheduled for this employee within {1} and {2}.Please change appointment time").format(assign_app[0][0], assign_app[0][1],assign_app[0][2]))


@frappe.whitelist()
def get_employees(employee=None):
	employees = frappe.db.sql("""select  name as id, employee_name as name from `tabEmployee` where designation='Sales person' 
		and %(employee_condition)s order by name""" % {	"employee_condition": " '1'=1 "	}, as_dict=1)
	print "\n\n\n\n\n\n\n\n-----------**************-----------------", employees
	return employees
	
# @frappe.whitelist()
# def get_events(start,end,filters=None):
# 	print "********************get_events"
# 	filters = json.loads(filters)
# 	query = """select
# 		 		starts_on,
# 				ends_on,
# 		 		employee,
# 		 		customer,
# 		 		name
# 		 		from `tabAppointment`
# 		 		where starts_on between %(start)s and %(end)s and 
# 				ends_on  between %(start)s and %(end)s"""
# 	if filters and filters.get("employee_name"):
# 		emp =  filters.get('employee_name')		
# 		query += " and employee = '{0}'".format(emp)

# 	appointment_events=frappe.db.sql(query,{
# 				"start":start,
# 				"end":end
# 				},as_dict=True,update={"allDay": 0})

# 	return appointment_events

@frappe.whitelist()
def get_events_grid(start, end,filters=None):
	print "********************get_events_grid"
	import json
	filters=json.loads(filters)	
	print "===========================filters",filters
	events = frappe.db.sql("""select name, employee, employee as resource ,starts_on, ends_on, customer,
		status,0 as all_day from `tabAppointment` where %(employee_condition)s (( (date(starts_on) between 
		date('%(start)s') and date('%(end)s'))
		or (date(ends_on) between date('%(start)s') and date('%(end)s'))
		or (date(starts_on) <= date('%(start)s') and date(ends_on) >= date('%(end)s'))
		)) order by starts_on""" % {
			"start": start,
			"end": end,
			"employee_condition": " employee= '"+filters['employee_name']+"'  and " if filters['employee_name'] else ""
		}, as_dict=1)
	print "\n\n\n\n\n\n\n---------------------------------", events
	# frappe.errprint(events)
	
	employees=frappe.db.sql("""select name as id,employee_name  as name from tabEmployee where %(employee_condition)s  
		and designation='Sales person' order by name """ % {
		"employee_condition": " employee= '"+filters['employee_name']+"' " if filters['employee_name'] else "1=1"
		}, as_dict=1)
	# frappe.errprint(employees)
	print "___________________________________________________", employees
	return events,employees


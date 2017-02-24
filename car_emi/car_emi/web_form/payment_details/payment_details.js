frappe.ready(function() {
    $("[name='down_payment']").change(function(){
        calculate();
    });

   
// bind events here
})


function calculate() {
   
    var a = $("[name='total_amount']").val();
	var b = $("[name='down_payment']").val();
	var c = a-b;

    $("[name='loan_amount']").val(c);
    alert("Your loan amount is "+c);

	var rate = $("[name='interest_rate']").val();

    console.log(rate +" interest "+$("[name='interest_rate']").val());

     var principal = c;

     var interest = rate / 100 / 12;

     var payments = $("[name='loan_duration']").val();
     console.log("total instalments"+payments);

     var x = Math.pow(1 + parseFloat(interest), parseFloat(payments));
     var monthly = (principal*x*interest)/(x-1);
     // alert(monthly);
     console.log("monthly EMI "+monthly);
     $("[name='emi']").val(monthly);
     alert("Your monthly EMI is "+monthly);


   
}

$(document).ready(function() {

     $("label[for=bank_name]").hide(000);
            $('[name="bank_name"]').hide(000);

            $("label[for=loan_duration]").hide(000);
            $('[name="loan_duration"]').hide(000);

            $("label[for=interest_rate]").hide(000);
            $('[name="interest_rate"]').hide(000);

            $("label[for=down_payment]").hide(000);
            $('[name="down_payment"]').hide(000);

            $("label[for=loan_amount]").hide(000);
            $('[name="loan_amount"]').hide(000);

            $("label[for=emi]").hide(000);
            $('[name="emi"]').hide(000);

    $('#loan_required').click(function() {

        if($(this).is(":checked")) 
        { 
            $("label[for=bank_name]").show();
            $('[name="bank_name"]').show();

            $("label[for=loan_duration]").show();
            $('[name="loan_duration"]').show();

            $("label[for=interest_rate]").show();
            $('[name="interest_rate"]').show();

            $("label[for=down_payment]").show();
            $('[name="down_payment"]').show();

            $("label[for=loan_amount]").show();
            $('[name="loan_amount"]').show();

            $("label[for=emi]").show();
            $('[name="emi"]').show();
        }
        else
        {
            // 
            $("label[for=bank_name]").hide();
            $('[name="bank_name"]').hide();

            $("label[for=loan_duration]").hide();
            $('[name="loan_duration"]').hide();

            $("label[for=interest_rate]").hide();
            $('[name="interest_rate"]').hide();

            $("label[for=down_payment]").hide();
            $('[name="down_payment"]').hide();

            $("label[for=loan_amount]").hide();
            $('[name="loan_amount"]').hide();

            $("label[for=emi]").hide();
            $('[name="emi"]').hide();
        }
    });


});

$('input[type="button"][value="Save"]').on('click', function(){
    var dialog = new frappe.ui.Dialog({
    title: __("Your Loan and EMI Amount"),
    fields: [

        {fieldtype: "Currency", fieldname: "loan_amount", label: __("Loan Amount"), reqd: 1},
        {fieldtype: "Currency", fieldname: "loan_amount", label: __("Monthly EMI"), reqd: 1}
        
    ]
});

dialog.show();


});

$('.btn-form-submit').on('click', function(){
    msg = "Your Monthly EMI is "+$('[name=emi]').val();
    msg1 = "Your Loan Amount is "+$('[name=loan_amount]').val();

    frappe.msgprint(msg,msg1)
});

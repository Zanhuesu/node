$('.read_notify').click(function() { $('.read_noti_txt').html('Marking...');$.ajax({url: '/notify',type: 'POST',data: JSON.stringify({ notice: 'new' }),contentType: 'application/json',success: function(data)  {
	if (data.error == false) {toastr['success']("Notifications Read!");$('.read_noti_txt').html('Marked As Read');$('.read_notify').attr("disabled", true) } else{}
} }); });
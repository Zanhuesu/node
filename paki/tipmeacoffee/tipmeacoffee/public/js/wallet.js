function showPass() {if ($('#pass-input').attr('type') == 'text') {$('#pass-input').attr('type', 'password');} else {$('#pass-input').attr('type', 'text');}}
function showQrc() {let passVal = $('#pass-input').val();new QRCode(document.getElementById("qrcode"), passVal);$("#modal-qrc").show(); }
$("#modal-qrc").click(function(ev){ev.preventDefault();if(ev.target != this) return;$('#modal-qrc').hide();$('#qrcode').empty(); });
$('#transfer_btn').click(function(e) {  e.preventDefault();$(".modal-transfer").show();});
$(".modal-closeIcon-wrap").click(function(){$(".modal-transfer").hide();});
$('.boost_btn').click(function(e) {  e.preventDefault();$(".modal-boost").show();});
$(".gen-close").click(function(){$(".modal-gen").hide();setTimeout(function(){window.location.reload();}, 100);});
$(".boost-close").click(function(){$(".modal-boost").hide();});
$('.withd_btn').click(function(e) {  e.preventDefault();$(".modal-widr").show();});
$(".widr-close").click(function(){$(".modal-widr").hide();});
$('#widr_amt').keyup(function() {var dInput = this.value; $('.pay_amt').html((0.99 * dInput).toFixed(4))})
$('.widr_tok_btn').click(function() {
    if (breeze_username) {$('.widr_btn_txt').html('processing...');$('.widr_tok_btn').attr("disabled", true);
        let widr_amt=$("#widr_amt").val();let wid_address=$("#bsc_address").val();
        if ((widr_amt=='')){ $("#widr_amt").css("border-color", "RED");toastr.error('phew... Withdraw amount missing');$('.widr_btn_txt').html('Withdraw');$('.widr_tok_btn').attr("disabled", false);return false;}
        if (wid_address==''){ $("#bsc_address").css("border-color", "RED");toastr.error('phew... Enter your bsc address');$('.widr_btn_txt').html('Withdraw');$('.widr_tok_btn').attr("disabled", false);return false;}
        if (!$.isNumeric(widr_amt)) {toastr.error('phew... Enter valid withdraw amount');$('.widr_btn_txt').html('Withdraw');$('.widr_tok_btn').attr("disabled", false);return false;}
        $.ajax({url: '/withdraw',type: 'POST',data: JSON.stringify({ wid_addr: wid_address, wid_amount: widr_amt}),contentType: 'application/json',
            success: function(data)  {if (data.error == false) {$(".modal-widr").hide();toastr['success']("Withdrawal Initiated Successfully!");setTimeout(function(){window.location.reload();}, 200); } else {toastr['error'](data.message);$('.widr_btn_txt').html('Withdraw');$('.widr_tok_btn').attr("disabled", false);return false;} }
        });
    } else { toastr.error('hmm... You must be login!');$('.widr_tok_btn').attr("disabled", false); return false; }
});
$('.trans_btn').click(function() {
    if (breeze_username) {$('.trans_txt').html('Transferring...');$('.trans_btn').attr("disabled", true);
        let trans_amount=$("#trans_amount").val();let rec_user=$("#rec_user").val();let memo=$("#trans_memo").val();let trans_bal=$(".trans_bal").html();
        if (rec_user==''){ $("#rec_user").css("border-color", "RED");toastr.error('phew... Enter receiver username');$('.trans_txt').html('Transfer');$('.trans_btn').attr("disabled", false);return false;}
        if (trans_amount==''){ $("#trans_amount").css("border-color", "RED");toastr.error('phew... Amount not valid');$('.trans_txt').html('Transfer');$('.trans_btn').attr("disabled", false);return false;}
        if (!$.isNumeric(trans_amount)) {toastr.error('phew... Enter valid amount');$('.trans_txt').html('Transfer');$('.trans_btn').attr("disabled", false);return false;};
        $.ajax({url: '/transfer',type: 'POST',data: JSON.stringify({ rec_user: rec_user, trans_amount: trans_amount, memo: memo}),contentType: 'application/json',
            success: function(data)  {if (data.error == false) {$(".modal-transfer").hide();toastr['success']("Transferred!");setTimeout(function(){window.location.reload();}, 200); } else {toastr['error'](data.message);$('.trans_txt').html('Transfer');$('.trans_btn').attr("disabled", false);return false;} }
        });
    } else { toastr.error('hmm... You must be login!');$('.trans_btn').attr("disabled", false); return false; }
});

$('.boost_post_btn').click(function() {
    if (breeze_username) {$('.boost_btn_txt').html('Processing...');$('.boost_post_btn').attr("disabled", true);
        let boost_amount=$("#boost_amount").val();let boost_url=$("#boost_url").val();
        if (boost_url==''){ $("#boost_url").css("border-color", "RED");toastr.error('phew... Enter URL of POST to Boost');$('.boost_btn_txt').html('Boost');$('.boost_post_btn').attr("disabled", false);return false;}
        if ((boost_amount=='')){ $("#boost_amount").css("border-color", "RED");toastr.error('phew... Bid value empty');$('.boost_btn_txt').html('Boost');$('.boost_post_btn').attr("disabled", false);return false;}
        if (!isValidURL(boost_url)) {$("#boost_url").css("border-color", "RED");$('.boost_btn_txt').html('Boost');$('.boost_post_btn').attr("disabled", false);return false;}
        if (!$.isNumeric(boost_amount)) {toastr.error('phew... Enter valid bid amount');$('.boost_btn_txt').html('Boost');$('.boost_post_btn').attr("disabled", false);return false;}
        $.ajax({url: '/boost',type: 'POST',data: JSON.stringify({ boost_url: boost_url, boost_amount: boost_amount}),contentType: 'application/json',
            success: function(data)  {if (data.error == false) {$(".modal-boost").hide();toastr['success']("Post Boost Success!");setTimeout(function(){window.location.reload();}, 200); } else {toastr['error'](data.message);$('.boost_btn_txt').html('Boost');$('.boost_post_btn').attr("disabled", false);return false;} }
        });
    } else { toastr.error('hmm... You must be login!'); return false; }
});

$('.keys_gen_btn').click(function() {
    if (breeze_username) {$('.gen_btn_txt').attr("disabled", true).html('Generating...');
        $.ajax({url: '/keys',type: 'POST',data: JSON.stringify({ user: breeze_username}),contentType: 'application/json', success: function(data)  {
            if (data.error == true) {toastr['error'](data.message);$('.gen_btn_txt').attr("disabled", false).html('Generate New Keys');return false;
            } else {$('#gen_pub').val(data.pub);$('#gen_priv').val(data.priv);$(".modal-gen").show();toastr['success']("Keys generated Successfully!"); }}
        });
    } else { toastr.error('hmm... You must be login!'); return false; }
});

async function addToken() {
    try { const wasAdded = await ethereum.request({ method: 'wallet_watchAsset', params: {type: 'ERC20', options: { address: '0x6421282c7f14670d738f4651311c5a1286e46484', symbol: 'TMAC', decimals: 6, image: 'https://i.postimg.cc/PxLkqPdS/TMAC.png', }, }, });
      if (wasAdded) {console.log('Thanks for your interest!');} else {console.log('HelloWorld Coin has not been added');}
    } catch (error) { console.log(error);}
}
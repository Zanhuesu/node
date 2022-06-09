function getCookie(name) {var cookieArr = document.cookie.split(";");for(var i = 0; i < cookieArr.length; i++) {var cookiePair = cookieArr[i].split("="); if(name == cookiePair[0].trim()) {return decodeURIComponent(cookiePair[1]);} }
    return null;
}
!function(e){e(["jquery"],function(e){return function(){var t,n,s,o=0,i={error:"error",info:"info",success:"success",warning:"warning"},a={clear:function(n,s){var o=u();t||r(o);l(n,o,s)||function(n){for(var s=t.children(),o=s.length-1;o>=0;o--)l(e(s[o]),n)}(o)},remove:function(n){var s=u();t||r(s);if(n&&0===e(":focus",n).length)return void p(n);t.children().length&&t.remove()},error:function(e,t,n){return d({type:i.error,iconClass:u().iconClasses.error,message:e,optionsOverride:n,title:t})},getContainer:r,info:function(e,t,n){return d({type:i.info,iconClass:u().iconClasses.info,message:e,optionsOverride:n,title:t})},options:{},subscribe:function(e){n=e},success:function(e,t,n){return d({type:i.success,iconClass:u().iconClasses.success,message:e,optionsOverride:n,title:t})},version:"2.1.4",warning:function(e,t,n){return d({type:i.warning,iconClass:u().iconClasses.warning,message:e,optionsOverride:n,title:t})}};return a;function r(n,s){return n||(n=u()),(t=e("#"+n.containerId)).length?t:(s&&(t=function(n){return(t=e("<div/>").attr("id",n.containerId).addClass(n.positionClass)).appendTo(e(n.target)),t}(n)),t)}function l(t,n,s){var o=!(!s||!s.force)&&s.force;return!(!t||!o&&0!==e(":focus",t).length)&&(t[n.hideMethod]({duration:n.hideDuration,easing:n.hideEasing,complete:function(){p(t)}}),!0)}function c(e){n&&n(e)}function d(n){var i=u(),a=n.iconClass||i.iconClass;if(void 0!==n.optionsOverride&&(i=e.extend(i,n.optionsOverride),a=n.optionsOverride.iconClass||a),!function(e,t){if(e.preventDuplicates){if(t.message===s)return!0;s=t.message}return!1}(i,n)){o++,t=r(i,!0);var l=null,d=e("<div/>"),f=e("<div/>"),g=e("<div/>"),m=e("<div/>"),h=e(i.closeHtml),v={intervalId:null,hideEta:null,maxHideTime:null},C={toastId:o,state:"visible",startTime:new Date,options:i,map:n};return n.iconClass&&d.addClass(i.toastClass).addClass(a),function(){if(n.title){var e=n.title;i.escapeHtml&&(e=w(n.title)),f.append(e).addClass(i.titleClass),d.append(f)}}(),function(){if(n.message){var e=n.message;i.escapeHtml&&(e=w(n.message)),g.append(e).addClass(i.messageClass),d.append(g)}}(),i.closeButton&&(h.addClass(i.closeClass).attr("role","button"),d.prepend(h)),i.progressBar&&(m.addClass(i.progressClass),d.prepend(m)),i.rtl&&d.addClass("rtl"),i.newestOnTop?t.prepend(d):t.append(d),function(){var e="";switch(n.iconClass){case"toast-success":case"toast-info":e="polite";break;default:e="assertive"}d.attr("aria-live",e)}(),d.hide(),d[i.showMethod]({duration:i.showDuration,easing:i.showEasing,complete:i.onShown}),i.timeOut>0&&(l=setTimeout(T,i.timeOut),v.maxHideTime=parseFloat(i.timeOut),v.hideEta=(new Date).getTime()+v.maxHideTime,i.progressBar&&(v.intervalId=setInterval(D,10))),function(){i.closeOnHover&&d.hover(b,O);!i.onclick&&i.tapToDismiss&&d.click(T);i.closeButton&&h&&h.click(function(e){e.stopPropagation?e.stopPropagation():void 0!==e.cancelBubble&&!0!==e.cancelBubble&&(e.cancelBubble=!0),i.onCloseClick&&i.onCloseClick(e),T(!0)});i.onclick&&d.click(function(e){i.onclick(e),T()})}(),c(C),i.debug&&console&&console.log(C),d}function w(e){return null==e&&(e=""),e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function T(t){var n=t&&!1!==i.closeMethod?i.closeMethod:i.hideMethod,s=t&&!1!==i.closeDuration?i.closeDuration:i.hideDuration,o=t&&!1!==i.closeEasing?i.closeEasing:i.hideEasing;if(!e(":focus",d).length||t)return clearTimeout(v.intervalId),d[n]({duration:s,easing:o,complete:function(){p(d),clearTimeout(l),i.onHidden&&"hidden"!==C.state&&i.onHidden(),C.state="hidden",C.endTime=new Date,c(C)}})}function O(){(i.timeOut>0||i.extendedTimeOut>0)&&(l=setTimeout(T,i.extendedTimeOut),v.maxHideTime=parseFloat(i.extendedTimeOut),v.hideEta=(new Date).getTime()+v.maxHideTime)}function b(){clearTimeout(l),v.hideEta=0,d.stop(!0,!0)[i.showMethod]({duration:i.showDuration,easing:i.showEasing})}function D(){var e=(v.hideEta-(new Date).getTime())/v.maxHideTime*100;m.width(e+"%")}}function u(){return e.extend({},{tapToDismiss:!0,toastClass:"toast",containerId:"toast-container",debug:!1,showMethod:"fadeIn",showDuration:300,showEasing:"swing",onShown:void 0,hideMethod:"fadeOut",hideDuration:1e3,hideEasing:"swing",onHidden:void 0,closeMethod:!1,closeDuration:!1,closeEasing:!1,closeOnHover:!0,extendedTimeOut:1e3,iconClasses:{error:"toast-error",info:"toast-info",success:"toast-success",warning:"toast-warning"},iconClass:"toast-info",positionClass:"toast-top-right",timeOut:5e3,titleClass:"toast-title",messageClass:"toast-message",escapeHtml:!1,target:"body",closeHtml:'<button type="button">&times;</button>',closeClass:"toast-close-button",newestOnTop:!0,preventDuplicates:!1,progressBar:!1,progressClass:"toast-progress",rtl:!1},a.options)}function p(e){t||(t=r()),e.is(":visible")||(e.remove(),e=null,0===t.children().length&&(t.remove(),s=void 0))}}()})}("function"==typeof define&&define.amd?define:function(e,t){"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):window.toastr=t(window.jQuery)});
var breeze_username=getCookie("breeze_username");
$('.btn_follow_user').click(function() {
    if (breeze_username) {$this=$(this);var followName = $(this).attr("data-username");$this.html('Following...').attr("disabled", true);
        $.ajax({url: '/follow',type: 'POST',data: JSON.stringify({ followName: followName }),contentType: 'application/json',success: function(data)  {if (data.error == false) {$this.html('Following').attr("disabled", true);toastr['success']("Followed Successfully!");setTimeout(function(){window.location.reload();}, 300); } else {toastr['error'](data.message);$this.html('Follow').attr("disabled", false);return false} } });
    } else { toastr.error('hmm... You must be login!');$this.html('Follow').attr("disabled", false); return false; }
});

$('.btn_unfollow_user').click(function() {
    if (breeze_username) {let $this=$(this);var unfollowName = $(this).attr("data-username");$this.html('UNFollowing...').attr("disabled", true);
        $.ajax({url: '/unfollow',type: 'POST',data: JSON.stringify({ unfollowName: unfollowName }),contentType: 'application/json',success: function(data)  {if (data.error == false) {$this.html('Follow').attr("disabled", true);toastr['success']("UNFollowed Successfully!");setTimeout(function(){window.location.reload();}, 300); } else {toastr['error'](data.message);$this.html('Following').attr("disabled", false);return false} } });
    } else { toastr.error('hmm... You must be login!');$this.html('Following').attr("disabled", false);return false; }
});

$('.btn_follow_catg').click(function() {
    if (breeze_username) {let $this=$(this);var catgName = $(this).attr("data-catg");$(this).html('Following...').attr("disabled", true);
        $.ajax({url: '/followCatg',type: 'POST',data: JSON.stringify({ catgName: catgName }),contentType: 'application/json',success: function(data)  {if (data.error == false) {$this.html('Following').attr("disabled", true);;toastr['success']("Category Subscribed Successfully!");setTimeout(function(){window.location.reload();}, 300); } else {toastr['error'](data.message);$this.html('Follow').attr("disabled", false);return false} } });
    } else { toastr.error('hmm... You must be login!');$this.html('Follow').attr("disabled", false); return false; }
});

$('.btn_unfollow_catg').click(function() {
    if (breeze_username) {let $this=$(this);var catgName = $(this).attr("data-catg");$(this).html('UNFollowing...').attr("disabled", true);
        $.ajax({url: '/unfollowCatg',type: 'POST',data: JSON.stringify({ catgName: catgName }),contentType: 'application/json',success: function(data)  {if (data.error == false) {$this.html('Follow').attr("disabled", true);;toastr['success']("UNFollowed Successfully!");setTimeout(function(){window.location.reload();}, 300); } else {toastr['error'](data.message);$this.html('Following').attr("disabled", false);return false} } });
    } else { toastr.error('hmm... You must be login!');$this.html('Following').attr("disabled", false); return false; }
});

$(".back_btn").click(function (){window.history.back();});
$("#main_login_btn").click(function (){window.location.href = '/welcome';});
$(".stk_page").click(function (){window.open('https://tmac.finance/staking', '_blank')});
$(".farm_page").click(function (){window.open('https://tmac.finance/farming', '_blank')});
$('#logout_btn, #logout_btn_inn').click(function(){$.ajax({type: 'POST',data: JSON.stringify({}),contentType: 'application/json',url: '/logout',success: function(data) {if (data.error == false);toastr['success']("Logout Success");setTimeout(function(){window.location.href = '/';}, 300);} }); })

$('.login_btn').click(function() {
    $(".login_btn").attr('disabled', true);$('#login_txt').html('Login...');
    let login_user = $('#login_user_id').val();let login_pass = $('#login_pass').val();
    if (login_user=="") {toastr.error('phew.. Username should not be empty');$(".login_btn").attr("disabled", false);$('#login_txt').html('Login');return false;}
    if (login_pass=="") {toastr.error('phew... Private key should not be empty');$(".login_btn").attr("disabled", false);$('#login_txt').html('Login');return false;};const pivkey = login_pass;
    $.ajax({type: 'POST',data: JSON.stringify({ pivkey: pivkey,  username: login_user}),contentType: 'application/json',url: '/loginuser',            
        success: function(data) {if (data.error == true) {toastr['error'](data.message);$(".login_btn").attr("disabled", false);$('#login_txt').html('Login');return false;} else {toastr['success']("Login Success");setTimeout(function(){window.location.href = '/';}, 100);}}
    });
});

$('.register_btn').click(function() {$('.login_section').hide(); $('.signup_section').show();});
$('.loginNow_btn').click(function() {$('.signup_section').hide(); $('.login_section').show();});
$('.signin_btn, .n_signin_btn, .n_signup_btn').click(function() {window.location.href = '/welcome';});
function accountKeys() {$('.verify_section').hide(); $('.key_section').show();}
function verifyMsg() {$('.signup_section').hide(); $('.msg_section').show();}
$('.signup_btn').click(function() {let input_username = $('#user_name').val();let user_email = $('#email').val();let referrer = $('#refer_by').val();if (input_username=="") {toastr.error('phew.. Username should not be empty');return false;};if (user_email=="") {toastr.error('phew.. Email should not be empty');return false;}; $('.signup_txt').html('Processing...'); $('.signup_btn').attr("disabled", true); 
    $.ajax({type: 'POST',data: JSON.stringify({name: input_username, email: user_email, ref: referrer}),contentType: 'application/json',url: '/signup',            
        success: function(data) { 
            if (data.error == true) {toastr['error'](data.message);$('.signup_txt').html('Signup');$('.signup_btn').attr("disabled", false);return false; 
            } else {verifyMsg()} }
    })
});
$('.keygen_btn').click(function() {let username = $('.user_name').html();$('.keygen_txt').html('Processing...'); $('.keygen_btn').attr("disabled", true);
    $.ajax({type: 'POST',data: JSON.stringify({name: username}),contentType: 'application/json',url: '/keygen',            
        success: function(data) { if (data.error == true) {toastr['error'](data.message);$('.keygen_txt').html('Proceed');$('.keygen_btn').attr("disabled", false);return false; } else {toastr['success']("Account cteared Successfully!");accountKeys();$('#acct_priv_key').val(data.priv);} }
    })
});
$('.copy_pass').click(function() {var copyText = document.getElementById("acct_priv_key");copyText.select();copyText.setSelectionRange(0, 99999); /* For mobile devices */
    document.execCommand("copy");$('.copy_pass').html('Copied!');toastr['success']("Key copied to clipboard.");return false;
})
function isValidURL(url) {var RegExp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/; if (RegExp.test(url)) {return true;} else {toastr.error('phew... Enter a valid url');return false;} }
function getDomain(url) {let hostName = getHostName(url);let domain = hostName;if (hostName != null) {let parts = hostName.split('.').reverse();if (parts != null && parts.length > 1) {domain = parts[1] + '.' + parts[0];if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) { domain = parts[2] + '.' + domain;}}}else{return false;} return domain;}
function getHostName(url) {var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i); if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {return match[2];} else {toastr.error('phew... Enter a valid url');return false;}}
$('.Home-wrapper, .profile-wrapper').on("click", ".card-icon", function() {
    if (breeze_username) {var $this = $(this);var postLink = $this.attr("data-permlink");var postAuthor = $this.attr("data-author");$this.addClass('hov_ani');
        $.ajax({ type: "POST",url: "/upvote", data: {author: postAuthor, postLink: postLink}, success: function(data) {
            if (data.error == false) { console.log(data.income)
                $this.removeClass('hov_ani');$this.addClass('hov_done');
                $this.parent().find('.card-icon-value').css("color", "#e0245e").html(data.likes);
                if(data.income>0){postIncome=((data.income)/1000000).toString()}else{postIncome=0}
                $this.closest('.likes_section').find('.post-income').html(postIncome);
                toastr['success']("Upvoted Successfully!");
            } else { $this.removeClass('hov_ani');toastr['error'](data.message);return false}} });
    } else { toastr.error('hmm... You must be login!');$this.removeClass('hov_ani'); return false; }
});

$('.btn_app_wit').click(function() {
    if (breeze_username != null) {var nodeName = $(this).attr("data-node");$(this).closest("tr").find(".btn_txt_app").html('...');
        $.ajax({url: '/witup',type: 'POST',data: JSON.stringify({ nodeName: nodeName }),contentType: 'application/json', success: function(data)  {if (data.error == false) {toastr['success']("Approved Successfully!");setTimeout(function(){window.location.reload();}, 300);} else {toastr['error'](data.message);$(this).closest("tr").find(".btn_txt_app").html('Approve');return false}} });
    } else { toastr.error('hmm... You must be login!'); return false; }
});

$('.btn_unapp_wit').click(function() {
    if (breeze_username) {var nodeName = $(this).attr("data-node");$(this).closest("tr").find(".btn_txt_unapp").html('...');
        $.ajax({url: '/witunup',type: 'POST',data: JSON.stringify({ nodeName: nodeName }),contentType: 'application/json',success: function(data)  {if (data.error == false) {toastr['success']("UnApproved Successfully!");setTimeout(function(){window.location.reload();}, 300); } else {toastr['error'](data.message);$(this).closest("tr").find(".btn_txt_unapp").html('unapprove');return false} } });
    } else { toastr.error('hmm... You must be login!'); return false; }
});
const show_categories = () => {$('#explore_cat_trends').hide();$('#explore_trends').removeClass('activeTab'); $('#explore_cat_content').show();$('#explore_categories').addClass('activeTab'); }
const show_trends = () => {$('#explore_cat_content').hide();$('#explore_categories').removeClass('activeTab'); $('#explore_cat_trends').show();$('#explore_trends').addClass('activeTab');}
$('#explore_categories, #sidebar_categories').click(function() {show_categories();});
$('#explore_trends, sidebar_trends').click(function() {show_trends();});

$('#moremenu').click(function() { $('.more-menu-background').toggle();});
$('#uiModeChange').on('click', function(){ $('body').toggleClass('dark_mode'); })
let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.getElementById('uiModeChange');
const enableDarkMode = ()=>{ document.querySelector('body').classList.add('dark_mode'); localStorage.setItem('darkMode', 'enabled')}
const disableDarkMode = ()=>{ document.querySelector('body').classList.remove('dark_mode'); localStorage.setItem('darkMode',null) }
if(darkMode === 'enabled') {enableDarkMode();}
darkModeToggle.addEventListener('click', ()=> { darkMode = localStorage.getItem('darkMode'); if(darkMode !== 'enabled') { enableDarkMode(); } else { disableDarkMode() } })

$('#profile_likes').hide();
$('.likes_tab').on('click', function() { $('.likes_tab').addClass('activeTab'); $('.posts_tab').removeClass('activeTab'); $('#profile_posts').hide(); $('#profile_likes').show(); });
$('.posts_tab').on('click', function() {$('.posts_tab').addClass('activeTab'); $('.likes_tab').removeClass('activeTab'); $('#profile_likes').hide(); $('#profile_posts').show(); });
$('#profile_edit').click(function(e) {  e.preventDefault();$(".modal-profile").show();});
$(".modal-closeIcon-wrap").click(function(){$(".modal-profile").hide();});
$('.prof_edit_btn').click(function() { 
    if (breeze_username) {$this=$(this); $this.attr("disabled", true).html('updating...'); 
        let p_about=$('#profile_about').val();let p_website = $('#profile_website').val(); let p_location = $('#profile_location').val();let p_cover_img = $('#cover_img').val();let p_img = $('#profile_img').val(); 
        $.ajax({url: '/pupdate', type: 'post',contentType: 'application/json', data: JSON.stringify({ acc_about:p_about, acc_website:p_website, acc_location:p_location, acc_cover_img:p_cover_img, acc_img:p_img }), success: function(data) { 
            if (data.error == true) {toastr['error'](data.message);$this.attr("disabled", false).html('UPDATE');return false; 
            } else {$(".modal-profile").hide();toastr['success']("updated Successfully!");setTimeout(function(){window.location.reload();}, 300);} } 
        }); 
    } else { toastr.error('hmm... You must be login!'); return false; }
});
switch(nav_val){case"home":case"wallet":case"notic":case"feed":case"profile":case"reward":case"staking":case"mining":case"witnesses":case"explorer":case"help":var item;(item=document.getElementById(nav_val)).classList.add("active-Nav")}
$('.trans_tab').on('click', function() { $('.trans_tab').addClass('activeTab'); $('.keys_tab').removeClass('activeTab'); $('#keys_sec').hide(); $('#trans_sec').show(); });
$('.keys_tab').on('click', function() {$('.keys_tab').addClass('activeTab'); $('.trans_tab').removeClass('activeTab'); $('#trans_sec').hide(); $('#keys_sec').show(); });
let trimString = function (string, length) {return string.length > length ? string.substring(0, length) : string;};

let promoted_api='https://api.breezechain.org/promoted';
async function getapi(url) { const response = await fetch(url);const data = await response.json(); if(data.length>0) {let first = (data[0].promoted)/1000000;$('.min_boost').html('Bid more than ' + first + ' TOK to be on top')} else{$('.min_boost').html('Min bid is 0.1 TOK')}; }; getapi(promoted_api);

var index = 20;
var loading = false;
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() + 300 > $(document).height()){ 
        if(loading == true) return;
        var loader = document.getElementsByClassName('loader')[0];
        loader.classList.remove('loader-hidden');
        loading = true;
        $.ajax({url: '/', type: 'GET', data: { index: index },contentType: 'application/json',
            success: function(data) {
                loader.classList.add('loader-hidden'); index +=20;
                let homeWrapper = document.getElementsByClassName("Home-wrapper")[0];
                if(homeWrapper === null || homeWrapper === undefined)
                    return;
                data.articles.forEach(function(article) { //console.log('Article=>',article);
                    let tags = article.json.tags; let metatags = tags.map(s => '<a href="/tags/'+s+'">#'+s+'</a>').join(' ');  let catg = article.json.category;let category = catg.charAt(0).toUpperCase() + catg.slice(1);
                    if(article.json && article.json.type){var hashregex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;var content=article.json.body;var ptags = content.match(hashregex);if(ptags){for(var i = 0, l = ptags.length; i < l; i++ ){content=content.replace(ptags[i], '<a style="color:rgb(0 43 255)" href="/tags/'+ptags[i].replace(/#/g, '').toLowerCase()+'">'+ptags[i]+'</a>');};}
                        if(article.json.type==3){postBody = '<div class="post-content" data-permlink="'+article.link+'" data-author="'+article.author+'"><p>'+content+'</p></div>';
                        }else if(article.json.type==2){postBody = '<div class="post-content" data-permlink="'+article.link+'" data-author="'+article.author+'">'+content+'</p></div><div class="card-content-images"><a href="/post/'+article.author+'/'+article.link+'"><div class="card-image-link"><img alt="'+article.link+'" src="'+article.json.image+'" /></div></a></div>';
                        }else if(article.json.type==1){postBody = '<div class="card-content-info card_home_title"><a href="/post/'+article.author+'/'+article.link+'">'+article.json.title+'</a></div><div class="card-content-info card_home_tags">'+metatags.toString()+'</div><div class="card-content-images"><a href="/post/'+article.author+'/'+article.link+'"><div class="card-image-link"><iframe width="100%" height="auto" style="border: none;border-radius: 14px;min-height: 255px;" src="https://youtube.com/embed/'+article.json.videoid+'?mute=1"></iframe></div></a></div>';
                        }else if(article.json.type==0){postBody = '<div class="card-content-info card_home_title"><a href="/post/'+article.author+'/'+article.link+'">'+article.json.title+'</a></div><div class="card-content-info card_home_tags">'+metatags.toString()+'</div><div class="card-content-images"><a href="/post/'+article.author+'/'+article.link+'"><div class="card-image-link"><img alt="'+article.link+'" src="'+article.json.image+'" /></div></a></div>';
                        }
                    }else{postBody = '<div class="card-content-info card_home_title"><a href="/post/'+article.author+'/'+article.link+'">'+article.json.title+'</a></div><div class="card-content-info card_home_tags">'+metatags.toString()+'</div><div class="card-content-images"><a href="/post/'+article.author+'/'+article.link+'"><div class="card-image-link"><img alt="'+article.link+'" src="'+article.json.image+'" /></div></a></div>';
                    }
                    var profileAvatar = article.user ? `<img alt='${article.author}' width='100%' height='49px' src='${article.user.profile.avatar}' class='home_pro_pic' /></a></div>` 
                        : `<img alt='${article.author}' width='100%' height='49px' src='/images/user.png' class='home_pro_pic' /></a></div>`;
                    let upvotes = JSON.stringify(article.votes);
                    if(article.likes){postIncome=((article.dist)/1000000).toString()}else{postIncome=0}
                    var upvotes1 = data.loguser && upvotes.includes(data.loguser) ? `<div class='hov_up'></div><div class='likes-value'>${article.likes}</div></div><div class='card-button-wrap'><span class="post-income">${postIncome}</span> TMAC</div>` :
                        `<div class='card-icon' data-permlink='${article.link}' data-author='${article.author}'><svg x='0px' y='0px' viewBox='0 0 117.57 122.88'><g><path d='M113.6,74.1c-0.77-1.4-1.91-2.47-3.22-3.18l1.88-1.03c1.92-1.06,3.23-2.8,3.8-4.75c0.57-1.96,0.39-4.13-0.66-6.05 c0,0,0-0.01,0-0.01c-0.78-1.42-1.99-2.57-3.44-3.28l1.51-0.83c1.92-1.06,3.23-2.8,3.8-4.75c0.57-1.96,0.39-4.13-0.66-6.05 c-1.05-1.92-2.8-3.23-4.75-3.79c-1.96-0.57-4.13-0.39-6.05,0.66l-1.54,0.85c0.15-1.53-0.15-3.12-0.94-4.57 c-1.05-1.92-2.8-3.23-4.75-3.8c-1.96-0.57-4.13-0.39-6.05,0.66l-7.92,4.36c-0.85-1.86-2.32-3.45-4.3-4.41c0,0-0.01,0-0.01,0 c-1.68-0.81-3.56-1.09-5.4-0.8l0.87-1.78c1.1-2.26,1.18-4.76,0.41-6.97c-0.76-2.21-2.37-4.13-4.63-5.23 c-2.26-1.1-4.76-1.18-6.97-0.41c-2.21,0.76-4.13,2.37-5.23,4.62l-0.88,1.81c-0.88-1.53-2.21-2.83-3.91-3.66 c-2.26-1.1-4.76-1.18-6.97-0.41c-2.21,0.76-4.13,2.37-5.23,4.63L23.36,64.92c-0.43,0.63-0.82,1.29-1.16,1.98l0,0l-1.12,2.29 l-0.11-0.29c-0.77-2.01-1.47-4.07-1.74-4.84c-1.79-5.21-5.2-7.79-8.65-8.29c-1.56-0.23-3.1-0.03-4.51,0.53 c-1.41,0.56-2.68,1.49-3.7,2.73c-2.41,2.93-3.37,7.63-1.04,13.32l0.03,0.1l0,0l0.01,0.02c2.47,7.27,8.27,29.5,14.65,36.5 c7.89,8.66,28.31,16.78,39.3,12.91c6.06-2.13,11.32-6.59,14.36-12.83l1.13-2.32c13.22-7.27,26.43-14.55,39.66-21.83 c1.92-1.05,3.23-2.8,3.79-4.75C114.83,78.2,114.66,76.02,113.6,74.1L113.6,74.1L113.6,74.1z M85.43,42.19 c2.93-1.6,5.88-3.21,8.83-4.84c1.04-0.57,2.23-0.67,3.3-0.36c1.07,0.31,2.02,1.02,2.59,2.07c0.57,1.04,0.67,2.23,0.36,3.3 c-0.31,1.07-1.02,2.02-2.07,2.59l-8.98,4.94c-0.29-0.18-0.58-0.35-0.9-0.5l0,0c-1.65-0.8-3.43-1.06-5.13-0.84l1.08-2.21 C85.16,45,85.45,43.58,85.43,42.19L85.43,42.19z M92.22,52.64l15.32-8.43c1.04-0.57,2.23-0.67,3.3-0.36 c1.07,0.31,2.02,1.02,2.59,2.07c0.57,1.04,0.67,2.23,0.36,3.3c-0.31,1.07-1.02,2.02-2.07,2.59L92.35,62.46l0.42-0.87 c1.1-2.26,1.18-4.76,0.41-6.97C92.95,53.93,92.62,53.26,92.22,52.64L92.22,52.64z M89.45,68.42l16.88-9.29 c1.04-0.57,2.23-0.67,3.3-0.36c1.07,0.31,2.02,1.02,2.59,2.07c0.57,1.04,0.67,2.23,0.36,3.3c-0.31,1.07-1.02,2.02-2.07,2.59 L87.73,79.26l1.74,3.17l15.07-8.29c1.04-0.57,2.23-0.67,3.3-0.36c1.07,0.31,2.02,1.02,2.59,2.07c0.57,1.04,0.67,2.23,0.36,3.3 c-0.31,1.07-1.02,2.02-2.07,2.59C97,88.19,85.28,94.64,73.56,101.09L89.45,68.42L89.45,68.42z M65.95,107.24 c-2.55,5.23-6.94,8.97-12.01,10.75c-9.36,3.3-28.17-4.45-34.87-11.8C13.38,99.95,7.11,76.52,5.29,71.15 c-0.02-0.09-0.06-0.19-0.09-0.28l-1.92,0.79l1.91-0.79c-1.7-4.1-1.16-7.32,0.4-9.21c0.57-0.69,1.26-1.2,2.02-1.5 c0.76-0.3,1.57-0.41,2.38-0.29c2.04,0.3,4.12,2.01,5.34,5.54c0.28,0.81,1.02,2.96,1.79,4.97c0.72,1.89,1.51,3.75,2.16,4.69 c0.2,0.35,0.51,0.63,0.88,0.81c0,0,0,0,0,0l1.83,0l4.02-7.14C32.68,55,39.36,41.52,46.08,27.73c0.6-1.23,1.65-2.1,2.86-2.52 c1.21-0.42,2.57-0.38,3.8,0.22c1.23,0.6,2.1,1.65,2.52,2.85c0.42,1.21,0.38,2.57-0.22,3.8L42.01,58.85l3.86,1.88l17.21-35.36 c0.6-1.23,1.65-2.1,2.85-2.52c1.21-0.42,2.57-0.38,3.8,0.22c1.23,0.6,2.1,1.65,2.52,2.86c0.42,1.21,0.38,2.57-0.22,3.8L54.82,65.09 l3.94,1.92l13.07-26.85c0.6-1.23,1.65-2.1,2.86-2.52c1.21-0.42,2.57-0.38,3.8,0.22c1.23,0.6,2.1,1.65,2.52,2.86 c0.42,1.21,0.38,2.57-0.22,3.8L67.71,71.36l3.73,1.82l8.64-17.76c0.6-1.23,1.64-2.1,2.85-2.52c1.21-0.42,2.57-0.38,3.8,0.22 c1.23,0.6,2.1,1.65,2.52,2.86c0.41,1.21,0.38,2.57-0.22,3.8C81.34,75.6,73.65,91.42,65.95,107.24L65.95,107.24z M82.16,14.53 c-0.01,1.36-1.12,2.46-2.48,2.44c-1.36-0.01-2.46-1.12-2.44-2.48L77.3,2.58c0.01-1.36,1.12-2.46,2.48-2.44 c1.36,0.01,2.46,1.12,2.44,2.48L82.16,14.53L82.16,14.53z M95.14,14.37c-0.54,1.25-2,1.82-3.25,1.28c-1.25-0.54-1.82-2-1.28-3.25 l4.78-10.91c0.54-1.25,2-1.82,3.25-1.28c1.25,0.54,1.82,2,1.28,3.25L95.14,14.37L95.14,14.37z M100,26.05 c-1.11,0.79-2.65,0.54-3.44-0.57c-0.79-1.11-0.54-2.65,0.57-3.44l10.99-7.88c1.11-0.79,2.65-0.54,3.44,0.57 c0.79,1.11,0.54,2.65-0.57,3.44L100,26.05L100,26.05z'/></g></svg></div><div class='card-icon-value'>${article.likes}</div></div><div class='card-button-wrap'>${postIncome} TMAC</div>`;
                    homeWrapper.innerHTML += `<div class='inner-card-wrapper'>
                        <div class='card-userPic-wrapper'><a href='/profile/${article.author}'>${profileAvatar}  
                        <div class='card-content-wrapper'>
                            <div class='card-content-header'><div class='card-header-detail'>
                                <span class='card-header-username'><a href='/profile/${article.author}'>@<b>${article.author}</b></a></span> 
                                <span><small> in</small><a href='/category/${(article.json.category).toLowerCase()}' class='card_home_cat'> ${category}</a></span>
                                <span class='card-header-dot'>·</span>
                                <span class='card-header-date'>${article.ago}</span>
                            </div></div>
                            ${postBody}
                            <div class='card-buttons-wrapper likes_section'><div class='card-button-wrap'>${upvotes1}</div></div>
                        </div>`;
                }); loading = false;
            }, error: function(err) { loader.classList.add('loader-hidden'); loading = false;}
        });
    }
 });
$('.post-content').on("click", function() {var postLink = $(this).attr("data-permlink");var postAuthor = $(this).attr("data-author"); window.location.href = '/post/'+postAuthor+'/'+postLink })
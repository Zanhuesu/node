$(".post_link").click(function(e){e.preventDefault();$('.share_options, .editor_section').hide();$('.share_link').show();$('.share_sec_title').html('Share Web Links')});
$(".post_video").click(function(e){e.preventDefault();$('.share_options, .editor_section').hide();$('.share_link').show();$('.share_sec_title').html('Share YouTube Videos')});
var hashregex = /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;
$('.add_post').click(function() {
  if (breeze_username) {let formData = new FormData();
    $('.add_post_txt').html('Posting...');$(".add_post").attr("disabled", true);
    var content=tinymce.activeEditor.getContent().replace(/((<p>[(&nbsp;)|\s]*<\/p>)\s*[^([\w^(<p>(&nbsp;)*</p>))])+/g,"<p></p>\n").replace(/(^\s*((<p>[(&nbsp;)|\s]*<\/p>)\s*)*)|(\s*((<p>[(&nbsp;)|\s]*<\/p>)\s*)*$)/g,"");
    if(($.trim(content).length) < 60){toastr['error']("Minimum text 60 characters!");$('.add_post_txt').html('Post');$(".add_post").attr("disabled", false);return false}
    var hashregex= /(^|\B)#(?![0-9_]+\b)([a-zA-Z0-9_]{1,30})(\b|\r)/g;var tags=content.match(hashregex);
    if(!tags || tags.length<2){toastr['error']("Add atleast 2 tags");$('.add_post_txt').html('Post');$(".add_post").attr("disabled", false); return false}
    if(tags){var metatags = (tags.map(s => s.slice(1))).join(' ');metatags=metatags.toLowerCase();formData.append('tags', metatags);};formData.append('description', content);
    if($("#fileInput")[0].files.length > 0){formData.append("type", '2');var filename =$('#filename').val();formData.append("file", $('#fileInput')[0].files[0]);formData.append('filename', filename);
    }else{formData.append("type", '3');} 
    $.ajax({url: '/postlinks',type: 'POST',contentType: false,processData: false,data: formData,
      success: function(data)  {
        if (data.error == false) {$('.add_post_txt').html('Posting...');$(".add_post").attr("disabled", true);toastr['success']("Published Successfully!");setTimeout(function(){window.location.href = '/post/'+breeze_username+'/'+data.link;}, 200); 
        } else {toastr['error'](data.message);$('.add_post_txt').html('Post');$(".add_post").attr("disabled", false);return false;
        } 
      } 
    });
  } else { toastr.error('hmm... You must be login!'); return false; }
});

$('.share_me').click(function() {$('#share_plus').html('Sharing...');$(".share_me").attr("disabled",true);
  if (breeze_username) {let input_url = $("#url_field").val(); if (!input_url){ $("#url_field").css("border-color", "RED");toastr.error('phew... You forgot to enter URL');$('#share_plus').html('Share');$(".share_me").attr("disabled", false);return false;}
      $.ajax({url: '/sharelinks',type: 'POST',data: JSON.stringify({ url: input_url }),contentType: 'application/json',
          success: function(data)  {
              if (data.error == true) {toastr['error'](data.message);$('#share_plus').html('Share');$(".share_me").attr("disabled", false);return false; 
              } else {meta=data.meta;$('.share_link').hide();$('.edit_psot').show();$('.data-title').html(meta.title);$(".link_image").attr("src", meta.image);$('#domain_name').html(data.link);$('#post_desc').html(trimString(meta.description,120));$('.url_link').val(input_url);$('.url_type').val(data.type) }
          }
      });
  } else { toastr.error('hmm... You must be login!');$('#share_plus').html('Share');$(".share_me").attr("disabled", false); return false; }
});

$('.share_new_post').click(function(e) {
  if (breeze_username) {e.preventDefault();let urlInput = $('.url_link').val();let urlType = $('.url_type').val();
    if($('#share_cat').val() == "0") {$('#share_cat').css("border-color", "RED");toastr.error('Select an appropriate Category');return false;}
    let inputtags = $.trim($('.share_tags').val()).toLowerCase();var tags = inputtags.match(hashregex);
    if(!tags || tags.length<2){$('.share_tags').css("border-color", "red");toastr['error']("Add minimum 2 tags with hash sign");return  false;}var metatags = (tags.map(s => s.slice(1))).join(' ');
    let title = $('.data-title').html();let description = $('textarea#post_desc').val();
    let psotBody = description.replace(/[\u2018\u2019]/g, "'").replace(/[\u201C\u201D]/g, '"');let post_body=$.trim(psotBody.split('<p></p>').join(''));
    let urlImage =  $('.post_img img').attr('src');
    let category = ($( "#share_cat" ).val()).toLowerCase();
    $(".share_new_post").attr("disabled", true);$('.edit_post_txt').html('Sharing...');
    $.ajax({type: "POST",url: "/postlinks",data: {title: title,tags:metatags,description:post_body,category: category,image:urlImage,exturl:urlInput,type:urlType},
        success: function(data) {if (data.error == false) {toastr['success']("Link Shared Successfully!");setTimeout(function(){window.location.href = '/post/'+breeze_username+'/'+data.link;}, 200); } else {toastr['error'](data.message);$(".share_new_post").attr("disabled", false);$('.edit_post_txt').html('Publish');return false} }
    });
  } else { toastr.error('hmm... You must be login!'); return false; }
})

function chooseFile() { $("#fileInput").click(); }
$('#fileInput').change(function(){
  var file = this.files[0];
  if(file.type != "image/png" && file.type != "image/jpeg" && file.type != "image/gif")
  { alert("Please choose png, jpeg or gif files");
    return false;
  }
  var reader = new FileReader();
  reader.onload = function(e) { $('#postImg').attr('src', e.target.result); }
  reader.readAsDataURL(file);
});

tinymce.init({
  selector: "#editor-container",
  inline: true,
  menubar: false,
  plugins: "emoticons quickbars autolink paste",
  toolbar: "emoticons",
  default_link_target: '_blank',
  ink_default_protocol: 'https',
  quickbars_selection_toolbar: "bold italic strikethrough blockquote",
  quickbars_insert_toolbar: false,
  placeholder: "What's Up...",
  theme_advanced_toolbar_align : "right",
  paste_as_text: true,
  forced_root_blocks : false
});
$(document).ready(function()
    {
  
        $('#nav').affix({
            });
  
        var self = this;

        //        $('a.show_zoom').fancybox();
        //        $('a.zoom').fancybox();

        $('[id^="Carousel-"]').carousel();
        
        $(".dropdown-menu form").on("click",function(e){
            e.stopPropagation();
        });
        
        $(".hover-item").hover(
            function () {
                $(this).find('.teaser.views').addClass('hidden');
                $(this).find('.detailed').removeClass('hidden');
            },
            function () {
                $(this).find('.teaser.views').removeClass('hidden');
                $(this).find('.detailed').addClass('hidden')
            }
        );
        
        $("body").on("click", ".ajax-paging", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
            var $loader = $("<div class='loading'></div>");
            
            $target.blur();
            $("#ajax-content").html($loader);
            $("#ajax-content").load(url);
    
            return false;
        });
        
        $("body").on("click", ".clicker", function(event){
            var $target = $(this);
            var url = $target.attr( "data-url" );
            var $loader = $("<div class='loading'></div>");
            var partial = $target.attr( "data-object" );
            
            console.log(partial);
            
            $target.blur();
            
            $(partial).html($loader);
            $(partial).load(url);
            $target.remove();
    
            return false;
        });
  
        $(document).ajaxError(function(e, xhr, settings){
            
            if (xhr.status == "403") // Forbidden, invalid user
            {   
                var $window = popup_open(xhr.responseText);
                $window.find("input[type='submit']").click(function(event){
                    postForm($window);
                    return false;
                });
            }
      
        })
  
        $(window).scroll(function () { 
            if ($(window).scrollTop() >= $(document).height() - $(window).height() - 250) {
                $("div.auto_expand_items a").click();
            }
        });

  
        $(document).on("click", "#search_box a", function(event){
            var $target = $(this);
            var rel = $target.attr( "rel" );
            var url = $target.attr( "href" );
    
            $("#search_box").find("a").removeClass("active");
            $("#search_box").find("a[rel='"+rel+"']").addClass("active");
    
            jQuery.get(url, function(data){
                $("#search_results > div").remove();
                $("#search_results").html(data);
            });
   
            return false;
        });
  
        $(document).on("click", "#search_results div.more_items a", function(event){
            var $target = $(this);
            var rel = $target.attr( "rel" );
            var url = $target.attr( "href" );
            var page = $target.parent().attr( "rel" );
    
            $("#search_box").find("a").removeClass("active");
            $("#search_box").find("a[rel='"+rel+"']").addClass("active");
    
            var $div = $target.parent();
            var $loader = $("<div class='loading'></div>");

            $div.css("background", "white");
            $div.css("padding", "2px");
            $div.html($loader);
    
            jQuery.get(url, function(data){
                $("#search_results div.more_items").remove();
        
                if (page == 1) {
                    $("#search_results > div").remove();
                    $("#search_results").html(data);
                } else{
                    $("#search_results").append(data);
                }
        
            });
      
            return false;
        });

        $(document).on("mouseover", "span.user a, div.user, a.user, a.usertext", function(event){
            var $target = $(this);
            var $span = $target.parent();
            var url = $target.attr( "href" );
            var id = $target.attr( "id" );
            var rel = $span.attr( "rel" );
            //var position = $target.position();

    
            if (rel) {
                this.timeoutID = window.setTimeout(function(){
                    if(typeof self.userinfo == "object") {
                        $(self.userinfo).remove();
                        delete self.userinfo;
                    }

                    self.userinfo = $( "<div class='popover top info user' style='min-width:290px; margin-left:-145px; color:#000; position: absolute; display: none; top: 0px; left: -2px'></div>").appendTo($span);


                    $(self.userinfo).load(rel, function(){
                        var height = $(self.userinfo).outerHeight();
                        $(self.userinfo).css('top', -(height+8)+"px");
                        $(self.userinfo).fadeIn();
                    });
                }, 500);
            }
        });


        $(document).on("mouseout", "span.user a, div.user, a.user, a.usertext", function(event){

            if(typeof this.timeoutID == "number") {
                window.clearTimeout(this.timeoutID);
                delete this.timeoutID;
            }

            self.mouseoutID = window.setTimeout(function(){
                if(typeof self.userinfo == "object") {
                    $(self.userinfo).remove();
                    delete self.userinfo;
                }
            },0);
        });

        $(document).on("click", "div.icon a", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
            var id = $target.attr( "id" );
            var value = id.slice(5);

            $("div.icon").find("img.user").removeClass('active');

            $target.blur();
            $target.find("img.user").addClass('active');

            $("div.icon").next().val(value);
        });

        $(document).on("click", "#messages img.close", function(event){
            var $target = $(this);
            $target.parent().fadeOut();
        });

        $(document).on("click", "#comment_list img.close", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            if (confirm(title+'?'))
            {
                jQuery.getJSON(url, function(data){
                    $target.parent().fadeOut();
                });
            }
    
        });

        $(document).on("click", "#photodetail_content a.add_picture_link, a.add_picture_link", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            var $div = $('#photodetail_content div.big-image');
            $div.addClass("mark");
            $target.css("color", "#ffd800");

            $target.blur();
    
            jQuery.get(url, function(data){
                $('#linked_users').prepend(data);
            });
            $div.removeClass("mark");
            $target.css("color", "#ffffff");
        });
        
        
        $(document).on("click", "#photodetail_content a.add_picture_marker", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );
    
            var $img = $('#photodetail_content div.big-image img');
            var $div = $('#photodetail_content div.big-image');

            $target.blur();
    
            if (!self.bind)
            {
                $img.css("cursor", "crosshair");
                $target.css("color", "#ffd800");
                $div.addClass("mark");

                var offset_img = $img.offset();
                var offset_a = $img.parent().offset()
                var diff_left = offset_img.left - offset_a.left;

                jQuery.post(url, function(data){
                    jQuery.each(data, function(index, value){
                        var $marker = addMarker($div, $img, Math.floor(value.x), Math.floor(value.y), Math.floor(diff_left), value.user_id);
                        $marker.addClass('marked');
                    });
                }, 'json');
      
                $img.bind({
                    click: function(event) {
                        $img.parent().blur();
          
                        var dim_y = Math.round(event.pageY - offset_img.top);
                        var dim_x = Math.round(event.pageX - offset_img.left);

                        //alert('The mouse cursor is at (X:' + event.pageX + ', Y:' + event.pageY + ') - (Left:' + dim_x + ', Top:' + dim_y + ')');

                        addMarkerList($div, $img, url, dim_x, dim_y, Math.floor(diff_left));

                        return false;
                    }
                });
                self.bind = true;
            } else {
                unbind();
            }

            function unbind()
            {
                $div.find('div.marker').remove();
                $div.removeClass("mark");
                $img.css("cursor", "inherit");
                $target.css("color", "#ffffff");
                $img.unbind();
                self.bind = false;
            }

            function markUser($list){
                $list.find("button").cick(function(){
                    alert("click");
                });
            }

            $div.on("click", "img.close", function(event){
                unbind();
            });

        });

        function addMarkerList($div, $img, url, dim_x, dim_y, diff_left){

            $div.find('div:not(.marked)').remove();

            var $marker = addMarker($div, $img, dim_x, dim_y, diff_left, 0);

            var $list = $('<div class="list" style="display: none;"></div>');
            $div.append($list);

            var dim = calcPosition(dim_y, dim_x, $marker, $img);

            $list.css('top', dim.y - dim.h);
            $list.css('left', dim.x + dim.w + diff_left);

            $list.load(url, function(){
                $(this).find("button").click(function(){
                    //
                    var $button = $(this);
                    var button_url = $button.attr( "rel" );
                    var button_id = $button.attr( "id" );

                    jQuery.post(button_url, {
                        x:dim.x, 
                        y:dim.y
                    }, function(data){
                        $('#marked_users').prepend(data);
                        $marker.addClass('marked');
                        $marker.attr( "id", "marker_"+button_id);
                        $list.fadeOut();
                    });
                });

                $(this).fadeIn();
            });

        }

        function addMarker($div, $img, dim_x, dim_y, diff_left, user_id){

            var $marker = $('<div class="marker" style="display: none;" id="marker_item_'+user_id+'"></div>');
            $div.append($marker);

            var dim = calcPosition(dim_y, dim_x, $marker, $img);
    
            $marker.css('top', dim.y - dim.h);
            $marker.css('left', dim.x - dim.w + diff_left);
            $marker.fadeIn();

            return $marker;
        }

        function calcPosition(dim_y, dim_x, $marker, $img){
            var height = $img.innerHeight();
            var width = $img.innerWidth();

            var m_h = $marker.outerHeight() / 2;
            var m_w = $marker.outerWidth() / 2;

            if (dim_y - m_h < 0)
                dim_y = m_h;
            else if (dim_y + m_h > height)
                dim_y = height - m_h;

            if (dim_x - m_w < 0)
                dim_x = m_w;
            else if (dim_x + m_w > width)
                dim_x = width - m_w;

            return {
                x: dim_x, 
                y: dim_y, 
                h: m_h, 
                w: m_w
            };
        }

        $(document).on("mouseover", "#marked_users div.user", function(event){
            var $target = $(this);
            var id = $target.attr( "id" );
            var dim = id.split(",");
    
            var $img = $('#photodetail_content div.big-image img');
            var $div = $('#photodetail_content div.big-image');

            var offset_img = $img.offset();
            var offset_a = $img.parent().offset()
            var diff_left = offset_img.left - offset_a.left;
    
            var $marker = addMarker($div, $img, Math.floor(dim[0]), Math.floor(dim[1]), Math.floor(diff_left), 'show');
        });

        $(document).on("mouseout", "#marked_users div.user", function(event){
            $div = $('#photodetail_content div.big-image');
            $div.find("#marker_item_show").remove();
        });

        $(document).on("click", "#linked_users img.close, #marked_users img.close", function(event){            
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );
            
            $div = $('#photodetail_content div.big-image');
            
            if (confirm(title+'?'))
            {
                jQuery.getJSON(url, function(data){
                    if (data && data.user_id){
                        $div.find("#marker_item_"+data.user_id).remove();
                    }
                });
                
                $target.parent().remove();
            }

        });

        $(document).on("click", "#user_favorites img.close", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            if (confirm(title+'?'))
            {
                jQuery.getJSON(url, function(data){
                    $target.parent().remove();
                });
            }

        });

        // Like Button

        $(document).on("click", ".button_like_event", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );

            jQuery.get(url, function(data){
                $target.next().html(data);
                $target.fadeOut();
            });
      
            return false;

        });
  
        // Invite Friends // Report User + Picture // Send Link =>> Show Popup Form
  
        $(document).on("click", "a.invite_friends, a.send_report, a.send_link", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
    
            jQuery.get(url, function(data){
                var $window = popup_open(data);
                $window.find("input[type='submit']").click(function(event){
                    postForm($window);
                    return false;
                });
            });
    
            return false;
    
        });
  
  
        // Download Image
        $(document).on("click", "a.download_image", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
    
            if (url)
            {
                jQuery.get(url, function(data){

                    });

                return false;
            }
    
        });

        $(document).on("click", "ul#login_nav li.profile div ul li.friends a, ul#login_nav li.profile div ul li.inbox a", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
            var title = $target.attr( "title" );

            $target.blur();

            $('ul#login_nav li.profile').find("#show_box").remove();

            if ($target.hasClass("active")){
                $("ul#login_nav li.profile div ul li.friends a, ul#login_nav li.profile div ul li.inbox a").removeClass("active");
            } else  {
                $("ul#login_nav li.profile div ul li.friends a, ul#login_nav li.profile div ul li.inbox a").removeClass("active");

                jQuery.getJSON(url, function(data){
                    $target.addClass("active");
                    $target.html(""+data.num_items);
                    var $box = $("<div style='display: none' class='login_box' id='show_box'>"+data.content+"</div>");
                    $('ul#login_nav li.profile').append($box);
                    $box.fadeIn();
                    $target.parent().removeClass("new");
                });
            }
            return false;
        });
  
        // Friend Add Button
        $(document).on("click", "button.button_add_friend", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            jQuery.getJSON(url, function(data){
                $target.fadeOut();
            });
      
            return false;
        });

        // Friend Request Button
        $(document).on("click", "ul.list button.button_friend_accept", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            jQuery.getJSON(url, function(data){
        
                $("ul#login_nav li.profile div ul li.friends a").html(""+data.num_requests);
        
                if (data.accepted){
                    $target.parent().removeClass('unread');
                    $target.parent().html(""+data.accepted);
                } else{
                    $target.parent().fadeOut();
                }

                if (data.num_requests == 0)
                    $("ul#login_nav li.profile div ul li.friends a, ul#login_nav li.profile div ul li.inbox a").removeClass("active");
                $('ul#login_nav li.profile').find("#show_box").remove();
            });

        });
  
        // Contest Request Button
        $(document).on("click", "button.button_contest_request", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            jQuery.get(url, function(data){
                if (data == "")
                    $target.fadeOut();
                else
                    $target.parent().html(data);
            });

        });

        $(document).on("mouseover", "ul.button_list li", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            if (url)
                $(this).addClass('active');
        });

        $(document).on("mouseout", "ul.button_list li", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            if (url)
                $(this).removeClass('active');
        });

        $(document).on("click", "ul.button_list li", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            if (url)
            {
                $('ul#login_nav li.profile').find("#show_box").remove();
                $("ul#login_nav li.profile div ul li.friends a, ul#login_nav li.profile div ul li.inbox a").removeClass("active");
                jQuery.get(url, function(data){
                    var $window = popup_open(data);
                    $window.find("input[type='submit']").click(function(event){
                        postForm($window);
                        return false;
                    });
                });
            }
        });

        $(document).on("click", "button.button_new_message, button.button_suggest_friends", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            jQuery.get(url, function(data){
                var $window = popup_open(data);
                $window.find("input[type='submit']").click(function(event){
                    postForm($window);
                    return false;
                });
            });

            return false;
        });
  
        $(document).on("click", "ul.message_list p > a, a.button_new_message", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
            var title = $target.attr( "title" );

            jQuery.get(url, function(data){
                var $window = popup_open(data);
                $window.find("input[type='submit']").click(function(event){
                    postForm($window);
                    return false;
                });
            });

            return false;
        });
  
        // User select
  
        $(document).on("click", "div.select_user a", function(event){
            var $target = $(this);
            var user_id = $target.attr( "rel" );
            var title = $target.attr( "title" );
            var $input = $target.parents("li").find("input");
            var value = $input.val();
            var values = new Array();
      
            if (value)
                values = value.split(",");
      
            if (jQuery.inArray(user_id, values) != "-1")
            {
                values.splice(values.indexOf(user_id), 1);
                $target.find("img").removeClass("active");
            }
            else
            {
                values.push(user_id);
                $target.find("img").addClass("active");
            }
            $input.val(values.join(","));
            return false;
        });

        // Form Show / Hide
        $(document).on("click", "fieldset legend", function(event){   
            $(this).parent().find("form").toggle();
        });
  
        function popup_open(data, title){
            var $window = $('<div id="modal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+data+'</div>');
            var $close = $('<div class="close"></div>');
            var $h5 = $('<h4>'+title+'</h4>');

            $('body').append($window);
//            $window.append($close);
//
//            if (title)
//                $window.prepend($h5);
//
//            var height = $bg.innerHeight() / 2;
//            var width = $bg.innerWidth() / 2;
//
//            var m_h = $window.outerHeight() / 2;
//            var m_w = $window.outerWidth() / 2;

            //alert("height "+height+" m_h "+m_h);

//            $window.css("top", Math.floor(height - m_h));
//            $window.css("left", Math.floor(width - m_w));

            $window.modal();

//            $("#popup_window div.close, #popup_window input.cancel").live("click", function(event){
//                popup_close($window);
//            });

            return $window;
        }

        $(document).on("focus", "div.status input",  function(event){
            var $target = $(this);
            $target.addClass("active");
            self.status = $target.val();
            $target.val("");
        });
  
        $(document).on("blur", "div.status input", function(event){
            var $target = $(this);
            $target.removeClass("active");
            $target.val(self.status);
        });

        $(document).on("submit", "div.status form", function(event){
            var $target = $(this);
            var $input = $target.find("input");

            jQuery.post($target.attr('action'), $target.serialize(), function(data){
                self.status = $input.val();
                $input.blur();
        
                var $data = $(data);
                $data.css("display", "none");
                $('#tabbar_content div.feed ul').prepend($data);
                $data.delay(500).fadeIn(1000);
        
            });
            return false;
        });

        $(document).on("submit", "div.post form", function(event){
            var $target = $(this);
            var $input = $target.find("input");

            jQuery.post($target.attr('action'), $target.serialize(), function(data){
                $input.blur();
                $input.val("");
                var $data = $(data);
                $data.css("display", "none");
                $('#tabbar_content div.feed ul').prepend($data);
                $data.delay(500).fadeIn(1000);
            });
            return false;
        });

        $(document).on("focus", "#page_user_side form textarea", function(event){
            var $target = $(this);
            $target.addClass("active");
            $("#page_user_side form").find("button").show();
        });
  
        $(document).on("blur", "#page_user_side form textarea", function(event){
            var $target = $(this);
            $target.removeClass("active");
        });

        $(document).on("submit", "#page_user_side form", function(event){
            var $target = $(this);
            var $input = $target.find("textarea");

            jQuery.post($target.attr('action'), $target.serialize(), function(data){
                $input.val(data);
                $input.blur();
                $("#page_user_side form").find("button").hide();
            });

            return false;
        });

        $(document).on("click", "a.feed_like", function(event){
            var $target = $(this);
            var $div = $target.parents("div.content").find("div.likes");
            var url = $target.attr( "href" );
    
            jQuery.getJSON(url, function(data){
                $target.html(data.link);
                $div.html(data.content);
            });
    
            return false;
        });
  
        $(document).on("click", "a.feed_comment", function(event){
            var $target = $(this);
            var $div = $target.parents("div.content").find("div.comment");
    
            $div.show();
            $div.find("input").focus();
    
            return false;
        });
  
        $(document).on("focus", "div.feed ul li div > div.comment input", function(event){
            var $target = $(this);
            var $img = $target.parents("div.comment").find("img");

            $target.addClass("focus");
            $target.val("");
            $img.fadeIn();
        });
  
        $(document).on("blur", "div.feed ul li div > div.comment input", function(event){
            var $target = $(this);
            var $img = $target.parents("div.comment").find("img");

            $target.removeClass("focus");
            $target.val($target.attr( "title" ));
            $img.hide();
        });
  
        $(document).on("submit", "div.feed ul li div > div.comment form", function(event){
            var $target = $(this);
            var $div = $target.parents("div.content").find("div.comments");
            var url = $target.attr( "action" );
    
            if ($target.find("input").val())
            {
                jQuery.getJSON(url, $target.serialize(), function(data){
                    $div.html(data.content);
                    $target.find("input").blur();
                });
            }
    
            return false;
        });
  
        $(document).on("click", "div.feed ul li div > div.comments div.remove_icon", function(event){
            var $target = $(this);
            var $div = $target.parent();
            var url = $target.attr( "rel" );
    
            if (confirm($target.attr("title")))
            {
                jQuery.get(url, function(data){
                    $div.fadeOut();
                });
            }
    
            return false;
        });

        $(document).on("click", "#tabbar_navi a", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
            var $loader = $("<div class='loading'></div>");
    
            $target.blur();
            $("#tabbar_navi li").removeClass("active");
            $("#tabbar_content").html($loader);
    
            $target.parent().addClass("active");
    
            $("#tabbar_content").load(url);
    
            return false;
        });

        // Sidebar Delete Friend Link
        $(document).on("click", "a.delete_friend", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );

            $target.blur();
    
            jQuery.get(url, function(data){
                $target.parent().fadeOut();
            });

            return false;
        });

        // Like Item
        $(document).on("click", "a.like", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );

            $target.blur();
    
            jQuery.get(url, function(data){
                $target.parent().fadeOut();
            });

            return false;
        });
  
  
        // Main search
        $(document).on("focus", "form#search input", function(event){
            var $target = $(this);
            $target.addClass("active");
        });
  
        $(document).on("blur", "form#search input", function(event){
            var $target = $(this);
            $target.removeClass("active");
        });
  
        $(document).on("focus", "#main_header form#search input, #page_side form#search input", function(event){
            var $target = $(this);
            $target.addClass("active");
            self.search = $target.val();
            $target.val("");
        });
  
        $(document).on("blur", "#main_header form#search input, #page_side form#search input", function(event){
            var $target = $(this);
            var value = $target.val();
            $target.removeClass("active");

            if (value.length == 0)
                $target.val(self.search);
        });

        $(document).on("submit", "form#user_search", function(event){
            var $target = $(this);
            var $input = $target.find("input[type=text]");
            var $dummy = $target.find("input[type=hidden]");

            if ($input.val() == $dummy.val() || $input.val().length < 2)
                return false;
        });

        $(document).on("click", "#tabbar a.expand, div.feed a.expand, fieldset a.expand, #tabbar a.album_photo", function(event){
            var $target = $(this);

            $target.fancybox();
            $target.triggerHandler('click');

            return false;
        });

        $(document).on("mouseover", "#page_user_content #tabbar .remove, #page_content #tabbar .remove, #page_content fieldset .remove", function(event){
            $("#tabbar").find("div#tabbar_content > div.remove_icon").remove();
            $("fieldset").parent().find("div.remove_icon").remove();

            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );
            var $close = $('<div class="remove_icon"></div>');
      
            var margin = $target.outerWidth() - $target.width();
      
            var position = $target.position();
            //alert("left: " + position.left + ", top: " + position.top );
            $target.offsetParent().append($close);
            $close.css("top", position.top + 5);
            $close.css("left", position.left + $target.outerWidth() - 20);

            //$target.append($close);
            $close.click(function(){
                if (confirm("Wirklich löschen?")){
                    jQuery.get(url, function(data){
                        $target.fadeOut(function(){
                            $target.remove();
                            $close.remove();
                        });
                    });
                }
            })
      
            event.stopPropagation();
        });


        $(document).on("click", "a.expand_items", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
    
            if ($target.parents("ul").length)
                var $box = $target.parents("ul");
            else
                var $box = $target.parents("div.visitors-box");

            var $div = $box.find("a.expand_items");
            var $loader = $("<div class='loading'></div>");

            $div.css("background", "white");
            $div.css("padding", "2px");
            $div.html($loader);

            jQuery.get(url, function(data){
                $div.remove();
                $box.append(data);
            });

            return false;
        });
  
        $(document).on("click", "#tabbar a.album", function(event){
            var $target = $(this);
            var url = $target.attr( "href" );
            var $box = $target.parents("#tabbar_content");
            var $loader = $("<div class='loading'></div>");

            $box.html($loader);

            jQuery.get(url, function(data){
                $box.html(data);
            });

            return false;
        });
  

        $(document).keyup(function(event) {
            var $box = $('#photodetail_content');

            if ($box.is("div"))
            {
                if (event.which == '37') {
                    location.href = $box.find("a.prev").attr("href");
                }

                if (event.which == '39') {
                    location.href = $box.find("a.next").attr("href");
                }

                if (event.which == '38') {
                    location.href = $("a.up").attr("href");
                }
            }
        });
 
 
        //  Delete User Form
        $(document).on("submit", "form.form_delete", function(event){
            var $target = $(this);
            var $input = $target.find("input");

            if ($input.val() == "on")
            {
                return confirm($input.next().html())
            }

            return false;
        });
  
        // Choose user album
        $(document).on("change", "#form_choose_album select#album", function(event){
            var $target = $(this);
            var $form = $target.parents("form");
            var url = $form.attr( "action" );
            var $box = $target.parents("fieldset");

            $box.fadeOut();

            jQuery.get(url, $form.serialize(), function(data){
                $box.html(data);
                $box.stop(false, true).show();
                init_photo_manager();
            });

            return false;
        });
  
        // Edit user album
        $(document).on("click", "#form_edit_album input[type='button']", function(event){
            var $target = $(this);
            var $form = $target.parents("form");
            var url = $form.attr( "action" );
            var $box = $target.parents("fieldset");
            var status = true;
            var post_data = $form.serializeArray();
      
            if ($target.attr("name") == "delete")
                status = confirm($target.attr("title")+"?") 
        
            post_data.push({
                name:"method", 
                value:$target.attr("name")
            });
      
            //console.log(post_data);
    
            if (status)
            {
                $box.fadeOut();
        
                jQuery.post(url, jQuery.param(post_data), function(data){
                    $box.html(data);
                    $box.stop(false, true).show();
                    init_photo_manager();
                });
            }
            return false;
        });
  
  
        // Edit User Photo
        $(document).on("click", "#user_photo_manager a", function(event){
            var $target = $(this);
            var url = $target.attr( "rel" );
            var title = $target.attr( "title" );

            jQuery.get(url, function(data){
                var $window = popup_open(data);
                $window.find("input[type='submit']").click(function(event){
                    postForm($window);
                    return false;
                });
            });

            return false;
        });

        function postForm($window){
            jQuery.post($("#modal form").attr('action'), $("#modal form").serialize(), function(data){
                $window.find("div.content").html(data);

                if (data) {
                    $window.find("input[type='submit']").click(function(event){
                        postForm($window);
                        event.stopPropagation();
                        return false;
                    })
                } else {
                    popup_close($window);
                }

            });

            return false;
        }

        function popup_close($window){
            $window.fadeOut(function(){
                $window.modal('hide');
                $window.remove();
            });
        }
    });

function sendComment(url){

    //alert($("form#comment").serialize());

    jQuery.post(url, $("form#comment").serialize(), function(data){
        $("form#comment textarea").val("");

        $item = $("<span style='display: none'>"+data+"</span>");
        $('#comment_list').append(data);
        $item.delay(500).fadeIn();
    });

    return false;
}
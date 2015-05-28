
// Need: jquery 1.9.1+ 
// 傳入 elem id , 選擇的 scroll type , now only one scroll_type
function elem_fixed_on_top(elem_id,scroll_type){

    var last_elem_top = 0;
    var last_scroll_top = 0;
    var dmdc = 0; // diff move distance count

    var elem = $('#'+elem_id);
    elem.addClass('elem_scroll_style1');    // init class

    var elem_height = elem.height();
    var original_elem_top = elem.position().top;
    var original_elem_bottom = original_elem_top + elem_height;
    var placeholder = elem_height*2;

    // simular to  android chrome mobile app's url bar , unlimited by initial elem.top==0
    function elem_fixed_1(event){
        var doc_top = $(document).scrollTop();

        var diff_move_distance = last_scroll_top - doc_top;
        dmdc += diff_move_distance;

        var elem_top = parseInt(elem.position().top);

        // scroll 小於原本的位置bottom 
        if ( doc_top <= elem_height + original_elem_top ) {
            // [有點難解釋]捲軸高度 +???  小於 elem 原位置底部
            if ( doc_top + elem_height + elem_top <= original_elem_bottom ) {
                elem.css({'top':'0px'});
                elem.removeClass('elem_scroll_style1_on');
            }

        } else {
            // scroll up 超過準備區 且 elem 尚未出現螢幕 , 
            // if relative => elem不會再隱藏位置 , only fixed and hidden will equal -elem_height
            if ( doc_top <= original_elem_bottom + placeholder && elem_top == -elem_height ){
                elem.css({'top': '0px'});
                elem.removeClass('elem_scroll_style1_on');
                return;
            }

            {   // relative
                if ( !elem.hasClass('elem_scroll_style1_on') ){ // 變fixed前 預先移動到螢幕外
                    elem.css({'top': (-elem_height)+'px'});
                }

                if ( elem_top == -elem_height + original_elem_top ){ //fixed預先移動完成 即加上fixed
                    elem.addClass('elem_scroll_style1_on');
                }
            }

            // 超出高度
            if ( dmdc > 50 ){
                dmdc = 50;
                elem.css({"top": "0px"});
            }
            if (dmdc < -50) {
                dmdc = -50;
                elem.css({"top": (-elem_height)+"px"});
            }
        }

        last_scroll_top = doc_top;
    }

    $(document).on("scroll", elem_fixed_1);
}

// ex: elem_fixed_on_top('input_article',1);

var mandatoryColor='rgb(242, 215, 213)';

function htmlDecode(input){
    return input.replace(/\&quot\;/gi,'"');
}

Number.prototype.format = function(n, x) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
    return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}

String.prototype.toValue = function(){
    return parseInt(this) || 0;
}

function showLoader(text,timeout){
    if(text==null){text='Please Wait. Contacting service.';}
    $("body").addClass('ui-disabled');
    $.mobile.loading('show', {theme:"a", text:text, textonly:false, textVisible: true});
    if(timeout!=null){
        setTimeout(hideSuccessQuote, timeout);
        loadPage('#mainpage');
    }
}
                
function hideLoader(){
    $.mobile.loading('hide');
    $("body").removeClass('ui-disabled');
}

function getLoginButtons(){
	var aButtons=[];   
    var dUsed={};
    while(aButtons.length<10){
        var bFound=true;
        var tmp;
        while(bFound){
            tmp=Math.round(Math.random()*10);
            bFound=(tmp in dUsed || tmp==10);
        }
        dUsed[tmp]=tmp;
        aButtons[aButtons.length]=tmp;
    }
    return aButtons;
}

function setFieldProperties(aFields){
    for(i=0;i<aFields.length;i++){
        if(!aFields[i].display){
            $("#" + aFields[i].name ).parent().hide();
        }
        if(aFields[i].mandatory){
            setMandatory(aFields[i].name);
        }        
        if(!aFields[i].enabled){
            $("#" + aFields[i].name ).prop("disabled",true);
        }
    }    
}

function setMandatory(elmtId){    
    $('#' + elmtId).keyup(function() {
        checkContent($('#' + elmtId));
    });
    checkContent($('#' + elmtId));
}

function checkContent(elmt){
    if(elmt.val()!=''){
        elmt.css('background-color','white');
        elmt.css('color','black');
    }else{
        elmt.css('background-color',mandatoryColor);
        elmt.css('color','white');
    }
}

function isOK(aFields){    
    for(i=0;i<aFields.length;i++){
        if($('#' + aFields[i]).css('background-color')==mandatoryColor){
            return false;
        }
    }
    return true;
}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
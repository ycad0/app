/**
* @version: 1.3.21
* @author: Dan Grossman http://www.dangrossman.info/
* @copyright: Copyright (c) 2012-2015 Dan Grossman. All rights reserved.
* @license: Licensed under the MIT license. See http://www.opensource.org/licenses/mit-license.php
* @website: https://www.improvely.com/
*/

(function(e,t){if(typeof define=="function"&&define.amd)define(["moment","jquery","exports"],function(n,r,i){e.daterangepicker=t(e,i,n,r)});else if(typeof exports!="undefined"){var n=require("moment"),r;try{r=require("jquery")}catch(i){r=window.jQuery;if(!r)throw new Error("jQuery dependency not found")}t(e,exports,n,r)}else e.daterangepicker=t(e,{},e.moment,e.jQuery||e.Zepto||e.ender||e.$)})(this,function(e,t,n,r){var i=function(e,t,n){this.parentEl="body",this.element=r(e),this.isShowing=!1;var i='<div class="daterangepicker dropdown-menu"><div class="calendar first left"></div><div class="calendar second right"></div><div class="ranges"><div class="range_inputs"><div class="daterangepicker_start_input"><label for="daterangepicker_start"></label><input class="input-mini" type="text" name="daterangepicker_start" value="" /></div><div class="daterangepicker_end_input"><label for="daterangepicker_end"></label><input class="input-mini" type="text" name="daterangepicker_end" value="" /></div><button class="applyBtn" disabled="disabled"></button>&nbsp;<button class="cancelBtn"></button></div></div></div>';if(typeof t!="object"||t===null)t={};this.parentEl=typeof t=="object"&&t.parentEl&&r(t.parentEl).length?r(t.parentEl):r(this.parentEl),this.container=r(i).appendTo(this.parentEl),this.setOptions(t,n),this.container.find(".calendar").on("click.daterangepicker",".prev",r.proxy(this.clickPrev,this)).on("click.daterangepicker",".next",r.proxy(this.clickNext,this)).on("click.daterangepicker","td.available",r.proxy(this.clickDate,this)).on("mouseenter.daterangepicker","td.available",r.proxy(this.hoverDate,this)).on("mouseleave.daterangepicker","td.available",r.proxy(this.updateFormInputs,this)).on("change.daterangepicker","select.yearselect",r.proxy(this.updateMonthYear,this)).on("change.daterangepicker","select.monthselect",r.proxy(this.updateMonthYear,this)).on("change.daterangepicker","select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",r.proxy(this.updateTime,this)),this.container.find(".ranges").on("click.daterangepicker","button.applyBtn",r.proxy(this.clickApply,this)).on("click.daterangepicker","button.cancelBtn",r.proxy(this.clickCancel,this)).on("click.daterangepicker",".daterangepicker_start_input,.daterangepicker_end_input",r.proxy(this.showCalendars,this)).on("change.daterangepicker",".daterangepicker_start_input,.daterangepicker_end_input",r.proxy(this.inputsChanged,this)).on("keydown.daterangepicker",".daterangepicker_start_input,.daterangepicker_end_input",r.proxy(this.inputsKeydown,this)).on("click.daterangepicker","li",r.proxy(this.clickRange,this)).on("mouseenter.daterangepicker","li",r.proxy(this.enterRange,this)).on("mouseleave.daterangepicker","li",r.proxy(this.updateFormInputs,this)),this.element.is("input")?this.element.on({"click.daterangepicker":r.proxy(this.show,this),"focus.daterangepicker":r.proxy(this.show,this),"keyup.daterangepicker":r.proxy(this.updateFromControl,this),"keydown.daterangepicker":r.proxy(this.keydown,this)}):this.element.on("click.daterangepicker",r.proxy(this.toggle,this))};i.prototype={constructor:i,setOptions:function(e,t){this.startDate=n().startOf("day"),this.endDate=n().endOf("day"),this.timeZone=n().utcOffset(),this.minDate=!1,this.maxDate=!1,this.dateLimit=!1,this.showDropdowns=!1,this.showWeekNumbers=!1,this.timePicker=!1,this.timePickerSeconds=!1,this.timePickerIncrement=30,this.timePicker12Hour=!0,this.singleDatePicker=!1,this.ranges={},this.opens="right",this.element.hasClass("pull-right")&&(this.opens="left"),this.drops="down",this.element.hasClass("dropup")&&(this.drops="up"),this.buttonClasses=["btn","btn-small btn-sm"],this.applyClass="btn-success",this.cancelClass="btn-default",this.format="MM/DD/YYYY",this.separator=" - ",this.locale={applyLabel:"Apply",cancelLabel:"Cancel",fromLabel:"From",toLabel:"To",weekLabel:"W",customRangeLabel:"Custom Range",daysOfWeek:n.weekdaysMin(),monthNames:n.monthsShort(),firstDay:n.localeData()._week.dow},this.cb=function(){},typeof e.format=="string"&&(this.format=e.format),typeof e.separator=="string"&&(this.separator=e.separator),typeof e.startDate=="string"&&(this.startDate=n(e.startDate,this.format)),typeof e.endDate=="string"&&(this.endDate=n(e.endDate,this.format)),typeof e.minDate=="string"&&(this.minDate=n(e.minDate,this.format)),typeof e.maxDate=="string"&&(this.maxDate=n(e.maxDate,this.format)),typeof e.startDate=="object"&&(this.startDate=n(e.startDate)),typeof e.endDate=="object"&&(this.endDate=n(e.endDate)),typeof e.minDate=="object"&&(this.minDate=n(e.minDate)),typeof e.maxDate=="object"&&(this.maxDate=n(e.maxDate)),typeof e.applyClass=="string"&&(this.applyClass=e.applyClass),typeof e.cancelClass=="string"&&(this.cancelClass=e.cancelClass),typeof e.dateLimit=="object"&&(this.dateLimit=e.dateLimit),typeof e.locale=="object"&&(typeof e.locale.daysOfWeek=="object"&&(this.locale.daysOfWeek=e.locale.daysOfWeek.slice()),typeof e.locale.monthNames=="object"&&(this.locale.monthNames=e.locale.monthNames.slice()),typeof e.locale.firstDay=="number"&&(this.locale.firstDay=e.locale.firstDay),typeof e.locale.applyLabel=="string"&&(this.locale.applyLabel=e.locale.applyLabel),typeof e.locale.cancelLabel=="string"&&(this.locale.cancelLabel=e.locale.cancelLabel),typeof e.locale.fromLabel=="string"&&(this.locale.fromLabel=e.locale.fromLabel),typeof e.locale.toLabel=="string"&&(this.locale.toLabel=e.locale.toLabel),typeof e.locale.weekLabel=="string"&&(this.locale.weekLabel=e.locale.weekLabel),typeof e.locale.customRangeLabel=="string"&&(this.locale.customRangeLabel=e.locale.customRangeLabel)),typeof e.opens=="string"&&(this.opens=e.opens),typeof e.drops=="string"&&(this.drops=e.drops),typeof e.showWeekNumbers=="boolean"&&(this.showWeekNumbers=e.showWeekNumbers),typeof e.buttonClasses=="string"&&(this.buttonClasses=[e.buttonClasses]),typeof e.buttonClasses=="object"&&(this.buttonClasses=e.buttonClasses),typeof e.showDropdowns=="boolean"&&(this.showDropdowns=e.showDropdowns),typeof e.singleDatePicker=="boolean"&&(this.singleDatePicker=e.singleDatePicker,this.singleDatePicker&&(this.endDate=this.startDate.clone())),typeof e.timePicker=="boolean"&&(this.timePicker=e.timePicker),typeof e.timePickerSeconds=="boolean"&&(this.timePickerSeconds=e.timePickerSeconds),typeof e.timePickerIncrement=="number"&&(this.timePickerIncrement=e.timePickerIncrement),typeof e.timePicker12Hour=="boolean"&&(this.timePicker12Hour=e.timePicker12Hour);if(this.locale.firstDay!=0){var i=this.locale.firstDay;while(i>0)this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()),i--}var s,o,u;if(typeof e.startDate=="undefined"&&typeof e.endDate=="undefined"&&r(this.element).is("input[type=text]")){var a=r(this.element).val(),f=a.split(this.separator);s=o=null,f.length==2?(s=n(f[0],this.format),o=n(f[1],this.format)):this.singleDatePicker&&a!==""&&(s=n(a,this.format),o=n(a,this.format)),s!==null&&o!==null&&(this.startDate=s,this.endDate=o)}typeof e.timeZone=="string"||typeof e.timeZone=="number"?(typeof e.timeZone=="string"&&typeof n.tz!="undefined"?this.timeZone=n.tz.zone(e.timeZone).parse(new Date)*-1:this.timeZone=e.timeZone,this.startDate.utcOffset(this.timeZone),this.endDate.utcOffset(this.timeZone)):this.timeZone=n(this.startDate).utcOffset();if(typeof e.ranges=="object"){for(u in e.ranges){typeof e.ranges[u][0]=="string"?s=n(e.ranges[u][0],this.format):s=n(e.ranges[u][0]),typeof e.ranges[u][1]=="string"?o=n(e.ranges[u][1],this.format):o=n(e.ranges[u][1]),this.minDate&&s.isBefore(this.minDate)&&(s=n(this.minDate)),this.maxDate&&o.isAfter(this.maxDate)&&(o=n(this.maxDate));if(this.minDate&&o.isBefore(this.minDate)||this.maxDate&&s.isAfter(this.maxDate))continue;this.ranges[u]=[s,o]}var l="<ul>";for(u in this.ranges)l+="<li>"+u+"</li>";l+="<li>"+this.locale.customRangeLabel+"</li>",l+="</ul>",this.container.find(".ranges ul").remove(),this.container.find(".ranges").prepend(l)}typeof t=="function"&&(this.cb=t),this.timePicker||(this.startDate=this.startDate.startOf("day"),this.endDate=this.endDate.endOf("day")),this.singleDatePicker?(this.opens="right",this.container.addClass("single"),this.container.find(".calendar.right").show(),this.container.find(".calendar.left").hide(),this.timePicker?this.container.find(".ranges .daterangepicker_start_input, .ranges .daterangepicker_end_input").hide():this.container.find(".ranges").hide(),this.container.find(".calendar.right").hasClass("single")||this.container.find(".calendar.right").addClass("single")):(this.container.removeClass("single"),this.container.find(".calendar.right").removeClass("single"),this.container.find(".ranges").show()),this.oldStartDate=this.startDate.clone(),this.oldEndDate=this.endDate.clone(),this.oldChosenLabel=this.chosenLabel,this.leftCalendar={month:n([this.startDate.year(),this.startDate.month(),1,this.startDate.hour(),this.startDate.minute(),this.startDate.second()]),calendar:[]},this.rightCalendar={month:n([this.endDate.year(),this.endDate.month(),1,this.endDate.hour(),this.endDate.minute(),this.endDate.second()]),calendar:[]};if(this.opens=="right"||this.opens=="center"){var c=this.container.find(".calendar.first"),h=this.container.find(".calendar.second");h.hasClass("single")&&(h.removeClass("single"),c.addClass("single")),c.removeClass("left").addClass("right"),h.removeClass("right").addClass("left"),this.singleDatePicker&&(c.show(),h.hide())}typeof e.ranges=="undefined"&&!this.singleDatePicker&&this.container.addClass("show-calendar"),this.container.removeClass("opensleft opensright").addClass("opens"+this.opens),this.updateView(),this.updateCalendars();var p=this.container;r.each(this.buttonClasses,function(e,t){p.find("button").addClass(t)}),this.container.find(".daterangepicker_start_input label").html(this.locale.fromLabel),this.container.find(".daterangepicker_end_input label").html(this.locale.toLabel),this.applyClass.length&&this.container.find(".applyBtn").addClass(this.applyClass),this.cancelClass.length&&this.container.find(".cancelBtn").addClass(this.cancelClass),this.container.find(".applyBtn").html(this.locale.applyLabel),this.container.find(".cancelBtn").html(this.locale.cancelLabel)},setStartDate:function(e){typeof e=="string"&&(this.startDate=n(e,this.format).utcOffset(this.timeZone)),typeof e=="object"&&(this.startDate=n(e)),this.timePicker||(this.startDate=this.startDate.startOf("day")),this.oldStartDate=this.startDate.clone(),this.updateView(),this.updateCalendars(),this.updateInputText()},setEndDate:function(e){typeof e=="string"&&(this.endDate=n(e,this.format).utcOffset(this.timeZone)),typeof e=="object"&&(this.endDate=n(e)),this.timePicker||(this.endDate=this.endDate.endOf("day")),this.oldEndDate=this.endDate.clone(),this.updateView(),this.updateCalendars(),this.updateInputText()},updateView:function(){this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()),this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()),this.updateFormInputs()},updateFormInputs:function(){this.container.find("input[name=daterangepicker_start]").val(this.startDate.format(this.format)),this.container.find("input[name=daterangepicker_end]").val(this.endDate.format(this.format)),this.startDate.isSame(this.endDate)||this.startDate.isBefore(this.endDate)?this.container.find("button.applyBtn").removeAttr("disabled"):this.container.find("button.applyBtn").attr("disabled","disabled")},updateFromControl:function(){if(!this.element.is("input"))return;if(!this.element.val().length)return;var e=this.element.val().split(this.separator),t=null,r=null;e.length===2&&(t=n(e[0],this.format).utcOffset(this.timeZone),r=n(e[1],this.format).utcOffset(this.timeZone));if(this.singleDatePicker||t===null||r===null)t=n(this.element.val(),this.format).utcOffset(this.timeZone),r=t;if(r.isBefore(t))return;this.oldStartDate=this.startDate.clone(),this.oldEndDate=this.endDate.clone(),this.startDate=t,this.endDate=r,(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate))&&this.notify(),this.updateCalendars()},keydown:function(e){(e.keyCode===9||e.keyCode===13)&&this.hide()},notify:function(){this.updateView(),this.cb(this.startDate,this.endDate,this.chosenLabel)},move:function(){var e={top:0,left:0},t,n=r(window).width();this.parentEl.is("body")||(e={top:this.parentEl.offset().top-this.parentEl.scrollTop(),left:this.parentEl.offset().left-this.parentEl.scrollLeft()},n=this.parentEl[0].clientWidth+this.parentEl.offset().left),this.drops=="up"?t=this.element.offset().top-this.container.outerHeight()-e.top:t=this.element.offset().top+this.element.outerHeight()-e.top,this.container[this.drops=="up"?"addClass":"removeClass"]("dropup"),this.opens=="left"?(this.container.css({top:t,right:n-this.element.offset().left-this.element.outerWidth(),left:"auto"}),this.container.offset().left<0&&this.container.css({right:"auto",left:9})):this.opens=="center"?(this.container.css({top:t,left:this.element.offset().left-e.left+this.element.outerWidth()/2-this.container.outerWidth()/2,right:"auto"}),this.container.offset().left<0&&this.container.css({right:"auto",left:9})):(this.container.css({top:t,left:this.element.offset().left-e.left,right:"auto"}),this.container.offset().left+this.container.outerWidth()>r(window).width()&&this.container.css({left:"auto",right:0}))},toggle:function(e){this.element.hasClass("active")?this.hide():this.show()},show:function(e){if(this.isShowing)return;this.element.addClass("active"),this.container.show(),this.move(),this._outsideClickProxy=r.proxy(function(e){this.outsideClick(e)},this),r(document).on("mousedown.daterangepicker",this._outsideClickProxy).on("touchend.daterangepicker",this._outsideClickProxy).on("click.daterangepicker","[data-toggle=dropdown]",this._outsideClickProxy).on("focusin.daterangepicker",this._outsideClickProxy),this.isShowing=!0,this.element.trigger("show.daterangepicker",this)},outsideClick:function(e){var t=r(e.target);if(e.type=="focusin"||t.closest(this.element).length||t.closest(this.container).length||t.closest(".calendar-date").length)return;this.hide()},hide:function(e){if(!this.isShowing)return;r(document).off(".daterangepicker"),this.element.removeClass("active"),this.container.hide(),(!this.startDate.isSame(this.oldStartDate)||!this.endDate.isSame(this.oldEndDate))&&this.notify(),this.oldStartDate=this.startDate.clone(),this.oldEndDate=this.endDate.clone(),this.isShowing=!1,this.element.trigger("hide.daterangepicker",this)},enterRange:function(e){var t=e.target.innerHTML;if(t==this.locale.customRangeLabel)this.updateView();else{var n=this.ranges[t];this.container.find("input[name=daterangepicker_start]").val(n[0].format(this.format)),this.container.find("input[name=daterangepicker_end]").val(n[1].format(this.format))}},showCalendars:function(){this.container.addClass("show-calendar"),this.move(),this.element.trigger("showCalendar.daterangepicker",this)},hideCalendars:function(){this.container.removeClass("show-calendar"),this.element.trigger("hideCalendar.daterangepicker",this)},inputsChanged:function(e){var t=r(e.target),i=n(t.val(),this.format);if(!i.isValid())return;var s,o;t.attr("name")==="daterangepicker_start"?(s=!1!==this.minDate&&i.isBefore(this.minDate)?this.minDate:i,o=this.endDate):(s=this.startDate,o=!1!==this.maxDate&&i.isAfter(this.maxDate)?this.maxDate:i),this.setCustomDates(s,o)},inputsKeydown:function(e){e.keyCode===13&&(this.inputsChanged(e),this.notify())},updateInputText:function(){this.element.is("input")&&!this.singleDatePicker?(this.element.val(this.startDate.format(this.format)+this.separator+this.endDate.format(this.format)),this.element.trigger("change")):this.element.is("input")&&(this.element.val(this.endDate.format(this.format)),this.element.trigger("change"))},clickRange:function(e){var t=e.target.innerHTML;this.chosenLabel=t;if(t==this.locale.customRangeLabel)this.showCalendars();else{var n=this.ranges[t];this.startDate=n[0],this.endDate=n[1],this.timePicker||(this.startDate.startOf("day"),this.endDate.endOf("day")),this.leftCalendar.month.month(this.startDate.month()).year(this.startDate.year()).hour(this.startDate.hour()).minute(this.startDate.minute()),this.rightCalendar.month.month(this.endDate.month()).year(this.endDate.year()).hour(this.endDate.hour()).minute(this.endDate.minute()),this.updateCalendars(),this.updateInputText(),this.hideCalendars(),this.hide(),this.element.trigger("apply.daterangepicker",this)}},clickPrev:function(e){var t=r(e.target).parents(".calendar");t.hasClass("left")?this.leftCalendar.month.subtract(1,"month"):this.rightCalendar.month.subtract(1,"month"),this.updateCalendars()},clickNext:function(e){var t=r(e.target).parents(".calendar");t.hasClass("left")?this.leftCalendar.month.add(1,"month"):this.rightCalendar.month.add(1,"month"),this.updateCalendars()},hoverDate:function(e){var t=r(e.target).attr("data-title"),n=t.substr(1,1),i=t.substr(3,1),s=r(e.target).parents(".calendar");s.hasClass("left")?this.container.find("input[name=daterangepicker_start]").val(this.leftCalendar.calendar[n][i].format(this.format)):this.container.find("input[name=daterangepicker_end]").val(this.rightCalendar.calendar[n][i].format(this.format))},setCustomDates:function(e,t){this.chosenLabel=this.locale.customRangeLabel;if(e.isAfter(t)){var r=this.endDate.diff(this.startDate);t=n(e).add(r,"ms"),this.maxDate&&t.isAfter(this.maxDate)&&(t=this.maxDate.clone())}this.startDate=e,this.endDate=t,this.updateView(),this.updateCalendars()},clickDate:function(e){var t=r(e.target).attr("data-title"),i=t.substr(1,1),s=t.substr(3,1),o=r(e.target).parents(".calendar"),u,a;if(o.hasClass("left")){u=this.leftCalendar.calendar[i][s],a=this.endDate;if(typeof this.dateLimit=="object"){var f=n(u).add(this.dateLimit).startOf("day");a.isAfter(f)&&(a=f)}}else{u=this.startDate,a=this.rightCalendar.calendar[i][s];if(typeof this.dateLimit=="object"){var l=n(a).subtract(this.dateLimit).startOf("day");u.isBefore(l)&&(u=l)}}this.singleDatePicker&&o.hasClass("left")?a=u.clone():this.singleDatePicker&&o.hasClass("right")&&(u=a.clone()),o.find("td").removeClass("active"),r(e.target).addClass("active"),this.setCustomDates(u,a),this.timePicker||a.endOf("day"),this.singleDatePicker&&!this.timePicker&&this.clickApply()},clickApply:function(e){this.updateInputText(),this.hide(),this.element.trigger("apply.daterangepicker",this)},clickCancel:function(e){this.startDate=this.oldStartDate,this.endDate=this.oldEndDate,this.chosenLabel=this.oldChosenLabel,this.updateView(),this.updateCalendars(),this.hide(),this.element.trigger("cancel.daterangepicker",this)},updateMonthYear:function(e){var t=r(e.target).closest(".calendar").hasClass("left"),n=t?"left":"right",i=this.container.find(".calendar."+n),s=parseInt(i.find(".monthselect").val(),10),o=i.find(".yearselect").val();!t&&!this.singleDatePicker&&(o<this.startDate.year()||o==this.startDate.year()&&s<this.startDate.month())&&(s=this.startDate.month(),o=this.startDate.year()),this.minDate&&(o<this.minDate.year()||o==this.minDate.year()&&s<this.minDate.month())&&(s=this.minDate.month(),o=this.minDate.year()),this.maxDate&&(o>this.maxDate.year()||o==this.maxDate.year()&&s>this.maxDate.month())&&(s=this.maxDate.month(),o=this.maxDate.year()),this[n+"Calendar"].month.month(s).year(o),this.updateCalendars()},updateTime:function(e){var t=r(e.target).closest(".calendar"),n=t.hasClass("left"),i=parseInt(t.find(".hourselect").val(),10),s=parseInt(t.find(".minuteselect").val(),10),o=0;this.timePickerSeconds&&(o=parseInt(t.find(".secondselect").val(),10));if(this.timePicker12Hour){var u=t.find(".ampmselect").val();u==="PM"&&i<12&&(i+=12),u==="AM"&&i===12&&(i=0)}if(n){var a=this.startDate.clone();a.hour(i),a.minute(s),a.second(o),this.startDate=a,this.leftCalendar.month.hour(i).minute(s).second(o),this.singleDatePicker&&(this.endDate=a.clone())}else{var f=this.endDate.clone();f.hour(i),f.minute(s),f.second(o),this.endDate=f,this.singleDatePicker&&(this.startDate=f.clone()),this.rightCalendar.month.hour(i).minute(s).second(o)}this.updateView(),this.updateCalendars()},updateCalendars:function(){this.leftCalendar.calendar=this.buildCalendar(this.leftCalendar.month.month(),this.leftCalendar.month.year(),this.leftCalendar.month.hour(),this.leftCalendar.month.minute(),this.leftCalendar.month.second(),"left"),this.rightCalendar.calendar=this.buildCalendar(this.rightCalendar.month.month(),this.rightCalendar.month.year(),this.rightCalendar.month.hour(),this.rightCalendar.month.minute(),this.rightCalendar.month.second(),"right"),this.container.find(".calendar.left").empty().html(this.renderCalendar(this.leftCalendar.calendar,this.startDate,this.minDate,this.maxDate,"left")),this.container.find(".calendar.right").empty().html(this.renderCalendar(this.rightCalendar.calendar,this.endDate,this.singleDatePicker?this.minDate:this.startDate,this.maxDate,"right")),this.container.find(".ranges li").removeClass("active");var e=!0,t=0;for(var n in this.ranges)this.timePicker?this.startDate.isSame(this.ranges[n][0])&&this.endDate.isSame(this.ranges[n][1])&&(e=!1,this.chosenLabel=this.container.find(".ranges li:eq("+t+")").addClass("active").html()):this.startDate.format("YYYY-MM-DD")==this.ranges[n][0].format("YYYY-MM-DD")&&this.endDate.format("YYYY-MM-DD")==this.ranges[n][1].format("YYYY-MM-DD")&&(e=!1,this.chosenLabel=this.container.find(".ranges li:eq("+t+")").addClass("active").html()),t++;e&&(this.chosenLabel=this.container.find(".ranges li:last").addClass("active").html(),this.showCalendars())},buildCalendar:function(e,t,r,i,s,o){var u=n([t,e]).daysInMonth(),a=n([t,e,1]),f=n([t,e,u]),l=n(a).subtract(1,"month").month(),c=n(a).subtract(1,"month").year(),h=n([c,l]).daysInMonth(),p=a.day(),d,v=[];v.firstDay=a,v.lastDay=f;for(d=0;d<6;d++)v[d]=[];var m=h-p+this.locale.firstDay+1;m>h&&(m-=7),p==this.locale.firstDay&&(m=h-6);var g=n([c,l,m,12,i,s]).utcOffset(this.timeZone),y,b;for(d=0,y=0,b=0;d<42;d++,y++,g=n(g).add(24,"hour"))d>0&&y%7===0&&(y=0,b++),v[b][y]=g.clone().hour(r),g.hour(12),this.minDate&&v[b][y].format("YYYY-MM-DD")==this.minDate.format("YYYY-MM-DD")&&v[b][y].isBefore(this.minDate)&&o=="left"&&(v[b][y]=this.minDate.clone()),this.maxDate&&v[b][y].format("YYYY-MM-DD")==this.maxDate.format("YYYY-MM-DD")&&v[b][y].isAfter(this.maxDate)&&o=="right"&&(v[b][y]=this.maxDate.clone());return v},renderDropdowns:function(e,t,n){var r=e.month(),i=e.year(),s=n&&n.year()||i+5,o=t&&t.year()||i-50,u='<select class="monthselect">',a=i==o,f=i==s;for(var l=0;l<12;l++)(!a||l>=t.month())&&(!f||l<=n.month())&&(u+="<option value='"+l+"'"+(l===r?" selected='selected'":"")+">"+this.locale.monthNames[l]+"</option>");u+="</select>";var c='<select class="yearselect">';for(var h=o;h<=s;h++)c+='<option value="'+h+'"'+(h===i?' selected="selected"':"")+">"+h+"</option>";return c+="</select>",u+c},renderCalendar:function(e,t,n,i,s){var o='<div class="calendar-date">';o+='<table class="table-condensed">',o+="<thead>",o+="<tr>",this.showWeekNumbers&&(o+="<th></th>"),!n||n.isBefore(e.firstDay)?o+='<th class="prev available"><i class="fa fa-arrow-left icon icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>':o+="<th></th>";var u=this.locale.monthNames[e[1][1].month()]+e[1][1].format(" YYYY");this.showDropdowns&&(u=this.renderDropdowns(e[1][1],n,i)),o+='<th colspan="5" class="month">'+u+"</th>",!i||i.isAfter(e.lastDay)?o+='<th class="next available"><i class="fa fa-arrow-right icon icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>':o+="<th></th>",o+="</tr>",o+="<tr>",this.showWeekNumbers&&(o+='<th class="week">'+this.locale.weekLabel+"</th>"),r.each(this.locale.daysOfWeek,function(e,t){o+="<th>"+t+"</th>"}),o+="</tr>",o+="</thead>",o+="<tbody>";for(var a=0;a<6;a++){o+="<tr>",this.showWeekNumbers&&(o+='<td class="week">'+e[a][0].week()+"</td>");for(var f=0;f<7;f++){var l="available ";l+=e[a][f].month()==e[1][1].month()?"":"off",n&&e[a][f].isBefore(n,"day")||i&&e[a][f].isAfter(i,"day")?l=" off disabled ":e[a][f].format("YYYY-MM-DD")==t.format("YYYY-MM-DD")?(l+=" active ",e[a][f].format("YYYY-MM-DD")==this.startDate.format("YYYY-MM-DD")&&(l+=" start-date "),e[a][f].format("YYYY-MM-DD")==this.endDate.format("YYYY-MM-DD")&&(l+=" end-date ")):e[a][f]>=this.startDate&&e[a][f]<=this.endDate&&(l+=" in-range ",e[a][f].isSame(this.startDate)&&(l+=" start-date "),e[a][f].isSame(this.endDate)&&(l+=" end-date "));var c="r"+a+"c"+f;o+='<td class="'+l.replace(/\s+/g," ").replace(/^\s?(.*?)\s?$/,"$1")+'" data-title="'+c+'">'+e[a][f].date()+"</td>"}o+="</tr>"}o+="</tbody>",o+="</table>",o+="</div>";var h;if(this.timePicker){o+='<div class="calendar-time">',o+='<select class="hourselect">';var p=0,d=23;n&&(s=="left"||this.singleDatePicker)&&t.format("YYYY-MM-DD")==n.format("YYYY-MM-DD")&&(p=n.hour(),t.hour()<p&&t.hour(p),this.timePicker12Hour&&p>=12&&t.hour()>=12&&(p-=12),this.timePicker12Hour&&p==12&&(p=1)),i&&(s=="right"||this.singleDatePicker)&&t.format("YYYY-MM-DD")==i.format("YYYY-MM-DD")&&(d=i.hour(),t.hour()>d&&t.hour(d),this.timePicker12Hour&&d>=12&&t.hour()>=12&&(d-=12));var v=0,m=23,g=t.hour();this.timePicker12Hour&&(v=1,m=12,g>=12&&(g-=12),g===0&&(g=12));for(h=v;h<=m;h++)h==g?o+='<option value="'+h+'" selected="selected">'+h+"</option>":h<p||h>d?o+='<option value="'+h+'" disabled="disabled" class="disabled">'+h+"</option>":o+='<option value="'+h+'">'+h+"</option>";o+="</select> : ",o+='<select class="minuteselect">';var y=0,b=59;n&&(s=="left"||this.singleDatePicker)&&t.format("YYYY-MM-DD h A")==n.format("YYYY-MM-DD h A")&&(y=n.minute(),t.minute()<y&&t.minute(y)),i&&(s=="right"||this.singleDatePicker)&&t.format("YYYY-MM-DD h A")==i.format("YYYY-MM-DD h A")&&(b=i.minute(),t.minute()>b&&t.minute(b));for(h=0;h<60;h+=this.timePickerIncrement){var w=h;w<10&&(w="0"+w),h==t.minute()?o+='<option value="'+h+'" selected="selected">'+w+"</option>":h<y||h>b?o+='<option value="'+h+'" disabled="disabled" class="disabled">'+w+"</option>":o+='<option value="'+h+'">'+w+"</option>"}o+="</select> ";if(this.timePickerSeconds){o+=': <select class="secondselect">';for(h=0;h<60;h+=this.timePickerIncrement){var w=h;w<10&&(w="0"+w),h==t.second()?o+='<option value="'+h+'" selected="selected">'+w+"</option>":o+='<option value="'+h+'">'+w+"</option>"}o+="</select>"}if(this.timePicker12Hour){o+='<select class="ampmselect">';var E="",S="";n&&(s=="left"||this.singleDatePicker)&&t.format("YYYY-MM-DD")==n.format("YYYY-MM-DD")&&n.hour()>=12&&(E=' disabled="disabled" class="disabled"'),i&&(s=="right"||this.singleDatePicker)&&t.format("YYYY-MM-DD")==i.format("YYYY-MM-DD")&&i.hour()<12&&(S=' disabled="disabled" class="disabled"'),t.hour()>=12?o+='<option value="AM"'+E+'>AM</option><option value="PM" selected="selected"'+S+">PM</option>":o+='<option value="AM" selected="selected"'+E+'>AM</option><option value="PM"'+S+">PM</option>",o+="</select>"}o+="</div>"}return o},remove:function(){this.container.remove(),this.element.off(".daterangepicker"),this.element.removeData("daterangepicker")}},r.fn.daterangepicker=function(e,t){return this.each(function(){var n=r(this);n.data("daterangepicker")&&n.data("daterangepicker").remove(),n.data("daterangepicker",new i(n,e,t))}),this}});
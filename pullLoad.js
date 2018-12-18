
;(function(window,$){
	var pullLoad = pullLoad || {};
	var load = function(options){
		this.options={
			el: window,
			clearEl: "",
			isCanLoad: true,
			callBack: function(){}
		};
		$.extend(this.options,options);
		this.init();
	}
	load.prototype.constructor = load;
	load.prototype.init = function(){
		var _this = this;
		var el = _this.options.el;
		var clearElArr = _this.options.clearEl ? _this.options.clearEl.split(",") : ""; 
		var elH = $(window).height();
		var reallyH = 0;
		for(elIndex in clearElArr){
			elH -= $("." + clearElArr[elIndex]).height();
		}
		$("." + el).css({"height":elH + "px","overflow-y":"scroll"});
		$("." + el).scroll(function(){
			if(!_this.options.isCanLoad){ console.log("false"); return false;}
			reallyH = parseFloat(document.getElementsByClassName(el)[0].scrollHeight);
			if(parseFloat($("." + el).scrollTop() + elH) >= reallyH){
				_this.options.callBack();
			}
		});
	}

	pullLoad.load=function(options){
    new load(options);
	}

	if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
    module.exports = pullLoad;
	} else if (typeof define === 'function' && define.amd) {
    define(function () {
        return pullLoad;
    });
	} else {
    window.pullLoad = pullLoad;
	}
}(window,$));
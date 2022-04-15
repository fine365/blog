(function(FE) {
	FE.Calendar = function() {
		
	}
	FE.Calendar.isRun = function(year) {
		if((year%4==0&&year%100!=0)||year%400==0) {
			return true;
		}
		return false;
	}
	FE.Calendar.daysOfMonth = function(year,month) {
		if(FE.Calendar.isRun(year)&&month==1) {
			return 29;
		}else {
			return FE.config.days[month];
		}
	}
	
	FE.Calendar.configOfMonthFirstday = function(year,month) {
		var yearfirstday = new Date(year,0,1);
		var day = yearfirstday.getDay();
		console.info(day);
		var days = 0;
		
		for(var i=0;i<month;i++) {
			days+=FE.Calendar.daysOfMonth(year,i);
		}
		days--;
		var week =  (day+days)%7==0?(day+days)/7:(day+days)/7+1;
		return {week:week,day:(day+days)%7};
	}
	FE.config = {
		firstday:"2022-02-05",
		days:[31,28,31,30,31,30,31,31,30,31,30,31],
		
	};

	FE.extend = function(obj, fnName, fn) {
		obj[fnName] = fn;
	}
	
	FE.SAXReader = function(html) {
		
	}
	window.FE = FE;
})(node);

function node(selector) {
	var result = getElement(selector);
	if (!result.length) {
		FE.extend(result, "addClass", addClass);
		FE.extend(result, "removeClass", removeClass);
		FE.extend(result, "valueOfStyle", valueOfStyle);
	} else {
		for ( var i = 0; i < result.length; i++) {
			FE.extend(result[i], "addClass", addClass);
			FE.extend(result[i], "removeClass", removeClass);
			FE.extend(result[i], "valueOfStyle", valueOfStyle);
		}
	}
	return result;
}
function getElement(selector) {
	if ((typeof selector) == "string") {
		var result = null;
		var selectors = selector.split(" ");
		for ( var i = 0; i < selectors.length; i++) {
			if (selectors[i].indexOf("#") == 0) {
				result = document.getElementById(selectors[i].substring(1));
			}

			if (selectors[i].indexOf("<") == 0 && selectors[i].indexOf(">") > 0) {
				if (selectors[i].indexOf(".") > 0) {
					var _selector = selectors[i].split(".");
					var tagName = _selector[0].substring(1,
							_selector[0].length - 1);
					result = result ? result.getElementsByTagName(tagName)
							: document.getElementsByTagName(tagName);
					if (result) {
						var doms = [];
						for ( var i = 0; i < result.length; i++) {
							var className = result[i].className;
							if (className.indexOf(_selector[1]) >= 0) {
								doms.push(result[i]);
							}
						}
						return doms;
					}
				} else {
					var tagName = selectors[i].substring(1,
							selectors[i].length - 1);

					if (result && (typeof result) == "object") {
						result = result.getElementsByTagName(tagName);
					} else {
						result = document.getElementsByTagName(tagName);
					}
				}
			}
		}
		return result;
	}
}
function addClass(className) {
	var _className = this.className;
	this.className = _className + " " + className;
}

function removeClass(className) {
	var _className = this.className;
	if (_className.indexOf(className) >= 0) {
		var classes = _className.split(" ");
		var classNameStr = "";
		for ( var i = 0; i < classes.length; i++) {
			if (classes[i] == className) {
				continue;
			} else {
				classNameStr += classes[i] + " ";
			}
		}
		this.className = classNameStr;
	}
}

function valueOfStyle(name,value) {
	if(name&&value) {
		this.style[name] = value;
	}else if(name) {
		return this.style[name];
	}
}

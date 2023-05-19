function getContent(page) {
	let xmlhttp;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {
		// IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			document.getElementsByClassName("entry")[0].innerHTML = xmlhttp.responseText;
			sliderInit();
            renderFormula();
		}
	}
	xmlhttp.open("GET", "./page" + page.toString().padStart(2, "0") +".html", true);
	
    xmlhttp.send(null);
}
function getHeader() {
	let xmlhttp;
	if (window.XMLHttpRequest) {
		// IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	}
	else {
		// IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

			document.getElementById("ajax-header").innerHTML = xmlhttp.responseText;

		}
	}
	xmlhttp.open("GET", "./header.html");
	xmlhttp.send(null);
}

function renderFormula() {
    // MathJax.Hub.Queue(function(){
    //     var math = MathJax.Hub.getAllJax("math")[0];
    //     MathJax.Hub.Queue(["Text", math, formula.value]);
    //     location.hash = formula.value;
    // });
    for (let elem of document.getElementsByClassName('math')) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, elem]);
    }
    
}




function sliderInit() {

    for (let elem of document.getElementsByTagName('FIGURE')) {
        elem.innerHTML += '<div class="slider-content">'+
						  '<p class="slider-scale">0%</p><div class="slider-bar">'+
						  '<div class="slider-progress"></div>'+
						  '<div class="slider-dot"></div></div></div>'
        //  获取所有的节点元素
        let content = elem.getElementsByClassName('slider-content')[0];
        let bar = elem.getElementsByClassName('slider-bar')[0];
        let progress = elem.getElementsByClassName('slider-progress')[0];
        let dot = elem.getElementsByClassName('slider-dot')[0];
        let p = elem.getElementsByClassName('slider-scale')[0];
        let image = elem.getElementsByTagName('IMG')[0];

        
        let bili = image.width / 1000;
        p.innerHTML = image.width + 'px';
        
  			//dot.style.left = 500 * Math.ceil(bili) / 1000 + 'px';
        //progress.style.width = 500*Math.ceil(bili)/100 + 'px';
  			console.log(bar.offsetWidth - dot.offsetWidth)

        /*
        * offsetWidth 获取当前节点的宽度 （width + border + padding）
        **/
        // 总长度减去原点覆盖的部分
        var rest = bar.offsetWidth - dot.offsetWidth;
        // 鼠标按下事件
        dot.onmousedown = function (ev) {
            /*
            * offsetLeft 获取的是相对于父对象的左边距, 返回的是数值， 没有单位
            */
            let dotL = dot.offsetLeft
            let e = ev || window.event //兼容性
            /*
            * clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。
            */
            let mouseX = e.clientX //鼠标按下的位置
            window.onmousemove = function (ev) {
                let e = ev || window.event
                // 浏览器当前位置减去鼠标按下的位置
                let moveL = e.clientX - mouseX //鼠标移动的距离
                
                // 保存newL是必要的
                let newL = dotL + moveL  // left值
                
                /* 判断最大值和最小值 */ 
                if (newL < 0) 
                    newL = 0;
                if (newL >= rest) 
                    newL = rest;
                
                // 改变left值
                dot.style.left = newL + 'px'
                // 计算比例
                let bili = newL / rest * 100
                p.innerHTML = Math.ceil(bili) * 10 + 'px';
                image.style.width = Math.ceil(bili) * 10 + 'px';
                progress.style.width = 500*Math.ceil(bili)/100 + 'px';
                    return false //取消默认事件
            }
            window.onmouseup = function () {
                window.onmousemove = false //解绑移动事件
                return false
            }
            return false;
        };
        // 点击音量条
        bar.onclick = function (ev) {
            let left = ev.clientX - content.offsetLeft - dot.offsetWidth / 2
            if (left < 0) {
                left = 0
            }
            if (left >= rest) {
                left = rest
            }
            dot.style.left = left + 'px';
            let bili = left / rest * 100;
            p.innerHTML = Math.ceil(bili) * 10 + 'px';
            progress.style.width = 500*Math.ceil(bili)/100 + 'px';
            return false
        }
    

    }
}


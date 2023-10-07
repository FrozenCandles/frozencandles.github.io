

const getTextNode = (node) => {
    const text = [...node.childNodes].find(child => child.nodeType === Node.TEXT_NODE);
    return text && text.textContent.trim();
  }


// function checkArticle(checkConfig) {
//     const [article] = document.getElementsByClassName('entry');

//     const assist_elem = document.getElementById('assist');
//     if (assist_elem === null) return;

//     button = document.createElement('button');
//     button.innerHTML = 'Check Article';
//     button.onclick = onCheckArticle
//     document.insertBefore(button, assist_elem);

// }

function onCheckArticle(checkConfig) {

    const [article] = document.getElementsByClassName('entry')

    for (let elem of article.getElementsByTagName('A')) {
        if (!elem.hasAttribute('href')) {
            alert(`Link "${elem.textContent}" does not have a href attribute.`);
        }
    }

    let s = ''; 
    for (let node of article.childNodes)
        if (node.nodeType == '3')
            s += (node.textContent)
    if (/\S/.test(s))
        alert(`Article has raw text "${s.replace(/\s*/g, '')}"`)
    
}



function addAssistButton(title, action) {
    const assist_elem = document.getElementById('assist');
    if (assist_elem === null) 
        return;
    const button = document.createElement('button');
    button.style.display = 'block';
    button.className = 'button action';
    button.style.margin = '5px 15px';

    button.innerHTML = title;
    button.onclick = action;
    assist_elem.insertBefore(button, assist_elem.firstChild);
}


// function addCloseImageScalar() {
    
//     const assist_elem = document.getElementById('assist');
//     if (assist_elem === null) return;
//     const button = document.createElement('button');
//     button.innerHTML = 'Close Image Scalar';
//     button.onclick = function() {
//         for (let elem of document.getElementsByClassName('imagescalar-content')) {
//             elem.style.display = 'none';

//         }
//     }
//     assist_elem.parentNode.insertBefore(button, assist_elem);


// }

function addImageScalar() {

    for (let elem of document.getElementsByTagName('FIGURE')) {

        if (['parallel'].includes(elem.className))
            continue;

        elem.innerHTML += '<div style="width: 500px; height: 80px; margin: 40px auto; position: relative;" class="imagescalar-content">' +
                          '<p class="imagescalar-scale" style="text-align: center;">0%</p><div class="imagescalar-bar" style="width: 500px; height: 12px; border-radius: 10px; background: #e4e7ed; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; cursor: pointer;">'+
                          '<div class="imagescalar-progress" style="width: 0; height: 12px; border-radius: 10px; background: #409eff;"></div>'+
                          '<div class="imagescalar-dot" style="width: 20px; height: 20px; background: #fff; border: 1px solid #409eff; position: absolute; bottom: 0; top: 0; margin: auto 0; border-radius: 50%; cursor: pointer;"></div></div></div>'
        //  获取所有的节点元素
        let content = elem.getElementsByClassName('imagescalar-content')[0];
        let bar = elem.getElementsByClassName('imagescalar-bar')[0];
        let progress = elem.getElementsByClassName('imagescalar-progress')[0];
        let dot = elem.getElementsByClassName('imagescalar-dot')[0];
        let p = elem.getElementsByClassName('imagescalar-scale')[0];
        let image = elem.getElementsByTagName('IMG')[0];

        
        let bili = image.width / 1000;
        p.innerHTML = image.width + 'px';
        
            //dot.style.left = 500 * Math.ceil(bili) / 1000 + 'px';
            //progress.style.width = 500*Math.ceil(bili)/100 + 'px';
            //console.log(bar.offsetWidth - dot.offsetWidth)

        /**
         * offsetWidth 获取当前节点的宽度 （width + border + padding）
         */
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


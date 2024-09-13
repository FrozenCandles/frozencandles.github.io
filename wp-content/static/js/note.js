

function addJupyterMarker() {
    let num = 0;
    let marks = document.querySelectorAll(".jupyter-mark-in, .jupyter-mark-out");
    for (let mark of marks) {
        
        if (mark.className == "jupyter-mark-in") {
            num++;
            mark.innerHTML = "In [" + (num).toString() + "]:";
        }
        else if (mark.className == "jupyter-mark-out")
            mark.innerHTML = "Out[" + (num).toString() + "]:";
        else
            continue;
    }
}


function renderFormula() {
    // for (let elem of document.getElementsByClassName("MathJax")) {
    //     elem.oncontextmenu = null;
    // }
}



function addScollbarForMath() {
    // 获取数学公式容器和内容元素
    let [mathContainer] = document.getElementsByClassName('entry');
    let mathContents = document.getElementsByClassName('math');

    for (let mathContent of mathContents)
        // 检测是否需要滚动条
        if (mathContent.offsetWidth > mathContainer.offsetWidth) {
            // 如果容器宽度小于内容宽度，显示滚动条
            mathContainer.style.overflowX = 'auto';
        }
}



function addReadingProgressBar(backgroundColor) {

    let progressBar = document.getElementById('reading-progress');
    if (!progressBar)
        return;

    progressBar.style.backgroundColor = backgroundColor;

    function ReadingProgressBarUpdater() {
        let pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let scrollAvail = pageHeight - windowHeight;
        window.onscroll = function () {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            progressBar.style.width = (scrollTop / scrollAvail) * 100 + '%';
        };
    }
    window.onload = () => ReadingProgressBarUpdater();
    window.onresize = () => ReadingProgressBarUpdater();
    ReadingProgressBarUpdater();
}

/**
 * 
 */
function adjustImageSize() {
    for (let elem of document.querySelectorAll('.entry figure img')) {
        if (!elem.hasAttribute('width') && !elem.hasAttribute('height'))
            elem.width = elem.naturalWidth / window.devicePixelRatio;
    }
}



/**
 * Add table of contents to `#toc`
 * @param {string} targetId
 * @returns null
 */
function addTableOfContents(targetId) {
    let destnode = document.getElementById(targetId);
    if (!destnode) return;
    let titles = document.querySelectorAll(".entry h2, .entry h3, .entry h4");
    let tocHtml = '<ul>';
    let sections = [0, 0, 0];
    for (let title of titles) {
        switch (title.tagName) {
            case 'H2':
                if (!sections[0])  // first
                    ;
                else {
                    if (sections[1]) { // close <h3>
                        sections[1] = 0;
                        tocHtml += '</ul></li>'
                    }
                    if (sections[2]) {  // close <h4>
                        sections[2] = 0;
                        tocHtml += '</ul></li>'
                    }                
                }

                sections[0] += 1;
                if (!title.id) {
                    title.id = 'toc-' + sections.join('-');
                }
                tocHtml += '<li><a href="#' + title.id + '">' + title.innerHTML + '</a>';
                break;
            case 'H3':
                if (!sections[1])  // first
                    tocHtml += '<ul>'
                else {
                    tocHtml += '</li>'
                    if (sections[2]) {
                            sections[2] = 0;
                            tocHtml += '</ul></li>'
                        }
                }


                sections[1] += 1;
                title.id = 'toc-' + sections.join('-');
                tocHtml += '<li><a href="#' + title.id + '">' + title.innerHTML + '</a>';
                break;
            case 'H4':
                if (!sections[2])  // first
                    tocHtml += '<ul>'
                
                sections[2] += 1;
                title.id = 'toc-' + sections.join('-');
                tocHtml += '<li><a href="#' + title.id + '">' + title.innerHTML + '</a></li>';
                break;
        }
        
    }
    tocHtml += '</ul>';
    destnode.innerHTML = tocHtml;
	
}


(function() {
    window.addEventListener('DOMContentLoaded', function() {
        adjustImageSize();
    })
})()

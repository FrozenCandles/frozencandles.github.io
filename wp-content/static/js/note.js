

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


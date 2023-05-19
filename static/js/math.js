
const mathWidget = {
    renderDefinition: function() {
        let defBlocks = document.getElementsByClassName('math-widget-definition');

        defCounts = {
            'Definition': 1
        };

        for (let defBlock of defBlocks) {
            beforeContent = defBlock.getAttribute('data-before');
            if (!beforeContent) {
                continue;
            }
            if (beforeContent in defCounts) {
                num = defCounts[beforeContent]++;
            }
            else {
                num = 1;
                defCounts[beforeContent] = 1;
            }

            let newElem = document.createElement("DIV")
            newElem.className = 'math-widget-definition_before'
            let textElem = document.createTextNode(beforeContent + ' ' + num.toString());
            newElem.appendChild(textElem);
            defBlock.insertBefore(newElem, defBlock.childNodes[0]);
        }
    }
}

let paths = document.querySelectorAll('path');
const nameLabel = document.getElementById('name');
const dataLabel = document.getElementById('label')

paths.forEach(path => {
    path.classList.add('paths') });

document.querySelectorAll('.paths').forEach(e => {
    e.addEventListener('mouseenter', function(){
        e.classList.add('mouse-in');
        nameLabel.classList.add('showName');
        dataLabel.classList.toggle('showLabel');
        
         //add label to mouse position
        e.addEventListener('mousemove', event => {
            nameLabel.innerHTML = e.attributes[1].value;
            let size = nameLabel.id
            let x = event.clientX
            let y = event.clientY
            nameLabel.style.top = y - 170 + "px";
            nameLabel.style.left = x + 20 +"px";
        })
    });
    
    e.addEventListener('mouseout', function(){
        e.classList.remove('mouse-in');
        nameLabel.classList.remove('showName');
        nameLabel.classList.add();
        nameLabel.innerHTML = "";
        dataLabel.classList.remove('showLabel');
        dataLabel.classList.add('noShow');
    });

    e.addEventListener('click', function() {
        dataLabel.classList.toggle('labelClicked');
        dataLabel.classList.remove('showLabel');
    })
});
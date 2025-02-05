let paths = document.querySelectorAll('path');

paths.forEach(path => {
    path.classList.add('paths') });

document.querySelectorAll('.paths').forEach(e => {
    e.addEventListener('mouseenter', function(){
        e.classList.add('mouse-in');
        document.getElementById('name').classList.add('showName');
        document.getElementById('label').classList.toggle('showLabel');
        
         //add label to mouse position
        e.addEventListener('mousemove', event => {
            document.getElementById('name').innerHTML = e.attributes[1].value;
            let x = event.clientX
            let y = event.clientY
            document.getElementById('name').style.top = y + 40 + "px";
            document.getElementById('name').style.left = x + 80+"px";
        })
    });
    
    e.addEventListener('mouseout', function(){
        e.classList.remove('mouse-in');
        document.getElementById('name').classList.remove('showName');
        document.getElementById('name').classList.add();
        document.getElementById('name').innerHTML = "";
        document.getElementById('label').classList.remove('showLabel');
    });
});
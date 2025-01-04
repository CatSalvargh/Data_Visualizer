let paths = document.querySelectorAll('path');

paths.forEach(path => {
    path.classList.add('allPaths') });

document.querySelectorAll('.allPaths').forEach(e => {
    e.addEventListener('mouseenter', function(){
        e.classList.add('mouse-in');
        document.getElementById('name').classList.add('showName');
        
         //add label to mouse position
        e.addEventListener('mousemove', event => {
            document.getElementById('name').innerHTML = `${e.attributes[1].value}<br> Data goes here`;
            let x = event.clientX
            let y = event.clientY
            document.getElementById('name').style.top = y + 100 + "px";
            document.getElementById('name').style.left = x + 100+"px";
        })
    });
    
    e.addEventListener('mouseout', function(){
        e.classList.remove('mouse-in');
        document.getElementById('name').classList.remove('showName');
        document.getElementById('name').classList.add();
        document.getElementById('name').innerHTML = "";
    });
});
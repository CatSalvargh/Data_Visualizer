let paths = document.querySelectorAll('path');
const nameLabel = document.getElementById('name');
const dataLabel = document.getElementById('label')

export let pathName; // Global, used by script
export let slowTimer = true;

export function eventhandler() {paths.forEach(path => {
    path.classList.add('paths') });

    document.querySelectorAll('.paths').forEach(e => {
        e.addEventListener('mouseenter', function(){
            e.classList.add('mouse-in');
            nameLabel.classList.add('showName');
            dataLabel.classList.toggle('showLabel');
            pathName = e.getAttribute('title')
            
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
            // dataLabel.classList.add('noShow');
        });

        e.addEventListener('click', function() {
            dataLabel.classList.toggle('labelClicked');
            dataLabel.classList.remove('showLabel');
        })
    })
}

export function selectVisualization() {
    const map =  document.querySelector('.svg-container');
    const clusterS = document.getElementById('cluster');
    const buttonHtml = document.querySelector('.select-map-comp')
    const dataLabel = document.getElementById('label')

    map.classList.toggle('not-visible')
    clusterS.classList.toggle('not-visible')
    dataLabel.classList.remove('labelClicked');
      
    if (!map.classList.contains('not-visible')) {
        slowTimer = false;
        buttonHtml.innerHTML = 'See zoomable cluster'
    } else {
        buttonHtml.innerHTML = 'See interactive map'
        slowTimer = true;
    }
  }
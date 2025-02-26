let paths = document.querySelectorAll('path');
const nameLabel = document.getElementById('name');
const dataLabel = document.getElementById('label')

export let pathName; // Global, used by script
export let pathId; // Global, used by script

export function eventhandler() {paths.forEach(path => {
    path.classList.add('paths') });

    document.querySelectorAll('.paths').forEach(p => {
        p.addEventListener('mouseenter', function(){
            p.classList.add('mouse-in');
            nameLabel.classList.add('showName');
            dataLabel.classList.toggle('showLabel');
            pathName = p.getAttribute('title')
            pathId = p.getAttribute('id') // Used as ID to retrieve data for the the Country Info label

            //Event listeneres to add country Name label to mouse position once the user hovers over SVG MAp
            p.addEventListener('mousemove', e => {
                nameLabel.innerHTML = p.attributes[1].value;
                nameLabel.style.top = e.y - 140 + "px";
                nameLabel.style.left = e.x + 20 +"px";
            })
        });
        
        p.addEventListener('mouseout', function(){
            p.classList.remove('mouse-in');
            nameLabel.classList.remove('showName');
            nameLabel.classList.add();
            nameLabel.innerHTML = "";
            dataLabel.classList.remove('showLabel');
        });

        p.addEventListener('click', function() {
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
    const countryInfo = document.getElementById('countryInfo')

    map.classList.toggle('not-visible')
    clusterS.classList.toggle('not-visible')
    dataLabel.classList.remove('labelClicked');
      
    if (!map.classList.contains('not-visible')) {
        buttonHtml.innerHTML = 'See zoomable cluster'
    } else {
        buttonHtml.innerHTML = 'See interactive map'     
    }
  }
let lOption = document.querySelectorAll(".l-option li");
let lGuide = document.querySelectorAll('.l-guide li');


lOption.forEach((option) => {
  option.addEventListener('click', (optTarget) => {
    let station = optTarget.target.innerText;
    loadStation(station);
    // ACTIVE
    lOption.forEach(hlink => hlink.classList.remove('active-station'));
    option.classList.add('active-station');
    lGuide.forEach(hlinkParent => {
      hlinkParent.querySelector('a').classList.remove('active-guide');
    });
    lGuide[0].firstElementChild.classList.add('active-guide');
  });
});

lGuide.forEach((guide) => {

  guide.addEventListener('click', (guideTarget) => {
    let guideToure = guideTarget.target.innerText;
    let station = document.querySelector('.l-head').innerText;
    loadGuide(station, guideToure);
    // active
    lGuide.forEach(hlinkParent => {
      hlinkParent.querySelector('a').classList.remove('active-guide');
    });
    guideTarget.target.classList.add('active-guide');

  });
});


function loadStation(place) {

  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'locationJSON.json', true);

  xhr.onload = function() {

    if (this.status == 200) {
      let guideList = JSON.parse(this.responseText);
      for (let i in guideList) {
        if (guideList[i].title === place) {
          // OUTPUT Area
          document.querySelector('.pic-location img').setAttribute('src', guideList[i].showcase);
          document.querySelector('.l-head').innerText = guideList[i].title;
          document.querySelector('.l-area-des').innerHTML = '<p></p>';
          document.querySelector('.l-area-des p').innerText = guideList[i].describe;
        }
      }
    }
  }

  xhr.send();
}

function loadGuide(station, guide) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', 'locationJSON.json', true);

  xhr.onload = function() {

    if (this.status == 200) {
      let guideTour = JSON.parse(this.responseText);
      for (let i in guideTour) {
        if (station === guideTour[i].title) {
          if (guide == 'Location') {
            document.querySelector('.l-area-des').innerHTML = '<p></p>';
            document.querySelector('.l-area-des p').innerText = guideTour[i].describe;
          }
          // IDEA: FOOD COURT
          if (guide == 'Food Court') {
            let tours = guideTour[i].food;
            let output = '<ul>';
            for (let i in tours){
              output +=
              '<li>' +
              '<a href ="http://'+tours[i].flink+'" target="_blank">'+tours[i].fname+'</a>'+
              '</li>';
            }
            output += '</ul>';
            document.querySelector('.l-area-des').innerHTML = output;
            document.querySelector('.l-area-des ul').classList.add('list-guide');
          }
          // IDEA: SELFIE
          if (guide == 'Selfie Location') {
            //document.querySelector('.l-area-des').innerText = guideTour[i].selfie;
            let tours = guideTour[i].selfie;
            let output = '<ul>';
            for (let i in tours){
              output +=
              '<li>' +
              '<a href ="http://'+tours[i].selfielink+'" target="_blank">'+tours[i].selfieLocation+'</a>'+
              '</li>';
            }
            output += '</ul>';
            document.querySelector('.l-area-des').innerHTML = output;
            document.querySelector('.l-area-des ul').classList.add('list-guide');
          }
          // IDEA: HOTELS
          if (guide == 'Home Stay') {
            //document.querySelector('.l-area-des').innerText = guideTour[i].hotel;
            let tours = guideTour[i].hotel;
            let output = '<ul>';
            for (let i in tours){
              output +=
              '<li>' +
              '<a href ="http://'+tours[i].hotelLink+'" target="_blank">'+tours[i].hotelName+'</a>'+
              '</li>';
            }
            output += '</ul>';
            document.querySelector('.l-area-des').innerHTML = output;
            document.querySelector('.l-area-des ul').classList.add('list-guide');
          }
        }
      }
    }
  }
  xhr.send();
}

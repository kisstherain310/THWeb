var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var thumbnail = document.getElementById('thumbnail');
  var videoContainer = document.getElementById('video-container');
  var video = document.getElementById('video');

  thumbnail.addEventListener('click', function() {
    thumbnail.style.display = 'none';
    videoContainer.style.display = 'block';
    video.play();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const langBtn = document.querySelector('.lang-btn');
  langBtn.addEventListener('click', function() {
      const currentLang = document.documentElement.lang;
      const newLang = currentLang === 'en' ? 'vi' : 'en';
      document.documentElement.lang = newLang;
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const loginBtn = document.querySelector('nav button:last-child');
  loginBtn.addEventListener('click', function() {
      window.location.href = 'login.html';
  });
});

$(document).scroll(function(){ 
  var isScrolled = $(this).scrollTop() >   $(".topBar").height();
  $(".topBar").toggleClass("scrolled", isScrolled  );
} )

function volumeToggle(button) {
  var muted = $(".previewVideo").prop("muted");
  $(".previewVideo").prop("muted", !muted);
  $(button).find("i").toggleClass("fa-volume-mute");
  $(button).find("i").toggleClass("fa-volume-up");
}

function previewEnded() {
  $(".previewVideo").toggle();
  $(".previewImage").toggle();
}

function goBack() {
window.history.back();
}

function startHideTimer() {
var timeout = null;

$(document).on("mousemove", function() {
  clearTimeout(timeout);
  $(".watchNav").fadeIn();

  timeout = setTimeout(function() {
      $(".watchNav").fadeOut();
  }, 2000);
})
}

function initVideo(videoId, username) {
  startHideTimer();
  setStartTime(videoId, username);
  updateProgressTimer(videoId, username);
}

function updateProgressTimer(videoId, username) {
addDuration(videoId, username);

var timer;

$("video").on("playing", function(event) {
  window.clearInterval(timer);
  timer = window.setInterval(function() {
            
    updateProgress(videoId , username , event.target.currentTime);    
  }, 3000);
})

.on("ended", function() {
  setFinished(videoId , username);
  window.clearInterval(timer);
})
}

function addDuration(videoId, username) {
  $.post("ajax/addDuration.php", { videoId: videoId, username: username }, function(data) {
})
}


function updateProgress(videoId , username , progress){
  $.post("ajax/updateDuration.php", { videoId: videoId, username: username , progress:progress }, function(data) {
})
}

function setFinished(videoId , username){
  $.post("ajax/setFinished.php", { videoId: videoId, username: username  }, function(data) {
  })
}

function setStartTime(videoId , username){
  $.post("ajax/getProgress.php", { videoId: videoId, username: username  }, function(data) {
    if( isNaN(data) ) {
        alert(data);
        return;
      }
      $("video").on("canplay" , function(){
        this.currentTime = data ;
        $("video").off("canplay");
      } ) 
  })
}


function restartVideo(){
  $("video")[0].currentTime = 0 ; 
  $("video")[0].play() ;  
  $(".upNext").fadeOut();
}

function watchVideo(videoId){
  window.location.href = "watch.php?id=" + videoId ;
}

function showUpNext(){
 $(".upNext").fadeIn();
}
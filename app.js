// Carrousel swap — flèches + points + swipe tactile (pattern Glow Lens)
document.querySelectorAll('[data-carousel]').forEach(function (root) {
  var track = root.querySelector('.carousel__track');
  var slides = track.children;
  var total = slides.length;
  var dotsWrap = root.querySelector('.carousel__dots');
  var idx = 0;

  for (var i = 0; i < total; i++) {
    var d = document.createElement('span');
    d.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
    dotsWrap.appendChild(d);
  }
  var dots = dotsWrap.children;

  function go(i) {
    idx = (i + total) % total;
    track.style.transform = 'translateX(-' + idx * 100 + '%)';
    for (var j = 0; j < total; j++) dots[j].classList.toggle('is-active', j === idx);
  }

  root.querySelector('.carousel__arrow--prev').addEventListener('click', function () { go(idx - 1); });
  root.querySelector('.carousel__arrow--next').addEventListener('click', function () { go(idx + 1); });

  var startX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', function (e) {
    var diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(idx + (diff > 0 ? 1 : -1));
  }, { passive: true });
});

window.onload = function() {
    var scrollToTopButton = document.getElementById("scrollToTopButton");
  
    window.onscroll = function() {
      if (document.documentElement.scrollTop > 200 || document.body.scrollTop > 200) {
        scrollToTopButton.classList.add("show");
      } else {
        scrollToTopButton.classList.remove("show");
      }
    };

    scrollToTopButton.onclick = function() {
      scrollToTop();
    };

    function scrollToTop() {
      var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
  
      if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentPosition - currentPosition / 8);
      }
    }
  };




  

  
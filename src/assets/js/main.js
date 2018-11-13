window.onload = function(){
  var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('html')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight|| g.clientHeight;

    if(w.innerWidth > 1000) {
      document.getElementById('page_section').style.minHeight = g.clientHeight - 250 - document.getElementById('footer').offsetHeight + "px";
    }  else if(w.innerWidth < 1000) {
      var t = document.getElementById('page_section').offsetWidth * 10/100 + 15;
      console.log(t);
      document.getElementById('page_section').style.minHeight = g.clientHeight - 50 - t - document.getElementById('footer').offsetHeight + "px";
    }
 };

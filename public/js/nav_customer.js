$(".nav li.has-dropdown").each(function (t, i) {
  $(this).hover(
    function () {
      $(this).addClass("current-dropdown");
    },
    function () {
      $(this).removeClass("current-dropdown");
    }
  );
});


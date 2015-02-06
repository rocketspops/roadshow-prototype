---
---

$(document).ready(function() {

  var clickableState = localStorage.getItem("clickable")

  if (clickableState == "on") {
    $("#clickable-toggle").text("Hide Clickable Areas");
    $(".clickable").show();
  } else if (clickableState == "off") {
    $("#clickable-toggle").text("Show Clickable Areas");
    $(".clickable").hide();
  } else {
    $("#clickable-toggle").text("Hide Clickable Areas");
    $(".clickable").show();
    localStorage.setItem("clickable", "on");
    var clickableState = localStorage.getItem("clickable")
  }

  $(".clickable-toggle").on("click", function (e) {
    if (clickableState == "on") {
      localStorage.setItem("clickable", "off");
      clickableState = localStorage.getItem("clickable");
      $(".clickable").hide();
      $("#clickable-toggle").text("Show Clickable Areas");
    } else if (clickableState == "off") {
      localStorage.setItem("clickable", "on");
      clickableState = localStorage.getItem("clickable");
      $("#clickable-toggle").text("Hide Clickable Areas");
      $(".clickable").show();
    }
    e.preventDefault();
  });

  $(".js-toggle").on("click",function(e) {
    var target = $(this).attr("href");
    $(this).toggleClass("active");
    $(target).toggleClass("visible");
    e.preventDefault();
  });

  $(".plan-edit-toggle").funcToggle(
    "click",
    {target: $(".plan-edit-toggle").attr("href")},
    function(e) {
      $(this).addClass("active");
      $(".plan-body").removeClass("visible");
      $(e.data.target).addClass("visible");
      e.preventDefault();
    },
    function(e) {
      $(this).removeClass("active");
      $(".plan-body").addClass("visible");
      $(e.data.target).removeClass("visible");
      e.preventDefault();
    }
  );

  $('.popout-toggle').click(function(e){
    var target = $(this).attr("href");
    window.open('{{ site.baseurl }}/' + target, '', 'width=1220, height=519');
    e.preventDefault();
  });

  $(".js-img-change").on("click",function(e) {
    var tacticsTarget = $(this).attr("data-imgChangeTactics");
    var graphsTarget = $(this).attr("data-imgChangeGraphs");
    $(tacticsTarget).siblings().removeClass("visible");
    $(graphsTarget).siblings().removeClass("visible");
    $(tacticsTarget).toggleClass("visible");
    $(graphsTarget).toggleClass("visible");
    e.preventDefault();
  });

  $(".js-link").on("click",function(e) {
    var self = $(this);
    var target = $(this).attr("href");
    $(self).parent().removeClass("visible");
    $(target).toggleClass("visible");
    e.preventDefault();
  });

  $(".js-slide-toggle").on("click",function(e) {
    var self = $(this);
    var target = $(this).attr("href");
    self.siblings('a').removeClass('active');
    $(target).siblings(".slide").slideUp();
    if (!self.hasClass("active")) {
      self.addClass("active");
      $(target).slideToggle().toggleClass("open");
    } else {
      $(target).slideToggle(function() {
        $(self).toggleClass("active");
      }).toggleClass("open");
    }
    e.preventDefault();
  });

});

var toggleMessages = function() {
  $('.messages-toggle').click();
}

var syncFolderRemote = function(folder) {
  $(folder).siblings().removeClass("visible");
  $(folder).toggleClass("visible");
}

var idOpenFolder = function() {
  var folder = $("#messages").find(".visible").attr("id");
  return folder;
}

var togglePopoverViz = function() {
  var target = $(".popover");
  if (target.is(":visible")) {
    target.hide();
  } else {
    target.show();
  }
}

$(document).ready(function() {

  $(".js-action").on("click", function(e) {
    $(this).toggleClass("is-active");
  });

  $(".js-focus").on("click", function(e) {
    $(".grid-wrapper").toggleClass("is-inFocusMode");
    $(".grid-overlay").toggleClass("is-visible");
    e.preventDefault();
  });

  $(".js-focus").funcToggle(
    "click",
    function(e) {
      $(this).text("Focus On");
      $(".grid-wrapper").addClass("is-inFocusMode");
      $(".grid-overlay").addClass("is-visible");
      e.preventDefault();
    },
    function(e) {
      $(this).text("Focus Off");
      $(".grid-wrapper").removeClass("is-inFocusMode");
      $(".grid-overlay").removeClass("is-visible");
      e.preventDefault();
    }
  );

  $(".js-focus-menu").on("click", function(e) {
    $(".focus-controls-menu").toggleClass("is-visible");
    e.preventDefault();
  });

  $(".js-flag").funcToggle(
    "click",
    function(e) {
      $(this).closest("tr").addClass("is-readyForFocusMode");
      e.preventDefault();
    },
    function(e) {
      $(this).closest("tr").removeClass("is-readyForFocusMode");
      e.preventDefault();
    }
  );

  $("input[type='checkbox']").funcToggle(
    "click",
    function(e) {
      $("li." + $(this).attr("id")).addClass("is-readyForFocusMode");
      $(this).prop("checked", true);
    },
    function(e) {
      $("li." + $(this).attr("id")).removeClass("is-readyForFocusMode");
      $(this).prop("checked", false);
    }
  );

  $("input#name").click();

  $("li:contains('Impression')").siblings("[data-label='quantity']").attr("data-unit", "impressions");
  $("li:contains('Click')").siblings("[data-label='quantity']").attr("data-unit", "clicks");

  $("li:contains('CPM')").siblings("[data-label^='media'], [data-label^='client']").attr("data-unit", "eCPM");
  $("li:contains('CPC')").siblings("[data-label^='media'], [data-label^='client']").attr("data-unit", "eCPC");

  $("table").each(function(index, elm) {

    var subtotals = {
      impressions: 0,
      clicks: 0,
      media: 0,
      "add-on": 0,
      margin: 0,
      client: 0,
      "eCPC media": 0,
      "eCPC client": 0,
      "eCPM media": 0,
      "eCPM client": 0
    };

    // Contracted column

    $(elm).find("[data-unit='impressions']").each(function () {
      var value = $(this).text();
      subtotals['impressions'] += numeral().unformat(value);
    });

    $(elm).find("[data-unit='clicks']").each(function () {
      var value = $(this).text();
      subtotals['clicks'] += numeral().unformat(value);
    });

    $(elm).find("[data-total='impressions']").text(numeral(subtotals['impressions']).format('0,0'));
    $(elm).find("[data-total='clicks']").text(numeral(subtotals['clicks']).format('0,0'));

    // Rates column

    var eCPCs_Media = $(elm).find("[data-label^='media'][data-unit='eCPC']:not([data-label*='cost'])");
    var eCPCs_Client = $(elm).find("[data-label^='client'][data-unit='eCPC']:not([data-label*='cost'])");
    var eCPMs_Media = $(elm).find("[data-label^='media'][data-unit='eCPM']:not([data-label*='cost'])");
    var eCPMs_Client = $(elm).find("[data-label^='client'][data-unit='eCPM']:not([data-label*='cost'])");

    eCPCs_Media.each(function () {
      var value = $(this).text();
      subtotals['eCPC media'] += numeral().unformat(value);
    });

    eCPCs_Client.each(function () {
      var value = $(this).text();
      subtotals['eCPC client'] += numeral().unformat(value);
    });

    eCPMs_Media.each(function () {
      var value = $(this).text();
      subtotals['eCPM media'] += numeral().unformat(value);
    });

    eCPMs_Client.each(function () {
      var value = $(this).text();
      subtotals['eCPM client'] += numeral().unformat(value);
    });


    if (eCPCs_Media.size() > 0) {
      $(elm).find("[data-total='eCPC media']").text(numeral(subtotals['eCPC media']/eCPCs_Media.size()).format('$0,0.00'));
    } else {
      $(elm).find("[data-total='eCPC media']").text("--");
    }

    if (eCPCs_Client.size() > 0) {
      $(elm).find("[data-total='eCPC client']").text(numeral(subtotals['eCPC client']/eCPCs_Client.size()).format('$0,0.00'));
    } else {
      $(elm).find("[data-total='eCPC client']").text("--");
    }

    if (eCPMs_Media.size() > 0) {
      $(elm).find("[data-total='eCPM media']").text(numeral(subtotals['eCPM media']/eCPMs_Media.size()).format('$0,0.00'));
    } else {
      $(elm).find("[data-total='eCPM media']").text("--");
    }

    if (eCPMs_Client.size() > 0) {
      $(elm).find("[data-total='eCPM client']").text(numeral(subtotals['eCPM client']/eCPMs_Client.size()).format('$0,0.00'));
    } else {
      $(elm).find("[data-total='eCPM client']").text("--");
    }

    // Costs column

    $(elm).find(".costs [data-label^='media']").each(function () {
      var value = $(this).text();
      subtotals['media'] += numeral().unformat(value);
    });

    $(elm).find("[data-label^='add-on']").each(function () {
      var value = $(this).text();
      subtotals['add-on'] += numeral().unformat(value);
    });

    $(elm).find("[data-label^='margin']").each(function () {
      var value = $(this).text();
      subtotals['margin'] += numeral().unformat(value);
    });

    $(elm).find(".costs [data-label^='client']").each(function () {
      var value = $(this).text();
      subtotals['client'] += numeral().unformat(value);
    });

    $(elm).find("[data-total^='media']").text(numeral(subtotals['media']).format('$0,0.00'));
    $(elm).find("[data-total^='add-on']").text(numeral(subtotals['add-on']).format('$0,0.00'));
    $(elm).find("[data-total^='margin']").text(numeral(subtotals['margin']).format('$0,0.00'));
    $(elm).find("[data-total^='client']").text(numeral(subtotals['client']).format('$0,0.00'));

  });
});

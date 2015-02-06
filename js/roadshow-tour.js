---
---

$(document).ready(function() {

  var clickableState = localStorage.getItem("clickable")

  $(".tour-link").on("click", function(e) {
    e.preventDefault();
  });

  var tour = new Tour({
    onStart: function() {

      $("header").slideUp();

      // Disable the Guided Tour link once the tour has started.
      $("#tour-trigger").addClass("disabled").text("Guided Tour In Progress…");

      // Prevent tour participants from interacting with clickable areas.
      $("a[class*='js-']").addClass("disabled");

      // Disable clickable area trigger and hide clickable areas
      $("#clickable-toggle").addClass("disabled");
      $(".clickable").hide();


      // If a slide toggle is open, close it and change state of trigger button.
      $(".js-slide-toggle").removeClass('active');
      $(".slide").hide();

      // Open Graphs panel, per Dave's instructions
      $(".graphs-toggle").addClass('active');
      $("#graphs").slideDown();

    },
    onEnd: function() {
      $("#tour-trigger").removeClass("disabled").text("Start Guided Tour");
      $("a[class*='js-']").removeClass("disabled");
      $("#clickable-toggle").removeClass("disabled");

      $("header").slideDown();

      // If a slide toggle is open, close it and change state of trigger button.
      $(".js-slide-toggle").removeClass('active');
      $(".slide").hide();

      // Hide any open Overlays
      $("div[id*='-overlay']").removeClass("visible");

      // Hide any open Tooltips
      $("div[id*='-tooltip']").removeClass("visible");
      $("[class*='-tooltip-toggle']").removeClass("active");

      if (clickableState == "on") {
        $(".clickable").show();
      }

      $('body').animate({ scrollTop: 0 }, 1000);

    },
    storage: false,
    template: "<div class='popover tour'>" +
                "<div class='arrow'></div>" +
                "<h3 class='popover-title'></h3>" +
                "<div class='popover-content'></div>" +
                "<div class='popover-navigation'>" +
                  "<button class='btn btn-sm btn-default' data-role='prev'>Prev</button>" +
                  "<button class='btn btn-sm btn-default' data-role='next'>Next</button>" +
                  "<button class='btn btn-sm btn-default' data-role='end'>Exit</button>" +
                "</div>" +
              "</div>",
    debug: true,
    steps: [
    { // Step 1
      content: "<p>Dave Castleton provides an overview of the CMM Campaign Details page.</p>" +
               "<audio id='step-1-audio' src='{{ site.baseurl }}/audio/01_overview.wav' controls></audio>",
      orphan: true,
      title: "Introduction",
      onShown: function() {
        var audio = $("#step-1-audio");
        $(audio).on("play", function() {
          setTimeout(function() {
            $('body').animate({ scrollTop: $(this).height() }, 5000)
                     .animate({ scrollTop: 0 }, 5000);
          }, 3000);
        });
      }
    },
    { // Step 2
      backdrop: true,
      content: "<p>The Dashboard will help you see spend allocations, flights and issues with delivery or performance.</p>" +
                "<audio id='dashboard-audio' src='{{ site.baseurl }}/audio/02a_dashboard.wav' controls></audio>",
      element: "#graphs",
      placement: "bottom",
      title: "Dashboard Overview",
      onShown: function() {
        $(".graphs-toggle").addClass("z-10000");
      },
      onHidden: function () {
        $(".graphs-toggle").removeClass("z-10000");
      }
    },
    { // Step 3
      content: "<p>The Dashboard will also be interactive—these won’t just be graphs and charts to send to your client.</p>",
      element: "#step-2",
      placement: "bottom",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
      }
    },
    { // Step 4
      backdrop: true,
      content: "<p>Clicking on a graph will filter your tactics to show only those associated with your selection.</p>" +
                "<audio src='{{ site.baseurl }}/audio/02b_dashboard.wav' controls></audio>",
      element: "#plan-body",
      placement: "top",
      title: "Dashboard Filters",
      onNext: function() {
        $("#graphs-toggle").click();
      }
    },
    { // Step 5
      content: "<p>CMM will allow you to research vendors right from your campaign.</p>",
      element: "#research-toggle",
      placement: "left",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
      },
      onPrev: function() {
        $("#graphs-toggle").click();
      }
    },
    { // Step 6
      backdrop: true,
      content: "<p>" +
                 "Lookup media partners and explore options for your campaign by " +
                 "searching categories, DMAs and vendor capabilities." +
               "</p>" +
               "<audio src='{{ site.baseurl }}/audio/03_vendor_search.wav' controls></audio>",
      element: "#research",
      placement: "bottom",
      title: "Vendor Research",
      onShown: function() {
        $(".research-toggle").addClass("z-10000");
      },
      onHidden: function () {
        $(".research-toggle").removeClass("z-10000");
      },
      onNext: function() {
        $("#research-toggle").click();
      },
      onPrev: function() {
        $("#research-toggle").click();
      }
    },
    { // Step 7
      content: "<p>" +
                 "With CMM, you can correspond with publishers, clients and team " +
                 "members without relying on an external email client." +
               "</p>",
      element: "#messages-toggle",
      placement: "left",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
      },
      onPrev: function() {
        $("#research-toggle").click();
      }
    },
    { // Step 8
      backdrop: true,
      content: "<p>" +
                 "The Campaign message center is the collaboration hub for the " +
                 "campaign. Teams can see a campaign’s entire communication history " +
                 "stored in one place." +
               "</p>" +
               "<audio id='step-8-audio' src='{{ site.baseurl }}/audio/04_message_center.wav' controls></audio>",
      element: "#messages",
      placement: "bottom",
      title: "Message Center",
      onShown: function() {
        var audio = $("#step-8-audio");
        $(audio).on("play", function() {
          setTimeout(function() {
            $('.messages-scroll').animate({ scrollTop: $(this).height() }, 3000)
            .animate({ scrollTop: 0 }, 3000);
          }, 3000);
        });
        $(".messages-toggle").addClass("z-10000");
      },
      onHidden: function() {
        $(".messages-toggle").removeClass("z-10000");
      },
      onNext: function() {
        $("#messages-toggle").click();
      },
      onPrev: function() {
        $("#messages-toggle").click();
      }
    },
    { // Step 9
      content: "<p>The Plans Tab is where you’ll see all your tactics, manage plan versions, and create client proposals.</p>" +
               "<audio src='{{ site.baseurl }}/audio/05a_plans_tab.wav' controls></audio>",
      element: "#tour-plan-link",
      placement: "right",
      title: "Plans Tab",
      onShown: function() {
        $('body').animate({ scrollTop: 0 }, 1000);
      },
      onNext: function() {
        $(".plan-tooltip-toggle").click();
      },
      onPrev: function() {
        $("#messages-toggle").click();
      }
    },
    { // Step 10
      content: "<p>In CMM, you can create as many Plan versions as you’d like.</p>" +
               "<audio src='{{ site.baseurl }}/audio/05b_plan_versions.wav' controls></audio>",
      element: "#plan-tooltip",
      placement: "right",
      title: "Plan Versions",
      onPrev: function() {
        $(".plan-tooltip-toggle").click();
      },
      onNext: function() {
        $(".plan-tooltip-toggle").click();
      }
    },
    { // Step 11
      content: "<p>" +
                 "Using CMM’s RFP tool, you can select contacts, set budgets, " +
                 "adjust details and attach zip lists without navigating away " +
                 "from your campaign." +
               "</p>",
      element: "#rfp-overlay-toggle",
      placement: "left",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
      },
      onPrev: function() {
        $(".plan-tooltip-toggle").click();
      }
    },
    { // Step 12
      content: "<p>" +
                 "Once you’ve created a consideration set of media partners " +
                 "send RFPs to one, a few, or all of them at once." +
               "</p>" +
               "<audio src='{{ site.baseurl }}/audio/06_rfp_select_vendors.wav' controls></audio>",
      element: "#rfp-modal",
      placement: "left",
      title: "Send RFP",
      onPrev: function() {
        $("#rfp-overlay-toggle").click();
      },
      onNext: function() {
        $(".rfp-overlay-nested-panel-toggle").click();
      }
    },
    { // Step 13
      content: "<p>Select contacts, set budgets, adjust the RFP details, attach zip lists all right here.</p>" +
               "<audio src='{{ site.baseurl }}/audio/07_rfp_show_details_original.wav' controls></audio>",
      element: "#rfp-panel",
      placement: "right",
      title: "Toggle RFP Details",
      onPrev: function() {
        $(".rfp-overlay-nested-panel-toggle").click();
      },
      onNext: function() {
        $("#rfp-overlay-toggle").click();
        $("#messages-toggle").click();
      }
    },
    { // Step 14
      backdrop: true,
      content: "<p>Once you send off an RFP, it will be saved in the message center for later reference.</p>" +
               "<audio id='step-14-audio' src='{{ site.baseurl }}/audio/08_rfp_saved_in_message_center.wav' controls></audio>",
      element: "#messages",
      placement: "bottom",
      title: "Sent Messages Archive",
      onShown: function() {
        var audio = $("#step-14-audio");
        $(audio).on("play", function() {
          setTimeout(function() {
            $('.messages-scroll').animate({ scrollTop: $(this).height() }, 1500);
          }, 1000);
        });
        $(audio).on("ended", function() {
          setTimeout(function() {
            $('.messages-scroll').animate({ scrollTop: 0 }, 1500);
          }, 1000);
        });
      },
      onHide: function() {
        $('.messages-scroll').scrollTop(0);
      },
      onPrev: function() {
        $("#rfp-overlay-toggle").click();
        $("#messages-toggle").click();
      }
    },
    { // Step 15
      content: "<p>" +
                 "Once you receive RFP responses you can filter the message center " +
                 "to only show those messages." +
               "</p>",
      element: "#messages-all .rfp-link",
      placement: "bottom",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
      }
    },
    { // Step 16
      backdrop: true,
      content: "<p>" +
                 "Once you filter your messages to show your media partners’ responses, " +
                 "select the tactics you want, add them to a plan and start editing." +
               "</p>" +
               "<audio id='step-16-audio' src='{{ site.baseurl }}/audio/09_message_center_filter_rfp_responses.wav' controls></audio>",
      element: "#messages",
      placement: "bottom",
      title: "View RFP Responses",
      onShown: function () {
        var audio = $("#step-16-audio");
        $(audio).on("play", function() {
          setTimeout(function() {
            $('.messages-scroll').animate({ scrollTop: $(this).height() }, 4000);
          }, 4000);
        });
        $(audio).on("ended", function() {
          setTimeout(function() {
            $('.messages-scroll').animate({ scrollTop: 0 }, 2000);
          }, 1000);
        });
        $(".messages-toggle").addClass("z-10000");
      },
      onHidden: function () {
        $(".messages-toggle").removeClass("z-10000");
      },
      onPrev: function () {
        $("#messages-rfp .all-link").click();
      },
      onNext: function () {
        $("#messages-toggle").click();
      }
    },
    { // Step 17
      content: "<p>" +
                 "In CMM, you can easily submit IOs right from your campaign page." +
               "</p>",
      element: ".io-overlay-toggle",
      placement: "left",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
        $('body').animate({ scrollTop: 0 }, 1000);
      },
      onPrev: function () {
        $("#messages-toggle").click();
      }
    },
    { // Step 18
      content: "<p>" +
                 "Once you have a plan that your client has approved, submit " +
                 "IOs to the approved partners and as with RFPs, those submitted IOs will " +
                 "be stored in the message center." +
               "</p>" +
               "<audio src='{{ site.baseurl }}/audio/10_send_io.wav' controls></audio>",
      element: "#io-modal",
      placement: "left",
      title: "Submit IOs",
      onPrev: function() {
        $("#io-overlay-toggle").click();
      },
      onNext: function() {
        $("#io-overlay-toggle").click();
      }
    },
    { // Step 19
      content: "<p>" +
                 "Once you’re ready to build out your campaign in an Ad Server, click the export button." +
               "</p>",
      element: ".export-overlay-toggle",
      placement: "left",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
      },
      onPrev: function () {
        $("#io-overlay-toggle").click();
      }
    },
    { // Step 20
      content: "<p>" +
                 "Select the ad server you want to use, choose the " +
                 "tactics you want to export and  click send. CMM will create " +
                 "the campaign and its associated tactics directly in the Ad Server for you." +
               "</p>" +
               "<audio src='{{ site.baseurl }}/audio/11_ad_server_export.wav' controls></audio>",
      element: "#export-modal",
      placement: "left",
      title: "Export to Ad Server",
      onPrev: function() {
        $("#export-overlay-toggle").click();
      },
      onNext: function() {
        $("#export-overlay-toggle").click();
        $(".contract-link").click();
        $(".contract-tooltip-toggle").removeClass("disabled");
      }
    },
    { // Step 21
      content: "<p>" +
                 "Tactics approved by the client and vendors will show up here " +
                 "in Analytics. As the campaign goes live, fulfillment and performance " +
                 "data from the ad server will be automatically displayed. CMM will " +
                 "alert you if tactics aren’t meeting your specified KPI goals." +
               "</p>" +
               "<audio src='{{ site.baseurl }}/audio/12_analytics_tab.wav' controls></audio>",
      element: "#tour-contract-link",
      placement: "right",
      title: "Analytics Tab",
      onNext: function() {
        $(".contract-tooltip-toggle").click();
      },
      onPrev: function() {
        $(".contract-tooltip-toggle").addClass("disabled");
        $(".plan-link").click();
        $("#export-overlay-toggle").click();
      }
    },
    { // Step 22
      content: "<p>" +
                 "Each user has the ability to determine what information they " +
                 "want to see by turning columns on or off. View fulfillment data " +
                 "by itself or mix and match fulfillment with performance metrics. " +
                 "These configurations can then be saved as presets, specific to " +
                 "each user’s needs." +
               "</p>" +
               "<audio src='{{ site.baseurl }}/audio/13_column_settings.wav' controls></audio>",
      element: "#contract-tooltip",
      placement: "left",
      title: "Data Column Settings",
      onPrev: function() {
        $(".contract-tooltip-toggle").click();
      },
      onNext: function() {
        $(".contract-tooltip-toggle").click();
      }
    },
    { // Step 23
      content: "<p>" +
                 "On the Analytics tab, the Dashboard will update to display relevant information." +
               "</p>",
      element: "#graphs-toggle",
      placement: "left",
      reflex: true,
      title: "Click to continue...",
      onShown: function () {
        $("[data-role='next']").hide();
      },
      onPrev: function() {
        $(".contract-tooltip-toggle").click();
      }
    },
    { // Step 24
      backdrop: true,
      content: "<p>" +
                 "Use the dashboard again, to quickly identify potential fulfillment " +
                 "or performance issues, filter down to problem tactics and take " +
                 "action to ensure the best fulfillment and performance possible." +
               "</p>" +
               "<audio id='dashboard-audio' src='{{ site.baseurl }}/audio/14_analytics_dashboard.wav' controls></audio>",
      element: "#graphs",
      placement: "bottom",
      title: "Analytics Dashboard",
      onShown: function() {
        $(".graphs-toggle").addClass("z-10000");
      },
      onHidden: function () {
        $(".graphs-toggle").removeClass("z-10000");
      },
      onPrevious: function () {
        $(".graphs-toggle").click();
      },
      onNext: function () {
        $(".graphs-toggle").click();
      }
    },
    { // Step 25
      content: "<p>You have reached the end of the guided tour. Thank you for your attention!</p>",
      orphan: true,
      title: "Conclusion",
      onPrev: function() {
        $(".graphs-toggle").click();
      }
    }
    ]}).init();

    $("#tour-trigger").on("click",function(e) {
      if (tour.ended()) {
        tour.restart();
      } else {
        tour.start();
      }
      e.preventDefault();
    });
});

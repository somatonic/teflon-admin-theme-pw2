/**
 * JS specific to behavior of ProcessWire inputfields
 *
 */

$(document).ready(function() {

    // setup the toggles for Inputfields and the animations that occur between opening and closing
    $(".Inputfields > .Inputfield > .ui-widget-header").addClass("InputfieldStateToggle")
        .prepend("<span class='ui-icon ui-icon-triangle-1-s'></span>")
        .click(function() {
            var $li = $(this).parent('.Inputfield');
            $li.toggleClass('InputfieldStateCollapsed', 100);
            $(this).children('span.ui-icon').toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-s');

            if($.effects && $.effects['highlight']) $li.children('.ui-widget-header').effect('highlight', {}, 300);
            return false;
        })

    // use different icon for open and closed
    $(".Inputfields .InputfieldStateCollapsed > .ui-widget-header span.ui-icon")
        .removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-e');



});

$(document).ready(function() {

  //$('select').selectgroup();

  $('input[type=file]').each(function(){
    var $input = $(this);

    var $remoteinput = $('<input id="'+$input.attr('id')+'_proxy"/>');
    var $remotebutton = $('<button class="ui-button file-upload-button">'+config.translations.teflon_upload_text+'</button>');

    $input.addClass('hidden').bind("change",function(){
      var val = $(this).val();
      $remoteinput.val(val);
    });
    $remotebutton = $remotebutton.button({
          text: true,
          icons: {
            primary: "ui-icon-triangle-1-n"
          }
    });

    $input.parent().prepend($remotebutton);
    $input.parent().prepend($remoteinput);
    $remotebutton.bind('click', function(e) {
      e.preventDefault();
      $input.trigger("click");
    });
    $remoteinput.bind('click', function(e) {
      e.preventDefault();
      $input.trigger("click");
    });
  });


});
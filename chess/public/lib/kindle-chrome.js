
(function () {
  if (!window.kindle && !kindle) return;

  var screenWidth = window.screen.width;
  var screenHeight = window.screen.height;
  var dialogWidth = screenWidth * 8 / 10;
  var dialogHeight = screenHeight * 3 / 10;

  /**
   * Given an HTMLElement node, displays its contents in a new dialog. 
   * @param {HTMLElement} node node to display in new dialog
   */
  window.displayNodeInDialog = function (node) {
    // Build the template 
    var dialogTemplate = $("<div class='overlay' />").html(node);
         
    // Size it. CSS doesn't always work unless the element is attached
    // to the DOM so we have to briefly attach it.
    /*
    jQuery(document.body).append(dialogTemplate);        
    var width = dialogTemplate.outerWidth(true);
    var height = dialogTemplate.outerHeight(true);
    dialogTemplate.detach();
    */

    // We can't really touch the dialog until it's done 'loading' so setup
    // a callback to fill the contents later.
    function fillDialog(dialog) { 
      jQuery(dialog.document.body).append(dialogTemplate);
    }
    
    this.displayDialog('about:blank', dialogWidth, dialogHeight, fillDialog, true);
  }

  window.displayDialog = function(htmlLocation, width, height, dialogCallback) {
    var dialog = kindle.chrome.createDialog(htmlLocation, width, height, true, true);
    if (!dialog) return;
    jQuery(dialog).ready(dialogCallback(dialog));
  };

  window.alert = function (text) {
    var escaped = $("<div>").text(text).html();
    window.displayNodeInDialog(escaped);
  };

  window.prompt = function () {
    window.alert('prompt() is not supported');
  }
})();

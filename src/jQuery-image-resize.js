/*
 *  jQuery image resize
 *
 *  A jQuery plugin that adds resize controls to the selected jQuery
 *  elements with a simple call.
 *
 *  Example:
 *
 *      $("img").imageResize();
 *
 *  Copyright (c) jillix GmbH
 *  License: MIT License
 *
 * */

(function ($) {
    
    // $("img").imageResize();
    $.fn.imageResize = function (options) {
        
        // defaults
        var settings = {
        };
        
        // extend
        $.extend(settings, options);
        
        // get selected elements
        var $self = this;
    
        // if imageResize was already inited
        if ($self.data("imageResize")) {
            
            // destory it
            $self.trigger("imageResize.destroy");
            
            // and reinit it
            $self.imageResize(settings);
            
            // return
            return;
        }
        
        // save in image resize
        $self.data("imageResize", settings);    
            
        // wrap
        $self.wrap("<div class='jQuery-image-resize'>");
        
        // controls
        var resizeControls = [
            //$('<div class="n w"></div>'),
            //$('<div class="n e"></div>'),
            $('<div class="s e"></div>'),
            //$('<div class="s w"></div>')
        ];
    
        // wrapper
        var $resize = $self.parent()
            
            // controls
          , $resizeControls = $("<div class='controls'>");
        
        // for each resize control
        for (var i = 0; i < resizeControls.length; ++i) {
            
            // append into div
            $resizeControls.append(resizeControls[i]);
        }
    
        // append to wrapper
        $resize.append($resizeControls);
    
        // set the width to wrapper
        $resize.css("width", $self.width());
    
        // imageResize destroy
        $self.on("imageResize.destroy", function () {
            
            // delete data
            $self.data("imageResize", null);
            
            // remove controls
            var $controls = $(".controls", $self.parent());
            $controls.remove();
            
            // remove wrapper
            $self.unwrap();
            $(".jQuery-image-resize:empty").remove();
        });
        
        // initial size
        var iSize = {
            h: $resize.height(),
            w: $resize.width()
        };
        
        // start handler
        var startHandler = function (event, ui) {
            iSize = {
                h: $resize.height(),
                w: $resize.width()
            };
        };
        
        // returns the delta position
        function getDelta(event, ui) {
            return {
                x: ui.position.left - ui.originalPosition.left,
                y: ui.position.top - ui.originalPosition.top
            };
        }
        
        // right bottom control
        $resizeControls.find(".s.e").draggable({
            start: startHandler,
            drag: function (event, ui) {
                
                // get delta
                var delta = getDelta(event, ui);
                
                // update width
                $resize.add($self).css("width", iSize.w + delta.x);
                
                // if (event.ctrlKey) { return; }
                // update height
                $resize.add($self).css("height", iSize.h + delta.y);
            }
        });
    };
})($)
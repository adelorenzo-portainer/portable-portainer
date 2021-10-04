(function($) {
    $.simpleTxtSlider = function(element, options) {
        var defaults = {
            speed: 1000,
            delay: 3000,
            easing: 'swing',
            effectType: 'slide'
        }
        var param = {
            'ul': '',
            'li': '',
            'initList': '',
            'ulWidth': '',
            'liHeight': '',
            'txtsliderHook': 'txtsliderHook',
            'effect': {}
        }
        var bestslider = this;
        bestslider.settings = {}
        var $element = $(element),
            element = element;
        bestslider.init = function() {
            bestslider.settings = $.extend({}, defaults, options);
            param.ul = element.children('ul');
            param.li = element.find('li');
            param.initList = element.find('li:first');
            param.ulWidth = param.ul.width();
            param.liHeight = param.li.height();
            element.css({
                height: (param.liHeight)
            });
            param.li.css({
                top: '0',
                left: '0',
                position: 'absolute'
            });
            //dispatch
            switch (bestslider.settings.effectType) {
                case 'fade':
                    bestslider.effect.fade();
                    break;
                case 'roll':
                    bestslider.effect.roll();
                    break;
                case 'slide':
                    bestslider.effect.slide();
                    break;
            }
            bestslider.effect.exec();
        }
        bestslider.effect = {};
        bestslider.effect.exec = function() {
            param.initList.css(param.effect.init.css)
                .animate(param.effect.init.animate, bestslider.settings.speed, bestslider.settings.easing)
                .addClass(param.txtsliderHook);
            if (element.find(param.li).length > 1) {
                setInterval(function() {
                    element.find('.' + param.txtsliderHook)
                        .animate(param.effect.start.animate, bestslider.settings.speed, bestslider.settings.easing)
                        .next()
                        .css(param.effect.next.css)
                        .animate(param.effect.next.animate, bestslider.settings.speed, bestslider.settings.easing)
                        .addClass(param.txtsliderHook)
                        .end()
                        .appendTo(param.ul)
                        .css(param.effect.end.css)
                        .removeClass(param.txtsliderHook);
                }, bestslider.settings.delay);
            }
        }
        bestslider.effect.fade = function() {
            param.effect = {
                'init': {
                    'css': {
                        display: 'block',
                        opacity: '0'
                    },
                    'animate': {
                        opacity: '1',
                        zIndex: '98'
                    }
                },
                'start': {
                    'animate': {
                        opacity: '0'
                    }
                },
                'next': {
                    'css': {
                        display: 'block',
                        opacity: '0',
                        zIndex: '99'
                    },
                    'animate': {
                        opacity: '1'
                    }
                },
                'end': {
                    'css': {
                        display: 'none',
                        zIndex: '98'
                    }
                }
            }
        }
        bestslider.effect.roll = function() {
            param.effect = {
                'init': {
                    'css': {
                        top: '3em',
                        display: 'block',
                        opacity: '0'
                    },
                    'animate': {
                        top: '0',
                        opacity: '1',
                        zIndex: '98'
                    }
                },
                'start': {
                    'animate': {
                        top: '-3em',
                        opacity: '0'
                    }
                },
                'next': {
                    'css': {
                        top: '3em',
                        display: 'block',
                        opacity: '0',
                        zIndex: '99'
                    },
                    'animate': {
                        top: '0',
                        opacity: '1'
                    }
                },
                'end': {
                    'css': {
                        zIndex: '98'
                    }
                }
            }
        }
        bestslider.effect.slide = function() {
            param.effect = {
                'init': {
                    'css': {
                        left: (200),
                        display: 'block',
                        opacity: '0'
                    },
                    'animate': {
                        left: '0',
                        opacity: '1',
                        zIndex: '98'
                    }
                },
                'start': {
                    'animate': {
                        left: (-(200)),
                        opacity: '0'
                    }
                },
                'next': {
                    'css': {
                        left: (param.ulWidth),
                        display: 'block',
                        opacity: '0',
                        zIndex: '99'
                    },
                    'animate': {
                        left: '0',
                        opacity: '1'
                    }
                },
                'end': {
                    'css': {
                        zIndex: '98'
                    }
                }
            }
        }
        bestslider.init();
    }
    $.fn.simpleTxtSlider = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('simpleTxtSlider')) {
                var bestslider = new $.simpleTiecker(this, options);
                $(this).data('simpleTxtSlider', bestslider);
            }
        });
    }
})(jQuery);

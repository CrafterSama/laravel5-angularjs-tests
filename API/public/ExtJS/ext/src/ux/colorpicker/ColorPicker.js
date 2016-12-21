/**
 * @class Ext.ux.AdvancedColorPicker
 * @extends Ext.BoxComponent This is a color picker.
 * @license: LGPLv3
 * @author: Olav Snoek (extjs id: osnoekie)
 * @constructor Creates a new ColorPicker
 * @param {Object}
 *            config Configuration options
 * @version 1.0.0
 *
 */

Ext.define('Ext.ux.colorpicker.ColorPicker', {
    extend : 'Ext.container.Container',

    alias : 'widget.ux.colorpicker',

    config : {
        hsv : {
            h : 0,
            s : 0,
            v : 0
        }
    },

    /**
     * @cfg {Number} value to init th opacity slider.
     */
    opacity: 100,

    /**
     * @cfg {Boolean} showOpacity False to hide the opacity slider in custom color tab.
     */
    showOpacity: true,

    cls: 'uxcolorpicker',

    initComponent: function() {
        var me = this;

        me.items = [{
            xtype: 'container',
            layout: {
                type: 'vbox'
            },
            items: [{
                xtype : 'container',
                itemId : 'cHue',
                cls : 'x-cp-huepicker',
                items : [{
                    xtype : 'container',
                    itemId : 'huePicker',
                    cls : 'x-cp-hueslider',
                    width : 20,
                    height : 24
                }]
            }, {
                xtype: 'container',
                items: [{
                    xtype : 'container',
                    itemId : 'cRgb',
                    width: 275,
                    cls : 'x-cp-rgbpicker',
                    items : [ {
                        xtype : 'container',
                        itemId : 'rgbPicker',
                        cls : 'x-cp-rgbslider',
                        width : 24,
                        height : 24
                    }]
                }, {
                    xtype : 'form',
                    itemId : 'cForm',
                    border : false,
                    hidden: true,
                    width: 95,
                    cls : 'x-cp-formcontainer',
                    items : [ {
                        layout : 'column',
                        border : false,
                        items : [{
                            layout : 'anchor',
                            border : false,
                            defaultType : 'numberfield',
                            hidden: true,
                            defaults : {
                                anchor : '99%',
                                labelWidth : 10,
                                value : 0,
                                minValue : 0,
                                maxValue : 255,
                                labelSeparator : '',
                                hideTrigger : true
                            },
                            columnWidth : .5,
                            items : [ {
                                fieldLabel : 'H',
                                itemId : 'iHue',
                                maxValue : 360
                            }, {
                                fieldLabel : 'S',
                                itemId : 'iSat'
                            }, {
                                fieldLabel : 'V',
                                itemId : 'iVal'
                            } ]
                        } ]
                    }]
                }]
            }, {
                xtype: 'container',
                cls : 'x-cp-opacity',
                hidden: !me.showOpacity,
                items: [{
                    layout: {
                        type: 'column'
                    },
                    items: [{
                        xtype: 'component',
                        width : 31,
                        height : 31,
                        itemId : 'cSelect',
                        autoEl: {
                            tag: 'div',
                            html: '<div class="x-cp-cSelect-background"></div>'
                        },
                        border: 1,
                        cls: 'x-cp-color'
                    }, {
                        xtype: 'slider',
                        increment: 5,
                        itemId: 'opacitySlider',
                        width: 187,
                        value: me.opacity,
                        cls: 'x-cp-slider',
                        minValue: 0,
                        maxValue: 100,
                        listeners: {
                            change: me.onOpacityChange,
                            scope: me
                        }
                    }, {
                        xtype: 'textfield',
                        itemId: 'opacityLabel',
                        width: 38,
                        readOnly: true,
                        height: 25,
                        value: me.opacity,
                        cls: 'x-cp-opacitylabel'
                    }]
                }]
            }, {
                items : [{
                    layout : 'hbox',
                    border : false,
                    defaultType : 'numberfield',
                    cls: 'x-cp-values',
                    defaults : {
                        value : 0,
                        minValue : 0,
                        maxValue : 255,
                        labelSeparator : '',
                        hideTrigger : true,
                        labelAlign: 'bottom'
                    },
                    items : [{
                        xtype : 'textfield',
                        fieldLabel : 'HEX',
                        enableKeyEvents: true,
                        width: 80,
                        itemId : 'iHexa'
                    }, {
                        fieldLabel : 'R',
                        width: 50,
                        itemId : 'iRed'
                    }, {
                        fieldLabel : 'G',
                        width: 50,
                        itemId : 'iGreen'
                    }, {
                        fieldLabel : 'B',
                        width: 50,
                        itemId : 'iBlue'
                    }]
                }]
            }]
        }];

        me.callParent();

        this.addEvents(
            /**
             * @event opacitychange
             * Event is fired when opacity value changes.
             * @param {Number} opacity
             */
            'opacitychange',

            /**
             * @event colorchange
             * Event is fired when color value changes.
             * @param {String} color The 6-digit color hex code (without the # symbol)
             */
            'colorchange'
        );
    },

    onBoxReady: function() {
        var me = this;

        me.callParent(arguments);

        me.applyOpacity(me.opacity);
        if (me.color) {
            me.applyColor(me.color);
        }
    },

    /**
     * Return curent opacity.
     * @returns {Number} opacity
     * @public
     */
    getOpacity: function() {
        return this.opacity;
    },

    /**
     * Set the opacity.
     * @param {Number} opacity
     * @public
     */
    setOpacity: function(opacity) {
        var me = this;

        if (opacity !== me.opacity) {
            me.opacity = opacity;
            me.applyOpacity(opacity);
            me.fireEvent('opacitychange', me, opacity);
        }
    },

    applyOpacity: function(opacity) {
        if (this.rendered) {
            this.down('#opacitySlider').setValue(opacity);
            this.down('#cSelect').getEl().child('.x-cp-cSelect-background').setOpacity(opacity / 100, {
                duration: 50,
                easing: 'easeIn'
            });
        }
    },

    onOpacityChange: function(slider, newValue, thumb, eOpts) {
        var me = this;

        if (me.opacity !== newValue) {
            me.setOpacity(newValue);
            me.fireEvent('opacitychange', me, newValue);
        }
    },

    constructor : function(config) {
        var me = this;

        me.initConfig(config);
        me.callParent(arguments);
        return me;
    },

    initEvents : function() {
        var me = this;
        me.callParent();

        me.down('#cRgb').getEl().on('mousedown', me.rgbClick, me);
        me.down('#cHue').getEl().on('mousedown', me.hueClick, me);
        me.down('#iHexa').on('change', function(field, newValue, oldValue) {
            if (/^[0-9a-fA-F]{6}$/.test(field.getValue(newValue))) {
                this.hexaChange();
            }
        }, me);

        me.down('#iRed').on('blur', me.rgbChange, me);
        me.down('#iGreen').on('blur', me.rgbChange, me);
        me.down('#iBlue').on('blur', me.rgbChange, me);

        me.down('#opacitySlider').on('change', function(slider, value) {
            this.down('#opacityLabel').setValue(value);
        }, me);

    },

    getColor : function() {
        var me = this, hsv = me.getHsv();
        return me.hsvToRgb(hsv.h, hsv.s, hsv.v);
    },

    setColor : function(c) {
        c = c.replace('#', '');
        if (c !== this.color) {
            this.color = c;
            this.applyColor(c);
        }
    },

    applyColor: function(color) {
        if (!/^[0-9a-fA-F]{6}$/.test(color))
            return;

        this.down('#iHexa').setValue(color);
        this.hexaChange();
    },

    rgbChange : function(input) {
        var me = this, temp = me.rgbToHsv(me.down('#iRed').getValue(), me.down('#iGreen').getValue(), me.down('#iBlue').getValue());

        me.updateMode = 'rgb';
        me.setHsv({
            h : temp[0],
            s : temp[1],
            v : temp[2]
        });
        me.updateColor();
    },

    hsvChange : function(input) {
        var me = this;
        me.updateMode = 'hsv';
        me.setHsv({
            h : me.down('#iHue').getValue(),
            s : me.down('#iSat').getValue() / 100,
            v : me.down('#iVal').getValue() / 100
        });
        me.updateColor();
    },

    hextoHsv: function(c) {
        var hsvColor = {},
            RGB = [0, 0, 0],
            hexColor = c.replace('#', ''),
            min, max, deltaColor;

        RGB[0] = parseInt(hexColor.substr(0, 2), 16) / 255;
        RGB[1] = parseInt(hexColor.substr(2, 2), 16) / 255;
        RGB[2] = parseInt(hexColor.substr(4, 2), 16) / 255;

        min = RGB[0];
        if (RGB[1] < min) {
            min = RGB[1];
        }

        if (RGB[2] < min) {
            min = RGB[2];
        }

        max = RGB[0];
        if (RGB[1] > max) {
            max = RGB[1];
        }
        if (RGB[2] > max) {
            max = RGB[2];
        }

        hsvColor.v = max;
        deltaColor = max - min;

        if (max != 0) {
            hsvColor.s = deltaColor / max;
        }
        else {
            hsvColor.s = 0;
            hsvColor.h = -1;
        }

        if (RGB[0] == max) {
            hsvColor.h = (RGB[1] - RGB[2]) / deltaColor;
        }
        else if(RGB[1] == max) {
            hsvColor.h = 2 + (RGB[2] - RGB[0]) / deltaColor;
        }
        else {
            hsvColor.h = 4 + (RGB[0] - RGB[1]) / deltaColor;
        }
        hsvColor.h *= 60;

        if(hsvColor.h < 0) {
            hsvColor.h += 360;
        }

        return hsvColor;

    },

    hexaChange : function(input) {
        var me = this,
            temp = me.rgbToHsv(me.hexToRgb(me.down('#iHexa').getValue()));

        me.updateMode = 'hexa';
        me.setHsv({
            h : temp[0],
            s : temp[1],
            v : temp[2]
        });
        me.updateColor();
    },

    hueClick : function(event, el) {
        var me = this;
        me.updateMode = 'click';
        me.moveHuePicker(event.getXY()[0] - me.down('#cHue').getEl().getLeft());
    },

    rgbClick : function(event, el) {
        var me = this, cRgb = me.down('#cRgb').getEl();
        me.updateMode = 'click';
        me.moveRgbPicker(event.getXY()[0] - cRgb.getLeft(), event.getXY()[1] - cRgb.getTop());
    },

    moveHuePicker : function(y) {
        var me = this, hsv = me.getHsv(), hp = me.down('#huePicker').getEl();

        hsv.h = Math.round(360 / 275 * (275 - y));
        hp.moveTo(me.down('#cHue').getEl().getLeft() + y - 10, hp.getTop(), true);
        me.updateRgbPicker(hsv.h);
        me.updateColor();
    },

    updateRgbPicker : function(newValue) {
        var me = this;
        me.updateMode = 'click';
        me.down('#cRgb').getEl().applyStyles({
            'backgroundColor' : '#' + me.rgbToHex(me.hsvToRgb(newValue, 100, 100))
        });
    },

    moveRgbPicker : function(x, y) {
        var me = this,
            hsv = me.getHsv(),
            cRgb = me.down('#cRgb').getEl();

        hsv.s = me.getSaturation(x);
        hsv.v = me.getVal(y);
        me.down('#rgbPicker').getEl().moveTo(cRgb.getLeft() + x - 12, cRgb.getTop() + y - 12, true);
        me.updateColor();
    },

    updateColor : function() {
        var me = this,
            hsv = me.getHsv();
        var rgb = me.hsvToRgb(hsv.h, hsv.s, hsv.v),
            color;

        if (me.updateMode != 'hexa') {
            me.down('#iHexa').setValue(me.rgbToHex(rgb));
        }

        if (me.updateMode != 'rgb') {
            me.down('#iRed').setValue(rgb[0]);
            me.down('#iGreen').setValue(rgb[1]);
            me.down('#iBlue').setValue(rgb[2]);
        }

        if (me.updateMode != 'hsv') {
            me.down('#iHue').setValue(Math.round(hsv.h));
            me.down('#iSat').setValue(Math.round(hsv.s));
            me.down('#iVal').setValue(Math.round(hsv.v));
        }

        me.down('#cSelect').getEl().child('.x-cp-cSelect-background').applyStyles({
            'background' : '#' + (color = me.rgbToHex(rgb))
        });

        if (me.updateMode != 'click') {
            var cRgb = me.down('#cRgb').getEl(),
                cHue = me.down('#cHue').getEl(),
                hp = me.down('#huePicker').getEl();

            hp.moveTo(cHue.getLeft() + me.getHPos(me.down('#iHue').getValue()) - 10 , hp.getTop(), true);
            me.down('#rgbPicker').getEl().moveTo(cRgb.getLeft() + me.getSPos(me.down('#iSat').getValue() / 100) - 12,
                cRgb.getTop() + me.getVPos(me.down('#iVal').getValue() / 100) - 12, true);

            me.updateRgbPicker(hsv.h);
        }

        if (me.color !== color) {
            me.fireEvent('colorchange', this, color.toUpperCase());
        }
    },

    setButtonColor : function(id, rgb) {
        var me = this, dq = Ext.DomQuery, invert = me.invert(rgb);
        me.down(id).getEl().applyStyles({
            'background' : '#' + me.rgbToHex(rgb)
        });
    },
    /**
     * Convert X coordinate to Saturation value
     *
     * @private
     * @param {Integer}
     *            x
     * @return {Integer}
     */
    getSaturation : function(x) {
        return (x / 275) * 100;
    },

    /**
     * Convert Y coordinate to Brightness value
     *
     * @private
     * @param {Integer}
     *            y
     * @return {Integer}
     */
    getVal : function(y) {
        return ((130 - y) / 130) * 100;
    },

    hsvToRgb : function(h, s, v) {
        if( h=="" ) h=0;
        if( s=="" ) s=0;
        if( v=="" ) v=0;
        h = parseFloat(h);
        s = parseFloat(s);
        v = parseFloat(v);
        if( h<0 ) h=0;
        if( s<0 ) s=0;
        if( v<0 ) v=0;
        if( h>=360 ) h=359;
        if( s>100 ) s=100;
        if( v>100 ) v=100;
        s/=100;
        v/=100;
        var C, hh, X, r, g, b, m;
        C = v*s;
        hh = h/60;
        X = C*(1-Math.abs(hh%2-1));
        r = g = b = 0;
        if( hh>=0 && hh<1 )
        {
            r = C;
            g = X;
        }
        else if( hh>=1 && hh<2 )
        {
            r = X;
            g = C;
        }
        else if( hh>=2 && hh<3 )
        {
            g = C;
            b = X;
        }
        else if( hh>=3 && hh<4 )
        {
            g = X;
            b = C;
        }
        else if( hh>=4 && hh<5 )
        {
            r = X;
            b = C;
        }
        else
        {
            r = C;
            b = X;
        }
        m = v-C;
        r += m;
        g += m;
        b += m;
        r *= 255;
        g *= 255;
        b *= 255;
        r = Math.floor(r);
        g = Math.floor(g);
        b = Math.floor(b);

        return [r, g, b];

    },
    /**
     * Convert a float to decimal
     *
     * @param {Float}
     *            n
     * @return {Integer}
     */
    realToDec : function(n) {
        return Math.min(255, Math.round(n * 256));
    },

    websafe : function(r, g, b) {
        var me = this;
        if (r instanceof Array) {
            return me.websafe.call(me, r[0], r[1], r[2]);
        }
        return [ me.checkSafeNumber(r), me.checkSafeNumber(g), me.checkSafeNumber(b) ];
    },

    checkSafeNumber : function(v) {
        if (!isNaN(v)) {
            v = Math.min(Math.max(0, v), 255);
            var i, next;
            for (i = 0; i < 256; i = i + 51) {
                next = i + 51;
                if (v >= i && v <= next) {
                    return (v - i > 25) ? next : i;
                }
            }
        }
        return v;
    },

    invert : function(r, g, b) {
        if (r instanceof Array) {
            return this.invert.call(this, r[0], r[1], r[2]);
        }
        return [ 255 - r, 255 - g, 255 - b ];
    },

    getSPos : function(saturation) {
        return saturation * 275;
    },

    getVPos : function(value) {
        return 130 - (value * 130);
    },

    getHPos : function(hue) {
        return 275 - hue * (275 / 360);
    },

    hexToRgb : function(hex) {
        var r, g, b;
        r = parseInt(hex.substring(0, 2), 16);
        g = parseInt(hex.substring(2, 4), 16);
        b = parseInt(hex.substring(4, 6), 16);

        return [ r, g, b ];
    },

    rgbToHex : function(r, g, b) {
        var me = this;
        if (r instanceof Array)
            return me.rgbToHex.call(me, r[0], r[1], r[2]);

        return me.toHex(r) + me.toHex(g) + me.toHex(b);
    },

    toHex : function(n) {
        n = parseInt(n, 10);
        if (isNaN(n))
            return "00";
        n = Math.max(0, Math.min(n, 255));
        return "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    },

    rgbToHsv : function(r, g, b) {
        if (r instanceof Array)
            return this.rgbToHsv.call(this, r[0], r[1], r[2]);

        r = r / 255, g = g / 255, b = b / 255;
        var M = Math.max(r, g, b),
            m = Math.min(r, g, b);

        var h, s, v;
        //
        var C = M-m;
        if( C==0 ) h=0;
        else if( M==r ) h=((g-b)/C)%6;
        else if( M==g ) h=(b-r)/C+2;
        else h=(r-g)/C+4;
        h*=60;
        if( h<0 ) h+=360;
        v = M;
        if( C==0 )
            s = 0;
        else
            s = C/v;
        s*=100;
        v*=100;

        return [ h, s, v];
    }
});
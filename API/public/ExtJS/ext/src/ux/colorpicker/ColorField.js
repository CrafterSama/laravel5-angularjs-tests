Ext.define('FusionOps.widgets.ColorField', {

    extend: 'Ext.form.field.Trigger',

    value: '',

    alias: 'widget.colorfield',

    width: 150,

    labelWidth: 60,

    editable: false,

    hiddenValue: '',


    onTriggerClick: function (event) {
        this.fireEvent('triggerclick', event);
    },

    getValue: function () {
        return this.hiddenValue;
    },

    setValue: function (color) {
        var me = this;

        me.hiddenValue = color;
        me.setFieldStyle('background-color: #' + color + '; background-image: none;');
    },


    initComponent: function () {
        var me = this,
            config = {};

        me.hiddenValue = me.value;
        me.value = '';

        Ext.apply(me, Ext.apply(me.initialConfig, config));
        me.callParent(arguments);

        me.on('triggerclick', function (event) {
            var  color = me.value.toUpperCase(),
                colourMenu = Ext.create('Ext.menu.ColorPicker', {
                    value: color,
                    listeners: {
                        select: function (picker, color) {
                            var me = this;

                            me.setValue(color);
                            me.fireEvent('change', me, color);
                        },
                        scope: me
                    }
                }),
                colors = colourMenu.picker.colors;

            if (colors.indexOf(color) == -1) {
                colors.unshift(color);
            }
            colourMenu.showAt(event.getXY());
        }, me);
    },

    onRender: function() {
        var me = this;

        if (me.value.length > 0) {
            me.setValue(me.value);
        }
        me.callParent(arguments);
    }
});

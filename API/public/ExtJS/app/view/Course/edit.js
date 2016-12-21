/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Course.edit', {
    extend: 'Ext.form.FormPanel',

    alias: 'widget.course.edit',

    itemId: 'courseEdit',

    title: 'New Course',

    padding: '40',

    url: '/courses',

    data: null,

    initComponent: function() {
    	var me = this;

    	me.items = [
            {
                xtype: 'hiddenfield',
                name: 'id',
                value: me.data ? me.data.getId('id') : null
            },
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: 'Name of Course',
                anchor: '100%',
                value: me.data ? me.data.get('name') : null
            },
            {
                xtype: 'datefield',
                name: 'date_start',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                fieldLabel: 'Date Start',
                value: me.data ? me.data.get('date_start') : null
            },
            {
                xtype: 'datefield',
                name: 'date_end',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                fieldLabel: 'Date End',
                value: me.data ? me.data.get('date_end') : null
            },
    	]
    	me.buttons = [
    		{
    			text: 'Cancel',
    			itemId: 'cancel',
    			scope: me
    		},
    		{
    			text: 'Add',
    			itemId: 'add'
    		}
    	]
        me.callParent(arguments);
    }
});
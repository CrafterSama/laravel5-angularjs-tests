/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Attendant.edit', {
    extend: 'Ext.form.FormPanel',

    alias: 'widget.attendant.edit',

    itemId: 'attendantEdit',

    title: 'New Attendant',

    padding: '40',

    url: '/attendants',

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
                fieldLabel: 'Full Name',
                anchor: '100%',
                value: me.data ? me.data.get('name') : null
            },
            {
                xtype: 'numberfield',
                name: 'identification',
                fieldLabel: 'Identification',
                anchor: '100%',
                value: me.data ? me.data.get('identification') : null
            }
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
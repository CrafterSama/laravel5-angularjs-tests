/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Signer.edit', {
    extend: 'Ext.form.FormPanel',

    alias: 'widget.signer.edit',

    itemId: 'signerEdit',

    title: 'New Signer',

    padding: '40',

    url: '/signers',

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
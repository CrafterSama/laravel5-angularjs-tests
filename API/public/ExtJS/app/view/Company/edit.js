/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Company.edit', {
    extend: 'Ext.form.FormPanel',

    alias: 'widget.company.edit',

    itemId: 'companyEdit',

    title: 'New Company',

    padding: '40',

    url: '/companies',

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
                fieldLabel: 'Name of Company',
                anchor: '100%',
                value: me.data ? me.data.get('name') : null
            },
    		{
    			xtype: 'textfield',
    			name: 'fiscal_id',
    			fieldLabel: 'Fiscal ID',
    			anchor: '100%',
    			value: me.data ? me.data.get('fiscal_id') : null
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
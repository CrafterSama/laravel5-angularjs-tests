/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Company.profile', {
	extend: 'Ext.panel.Panel',
	border: false,
	header: false,
	layout: {
		type: 'vbox',
		align: 'stretch'
	},

	alias: 'widget.company.profile',

	initComponent: function() {
		var me = this,
			tpl = new Ext.XTemplate(
				'<h1>Name: {name}</h1>'
			);

		me.items = [
			{
				xtype: 'container',
				html: tpl.apply(me.data.data),
				height: 80
			},
			{
				xtype: 'panel',
				flex: 1,
				border: false,
				items: [
				{
					xtype: 'tabpanel',
					itemId: 'mainTabs',
					border: false,
					items: [{
						xtype: 'panel',
						title: 'Dashboard',
						border: false,
						flex: 1,
						html: '<h1>Dashboard</h1>'
					}]
				}
				],
				dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					defaults: {
						scale: 'medium'
					},
					items: [
					{
						text: 'Courses',
						itemId: 'courses'
					},
					'->',
					'-',
					{
						text: 'Close Company',
						itemId: 'closecompany'
					}
					]
				}]
			}
			
		]

		me.itemId = 'companyProfile' + me.data.getId();
		
		me.callParent(arguments);
		
		me.on('activate', function() {
			sad.getApplication().currentCompany = this.data.getId();
		}, me);
	}
});
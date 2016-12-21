/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Company.list', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.company.list',

    itemId: 'companiesList',

    title: 'Companies List',

    initComponent: function() {
        var me = this;

        me.columns = {
            items: [
                {
                    text: 'Name',
                    dataIndex: 'name'
                },
                {
                    text: 'Fiscal ID',
                    dataIndex: 'fiscal_id'
                },
                {
                    text: 'Created Date',
                    dataIndex: 'created_at'
                },
                {
                    text: 'Action Buttons',
                    
                }
            ],
            defaults: {
                flex: 1
            }
        };
        me.dockedItems = [
            {
                xtype: 'toolbar',
                position: 'top',
                items: [
                    {
                        text: 'Courses',
                        itemId: 'courses'
                    },
                    '->',
                    {
                        text: 'Add Company',
                        itemId: 'addCompany'
                    },
                    {
                        text: 'Delete Company',
                        itemId: 'deleteCompany',
                        disabled: true
                    }
                ]
            }
        ]

        me.callParent(arguments);

        me.on({
            activate: function(){
                this.store.load();
            },
            selectionchange: function(panel, selections){
                var toolbar = this.getDockedItems('toolbar[dock="top"]')[0];

                toolbar.down('#deleteCompany').setDisabled(selections.length == 0);
            },
            scope: me
        });

    }
});
/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Attendant.list', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.attendant.list',

    itemId: 'attendantsList',

    title: 'Attendants List',

    initComponent: function() {
        var me = this;

        me.columns = {
            items: [
                {
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 2
                },
                {
                    text: 'Created Date',
                    dataIndex: 'created_at',
                    renderer: Ext.util.Format.dateRenderer('D d M Y'),
                    width: 150
                },
                {
                    text: 'Action Buttons',
                    
                }
            ]
        };

        me.dockedItems = [
            {
                xtype: 'toolbar',
                position: 'top',
                items: [
                    '->',
                    {
                        text: 'Add Attendant',
                        itemId: 'addAttendant'
                    },
                    {
                        text: 'Delete Attendant',
                        itemId: 'deleteAttendant',
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

                toolbar.down('#deleteAttendant').setDisabled(selections.length == 0);
            },
            afterrender: function(){
                var me = this;

                me.courseStore.on('load', function(){
                    me.store.load();
                }, me, {single: true});
                me.courseStore.load();
            },
            scope: me
        });
    }
});
/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Course.list', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.course.list',

    itemId: 'coursesList',

    title: 'Courses List',

    initComponent: function() {
        var me = this;

        me.columns = {
            items: [
                {
                    text: 'Company Name',
                    dataIndex: 'company_id',
                    renderer: function(value){
                        return this.companyStore.getById(value).get('name');
                    },
                    scope: this,
                    flex: 1
                },
                {
                    text: 'Name',
                    dataIndex: 'name',
                    flex: 2
                },
                {
                    text: 'Start Date',
                    dataIndex: 'date_start',
                    renderer: Ext.util.Format.dateRenderer('D d M Y'),
                    width: 150
                },
                {
                    text: 'End Date',
                    dataIndex: 'date_end',
                    renderer: Ext.util.Format.dateRenderer('D d M Y'),
                    width: 150
                },
                {
                    text: 'Created Date',
                    dataIndex: 'created_at',
                    renderer: Ext.util.Format.dateRenderer('D d M Y'),
                    width: 150
                },
                {
                    text: 'Action Buttons',
                    flex: 3
                    
                }
            ]
        };
        me.dockedItems = [
            {
                xtype: 'toolbar',
                position: 'top',
                items: [
                    {
                        text: 'Signers',
                        itemId: 'signers'
                    },
                    {
                        text: 'Attendants',
                        itemId: 'attendants'
                    },
                    '->',
                    {
                        text: 'Add Course',
                        itemId: 'addCourse'
                    },
                    {
                        text: 'Delete Course',
                        itemId: 'deleteCourse',
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

                toolbar.down('#deleteCourse').setDisabled(selections.length == 0);
            },
            afterrender: function(){
                var me = this;

                me.companyStore.on('load', function(){
                    me.store.load();
                }, me, {single: true});
                me.companyStore.load();
            },
            scope: me
        });
    }
});
/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.Signer.list', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.signer.list',

    itemId: 'signersList',

    title: 'Signers List',

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
                    text: 'Company Name',
                    
                },
                {
                    text: 'Course Name',
                    
                },
                {
                    text: 'Created Date',
                    dataIndex: 'created_at',
                    renderer: Ext.util.Format.dateRenderer('D d M Y'),
                    width: 150
                },
                {
                    text: 'Action Buttons',
                    xtype: 'actioncolumn',
                    items: [{
                        xtype: 'button',
                        text: 'Generate Certificate'
                    }]
                    
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
                        text: 'Add Signer',
                        itemId: 'addSigner'
                    },
                    {
                        text: 'Delete Signer',
                        itemId: 'deleteSigner',
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

                toolbar.down('#deleteSigner').setDisabled(selections.length == 0);
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
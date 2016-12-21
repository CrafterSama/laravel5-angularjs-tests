/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.view.User.list', {
    extend: 'Ext.grid.Panel',

    alias: 'widget.user.list',

    itemId: 'usersList',

    title: 'Users List',

    roleStore: null,

    initComponent: function() {
        var me = this;

        me.columns = {
            items: [
                {
                    text: 'Name',
                    dataIndex: 'name'
                },
                {
                    text: 'Email',
                    dataIndex: 'email'
                },
                {
                    text: 'Role',
                    dataIndex: 'id_rol',
                    renderer: function(value){
                        return this.roleStore.getById(value).get('name');
                    },
                    scope: this
                },
                {
                    text: 'Created Date',
                    dataIndex: 'created_at'
                }
            ],
            defaults: {
                flex: 1
            }
        };

        me.callParent(arguments);

        me.on('afterrender', function(){
            var me = this;

            me.roleStore.on('load', function(){
                me.store.load();
            }, me, {single: true});
            me.roleStore.load();
        }, me, {single: true});
    }
});
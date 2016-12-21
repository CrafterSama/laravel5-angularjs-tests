/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.controller.Attendant', {
    extend: 'Ext.app.Controller',

    views: [
        'Attendant.list',
        'Attendant.edit'
    ],

    refs: [{
        ref: 'mainTabs',
        selector: 'viewport tabpanel#mainTabs'
    },
    {
        ref: 'list',
        selector: 'viewport tabpanel#mainTabs > panel#coursesList'
    }],

    stores: ['Attendants','Courses', 'Companies'],

    init: function() {
        var me = this;
        me.control({
            // viewport top toolbar buttons
            'viewport toolbar#mainToolbar > button#attendants': {
                click: me.attendantsList
            },
            'viewport #main button#addAttendant': {
                click: me.addAttendant
            },
            'viewport #main button#deleteAttendant': {
                click: me.deleteAttendant
            },
            'viewport #attendantEdit button#cancel': {
                click: me.cancelAttendantEdit
            },
            'viewport #attendantEdit button#add': {
                click: me.postAttendantEdit
            },
            'viewport tabpanel#mainTabs > panel#attendantsList': {
                itemdblclick: me.editAttendant
            }
        });
    },

    /**
     * Shows a grid of Attendants
     */
    attendantsList: function(){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#attendantsList');
            
        if(!view){
            view = tabs.add(me.getView('Attendant.list').create({
                store: me.getStore('Attendants'),
                courseStore: me.getStore('Courses'),
                closable: true
            }));
        }
        tabs.setActiveTab(view);
    },

    /**
     * Shows a form to add Attendant
     */    
    addAttendant: function(data){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#attendantEdit');

        if(!view){
            view = tabs.add(me.getView('Attendant.edit').create({
                store: me.getStore('Attendants'),
                closable: true,
                data: data instanceof Ext.data.Record ? data : null
            }));
        }
        tabs.setActiveTab(view);   
    },

    /**
     * Delete a Attendant
     */
    deleteAttendant: function(){
        var grid = this.getList(),
            selected = grid.getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url: '/attendants/'+selected.getId(),
                method: 'DELETE',
                success: function(form, action){
                    this.store.remove(this.getSelectionModel().getSelection()[0]);
                },
                failure: function(form, action){
                    Ext.Msg.alert('Failed', action.result.error);
                },
                scope: grid
            })
    },

    /**
     * cancel Signer edit
     */
    cancelAttendantEdit: function(btn){
        btn.up('#attendantEdit').close();
    },

    /**
     * Post the new Signer
     */
    postAttendantEdit: function(btn){
        var form = btn.up('#attendantEdit').getForm(),
            values = form.getValues(),
            url = '/attendants/';

        if(values.id){
            url+='edit/'+values.id;
        }

        if(form.isValid()){
            form.submit({
                success: function(form, action){
                    form.owner.close();
                },
                failure: function(form, action){
                    Ext.Msg.alert('Failed', action.result.error);
                },
                url: url
             });
        }
    },

    /**
     * Post the new Signer
     */
     editAttendant: function(panel, data){
        this.addAttendant(data);
     }
});
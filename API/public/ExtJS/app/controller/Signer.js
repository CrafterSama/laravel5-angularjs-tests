/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.controller.Signer', {
    extend: 'Ext.app.Controller',

    views: [
        'Signer.list',
        'Signer.edit'
    ],

    refs: [{
        ref: 'mainTabs',
        selector: 'viewport tabpanel#mainTabs'
    },
    {
        ref: 'list',
        selector: 'viewport tabpanel#mainTabs > panel#coursesList'
    }],

    stores: ['Signers','Courses', 'Companies'],

    init: function() {
        var me = this;
        me.control({
            // viewport top toolbar buttons
            'viewport toolbar#mainToolbar > button#signers': {
                click: me.signersList
            },
            'viewport #main button#addSigner': {
                click: me.addSigner
            },
            'viewport #main button#deleteSigner': {
                click: me.deleteSigner
            },
            'viewport #signerEdit button#cancel': {
                click: me.cancelSignerEdit
            },
            'viewport #signerEdit button#add': {
                click: me.postSignerEdit
            },
            'viewport tabpanel#mainTabs > panel#signersList': {
                itemdblclick: me.editSigner
            }
        });
    },

    /**
     * Shows a grid of Signers
     */
    signersList: function(){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#signersList');
            
        if(!view){
            view = tabs.add(me.getView('Signer.list').create({
                store: me.getStore('Signers'),
                courseStore: me.getStore('Courses'),
                closable: true
            }));
        }
        tabs.setActiveTab(view);
    },

    /**
     * Shows a form to add Signer
     */    
    addSigner: function(data){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#signerEdit');

        if(!view){
            view = tabs.add(me.getView('Signer.edit').create({
                store: me.getStore('Signers'),
                closable: true,
                data: data instanceof Ext.data.Record ? data : null
            }));
        }
        tabs.setActiveTab(view);   
    },

    /**
     * Delete a Signer
     */
    deleteSigner: function(){
        var grid = this.getList(),
            selected = grid.getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url: '/signers/'+selected.getId(),
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
    cancelSignerEdit: function(btn){
        btn.up('#signerEdit').close();
    },

    /**
     * Post the new Signer
     */
    postSignerEdit: function(btn){
        var form = btn.up('#signerEdit').getForm(),
            values = form.getValues(),
            url = '/signers/';

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
     editSigner: function(panel, data){
        this.addSigner(data);
     }
});
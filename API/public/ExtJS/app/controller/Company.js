/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.controller.Company', {
    extend: 'Ext.app.Controller',

    views: [
        'Company.list',
        'Company.edit',
        'Company.profile'
    ],

    refs: [
    {
        ref: 'mainTabs',
        selector: 'viewport tabpanel#mainTabs'
    },
    {
        ref: 'list',
        selector: 'viewport tabpanel#mainTabs > panel#companiesList'
    }],

    stores: ['Companies'],

    init: function() {
        var me = this;
        me.control({
            // viewport top toolbar buttons
            'viewport toolbar#mainToolbar > button#companies': {
                click: me.companiesList
            },
            'viewport #main button#addCompany': {
                click: me.addCompany
            },
            'viewport #main button#deleteCompany': {
                click: me.deleteCompany
            },
            'viewport #companyEdit button#cancel': {
                click: me.cancelCompanyEdit
            },
            'viewport #companyEdit button#add': {
                click: me.postCompanyEdit
            }/*,
            'viewport tabpanel#mainTabs > panel#companiesList': {
                itemdblclick: me.editCompany
            }*/,
            'viewport tabpanel#mainTabs > panel#companiesList': {
                itemdblclick: me.viewCompany
            }
        });
    },

    /**
     * Shows a grid of companies
     */ 
    companiesList: function(){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#companiesList');

        if(!view){
            view = tabs.add(me.getView('Company.list').create({
                store: me.getStore('Companies'),
                closable: true
            }));
        }
        tabs.setActiveTab(view);
    },

    /**
     * Shows a form to add company
     */    
    addCompany: function(data){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#companyEdit');

        if(!view){
            view = tabs.add(me.getView('Company.edit').create({
                store: me.getStore('Companies'),
                closable: true,
                data: data instanceof Ext.data.Record ? data : null
            }));
        }
        tabs.setActiveTab(view);   
    },

    /**
     * Delete a Company
     */
    deleteCompany: function(){
        var grid = this.getList(),
            selected = grid.getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url: '/companies/'+selected.getId(),
                method: 'DELETE',
                success: function(form, action){
                    this.store.remove(this.getSelectionModel().getSelection()[0]);
                },
                failure: function(form, action){
                    Ext.Msg.alert('Failed', action.result.error[0]);
                },
                scope: grid
            })
    },

    /**
     * cancel company edit
     */
    cancelCompanyEdit: function(btn){
        btn.up('#companyEdit').close();
    },

    /**
     * Post the new Company
     */
    postCompanyEdit: function(btn){
        var form = btn.up('#companyEdit').getForm(),
            values = form.getValues(),
            url = '/companies/';

        if(values.id){
            url+='edit/'+values.id;
        }

        if(form.isValid()){
            form.submit({
                success: function(form, action){
                    form.owner.close();
                },
                failure: function(form, action){
                    Ext.Msg.alert('Failed', action.result.error[0]);
                },
                url: url
             });
        }
    },
    /**
     * Edit a Company
     */
     /*editCompany: function(panel, data){
        this.addCompany(data);
    },*/
    
    /**
     * View a Company profile
     */
     viewCompany: function(panel, data){
        var me = this,
        tabs = me.getMainTabs(),
        view = tabs.down('panel#companyProfile'+data.getId());

        if(!view){
            view = tabs.add(me.getView('Company.profile').create({
                data: data,
                closable: true
            }));
        }
        tabs.setActiveTab(view);
     }
});

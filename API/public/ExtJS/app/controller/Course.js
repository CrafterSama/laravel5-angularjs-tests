/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.controller.Course', {
    extend: 'Ext.app.Controller',

    views: [
        'Course.list',
        'Course.edit'
    ],

    refs: [
    {
        ref: 'mainTabs',
        selector: 'viewport tabpanel#mainTabs'
    },
    {
        ref: 'list',
        selector: 'viewport tabpanel#mainTabs > panel#coursesList'
    }],

    stores: ['Courses', 'Companies'],

    init: function() {
        var me = this;
        me.control({
            // viewport top toolbar buttons
            'viewport toolbar#mainToolbar > button#courses': {
                click: me.coursesList
            },
            'viewport #main button#addCourse': {
                click: me.addCourse
            },
            'viewport #main button#deleteCourse': {
                click: me.deleteCourse
            },
            'viewport #courseEdit button#cancel': {
                click: me.cancelCourseEdit
            },
            'viewport #courseEdit button#add': {
                click: me.postCourseEdit
            },
            'viewport tabpanel#mainTabs > panel#coursesList': {
                itemdblclick: me.editCourse
            }
        });
    },

    /**
     * Shows a grid of courses
     */
    coursesList: function(){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#coursesList');
            
        if(!view){
            view = tabs.add(me.getView('Course.list').create({
                store: me.getStore('Courses'),
                companyStore: me.getStore('Companies'),
                closable: true
            }));
        }
        tabs.setActiveTab(view);
    },

    /**
     * Shows a form to add company
     */    
    addCourse: function(data){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#courseEdit');

        if(!view){
            view = tabs.add(me.getView('Course.edit').create({
                store: me.getStore('Courses'),
                closable: true,
                data: data instanceof Ext.data.Record ? data : null
            }));
        }
        tabs.setActiveTab(view);   
    },

    /**
     * Delete a Course
     */
    deleteCourse: function(){
        var grid = this.getList(),
            selected = grid.getSelectionModel().getSelection()[0];
            Ext.Ajax.request({
                url: '/courses/'+selected.getId(),
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
     * cancel course edit
     */
    cancelCourseEdit: function(btn){
        btn.up('#courseEdit').close();
    },

    /**
     * Post the new Course
     */
    postCourseEdit: function(btn){
        var form = btn.up('#courseEdit').getForm(),
            values = form.getValues(),
            url = '/courses/';

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
     * Post the new Course
     */
     editCourse: function(panel, data){
        this.addCourse(data);
     }
});
/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.model.Attendant', {
    extend: 'Ext.data.Model',

    fields: ['id', 'name', 'identification', 'user_id', 'company_id', 'course_id', 'created_at', 'updated_at']
});
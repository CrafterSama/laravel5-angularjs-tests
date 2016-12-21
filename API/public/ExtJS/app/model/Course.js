/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.model.Course', {
    extend: 'Ext.data.Model',

    fields: ['id', 'name', 'date_start', 'date_end', 'user_id', 'company_id', 'created_at', 'updated_at']
});
Ext.define('sad.controller.Main', {
    extend: 'Ext.app.Controller',

    stores: ['Companies'],

    refs: [
    {
        ref: 'main',
        selector: 'viewport panel#main'
    }
    ],

    init: function() {
        var me = this;
        me.control({
            // viewport top toolbar buttons
            'viewport toolbar#mainToolbar > button#companiesButton': {
                menushow: me.renderCompaniesMenu
            }
        });
    },

    renderCompaniesMenu: function (button, evt) {
    	var companiesStore = this.getStore('Companies'),
    		menu =button.menu;
    	
    	companiesStore.load({
		    scope: this,
		    callback: function(records, operation, success) {
		    	var companies = [],
		    		i, company;
		    	for(i = 0; i < records.length; i++) {
		    		company = records[i];
		    		companies.push({
		    			text: company.get('name'),
		    			handler: this.openCompany,
		    			data: company, 
		    			scope: this
		    		});
		    	}
		    	companies.push('-');
		    	companies.push({
	    			text: 'Add Company',
	    			handler: this.addCompany,
	    			scope: this
	    		});
		    	menu.removeAll();
    			menu.add(companies);
		    }
		});
    },
    openCompany: function (button) {
    	var me = this,
    		data = button.data,
        	main = me.getMain(),
        	view = main.down('panel#companyProfile' + data.getId());

        if(!view){
            view = main.add(me.getView('Company.profile').create({
                data: data,
                closable: true
            }));
        }
        main.getLayout().setActiveItem(view);
    }

});

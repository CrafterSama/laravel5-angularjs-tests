<!-- Modal -->
<div class="modal fade" id="addCompanyForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			{!! Form::open(['route' => 'companies.store', 'method' => 'POST', 'class' => 'form', 'id' => 'company-store']) !!}
			<div class="modal-header text-center">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h2 class="modal-title" id="myModalLabel"><i class="fa fa-building fa-2x"></i>&nbsp;&nbsp;Add Company</h2>
			</div>
			<div class="modal-body">
				<div class="form-group">
				 	<div class="input-group"> 
            			<span class="input-group-addon"><i class="fa fa-building"></i></span>
						{!! Form::text('name', '', ['class'=> 'form-control', 'placeholder'=> 'Company Name']) !!}
					</div>
				</div>
				<div class="form-group">
					<div class="input-group"> 
            			<span class="input-group-addon"><i class="fa fa-openid"></i></span>
						{!! Form::text('fiscal_id', '', ['class'=> 'form-control', 'placeholder'=> 'Fiscal ID']) !!}
					</div>
				</div>
				<div class="form-group">
					<div class="input-group"> 
            			<span class="input-group-addon"><i class="fa fa-map"></i></span>
						{!! Form::text('address', '', ['class'=> 'form-control', 'placeholder'=> 'Address']) !!}
					</div>
				</div>
				<div class="form-group">
					<div class="input-group"> 
            			<span class="input-group-addon"><i class="fa fa-phone"></i></span>
						{!! Form::text('phone', '', ['class'=> 'form-control', 'placeholder'=> 'Phone']) !!}
					</div>
				</div>
			</div>
			<div class="modal-footer">
  				<div class="col-xs-6 col-md-6" role="group">
					<input type="submit" class="btn btn-success btn-block" value="Save" />
  				</div>
  				<div class="col-xs-6 col-md-6" role="group">
					<button type="button" class="btn btn-default btn-block" data-dismiss="modal">Close</button>
  				</div>
			</div>
			{!! Form::close() !!}
		</div>
	</div>
</div><!-- /.modal -->
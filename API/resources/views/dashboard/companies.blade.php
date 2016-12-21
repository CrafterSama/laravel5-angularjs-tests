@extends('dashboard')

@section('content')
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			Companies
			<small>Manage all companies here</small>
		</h1>
		@include('partials.breadcrumbs')
	</section>

	<!-- Main content -->
	<section class="container">

		<!-- Default box -->
		<div class="box">
			<div class="box-header with-border">
					<h3 class="box-title">Company Data Table</h3>
					<form action=""></form>
				<div class="box-tools pull-right">
					<button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
					<button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button>
				</div>
			</div>
			<div class="box-body">
				<table id="dataTable" class="table table-responsive table-striped display nowrap dataTable no-footer dtr-inline collapsed">
					<thead>
						<tr>
							<th>Name</th>
							<th>Fiscal ID</th>
							<th>Address</th>
							<th>Phone</th>
							<th>Users</th>
							<th>Created At</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						@foreach( $data as $data)
						<tr data-id="{{ $data->id }}">
							<td>{!! $data->name !!}</td>
							<td>{!! $data->fiscal_id !!}</td>
							<td>{!! $data->address !!}</td>
							<td>{!! $data->phone !!}</td>
							<td>X</td>
							<td>{!! $data->created_at !!}</td>
							<td>
								<a class="btn-edit" href="#!"><i class="fa fa-pencil fa-2x"></i></a>
								&nbsp;&nbsp;
								<a class="btn-delete" href="#!"><i class="fa fa-trash fa-2x"></i></a>
							</td>
						</tr>
						@endforeach
					</tbody>
					<thead></thead>
				</table>
				@include('forms.delete')
			</div><!-- /.box-body -->
			<!-- /.box-footer-->
		</div><!-- /.box -->
		@include('forms.company')
	</section><!-- /.content -->
</div><!-- /.content-wrapper -->

@endsection

@section('scripts')
<script>
	$(function () {
		$('#dataTable').DataTable({
			"paging": false,
			"lengthChange": false,
			"searching": true,
			"ordering": true,
			"info": false,
			"autoWidth": false,
			responsive: true,
			columnDefs: [
        	{ responsivePriority: 1, targets: 0 },
        	{ responsivePriority: 7, targets: -1 }
    		]
		});
	});
	$(document).ready(function () {
		$('.btn-add').click(function (e) {
			 $('#addCompanyForm').modal('show');
		})
		$('.btn-delete').click(function (e) {

		 	e.preventDefault();

		 	var table = $(this).parents('table'),
		 		row  = $(this).parents('tr'),
		 		id   = row.data('id'),
		 		form = $('#form-delete'),
		 		url  = form.attr('action').replace(':DATA_ID', id),
		 		data = form.serialize();

		 		row.fadeOut();

		 		$.post(url, data, function (result) {
		 			$.notify({
						title: '<strong>Data Deleted! </strong>',
						message: result.message
					},{
						type: 'success',
						placement: {
							from: 'top',
							align: 'center'
						},
					});
		 		});
		 	  
		});
		$('#company-store').submit(function(e){
                
            e.preventDefault();

            var form = $(this),
            	url = form.attr('action'),
            	data = form.serialize();
            
            $.ajax({
                type: 'POST',
                url: url, 
                data: data,
                success: function(result) {
		            $('#addCompanyForm').modal('hide');
					$.notify({
						title: '<strong>Data Saved! </strong>',
						message: result.message
					},{
						type: 'success',
						placement: {
							from: 'top',
							align: 'center'
						},
					});						                    
                }
            });

        });
	});

</script>
@endsection
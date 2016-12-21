		<ol class="breadcrumb">
			<li>
				<a href="/"><i class="fa fa-dashboard"></i> Home</a>
			</li>
			@for($i = 1; $i <= count(Request::segments()); $i++)
				<li>
					<a href="">
						{{ ucwords(Request::segment($i)) }}
					</a>
				</li>
			@endfor
		</ol>
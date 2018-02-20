'use strict';

exports.userTable=(status_list,userCount,data,draw)=>{
	console.log("iside datatable function ")
	let result = [],status;
	for(let i=data.length-1;i>=0;i--){
		if(data[i].isDeleted){
			status = `<span class="label label-sm label-danger">Deleted</span>`;
		}else{
			status = `<span class="label label-sm label-${status_list.class[data[i].status]}">${status_list.status[data[i].status]}</span>`;
		}
		result[i]={
			id:`<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">
					<input name="id[]" type="checkbox" class="checkboxes" value="${data[i]._id}"/>
					<span></span>
				</label>`,
			username: data[i].username || '-',
			email: data[i].email,
			mobile: data[i].mobile, 
			status: status,
			action: ` <td>
					<div class="btn-group">
                    <button class="btn btn-xs green dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true"> Actions
                        <i class="fa fa-angle-down"></i>
                    </button>
                    <ul class="dropdown-menu pull-right" role="menu">
                        <li>
                            <a href="#!/view-user/${data[i]._id}">
                                <i class="icon-docs"></i>View</a>
                        </li>
                          <li>
                            <a href="#!/delete-user/${data[i]._id}" >
                                <i class="icon-tag"></i> Deleted </a>
						</li>
						<li>
                            <a href="#!/edit-user/${data[i]._id}" >
                                <i class="icon-tag"></i> Edit </a>
                        </li>
                    </ul>
                        </div>
                              </td>`

		}
	}
		return {
		recordsTotal: userCount,
		data: result,
		recordsFiltered: userCount,
		draw: draw
	
	};

}
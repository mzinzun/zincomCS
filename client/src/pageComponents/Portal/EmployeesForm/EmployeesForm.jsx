import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});
function EmployeesForm(props) {
	const emptyFields = {emp_id:'',f_name:'',l_name:'',username:'',password:'',position:''};
    const [idx, setIdx] = useState(0);
    const [currentRecord, setCurrentRecord] = useState(emptyFields);
	const [tableData, setTableData] = useState([]);
	const [tableFields, setTableFields] = useState([]); // fields from Table Selected
    useEffect(() => {
		console.log('Component EmployeesForm  did Mount!');
        api.get(`/getTableData/employees`).then(results => {
			if (results.data.length>0) {
				setTableData(results.data)
				setCurrentRecord(results.data[0]);
				setTableFields(Object.keys(results.data[0]));
			} else {
				setCurrentRecord(emptyFields);
				setIdx(0);
			}
        });
    }, []);

    const handleChangeRecord = (e) => {
		// const testInt = e.target.id
		e.preventDefault();
		e.persist();
        if (e.target.id === 'next') {
            (async (e)=>{
                    const newIdx = await (idx < tableData.length - 1)?(idx + 1):idx
                    setIdx(newIdx);
                    setCurrentRecord(tableData[newIdx])
                })();
        }
        if (e.target.id === 'previous') {
            (async (e)=>{
                 const newIdx = await  (idx !=0 ) ? (idx - 1):idx
                 setIdx(newIdx);
                 setCurrentRecord(tableData[newIdx]);
             })();
		}
			if((e.target.tagName ==='TR') || (e.target.tagName ==='TD')) {
				const tableIdx = e.target.parentElement.id;
			const newIdx = tableData.findIndex(record=> record.emp_id === parseInt(tableIdx));
			setIdx(newIdx);
			setCurrentRecord(tableData[newIdx]);
			return
			};
    }
    const handleChangeInputFields = function (e) {
        const holdRecord = { ...currentRecord }
        holdRecord[e.target.name] = e.target.value;
        setCurrentRecord(holdRecord);
	}
	const resetTableData =function() {
		api.get(`/getTableData/employees`).then(results => {
			if (results.data.length>0) {
				setTableData(results.data)
				setCurrentRecord(results.data[0]);
				setTableFields(Object.keys(results.data[0]));
			} else {
				setCurrentRecord(emptyFields);
				setIdx(0);
			}
		});
	}
    const handleFormButtons = (e) => {
        e.preventDefault();
        e.persist();
        switch (e.target.id) {
            case ('new'):
                setCurrentRecord(emptyFields);
                setIdx(0);
                break;
            case ('update'):
				const payload = {...currentRecord,tableName: 'employees'};
				api.put(`/updateTable`,payload).then(response=>{
					resetTableData();
				}).catch (err=>{
					console.log('error updating products table!! error: ',err)
				});
                break;
            case ('delete'):
				const id = Object.keys(currentRecord)[0];
				const idVal = currentRecord[id];
				const load = ['employees',id,idVal]
				api.delete(`/deleteRecord/${load}`).then(response=>{
					response.data.successful&&resetTableData();
				}).catch (err=>{
					console.log('error updating products table!! error: ',err)
				});
                break;
            default: console.log('nothing')
        }
	}
    return (
	<div className = 'col-lg-9'>
		{/* Column Two */}
		<div className='row'>
			<div className="col-md-6 portalFormSection">
				<div className=''><p>Form View: Employees</p></div>
				<form>
					<div className='row justify-content-between m-2' onClick={handleChangeRecord}>
						<button type='button' id="previous" className='portalForm-btn col-3'>Prev</button>
						<button type='button' id="next" className='portalForm-btn col-3 '>Next</button>
					</div>
					<div  ><label htmlFor='emp_id'>Rec ID</label>
						<input
							name='emp_id'
							type='text'
							value={currentRecord.emp_id}
							disabled />
					</div>
					<div  ><label htmlFor='f_name'>First</label>
						<input
							name='f_name'
							type='text'
							value={currentRecord.f_name}
							onChange={handleChangeInputFields}
							 />
					</div>
					<div  ><label htmlFor='l_name'>Last</label>
						<input
							name='l_name'
							type='text'
							value={currentRecord.l_name}
							onChange={handleChangeInputFields}
							 />
					</div>
					<div  ><label htmlFor='username'>UserName</label>
						<input
							name='username'
							type='email'
							value={currentRecord.username}
							onChange={handleChangeInputFields}
							/>
					</div>
					<div  ><label htmlFor='position'>Position</label>
						<input
							name='position'
							type='text'
							value={currentRecord.position}
							onChange={handleChangeInputFields}
							 />
					</div>
					<div  ><label htmlFor='username'>Password</label>
						<input
							name='password'
							type='text'
							value={currentRecord.password}
							onChange={handleChangeInputFields}
							/>
					</div>
					<div className='row justify-content-between m-2' onClick={handleFormButtons}>
						<button type='button' id="new" className='portalForm-btn col-3'>New</button>
						<button type='button' id="update" className='portalForm-btn col-4'>Add/Update</button>
						<button type='button' id="delete" className='portalForm-btn col-3'>Delete</button>
					</div>
				</form>
			</div>
			<div className="col-md-6 portalTableSection">
			<div className=''><h3>Table: Employees</h3></div>
				<table className='table recsTable'>
				<thead>
				
					<tr>
						<td>LastName</td>
						<td>username</td>
						<td>Position</td>
					</tr>
				</thead>
				<tbody>
					{tableData.map((item,idx)=>
					
						<tr key={item.emp_id}  id={item.emp_id}onClick={handleChangeRecord}>
							<td>{item.l_name}</td>
							<td>{item.username}</td>
							<td>{item.position}</td>
						</tr>
					)}
				</tbody>
				<tfoot></tfoot>
				</table>

			
			</div>
		</div>
	</div>
 
	


        
)

}


export default withRouter(EmployeesForm);
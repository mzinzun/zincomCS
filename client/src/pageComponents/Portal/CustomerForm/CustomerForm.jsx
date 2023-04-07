import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});
function CustomerForm(props) {
    const emptyFields = {cust_id:'',fName:'',lName:'',phone:'',email:'', address:'',city:'',state:'', zip:''};
    const [idx, setIdx] = useState(0);
    const [currentRecord, setCurrentRecord] = useState(emptyFields);
	const [tableData, setTableData] = useState([]);
	const [tableFields, setTableFields] = useState([]); // fields from Table Selected
    useEffect(() => {
		console.log('Component CustomerForm  did Mount!');
		console.log('props.viewSelection',props.viewSelection)
        api.get(`/getTableData/customers`).then(results => {
			if (results.data.length>0) {
				setTableData(results.data)
				setCurrentRecord(results.data[0]);
				setTableFields(Object.keys(results.data[0]));
			} else {
				console.log('records empty');
				setCurrentRecord(emptyFields);
				setIdx(0);
			}
        });
    }, []);
    useEffect(() => {
        console.log('Component CustomerForm  did Update!');
        console.log('idx is: ', idx);
		console.log('updated Customer Form Data is: ', tableData);
		console.log('keys are: ', tableFields)
    });
   

    const handleChangeRecord = (e) => {
		console.log('clicking: ');
		const testInt = e.target.id
		e.preventDefault();
		e.persist();
        if (e.target.id === 'next') {
            (async (e)=>{
                    const newIdx = await (idx < tableData.length - 1)?(idx + 1):idx
                    setIdx(newIdx);
                    setCurrentRecord(tableData[newIdx])
				})();
				return;
		}
		console.log('when next or prev clicked, this line ignored!!');
        if (e.target.id === 'previous') {
            (async (e)=>{
                 const newIdx = await  (idx !=0 ) ? (idx - 1):idx
                 setIdx(newIdx);
                 setCurrentRecord(tableData[newIdx]);
			 })();
			 return;
		}
		if((e.target.tagName ==='TR') || (e.target.tagName ==='TD')) {
			const tableIdx = e.target.parentElement.id;
		// console.log(tableData)
		const newIdx = tableData.findIndex(record=> record.cust_id === parseInt(tableIdx));
		setIdx(newIdx);
		setCurrentRecord(tableData[newIdx]);
		return
		};
    }
    const handleChangeInputFields = function (e) {
        console.log('change occuring!');
        const holdRecord = { ...currentRecord }
        holdRecord[e.target.name] = e.target.value;
        console.log('holdRecord: ', holdRecord)
        setCurrentRecord(holdRecord);
	}
	const resetTableData =function() {
		api.get(`/getTableData/customers`).then(results => {
			console.log('New Data to use', results.data);
			setTableData(results.data)
			setCurrentRecord(results.data[0]);
			setTableFields(Object.keys(results.data[0]));
		});
	}
	
    const handleFormButtons = (e) => {
        e.preventDefault();
        e.persist();
        console.log('Form Button Pushed');
        switch (e.target.id) {
            case ('new'):
                console.log('New/Add Form Button Pushed');
                setCurrentRecord(emptyFields);
                setIdx(0);
                console.log('currentRecord', currentRecord)
                break;
            case ('update'):
				console.log('add Button Pushed');
				const updatePayload = {...currentRecord,tableName: 'customers'};
				console.log('preparing to add/update record. payload: ',updatePayload);
				api.put(`/updateTable`,updatePayload).then(response=>{
					console.log('products table update response: ',response.data)
					resetTableData();
				}).catch (err=>{
					console.log('error updating products table!! error: ',err)
				});
                break;
            case ('delete'):
				console.log('Delete Button Pushed');
				const id = Object.keys(currentRecord)[0];
				const idVal = currentRecord[id];
				const load = ['customers',id,idVal]
				api.delete(`/deleteRecord/${load}`).then(response=>{
					response.data.successful&&resetTableData();
				}).catch (err=>{
					console.log('error updating products table!! error: ',err)
				});
                break;
            default: console.log('nothing')
        }

	}
	const goSearch = (e) => {

		(e.keyCode === 13) && function (e){
			console.log('enter key pressed! Info for key: ',e)
		}
	}
    return (
	<div className = 'col-lg-9'>
		{/* Column Two */}
		<div className='row'>
			<div className="col-md-6 portalFormSection">
				<div className=''><p>Form View: Customers</p></div>
				<form>
					<div className='row justify-content-between m-2' onClick={handleChangeRecord}>
						<button type='button' id="previous" className='portalForm-btn col-3'>Prev</button>
						<button type='button' id="next" className='portalForm-btn col-3 '>Next</button>
					</div>
					<div  ><label htmlFor='cust_id'>Rec ID</label>
						<input
							name='cust_id'
							type='text'
							value={currentRecord.cust_id}
							disabled />
					</div>
					<div><label htmlFor='lName'>LastName</label>
						<input name='lName'
							type='text'
							value={currentRecord.lName}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='fName'>FirstName</label>
						<input name='fName'
							type='text'
							value={currentRecord.fName}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='email'>email</label>
						<input name='email'
							type='email'
							value={currentRecord.email}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='address'>Address</label>
						<input name='address'
							type='text'
							value={currentRecord.address}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='city'>City</label>
						<input name='city'
							type='text'
							value={currentRecord.city}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='state'>State</label>
						<input name='state'
							type='text'
							value={currentRecord.state}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='zip'>Zip</label>
						<input name='zip'
							type='text'
							value={currentRecord.zip}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='phone'>Phone</label>
						<input name='phone'
							type='text'
							value={currentRecord.phone}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div className=' row justify-content-between m-2' onClick={handleFormButtons}>
						<button type='button' id="new" className='portalForm-btn col-3'>New</button>
						<button type='button' id="update" className='portalForm-btn col-4'>Add/Update</button>
						<button type='button' id="delete" className='portalForm-btn col-3'>Delete</button>
					</div>
				</form>
			</div>
			<div className="col-md-6 portalTableSection">
			<div className=''><h3>Table: Customers</h3></div>
				<table className='table recsTable'>
				<thead>
				
					<tr>
						<td>ID</td>
						<td>Last</td>
						<td>First</td>
						<td>email</td>
					</tr>
				</thead>
				<tbody>
					{tableData.map((item,idx)=>
						<tr key={item.cust_id} id={item.cust_id} onClick={handleChangeRecord}>
							<td>{item.cust_id}</td>
							<td>{item.lName}</td>
							<td>{item.fName}</td>
							<td>{item.email}</td>
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


export default withRouter(CustomerForm);
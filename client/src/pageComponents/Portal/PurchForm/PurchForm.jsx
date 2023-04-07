import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});
function PurchForm(props) {
    const emptyFields = {cust_email:'',purchDate:'',ccType:'',cardNum:'',items:'',purch_id:''};
    const [idx, setIdx] = useState(0);
    const [currentRecord, setCurrentRecord] = useState(emptyFields);
	const [tableData, setTableData] = useState([]);
	const [tableFields, setTableFields] = useState([]); // fields from Table Selected
	const [searchField, setSearchField] = useState('');
	const _search = useRef();
    useEffect(() => {
		console.log('Component CustomerForm  did Mount!');
		console.log('props.viewSelection',props.viewSelection)
        api.get(`/getTableData/purchases`).then(results => {
			console.log('New Data to use', results.data);
			setTableData(results.data)
			setCurrentRecord(results.data[0]);
			setTableFields(Object.keys(results.data[0]));
        });
    }, []);
    useEffect(() => {
        console.log('Component CustomerForm  did Update!');
        console.log('idx is: ', idx);
		console.log('updated Customer Form Data is: ', tableData);
		console.log('keys are: ', tableFields)
    });
    const handleChangeRecord = (e) => {
		const testInt = e.target.id
        e.preventDefault();
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
		// console.log(tableData)
		const newIdx = tableData.findIndex(record=> record.purch_id === parseInt(tableIdx));
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
		api.get(`/getTableData/purchases`).then(results => {
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
				const payload = {...currentRecord,tableName: 'purchases'};
				console.log('preparing to add/update record. payload: ', payload);
				api.put(`/updateTable`,payload).then(response=>{
					console.log('products table update response: ',response.data)
					resetTableData();
				}).catch (err=>{
					console.log('error updating products table!! error: ',err)
				});
                break;
            case ('delete'):
				console.log('add Button Pushed');
				const id = Object.keys(currentRecord)[0];
				const idVal = currentRecord[id];
				const load = ['purchases',id,idVal]
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
	<div className = 'col-9'>
		{/* Column Two */}
		<div className='row'>
			<div className="col-6 portalFormSection">
				<div className=''><p>Form View: {props.viewSelection}</p>
					<div className = 'row justify-content-between'>
						<div className='col-lg-6'><label>Search
							<input type='text' 
							name = 'search'
							id='search'
							ref = {_search}
							placeholder= 'Search'
							value = {searchField}
							onChange ={(e)=>setSearchField(e.target.value)}
							onKeyDown = {goSearch}
							disabled
							/><button type='button' >Go</button></label></div>
						<div className='col-lg-6'>
						<label htmlFor="fieldNames">Select Search Field:</label>
						<select name="fieldNames" id="fieldNames" 
						onChange = {(e)=>(e.target.value !== '')?_search.current.removeAttribute("disabled"):_search.current.setAttribute("disabled",'')}>
							<option value=''>--choose Field--</option>
							{tableFields.map((field,idx)=><option key={idx} value={field}>{field}</option>)}
						</select></div>
					</div>
				</div>
				<form>
					<div className='row justify-content-between' onClick={handleChangeRecord}>
						<button type='button' id="previous" className='portalForm-btn col-3'>Prev</button>
						<button type='button' id="next" className='portalForm-btn col-3 '>Next</button>
					</div>
					
					<div  ><label htmlFor='purch_id'>Rec ID</label>
						<input
							name='purch_id'
							type='text'
							value={currentRecord.purch_id}
							disabled />
					</div>
					<div><label htmlFor='purchDate'>purchDate</label>
						<input name='purchDate'
							type='text'
							value={currentRecord.purchDate}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='cust_email'>Email</label>
						<input name='cust_email'
							type='email'
							value={currentRecord.cust_email}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='ccType'>ccType</label>
						<input name='ccType'
							type='text'
							value={currentRecord.ccType}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='cardNum'>Card#</label>
						<input name='cardNum'
							type='text'
							value={currentRecord.cardNum}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='items'>Items</label>
						<input name='items'
							type='text'
							value={currentRecord.items}
							onChange={handleChangeInputFields} /><br />
					</div>
					
					
					<div className='row justify-content-between' onClick={handleFormButtons}>
						<button type='button' id="new" className='portalForm-btn col-3'>New</button>
						<button type='button' id="update" className='portalForm-btn col-4'>Add/Update</button>
						<button type='button' id="delete" className='portalForm-btn col-3'>Delete</button>
					</div>
				</form>
			</div>
			<div className="col-6 portalTableSection">
			<div className=''><h3>Table: Purchases</h3></div>
				<table className='table recsTable'>
				<thead>
				
					<tr>
						<td>ID</td>
						<td>Date</td>
						<td>Email</td>
						<td>Items</td>
					</tr>
				</thead>
				<tbody>
					{tableData.map((item,idx)=>
						<tr key={item.purch_id} id={item.purch_id} onClick={handleChangeRecord}>
							<td>{item.purch_id}</td>
							<td>{item.purchDate}</td>
							<td>{item.cust_email}</td>
							<td>{item.items}</td>
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


export default withRouter(PurchForm);
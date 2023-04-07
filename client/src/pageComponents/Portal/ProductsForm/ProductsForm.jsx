import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});
function ProductsForm(props) {
    const emptyFields = {prod_id:'',catagory:'',name:'',descrip:'',sku:'',price:'',units: ''}
    const [idx, setIdx] = useState(0);
    const [currentRecord, setCurrentRecord] = useState(emptyFields);
	const [tableData, setTableData] = useState([]);
	const [tableFields, setTableFields] = useState([]); // fields from Table Selected
    useEffect(() => {
		console.log('Component ProductsForm  did Mount!');
		console.log('props.viewSelection',props.viewSelection)
        api.get(`/getTableData/products`).then(results => {
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
    const handleChangeRecord = (e) => {
		const testInt = e.target.id
		e.preventDefault();
		e.persist();
        if (e.target.id === 'next') {
            (async (e)=>{
                    const newIdx = await (idx < tableData.length - 1)?(idx + 1):idx
                    setIdx(newIdx);
                    setCurrentRecord(tableData[newIdx])
				})();
				return
        }
        if (e.target.id === 'previous') {
            (async (e)=>{
                 const newIdx = await  (idx !=0 ) ? (idx - 1):idx
                 setIdx(newIdx);
                 setCurrentRecord(tableData[newIdx]);
			 })();
			 return
		}
		if((e.target.tagName ==='TR') || (e.target.tagName ==='TD')) {
			const tableIdx = e.target.parentElement.id;
		const newIdx = tableData.findIndex(record=> record.prod_id === parseInt(tableIdx));
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
		api.get(`/getTableData/products`).then(results => {
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
				const payload = {...currentRecord,tableName: 'products'};
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
				const load = ['products',id,idVal]
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
			<div className="col-md-6  portalFormSection">
				<div className=' '><p>Form View: Products</p></div>
				<form>
					<div className='row justify-content-between m-2' onClick={handleChangeRecord}>
						<button type='button' id="previous" className='portalForm-btn col-3'>Prev</button>
						<button type='button' id="next" className='portalForm-btn col-3 '>Next</button>
					</div>
					<div  >
						<label htmlFor='prod_id'>Rec ID</label>
						<input
							name='prod_id'
							type='text'
							value={currentRecord.prod_id}
							disabled />
					</div>
					<div>
					<label htmlFor='sku'>SKU</label>
					<input 
						name = 'sku' 
						type = 'text'
						value = {currentRecord.sku}
						onChange = {handleChangeInputFields}/><br/>
					</div>
					<div>
						<label htmlFor = 'catagory'>Catagory</label>
						<input 
						name = 'catagory' 
						type = 'text'
						value = {currentRecord.catagory}
						onChange = {handleChangeInputFields}/><br/>
					</div>
					<div>
						<label htmlFor = 'name'>Name</label>
						<input 
						name = 'name' 
						type = 'text'
						value = {currentRecord.name}
						onChange = {handleChangeInputFields}/><br/>
					</div>
					<div>
						<label htmlFor = 'descrip'>descrip</label>
						<input 
						name = 'descrip' 
						type = 'text'
						value = {currentRecord.descrip}
						onChange = {handleChangeInputFields}/><br/>
					</div>
					<div>
						<label htmlFor = 'price'>Price</label>
						<input 
						name = 'price' 
						type = 'text'
						value = {currentRecord.price}
						onChange = {handleChangeInputFields}/><br/>
					</div>
					<div>
						<label htmlFor = 'units'>#ofUnits</label>
						<input name = 'units' 
						type = 'text'
						value = {currentRecord.units}
						onChange = {handleChangeInputFields}/><br/>
					</div>
					<div className=' row justify-content-between m-2' onClick={handleFormButtons}>
						<button type='button' id="new" className='portalForm-btn col-3'>New</button>
						<button type='button' id="update" className='portalForm-btn col-4'>Add/Update</button>
						<button type='button' id="delete" className='portalForm-btn col-3'>Delete</button>
					</div>
				</form>
			</div>
			<div className="col-md-6 portalTableSection">
			<div className=''><h4>Table: Products</h4></div>
				<table className='table recsTable'>
				<thead>
					<tr>
						<td>ID</td>
						<td>sku</td>
						<td>Name</td>
						<td>Units</td>
					</tr>
				</thead>
				<tbody  >
					{tableData.map((item)=>
						<tr key={item.prod_id} id={item.prod_id} onClick={handleChangeRecord}>
							<td>{item.prod_id}</td>
							<td>{item.sku}</td>
							<td>{item.name}</td>
							<td>{item.units}</td>
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

export default withRouter(ProductsForm);
import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
});
function CommentsForm(props) {
	const emptyFields = {comment_id:'',name:'',email:'', subject:'',comment:''};
    const [idx, setIdx] = useState(0);
    const [currentRecord, setCurrentRecord] = useState(emptyFields);
	const [tableData, setTableData] = useState([]);
	const [tableFields, setTableFields] = useState([]); // fields from Table Selected
    useEffect(() => {
		console.log('Component CommentsForm  did Mount!');
        api.get(`/getTableData/comments`).then(results => {
			console.log('New Data to use', results.data);
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
		// const testInt = e.target.id
        e.preventDefault();
        if (e.target.id === 'next') {
            (async (e)=>{
                    const newIdx = await (idx < tableData.length - 1)?(idx + 1):idx
                    setIdx(newIdx);
                    setCurrentRecord(tableData[newIdx])
				})();
				return;
        }
        if (e.target.id === 'previous') {
            (async (e)=>{
                 const newIdx = await  (idx !=0 ) ? (idx - 1):idx
                 setIdx(newIdx);
                 setCurrentRecord(tableData[newIdx]);
			 })();
			 return;
		};
		if((e.target.tagName ==='TR') || (e.target.tagName ==='TD')) {
			const tableIdx = e.target.parentElement.id;
			const newIdx = tableData.findIndex(record=> record.comment_id === parseInt(tableIdx));
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
		api.get(`/getTableData/comments`).then(results => {
			if (results.data.length>0) {
				setTableData(results.data);
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
				const payload = {...currentRecord,tableName: 'comments'};
				api.put(`/updateTable`,payload).then(response=>{
					resetTableData();
				}).catch (err=>{
					console.log('error updating products table!! error: ',err)
				});
                break;
            case ('delete'):
				const id = Object.keys(currentRecord)[0];
				const idVal = currentRecord[id];
				const load = ['comments',id,idVal]
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
				<div className=''><p>Form View: Comments</p></div>
				<form >
					<div className=' row justify-content-between m-2' onClick={handleChangeRecord}>
						<button type='button' id="previous" className='portalForm-btn col-3'>Prev</button>
						<button type='button' id="next" className='portalForm-btn col-3 '>Next</button>
					</div>
					<div  ><label htmlFor='comment_id'>Rec ID</label>
						<input
							name='comment_id'
							type='text'
							value={currentRecord.comment_id}
							disabled />
					</div>
					<div ><label htmlFor='name'>Name</label>
						<input name='name'
							type='text'
							value={currentRecord.name}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div  ><label htmlFor='fName'>Email</label>
						<input name='email'
							type='email'
							value={currentRecord.email}
							onChange={handleChangeInputFields} /><br />
					</div>
					<div><label htmlFor='email'>Comment</label>
						<textarea name = 'comment' 
							type="text" 
							value={currentRecord.comment}
							onChange = {handleChangeInputFields}
							required></textarea><br />
					</div>
					<div className=' row justify-content-between m-2' onClick={handleFormButtons}>
						<button type='button' id="new" className='portalForm-btn col-3'>New</button>
						<button type='submit' id="update" className='portalForm-btn col-4'>Add/Update</button>
						<button type='button' id="delete" className='portalForm-btn col-3'>Delete</button>
					</div>
				</form>
			</div>
			<div className="col-md-6 portalTableSection">
			<div className=''><h3>Table: Comments</h3></div>
				<table className='table recsTable'>
				<thead>
					<tr>
						<td>Name</td>
						<td>Email</td>
						<td>Subject</td>
					</tr>
				</thead>
				<tbody>
					{tableData.map((item)=>
						<tr key={item.comment_id} id={item.comment_id}onClick={handleChangeRecord}>
							<td>{item.name}</td>
							<td>{item.email}</td>
							<td>{item.subject}</td>
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

export default withRouter(CommentsForm);
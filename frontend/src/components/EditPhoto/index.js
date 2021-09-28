// Importing
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPhotoForEdit, deleteSinglePhoto} from '../../store/photo';
import { useHistory, useParams } from 'react-router-dom';
import './editPhoto.css';


function EditPhoto(){

	// gets that one only for ids
    const { photoId } = useParams();
	const photo = useSelector(state => state.photos[photoId]);

	const dispatch = useDispatch();
	const history = useHistory();
    const [title, setTitle] = useState(photo.title);

	// Cant use useEffect for an update
	const UpdateHelperFunction = (e) => {
		e.preventDefault();
		dispatch(getPhotoForEdit({title, photoId}));
		history.push(`/home`);
	}

	// Helping function for delete
	const deleteHelperFunction = (e) => {
		e.preventDefault();
		dispatch(deleteSinglePhoto(photo.id));
		history.push(`/home`);
	}


	return (
		<>
			<div className='img-container-2'>
				<img className='solo-photo' src= { photo?.imgUrl } alt= { `${photo?.title}` }/>
			</div>

			<div className='control-bar'>

				<form  onSubmit= { UpdateHelperFunction } >

					<h2 id='header'> { photo?.title } </h2>

					<div className='button-container'>
						<button type='submit' className='control-bar-button'> Save </button>
						<button className='control-bar-button' onClick= { deleteHelperFunction } > Delete </button>
					</div>

					<div className='loginInput'>
						<input
							type='text'
							className='input--container'
							placeholder='New Title'
							value= { title }
							onChange= { (e) => setTitle(e.target.value) }
							required
						/>
					</div>

				</form>

			</div>
		</>
	);
};
  
export default EditPhoto;
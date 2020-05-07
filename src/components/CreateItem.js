import React, { useState } from 'react';
import * as categoryActions from '../redux/actions/categoryActions';
import * as itemActions from '../redux/actions/itemActions';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './NavBar';
import {useFirebase} from 'react-redux-firebase';
import './styles/CreateSellItem.css';
import PageNotFound from './PageNotFound';

const CreateItem = ({ match, history }) => {
    const [ itemType, setItemType ] = useState('');
    const [ classCategory, setClassCategory ] = useState('');
    const [ condition, setCondition ] = useState('');
    const [ courseNum, setCourseNum ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ isbn, setIsbn ] = useState('');
    const [ images, setImages] = useState(null);
    const [ isValidCategory, setIsValidCategory ] = useState(false);
    const firebase = useFirebase();
    const selectedItem = useSelector((state) => state.item);
    const items = useSelector((state) => state.list.items);
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    const production = match.params.production;
    const createType = match.params.type;
    const item = match.params.item;
    const fileSizeLimit = 5;    // In MB. Adjust this appropriately

    React.useEffect(() => {
        if(!categories.loaded){
            dispatch(categoryActions.loadClassCategories());
        }
        resetState();
        dispatch(itemActions.resetState())
        if(production === 'edit'){
            let contains = false;
            for(let i = 0; i < items.length; i++){
                if(items[i].id === item){
                    contains = true;
                    dispatch(itemActions.loadItemDetails(items[i]))
                    break;
                }
            }
            if(!contains){
                dispatch(itemActions.checkFirestore(item, createType))
            }
            if(selectedItem.item){
                const actualItem = selectedItem.item
                const isBook = actualItem.itemType === 'book'
                setItemType(actualItem.itemType)
                setDescription(actualItem.description)
                setPrice(actualItem.price)
                setTitle(actualItem.title)
                setCondition(actualItem.condition)
                setClassCategory(isBook ? actualItem.classCategory : '')
                setIsbn(isBook ? actualItem.isbn : '')
                setAuthor(isBook ? actualItem.author : '')
                setCourseNum(isBook ? actualItem.courseNum : '')
                setIsValidCategory(isBook ? true : false);
            }
        }
    }, [selectedItem.item]);

    const resetState = () => {
        setItemType('');
        setClassCategory('');
        setCondition('');
        setCourseNum('');
        setTitle('');
        setAuthor('');
        setPrice('');
        setDescription('');
        setIsbn('');
        setImages(null);
    };

    const onChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        switch (name) {

            case 'changeItemType':
                setItemType(val);
                break;

            case 'changeClassCategory':
                if(val !== ''){
                   setIsValidCategory(categories.classCategories.includes(val.toLowerCase()))
                }
                setClassCategory(val);
                break;

            case 'changeCondition':
                setCondition(val);
                break;

            case 'changeIsbn':
                setIsbn(val);
                break;

            case 'changeTitle':
                setTitle(val);
                break;

            case 'changeAuthor':
                setAuthor(val);
                break;

            case 'changeCourseNum':
                setCourseNum(val);
                break;

            case 'changePrice':
                setPrice(val);
                break;

            case 'changeDescription':
                setDescription(val);
                break;

            case 'changeImage':
                const currentImages = e.target.files;
                if (currentImages.length > 3) {
                    alert('Limit: 3 images');
                    setImages(null);
                    e.target.value = null;
                    return;
                }
                let allImages = true;
                // state doesn't like FileList object, so convert to array
                let imgArray = [];
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                let sumFileSizes = 0;
                for (let i = 0; i < currentImages.length; i++) {
                    let image = currentImages[i];
                    let imageType = image['type'];
                    if (!validImageTypes.includes(imageType)) {
                        allImages = false;
                        break;
                    }
                    sumFileSizes += (image.size / 1024 / 1024); // in MB 
                    imgArray.push(image);
                }
                if (sumFileSizes > fileSizeLimit) {
                    alert(`You have exceeded the ${fileSizeLimit}MB maximum image size.`)
                    setImages(null);
                    e.target.value = null;
                    return;
                }
                if (allImages) {
                    setImages(imgArray);
                } else {
                    alert('One of the selected files was not a vaild file type');
                    setImages(null);
                    e.target.value = null;
                    // document.getElementById('exampleFormControlFile1').innerHTML = 'Invalid file type.';
                }
                break;

            default:
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        finishItem();
        document.getElementById('sell-form').reset();
        history.push(`/list/${createType}/${firebase.auth().currentUser.uid}`);
    };

    // modified createSellItem from sellActions
    const finishItem = () => {
        const data = {
            itemType,
            condition,
            title,
            price,
            description,
        }
        
        if (itemType === 'book') {
            data['isbn'] = isbn;
            data['author'] = author;
            data['courseNum'] = courseNum;
            data['classCategory'] = classCategory;
        }
        if(images) {
            data['numImages'] = images.length;
        }
        const email = firebase.auth().currentUser.email;
        const displayName = firebase.auth().currentUser.displayName;
        data['email'] = email;
        data['displayName'] = displayName;
        data['uid'] = firebase.auth().currentUser.uid;
        data['timeOfCreation'] = firebase.firestore.Timestamp.now();
        
        if(production === 'create'){
            firebase.firestore().collection(createType).add(data).then((doc) => {
                if (images) {
                    for (let i = 0; i < images.length; i++){
                        const imageType = images[i]['type'].substring(6);
                        firebase.storage().ref(`images/${doc.id + i + '.' + imageType}`).put(images[i])
                    }
                }
                resetState();
            });
        } else {
            firebase.firestore().collection(createType).update(data).then((doc) => {
                if (images) {
                    for (let i = 0; i < images.length; i++){
                        const imageType = images[i]['type'].substring(6);
                        firebase.storage().ref(`images/${doc.id + i + '.' + imageType}`).put(images[i])
                    }
                }
                resetState();
            });
        }
        
    };

    // from https://stackoverflow.com/questions/49443954/how-to-limit-the-text-filed-length-with-input-type-number-in-react-js-and-preven
    const maxLengthCheck = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    };

    const handleReset = () => {
        document.getElementById('sell-form').reset();
    };
    
    return (
        <div>
            {((createType === 'request' || createType === 'sell') && (production === 'edit' || production === 'create')) ? (
                ((selectedItem.item && selectedItem.item.uid === firebase.auth().currentUser.uid) || production === 'create') ? (
                    <React.Fragment>
                    <NavBar />
                    <form autoComplete='off' onLoadStart={handleReset} id='sell-form' onSubmit={onSubmit}>
                        <div className={'form-group text-left'}>
                            <label htmlFor='itemCategory'>
                                Item Category
                            </label>
                            <select
                                id='itemCategory'
                                className='form-control'
                                name='changeItemType'
                                value={itemType}
                                onChange={onChange}
                                required
                            >
                                <option value='' disabled hidden>
                                    {' '}
                                    -- select a type --{' '}
                                </option>
                                <option value='book'>Book</option>
                                <option value='furniture'>Furniture</option>
                            </select>
                        </div>
                        {
                            itemType === '' ? null :
                            <React.Fragment>
                                <div className="form-group text-left">
                                    <label htmlFor='title' className={'required'}>
                                        Title
                                    </label>
                                    <input
                                        type='text'
                                        id='title'
                                        className={'form-control'}
                                        value={title}
                                        name='changeTitle'
                                        onChange={onChange}
                                        required
                                        placeholder={itemType === 'book' ? "ex: The Great Gatsby" : "ex: Wooden Desk Chair"}
                                    />
                                </div>
                                {
                                    itemType === 'book' ?
                                        <React.Fragment>
                                            <div className="form-row text-left">
                                                <div className={'form-group col-md-6'}>
                                                    <label htmlFor='author' className={'required'}>
                                                        Author
                                                    </label>
                                                    <input
                                                        type='text'
                                                        id='author'
                                                        className={'form-control'}
                                                        value={author}
                                                        name='changeAuthor'
                                                        onChange={onChange}
                                                        required
                                                        placeholder={"ex: F. Scott Fitzgerald"}
                                                    />
                                                </div>
                                                <div className={'form-group col-md-6'}>
                                                    <label htmlFor='isbn' className={'required'}>
                                                        ISBN
                                                    </label>
                                                    <input
                                                        type='number'
                                                        className={'form-control'}
                                                        id='isbn'
                                                        maxLength='13'
                                                        onInput={maxLengthCheck}
                                                        max={9999999999999}
                                                        value={isbn}
                                                        name='changeIsbn'
                                                        onChange={onChange}
                                                        placeholder='1234567890'
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-row text-left">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor='classCategory' className={'required'}>Class Category</label>
                                                    <input type='text'
                                                           name='changeClassCategory'
                                                           list='classes'
                                                           className={'form-control'}
                                                           defaultValue={classCategory}
                                                           onChange={onChange}
                                                           required
                                                           placeholder="ex: BUSN"/>
                                                    <datalist id='classes'>
                                                        {classCategory === '' ? null : (
                                                            <React.Fragment>
                                                                {categories.classCategories.map(category => {
                                                                    return (category.includes(classCategory.toLowerCase()) ? (<option key={category} value={category.toUpperCase()}>{category.toUpperCase}</option>) : null )
                                                                })}
                                                            </React.Fragment>
                                                        )}

                                                    </datalist>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor='courseNum'>Course Number</label>
                                                    <input type='number'
                                                           id='courseNum'
                                                           className={'form-control'}
                                                           value={courseNum}
                                                           name='changeCourseNum'
                                                           onChange={onChange}
                                                           placeholder="ex: 100"/>
                                                </div>
                                            </div>
                                        </React.Fragment> :
                                        null
                                }
                                <div className="form-row text-left">
                                    <div className="form-group col-md-6">
                                        <label htmlFor='condition' className={"required"}>Condition</label>
                                        <select
                                            id='condition'
                                            className={'form-control'}
                                            name='changeCondition'
                                            defaultValue={condition}
                                            onChange={onChange}
                                            required
                                        >
                                            <option value='' disabled hidden>
                                                {' '}
                                                -- select a condition --{' '}
                                            </option>
                                            <option value='likeNew'>Like New</option>
                                            <option value='veryGood'>Very Good</option>
                                            <option value='good'>Good</option>
                                            <option value='decent'>Decent</option>
                                            <option value='poor'>Poor</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor='price' className={"required"}>Price</label>
                                        <div className='input-group'>
                                            <span className='input-group-addon'>$</span>
                                            <input type='number'
                                                   className={'form-control'}
                                                   id='price'
                                                   min='0'
                                                   step='0.01'
                                                   value={price}
                                                   name='changePrice'
                                                   onChange={onChange}
                                                   required
                                                   placeholder="10"/>
                                        </div>
                                    </div>
                                </div>
                            </React.Fragment>}
                        {
                            itemType === '' ? null :
                            <React.Fragment>
                                <div className={'form-group text-left'}>
                                    <label htmlFor='description'>
                                        Description
                                    </label>
                                    <textarea
                                        rows={'4'}
                                        id='description'
                                        className={'form-control'}
                                        value={description}
                                        name='changeDescription'
                                        onChange={onChange}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input
                                        type='file'
                                        className='form-control-file'
                                        id='exampleFormControlFile1'
                                        name='changeImage'
                                        multiple
                                        onChange={onChange}

                                    />
                                </div>
                                        
                                {images === null ? null : (
                                    images.map((image) => {
                                        return <img src={URL.createObjectURL(image)} alt='test' key='test'/>
                                    })    
                                )}  
                                        
                                <input
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={(itemType === 'book' && !isValidCategory)}
                                    value='Submit'
                                    id={'submit-btn'}
                                />
                            </React.Fragment>}
                    </form>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    <NavBar/>
                    <div>Item Not Found</div>
                </React.Fragment>)    
            ) : (<PageNotFound/>)}
            
        </div>
    );
};

export default CreateItem;

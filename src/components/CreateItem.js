import React, { useState } from 'react';
import * as sellActions from '../redux/actions/sellActions';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './NavBar';
import firebase from '../Firebase';
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
    const [images, setImages] = useState('');

    // const item = useSelector((state) => state.createSell);
    // const dispatch = useDispatch();
    const createType = match.params.type;

    React.useEffect(() => {
        resetState();
    }, []);

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
        setImages('');
    };

    const onChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        switch (name) {

            case 'changeItemType':
                setItemType(val);
                break;

            case 'changeClassCategory':
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
                let allImages = true;
                // state doesn't like FileList object, so convert to array
                let imgArray = [];
                const validImageTypes = [ 'image/gif', 'image/jpeg', 'image/png' ];
                for (let i = 0; i < currentImages.length; i++) {
                    let image = currentImages[i];
                    let imageType = image['type'];
                    if (!validImageTypes.includes(imageType)) {
                        allImages = false;
                        break;
                    }
                    imgArray.push(image)
                }

                if (allImages) {
                    setImages(imgArray);
                } else {
                    setImages('');
                    alert('One of the selected files was not a vaild file type');
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
        history.push(`/list/${createType}`);
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
        if(images !== '') {
            data['numImages'] = images.length + 1;
        }
        const email = firebase.auth().currentUser.email;
        const displayName = firebase.auth().currentUser.displayName;
        data['email'] = email;
        data['displayName'] = displayName;
        data['timeOfCreation'] = firebase.firestore.Timestamp.now();
        
        firebase.firestore().collection(createType === 'sell' ? 'sell' : 'buy').add(data).then((doc) => {
            if (images !== '') {
                for (let i = 0; i < images.length; i++){
                    const imageType = images[i]['type'].substring(6);
                    firebase.storage().ref(`images/${doc.id + i + '.' + imageType}`).put(images[i])
                }
            }
            resetState();
        });
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
            {(createType === 'request' || createType === 'sell') ? (
                <React.Fragment>
                    <NavBar />
                    <form autoComplete='off' onLoadStart={handleReset} id='sell-form' onSubmit={onSubmit}>
                        <div className={'form-group row'}>
                            <label htmlFor='itemCategory' className={'col-sm-2 col-form-label'}>
                                Item Category
                            </label>
                            <div className={'col-sm-10'}>
                                <select
                                    id='itemCategory'
                                    className='form-control'
                                    name='changeItemType'
                                    defaultValue=''
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
                        </div>
                        {
                            itemType === '' ? null :
                            <React.Fragment>
                                <div className={'form-group row'}>
                                    <label htmlFor='title' className={'col-sm-2 col-form-label required'}>
                                        Title
                                    </label>
                                    <div className='col-sm-10'>
                                        <input
                                            type='text'
                                            id='title'
                                            className={'form-control'}
                                            value={title}
                                            name='changeTitle'
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={'form-group row'}>
                                    <label htmlFor='condition' className={'col-sm-2 col-form-label required'}>
                                        Condition
                                    </label>
                                    <div className='col-sm-10'>
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
                                </div>
                                <div className={'form-group row'}>
                                    <label htmlFor='price' className={'col-sm-2 col-form-label required'}>
                                        Price
                                    </label>
                                    <div className='col-sm-10 input-group'>
                                        <span className='input-group-addon'>$</span>
                                        <input
                                            type='number'
                                            className={'form-control'}
                                            id='price'
                                            min='0'
                                            step='0.01'
                                            value={price}
                                            name='changePrice'
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </React.Fragment>}
        
                        {
                            itemType === 'book' ? <React.Fragment>
                                <div className={'form-group row'}>
                                    <label htmlFor='classCategory' className={'col-sm-2 col-form-label required'}>
                                        Class Category
                                    </label>
                                    <div className='col-sm-10'>
                                        <select
                                            name='changeClassCategory'
                                            className={'form-control'}
                                            defaultValue={classCategory}
                                            onChange={onChange}
                                            required
                                        >
                                            <option value='' disabled hidden>
                                                {' '}
                                                -- select a category --{' '}
                                            </option>
                                            <option value='csc'>CSC</option>
                                            <option value='math'>MATH</option>
                                            <option value='span'>SPAN</option>
                                            <option value='geog'>GEOG</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={'form-group row'}>
                                    <label htmlFor='isbn' className={'col-sm-2 col-form-label required'}>
                                        ISBN
                                    </label>
                                    <div className='col-sm-10'>
                                        <input
                                            // minLength='10'
                                            // maxLength='10'
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
                                <div className={'form-group row'}>
                                    <label htmlFor='author' className={'col-sm-2 col-form-label required'}>
                                        Author
                                    </label>
                                    <div className='col-sm-10'>
                                        <input
                                            type='text'
                                            id='author'
                                            className={'form-control'}
                                            value={author}
                                            name='changeAuthor'
                                            onChange={onChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={'form-group row'}>
                                    <label htmlFor='courseNum' className={'col-sm-2 col-form-label'}>
                                        Course #
                                    </label>
                                    <div className='col-sm-10'>
                                        <input
                                            type='number'
                                            id='courseNum'
                                            className={'form-control'}
                                            value={courseNum}
                                            name='changeCourseNum'
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                            </React.Fragment> :
                            null}
                        {
                            itemType === '' ? null :
                            <React.Fragment>
                                {/* Use CSS to make description a bigger box */}
                                <div className={'form-group row'}>
                                    <label htmlFor='description' className={'col-sm-2 col-form-label'}>
                                        Description
                                    </label>
                                    <div className='col-sm-10'>
                                        <textarea
                                            rows={'4'}
                                            id='description'
                                            className={'form-control'}
                                            value={description}
                                            name='changeDescription'
                                            onChange={onChange}
                                        />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='exampleFormControlFile1'>Example file input</label>
                                    <input
                                        type='file'
                                        className='form-control-file'
                                        id='exampleFormControlFile1'
                                        name='changeImage'
                                        multiple
                                        onChange={onChange}
                                    />
                                </div>
                                <input
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={false}
                                    value='Submit'
                                    id={'submit-btn'}
                                />
                            </React.Fragment>}
                    </form>
                </React.Fragment>
            ) : (<PageNotFound/>)}
            
        </div>
    );
};

export default CreateItem;

import React, { useState } from 'react';
import * as itemActions from '../redux/actions/itemActions';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './NavBar';
import { useFirebase } from 'react-redux-firebase';
import './styles/CreateSellItem.css';
import PageNotFound from './PageNotFound';
import Axios from 'axios';

/**
 * This component allows the user to create an item to sell or
 * request based on the type of item being created.  In addition
 * to creation, since editing requires the same formatting, this
 * component also deals with editing an item (if the item was created
 * by the user). This allows the user to be able to use the isbn for a
 * book to autocomplete the author, title, and give an image
 * of the book. The user can add pictures that is used for displaying
 * their items to other users.
 * @param match the url parameters (see Router.js for connection)
 * @param history the url history. This allows for changing
 * the url of the application manually
 */
const CreateItem = ({ match, history }) => {
    // component state of all the html documents
    const [ itemType, setItemType ] = useState('');
    const [ classCategory, setClassCategory ] = useState('');
    const [ condition, setCondition ] = useState('');
    const [ courseNum, setCourseNum ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');
    const [ price, setPrice ] = useState('');
    const [description, setDescription] = useState('');
    const [isbn, setIsbn] = useState('');
    
    // In order to display an image file, we had to create
    // an image object from the image file. So images is
    // an array of image objects for displaying the image
    // to the user when creating/editing
    const [images, setImages] = useState(null);
    
    // In order to store images into firebase storage, 
    // the object have to either be file objects or blob
    // objects. So image files and blobs are stored here
    // for when we are adding the images to firebase storage
    const [imageFiles, setImageFiles] = useState(null);
    const [ imageLinks, setImageLinks ] = useState(null);

    // This state of the component is for the class category.
    // Since the user is typing the class category, we only
    // want to allow the user to submit valid class categories.
    const [ isValidCategory, setIsValidCategory ] = useState(false);
    const firebase = useFirebase();
    const selectedItem = useSelector((state) => state.item);
    const items = useSelector((state) => state.list.items);
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    
    // url parameters
    const production = match.params.production;
    const createType = match.params.type;
    const item = match.params.item;
    const fileSizeLimit = 5;    // In MB. Adjust this appropriately
    const booksAPIKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

    // on initialization, reset item to not being loaded and 
    // reset the state of the component
    React.useEffect(() => {
        resetState();
        dispatch(itemActions.resetState());
        // if the user is editing an item,
        // then we need to load the info about
        // the item into itemReducer
        if (production === 'edit') {
            // first check to see if the item is
            // listReducer first
            let contains = false;
            for (let i = 0; i < items.length; i++) {
                if (items[i].id === item) {
                    contains = true;
                    dispatch(itemActions.loadItemDetails(items[i]));
                    break;
                }
            }

            // if listReducer does not contain the item,
            // check firestore for the item
            if (!contains) {
                dispatch(itemActions.checkFirestore(item, createType));
            }

            // if the item has been loaded, put the info of the item
            // into the component state
            if (selectedItem.item) {
                const actualItem = selectedItem.item;
                // if the item is a book, then add the additional info
                const isBook = actualItem.itemType === 'book';
                setItemType(actualItem.itemType);
                setDescription(actualItem.description);
                setPrice(actualItem.price);
                setTitle(actualItem.title);
                setCondition(actualItem.condition);
                setClassCategory(

                        isBook ? actualItem.classCategory :
                        ''
                );
                setIsbn(

                        isBook ? actualItem.isbn :
                        ''
                );
                setAuthor(

                        isBook ? actualItem.author :
                        ''
                );
                setCourseNum(

                        isBook ? actualItem.courseNum :
                        ''
                );
                setIsValidCategory(

                        isBook ? true :
                        false
                );
            }
        }
    }, [selectedItem.item]);

    /**
     * This method resets the state of the component
     */
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

    /**
     * This method changes the component state based off
     * of which html document was changed
     * @param e the change to an html document
     */
    const onChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        switch (name) {
            case 'changeItemType':
                setItemType(val);
                break;

            case 'changeClassCategory':
                if (val !== '') {
                    setIsValidCategory(categories.classCategories.includes(val.toLowerCase()));
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
                // There is a lot needed to deal with images
                // we limit the user to 3 images and a certain
                // amount of mb. If all the file are images and
                // meets the requirements, then the files get 
                // put in the state for when it gets uploaded
                // and displayed to the user
                const currentImages = e.target.files;
                if (currentImages.length > 3) {
                    alert('Limit: 3 images');
                    setImages(null);
                    setImageFiles(null)
                    e.target.value = null;
                    return;
                }
                let allImages = true;
                // state doesn't like FileList object, so convert to array
                const imgArray = [];
                const imgFileArray = [];
                const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
                let sumFileSizes = 0;
                for (let i = 0; i < currentImages.length; i++) {
                    let imageFile = currentImages[i];
                    const image = new Image();
                    image.src = URL.createObjectURL(imageFile)
                    let imageType = imageFile['type'];
                    if (!validImageTypes.includes(imageType)) {
                        allImages = false;
                        break;
                    }
                    sumFileSizes += (image.size / 1024 / 1024); // in MB 
                    imgArray.push(image);
                    imgFileArray.push(imageFile);
                }
                if (sumFileSizes > fileSizeLimit) {
                    alert(`You have exceeded the ${fileSizeLimit}MB maximum image size.`)
                    setImages(null);
                    setImageFiles(null)
                    e.target.value = null;
                    return;
                }
                if (allImages) {
                    setImages(imgArray);
                    setImageFiles(imgFileArray)
                } else {
                    alert('One of the selected files was not a vaild file type');
                    setImages(null);
                    setImageFiles(null)
                    e.target.value = null;
                    // document.getElementById('exampleFormControlFile1').innerHTML = 'Invalid file type.';
                }
                break;

            default:
                break;
        }
    };

    /**
     * This is when the user is sumbitting either the change
     * to their already created item or creating a new item.
     * Once that has occurred, the user gets directed to their
     * lisitings
     * @param e the submission of an item being modified or created
     */
    const onSubmit = (e) => {
        e.preventDefault();
        finishItem();
        document.getElementById('sell-form').reset();
        history.push(`/list/${createType}/${firebase.auth().currentUser.uid}`);
    };

    /**
     * This method finishes the creation/modification of an item where
     * it gets added to firestore and the images get put into firebase
     * storage
     */
    const finishItem = () => {
        const data = {
            itemType,
            condition,
            title,
            price,
            description
        };

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
        
        // if the user is creating a new item, then we are adding and just
        // uploading the images with it. If this was an edit, then we update
        // the info and change the images accordingly
        if(production === 'create'){
            firebase.firestore().collection(createType).add(data).then(async (doc) => {
                if (images && imageFiles) {
                    // const imageUrls = [];
                    console.log(imageFiles.length);
                    for (let i = 0; i < imageFiles.length; i++) {
                        const imageType = imageFiles[i]['type'].substring(6);
                        console.log('starting');
                        await firebase.storage().ref(`${doc.id}/${i}`).put(imageFiles[i])
                        console.log('Finished');
                        // firebase.storage().ref(`${doc.id}/${i}`).getDownloadURL().then((url) => {
                        //     const urlString = url.toString()
                        //     imageUrls.push(urlString);
                        //     return imageUrls;
                        // })
                    }
                    firebase.storage().ref(`${doc.id}/${0}`).getDownloadURL().then(async (url) => {
                        const urlString = url.toString();
                        await firebase.firestore().collection(createType).doc(doc.id).update({
                            imageUrl: urlString
                        })
                    })
                    // console.log(imageUrls);
                    // await firebase.firestore().collection(createType).doc(doc.id).update({
                    //     imageUrls: imageUrls
                    // })
                    resetState();
                }
            })
        } else {
            firebase.firestore().collection(createType).update(data).then(async (doc) => {
                if (images && imageFiles) {
                    for (let i = 0; i < images.length; i++) {
                        const imageType = imageFiles[i]['type'].substring(6);
                        await firebase.storage().ref(`${doc.id}/${i}`).put(imageFiles[i])
                    }

                    resetState();
                }
            })
        }
    };

    /**
     * This method checks to see if the isbn number is too long as
     * we only want the maximum lenght of the number to be the same
     * as the isbn
     * @param e the change to the isbn html document
     */    
    const maxLengthCheck = (e) => {
        // from https://stackoverflow.com/questions/49443954/how-to-limit-the-text-filed-length-with-input-type-number-in-react-js-and-preven
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength);
        }
    };

    /**
     * This method reset the form of creating/editing so when the user
     * creates a new item (or is editing an item), there is no leftover
     * info from the previous submission
     */
    const handleReset = () => {
        document.getElementById('sell-form').reset();
    };

    /**
     * This method uses the Google Books API to autocomplete the author,
     * title, and provide an image of the book. If the isbn does not exist
     * it informs the user.
     */
    const getBookData = () => {
        Axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${booksAPIKey}`).then((response) => {
            if (response.data.totalItems === 0) {
                alert('ISBN not found. Please fill out data manually.');
            } else {
                const book = response.data.items[0].volumeInfo;
                setTitle(book.title);
                setAuthor(book.authors[0]);
                // Need to get image file from image link
                setImageLinks([book.imageLinks.smallThumbnail, book.imageLinks.thumbnail]);
                const img = new Image();
                img.src = book.imageLinks.thumbnail
                setImages([img]);
                
            }
        });
    };

    // const getBookImage = () => {
    //     Axios.get('http://books.google.com/books/content?id=yxv1LK5gyV4C&printsec=frontcover&img=1&zoom=5&source=gbs_api').then((response) => {
    //         console.log(response);
    //     })
    // }

    return (
        <div>
            {/*Because the user can pass in any url parameters, we must check
            to see if they are valid. The first one is if it is a valid collection
            in firestore and if it is either editing or creating. If that is true,
            then if there is an item and the uid matches the user's id (meaning it is
            in edit) or it is in create, then shows the html that allows the user to
            create or edit the item. If it does not pass the first turnary, then it gives
            the PageNotFound component. If it passes the first turnary but not the second,
            the user must have been trying to edit an item that either does not exist or
            is not theirs.  For this condition, it returns a message saying item not found*/}
            {
                (createType === 'request' || createType === 'sell') &&
                (production === 'edit' || production === 'create') ? (selectedItem.item &&
                    selectedItem.item.uid === firebase.auth().currentUser.uid) ||
                production === 'create' ? <React.Fragment>
                    <NavBar />
                    <container className={"text-left"}>
                        {createType === 'request' ?
                            <h2 className={"mt-3 pb-0"}>Request an Item</h2> : null}
                        {createType === 'sell' ?
                            <h2 className={"mt-3 pb-0"}> Sell an Item</h2> : null}
                    </container>
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
                                                    <button onClick = {getBookData}>autoComplete</button>
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
                                        return <img src={image.src} key={image.src} />
                                    })    
                                )}  
                                        
                                <input
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={itemType === 'book' && !isValidCategory}
                                    value='Submit'
                                    id={'submit-btn'}
                                />
                            </React.Fragment>}
                    </form>
                </React.Fragment> :
                <React.Fragment>
                    <NavBar />
                    <div>Item Not Found</div>
                </React.Fragment> :
                <PageNotFound />}
        </div>
    );
};

export default CreateItem;

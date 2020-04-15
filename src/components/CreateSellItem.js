import React, { useEffect, useState } from 'react';
import * as sellActions from '../actions/sellActions';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../Firebase';

const SellItem = () => {
    const item = useSelector((state) => state.createSell);
    const [ itemType, setItemType ] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const userId = firebase.auth().currentUser.uid;
        dispatch(sellActions.setSellerID(userId));
    }, []);

    const onChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        switch (name) {
            case 'changeItemType':
                setItemType(val);
                break;
            case 'changeClassCategory':
                dispatch(sellActions.changeClassCategory(val));
                break;

            case 'changeCondition':
                dispatch(sellActions.changeCondition(val));
                break;

            case 'changeIsbn':
                dispatch(sellActions.changeIsbn(val));
                break;

            case 'changeTitle':
                dispatch(sellActions.changeTitle(val));
                break;

            case 'changeAuthor':
                dispatch(sellActions.changeAuthor(val));

            case 'changeCourseNum':
                dispatch(sellActions.changeCourseNum(val));
                break;

            case 'changePrice':
                dispatch(sellActions.changePrice(val));
                break;

            case 'changeDescription':
                dispatch(sellActions.changeDescription(val));

            default:
                break;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(sellActions.createSellItem(itemType));
        document.getElementById('sellInfo').reset();
    };

    return (
        <div>
            <form id='sellInfo' onSubmit={onSubmit}>
                <label htmlFor='itemCategory'>Item Category</label>
                <select id='itemCategory' name='changeItemType' defaultValue={itemType} onChange={onChange} required>
                    <option value='' disabled hidden>
                        {' '}
                        -- select a type --{' '}
                    </option>
                    <option value='book'>Book</option>
                    <option value='furniture'>Furniture</option>
                </select>
                <label htmlFor='classCategory' />
                <select name='changeClassCategory' defaultValue={item.classCategory} onChange={onChange} required>
                    <option value='' disabled hidden>
                        {' '}
                        -- select a category --{' '}
                    </option>
                    <option value='csc'>CSC</option>
                    <option value='math'>MATH</option>
                    <option value='span'>SPAN</option>
                    <option value='geog'>GEOG</option>
                </select>
                <label htmlFor='condition'>Condition</label>
                <select id='condition' name='changeCondition' defaultValue={item.condition} onChange={onChange} required>
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
                <label htmlFor='isbn'>ISBN</label>
                <input
                    type='number'
                    id='isbn'
                    value={item.isbn}
                    name='changeIsbn'
                    onChange={onChange}
                    placeholder='1234567890'
                    required
                />
                <label htmlFor='title'>Title</label>
                <input type='text' id='title' value={item.title} name='changeTitle' onChange={onChange} required />
                <label htmlFor='author'>Author</label>
                <input type='text' id='author' value={item.author} name='changeAuthor' onChange={onChange} required />
                <label htmlFor='courseNum'>Course #</label>
                <input type='number' id='courseNum' value={item.courseNum} name='changeCourseNum' onChange={onChange} />
                <label htmlFor='price'>Price: $</label>
                <input type='number' id='price' value={item.price} name='changePrice' onChange={onChange} required />
                {/* Use CSS to make description a bigger box */}
                <label htmlFor='description'>Description</label>
                <input type='text' id='description' value={item.description} name='changeDescription' onChange={onChange} required />

                <input type='submit' disabled={false} value='Submit' />
            </form>
        </div>
    );
};

export default SellItem;

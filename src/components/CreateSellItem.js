import React from 'react';
import * as sellActions from '../actions/sellActions';
import { useSelector, useDispatch } from 'react-redux';

const SellItem = ({match, history}) => {
    const item = useSelector((state) => state.createSell);
    const dispatch = useDispatch();
    const createType = match.params.type;
    if(!((createType == 'request' && item.buyOrSell == 'buy') || (createType == item.buyOrSell))){
        if(createType != 'request' && createType != 'sell'){
            history.push('/create/sell')
        } else {
            dispatch(sellActions.changeBuyOrSell(createType == 'sell' ? 'sell' : 'buy'))
        }
    }
    React.useEffect(() => {
        dispatch(sellActions.resetState())
    }, [])

    const onChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        switch (name) {
            case 'changeBuyOrSell':
                dispatch(sellActions.changeBuyOrSell(val));
                break;

            case 'changeItemType':
                dispatch(sellActions.changeItemType(val));
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
        dispatch(sellActions.createSellItem());
        document.getElementById('sellInfo').reset();
    };

    const handleReset = () => {
        document.getElementById('sellInfo').reset();
    }
    return (
        <div>
            <form onLoadStart={handleReset} id='sellInfo' onSubmit={onSubmit}>
                <label htmlFor='itemCategory'>Item Category</label>
                <select
                    id='itemCategory'
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
                {
                    item.itemType == '' ? null :
                    <React.Fragment>
                        <label htmlFor='title'>Title</label>
                        <input
                            type='text'
                            id='title'
                            value={item.title}
                            name='changeTitle'
                            onChange={onChange}
                            required
                        />
                        <label htmlFor='condition'>Condition</label>
                        <select
                            id='condition'
                            name='changeCondition'
                            defaultValue={item.condition}
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
                        <label htmlFor='price'>Price: $</label>
                        <input
                            type='number'
                            id='price'
                            min='0'
                            step='0.01'
                            value={item.price}
                            name='changePrice'
                            onChange={onChange}
                            required
                        />
                        
                    </React.Fragment>}

                {
                    item.itemType == 'book' ? <React.Fragment>
                        <label htmlFor='classCategory'>Class Category</label>
                        <select
                            name='changeClassCategory'
                            defaultValue={item.classCategory}
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
                        <label htmlFor='isbn'>ISBN</label>
                        <input
                            // minLength='10'
                            // maxLength='10'
                            type='number'
                            id='isbn'
                            value={item.isbn}
                            name='changeIsbn'
                            onChange={onChange}
                            placeholder='1234567890'
                            required
                        />
                        <label htmlFor='author'>Author</label>
                        <input
                            type='text'
                            id='author'
                            value={item.author}
                            name='changeAuthor'
                            onChange={onChange}
                            required
                        />
                        <label htmlFor='courseNum'>Course #</label>
                        <input
                            type='number'
                            id='courseNum'
                            value={item.courseNum}
                            name='changeCourseNum'
                            onChange={onChange}
                        />
                    </React.Fragment> :
                    null}
                    {item.itemType == '' ? null : (
                        <React.Fragment>
                        {/* Use CSS to make description a bigger box */}
                        <label htmlFor='description'>Description</label>
                        <input
                            type='text'
                            id='description'
                            value={item.description}
                            name='changeDescription'
                            onChange={onChange}
                            required
                        />
                        <input type='submit' disabled={false} value='Submit' />
                        </React.Fragment>
                    )}
            </form>
        </div>
    );
};

export default SellItem;

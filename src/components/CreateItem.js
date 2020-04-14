import React from 'react';
import * as createActions from '../actions/createActions';
import { useSelector, useDispatch } from 'react-redux';

const CreateItem = () => {
    const item = useSelector((state) => state.create);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const val = e.target.value;
        const name = e.target.name;
        switch (name) {
            case 'changeItemType':
                dispatch(createActions.changeItemType(val))
                break;
            case 'changeBuyOrSell':
                dispatch(createActions.changeBuyOrSell(val))
                break;
            
            case 'changeCategory':
                dispatch(createActions.changeCategory(val))
                break;
            
            case 'changeTitle':
                dispatch(createActions.changeTitle(val))
                break;
            
            case 'changeCourseNum':
                dispatch(createActions.changeCourseNum(val))
                break;
            
            case 'changePrice':
                dispatch(createActions.changePrice(val))
                break;
            
            default:
                break;
        }
    };

    return (
        <div>
            <form>
                <select onChange={handleChange} name='changeItemType'>
                    <option>Book</option>
                    <option>Furniture</option>
                </select>
                <select name='changeBuyOrSell' onChange={handleChange}>
                    <option>Buy</option>
                    <option>Sell</option>
                </select>
                <select name='changeCategory' onChange={handleChange}>
                    <option>CSC</option>
                    <option>MATH</option>
                    <option>SPAN</option>
                    <option>GEOG</option>
                </select>
                <span>Title</span>
                <input type='text' onChange={handleChange} name='changeTitle' />
                <span>Course #</span>
                <input type='number' onChange={handleChange} name='changeCourseNum' />
                <span>Price: $</span>
                <input type='number' onChange={handleChange} name='changePrice' />
                <button disabled={true}>Submit</button>
            </form>
        </div>
    );
};

export default CreateItem;

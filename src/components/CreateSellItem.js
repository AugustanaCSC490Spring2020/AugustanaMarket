import React from 'react';
import * as sellActions from '../actions/sellActions';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from './NavBar';
import './styles/CreateSellItem.css';

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
                break;

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
        document.getElementById('sell-form').reset();
        history.push('/myListings')
    };

    // from https://stackoverflow.com/questions/49443954/how-to-limit-the-text-filed-length-with-input-type-number-in-react-js-and-preven
    const maxLengthCheck = (e) => {
        if (e.target.value.length > e.target.maxLength) {
            e.target.value = e.target.value.slice(0, e.target.maxLength)
        }
    };

    const handleReset = () => {
        document.getElementById('sell-form').reset();
    };
    return (
        <div>
            <NavBar/>
            <form autoComplete='off' onLoadStart={handleReset} id='sell-form' onSubmit={onSubmit}>
                <div className={"form-group row"}>
                    <label htmlFor='itemCategory' className={"col-sm-2 col-form-label"}>Item Category</label>
                    <div className={"col-sm-10"}>
                        <select id='itemCategory'
                            className="form-control"
                            name='changeItemType'
                            defaultValue=''
                            onChange={onChange}
                            required>
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
                    item.itemType == '' ? null :
                    <React.Fragment>
                        <div className={"form-group row"}>
                            <label htmlFor='title' className={"col-sm-2 col-form-label required"}>Title</label>
                            <div class="col-sm-10">
                                <input
                                    type='text'
                                    id='title'
                                    className={"form-control"}
                                    value={item.title}
                                    name='changeTitle'
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className={"form-group row"}>
                            <label htmlFor='condition' className={"col-sm-2 col-form-label required"}>Condition</label>
                            <div class="col-sm-10">
                                <select
                                    id='condition'
                                    className={"form-control"}
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
                            </div>
                        </div>
                        <div className={"form-group row"}>
                            <label htmlFor='price' className={"col-sm-2 col-form-label required"}>Price</label>
                            <div class="col-sm-10 input-group">
                                <span class="input-group-addon">$</span>
                                <input
                                    type='number'
                                    className={"form-control"}
                                    id='price'
                                    min='0'
                                    step='0.01'
                                    value={item.price}
                                    name='changePrice'
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        
                    </React.Fragment>}

                {
                    item.itemType == 'book' ? <React.Fragment>
                        <div className={"form-group row"}>
                            <label htmlFor='classCategory' className={"col-sm-2 col-form-label required"}>Class Category</label>
                            <div class="col-sm-10">
                                <select
                                    name='changeClassCategory'
                                    className={"form-control"}
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
                            </div>
                        </div>
                        <div className={"form-group row"}>
                            <label htmlFor='isbn' className={"col-sm-2 col-form-label required"}>ISBN</label>
                            <div class="col-sm-10">
                                <input
                                    // minLength='10'
                                    // maxLength='10'
                                    type='number'
                                    className={"form-control"}
                                    id='isbn'
                                    maxLength="13"
                                    onInput={maxLengthCheck}
                                    max={9999999999999}
                                    value={item.isbn}
                                    name='changeIsbn'
                                    onChange={onChange}
                                    placeholder='1234567890'
                                    required
                                />
                            </div>
                        </div>
                        <div className={"form-group row"}>
                            <label htmlFor='author' className={"col-sm-2 col-form-label required"}>Author</label>
                            <div class="col-sm-10">
                                <input
                                    type='text'
                                    id='author'
                                    className={"form-control"}
                                    value={item.author}
                                    name='changeAuthor'
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className={"form-group row"}>
                            <label htmlFor='courseNum' className={"col-sm-2 col-form-label"}>Course #</label>
                            <div class="col-sm-10">
                                <input
                                    type='number'
                                    id='courseNum'
                                    className={"form-control"}
                                    value={item.courseNum}
                                    name='changeCourseNum'
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </React.Fragment> :
                    null}
                    {item.itemType == '' ? null : (
                        <React.Fragment>
                        {/* Use CSS to make description a bigger box */}
                        <div className={"form-group row"}>
                            <label htmlFor='description' className={"col-sm-2 col-form-label required"}>Description</label>
                            <div class="col-sm-10">
                                <textarea
                                    rows={"4"}
                                    id='description'
                                    className={"form-control"}
                                    value={item.description}
                                    name='changeDescription'
                                    onChange={onChange}
                                    required
                                />
                            </div>
                        </div>
                        <input type='submit' className="btn btn-primary" disabled={false} value='Submit' id={"submit-btn"}/>
                        </React.Fragment>
                    )}
            </form>
        </div>
    );
};

export default SellItem;

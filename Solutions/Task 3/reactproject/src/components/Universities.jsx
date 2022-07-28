import React from 'react';
import {Checkbox, CircularProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getFetchedUniversitiesList} from "../store/reducers/AppSelector";
import {DeleteFavoriteUniversityActionCreator, SetFavoriteListActionCreator} from "../store/reducers/AppReducer";

const Universities = ({isLoading, isError}) => {
    const dispatch = useDispatch();
    const fetchedList = useSelector(getFetchedUniversitiesList);

    //Array for table
    let UniversitiesList = fetchedList ? (fetchedList.length !== 0 && fetchedList.map(
        item =>
            <tr key={item.name + item?.page}>
                <td></td>
                <td className="Country-Code">{item.alpha_two_code}</td>
                <td className="Country">{item.country}</td>
                <td className="Country-name">{item.name}</td>
                <td className="Country-Webpages">{item.web_pages.map(page => <a href={page} target="_blank" key={page}
                                                                                rel="noreferrer">{page}</a>)}</td>
                <td><Checkbox checked={item.isFavorite ? item.isFavorite : false} onChange={e => {
                    if (e.target.checked) {
                        dispatch(SetFavoriteListActionCreator({
                            ...item,
                            isFavorite: true
                        }))
                    } else {
                        dispatch(DeleteFavoriteUniversityActionCreator({
                            ...item
                        }))
                    }
                }
                }/></td>
            </tr>)) : null

    return (
        <div className="Universities">
            {fetchedList.length !== 0 ?
                <table className="Universities-List">
                    <thead>
                    <tr>
                        <th>№</th>
                        <th>Code</th>
                        <th>Country</th>
                        <th>Name</th>
                        <th>Web Pages</th>
                        <th>Favorite</th>
                    </tr>
                    </thead>
                    <tbody className="Numeration">
                    {UniversitiesList}
                    </tbody>
                </table> : <p>Try entering the country and hit "Send" to get the information you need.</p>}
            {isLoading ? <CircularProgress/> : null}
            {isError ? <p>Error, try again!</p> : null}
        </div>
    );
};

export default Universities;
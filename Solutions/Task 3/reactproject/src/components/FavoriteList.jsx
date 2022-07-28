import React from 'react';
import {Button, Checkbox} from "@mui/material";
import {DeleteFavoriteUniversityActionCreator, SetFavoriteListActionCreator} from "../store/reducers/AppReducer";
import {useDispatch, useSelector} from "react-redux";
import {getFavoriteList} from "../store/reducers/AppSelector";

const FavoriteList = ({isActive, setIsActive}) => {

    const favoriteList = useSelector(getFavoriteList);
    const dispatch = useDispatch();

    //Array for table
    let UniversitiesList = favoriteList ? (favoriteList.length !== 0 && favoriteList.map(
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
        <div className="FavoriteList">
            <Button variant="contained" onClick={() => setIsActive(!isActive)}>Close</Button>
            <div className="FavoriteList-Scroll">
                <div className="Universities">
                    {favoriteList.length !== 0 ?
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
                        </table> : <p className="Empty-list">Favorite list is empty!</p>}
                </div>
            </div>
        </div>
    );
};

export default FavoriteList;
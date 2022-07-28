import '../styles/App.scss';
import {fetchUniversity} from "../api/API";
import {useMutation} from "react-query";
import SearchTools from "./SearchTools";
import Universities from "./Universities";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {SetNewListActionCreator} from "../store/reducers/AppReducer";
import FavoriteList from "./FavoriteList";

function App() {
    const dispatch = useDispatch();
    //Hook for fetching data
    const {
        mutate: searchUniversity,
        isLoading,
        isError,
        isSuccess,
        data: fetchedList
    } = useMutation(({country}) => fetchUniversity(country));

    const [isActive, setIsActive] = useState(false);

    //Set list of Universities
    useEffect(() => {
        if (fetchedList && fetchedList.length !== 0 && isSuccess) {
            dispatch(SetNewListActionCreator(fetchedList))
        }
    }, [dispatch, fetchedList, isSuccess])

    //Toggle scroll when pop-up is open
    useEffect(() => {
        if (isActive) {
            document.getElementsByTagName('body')[0].style = "overflow: hidden";
        } else {
            document.getElementsByTagName('body')[0].style = "overflow: auto";
        }
    }, [isActive])

    return (
        <div className="App">
            <SearchTools searchUniversity={searchUniversity} isLoading={isLoading} isActive={isActive}
                         setIsActive={setIsActive}/>
            <Universities isLoading={isLoading} isError={isError}/>
            {isActive ? <FavoriteList isActive={isActive}
                                      setIsActive={setIsActive}/> : null}
        </div>
    );
}

export default App;

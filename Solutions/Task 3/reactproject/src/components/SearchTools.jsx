import React from 'react';
import {Button, TextField} from "@mui/material";
import {ResetListsActionCreator} from "../store/reducers/AppReducer";
import {useDispatch, useSelector} from "react-redux";
import * as yup from 'yup';
import {useFormik} from "formik";
import {getFavoriteList} from "../store/reducers/AppSelector";

const SearchTools = ({searchUniversity, isLoading, isActive, setIsActive}) => {
    const dispatch = useDispatch();
    const favoriteList = useSelector(getFavoriteList);

    let schema = yup.object().shape({
        countryTextField: yup.string("Invalid country format").required("Country name is required").matches(/^[A-Za-z]+$/, "Only English letters")
    });

    const formik = useFormik({
        initialValues: {
            countryTextField: "",
        },
        validationSchema: schema,
        onSubmit: values => {
            searchUniversity({country: values.countryTextField})
        },
        onReset: () => {
            formik.values.countryTextField = ""
            dispatch(ResetListsActionCreator())
        }
    });

    return (
        <div className="Search-Tools">
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <TextField label="Country" variant="outlined" placeholder="Type here..."
                           id="countryTextField"
                           onChange={formik.handleChange}
                           value={formik.values.countryTextField}
                           error={formik.touched.countryTextField && Boolean(formik.errors.countryTextField)}
                           helperText={formik.touched.countryTextField && formik.errors.countryTextField}/>

                <div className="Search-Tools-Buttons">
                    <Button variant="contained" type="submit" disabled={isLoading}>Send</Button>
                    <Button variant="contained" type="reset">Reset</Button>
                    <Button variant="contained"
                            onClick={() => setIsActive(!isActive)}>{favoriteList ? favoriteList.length : 0} Show
                        Favorite
                    </Button>
                </div>
            </form>
        </div>);
};

export default SearchTools;
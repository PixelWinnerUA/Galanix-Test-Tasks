export const SetNewListActionCreator = (list) => ({
    type: "SET-NEW-LIST",
    list
})
export const SetFavoriteListActionCreator = (University) => ({
    type: "SET-FAVORITE-LIST",
    University
})
export const DeleteFavoriteUniversityActionCreator = (University) => ({
    type: "DELETE-FAVORITE-UNIVERSITY",
    University
})
export const ResetListsActionCreator = () => ({
    type: "RESET-LISTS"
})

let initialState = {
    FetchedUniversitiesList: localStorage.UniversitiesList ? JSON.parse(localStorage.getItem("UniversitiesList")) : [],
    FavoriteList: localStorage.UniversitiesList ? JSON.parse(localStorage.getItem("FavoriteList")) : []
}

const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET-NEW-LIST":
            let newFetchedUniversitiesList = state.FavoriteList ? action.list.map(item => state.FavoriteList.find(object => object.name === item.name)
                ? item = {
                    ...item,
                    isFavorite: true
                } : item
            ) :  action.list;
            localStorage.setItem("UniversitiesList", JSON.stringify(newFetchedUniversitiesList));
            return {
                ...state,
                FetchedUniversitiesList: newFetchedUniversitiesList,
            }
        case "SET-FAVORITE-LIST":
            let newFavoriteList = [...state.FavoriteList, action.University]
            localStorage.setItem("FavoriteList", JSON.stringify(newFavoriteList));
            let FetchedUniversitiesList = state.FetchedUniversitiesList.map(item => newFavoriteList.find(object => object.name === item.name)
                ? item = {
                    ...item,
                    isFavorite: true
                } : item
            )
            localStorage.setItem("UniversitiesList", JSON.stringify(FetchedUniversitiesList));
            return {
                ...state,
                FavoriteList: newFavoriteList,
                FetchedUniversitiesList: FetchedUniversitiesList
            }
        case "DELETE-FAVORITE-UNIVERSITY":
            let changedList = state.FavoriteList.filter(item => item.name !== action.University.name)
            localStorage.setItem("FavoriteList", JSON.stringify(changedList));
            let UniversitiesListAfterDelete = state.FetchedUniversitiesList.map(item => {
                if (item.name === action.University.name) {
                    return {
                        ...item,
                        isFavorite: false
                    }
                } else return item

            })
            localStorage.setItem("UniversitiesList", JSON.stringify(UniversitiesListAfterDelete));
            return {
                ...state,
                FavoriteList: changedList,
                FetchedUniversitiesList: UniversitiesListAfterDelete
            }
        case "RESET-LISTS":
            localStorage.setItem("UniversitiesList", JSON.stringify([]));
            localStorage.setItem("FavoriteList", JSON.stringify([]));
            return {
                ...state,
                FavoriteList: [],
                FetchedUniversitiesList: []
            }
        default:
            return state;
    }
};

export default AppReducer;

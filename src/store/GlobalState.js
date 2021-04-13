import {createContext, useReducer} from "react";
import reducers from "./Reducers";
import {gql, useQuery} from '@apollo/client'
import {useEffect} from "react";

const GET_USER = gql `
  query {
  user {
    id
    username
    email
    role
    avatar
    notes {
      id
      title
      content
      createdAt
      userId
    }
  }
}
`


export const DataContext = createContext()

export const DataProvider = ({children}) => {
    const initialState = {notify: {}, auth: {}, modal: {}}
    const [state, dispatch] = useReducer(reducers, initialState)
    const {data, error} = useQuery(GET_USER, {pollInterval: 100})
    //console.log(localStorage.getItem('token'));
    useEffect(() => {
        dispatch({type: 'AUTH', payload: {token: localStorage.getItem('token') ,user: data && data.user}})
    }, [data])

    useEffect(() => {
        dispatch({type: 'AUTH', payload: {}})
    }, [error])

    return (
        <DataContext.Provider value={{state, dispatch}}>
            {children}
        </DataContext.Provider>
    )
}
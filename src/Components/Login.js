import {gql ,useLazyQuery} from '@apollo/client'
import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router'
import {toast} from 'react-toastify'
import {DataContext} from '../store/GlobalState'

const LOGIN = gql `
  query login($email: String!, $password: String!) {
      login(input: {
          email: $email,
          password: $password
      })
  }
`

const Login = () => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {state, dispatch} = useContext(DataContext)
    const [login, {loading}] = useLazyQuery(LOGIN, {
        onCompleted: data => {if(data) { console.log(data)
            localStorage.setItem('token', data.login)
            dispatch({type: 'AUTH', payload: {token: data.login}})
        toast.success("Success Login !")
        }
        },
        onError: error => {
            if (error) toast.error(error.message)
        },
        pollInterval: 1000
    })

    const {auth} = state

    const onSub = e => {
        e.preventDefault();
        login({
            variables: {
                email: email,
                password: password
            }
        })
        setEmail('')
        setPassword('')
    }
    
    if (auth.token)  window.location.href = '/'

    return (
        <div>
            <div className="row ">
                <div className="col-md-7 mx-auto ">
                    <div className="card p-4 rounded shadow-sm">
                    <h3 className="mb-4 mx-auto">Login</h3>
                        <form action="" onSubmit={onSub}>
                            <div className="form-group mb-4">
                                <input type="email" placeholder="Email" className="form-control rounded-0" onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-group mb-4">
                                <input type="password" placeholder="password" className="form-control rounded-0" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button className="btn btn-block btn-success w-50 mx-auto rounded-0">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login

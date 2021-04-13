import React from 'react'
import {gql, useLazyQuery, useQuery} from '@apollo/client'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

const GET_USERS = gql `
  query {
   Users {
    id
    username
    email
    role
    avatar
  }
} 
`
const DELETE_USER = gql `
  query deleteUser($id: Float!) {
      deleteUser(
          id: $id
      )
  }
`

const Users = () => {
    const {data} = useQuery(GET_USERS, { pollInterval: 100 })
    const [deleteUser] = useLazyQuery(DELETE_USER)
    return (
        <div>
        <Link to='/users/ajout'> <button className="btn btn-warning w-25 mb-2 rounded-0 text-light font-weight-bold"><i className="fas fa-user-plus mr-2"></i> Ajout User</button> </Link>
        <table className="table w-100">
            <thead>
                   <tr>
                       <th></th>
                       <th>ID</th>
                       <th>Avatar</th>
                       <th>Username</th>
                       <th>Email</th>
                       <th>Role</th>
                       <th>Action</th>
                   </tr>
               </thead>
               <tbody>
                   {
                       data && data.Users.map((user, i) => (
                           <tr key={user.id} style={{cursor: 'pointer'}} >
                               <th> {i+1} </th>
                               <th> {user.id} </th>
                               <th>
                                   <img src={user.avatar} alt="" style={{width: '50px', height: '50px', overflow: 'hidden'}} />
                               </th>
                               <th> {user.username} </th>
                               <th> {user.email} </th>
                               <th> {user.role} </th>
                               <th>
                                   <a><i className="fas fa-edit text-warning font-weight-bold mr-3" title="Edit"></i></a>
                                   <i className="fas fa-trash text-danger font-weight-bold" onClick={() => {
                                       Swal.fire({
                                   title: 'Are you sure?',
                                   text: "You won't be able to revert this!",
                                   icon: 'warning',
                                   showCancelButton: true,
                                   confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, delete it!'
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      deleteUser({
                                          variables: {
                                              id: parseFloat(user.id)
                                          }
                                      })
                                      Swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                      )
                                  }
                                  })
                                   }} ></i>
                               </th>
                            </tr>   
                       ))
                   }
               </tbody>
            </table>   
        </div>
    )
}

export default Users

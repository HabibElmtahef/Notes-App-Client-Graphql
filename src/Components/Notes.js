import React, {useContext, useState} from 'react'
import Swal from 'sweetalert2'
import {gql, useLazyQuery, useMutation} from '@apollo/client'
import {DataContext} from '../store/GlobalState'

const ADD_NOTE = gql `
  mutation addPost($title: String!, $content: String!) {
      addPost(input: {
          title: $title,
          content: $content
      }) {
          id
          title
          content
      }
  }

`

const DELETE_NOTE = gql `
  query deletePost($id: Float!) {
      deletePost(
          id: $id
      )
  }
`

const Notes = () => {
    const {state, dispatch} = useContext(DataContext)
    const { auth } = state
    const { user } = auth
    //console.log(user.notes);
    const [deletePost] = useLazyQuery(DELETE_NOTE, {
        onCompleted: data => console.log(data && data.deletePost)
    }
    )

    const Modal = () => {
        const [title, setTitle] = useState("")
        const [content, setContent] = useState("")
        const [addPoste] = useMutation(ADD_NOTE)
        return (
             <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header border-0">
        <h5 className="modal-title text-center" id="exampleModalLabel"> Add poste </h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body border-0">
        <form action="">
            <div className="form-group mb-4">
                <input type="text" placeholder="Title" className="form-control rounded-0" onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group mb-4">
                <textarea type="text" placeholder="Content" rows='3' className="form-control rounded-0" onChange={(e) => setContent(e.target.value)} />
            </div>
        </form>
      </div>
      <div className="modal-footer border-0">
        <button type="button" className="btn btn-success" data-dismiss="modal" onClick= {(e) => {
            e.preventDefault()
            addPoste({
                variables: {
                    title: title,
                    content: content
                }
            })
        }} >Add Note</button>
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => dispatch({type: 'ADD_MODAL', payload: {}}) } >Annuler</button>
      </div>
    </div>
  </div>
</div>
        )
    }



    return (
        <div className="position-relative">
        <Modal/>
           <h3 className="text-center mb-4">My Notes</h3>
           <i className="position-absolute fas fa-plus bg-success rounded-circle font-weight-bold text-center text-light align-middle" style={{
               width:'50px', height: '50px', 
               bottom: '2%', right: '2%',
               fontSize: '20px', cursor: 'pointer'
               }}
               data-toggle="modal" data-target="#exampleModal"
                ></i>
           <div className="row">
               {
                   user.notes && user.notes.map(note => (
                       <div className="col-md-4 mb-4 position-relative" key={note.id} >
                           <div className="card w-100 border-0 rounded shadow-sm">
                               <div className="card-header bg-transparent border-0 font-weight-bold"><img src={auth.user.avatar} style= {{width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', marginTop:'-2px'}} alt="" />  {user.username} </div>
                               <div className="card-body">
                                   <div className="card-title font-weight-bold"> {note.title} </div>
                                   <div className="card-text"> {note.content} </div>
                               </div>
                           </div>
                           <div className="position-absolute" style={{top: '5%', right: '7%', cursor: 'pointer'}} >
                               <i className="far fa-trash-alt text-danger font-weight-bold" onClick={() => {

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
                                      deletePost({
                                          variables: {
                                              id: parseFloat(note.id)
                                          }
                                      })
                                      Swal.fire(
                                        'Deleted!',
                                        'Your file has been deleted.',
                                        'success'
                                      )
                                  }
                                  })
                               }}></i>
                           </div>
                       </div>
                   ))
               }
           </div> 
        </div>
    )
}

export default Notes

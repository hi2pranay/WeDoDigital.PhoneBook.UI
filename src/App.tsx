import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { PersonLinesFill } from 'react-bootstrap-icons';
import  PhoneBookService  from "./Service/PhoneBook.Service";
import { IPhoneBook } from './Models/IPhoneBook';
import DeletePhoneBookComponent from './Components/DeletePhoneBookComponent';
import EditPhoneBookComponent from './Components/EditPhoneBookComponent';
import AddPhoneBookComponent from './Components/AddPhoneBookComponent';

const App = () =>  {

  const [searchTerm, setSearchTerm] = useState('');

  const [getPhoneBooks, setGetPhoneBooks] = useState<IPhoneBook[]>([]);
  const [selectedPhoneBook, setSelectedPhoneBook] = useState<IPhoneBook>();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect( ()=>
  {
    (async () => {
      await getAllPhoneBooks();
    })();    

  }, [] );

  const searchOnChange = async (event:any) => 
  {
    let searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    debugger;
    // Filter by search
    let searchResults = await PhoneBookService.getPhoneBooksByName(searchTerm);
    setGetPhoneBooks(searchResults.data.data);
  }

  const getAllPhoneBooks = async() =>
  {
    
    const res = await PhoneBookService.getAllPhoneBooks();
    setGetPhoneBooks(res.data.data);
  }

  const showAddModalOnClick = ():void =>{
    
    setShowAddModal(true);
  }

  const closeAddModalOnClick = ():void =>{
    
    setSelectedPhoneBook(undefined);

    setShowAddModal(false);
  }

  const showEditModalOnClick = (item:IPhoneBook):void =>{
    
    setSelectedPhoneBook(item);

    setShowEditModal(true);
  }

  const closeEditModalOnClick = ():void =>{
    
    setSelectedPhoneBook(undefined);

    setShowEditModal(false);
  }

  const showDeleteModalOnClick = (item:IPhoneBook) =>{
    
    setSelectedPhoneBook(item);

    setShowDeleteModal(true);
  }

  const closeDeleteModalOnClick = ():void =>{
    
    setSelectedPhoneBook(undefined);

    setShowDeleteModal(false);
  }

  return (
    <div className="container" style={{textAlign:"center"}}>
      <h1> <PersonLinesFill style={{paddingRight:"10px"}}/> Phone Book App</h1>
      <div className="row">
          <div className="col-6">
            <h2>Contacts</h2>
          </div>
          <div className="col-6">
            <button className="btn btn-primary" onClick={() => showAddModalOnClick()}>
              <i className="bi bi-plus"></i>Add Contact
            </button>
          </div>
      </div>

      <div className="main">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control" placeholder="Search" value={searchTerm} onChange={searchOnChange}></input>
        </div>

        <div>
          <ul className="list-group mt-4">
            {
              getPhoneBooks && getPhoneBooks.map((item:IPhoneBook, index) =>
              {
                return(
                  <li className="list-group-item d-flex justify-content-between align-items-center" style={{padding:"15px"}} key={index}>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold" style={{textAlign:"initial"}}><h5>{item.firstName +' '+ item.lastName }</h5></div>
                      <div style={{color:"#a8a7a7", textAlign:"left"}}><i className="bi bi-telephone"></i>{ item.mobileNumber }</div>
                    </div>
                    <ul className="list-inline m-0">
                        <li className="list-inline-item">
                            <button onClick={() => showEditModalOnClick(item)} className="btn btn-primary btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Edit">
                              <i className="fa fa-edit"></i>
                            </button>
                        </li>
                        <li className="list-inline-item">
                            <button onClick={() => showDeleteModalOnClick(item)} className="btn btn-danger btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Delete">
                              <i className="fa fa-trash"></i>
                            </button>
                        </li>
                    </ul>
                                
                  </li>
                )
              })              
            }
            

          </ul>
        </div>

      </div>

      <AddPhoneBookComponent
        GetAllPhoneBooks = {getAllPhoneBooks}
        ShowAddModal={showAddModal}
        CloseAddModalOnClick={closeAddModalOnClick}></AddPhoneBookComponent>

      <EditPhoneBookComponent 
        GetAllPhoneBooks = {getAllPhoneBooks}
        SelectedPhoneBook={selectedPhoneBook}
        ShowEditModal={showEditModal}
        CloseEditModalOnClick={closeEditModalOnClick}></EditPhoneBookComponent>

      <DeletePhoneBookComponent
        GetAllPhoneBooks = {getAllPhoneBooks}
        SelectedPhoneBook={selectedPhoneBook}
        ShowDeleteModal={showDeleteModal}
        CloseDeleteModalOnClick={closeDeleteModalOnClick}></DeletePhoneBookComponent>

    </div>
  );
}

export default App;

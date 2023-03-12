import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { IPhoneBook } from '../Models/IPhoneBook'
import  PhoneBookService  from "../Service/PhoneBook.Service";

interface DeletePhoneBookProps
{ 
    GetAllPhoneBooks:  () => void;
    SelectedPhoneBook?: IPhoneBook,
    ShowDeleteModal:boolean;
    CloseDeleteModalOnClick:  () => void;
};

const DeletePhoneBookComponent : React.FC<DeletePhoneBookProps> = ({GetAllPhoneBooks, SelectedPhoneBook, ShowDeleteModal,CloseDeleteModalOnClick}) => 
{   
    const [id, setId] = useState(0);

    useEffect( ()=>
    {
        
        if(SelectedPhoneBook)
        {
            setId(SelectedPhoneBook?.id);
        }    

    }, [SelectedPhoneBook] );

    const SubmitDeleteModalOnClick = async()=>
    {
        
        
        var result = await PhoneBookService.deletePhoneBook(id);

        if(result.data.data === true)
        {
            CloseDeleteModalOnClick();

            // Rebind the table
            await GetAllPhoneBooks();
        }
    } 

    return (
        <>

        <Modal show={ShowDeleteModal} onHide={CloseDeleteModalOnClick}>
            <Modal.Header closeButton>
            <Modal.Title>Phone Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Are you sure you want to delete ?</h5>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={CloseDeleteModalOnClick}>
                Close
            </Button>
            <Button variant="primary" onClick={SubmitDeleteModalOnClick}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default DeletePhoneBookComponent;
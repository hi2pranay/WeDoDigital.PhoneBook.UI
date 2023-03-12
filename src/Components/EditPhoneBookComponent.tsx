import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IPhoneBook } from '../Models/IPhoneBook'
import  PhoneBookService  from "../Service/PhoneBook.Service";

interface EditPhoneBookProps
{ 
    GetAllPhoneBooks:  () => void;
    SelectedPhoneBook?: IPhoneBook,
    ShowEditModal:boolean;
    CloseEditModalOnClick:  () => void;
};

const EditPhoneBookComponent : React.FC<EditPhoneBookProps> = ({GetAllPhoneBooks, SelectedPhoneBook, ShowEditModal,CloseEditModalOnClick}) => 
{   
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');

    useEffect( ()=>
    {
        
        if(SelectedPhoneBook)
        {
            setId(SelectedPhoneBook?.id);
            setFirstName(SelectedPhoneBook?.firstName);
            setLastName(SelectedPhoneBook?.lastName);
            setMobileNumber(SelectedPhoneBook?.mobileNumber);
        }    

    }, [SelectedPhoneBook] );

    const firstNameOnChange = (event:any) => 
    {
        setFirstName(event.target.value);
    }

    const lastNameOnChange = (event:any) => 
    {
        setLastName(event.target.value);
    }

    const mobileNumberOnChange = (event:any) => 
    {
        setMobileNumber(event.target.value);
    }

    const SubmitEditModalOnClick = async()=>
    {
        
        let  phoneBook:IPhoneBook = {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            id: id
        };
        
        var result = await PhoneBookService.updatePhoneBook(phoneBook);

        if(result.data === true)
        {
            CloseEditModalOnClick();

            // Rebind the table
            await GetAllPhoneBooks();
        }
    } 

    return (
        <>

        <Modal show={ShowEditModal} onHide={CloseEditModalOnClick}>
            <Modal.Header closeButton>
            <Modal.Title>Phone Book</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                        type="text"
                        value={firstName}
                        onChange={firstNameOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control
                        type="text"
                        value={lastName}
                        onChange={lastNameOnChange}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={mobileNumber}
                        onChange={mobileNumberOnChange}
                    />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={CloseEditModalOnClick}>
                Close
            </Button>
            <Button variant="primary" onClick={SubmitEditModalOnClick}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default EditPhoneBookComponent;
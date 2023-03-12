import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IPhoneBook } from '../Models/IPhoneBook'
import  PhoneBookService  from "../Service/PhoneBook.Service";

interface EditPhoneBookProps
{ 
    GetAllPhoneBooks:  () => void;
    ShowAddModal:boolean;
    CloseAddModalOnClick:  () => void;
};

const AddPhoneBookComponent : React.FC<EditPhoneBookProps> = ({GetAllPhoneBooks, ShowAddModal,CloseAddModalOnClick}) => 
{   
    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');


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

    const SubmitAddModalOnClick = async()=>
    {
        
        let  phoneBook:IPhoneBook = {
            firstName: firstName,
            lastName: lastName,
            mobileNumber: mobileNumber,
            id: id
        };
        
        var result = await PhoneBookService.savePhoneBook(phoneBook);

        if(result.data === true)
        {
            CloseAddModalOnClick();

            // Rebind the table
            await GetAllPhoneBooks();
        }
    } 

    return (
        <>

        <Modal show={ShowAddModal} onHide={CloseAddModalOnClick}>
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
            <Button variant="secondary" onClick={CloseAddModalOnClick}>
                Close
            </Button>
            <Button variant="primary" onClick={SubmitAddModalOnClick}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default AddPhoneBookComponent;
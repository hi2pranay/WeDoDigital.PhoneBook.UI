import apiClient from "../http-common";
import { IPhoneBook } from "../Models/IPhoneBook";

class PhoneBookService  {

    getAllPhoneBooks = async() =>
    {
      return await apiClient.get('/getphonebooks');
    }

    getPhoneBooksByName = async(name:string) =>
    {
      return await apiClient.get('/getphonebooksbyname?name='+name);
    }
    
    getPhoneBookById = async(phonebookId:number) =>
    {
      return await apiClient.get('/getphonebook?id='+phonebookId);
    }

    savePhoneBook = async(phonebook:IPhoneBook) =>
    {
      return await apiClient.post('/addphonebook', JSON.stringify(phonebook));
    }

    updatePhoneBook = async(phonebook:IPhoneBook) =>
    {
      return await apiClient.patch('/updatephonebook', JSON.stringify(phonebook));
    }

    deletePhoneBook = async(phonebookId:number) =>
    {
      return await apiClient.delete('/deletephonebook?id='+phonebookId);
    }

}

export default new PhoneBookService();
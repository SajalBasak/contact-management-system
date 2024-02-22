import React, {useState, useEffect} from 'react'
import axios from 'axios'
import './home.css'

const Home = () => {
    const [contacts, setContacts] = useState([])
    const [newContact, setNewContact] = useState({
      name: "",
      age: "",
      email: "",
      phone_number: "",
      address: ""
    })
    const [selectedContact, setSelectedContact] = useState(null)
    const [toView, setToView] = useState({
      name: "",
      age: "",
      email: "",
      phone_number: "",
      address: ""
    })
    const [openView, setOpenview] = useState(false);

    useEffect(() => {
      fetchContacts()
    }, [])
    
    const fetchContacts = () => {
      axios.get('http://127.0.0.1:8000/api/contacts/')
      .then(response => {
        setContacts(response.data)
      })
      .catch(error => console.error(error))
    }

    const handleInputChange = (e) => {
        setNewContact({...newContact, [e.target.name]:e.target.value})
    }

    const handleAddContact = () => {
      axios.post('http://127.0.0.1:8000/api/contacts/', newContact)
      .then(response => {
        setContacts([...contacts, response.data])
        setNewContact({
          name: "",
          age: "",
          email: "",
          phone_number: "",
          address: ""
        })
      })
      .catch(error => console.error(error))
    }

    const handleViewClick = async(id) => {
      const response = await axios.get(`http://127.0.0.1:8000/api/contacts/${id}/`)
      setToView(response.data)
      setOpenview(true)
    }

    const handleEditClick = (contact) => {
      setSelectedContact(contact)
      setNewContact(contact)
    }

    const handleUpdateContact = (id) => {
      axios.put(`http://127.0.0.1:8000/api/contacts/${selectedContact.id}/`, newContact)
      .then(response => {
        fetchContacts();
        setNewContact({
          name: "",
          age: "",
          email: "",
          phone_number: "",
          address: ""
        });
      })
      .catch(error => console.error(error))
    }

    const handleCancelUpdateContact = () => {
      setSelectedContact(null)
      setNewContact({
        name: "",
        age: "",
        email: "",
        phone_number: "",
        address: ""
      });
    }

    const handleDeleteContact = (id) => {
      axios.delete(`http://127.0.0.1:8000/api/contacts/${id}/`, )
      .then(response => {
        fetchContacts();
        setNewContact({
          name: "",
          age: "",
          email: "",
          phone_number: "",
          address: ""
        });
      })
      .catch(error => console.error(error))
    } 
  return (
    <div className='app-container'>
      <h1>Contact Management System</h1>
      {/* Form Container */}
      <div className='form-container'>
        <div className='form-inputs'>
          <input type='text' name='name' placeholder='Name' value={newContact.name} onChange={handleInputChange} />
          <input type='text' name='age' placeholder='Age' value={newContact.age} onChange={handleInputChange} />
          <input type='email' name='email' placeholder='Email' value={newContact.email} onChange={handleInputChange} />
          <input type='text' name='phone_number' placeholder='Phone Number' value={newContact.phone_number} onChange={handleInputChange} />
          <textarea name='address' placeholder='Address' value={newContact.address} onChange={handleInputChange}/>
          
          <div className='form-buttons'>
            {
              selectedContact ? (
                <>
                  <button className='update' onClick={handleUpdateContact}>Update</button>
                  <button onClick={handleCancelUpdateContact}>Cancel</button>
                </>
              ) : (
                <button onClick={handleAddContact}>Add New Contact</button>
              )
            }
          </div>
          
        </div>
      </div>
          
      {/* Contact List */}
      <ul className='contact-list'>
        {
          contacts.map(contact => (
            <li key={contact.id}>
              <div>
                <strong>{contact.name}</strong>
              </div>
              <div className='actions'>
                <button className='view' onClick={() => handleViewClick(contact.id)}>View</button>
                <button className='edit' onClick={() => handleEditClick(contact)}>Edit</button>
                <button className='delete' onClick={() => handleDeleteContact(contact.id)}>Delete</button>
              </div>
            </li>
          ))
        }
      </ul>

      {/* Single View */}
      {openView && (
        <>
        <div className='outer-box'>
          <strong>{toView.name}</strong>
          <br />
          <span>Age : {toView.age}</span>
          <br />
          <span>Email : {toView.email}</span>
          <br />
          <span>Grade : {toView.grade}</span>
          <br />
          <span>Phone Number : {toView.phone_number}</span>
          <br />
          <span>Address : {toView.address}</span>
          <br />
        </div>
        <button onClick={() => setOpenview(false)}>Close</button>
        </>
      )}

    </div>
  )
}

export default Home
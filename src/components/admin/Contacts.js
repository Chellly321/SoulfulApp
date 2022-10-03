import { useState, useEffect, Fragment } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import ContactList from "../../common/ContactList";

function Contacts() {
  const [contactData, setContactData] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    let docData = [];
    let contacts = {};
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        contacts = { ...doc.data(), id: doc.id };
        docData.push(contacts);
      });
      setContactData(docData);
    });
  };

  return (
    <Fragment>
      {contactData.length > 0 &&
        contactData.map(({ id, name, email, description }, index) => (
          <ContactList
            key={index}
            index={index}
            id={id}
            name={name}
            email={email}
            description={description}
            getContacts={getContacts}
          />
        ))}
    </Fragment>
  );
}

export default Contacts;

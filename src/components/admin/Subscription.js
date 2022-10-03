import { useState, useEffect, Fragment } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import SubscriberList from "../../common/SubscriperList";

function Subscription() {
  const [subscriberData, setSubscriberData] = useState([]);

  useEffect(() => {
    getSubscribers();
  }, []);

  const getSubscribers = () => {
    let docData = [];
    let subscribers = {};
    const subscribersRef = collection(db, "subscribers");
    onSnapshot(subscribersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        subscribers = { ...doc.data(), id: doc.id };
        docData.push(subscribers);
      });
      setSubscriberData(docData);
    });
  };

  return (
    <Fragment>
      {subscriberData.length > 0 &&
        subscriberData.map(({ id, name, email }, index) => (
          <SubscriberList
            key={index}
            index={index}
            id={id}
            name={name}
            email={email}
            getSubscribers={getSubscribers}
          />
        ))}
    </Fragment>
  );
}

export default Subscription;

import { useEffect, useState } from "react";
import { db } from "../firebase";

export const useChat = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("messages")
      .orderBy("timestamp", "desc")
      .limit(20)
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          setMessage(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
        },
        (error) => {
          setError(error);
        }
      );
    return () => unsubscribe();
  }, [setMessage]);
  return { error, loading, messages };
};

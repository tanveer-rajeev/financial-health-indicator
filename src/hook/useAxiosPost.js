import axios from "axios";
import { useState } from "react";

const useAxiosPost = () => {
  const [res, setRes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postData = (url, payload, cb, successMessage, errorMessage) => {
    setLoading && setLoading(true);
    axios
      .post(url, payload)
      .then((res) => {
        console.log(res);
        setRes(res?.data);
        cb && cb(res?.data);
        setLoading(false);
       
      })
      .catch((err) => {
        setRes([]);
        setError(err);
        setLoading(false);
     
      });
  };

  return [res, postData, loading, setRes, error];
};

export default useAxiosPost;

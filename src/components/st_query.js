import axios from "axios";
import React, { useState, useEffect } from "react";

const St_query = () => {
  const [query, setQuery] = useState([]);
  const getQuery = () => {
    axios({
      url: "http://localhost:8000/api/query/q_type",
      method: "GET",
      params: {
        q_type: `Technical`,
      },
    }).then((res) => {
      console.log(res.data);
      setQuery([res.data]);
    });
  };
  useEffect(() => {
    getQuery();
  }, []);
  return (
    <div>
      {query.map((list) => {
        return list.query;
      })}
    </div>
  );
};

export default St_query;

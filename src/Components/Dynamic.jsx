import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Dynamic.css"; 

export default function Dynamic() {
  const [state, setState] = useState([]);
  const [customers, setCustomers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/transactions?customer_id=${id}`)
      .then((res) => res.json())
      .then((data) => setState(data));
    fetch(`http://localhost:5000/customers?id=${id}`)
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, [id]);

  return (
    <div className="dynamic">
      <h4>Customer Details</h4>
      {customers.map((customer) => (
        <h4 key={customer.id}>{customer.name}</h4>
      ))}
      <h4>Transactions</h4>
      <div className="transaction-details">
        {state.map((transaction) => (
          <div className="transaction-card" key={transaction.id}>
            <h4>Date: {transaction.date}</h4>
            <h4>Amount: {transaction.amount}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}



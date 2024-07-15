import React, { useState, useEffect } from "react";
import "./Outlet.css";
import { MDBInputGroup } from "mdb-react-ui-kit";

function Outlet() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [search, setSearch] = useState("");






  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await fetch("http://localhost:5000/customers");
        const transactionResponse = await fetch(
          "http://localhost:5000/transactions"
        );

        if (!customerResponse.ok) {
          throw new Error(
            `Failed to fetch customers: ${customerResponse.statusText}`
          );
        }
        if (!transactionResponse.ok) {
          throw new Error(
            `Failed to fetch transactions: ${transactionResponse.statusText}`
          );
        }

        const customerData = await customerResponse.json();
        const transactionData = await transactionResponse.json();
        console.log("customerData", customerData);
        console.log("TransactionData", transactionData);

        setCustomers(customerData);
        setTransactions(transactionData);
        setFilteredCustomers(customerData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

      fetchData();
     }, []);

   
  useEffect(() => {
    fetchData();
}, []);

const fetchData = () => {
    fetch('http://localhost:5000/customers')
        .then((res) => res.json())
        .then((data) => setCustomers(data));
    fetch('http://localhost:5000/transactions')
        .then((res) => res.json())
        .then((data) => setTransactions(data));
};

const onSearchChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
        fetchData();
    }
};

const onHandelSubmit = () => {
    if (search === '') {
        fetchData();
        return;
    }
    fetch('http://localhost:5000/transactions')
        .then((res) => res.json())
        .then((data) => {
            const filteredData = data.filter((item) => {
                const customer = customers.find(c => c.id == item.customer_id);
                return (
                    item.amount == search ||
                    (customer && customer.name.toLowerCase().includes(search.toLowerCase()))
                );
            });
            setTransactions(filteredData);
            console.log(transactions);
        });
};


  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilter(value);

    const filtered = customers.filter((customer) =>
      customer.name.includes(value)
    );

    setFilteredCustomers(filtered);
  };

  const getCustomerTransactions = (customerId) => {
    return transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Transactions</h1>
        <input
                        className='mt-2 me-2 bar bg-white rounded-2'
                        placeholder='Search by Amount or Name'
                        onChange={onSearchChange}
                    />
                    <button
                        onClick={onHandelSubmit}
                        className='btn btn-outline-info search text-white h-25  rounded-2'
                    >
                        <i className='icon fa-solid fa-search'></i>
                        
                    </button>
        <table className="customer-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Transaction Date</th>
              {/* <th>Transaction Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => {
              return getCustomerTransactions(customer.id).map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => setSelectedCustomerId(customer.id)}
                >
                  <td>{customer.name}</td>
                  <td>{transaction.date}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ));
            })}
            {customers?.map((el) => {
              return (
                <tr key={el.id}>
                  <td>{el?.name}</td>
                  <td>
                    <a href={`/${el?.id}`}>Details</a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </header>
    </div>
  );
}

export default Outlet;



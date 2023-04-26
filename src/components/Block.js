import React from 'react'

export default function Block({ block, setSelectedBlock }) {
  return (
    <center>
      <h2>Transactions for {block.number}</h2>
      <button onClick={() => setSelectedBlock(null)}>Back to the list of blocks</button>

      <h3>Total Number of Transactions: {block.transactions.length}</h3>

      {
        block.transactions.length ?
          <table border={"black"}>
            <thead>
              <tr>
                <th>Transaction Hash</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {
                block.transactions.map((transaction, i) => {
                  return (
                    <tr key={i}>
                      <th>{transaction.hash}</th>
                      <td>{transaction.from}</td>
                      <td>{transaction.to}</td>
                      <td>{transaction.value}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table> : ""
      }
    </center>
  )
}

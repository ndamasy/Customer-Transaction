

// //fetch json file
var customerData = [];
let mrChart;
fetch('data.json')
   .then(function (response) {
      return response.json();
   })
   .then(function (result) {
      const finalDataToUse = dataPreparation(result);
      displayCustomerData(finalDataToUse);
      creatChart(finalDataToUse, 'bar')
   })
   .catch(function (error) {
      console.error('Error fetching data:', error);
   });

function dataPreparation(obj) {

   if (obj && obj.customers.length > 0 && obj.transactions.length > 0) {
      for (let i = 0; i < obj.customers.length; i++) {
         const customerTransactions = obj.transactions.filter((transaction) => {
            return transaction.customer_id === obj.customers[i].id;
         });
         customerTransactionsAmount = customerTransactions.length > 1 ? customerTransactions.reduce((a, b) => {
            return a.amount + b.amount;
         }) : customerTransactions[0].amount;

         customerData.push({
            customer_id: obj.customers[i].id,
            name: obj.customers[i].name,
            amount: customerTransactionsAmount,
            transaction_id: obj.transactions[i].id,
            date: obj.transactions[i].date
         });
      }
   }

   return customerData;
}

// display data in table
let customerTransactions;

const table = document.querySelector('.table-body-data')
function displayCustomerData(customerData) {
     var customerTableData = '';
    if (customerData &&  customerData.customers.length > 0 &&  customerData.transactions.length > 0) {
         if (customerData &&  customerData.customers.length > 0 &&  customerData.transactions.length > 0) {
        for (let i = 0; i < customerData.customers.customers.length; i++) {
                    customerTableData += `
            
            
              <tr>
                <th scope="row">${customerData[i].customer_id}</th>
                <td>${customerData[i].name}</td>
                <td>${customerData[i].transaction_id}</td>
                <td>${customerData[i].date}</td>
                <td>${customerData[i].amount}</td>
              </tr>
            
                    `
        }
    }

          table.innerHTML =customerTableData ;
    
};
}
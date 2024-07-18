

//fetch json file

fetch('data.json').then(function (response) {
    return response.json();
}).then(function (obj) {
    displayCustomerData(obj);
}).catch(function (err) {
    console.error(err)
})

const table = document.querySelector('.table-body-data')
function displayCustomerData(customerData) {
    var customerTableData = '';
    if (customerData &&  customerData.customers.length > 0 &&  customerData.transactions.length > 0) {
        for (let i = 0; i < customerData.customers.length; i++) {
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

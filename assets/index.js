

// //fetch json file
var customerData = [];
let mrChart;
fetch('./../data.json')
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
        if (customerData && customerData.length > 0) {
            for (let i = 0; i < customerData.length; i++) {
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

        table.innerHTML = customerTableData;

}

// filter by customer name or amount
const searchInput = document.querySelector('form.filter-name .form-control')
searchInput?.addEventListener("input", function (e) {
    var search = e.target.value?.toLowerCase();

    // deep copy / shallow copy: TODO > research
    const searchData = customerData;
    
    const filteredData = searchData.filter((val) => {
        if (val.name.toLowerCase().includes(search) || val.amount.toString().includes(search)) {
            return val;
        }
    });

    displayCustomerData(filteredData);
});



const ctx = document.getElementById('myChart');

function setChartType(chartType) {
   myChart.destroy();
   creatChart(customerData, chartType)
}
function creatChart(data, type) {
   myChart = new Chart(ctx, {
      type: type,
      data: {
         labels: data.map(row => row.name),
         datasets: [{
            label: 'Amount',
            data: data.map(row => row.amount),
            borderWidth: 1
         }]
      },
      options: {
         scales: {
            y: {
               beginAtZero: true
            }
         }
      }
   });
}
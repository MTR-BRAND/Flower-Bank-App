// Add Money Elements
const addButton = document.getElementById("addButton");
const addInput = document.getElementById("addInput");
const Balance = document.getElementById("Balance");
const AddInterface = document.getElementById("AddInterface");
const addConfirm = document.getElementById("add__Confirm");

// Withdraw Money Elements
const WithdrawButton = document.getElementById("WithdrowButton");
const WithdrawInput = document.getElementById("WithdrowInput");
const WithdrowInterface = document.getElementById("WithdrowInterface");
const WithdrawConfirm = document.getElementById("Withdraw__Confirm");

// Transaction History Elements
const Transaction = document.getElementById("Transaction");
const TransactionHistory = document.getElementById("TransactionHistory");
const TransactionButton = document.getElementById("TransactionButton");

// Array to store transactions
const transactions = [];

// Function to add a transaction
function addTransaction(type, amount) {
    const date = new Date().toLocaleString();
    const balance = parseFloat(Balance.textContent.replace('$', ''));
    transactions.push({ date, type, amount, balance });
    updateTransactionHistory();
}

// Function to update transaction history
function updateTransactionHistory() {
    TransactionHistory.innerHTML = ''; // Clear existing content
    transactions.forEach(transaction => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border p-2">${transaction.date}</td>
            <td class="border p-2">${transaction.type}</td>
            <td class="border p-2">$${transaction.amount.toFixed(2)}</td>
            <td class="border p-2">$${transaction.balance.toFixed(2)}</td>
        `;
        TransactionHistory.appendChild(row);
    });
}

// Event listener for adding money
addButton.addEventListener("click", function(e) {
    e.preventDefault();
    AddInterface.classList.toggle("hidden");
    WithdrowInterface.classList.add("hidden");
    Transaction.classList.add("hidden");
});

addConfirm.addEventListener("click", function() {
    const addInputValue = parseFloat(addInput.value);
    let currentBalance = parseFloat(Balance.textContent.replace("$", ""));
    if (addInputValue && addInputValue > 0) {
        currentBalance += addInputValue;
        Balance.textContent = `$${currentBalance.toFixed(2)}`;
        addTransaction('Add', addInputValue);
        addInput.value = "";
    } else {
        alert("Please enter a valid amount.");
    }
});

// Event listener for withdrawing money
WithdrawButton.addEventListener("click", function() {
    WithdrowInterface.classList.toggle("hidden");
    AddInterface.classList.add("hidden");
    Transaction.classList.add("hidden");
});

WithdrawConfirm.addEventListener("click", function() {
    const WithdrawInputValue = parseFloat(WithdrawInput.value);
    let currentBalance = parseFloat(Balance.textContent.replace("$", ""));
    if (WithdrawInputValue && WithdrawInputValue > 0 && WithdrawInputValue <= currentBalance) {
        currentBalance -= WithdrawInputValue;
        Balance.textContent = `$${currentBalance.toFixed(2)}`;
        addTransaction('Withdraw', WithdrawInputValue);
        WithdrawInput.value = "";
    } else {
        alert("Invalid amount or insufficient balance.");
    }
});

// Event listener for the transaction history button
TransactionButton.addEventListener("click", function() {
    Transaction.classList.toggle("hidden");
    AddInterface.classList.add("hidden");
    WithdrowInterface.classList.add("hidden");
});

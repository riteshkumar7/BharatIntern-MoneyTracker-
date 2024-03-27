document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("transcation-form");
    const categoryInput = document.getElementById("category");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const detailsTableBody = document.getElementById("details");
    const totalAmt = document.getElementById("totalAmt");

    let totalAmount = 0;

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const category = categoryInput.value;
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        if (!category || isNaN(amount) || amount <= 0 || !date) {
            alert("Please enter valid data.");
            return;
        }

        const transactionData = {
            category: category,
            amount: amount,
            date: date
        };

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data saved successfully:', data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });

        const newRow = detailsTableBody.insertRow();
        const categoryCell = newRow.insertCell();
        const amountCell = newRow.insertCell();
        const dateCell = newRow.insertCell();
        const deleteCell = newRow.insertCell();

        categoryCell.textContent = category;
        amountCell.textContent = amount;
        dateCell.textContent = date;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function() {
            totalAmount -= amount;
            totalAmt.textContent = totalAmount.toFixed(2);
            detailsTableBody.removeChild(newRow);
        });
        deleteCell.appendChild(deleteButton);

        totalAmount += amount;
        totalAmt.textContent = totalAmount.toFixed(2);
        
        categoryInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
    });
});

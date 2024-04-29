const addForm = document.querySelector(".addForm");
const incomes = document.querySelector(".incomes");
const expenses = document.querySelector(".expenses");

const balance = document.querySelector(".balance");
const totalIncomes = document.querySelector(".in");
const totalExpenses = document.querySelector(".out");

const incomesAmouts = document.querySelectorAll(".income .amount .chiffre");
const expensesAmouts = document.querySelectorAll(".expense .amount .chiffre");

function updateBalance(){
    balance.textContent = Number(totalIncomes.textContent) - Number(totalExpenses.textContent);
}


function saveIncomes(){
    localStorage.setItem("incomes",JSON.stringify(incomes.innerHTML));
}
function saveExpenses(){
    localStorage.setItem("expenses",JSON.stringify(expenses.innerHTML));
}

function loadIncomes(){
    const income = JSON.parse(localStorage.getItem("incomes"));
    if(income){
        incomes.innerHTML = income;
    }
    else{
        return;
    }
}
function loadExpenses(){
    const expense = JSON.parse(localStorage.getItem("expenses"));
    if(expense){
        expenses.innerHTML = expense;
    }
    else{
        return;
    }
}


function saveTotalIncomes(){
    localStorage.setItem("totalIncomes",JSON.stringify(totalIncomes.textContent));
}
function saveTotalExpenses(){
    localStorage.setItem("totalExpenses",JSON.stringify(totalExpenses.textContent));
}

function loadTotalIncomes(){
    const income = JSON.parse(localStorage.getItem("totalIncomes"));
    if(income){
        totalIncomes.textContent = income;
    }
    else{
        totalIncomes.textContent = 0;
    }

}
function loadTotalExpenses(){
    const expense = JSON.parse(localStorage.getItem("totalExpenses"));
    if(expense){
        totalExpenses.textContent = expense;
    }
    else{
        totalExpenses.textContent = 0;
    }
}

balance.textContent = 0;
loadIncomes();
loadExpenses();
loadTotalIncomes();
loadTotalExpenses();
updateBalance();

addForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const source = addForm.Source.value.trim();
    const amount = Number(addForm.Amount.value.trim());
    
    const now = new Date();

    const date = `${now.toLocaleTimeString()}  ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`;
    if(amount !== 0){
        if(amount > 0){
            totalIncomes.textContent = ` ${Number(totalIncomes.textContent) + amount}`;
            incomes.innerHTML += `
                <li class="income">
                    <p class="description">
                        ${source} <br />
                        <span class="transDate" name="transDate">${date}</span>
                    </p>
                    <span class="amount">$ <span class="chiffre">${amount}</span> <i class="bi bi-trash"></i></span>
                </li>`;
                saveTotalIncomes();
                saveIncomes();
        }else{
            totalExpenses.textContent = ` ${Number(totalExpenses.textContent) - amount}`;

            expenses.innerHTML +=`
                <li class="expense">
                    <p class="description">
                        ${source} <br />
                        <span class="transDate" name="transDate">${date}</span>
                    </p>
                    <span class="amount">$<span class="chiffre">${-amount}</span> <i class="bi bi-trash"></i></span>
                </li>`;
                saveExpenses();
                saveTotalExpenses();
        }
        updateBalance();
    }
    addForm.reset();
});


incomes.addEventListener("click",(event)=>{
    const del = event.target;
    if(del.classList.contains("bi")){
        const price = Number(del.parentElement.querySelector(".chiffre").textContent);
        totalIncomes.textContent = ` ${Number(totalIncomes.textContent) - price}`;
        del.parentElement.parentElement.remove();
        saveTotalIncomes();
        updateBalance();
        saveIncomes();
    }
});

expenses.addEventListener("click",(event)=>{
    const target = event.target;
    if(target.classList.contains("bi")){
        const price = Number(target.parentElement.querySelector(".chiffre").textContent);
        totalExpenses.textContent = ` ${Number(totalExpenses.textContent) - price}`;
        target.parentElement.parentElement.remove();
        saveTotalExpenses();
        updateBalance();
        saveExpenses();
    }
});
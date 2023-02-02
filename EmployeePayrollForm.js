/**Problem Statement: Day44 UC4 Ability to save the Employee Payroll Object to Local Storage. 
 - Understand the difference between Local Storage, Session Storage and older feature of
storing in cookies. */

class EmployeePayrollData {
//getter and setter method
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
        if (nameRegex.test(name)) {
            this._name = name;
        } 
        else throw 'Name is Incorrect!';
    }

    get profilePicture() {
        return this._profilePicture;
    }
    set profilePicture(profilePicture) {
        this._profilePicture = profilePicture;
    }

    get gender() {
        return this._gender;
    }
    set gender(gender) {
        this._gender = gender;
    }

    get departments() {
        return this._departments;
    }
    set departments(departments) {
        if (departments.length != 0) {
            this._departments = departments;
        } else throw "No Department Entered!";
    }

    get salary() {
        return this._salary;
    }
    set salary(salary) {
        this._salary = salary;
    }

    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }

    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate <= new Date()) {
            this._startDate = startDate;
        } else throw "Start Date is Incorrect!";
    }

    //toString method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "[ id: " + this.id + ", name: " + this.name + ", gender: " + this.gender + ", profilePicture: " + this._profilePicture +
            ",departments: " + this.departments + ", salary: " + this.salary + ", startDate: " + employeeDate + ", note: " + this._note + " ]" + "\n";
    }
}
//    On Document Load Set Event Listeners
window.addEventListener("DOMContentLoaded", () => {
    const name = document.querySelector("#name");
    const textError = document.querySelector('.text-error');
    const validName = document.querySelector(".valid-name");
    if (name) {
        name.addEventListener("input", function() {
            if (name.value.length == 0) {
                textError.textContent = "";
                validName.textContent = "";
                return;
            } else {
                try {
                    (new EmployeePayrollData()).name = name.value;
                    textError.textContent = "";
                    validName.textContent = '✓';
                    document.querySelector(".submitButton").disabled = false;
                } catch (error) {
                    textError.textContent = error;
                    validName.textContent = "";
                    document.querySelector(".submitButton").disabled = true;
                }
            }
        });
    }

    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output");
    output.textContent=salary.value;
    salary.addEventListener('input',function() {
        output.textContent = salary.value;
    }); 
});

    // On Save Create Employee Payroll Object
const save = () => {
    try {
        let employeePayrollData = createEmployeePayrollObject();
        if (employeePayrollData != undefined) createAndUpdateLocalStorage(employeePayrollData);
    } catch (submitError) {
        alert(submitError);
        return;
    }
};

const createEmployeePayrollObject = () => {
    let employeePayrollData = new EmployeePayrollData();

    employeePayrollData.name = getValue("#name");
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.profilePicture = getSelectedValues("[name=profile]").pop();
    employeePayrollData.salary = getValue("#salary");
    dateString = document.querySelector("#month").value + " " + document.querySelector("#day").value + ", " + document.querySelector("#year").value;
    employeePayrollData.startDate = new Date(dateString);
    employeePayrollData.note = getValue("#notes");
    try {
        employeePayrollData.departments = getSelectedValues("[name=department]");
    } catch (error) {
        alert(error);
        return;
    }
    employeePayrollData.id = createEmployeeId();
    alert("Employee Added Successfully!\n" + employeePayrollData.toString());
    return employeePayrollData;
};

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked) selectedItems.push(item.value);
    });
    return selectedItems;
};
/**1. QuerySelector is the newer feature .
 * 2. The querySelector method can be used when selecting by element name, nesting, or class name.
 * 3. QuerySelector lets you find elements with rules that can't be expressed with getElementByID.
 */
const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

/**1. getElementById is better supported than querySelector in older versions of the browsers.
 * 2. The thing with getElementById is that it only allows to select an element by its id.
*/
const getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

//Saving Employee Payroll to Local Storage
function createAndUpdateLocalStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    } else {
        employeePayrollList = [employeePayrollData];
    }
    alert("Local Storage Updated Successfully!\nTotal Employees : " + employeePayrollList.toString);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
}

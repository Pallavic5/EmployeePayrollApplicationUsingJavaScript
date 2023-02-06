/**Problem Statement: Day44 UC5 Ability to reset the form on clicking reset */
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

    get department() {
        return this._department;
    }
    set department(department) {
            this._department = department;
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
            this._startDate = startDate;
    }

    //toString method
    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const employeeDate = !this.startDate ? "undefined" : this.startDate;
        return "[ id: " + this.id + ", name: " + this.name + ", gender: " + this.gender + ", profilePicture: " + this._profilePicture +
            ",departments: " + this.departments + ", salary: " + this.salary + ", startDate: " + employeeDate + ", note: " + this._note + " ]" + "\n";
    }
}
//    On Document Load Set Event Listeners
window.addEventListener("DOMContentLoaded", (event) => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    if (employeePayrollJson) {
        isUpdate = employeePayrollJson ? true : false;
        if (!isUpdate) return;
        employeePayrollObj = JSON.parse(employeePayrollJson);
        resetForm();
    } else {
        const name = document.querySelector("#name");
        const textError = document.querySelector(".text-error");
        name.addEventListener("input", function () {
            if (name.value && name.value.length == 0) {
                textError.textContent = "";
                return;
            }
            try {
                (new EmployeePayrollData()).name = name.value;
                textError.textContent = "";
            }
            catch (exception) {
                textError.textContent = exception;
            }
        });
        const salary = document.querySelector("#salary");
        const output = document.querySelector(".salary-output");
        output.textContent = salary.value;
        salary.addEventListener("input", function () {
            output.textContent = salary.value;
        });
    }
});

    // On Save Create Employee Payroll Object
    const save = () => {
        try {
            let employeePayrollData = createEmployeePayroll();
            createAndUpdateStorage(employeePayrollData);
        }
        catch (exception) {
            return;
        }
    }

    const getSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        let selItems = [];
        allItems.forEach(item => {
            if (item.checked) {
                selItems.push(item.value);
            }
        });
        return selItems;
    }
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
const getInputValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

//Saving Employee Payroll to Local Storage
function createAndUpdateStorage(employeePayrollData) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList != undefined) {
        employeePayrollList.push(employeePayrollData);
    }
    else {
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
   
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById("#name");
    }
    catch (exception) {
        throw exception;
    }
    employeePayrollData.id = createNewEmployeeId();
    employeePayrollData.profilePicture = getSelectedValues("[name=profile]").pop();
    employeePayrollData.gender = getSelectedValues("[name=gender]").pop();
    employeePayrollData.department = getSelectedValues("[name=department]");
    employeePayrollData.salary = getInputValueById("#salary");
    employeePayrollData.note = getInputValueById("#notes");
    let date = getInputValueById("#day") + " " + getInputValueById("#month") + " " + getInputValueById("#year");
    employeePayrollData.startDate = date;
    return employeePayrollData;
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? "1" : (parseInt(empID) + 1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}
//Reset the Employee Payroll Form
const resetForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary)
    setValue('#notes', employeePayrollObj._notes);
};

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value) {
            item.checked = true;
        }
    });
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}


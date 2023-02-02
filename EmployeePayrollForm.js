/**Problem Statement: Day44 UC2 Ability to set Event Listeners when Document is loaded so as to
- Set Event Listener on Salary Range to display appropriate value
- Validation of Name and Date */

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

function getStudents() {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("GET", "https://utn-lubnan-api-2.herokuapp.com/api/Student");
        request.responseType = "json";
        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            }
            else {
                reject(Error("JSON couldn\"t load correctly"));
            }
        }

        request.onerror = function () {
            reject(Error("There was a network error"));
        }

        request.send();
    })
}

function getCareers() {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("GET", "https://utn-lubnan-api-2.herokuapp.com/api/Career");
        request.responseType = "json";
        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            }
            else {
                reject(Error("JSON couldn\"t load correctly"));
            }
        }

        request.onerror = function () {
            reject(Error("There was a network error"));
        }

        request.send();
    })
}

function deleteStudent(id) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open("DELETE", `https://utn-lubnan-api-2.herokuapp.com/api/Student/${id}`);
        request.onload = function () {
            if (request.status === 200) {
                alert('Eliminacion exitosa!');
                resolve();
            }
            else {
                reject(Error("Hubo un error al eliminar"));
            }
        }

        request.onerror = function () {
            reject(Error("There was a network error"));
        }

        request.send();
    })
}

getStudents()
    .then((studentResponse) => {
        getCareers()
            .then((careerResponse) => {
                var tbody = document.getElementById("student-table-body");
                const studentsArray = [];

                studentResponse.forEach((student) => {
                    if (student.careerId != null) {
                        studentsArray.push(student);
                    }
                })

                studentsArray.sort(function(a, b) {
                    var lastNameA = a.lastName;
                    var lastNameB = b.lastName;

                    if(lastNameA < lastNameB) {
                        return -1;
                    }
                    if(lastNameA > lastNameB) {
                        return 1;
                    }
                    return 0;
                })

                studentsArray.forEach((student) => {
                        var row = document.createElement("tr");
                        var studentIdCell = document.createElement("td");
                        var careerCell = document.createElement("td");
                        var lastNameCell = document.createElement("td");
                        var firstNameCell = document.createElement("td");
                        var emailCell = document.createElement("td");
                        var actionCell = document.createElement("td");

                        studentIdCell.textContent = student.studentId;
                        careerResponse.forEach((career) => {
                            if (student.careerId === career.careerId) {
                                careerCell.textContent = career.name;
                            }
                        })
                        lastNameCell.textContent = student.lastName;
                        firstNameCell.textContent = student.firstName;
                        emailCell.textContent = student.email;
                        var deleteButton = document.createElement("button");
                        deleteButton.className = "btn btn-danger btn-sm";
                        deleteButton.textContent = "Delete";
                        deleteButton.onclick = function() {
                            deleteStudent(student.studentId)
                            .then(() => {
                                row.remove();
                            })
                            .catch((error) => {
                                console.log(Error(error));
                            })
                        }
                        actionCell.appendChild(deleteButton);

                        row.appendChild(studentIdCell);
                        row.appendChild(careerCell);
                        row.appendChild(lastNameCell);
                        row.appendChild(firstNameCell);
                        row.appendChild(emailCell);
                        row.appendChild(actionCell);

                        tbody.appendChild(row);
                })
            })
            .catch ((reason) => {
                console.log(Error(reason));
            })    
    })
    .catch ((reason) => {
        console.log(Error(reason));
    })

    


var nextId = 10006;

var data;
var firstPage = "http://localhost:8080/employees";

function leggiDalServer(urlServer) {
    $.ajax({
        url: urlServer,
      }).done(function(riospostaServer) {
        data = riospostaServer;
        listaImpiegati();
      });
}

$(document).ready(function () {

    leggiDalServer(firstPage);


    $("#add-button").on("click", function (event) {
        console.log("ciao");

        saveModalInputs();

        $('#modelAdd').modal('hide');
    });

});


function listaImpiegati() {
    var rows = "";
    var css_class = "dim-background";
    var cls = "";
    var counter = 0;
    console.log(data);
    $.each(data['_embedded']['employees'], function (key, value) {
        if (counter % 2 == 0) {
            cls = css_class;
        }
        counter++;
        rows += "<tr class='" + cls + "'>";
        rows += "<td>" + value.id + "</td>";
        rows += "<td>" + value.firstName + "</td>";
        rows += "<td>" + value.lastName + "</td>";
        rows += "<td>" + value.birthDate + "</td>";
        rows += "<td>" + value.hireDate + "</td>";
        rows += "<td>" + value.gender + "</td>";
        rows += "<td>" + "<button class='btn btn-danger' onclick='rimuovImpiegato(" + value.id + "); listaImpiegati();'>Cancella</button>";
        rows += "<button class='btn btn-warning' data-bs-toggle='modal' data-bs-target='#edit-employee' onclick='modificaImpiegati' listaImpiegati();'>Modifica</button>" + "</td>";
        rows += "</tr>";
        cls = "";
    });
    $("#to-fill").html(rows);
}

function rimuovImpiegato(id) {
    let i = 0;
    $.each(data, function (key, value) {
        if (value.id == id) {
            data.splice(i, 1);
        }
        i++
    })
}

function aggiungImpiegato(firstName, lastName, birthDate, hireDate, gender) {
    data.push({
        "id": nextId,
        "birthDate": birthDate,
        "firstName": firstName,
        "lastName": lastName,
        "gender": gender,
        "hireDate": hireDate,
    })
    nextId++;
}

$(window).on("load", function () {
    listaImpiegati();
});

function saveModalInputs() {
    aggiungImpiegato(
        $("#firstName").val().trim(),
        $("#lastName").val().trim(),
        $("#birthDate").val(),
        $("#hireDate").val(),
        $("input[name='gender']:checked").val()
    );
    listaImpiegati();
}

function emptyModalInputs() {
    $("#name").val("");
    $("#lastname").val("");
    $("#birthday").val("");
    $("#hiring-date").val("");
}

function modificaImpiegati() {
    id = $(this).parent("td").data("id");
    for (let i = 0; i < data.length; i++) {
        if (data[i].id == id) {
            var myModal = new bootstrap.Modal(document.getElementById("edit-employee"), {});
            myModal.show();
            $('#nome-edit').val(data[i].firstName);
            $('#cognome-edit').val(data[i].lastName);

            if (data[i].gender === "M") {
                $('#edit-sesso-m').prop("checked", true);
            } else {
                $('#edit-sesso-f').prop("checked", true);
            }

            $('#data-nascita-edit').val(data[i].birthDate);
            $('#data-assunzione-edit').val(data[i].hireDate);
            break;
        }
    }
}

function callFirstPage(){
    $.get(firstPage, function(values,status){
        lastPage = values._links.last.href;
        nextPage = values._links.next.href;
        selfPage = firstPage;
        previousPage = selfPage;
    
        data = values._embedded.employees;
        updatePageNumber(values.page.number);
        updateEmployees();
    
        updateNextId();
        totPages = values.page.totalPages;
        checkPageButtons(values.page.number);
    });
}

function loadLastPage(){
    $.get(lastPage, function(values,status){
  
      nextPage = "";
      previousPage = values._links.prev.href;
      selfPage = lastPage;
  
      data = values._embedded.employees;
      updatePageNumber(values.page.number);
      updateEmployees();
      totPages = values.page.totalPages;
      checkPageButtons(values.page.number);
    });
  }
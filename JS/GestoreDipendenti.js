var data = [{
    "id": 10001,
    "birthDate": "1953-09-01",
    "firstName": "Georgi",
    "lastName": "Facello",
    "gender": "M",
    "hireDate": "1986-06-25",
},
{
    "id": 10002,
    "birthDate": "1964-06-01",
    "firstName": "Bezalel",
    "lastName": "Simmel",
    "gender": "F",
    "hireDate": "1985-11-20",
},
{
    "id": 10003,
    "birthDate": "1959-12-02",
    "firstName": "Parto",
    "lastName": "Bamford",
    "gender": "M",
    "hireDate": "1986-08-27",
},
{
    "id": 10004,
    "birthDate": "1954-04-30",
    "firstName": "Chirstian",
    "lastName": "Koblick",
    "gender": "M",
    "hireDate": "1986-11-30",
},
{
    "id": 10005,
    "birthDate": "1955-01-20",
    "firstName": "Kyoichi",
    "lastName": "Maliniak",
    "gender": "M",
    "hireDate": "1989-09-11",
}
];

var nextId = 10006;

$(document).ready(function () {


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

    $.each(data, function (key, value) {
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
$('.form-type-ajax').submit(function (event) {
    event.preventDefault();

    var form = $(this)[0];
    var formData = new FormData(form);

    $(".form-errors").hide();
    $(".form-errors").html(null);

    var formMethod = form.method;

    if(formData.get('_method') !== null) {
        formMethod = formData.get('_method');
    }

    axios({
        method: formMethod,
        url: form.action,
        data: formData

    }).then((response) => {
        switch (response.data.succefulRequestAction) {
            case undefined:
                break;
            case 'nothing':
                break;
            case 'backWithCache':
                window.history.back();
                break;
            case 'back':
                window.location = document.referrer
                break;
            case 'reload':
                location.reload();
                break;
            default:
                break;
        }

    }).catch((err) => {
        if (err.response.data.errors !== undefined && !$.isEmptyObject(err.response.data.errors)) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
                $(".form-errors").append("<p>" + value.message + "</p>");
            }

        } else {
            $(".form-errors").append("<p>" + err.response.data.message + "</p>");
        }

        $(".form-errors").show();
    });
});

$('.btn-destroy-ajax').click(function (event) {
    const urlDelete = $(this).data('url');

    if(urlDelete === "" || urlDelete === undefined || urlDelete === null) {
        alert('Atributo data-url é requirido no button');
    }

    axios.delete(urlDelete).then((response) => {
        window.location.reload();

    }).catch((err) => {
        var errMsg = "";

        if(err.response.data.errors !== undefined && !$.isEmptyObject(err.response.data.errors)) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
                errMsg += value + "\n\r";
            }

            alert(errMsg);
        } else {
            alert(err.response.data.message);
        }
    });
});

$('.btn-disable-ajax').click(function (event) {
    const urlDisable = $(this).data('url');

    if(urlDisable === "" || urlDisable === undefined || urlDisable === null) {
        alert('Atributo data-url é requirido no button');
    }

    axios.put(urlDisable).then((response) => {
        window.location.reload();

    }).catch((err) => {
        var errMsg = "";

        if(err.response.data.errors !== undefined && !$.isEmptyObject(err.response.data.errors)) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
                errMsg += value + "\n\r";
            }

            alert(errMsg);
        } else {
            alert(err.response.data.message);
        }
    });
});

$('.btn-enable-ajax').click(function (event) {
    const urlEnable = $(this).data('url');

    if(urlEnable === "" || urlEnable === undefined || urlEnable === null) {
        alert('Atributo data-url é requirido no button');
    }

    axios.put(urlEnable).then((response) => {
        window.location.reload();

    }).catch((err) => {
        var errMsg = "";

        if(err.response.data.errors !== undefined && !$.isEmptyObject(err.response.data.errors)) {
            for (const [key, value] of Object.entries(err.response.data.errors)) {
                errMsg += value + "\n\r";
            }

            alert(errMsg);
        } else {
            alert(err.response.data.message);
        }
    });
});
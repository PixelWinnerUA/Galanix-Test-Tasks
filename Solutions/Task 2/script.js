$(document).ready(() => {

    let deletedImages = localStorage.deletedImages ? JSON.parse(localStorage.getItem("deletedImages")) : [];

    // Start info about image
    const showStartInfo = () => {
        for (let i = 0; i < deletedImages.length; i++) {
            $(".gallery-wrapper").find(".gallery-item#" + deletedImages[i]).removeClass("gallery-item").addClass("deleted-gallery-item")
        }
        let imageLength = $(".gallery-item").length;
        const d = new Date().toLocaleDateString(navigator.language, { hour: "2-digit", minute: "2-digit" });
        $(".start-info").html('<p>В галереи всего ' + imageLength + ' изображений. <br> Cегодня ' + d + "</p>");
    }

    showStartInfo();

    // Button exit
    $("img", ".item-img").click(function () {
        $("#full-image").attr("src", $(this).attr('src'));
        $(".full-image-background").addClass("active");
        $("body").addClass("active");
    });

    // Button exit
    $("#exit").click(function () {
        $(".full-image-background").removeClass("active");
        $("body").removeClass("active");
    });

    // Button delete
    $(".item-delete").click(function () {
        $(this).parent().removeClass("gallery-item").addClass("deleted-gallery-item");
        showStartInfo();
        deletedImages.push($(this).parent().attr("id"));
        localStorage.setItem("deletedImages", JSON.stringify(deletedImages));
    });

    // Button reset
    $("#reset").click(function () {
        $(".deleted-gallery-item").removeClass("deleted-gallery-item").addClass("gallery-item");
        deletedImages = [];
        localStorage.setItem("deletedImages", deletedImages);
        showStartInfo();
    })
})
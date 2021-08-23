(function () {
  const showBtn = document.querySelector("#show-modal");
  const showDialogBtn = document.querySelector("#show-dialog");
  let modalContainer = document.querySelector("#modal-container");
  let dialogPromiseReject;

  function showModal(title, text) {
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
    modalContainer.classList.add("is-visible");
  }

  function hideModal() {
    if (modalContainer.classList.contains("is-visible")) {
      modalContainer.classList.remove("is-visible");
      modalContainer.querySelector(".modal").remove();
    }
    if (dialogPromiseReject) {
      dialogPromiseReject(); // calling the reject function of the promise
      dialogPromiseReject = null;
    }
  }

  function showDialog(title, text) {
    showModal(title, text);
    let modal = modalContainer.querySelector(".modal");
    let confirmButton = document.createElement("button");
    confirmButton.classList.add("modal-confirm");
    confirmButton.innerText = "Confirm";

    let cancelButton = document.createElement("button");
    cancelButton.classList.add("modal-cancel");
    cancelButton.innerText = "Cancel";

    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);
    confirmButton.focus();

    return new Promise((resolve, reject) => {
      cancelButton.addEventListener("click", hideModal);
      confirmButton.addEventListener("click", () => {
        dialogPromiseReject = null;
        hideModal();
        resolve();
      });
      dialogPromiseReject = reject;
    });
  }

  //event listeners

  showBtn.addEventListener("click", () => {
    showModal("Hey!", "this is my modal and it's really cool!");
  });

  showDialogBtn.addEventListener("click", () => {
    showDialog("Confirm Action", "Are you sure you want to do this??").then(
      function () {
        alert("Confirmed!");
      },
      () => {
        alert("Not Confirmed :(");
      }
    );
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  modalContainer.addEventListener("click", (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    showModal,
    hideModal,
  };
})();

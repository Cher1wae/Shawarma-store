const statusBox = document.getElementById("status");
const orderBtn = document.getElementById("orderBtn");
const orderInput = document.getElementById("orderInput");

function updateStatus(message) {
  statusBox.innerHTML += `<p>${message}</p>`;
}

function takeOrder(orderName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof orderName === "string") {
        resolve(orderName.trim().toLowerCase());
      } else {
        reject("Invalid order");
      }
    }, 2000);
  });
}

const availableIngredients = ["chicken", "beef"];

orderBtn.addEventListener("click", () => {
  statusBox.innerHTML = "";
  const order = orderInput.value;

  updateStatus("📝 Taking your order...");

  takeOrder(order)
    .then((result) => {
      if (availableIngredients.includes(result)) {
        updateStatus(`Ingredients ready for ${result} shawarma`);
        return result;
      } else {
        throw new Error(`❌ Out of stock: ${result}`);
      }
    })
    .then((result) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          updateStatus(` ${result} shawarma is ready`);
          resolve(result);
        }, 8000);
      });
    })
    .then((result) => {
      setTimeout(() => {
        updateStatus(`🍽️ Serving your ${result} shawarma. Enjoy!`);
      }, 5000);
    })
    .catch((err) => {
      updateStatus(`⚠️ ${err.message || err}`);
    });
});

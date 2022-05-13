let countRow = 0;

function addMoreRow() {
  countRow++;
  let table = document.getElementById("table");

  let tr = document.createElement("tr");
  tr.setAttribute("id", "table-row");

  let td_product = document.createElement("td");
  let td_quantity = document.createElement("td");
  let td_price = document.createElement("td");
  let td_subTotal = document.createElement("td");

  let input_product = document.createElement("input");
  input_product.setAttribute("type", "text");
  input_product.setAttribute("list", "product-list");

  let input_quantity = document.createElement("input");
  input_quantity.setAttribute("type", "number");
  input_quantity.setAttribute("name", "quantity");
  input_quantity.setAttribute("value", "");
  input_quantity.setAttribute("class", "quantity");
  input_quantity.setAttribute("id", "quantity" + countRow);
  input_quantity.setAttribute("oninput", "calculateBoth(this)");

  let input_price = document.createElement("input");
  input_price.setAttribute("type", "number");
  input_price.setAttribute("name", "price");
  input_price.setAttribute("value", "");
  input_price.setAttribute("id", "price" + countRow);
  input_price.setAttribute("class", "price");
  input_price.setAttribute("oninput", "calculateBoth(this)");

  let input_subTotal = document.createElement("input");
  input_subTotal.setAttribute("type", "text");
  input_subTotal.setAttribute("name", "sub-total");
  input_subTotal.setAttribute("id", "sub-total" + countRow);
  input_subTotal.setAttribute("class", "sub-total");
  input_subTotal.setAttribute("disabled", true);

  let btn_delete = document.createElement("button");
  btn_delete.setAttribute("class", "delete-btn");
  btn_delete.innerText = "លុប";

  let div_product = document.createElement("div");
  div_product.setAttribute("id", "div-product");

  td_product.appendChild(div_product);
  td_quantity.appendChild(input_quantity);
  td_price.appendChild(input_price);
  td_subTotal.appendChild(input_subTotal);
  div_product.appendChild(btn_delete);
  div_product.appendChild(input_product);

  tr.appendChild(td_product);
  tr.appendChild(td_quantity);
  tr.appendChild(td_price);
  tr.appendChild(td_subTotal);

  table.appendChild(tr);

  btn_delete.addEventListener("click", DeleteRow);
}

function DeleteRow(e) {
  e.target.closest("tr").remove();
  countRow--;
  calculateTotalPrice();
}

function calculateSubTotal(inputId) {
  let id = "";
  if (inputId.id.length <= 6) id = inputId.id.charAt(inputId.id.length - 1);
  else if (inputId.id.length > 6 && inputId.id.length < 8)
    id =
      inputId.id.charAt(inputId.id.length - 2) +
      inputId.id.charAt(inputId.id.length - 1);
  else if (inputId.id.length >= 100)
    id =
      inputId.id.charAt(inputId.id.length - 3) +
      inputId.id.charAt(inputId.id.length - 2) +
      inputId.id.charAt(inputId.id.length - 1);

  let price = document.getElementById("price" + id).value;
  let quantity = document.getElementById("quantity" + id).value;
  document.getElementById("sub-total" + id).value = (
    price * quantity
  ).toLocaleString("en");
}

function calculateTotalPrice() {
  let totalPrice = 0;

  for (let i = 0; i <= countRow; i++) {
    let subTotalPrice = document
      .getElementById("sub-total" + i)
      .value.replaceAll(",", "");

    totalPrice += parseInt(subTotalPrice);
  }
  document.getElementById("total-price").innerText =
    "សរុប: " + totalPrice.toLocaleString();
}

function calculateBoth(inputId) {
  calculateSubTotal(inputId);
  calculateTotalPrice();
}

function getDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  let hh = today.getHours();
  let min = today.getMinutes();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  if (min < 10) min = "0" + min;

  if (hh > 12) {
    hh -= 12;
  } else if (hh === 0) {
    hh = 12;
  }

  const date = dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min;

  document.getElementById("invoice").innerHTML += `<br>` + date;
}

getDate();

let countRow = 0;

document.getElementById("quantity0").addEventListener("input", calculateBoth);
document.getElementById("price0").addEventListener("input", calculateBoth);

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

  let input_price = document.createElement("input");
  input_price.setAttribute("type", "number");
  input_price.setAttribute("name", "price");
  input_price.setAttribute("value", "");
  input_price.setAttribute("id", "price" + countRow);
  input_price.setAttribute("class", "price");

  let input_subTotal = document.createElement("input");
  input_subTotal.setAttribute("type", "text");
  input_subTotal.setAttribute("name", "subTotal");
  input_subTotal.setAttribute("id", "subTotal" + countRow);
  input_subTotal.setAttribute("class", "subTotal");
  input_subTotal.setAttribute("value", "0");
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
  input_quantity.addEventListener("input", calculateBoth);
  input_price.addEventListener("input", calculateBoth);
}

function DeleteRow(e) {
  e.target.closest("tr").remove();
  countRow--;
  calculateTotalPrice();
}

function calculateSubTotal(e) {
  let quantity = e.target.closest("tr").querySelector(`[class=quantity]`).value;
  let price = e.target.closest("tr").querySelector(`[class=price]`).value;

  e.target.closest("tr").querySelector(`[class=subTotal]`).value = (
    price * quantity
  ).toLocaleString("en");
}

function calculateTotalPrice() {
  let totalPrice = 0;

  let tableRows = document.getElementById("table").rows;
  for (i = 1; i < tableRows.length; i++) {
    let subTotalPrice = tableRows[i].cells[3].children[0].value.replaceAll(
      ",",
      ""
    );
    totalPrice += parseInt(subTotalPrice);
  }

  document.getElementById("total-price").innerText =
    "សរុប: " + totalPrice.toLocaleString();
}

function calculateBoth(e) {
  calculateSubTotal(e);
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

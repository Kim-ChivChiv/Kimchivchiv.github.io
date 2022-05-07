const APIKEY = "AIzaSyBSHNksoQzvr4-MnUVAyZgvY6jAFxWX628";

const SHEET_ID = "1_umIuKzfIHRuGpXP3izwA_PPuWD8kVsugIlArXHz5T0";
let productNameData;

let productList = document.getElementById("product-list");

axios
  .get(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/A1:A?key=${APIKEY}`
  )
  .then((res) => {
    productNameData = res.data.values;
    productNameData.sort();

    productNameData.forEach((product) => {
      let productOption = document.createElement("option");
      productOption.innerHTML = product;
      productList.appendChild(productOption);
    });
  });

//this is for the replacement for body-parser
// app.use(express.json());
// // Parse URL-encoded bodies
// app.use(express.urlencoded({ extended: true }));
let path = require("path");
let axios = require("axios");
//this is for the product view
let productView = (req, res) => {
  res.sendFile(path.join(__dirname, "../public/product.html"));
};
//this is for allProduct response
let allProductData = (req, res) => {
  console.log(req.query);
  let url;
  let { text, limit, skip, cat, sort } = req.query;
  if (text) {
    url = `https://dummyjson.com/products/search?q=${text}`;
  } else if (cat) {
    url = `https://dummyjson.com/products/category/${cat}`;
  } else {
    url = "https://dummyjson.com/products?limit=9&skip=0";
  }

  axios
    .get(url)
    .then((item) => {
      let temp = [...item.data.products];

      if (sort == "lowest") {
        temp = temp.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (sort == "highest") {
        temp = temp.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (sort == "inc") {
        temp = temp.sort((a, b) => {
          return a.title.localeCompare(b.title);
        });
      } else {
        temp = temp.sort((a, b) => {
          return b.title.localeCompare(a.title);
        });
      }
      res.send(temp);
    })
    .catch((err) => {
      res.send({ msg: "error is counter" });
    });
};
//this is for the error
let error = (req, res) => {
  res.send("link is not found");
};
//this is the export
module.exports = {
  productView,
  allProductData,
  error,
};

const http = require("http");
const path = require("path");
const fs = require("fs");
let server = http.createServer();

server.on("request", (req, res) => {
  //dbfile

  if (req.url === "/style.css") {
    // Serve the CSS file for all routes
    const cssFilePath = path.join(
      __dirname,
      "..",
      "public",
      "css",
      "style.css"
    );
    fs.readFile(cssFilePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("CSS file not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });

        res.end(data);
      }
    });
  }
  //this is for reading css of edit html
  else if (req.url == "/edit.css") {
    let editpath = path.join(__dirname, "..", "public", "css", "edit.css");
    fs.readFile(editpath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "plain/text" });
        res.end("somthing error to read");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }
  //this is for serve service.css
  else if (req.url === "/service.css") {
    let serviceCssPath = path.join(
      __dirname,
      "..",
      "public",
      "css",
      "service.css"
    );
    fs.readFile(serviceCssPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("file is not available");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(data);
      }
    });
  }
  //this is for index
  else if (req.url === "/") {
    let homePath = path.join(__dirname, "..", "public", "index.html");
    fs.readFile(homePath, "utf-8", (err, data) => {
      res.end(data);
    });
  }
  //this for about
  else if (req.url === "/about") {
    let aboutPath = path.join(__dirname, "..", "public", "about.html");
    fs.readFile(aboutPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("about page is not available");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  //this for service
  else if (req.url == "/service") {
    let servicePath = path.join(__dirname, "..", "public", "service.html");
    fs.readFile(servicePath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("service page is not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  //this is for contact reading
  else if (req.url == "/contact") {
    let contactPath = path.join(__dirname, "..", "public", "contact.html");
    fs.readFile(contactPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("contact is not found");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  }
  //this for product page
  else if (req.url == "/product") {
    let productPath = path.join(__dirname, "..", "public", "product.html");
    fs.readFile(productPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("product page is not found");
      } else {
        let dbpath = path.join(__dirname, "..", "db", "data.js");
        fs.readFile(dbpath, "utf-8", (err, item) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("somthing wrong");
          } else {
            let y = JSON.parse(item);
            let cardvalue = y
              .map((item) => {
                return `<div class="col">
                <div class="card">
                  <div class="card-body">
                    <p>id:${item.id}</p>
                    <h1>${item.name}</h1>
                  </div>
                  <div class="card-footer">
            
                    <form method="POST" action="/perform-action">
                    <input type="hidden" name="action" value="edit"/>
                    <input type="hidden" name="id" value="${item.id}"/>
                    <button class="btn btn-primary">edit</button>
                    </form>
                   
                    <form method="POST" action="/perform-action">
                    <input type="hidden" name="action" value="delete"/>
                    <input type="hidden" name="id" value="${item.id}"/>
                    <button class="btn btn-danger"> delete</button>
                    </form>
                  </div>
                </div>
              </div>`;
              })
              .join("");
            let newTemplate = data.replace(
              "<!-- this is the place where we have to add by nodejs -->",
              cardvalue
            );
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(newTemplate);
          }
        });
      }
    });
  }
  //this for post from conactus page
  else if (req.url === "/submit" && req.method === "POST") {
    let body = "";
    let name = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body.toString());
      name = formData.get("text");
      let dbPath = path.join(__dirname, "..", "db", "data.js");
      fs.readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("somthing wrong ");
        } else {
          let arrData;
          let obj = {
            id: Math.trunc(Math.random() * 100),
            name: name,
          };
          try {
            arrData = JSON.parse(data);
          } catch (err) {
            arrData = [];
          }
          arrData.push(obj);

          //write file
          fs.writeFile(dbPath, JSON.stringify(arrData), (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "text/plain" });
              res.end("Error writting the file");
            } else {
              res.writeHead(200, { "Content-Type": "text/plain" });
              res.end("data write correctly");
            }
          });
        }
      });
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(`  
      <h2>Form Data Received:</h2><p>Name: ${name}</p> 
        <a href="/product">  goback </a>
         `);
    });
  } else if (req.url == "/perform-action" && req.method == "POST") {
    let body = "";
    let action = "";
    let id = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body.toString());
      action = formData.get("action");
      id = formData.get("id");

      if (action == "edit") {
        let editpath = path.join(__dirname, "..", "public", "edit.html");
        fs.readFile(editpath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "plain/text" });
            res.end("somthing wrong to read edit file");
          } else {
            let dbpath = path.join(__dirname, "..", "db", "data.js");
            let findName = "";
            fs.readFile(dbpath, "utf-8", (err, datadb) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("somthing wrong");
              } else {
                let x = JSON.parse(datadb);
                let z = x.find((item) => {
                  return item.id == id;
                });
                findName = z.name;
                let temp = data
                  .replace("{value}", findName)
                  .replace("{id}", id.toString());
                res.end(temp);
              }
            });
          }
        });
      }
      if (action == "delete") {
        let dbpath = path.join(__dirname, "..", "db", "data.js");
        fs.readFile(dbpath, "utf-8", (err, data) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("somthing wrong with reading of db");
          } else {
            let orignalData = JSON.parse(data);
            let delteData = orignalData.filter((data) => {
              return data.id != id;
            });
            fs.writeFile(dbpath, JSON.stringify(delteData), (err) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "plain/text" });
                res.end(
                  "somthing wrong occur when we write the file after delete"
                );
              }
            });
            res.writeHead(302, { Location: "/product" });
            res.end();
          }
        });
      }
    });
  } else if (req.url == "/edit" && req.method == "POST") {
    let dbpath = path.join(__dirname, "..", "db", "data.js");
    let body = "";
    let action = "";
    let valueId = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body.toString());
      valueId = formData.get("valueId");
      action = formData.get("action");

      let dbPath = path.join(__dirname, "..", "db", "data.js");
      fs.readFile(dbPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "plain-text" });
          res.end("somthing wrong");
        } else {
          let orignalData = JSON.parse(data);

          let updataedData = orignalData.map((data) => {
            if (data.id == valueId) {
              return { ...data, name: action };
            } else {
              return data;
            }
          });
          fs.writeFile(dbpath, JSON.stringify(updataedData), (err) => {
            if (err) {
              res.writeHead(404, { "Content-Type": "text/plain" });
              res.end("somthing wrong to writing");
            } else {
              res.writeHead(302, { Location: "/product" });
              res.end();
            }
          });
        }
      });
    });
  }
  //this is for the quote mangement
  else if (req.url == "/quote") {
    let quotepath = path.join(__dirname, "..", "db", "quote.js");
    let quoteTemplate = path.join(__dirname, "..", "public", "quote.html");
    fs.readFile(quoteTemplate, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(204, { "Content-Type": "text/plain" });
        res.end("somthing error in while reading quote html");
      } else {
        fs.readFile(quotepath, "utf-8", (err, arrdata) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("somthing wrong to reading quote data");
          } else {
            let temp = "";
            JSON.parse(arrdata).forEach((data) => {
              temp += ` <div class="col-md-3  m-3">
                   <div class="card bg-dark text-white">
                       <div class="card-body">
                           <span>${data.text}</span>
                       </div>
                       <div class="card-footer" >
                         <form method="POST" action="/performquoteaction">
                           <input type='text' value=${data.id} hidden name="quoteId"/>
                           <input type='text' name="action" value="quoteEdit" hidden/> 
                           <button class="btn btn-primary">edit</button>
                        </form>
                        <form method="POST" action="/performquoteaction">
                        <input type='text' value=${data.id} hidden name="quoteId"/>
                        <input type='text' name="action"  value="quoteDel" hidden/> 
                           <button class="btn btn-danger"   type="submit">del</button>
                         </form>
                           
                       </div>
                   </div>
               </div>`;
            });
            let newTemp = data.replace("<!-- add dynamic content -->", temp);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(newTemp);
          }
        });
      }
    });
  } else if (req.url == "/quoteSubmit" && req.method == "POST") {
    let quotepath = path.join(__dirname, "..", "db", "quote.js");
    let body = "";
    req.on("data", (data) => {
      body += data;
    });
    req.on("end", () => {
      let x = new URLSearchParams(body.toString());
      let action = x.get("quote");
      let obj = {
        id: Math.trunc(Math.random() * 100),
        text: action,
      };
      fs.readFile(quotepath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("somthing error occure while reading data");
        } else {
          let newData = JSON.parse(data);
          let finalarr = [...newData, obj];
          fs.writeFile(quotepath, JSON.stringify(finalarr), (err) => {
            if (err) {
              res.writeHead(404, { "Content-Type": "text/plain" });
              res.end("somthing wrong when we are writing data in arr");
            } else {
              res.writeHead(302, { Location: "/quote" });
              res.end();
            }
          });
        }
      });
    });
  } else if (req.url == "/performquoteaction" && req.method == "POST") {
    let body = "";
    req.on("data", (item) => {
      body += item;
    });
    req.on("end", (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("somthing error...");
      } else {
        let x = new URLSearchParams(body.toString());
        let id = x.get("quoteId");
        let action = x.get("action");
        let dbpath = path.join(__dirname, "..", "db", "quote.js");
        if (action == "quoteDel") {
          fs.readFile(dbpath, "utf-8", (err, data) => {
            if (err) {
              res.writeHead(404, { "Content-Type": "text/plain" });
              res.end("somthing wrong while reading the data");
            } else {
              let newdata = JSON.parse(data);

              let updateData = newdata.filter((item) => {
                return item.id != id;
              });

              fs.writeFile(dbpath, JSON.stringify(updateData), (err) => {
                if (err) {
                  res.writeHead(404, { "Content-Type": "text/plain" });
                  res.end("somthing wrong while writing the data");
                } else {
                  //res.writeHead(302, { Location: "/quote" });
                  res.end("work done");
                }
              });
            }
          });
        }
        if (action == "quoteEdit") {
          let bodyTemp = "";
          let quoteEditPath = path.join(
            __dirname,
            "..",
            "public",
            "quoteEdit.html"
          );
          fs.readFile(dbpath, "utf-8", (err, item) => {
            if (err) {
              res.writeHead(404, { "Content-Type": "text/plain" });
              res.end("somthing wrong while reading the data");
            } else {
              let readData = JSON.parse(item);
              let foundData = readData.find((findData) => {
                return findData.id == id;
              });

              fs.readFile(quoteEditPath, "utf-8", (err, datatemp) => {
                if (err) {
                  res.writeHead(404, { "Content-Type": "text/plain" });
                  res.end("somthing wrong while reading the editquote");
                } else {
                  bodyTemp += datatemp
                    .replace("{editId}", foundData.id)
                    .replace("{editText}", foundData.text);
                }
                res.end(bodyTemp);
              });
            }
          });
        }
      }
    });
  } else if (req.url === "/editquote" && req.method == "POST") {
    let dbPath = path.join(__dirname, "..", "db", "quote.js");
    let quoteEditPath = path.join(__dirname, "..", "public", "quoteEdit.html");
    fs.readFile(quoteEditPath, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("somthing wrong here");
      } else {
        let body = "";
        req.on("data", (item) => {
          body += item;
        });
        req.on("end", (err) => {
          if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("somthing error");
          } else {
            let x = new URLSearchParams(body.toString());
            let editId = x.get("editId");
            let editText = x.get("editText");
            fs.readFile(dbPath, "utf-8", (err, readData) => {
              if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("somthing wrong while we are reading the db");
              } else {
                let parseData = JSON.parse(readData);
                let updateData = parseData.map((item) => {
                  if (item.id == editId) {
                    return {
                      ...item,
                      text: editText,
                    };
                  } else {
                    return {
                      ...item,
                    };
                  }
                });
                fs.writeFile(dbPath, JSON.stringify(updateData), (err) => {
                  if (err) {
                    res.writeHead(404, { "Content-Type": "text/plain" });
                    res.end("somthing problem while writing");
                  } else {
                    console.log("hello utsav");
                    res.writeHead(302, { Location: "/quote" });
                    res.end();
                  }
                });
              }
            });
          }
        });
      }
    });
  } else {
    res.end("route is not found");
  }
});
server.listen("8000", (err) => {
  if (err) {
    console.log("somthing error while creating server");
  } else {
    console.log("port we are listing in 8000");
  }
});

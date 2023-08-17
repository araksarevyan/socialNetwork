const fs = require('fs');

module.exports = class Cart {
	static deleteProduct(id) {
	  fs.readFile("info.json", (err, fileContent) => {
		if (err) {
		  return;
		}
		const updatedCart = { ...JSON.parse(fileContent) };
		updatedCart.products = updatedCart.products.filter(
			prod => prod.id !== id
		  );
		fs.writeFile("info.json", JSON.stringify(updatedCart), err => {
		  console.log(err);
		});
	  });
	}
  };
  

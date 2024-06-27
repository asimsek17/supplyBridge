// importData.js
require("dotenv").config();
const XLSX = require("xlsx");
const sequelize = require("../../config/database"); 

const { OEM, VehicleModel, Supplier, Component } = require("../../models"); 
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    process.exit(1);
  }
}

async function loadDataFromExcel(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; 
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(sheet);

  for (const item of data) {
    
    const [oem, createdOEM] = await OEM.findOrCreate({
      where: {
        maker: item.Maker,
        brand: item.Brand,
        origin: item["OEM Origin"],
        IDOEM: item["ID-OEM"],
      },
      defaults: {},
    });

    const [vehicleModel, createdVM] = await VehicleModel.findOrCreate({
      where: {
        modelName: item.Model,
        oemId: oem.id,
        type: item["Vehicle Type"],
        propulsion: item["Propulsion"],
        propulsionType: item["Propulsion Type"],
        productionCountry: item["Vehicle Production Country"],
        modelYear: item["Model Year"],
        productionRegion: item["Production Region"],
      },
      defaults: {},
    });

    const [supplier, createdSupplier] = await Supplier.findOrCreate({
      where: {
        shortName: item["Supplier Short Name"],
        longName: item["Supplier Long name"],
      },
      defaults: {
      },
    });

    const [component, createdComponent] = await Component.findOrCreate({
      where: {
        productL3: item["(L3) Product"],
        modelId: vehicleModel.id,
        supplierId: supplier.id,
        level0: item["(L0)"],
        level1: item["L1"],
        categoryL2: item["Component Category (L2)"],
        detailsL4: item["In parenthesis (L4)"],
        supplierId: supplier.id,
      },
      defaults: {},
    });

  }

  console.log("Data imported successfully.");
}

(async () => {
  const filePath = process.argv[2];
  if (!filePath) {
    console.error("Please provide a file path");
    process.exit(1);
  }

  await testDatabaseConnection();

  await loadDataFromExcel(filePath);
})();

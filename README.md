# Supply Bridge Backend Technical Assessment

## Database Schema Design

### Schema Design

The database schema is designed to store and manage supplier information efficiently. The schema consists of the following tables:

1. **Suppliers**
    - `id`: Primary key, unique identifier for each supplier.
    - `short_name`: Short name of the supplier.
    - `long_name`: Long name of the supplier.

2. **OEMs**
    - `id`: Primary key, unique identifier for each OEM.
    - `name`: Name of the OEM.
    - `origin`: Origin of the OEM.
    - `production_region`: Production region of the OEM.
    - `maker`: Maker associated with the OEM.
    - `brand`: Brand associated with the OEM.

3. **VehicleModels**
    - `id`: Primary key, unique identifier for each vehicle model.
    - `name`: Name of the vehicle model.
    - `vehicle_type`: Type of vehicle.
    - `propulsion`: Propulsion type.
    - `propulsion_type`: Specific type of propulsion.
    - `production_country`: Country where the vehicle is produced.
    - `model_year`: Year of the vehicle model.
    - `oem_id`: Foreign key referencing `OEMs(id)`.

4. **Components**
    - `id`: Primary key, unique identifier for each component.
    - `name`: Name of the component.
    - `category_l0`: Level 0 category of the component.
    - `category_l1`: Level 1 category of the component.
    - `category_l2`: Level 2 category of the component.
    - `category_l3`: Level 3 category of the component.
    - `category_l4`: Level 4 category of the component (in parenthesis).
    - `supplier_id`: Foreign key referencing `Suppliers(id)`.
    - `vehicle_model_id`: Foreign key referencing `VehicleModels(id)`.
      
5. **Users**
    - `id`: Primary key, unique identifier for each user.
    - `username`: Username of the user.
    - `email`: Email of the user.
    - `password`: Hashed password of the user.
      
### Rationale

- **Normalization**: The schema is normalized to eliminate redundancy and ensure data integrity. Each table represents a distinct entity with appropriate relationships.
- **Relationships**: Foreign keys are used to establish relationships between tables, ensuring referential integrity. This helps maintain a clear structure and enables efficient querying.
- **Scalability**: The schema is designed to handle a large number of records efficiently, making it scalable for future growth.
- **Flexibility**: The design allows for easy updates and additions of new data without affecting the existing structure.
### Summary
Separating the data into four distinct tables—Suppliers, OEMs, VehicleModels, and Components—enhances data integrity, scalability, and maintainability by adhering to normalization principles. This structure eliminates redundancy, ensures consistency, and leverages foreign keys to maintain clear relationships between entities. Consequently, it facilitates efficient querying and allows for isolated updates and modular expansions, making the database well-suited for managing complex data relationships and large volumes of information effectively.
### Backend API Implementation

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/asimsek17/supplyBridge.git
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure the PostgreSQL database:
    - Create a PostgreSQL database and update the connection settings in `config/database.js`.

4. Import Excel data to the database:
    - Execute the Node.js script to import the Excel data into your PostgreSQL database:
    ```bash
    node helpers/utils/importData.js /path/to/excel
    ```

5. Start the server:
    ```bash
    npm start
    ```

### API Endpoints

### Auth

#### Register

- **Register User**
    - `POST /api/user/register`
    - Request Body: JSON object with user information (`email`, `password`)
    - Validation: Ensure  `email`, and `password` are provided

#### Login

- **Login User**
    - `POST /api/user/login`
    - Request Body: JSON object with user information (`email`, `password`)
    - Validation: Ensure `email` and `password` are provided


#### Suppliers

- **Get All Suppliers**
    - `GET /api/supplier/list`
    - Response: JSON array of all suppliers

- **Get Supplier by ID**
    - `GET /api/supplier/:id`
    - Response: JSON object of the supplier with the specified ID

- **Create Supplier** (authRequired)
    - `POST /api/supplier/create`
    - Request Body: JSON object with supplier information (`short_name`, `long_name`)
    - Validation: Ensure `short_name` and `long_name` are provided

- **Update Supplier Information** (authRequired)
    - `PUT /api/supplier/:id`
    - Request Body: JSON object with supplier information (`short_name`, `long_name`)
    - Validation: Ensure `short_name` and `long_name` are provided

- **Delete Supplier** (authRequired)
    - `DELETE /api/supplier/:id`
    - Response: Status message

#### OEMs

- **Get All OEMs**
    - `GET /api/oem/list`
    - Response: JSON array of all OEMs

- **Get OEM by ID**
    - `GET /api/oem/:id`
    - Response: JSON object of the OEM with the specified ID

- **Create OEM** (authRequired)
    - `POST /api/oem/create`
    - Request Body: JSON object with OEM information (`name`, `origin`, `production_region`, `maker`, `brand`)
    - Validation: Ensure `name` and `origin` are provided

- **Update OEM Information** (authRequired)
    - `PUT /api/oem/:id`
    - Request Body: JSON object with OEM information (`name`, `origin`, `production_region`, `maker`, `brand`)
    - Validation: Ensure `name` and `origin` are provided

- **Delete OEM** (authRequired)
    - `DELETE /api/oem/:id`
    - Response: Status message

#### Vehicle Models

- **Get All Vehicle Models**
    - `GET /api/vehiclemodel/list`
    - Response: JSON array of all vehicle models

- **Get Vehicle Model by ID**
    - `GET /api/vehiclemodel/:id`
    - Response: JSON object of the vehicle model with the specified ID

- **Create Vehicle Model** (authRequired)
    - `POST /api/vehiclemodel`
    - Request Body: JSON object with vehicle model information (`name`, `vehicle_type`, `propulsion`, `propulsion_type`, `production_country`, `model_year`, `oem_id`)
    - Validation: Ensure `name`, `vehicle_type`, `propulsion`, `propulsion_type`, `production_country`, `model_year`, and `oem_id` are provided

- **Update Vehicle Model Information** (authRequired)
    - `PUT /api/vehiclemodel/:id`
    - Request Body: JSON object with vehicle model information (`name`, `vehicle_type`, `propulsion`, `propulsion_type`, `production_country`, `model_year`, `oem_id`)
    - Validation: Ensure `name`, `vehicle_type`, `propulsion`, `propulsion_type`, `production_country`, `model_year`, and `oem_id` are provided

- **Delete Vehicle Model** (authRequired)
    - `DELETE /api/vehiclemodel/:id`
    - Response: Status message

#### Components

- **Get All Components**
    - `GET /api/component/list`
    - Response: JSON array of all components

- **Get Component by ID**
    - `GET /api/component/:id`
    - Response: JSON object of the component with the specified ID

- **Create Component** (authRequired)
    - `POST /api/component/create`
    - Request Body: JSON object with component information (`name`, `category_l0`, `category_l1`, `category_l2`, `category_l3`, `category_l4`, `supplier_id`, `vehicle_model_id`)
    - Validation: Ensure `name`, `category_l0`, `category_l1`, `category_l2`, `category_l3`, `category_l4`, `supplier_id`, and `vehicle_model_id` are provided

- **Update Component Information** (authRequired)
    - `PUT /api/component/:id`
    - Request Body: JSON object with component information (`name`, `category_l0`, `category_l1`, `category_l2`, `category_l3`, `category_l4`, `supplier_id`, `vehicle_model_id`)
    - Validation: Ensure `name`, `category_l0`, `category_l1`, `category_l2`, `category_l3`, `category_l4`, `supplier_id`, and `vehicle_model_id` are provided

- **Delete Component** (authRequired)
    - `DELETE /api/component/:id`
    - Response: Status message

### Validation

- Ensure that all required fields are provided and valid for each endpoint.
- Validate that foreign keys reference existing records in the respective tables.

### Postman Collection

You can find the Postman collection for this API [here](https://documenter.getpostman.com/view/23425766/2sA3dskYsn#a0e6b408-759f-44cf-84c6-75ddc5694ff7).

#### Running the API Collection in Postman Using "Run in Postman"

##### Step 1: Install Postman
If you haven't already, download and install Postman from [Postman's official website](https://www.postman.com/downloads/).

##### Step 2: Access the Documentation
1. **Open the Documentation**: Go to the provided [Postman Documentation](https://documenter.getpostman.com/view/23425766/2sA3dskYsn#a0e6b408-759f-44cf-84c6-75ddc5694ff7) link.

##### Step 3: Use "Run in Postman"
1. **Find the "Run in Postman" Button**:
   - In the documentation, look for the "Run in Postman" button. It is usually located at the top right corner of the documentation page.
2. **Click "Run in Postman"**:
   - Click the "Run in Postman" button. This will open Postman and import the collection directly into your Postman app.

##### Step 4: Run a Request
1. **Select a Request**:
   - Expand the imported collection in Postman and select an endpoint you wish to run.
2. **Configure Request**:
   - Review the request details (URL, method, headers, body, etc.).
   - Manually set any required parameters or headers directly in the request.
3. **Send Request**:
   - Click the "Send" button to execute the request.
4. **Review Response**:
   - Review the response returned by the API in the response section below the request details.

### Example Usage

1. **Get All Suppliers**
    - Endpoint: `GET /api/supplier/list`
    - Example response:
      ```json
      [
        {
          "id": 1,
          "short_name": "Supplier A",
          "long_name": "Supplier A Long Name"
        },
        {
          "id": 2,
          "short_name": "Supplier B",
          "long_name": "Supplier B Long Name"
        }
      ]
      ```

2. **Create Supplier**
    - Endpoint: `POST /api/supplier/create`
    - Request body:
      ```json
      {
        "short_name": "Supplier C",
        "long_name": "Supplier C Long Name"
      }
      ```
    - Example response:
      ```json
      {
        "id": 3,
        "short_name": "Supplier C",
        "long_name": "Supplier C Long Name"
      }
      ```
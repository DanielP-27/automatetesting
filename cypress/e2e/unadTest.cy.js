//1. Create a package.json file in the project’s root, this file can be manually created, or it is possible to create it automatically by typing the following command in a CLI npm init --yes
// 2. Once the package.json file has been created, we can proceeded with the installation of the Cypress Framework (just in case you haven’t done it before), to do so, run the following command in CLI (be sure the CLI towards the root’s projects). 
// 3. Once Cypress has been successfully created, run the following command in CLI to open Cypress's GUI
// 4. In the GUI, select the E2E Testing option
// 5. In the GUI, select your favorite browser
// 6. Click in the "Strat E2E Testing in Chrome"
// 7. A new browser windown with the GUI testing interface will be open. 
// 8. Select the new spec option
// 9. Select the file you want to test or create a new script (depending on the case)
// 10. Once the file has been selected, click in the "Run" button to start.

// cypress/e2e/footwear_inventory_crud_spec.js

describe('CRUD de Inventario de Calzado', () => {
  
  // Las constantes producto y productoEditado son constantes y no variables en la medida que los mismos datos pueden ser usados en multiples pruebas, esto siguiendo el principio de centralización de datos propios del testing
  const producto = {
    nombre: 'Jordan Air 1',
    referencia: 'MJ-001'
  };
  
  const productoEditado = {
    nombre: 'Adidas Gazelle 1',
    referencia: 'AD-GA-1'
  };

  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500');
    // Verificar que la página se cargó correctamente
    cy.contains('h1', 'Phase 2 - Footwear Inventory').should('be.visible');
  });


  // Test 1: CREATE - Crear un nuevo producto
  it('CREATE: Debería crear un nuevo producto correctamente', () => {
    // Ingresar datos del producto
    cy.get('#nombre').type(producto.nombre);
    cy.get('#referencia').type(producto.referencia);
    
    // Hacer clic en el botón Agregar
    cy.get('#btnAgregar').click();
    
    // Verificar que el producto se agregó a la lista
    cy.get('.div-producto p').should('contain', producto.nombre)
      .and('contain', producto.referencia);
    
    // Verificar que los campos se limpiaron después de agregar
    cy.get('#nombre').should('have.value', '');
    cy.get('#referencia').should('have.value', '');
  });

  // Test 2: READ - Leer/Buscar un producto existente
  it('READ: Debería buscar y mostrar un producto correctamente', () => {
    // Primero agregamos un producto para luego buscarlo
    cy.get('#nombre').type(producto.nombre);
    cy.get('#referencia').type(producto.referencia);
    cy.get('#btnAgregar').click();
    
    // Buscar el producto por nombre
    cy.get('#busqueda').type(producto.nombre);
    cy.get('#btnBuscar').click();
    
    // Verificar que se muestra en los resultados de búsqueda
    cy.get('#resultados p').should('contain', producto.nombre)
      .and('contain', producto.referencia);
  });

  // Test 3: UPDATE - Actualizar un producto existente
  it('UPDATE: Debería editar un producto correctamente', () => {
    // Agregar un producto para luego editarlo
    cy.get('#nombre').type(producto.nombre);
    cy.get('#referencia').type(producto.referencia);
    cy.get('#btnAgregar').click();
    
    // Hacer clic en el botón Editar
    cy.get('.btn-editar').click();
    
    // Verificar que los campos se rellenaron con los datos del producto
    cy.get('#nombre').should('have.value', producto.nombre);
    cy.get('#referencia').should('have.value', producto.referencia);
    
    // Verificar que el botón cambió a "Actualizar"
    cy.get('#btnAgregar').should('contain', 'Actualizar');
    
    // Editar los datos del producto
    cy.get('#nombre').clear().type(productoEditado.nombre);
    cy.get('#referencia').clear().type(productoEditado.referencia);
    cy.get('#btnAgregar').click();
    
    // Verificar que el producto se actualizó en la lista
    cy.get('.div-producto p').should('contain', productoEditado.nombre)
      .and('contain', productoEditado.referencia);
    
    // Verificar que el botón volvió a "Agregar"
    cy.get('#btnAgregar').should('contain', 'Agregar');
  });

  // Test 4: DELETE - Eliminar un producto existente
  it('DELETE: Debería eliminar un producto correctamente', () => {
    // Agregar un producto para luego eliminarlo
    cy.get('#nombre').type(producto.nombre);
    cy.get('#referencia').type(producto.referencia);
    cy.get('#btnAgregar').click();
    
    // Verificar que el producto está en la lista
    cy.get('.div-producto p').should('have.length', 1);
    cy.get('.div-producto p').should('contain', producto.nombre);
    
    // Eliminar el producto
    cy.get('.btn-eliminar').click();
    
    // Verificar que la lista está vacía
    cy.get('.div-producto p').should('not.exist');
  });
});
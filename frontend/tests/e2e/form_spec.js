describe('Health Information Form', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should submit the form successfully for healthy status with no symptoms', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="age"]').type('30');
      cy.get('select[name="gender"]').select('male');
      cy.get('select[name="healthCondition"]').select('healthy');
      cy.get('select[name="experiencedSymptoms"]').select('no');
      cy.get('textarea[name="symptoms"]').should('not.exist');
      cy.get('textarea[name="chronicConditionDetails"]').should('not.exist');
  
      cy.get('button[type="submit"]').click();
      cy.get('.Toastify__toast--success').should('be.visible');
    });
  
    it('should submit the form successfully for healthy status with symptoms', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="age"]').type('30');
      cy.get('select[name="gender"]').select('male');
      cy.get('select[name="healthCondition"]').select('healthy');
      cy.get('select[name="experiencedSymptoms"]').select('yes');
      cy.get('textarea[name="symptoms"]').type('Cough and fever');
      cy.get('textarea[name="chronicConditionDetails"]').should('not.exist');
  
      cy.get('button[type="submit"]').click();
      cy.get('.Toastify__toast--success').should('be.visible');
    });
  
    it('should submit the form successfully for minor illness with no symptoms', () => {
      cy.get('input[name="name"]').type('Jane Doe');
      cy.get('input[name="age"]').type('25');
      cy.get('select[name="gender"]').select('female');
      cy.get('select[name="healthCondition"]').select('minor-illness');
      cy.get('select[name="experiencedSymptoms"]').select('no');
      cy.get('textarea[name="symptoms"]').should('not.exist');
      cy.get('textarea[name="chronicConditionDetails"]').should('not.exist');
  
      cy.get('button[type="submit"]').click();
      cy.get('.Toastify__toast--success').should('be.visible');
    });
  
    it('should submit the form successfully for minor illness with symptoms', () => {
      cy.get('input[name="name"]').type('Jane Doe');
      cy.get('input[name="age"]').type('25');
      cy.get('select[name="gender"]').select('female');
      cy.get('select[name="healthCondition"]').select('minor-illness');
      cy.get('select[name="experiencedSymptoms"]').select('yes');
      cy.get('textarea[name="symptoms"]').type('Headache and nausea');
      cy.get('textarea[name="chronicConditionDetails"]').should('not.exist');
  
      cy.get('button[type="submit"]').click();
      cy.get('.Toastify__toast--success').should('be.visible');
    });
  
    it('should submit the form successfully for chronic illness with symptoms and chronic condition details', () => {
      cy.get('input[name="name"]').type('Jim Doe');
      cy.get('input[name="age"]').type('40');
      cy.get('select[name="gender"]').select('diverse');
      cy.get('select[name="healthCondition"]').select('chronic-illness');
      cy.get('select[name="experiencedSymptoms"]').select('yes');
      cy.get('textarea[name="symptoms"]').type('Severe back pain');
      cy.get('textarea[name="chronicConditionDetails"]').type('Diagnosed with chronic arthritis');
  
      cy.get('button[type="submit"]').click();
      cy.get('.Toastify__toast--success').should('be.visible');
    });
  
    it('should show validation errors for all required fields', () => {
      cy.get('button[type="submit"]').click();
  
      cy.get('.invalid-feedback').should('contain', 'Name is required');
      cy.get('.invalid-feedback').should('contain', 'Age must be a positive number');
      cy.get('.invalid-feedback').should('contain', 'Gender is required');
      cy.get('.invalid-feedback').should('contain', 'Health condition is required');
      cy.get('.invalid-feedback').should('contain', 'Experienced symptoms is required');
    });
  
    it('should validate form for healthy status with symptoms where symptoms is not filled', () => {
      cy.get('input[name="name"]').type('John Doe');
      cy.get('input[name="age"]').type('30');
      cy.get('select[name="gender"]').select('male');
      cy.get('select[name="healthCondition"]').select('healthy');
      cy.get('select[name="experiencedSymptoms"]').select('yes');
      cy.get('button[type="submit"]').click();
      cy.get('.invalid-feedback').should('contain', 'Please list your symptoms');
    });
  
    it('should validate form for minor illness with symptoms where symptoms is not filled', () => {
      cy.get('input[name="name"]').type('Jane Doe');
      cy.get('input[name="age"]').type('25');
      cy.get('select[name="gender"]').select('female');
      cy.get('select[name="healthCondition"]').select('minor-illness');
      cy.get('select[name="experiencedSymptoms"]').select('yes');
      cy.get('button[type="submit"]').click();
      cy.get('.invalid-feedback').should('contain', 'Please list your symptoms');
    });
  
    it('should validate form for chronic illness where symptoms and chronic conditions are not filled', () => {
      cy.get('input[name="name"]').type('Jim Doe');
      cy.get('input[name="age"]').type('40');
      cy.get('select[name="gender"]').select('diverse');
      cy.get('select[name="healthCondition"]').select('chronic-illness');
      cy.get('select[name="experiencedSymptoms"]').select('yes');
      cy.get('button[type="submit"]').click();
      cy.get('.invalid-feedback').should('contain', 'Please list your symptoms');
      cy.get('.invalid-feedback').should('contain', 'Please provide details about your chronic illness');
    });
  });
  
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Contact e2e test', () => {
  const contactPageUrl = '/contact';
  const contactPageUrlPattern = new RegExp('/contact(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const contactSample = { firstName: 'Teresa', email: 'Q@o.*Q' };

  let contact;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/contacts+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/contacts').as('postEntityRequest');
    cy.intercept('DELETE', '/api/contacts/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (contact) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/contacts/${contact.id}`,
      }).then(() => {
        contact = undefined;
      });
    }
  });

  it('Contacts menu should load Contacts page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('contact');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Contact').should('exist');
    cy.url().should('match', contactPageUrlPattern);
  });

  describe('Contact page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(contactPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Contact page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/contact/new$'));
        cy.getEntityCreateUpdateHeading('Contact');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/contacts',
          body: contactSample,
        }).then(({ body }) => {
          contact = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/contacts+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/contacts?page=0&size=20>; rel="last",<http://localhost/api/contacts?page=0&size=20>; rel="first"',
              },
              body: [contact],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(contactPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Contact page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('contact');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);
      });

      it('edit button click should load edit Contact page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Contact');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);
      });

      it('edit button click should load edit Contact page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Contact');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);
      });

      it('last delete button click should delete instance of Contact', () => {
        cy.intercept('GET', '/api/contacts/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('contact').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', contactPageUrlPattern);

        contact = undefined;
      });
    });
  });

  describe('new Contact page', () => {
    beforeEach(() => {
      cy.visit(`${contactPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Contact');
    });

    it('should create an instance of Contact', () => {
      cy.get(`[data-cy="firstName"]`).type('Marcela');
      cy.get(`[data-cy="firstName"]`).should('have.value', 'Marcela');

      cy.get(`[data-cy="middleName"]`).type('weakly harmonious supposing');
      cy.get(`[data-cy="middleName"]`).should('have.value', 'weakly harmonious supposing');

      cy.get(`[data-cy="lastName"]`).type('Huerta Jaramillo');
      cy.get(`[data-cy="lastName"]`).should('have.value', 'Huerta Jaramillo');

      cy.get(`[data-cy="email"]`).type('<&l}%@#QJ%3t.s1');
      cy.get(`[data-cy="email"]`).should('have.value', '<&l}%@#QJ%3t.s1');

      cy.get(`[data-cy="phone"]`).type('32425879415971');
      cy.get(`[data-cy="phone"]`).should('have.value', '32425879415971');

      cy.get(`[data-cy="address"]`).type('than');
      cy.get(`[data-cy="address"]`).should('have.value', 'than');

      cy.get(`[data-cy="city"]`).type('Vigo');
      cy.get(`[data-cy="city"]`).should('have.value', 'Vigo');

      cy.get(`[data-cy="state"]`).type('reluctantly');
      cy.get(`[data-cy="state"]`).should('have.value', 'reluctantly');

      cy.get(`[data-cy="postalCode"]`).type('81640');
      cy.get(`[data-cy="postalCode"]`).should('have.value', '81640');

      cy.get(`[data-cy="country"]`).type('Jordania');
      cy.get(`[data-cy="country"]`).should('have.value', 'Jordania');

      cy.get(`[data-cy="socialMediaProfiles"]`).type('hence fatherly fourths');
      cy.get(`[data-cy="socialMediaProfiles"]`).should('have.value', 'hence fatherly fourths');

      cy.get(`[data-cy="notes"]`).type('../fake-data/blob/hipster.txt');
      cy.get(`[data-cy="notes"]`).invoke('val').should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        contact = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', contactPageUrlPattern);
    });
  });
});

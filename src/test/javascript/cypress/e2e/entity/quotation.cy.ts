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

describe('Quotation e2e test', () => {
  const quotationPageUrl = '/quotation';
  const quotationPageUrlPattern = new RegExp('/quotation(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const quotationSample = {
    createdAt: '2024-06-19T09:30:53.348Z',
    quantity: 7080,
    unitPrice: 20455.93,
    totalPrice: 15270.39,
    status: 'ACCEPTED',
    expiredAt: '2024-06-19T10:50:42.482Z',
  };

  let quotation;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/quotations+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/quotations').as('postEntityRequest');
    cy.intercept('DELETE', '/api/quotations/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (quotation) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/quotations/${quotation.id}`,
      }).then(() => {
        quotation = undefined;
      });
    }
  });

  it('Quotations menu should load Quotations page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('quotation');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Quotation').should('exist');
    cy.url().should('match', quotationPageUrlPattern);
  });

  describe('Quotation page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(quotationPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Quotation page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/quotation/new$'));
        cy.getEntityCreateUpdateHeading('Quotation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', quotationPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/quotations',
          body: quotationSample,
        }).then(({ body }) => {
          quotation = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/quotations+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/quotations?page=0&size=20>; rel="last",<http://localhost/api/quotations?page=0&size=20>; rel="first"',
              },
              body: [quotation],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(quotationPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Quotation page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('quotation');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', quotationPageUrlPattern);
      });

      it('edit button click should load edit Quotation page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Quotation');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', quotationPageUrlPattern);
      });

      it('edit button click should load edit Quotation page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Quotation');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', quotationPageUrlPattern);
      });

      it('last delete button click should delete instance of Quotation', () => {
        cy.intercept('GET', '/api/quotations/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('quotation').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', quotationPageUrlPattern);

        quotation = undefined;
      });
    });
  });

  describe('new Quotation page', () => {
    beforeEach(() => {
      cy.visit(`${quotationPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Quotation');
    });

    it('should create an instance of Quotation', () => {
      cy.get(`[data-cy="createdAt"]`).type('2024-06-19T05:24');
      cy.get(`[data-cy="createdAt"]`).blur();
      cy.get(`[data-cy="createdAt"]`).should('have.value', '2024-06-19T05:24');

      cy.get(`[data-cy="quantity"]`).type('31156');
      cy.get(`[data-cy="quantity"]`).should('have.value', '31156');

      cy.get(`[data-cy="unitPrice"]`).type('6088.26');
      cy.get(`[data-cy="unitPrice"]`).should('have.value', '6088.26');

      cy.get(`[data-cy="totalPrice"]`).type('26725.67');
      cy.get(`[data-cy="totalPrice"]`).should('have.value', '26725.67');

      cy.get(`[data-cy="status"]`).select('SENT');

      cy.get(`[data-cy="expiredAt"]`).type('2024-06-19T09:22');
      cy.get(`[data-cy="expiredAt"]`).blur();
      cy.get(`[data-cy="expiredAt"]`).should('have.value', '2024-06-19T09:22');

      cy.get(`[data-cy="comments"]`).type('zowie casserole kiddingly');
      cy.get(`[data-cy="comments"]`).should('have.value', 'zowie casserole kiddingly');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        quotation = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', quotationPageUrlPattern);
    });
  });
});

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

describe('Opportunity e2e test', () => {
  const opportunityPageUrl = '/opportunity';
  const opportunityPageUrlPattern = new RegExp('/opportunity(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const opportunitySample = {
    name: 'uh-huh',
    amount: 15050.15,
    probability: 19,
    expectedCloseDate: '2024-06-19',
    stage: 'PROSPECTING',
    createdAt: '2024-06-19T05:30:23.696Z',
  };

  let opportunity;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/opportunities+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/opportunities').as('postEntityRequest');
    cy.intercept('DELETE', '/api/opportunities/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (opportunity) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/opportunities/${opportunity.id}`,
      }).then(() => {
        opportunity = undefined;
      });
    }
  });

  it('Opportunities menu should load Opportunities page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('opportunity');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response?.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Opportunity').should('exist');
    cy.url().should('match', opportunityPageUrlPattern);
  });

  describe('Opportunity page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(opportunityPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Opportunity page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/opportunity/new$'));
        cy.getEntityCreateUpdateHeading('Opportunity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', opportunityPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/opportunities',
          body: opportunitySample,
        }).then(({ body }) => {
          opportunity = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/opportunities+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/opportunities?page=0&size=20>; rel="last",<http://localhost/api/opportunities?page=0&size=20>; rel="first"',
              },
              body: [opportunity],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(opportunityPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Opportunity page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('opportunity');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', opportunityPageUrlPattern);
      });

      it('edit button click should load edit Opportunity page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Opportunity');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', opportunityPageUrlPattern);
      });

      it('edit button click should load edit Opportunity page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Opportunity');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', opportunityPageUrlPattern);
      });

      it('last delete button click should delete instance of Opportunity', () => {
        cy.intercept('GET', '/api/opportunities/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('opportunity').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response?.statusCode).to.equal(200);
        });
        cy.url().should('match', opportunityPageUrlPattern);

        opportunity = undefined;
      });
    });
  });

  describe('new Opportunity page', () => {
    beforeEach(() => {
      cy.visit(`${opportunityPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Opportunity');
    });

    it('should create an instance of Opportunity', () => {
      cy.get(`[data-cy="name"]`).type('who');
      cy.get(`[data-cy="name"]`).should('have.value', 'who');

      cy.get(`[data-cy="amount"]`).type('1420.2');
      cy.get(`[data-cy="amount"]`).should('have.value', '1420.2');

      cy.get(`[data-cy="probability"]`).type('14');
      cy.get(`[data-cy="probability"]`).should('have.value', '14');

      cy.get(`[data-cy="expectedCloseDate"]`).type('2024-06-18');
      cy.get(`[data-cy="expectedCloseDate"]`).blur();
      cy.get(`[data-cy="expectedCloseDate"]`).should('have.value', '2024-06-18');

      cy.get(`[data-cy="stage"]`).select('PROSPECTING');

      cy.get(`[data-cy="description"]`).type('../fake-data/blob/hipster.txt');
      cy.get(`[data-cy="description"]`).invoke('val').should('match', new RegExp('../fake-data/blob/hipster.txt'));

      cy.get(`[data-cy="createdAt"]`).type('2024-06-19T10:57');
      cy.get(`[data-cy="createdAt"]`).blur();
      cy.get(`[data-cy="createdAt"]`).should('have.value', '2024-06-19T10:57');

      cy.get(`[data-cy="modifiedAt"]`).type('2024-06-18T21:25');
      cy.get(`[data-cy="modifiedAt"]`).blur();
      cy.get(`[data-cy="modifiedAt"]`).should('have.value', '2024-06-18T21:25');

      cy.get(`[data-cy="closedAt"]`).type('2024-06-18T21:19');
      cy.get(`[data-cy="closedAt"]`).blur();
      cy.get(`[data-cy="closedAt"]`).should('have.value', '2024-06-18T21:19');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(201);
        opportunity = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response?.statusCode).to.equal(200);
      });
      cy.url().should('match', opportunityPageUrlPattern);
    });
  });
});

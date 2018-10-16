const createError = require('http-errors');
const Sequelize = require('sequelize');

module.exports = (err) => {
  switch (err.constructor) {
    case Sequelize.AccessDeniedError:
      return new createError.Unauthorized('Access denied for resource');

    case Sequelize.AssociationError:
      return new createError.BadRequest('Association improperly created');

    case Sequelize.BulkRecordError:
      return new createError.BadRequest('Bulk operation failed');

    case Sequelize.ConnectionRefusedError:
      return new createError.InternalServerError('Unable to access database: Refused');

    case Sequelize.ConnectionTimedOutError:
      return new createError.InternalServerError('Unable to access database: Timeout');

    case Sequelize.EmptyResultError:
      return new createError.NotFound('Reject request on empty record found');

    case Sequelize.ExclusionConstraintError:
      return new createError.Conflict('Exclusion Constraint violated in database');

    case Sequelize.ForeignKeyConstraintError:
      return new createError.BadRequest('Foreign key constraint violated in database');

    case Sequelize.HostNotFoundError:
      return new createError.InternalServerError('Unable to access database: Database not found');

    case Sequelize.HostNotReachableError:
      return new createError.InternalServerError('Unable to access database: Database not reachable');

    case Sequelize.InstanceError:
      return new createError.BadRequest('Some problem happened with instance methods.');

    case Sequelize.OptimisticLockError:
      return new createError.InternalServerError('Attempting to update a stale model instance');

    case Sequelize.QueryError:
      return new createError.BadRequest('Query is passed invalid options');

    case Sequelize.SequelizeScopeError:
      return new createError.BadRequest('Can not query the requested scope');

    case Sequelize.TimeoutError:
      return new createError.InternalServerError('Server timeout due to deadlock');

    case Sequelize.UniqueConstraintError:
      return new createError.Conflict('Unique constraint violation');

    case Sequelize.UnknownConstraintError:
      return new createError.BadRequest('Name not found in database');

    case Sequelize.ValidationError:
      return new createError.BadRequest(`ValidationError ${err.errors}`);

    default: return new createError.InternalServerError('Unknown error received');
  }
};

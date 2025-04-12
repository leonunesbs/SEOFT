
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  refId: 'refId',
  name: 'name',
  birthDate: 'birthDate',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClinicScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CollaboratorScalarFieldEnum = {
  id: 'id',
  name: 'name',
  crm: 'crm',
  role: 'role',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ClinicCollaboratorScalarFieldEnum = {
  clinicId: 'clinicId',
  collaboratorId: 'collaboratorId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EvaluationScalarFieldEnum = {
  id: 'id',
  patientId: 'patientId',
  collaboratorId: 'collaboratorId',
  done: 'done',
  clinicId: 'clinicId',
  clinicalData: 'clinicalData',
  continuousData: 'continuousData',
  diagnosis: 'diagnosis',
  treatment: 'treatment',
  followUp: 'followUp',
  nextAppointment: 'nextAppointment',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.EyesScalarFieldEnum = {
  id: 'id',
  evaluationId: 'evaluationId',
  rightEyeId: 'rightEyeId',
  leftEyeId: 'leftEyeId'
};

exports.Prisma.EyeScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.EyeLogScalarFieldEnum = {
  id: 'id',
  type: 'type',
  eyeId: 'eyeId',
  details: 'details',
  recordedAt: 'recordedAt'
};

exports.Prisma.RefractionScalarFieldEnum = {
  id: 'id',
  eyeId: 'eyeId',
  spherical: 'spherical',
  cylinder: 'cylinder',
  axis: 'axis',
  visualAcuity: 'visualAcuity',
  recordedAt: 'recordedAt'
};

exports.Prisma.EyeSurgeryScalarFieldEnum = {
  id: 'id',
  eyeId: 'eyeId',
  procedure: 'procedure',
  date: 'date',
  notes: 'notes'
};

exports.Prisma.EyedropScalarFieldEnum = {
  id: 'id',
  eyeId: 'eyeId',
  name: 'name',
  dosage: 'dosage',
  startDate: 'startDate',
  notes: 'notes'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  provider: 'provider',
  providerAccountId: 'providerAccountId',
  refresh_token: 'refresh_token',
  access_token: 'access_token',
  expires_at: 'expires_at',
  token_type: 'token_type',
  scope: 'scope',
  id_token: 'id_token',
  session_state: 'session_state',
  refresh_token_expires_in: 'refresh_token_expires_in'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  sessionToken: 'sessionToken',
  userId: 'userId',
  expires: 'expires'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  emailVerified: 'emailVerified',
  isStaff: 'isStaff',
  image: 'image'
};

exports.Prisma.VerificationTokenScalarFieldEnum = {
  identifier: 'identifier',
  token: 'token',
  expires: 'expires'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  I1: 'I1',
  I2: 'I2',
  I3: 'I3',
  I4: 'I4',
  R1: 'R1',
  R2: 'R2',
  R3: 'R3',
  F1: 'F1',
  F2: 'F2',
  F3: 'F3',
  STAFF: 'STAFF'
};

exports.EyeLogType = exports.$Enums.EyeLogType = {
  BIOMICROSCOPY: 'BIOMICROSCOPY',
  PACHYMETRY: 'PACHYMETRY',
  TONOMETRY: 'TONOMETRY',
  OCT: 'OCT',
  VISUAL_FIELD: 'VISUAL_FIELD',
  FUNDOSCOPY: 'FUNDOSCOPY',
  RETINOGRAPHY: 'RETINOGRAPHY',
  GONIOSCOPY: 'GONIOSCOPY',
  ANGIOGRAPHY: 'ANGIOGRAPHY',
  CT_CORNEA: 'CT_CORNEA',
  OPTICAL_BIOMETRY: 'OPTICAL_BIOMETRY',
  SPECULAR_MICROSCOPY: 'SPECULAR_MICROSCOPY',
  OTHER_1: 'OTHER_1',
  OTHER_2: 'OTHER_2',
  OTHER_3: 'OTHER_3'
};

exports.Prisma.ModelName = {
  Patient: 'Patient',
  Clinic: 'Clinic',
  Collaborator: 'Collaborator',
  ClinicCollaborator: 'ClinicCollaborator',
  Evaluation: 'Evaluation',
  Eyes: 'Eyes',
  Eye: 'Eye',
  EyeLog: 'EyeLog',
  Refraction: 'Refraction',
  EyeSurgery: 'EyeSurgery',
  Eyedrop: 'Eyedrop',
  Account: 'Account',
  Session: 'Session',
  User: 'User',
  VerificationToken: 'VerificationToken'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

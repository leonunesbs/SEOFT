
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Patient
 * 
 */
export type Patient = $Result.DefaultSelection<Prisma.$PatientPayload>
/**
 * Model Clinic
 * 
 */
export type Clinic = $Result.DefaultSelection<Prisma.$ClinicPayload>
/**
 * Model Collaborator
 * 
 */
export type Collaborator = $Result.DefaultSelection<Prisma.$CollaboratorPayload>
/**
 * Model ClinicCollaborator
 * 
 */
export type ClinicCollaborator = $Result.DefaultSelection<Prisma.$ClinicCollaboratorPayload>
/**
 * Model Evaluation
 * 
 */
export type Evaluation = $Result.DefaultSelection<Prisma.$EvaluationPayload>
/**
 * Model Eyes
 * 
 */
export type Eyes = $Result.DefaultSelection<Prisma.$EyesPayload>
/**
 * Model Eye
 * 
 */
export type Eye = $Result.DefaultSelection<Prisma.$EyePayload>
/**
 * Model EyeLog
 * 
 */
export type EyeLog = $Result.DefaultSelection<Prisma.$EyeLogPayload>
/**
 * Model Refraction
 * 
 */
export type Refraction = $Result.DefaultSelection<Prisma.$RefractionPayload>
/**
 * Model EyeSurgery
 * 
 */
export type EyeSurgery = $Result.DefaultSelection<Prisma.$EyeSurgeryPayload>
/**
 * Model Eyedrop
 * 
 */
export type Eyedrop = $Result.DefaultSelection<Prisma.$EyedropPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model VerificationToken
 * 
 */
export type VerificationToken = $Result.DefaultSelection<Prisma.$VerificationTokenPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
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

export type Role = (typeof Role)[keyof typeof Role]


export const EyeLogType: {
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

export type EyeLogType = (typeof EyeLogType)[keyof typeof EyeLogType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type EyeLogType = $Enums.EyeLogType

export const EyeLogType: typeof $Enums.EyeLogType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Patients
 * const patients = await prisma.patient.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Patients
   * const patients = await prisma.patient.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.patient`: Exposes CRUD operations for the **Patient** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patients
    * const patients = await prisma.patient.findMany()
    * ```
    */
  get patient(): Prisma.PatientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinic`: Exposes CRUD operations for the **Clinic** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clinics
    * const clinics = await prisma.clinic.findMany()
    * ```
    */
  get clinic(): Prisma.ClinicDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.collaborator`: Exposes CRUD operations for the **Collaborator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Collaborators
    * const collaborators = await prisma.collaborator.findMany()
    * ```
    */
  get collaborator(): Prisma.CollaboratorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clinicCollaborator`: Exposes CRUD operations for the **ClinicCollaborator** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ClinicCollaborators
    * const clinicCollaborators = await prisma.clinicCollaborator.findMany()
    * ```
    */
  get clinicCollaborator(): Prisma.ClinicCollaboratorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluation`: Exposes CRUD operations for the **Evaluation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Evaluations
    * const evaluations = await prisma.evaluation.findMany()
    * ```
    */
  get evaluation(): Prisma.EvaluationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eyes`: Exposes CRUD operations for the **Eyes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eyes
    * const eyes = await prisma.eyes.findMany()
    * ```
    */
  get eyes(): Prisma.EyesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eye`: Exposes CRUD operations for the **Eye** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eyes
    * const eyes = await prisma.eye.findMany()
    * ```
    */
  get eye(): Prisma.EyeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eyeLog`: Exposes CRUD operations for the **EyeLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EyeLogs
    * const eyeLogs = await prisma.eyeLog.findMany()
    * ```
    */
  get eyeLog(): Prisma.EyeLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refraction`: Exposes CRUD operations for the **Refraction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Refractions
    * const refractions = await prisma.refraction.findMany()
    * ```
    */
  get refraction(): Prisma.RefractionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eyeSurgery`: Exposes CRUD operations for the **EyeSurgery** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EyeSurgeries
    * const eyeSurgeries = await prisma.eyeSurgery.findMany()
    * ```
    */
  get eyeSurgery(): Prisma.EyeSurgeryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eyedrop`: Exposes CRUD operations for the **Eyedrop** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Eyedrops
    * const eyedrops = await prisma.eyedrop.findMany()
    * ```
    */
  get eyedrop(): Prisma.EyedropDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verificationToken`: Exposes CRUD operations for the **VerificationToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VerificationTokens
    * const verificationTokens = await prisma.verificationToken.findMany()
    * ```
    */
  get verificationToken(): Prisma.VerificationTokenDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "patient" | "clinic" | "collaborator" | "clinicCollaborator" | "evaluation" | "eyes" | "eye" | "eyeLog" | "refraction" | "eyeSurgery" | "eyedrop" | "account" | "session" | "user" | "verificationToken"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Patient: {
        payload: Prisma.$PatientPayload<ExtArgs>
        fields: Prisma.PatientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PatientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PatientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findFirst: {
            args: Prisma.PatientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PatientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          findMany: {
            args: Prisma.PatientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          create: {
            args: Prisma.PatientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          createMany: {
            args: Prisma.PatientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PatientCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          delete: {
            args: Prisma.PatientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          update: {
            args: Prisma.PatientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          deleteMany: {
            args: Prisma.PatientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PatientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PatientUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>[]
          }
          upsert: {
            args: Prisma.PatientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PatientPayload>
          }
          aggregate: {
            args: Prisma.PatientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient>
          }
          groupBy: {
            args: Prisma.PatientGroupByArgs<ExtArgs>
            result: $Utils.Optional<PatientGroupByOutputType>[]
          }
          count: {
            args: Prisma.PatientCountArgs<ExtArgs>
            result: $Utils.Optional<PatientCountAggregateOutputType> | number
          }
        }
      }
      Clinic: {
        payload: Prisma.$ClinicPayload<ExtArgs>
        fields: Prisma.ClinicFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findFirst: {
            args: Prisma.ClinicFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          findMany: {
            args: Prisma.ClinicFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          create: {
            args: Prisma.ClinicCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          createMany: {
            args: Prisma.ClinicCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          delete: {
            args: Prisma.ClinicDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          update: {
            args: Prisma.ClinicUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          deleteMany: {
            args: Prisma.ClinicDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>[]
          }
          upsert: {
            args: Prisma.ClinicUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicPayload>
          }
          aggregate: {
            args: Prisma.ClinicAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinic>
          }
          groupBy: {
            args: Prisma.ClinicGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicCountAggregateOutputType> | number
          }
        }
      }
      Collaborator: {
        payload: Prisma.$CollaboratorPayload<ExtArgs>
        fields: Prisma.CollaboratorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CollaboratorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CollaboratorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          findFirst: {
            args: Prisma.CollaboratorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CollaboratorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          findMany: {
            args: Prisma.CollaboratorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>[]
          }
          create: {
            args: Prisma.CollaboratorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          createMany: {
            args: Prisma.CollaboratorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CollaboratorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>[]
          }
          delete: {
            args: Prisma.CollaboratorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          update: {
            args: Prisma.CollaboratorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          deleteMany: {
            args: Prisma.CollaboratorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CollaboratorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CollaboratorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>[]
          }
          upsert: {
            args: Prisma.CollaboratorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CollaboratorPayload>
          }
          aggregate: {
            args: Prisma.CollaboratorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCollaborator>
          }
          groupBy: {
            args: Prisma.CollaboratorGroupByArgs<ExtArgs>
            result: $Utils.Optional<CollaboratorGroupByOutputType>[]
          }
          count: {
            args: Prisma.CollaboratorCountArgs<ExtArgs>
            result: $Utils.Optional<CollaboratorCountAggregateOutputType> | number
          }
        }
      }
      ClinicCollaborator: {
        payload: Prisma.$ClinicCollaboratorPayload<ExtArgs>
        fields: Prisma.ClinicCollaboratorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClinicCollaboratorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClinicCollaboratorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>
          }
          findFirst: {
            args: Prisma.ClinicCollaboratorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClinicCollaboratorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>
          }
          findMany: {
            args: Prisma.ClinicCollaboratorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>[]
          }
          create: {
            args: Prisma.ClinicCollaboratorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>
          }
          createMany: {
            args: Prisma.ClinicCollaboratorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClinicCollaboratorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>[]
          }
          delete: {
            args: Prisma.ClinicCollaboratorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>
          }
          update: {
            args: Prisma.ClinicCollaboratorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>
          }
          deleteMany: {
            args: Prisma.ClinicCollaboratorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClinicCollaboratorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClinicCollaboratorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>[]
          }
          upsert: {
            args: Prisma.ClinicCollaboratorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClinicCollaboratorPayload>
          }
          aggregate: {
            args: Prisma.ClinicCollaboratorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClinicCollaborator>
          }
          groupBy: {
            args: Prisma.ClinicCollaboratorGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClinicCollaboratorGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClinicCollaboratorCountArgs<ExtArgs>
            result: $Utils.Optional<ClinicCollaboratorCountAggregateOutputType> | number
          }
        }
      }
      Evaluation: {
        payload: Prisma.$EvaluationPayload<ExtArgs>
        fields: Prisma.EvaluationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          findFirst: {
            args: Prisma.EvaluationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          findMany: {
            args: Prisma.EvaluationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>[]
          }
          create: {
            args: Prisma.EvaluationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          createMany: {
            args: Prisma.EvaluationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EvaluationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>[]
          }
          delete: {
            args: Prisma.EvaluationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          update: {
            args: Prisma.EvaluationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          deleteMany: {
            args: Prisma.EvaluationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EvaluationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>[]
          }
          upsert: {
            args: Prisma.EvaluationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          aggregate: {
            args: Prisma.EvaluationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluation>
          }
          groupBy: {
            args: Prisma.EvaluationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationCountAggregateOutputType> | number
          }
        }
      }
      Eyes: {
        payload: Prisma.$EyesPayload<ExtArgs>
        fields: Prisma.EyesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EyesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EyesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>
          }
          findFirst: {
            args: Prisma.EyesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EyesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>
          }
          findMany: {
            args: Prisma.EyesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>[]
          }
          create: {
            args: Prisma.EyesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>
          }
          createMany: {
            args: Prisma.EyesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EyesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>[]
          }
          delete: {
            args: Prisma.EyesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>
          }
          update: {
            args: Prisma.EyesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>
          }
          deleteMany: {
            args: Prisma.EyesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EyesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EyesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>[]
          }
          upsert: {
            args: Prisma.EyesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyesPayload>
          }
          aggregate: {
            args: Prisma.EyesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEyes>
          }
          groupBy: {
            args: Prisma.EyesGroupByArgs<ExtArgs>
            result: $Utils.Optional<EyesGroupByOutputType>[]
          }
          count: {
            args: Prisma.EyesCountArgs<ExtArgs>
            result: $Utils.Optional<EyesCountAggregateOutputType> | number
          }
        }
      }
      Eye: {
        payload: Prisma.$EyePayload<ExtArgs>
        fields: Prisma.EyeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EyeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EyeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>
          }
          findFirst: {
            args: Prisma.EyeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EyeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>
          }
          findMany: {
            args: Prisma.EyeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>[]
          }
          create: {
            args: Prisma.EyeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>
          }
          createMany: {
            args: Prisma.EyeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EyeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>[]
          }
          delete: {
            args: Prisma.EyeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>
          }
          update: {
            args: Prisma.EyeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>
          }
          deleteMany: {
            args: Prisma.EyeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EyeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EyeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>[]
          }
          upsert: {
            args: Prisma.EyeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyePayload>
          }
          aggregate: {
            args: Prisma.EyeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEye>
          }
          groupBy: {
            args: Prisma.EyeGroupByArgs<ExtArgs>
            result: $Utils.Optional<EyeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EyeCountArgs<ExtArgs>
            result: $Utils.Optional<EyeCountAggregateOutputType> | number
          }
        }
      }
      EyeLog: {
        payload: Prisma.$EyeLogPayload<ExtArgs>
        fields: Prisma.EyeLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EyeLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EyeLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>
          }
          findFirst: {
            args: Prisma.EyeLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EyeLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>
          }
          findMany: {
            args: Prisma.EyeLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>[]
          }
          create: {
            args: Prisma.EyeLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>
          }
          createMany: {
            args: Prisma.EyeLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EyeLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>[]
          }
          delete: {
            args: Prisma.EyeLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>
          }
          update: {
            args: Prisma.EyeLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>
          }
          deleteMany: {
            args: Prisma.EyeLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EyeLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EyeLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>[]
          }
          upsert: {
            args: Prisma.EyeLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeLogPayload>
          }
          aggregate: {
            args: Prisma.EyeLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEyeLog>
          }
          groupBy: {
            args: Prisma.EyeLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<EyeLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.EyeLogCountArgs<ExtArgs>
            result: $Utils.Optional<EyeLogCountAggregateOutputType> | number
          }
        }
      }
      Refraction: {
        payload: Prisma.$RefractionPayload<ExtArgs>
        fields: Prisma.RefractionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefractionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefractionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>
          }
          findFirst: {
            args: Prisma.RefractionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefractionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>
          }
          findMany: {
            args: Prisma.RefractionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>[]
          }
          create: {
            args: Prisma.RefractionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>
          }
          createMany: {
            args: Prisma.RefractionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefractionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>[]
          }
          delete: {
            args: Prisma.RefractionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>
          }
          update: {
            args: Prisma.RefractionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>
          }
          deleteMany: {
            args: Prisma.RefractionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefractionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefractionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>[]
          }
          upsert: {
            args: Prisma.RefractionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefractionPayload>
          }
          aggregate: {
            args: Prisma.RefractionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefraction>
          }
          groupBy: {
            args: Prisma.RefractionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefractionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefractionCountArgs<ExtArgs>
            result: $Utils.Optional<RefractionCountAggregateOutputType> | number
          }
        }
      }
      EyeSurgery: {
        payload: Prisma.$EyeSurgeryPayload<ExtArgs>
        fields: Prisma.EyeSurgeryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EyeSurgeryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EyeSurgeryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>
          }
          findFirst: {
            args: Prisma.EyeSurgeryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EyeSurgeryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>
          }
          findMany: {
            args: Prisma.EyeSurgeryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>[]
          }
          create: {
            args: Prisma.EyeSurgeryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>
          }
          createMany: {
            args: Prisma.EyeSurgeryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EyeSurgeryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>[]
          }
          delete: {
            args: Prisma.EyeSurgeryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>
          }
          update: {
            args: Prisma.EyeSurgeryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>
          }
          deleteMany: {
            args: Prisma.EyeSurgeryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EyeSurgeryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EyeSurgeryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>[]
          }
          upsert: {
            args: Prisma.EyeSurgeryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyeSurgeryPayload>
          }
          aggregate: {
            args: Prisma.EyeSurgeryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEyeSurgery>
          }
          groupBy: {
            args: Prisma.EyeSurgeryGroupByArgs<ExtArgs>
            result: $Utils.Optional<EyeSurgeryGroupByOutputType>[]
          }
          count: {
            args: Prisma.EyeSurgeryCountArgs<ExtArgs>
            result: $Utils.Optional<EyeSurgeryCountAggregateOutputType> | number
          }
        }
      }
      Eyedrop: {
        payload: Prisma.$EyedropPayload<ExtArgs>
        fields: Prisma.EyedropFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EyedropFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EyedropFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>
          }
          findFirst: {
            args: Prisma.EyedropFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EyedropFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>
          }
          findMany: {
            args: Prisma.EyedropFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>[]
          }
          create: {
            args: Prisma.EyedropCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>
          }
          createMany: {
            args: Prisma.EyedropCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EyedropCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>[]
          }
          delete: {
            args: Prisma.EyedropDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>
          }
          update: {
            args: Prisma.EyedropUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>
          }
          deleteMany: {
            args: Prisma.EyedropDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EyedropUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EyedropUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>[]
          }
          upsert: {
            args: Prisma.EyedropUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EyedropPayload>
          }
          aggregate: {
            args: Prisma.EyedropAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEyedrop>
          }
          groupBy: {
            args: Prisma.EyedropGroupByArgs<ExtArgs>
            result: $Utils.Optional<EyedropGroupByOutputType>[]
          }
          count: {
            args: Prisma.EyedropCountArgs<ExtArgs>
            result: $Utils.Optional<EyedropCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      VerificationToken: {
        payload: Prisma.$VerificationTokenPayload<ExtArgs>
        fields: Prisma.VerificationTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findFirst: {
            args: Prisma.VerificationTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          findMany: {
            args: Prisma.VerificationTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          create: {
            args: Prisma.VerificationTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          createMany: {
            args: Prisma.VerificationTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          delete: {
            args: Prisma.VerificationTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          update: {
            args: Prisma.VerificationTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          deleteMany: {
            args: Prisma.VerificationTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>[]
          }
          upsert: {
            args: Prisma.VerificationTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationTokenPayload>
          }
          aggregate: {
            args: Prisma.VerificationTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerificationToken>
          }
          groupBy: {
            args: Prisma.VerificationTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationTokenCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationTokenCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    patient?: PatientOmit
    clinic?: ClinicOmit
    collaborator?: CollaboratorOmit
    clinicCollaborator?: ClinicCollaboratorOmit
    evaluation?: EvaluationOmit
    eyes?: EyesOmit
    eye?: EyeOmit
    eyeLog?: EyeLogOmit
    refraction?: RefractionOmit
    eyeSurgery?: EyeSurgeryOmit
    eyedrop?: EyedropOmit
    account?: AccountOmit
    session?: SessionOmit
    user?: UserOmit
    verificationToken?: VerificationTokenOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PatientCountOutputType
   */

  export type PatientCountOutputType = {
    evaluations: number
  }

  export type PatientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluations?: boolean | PatientCountOutputTypeCountEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PatientCountOutputType
     */
    select?: PatientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PatientCountOutputType without action
   */
  export type PatientCountOutputTypeCountEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationWhereInput
  }


  /**
   * Count Type ClinicCountOutputType
   */

  export type ClinicCountOutputType = {
    collaborators: number
    evaluations: number
  }

  export type ClinicCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborators?: boolean | ClinicCountOutputTypeCountCollaboratorsArgs
    evaluations?: boolean | ClinicCountOutputTypeCountEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCountOutputType
     */
    select?: ClinicCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountCollaboratorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicCollaboratorWhereInput
  }

  /**
   * ClinicCountOutputType without action
   */
  export type ClinicCountOutputTypeCountEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationWhereInput
  }


  /**
   * Count Type CollaboratorCountOutputType
   */

  export type CollaboratorCountOutputType = {
    clinics: number
    evaluations: number
  }

  export type CollaboratorCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinics?: boolean | CollaboratorCountOutputTypeCountClinicsArgs
    evaluations?: boolean | CollaboratorCountOutputTypeCountEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * CollaboratorCountOutputType without action
   */
  export type CollaboratorCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CollaboratorCountOutputType
     */
    select?: CollaboratorCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CollaboratorCountOutputType without action
   */
  export type CollaboratorCountOutputTypeCountClinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicCollaboratorWhereInput
  }

  /**
   * CollaboratorCountOutputType without action
   */
  export type CollaboratorCountOutputTypeCountEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationWhereInput
  }


  /**
   * Count Type EyeCountOutputType
   */

  export type EyeCountOutputType = {
    logs: number
    refraction: number
    surgeries: number
    eyedrops: number
  }

  export type EyeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | EyeCountOutputTypeCountLogsArgs
    refraction?: boolean | EyeCountOutputTypeCountRefractionArgs
    surgeries?: boolean | EyeCountOutputTypeCountSurgeriesArgs
    eyedrops?: boolean | EyeCountOutputTypeCountEyedropsArgs
  }

  // Custom InputTypes
  /**
   * EyeCountOutputType without action
   */
  export type EyeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeCountOutputType
     */
    select?: EyeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EyeCountOutputType without action
   */
  export type EyeCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyeLogWhereInput
  }

  /**
   * EyeCountOutputType without action
   */
  export type EyeCountOutputTypeCountRefractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefractionWhereInput
  }

  /**
   * EyeCountOutputType without action
   */
  export type EyeCountOutputTypeCountSurgeriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyeSurgeryWhereInput
  }

  /**
   * EyeCountOutputType without action
   */
  export type EyeCountOutputTypeCountEyedropsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyedropWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    accounts: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Patient
   */

  export type AggregatePatient = {
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  export type PatientMinAggregateOutputType = {
    id: string | null
    refId: string | null
    name: string | null
    birthDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientMaxAggregateOutputType = {
    id: string | null
    refId: string | null
    name: string | null
    birthDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PatientCountAggregateOutputType = {
    id: number
    refId: number
    name: number
    birthDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PatientMinAggregateInputType = {
    id?: true
    refId?: true
    name?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientMaxAggregateInputType = {
    id?: true
    refId?: true
    name?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PatientCountAggregateInputType = {
    id?: true
    refId?: true
    name?: true
    birthDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PatientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patient to aggregate.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Patients
    **/
    _count?: true | PatientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PatientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PatientMaxAggregateInputType
  }

  export type GetPatientAggregateType<T extends PatientAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient[P]>
      : GetScalarType<T[P], AggregatePatient[P]>
  }




  export type PatientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PatientWhereInput
    orderBy?: PatientOrderByWithAggregationInput | PatientOrderByWithAggregationInput[]
    by: PatientScalarFieldEnum[] | PatientScalarFieldEnum
    having?: PatientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PatientCountAggregateInputType | true
    _min?: PatientMinAggregateInputType
    _max?: PatientMaxAggregateInputType
  }

  export type PatientGroupByOutputType = {
    id: string
    refId: string
    name: string
    birthDate: Date
    createdAt: Date
    updatedAt: Date
    _count: PatientCountAggregateOutputType | null
    _min: PatientMinAggregateOutputType | null
    _max: PatientMaxAggregateOutputType | null
  }

  type GetPatientGroupByPayload<T extends PatientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PatientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PatientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PatientGroupByOutputType[P]>
            : GetScalarType<T[P], PatientGroupByOutputType[P]>
        }
      >
    >


  export type PatientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refId?: boolean
    name?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    evaluations?: boolean | Patient$evaluationsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refId?: boolean
    name?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    refId?: boolean
    name?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["patient"]>

  export type PatientSelectScalar = {
    id?: boolean
    refId?: boolean
    name?: boolean
    birthDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PatientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "refId" | "name" | "birthDate" | "createdAt" | "updatedAt", ExtArgs["result"]["patient"]>
  export type PatientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluations?: boolean | Patient$evaluationsArgs<ExtArgs>
    _count?: boolean | PatientCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PatientIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PatientIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PatientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Patient"
    objects: {
      evaluations: Prisma.$EvaluationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      refId: string
      name: string
      birthDate: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["patient"]>
    composites: {}
  }

  type PatientGetPayload<S extends boolean | null | undefined | PatientDefaultArgs> = $Result.GetResult<Prisma.$PatientPayload, S>

  type PatientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PatientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PatientCountAggregateInputType | true
    }

  export interface PatientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Patient'], meta: { name: 'Patient' } }
    /**
     * Find zero or one Patient that matches the filter.
     * @param {PatientFindUniqueArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PatientFindUniqueArgs>(args: SelectSubset<T, PatientFindUniqueArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PatientFindUniqueOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PatientFindUniqueOrThrowArgs>(args: SelectSubset<T, PatientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PatientFindFirstArgs>(args?: SelectSubset<T, PatientFindFirstArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindFirstOrThrowArgs} args - Arguments to find a Patient
     * @example
     * // Get one Patient
     * const patient = await prisma.patient.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PatientFindFirstOrThrowArgs>(args?: SelectSubset<T, PatientFindFirstOrThrowArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patients
     * const patients = await prisma.patient.findMany()
     * 
     * // Get first 10 Patients
     * const patients = await prisma.patient.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const patientWithIdOnly = await prisma.patient.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PatientFindManyArgs>(args?: SelectSubset<T, PatientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient.
     * @param {PatientCreateArgs} args - Arguments to create a Patient.
     * @example
     * // Create one Patient
     * const Patient = await prisma.patient.create({
     *   data: {
     *     // ... data to create a Patient
     *   }
     * })
     * 
     */
    create<T extends PatientCreateArgs>(args: SelectSubset<T, PatientCreateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patients.
     * @param {PatientCreateManyArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PatientCreateManyArgs>(args?: SelectSubset<T, PatientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patients and returns the data saved in the database.
     * @param {PatientCreateManyAndReturnArgs} args - Arguments to create many Patients.
     * @example
     * // Create many Patients
     * const patient = await prisma.patient.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PatientCreateManyAndReturnArgs>(args?: SelectSubset<T, PatientCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient.
     * @param {PatientDeleteArgs} args - Arguments to delete one Patient.
     * @example
     * // Delete one Patient
     * const Patient = await prisma.patient.delete({
     *   where: {
     *     // ... filter to delete one Patient
     *   }
     * })
     * 
     */
    delete<T extends PatientDeleteArgs>(args: SelectSubset<T, PatientDeleteArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient.
     * @param {PatientUpdateArgs} args - Arguments to update one Patient.
     * @example
     * // Update one Patient
     * const patient = await prisma.patient.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PatientUpdateArgs>(args: SelectSubset<T, PatientUpdateArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patients.
     * @param {PatientDeleteManyArgs} args - Arguments to filter Patients to delete.
     * @example
     * // Delete a few Patients
     * const { count } = await prisma.patient.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PatientDeleteManyArgs>(args?: SelectSubset<T, PatientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PatientUpdateManyArgs>(args: SelectSubset<T, PatientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patients and returns the data updated in the database.
     * @param {PatientUpdateManyAndReturnArgs} args - Arguments to update many Patients.
     * @example
     * // Update many Patients
     * const patient = await prisma.patient.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patients and only return the `id`
     * const patientWithIdOnly = await prisma.patient.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PatientUpdateManyAndReturnArgs>(args: SelectSubset<T, PatientUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient.
     * @param {PatientUpsertArgs} args - Arguments to update or create a Patient.
     * @example
     * // Update or create a Patient
     * const patient = await prisma.patient.upsert({
     *   create: {
     *     // ... data to create a Patient
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient we want to update
     *   }
     * })
     */
    upsert<T extends PatientUpsertArgs>(args: SelectSubset<T, PatientUpsertArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientCountArgs} args - Arguments to filter Patients to count.
     * @example
     * // Count the number of Patients
     * const count = await prisma.patient.count({
     *   where: {
     *     // ... the filter for the Patients we want to count
     *   }
     * })
    **/
    count<T extends PatientCountArgs>(
      args?: Subset<T, PatientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PatientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PatientAggregateArgs>(args: Subset<T, PatientAggregateArgs>): Prisma.PrismaPromise<GetPatientAggregateType<T>>

    /**
     * Group by Patient.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PatientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PatientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PatientGroupByArgs['orderBy'] }
        : { orderBy?: PatientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PatientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Patient model
   */
  readonly fields: PatientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Patient.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PatientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    evaluations<T extends Patient$evaluationsArgs<ExtArgs> = {}>(args?: Subset<T, Patient$evaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Patient model
   */
  interface PatientFieldRefs {
    readonly id: FieldRef<"Patient", 'String'>
    readonly refId: FieldRef<"Patient", 'String'>
    readonly name: FieldRef<"Patient", 'String'>
    readonly birthDate: FieldRef<"Patient", 'DateTime'>
    readonly createdAt: FieldRef<"Patient", 'DateTime'>
    readonly updatedAt: FieldRef<"Patient", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Patient findUnique
   */
  export type PatientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findUniqueOrThrow
   */
  export type PatientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient findFirst
   */
  export type PatientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findFirstOrThrow
   */
  export type PatientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patient to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Patients.
     */
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient findMany
   */
  export type PatientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter, which Patients to fetch.
     */
    where?: PatientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Patients to fetch.
     */
    orderBy?: PatientOrderByWithRelationInput | PatientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Patients.
     */
    cursor?: PatientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Patients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Patients.
     */
    skip?: number
    distinct?: PatientScalarFieldEnum | PatientScalarFieldEnum[]
  }

  /**
   * Patient create
   */
  export type PatientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to create a Patient.
     */
    data: XOR<PatientCreateInput, PatientUncheckedCreateInput>
  }

  /**
   * Patient createMany
   */
  export type PatientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient createManyAndReturn
   */
  export type PatientCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to create many Patients.
     */
    data: PatientCreateManyInput | PatientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Patient update
   */
  export type PatientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The data needed to update a Patient.
     */
    data: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
    /**
     * Choose, which Patient to update.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient updateMany
   */
  export type PatientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient updateManyAndReturn
   */
  export type PatientUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * The data used to update Patients.
     */
    data: XOR<PatientUpdateManyMutationInput, PatientUncheckedUpdateManyInput>
    /**
     * Filter which Patients to update
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to update.
     */
    limit?: number
  }

  /**
   * Patient upsert
   */
  export type PatientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * The filter to search for the Patient to update in case it exists.
     */
    where: PatientWhereUniqueInput
    /**
     * In case the Patient found by the `where` argument doesn't exist, create a new Patient with this data.
     */
    create: XOR<PatientCreateInput, PatientUncheckedCreateInput>
    /**
     * In case the Patient was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PatientUpdateInput, PatientUncheckedUpdateInput>
  }

  /**
   * Patient delete
   */
  export type PatientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
    /**
     * Filter which Patient to delete.
     */
    where: PatientWhereUniqueInput
  }

  /**
   * Patient deleteMany
   */
  export type PatientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Patients to delete
     */
    where?: PatientWhereInput
    /**
     * Limit how many Patients to delete.
     */
    limit?: number
  }

  /**
   * Patient.evaluations
   */
  export type Patient$evaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    where?: EvaluationWhereInput
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    cursor?: EvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Patient without action
   */
  export type PatientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient
     */
    select?: PatientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Patient
     */
    omit?: PatientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PatientInclude<ExtArgs> | null
  }


  /**
   * Model Clinic
   */

  export type AggregateClinic = {
    _count: ClinicCountAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  export type ClinicMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinic to aggregate.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clinics
    **/
    _count?: true | ClinicCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicMaxAggregateInputType
  }

  export type GetClinicAggregateType<T extends ClinicAggregateArgs> = {
        [P in keyof T & keyof AggregateClinic]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinic[P]>
      : GetScalarType<T[P], AggregateClinic[P]>
  }




  export type ClinicGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicWhereInput
    orderBy?: ClinicOrderByWithAggregationInput | ClinicOrderByWithAggregationInput[]
    by: ClinicScalarFieldEnum[] | ClinicScalarFieldEnum
    having?: ClinicScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicCountAggregateInputType | true
    _min?: ClinicMinAggregateInputType
    _max?: ClinicMaxAggregateInputType
  }

  export type ClinicGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: ClinicCountAggregateOutputType | null
    _min: ClinicMinAggregateOutputType | null
    _max: ClinicMaxAggregateOutputType | null
  }

  type GetClinicGroupByPayload<T extends ClinicGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicGroupByOutputType[P]>
        }
      >
    >


  export type ClinicSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    collaborators?: boolean | Clinic$collaboratorsArgs<ExtArgs>
    evaluations?: boolean | Clinic$evaluationsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clinic"]>

  export type ClinicSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["clinic"]>
  export type ClinicInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    collaborators?: boolean | Clinic$collaboratorsArgs<ExtArgs>
    evaluations?: boolean | Clinic$evaluationsArgs<ExtArgs>
    _count?: boolean | ClinicCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClinicIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClinicIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClinicPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clinic"
    objects: {
      collaborators: Prisma.$ClinicCollaboratorPayload<ExtArgs>[]
      evaluations: Prisma.$EvaluationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinic"]>
    composites: {}
  }

  type ClinicGetPayload<S extends boolean | null | undefined | ClinicDefaultArgs> = $Result.GetResult<Prisma.$ClinicPayload, S>

  type ClinicCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicCountAggregateInputType | true
    }

  export interface ClinicDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clinic'], meta: { name: 'Clinic' } }
    /**
     * Find zero or one Clinic that matches the filter.
     * @param {ClinicFindUniqueArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicFindUniqueArgs>(args: SelectSubset<T, ClinicFindUniqueArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clinic that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicFindUniqueOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicFindFirstArgs>(args?: SelectSubset<T, ClinicFindFirstArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clinic that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindFirstOrThrowArgs} args - Arguments to find a Clinic
     * @example
     * // Get one Clinic
     * const clinic = await prisma.clinic.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clinics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clinics
     * const clinics = await prisma.clinic.findMany()
     * 
     * // Get first 10 Clinics
     * const clinics = await prisma.clinic.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clinicWithIdOnly = await prisma.clinic.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClinicFindManyArgs>(args?: SelectSubset<T, ClinicFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clinic.
     * @param {ClinicCreateArgs} args - Arguments to create a Clinic.
     * @example
     * // Create one Clinic
     * const Clinic = await prisma.clinic.create({
     *   data: {
     *     // ... data to create a Clinic
     *   }
     * })
     * 
     */
    create<T extends ClinicCreateArgs>(args: SelectSubset<T, ClinicCreateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clinics.
     * @param {ClinicCreateManyArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicCreateManyArgs>(args?: SelectSubset<T, ClinicCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clinics and returns the data saved in the database.
     * @param {ClinicCreateManyAndReturnArgs} args - Arguments to create many Clinics.
     * @example
     * // Create many Clinics
     * const clinic = await prisma.clinic.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clinic.
     * @param {ClinicDeleteArgs} args - Arguments to delete one Clinic.
     * @example
     * // Delete one Clinic
     * const Clinic = await prisma.clinic.delete({
     *   where: {
     *     // ... filter to delete one Clinic
     *   }
     * })
     * 
     */
    delete<T extends ClinicDeleteArgs>(args: SelectSubset<T, ClinicDeleteArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clinic.
     * @param {ClinicUpdateArgs} args - Arguments to update one Clinic.
     * @example
     * // Update one Clinic
     * const clinic = await prisma.clinic.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicUpdateArgs>(args: SelectSubset<T, ClinicUpdateArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clinics.
     * @param {ClinicDeleteManyArgs} args - Arguments to filter Clinics to delete.
     * @example
     * // Delete a few Clinics
     * const { count } = await prisma.clinic.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicDeleteManyArgs>(args?: SelectSubset<T, ClinicDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicUpdateManyArgs>(args: SelectSubset<T, ClinicUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clinics and returns the data updated in the database.
     * @param {ClinicUpdateManyAndReturnArgs} args - Arguments to update many Clinics.
     * @example
     * // Update many Clinics
     * const clinic = await prisma.clinic.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clinics and only return the `id`
     * const clinicWithIdOnly = await prisma.clinic.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clinic.
     * @param {ClinicUpsertArgs} args - Arguments to update or create a Clinic.
     * @example
     * // Update or create a Clinic
     * const clinic = await prisma.clinic.upsert({
     *   create: {
     *     // ... data to create a Clinic
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clinic we want to update
     *   }
     * })
     */
    upsert<T extends ClinicUpsertArgs>(args: SelectSubset<T, ClinicUpsertArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clinics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCountArgs} args - Arguments to filter Clinics to count.
     * @example
     * // Count the number of Clinics
     * const count = await prisma.clinic.count({
     *   where: {
     *     // ... the filter for the Clinics we want to count
     *   }
     * })
    **/
    count<T extends ClinicCountArgs>(
      args?: Subset<T, ClinicCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicAggregateArgs>(args: Subset<T, ClinicAggregateArgs>): Prisma.PrismaPromise<GetClinicAggregateType<T>>

    /**
     * Group by Clinic.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicGroupByArgs['orderBy'] }
        : { orderBy?: ClinicGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clinic model
   */
  readonly fields: ClinicFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clinic.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    collaborators<T extends Clinic$collaboratorsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$collaboratorsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    evaluations<T extends Clinic$evaluationsArgs<ExtArgs> = {}>(args?: Subset<T, Clinic$evaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Clinic model
   */
  interface ClinicFieldRefs {
    readonly id: FieldRef<"Clinic", 'String'>
    readonly name: FieldRef<"Clinic", 'String'>
    readonly createdAt: FieldRef<"Clinic", 'DateTime'>
    readonly updatedAt: FieldRef<"Clinic", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clinic findUnique
   */
  export type ClinicFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findUniqueOrThrow
   */
  export type ClinicFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic findFirst
   */
  export type ClinicFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findFirstOrThrow
   */
  export type ClinicFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinic to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clinics.
     */
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic findMany
   */
  export type ClinicFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter, which Clinics to fetch.
     */
    where?: ClinicWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clinics to fetch.
     */
    orderBy?: ClinicOrderByWithRelationInput | ClinicOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clinics.
     */
    cursor?: ClinicWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clinics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clinics.
     */
    skip?: number
    distinct?: ClinicScalarFieldEnum | ClinicScalarFieldEnum[]
  }

  /**
   * Clinic create
   */
  export type ClinicCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to create a Clinic.
     */
    data: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
  }

  /**
   * Clinic createMany
   */
  export type ClinicCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic createManyAndReturn
   */
  export type ClinicCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to create many Clinics.
     */
    data: ClinicCreateManyInput | ClinicCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Clinic update
   */
  export type ClinicUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The data needed to update a Clinic.
     */
    data: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
    /**
     * Choose, which Clinic to update.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic updateMany
   */
  export type ClinicUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic updateManyAndReturn
   */
  export type ClinicUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * The data used to update Clinics.
     */
    data: XOR<ClinicUpdateManyMutationInput, ClinicUncheckedUpdateManyInput>
    /**
     * Filter which Clinics to update
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to update.
     */
    limit?: number
  }

  /**
   * Clinic upsert
   */
  export type ClinicUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * The filter to search for the Clinic to update in case it exists.
     */
    where: ClinicWhereUniqueInput
    /**
     * In case the Clinic found by the `where` argument doesn't exist, create a new Clinic with this data.
     */
    create: XOR<ClinicCreateInput, ClinicUncheckedCreateInput>
    /**
     * In case the Clinic was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicUpdateInput, ClinicUncheckedUpdateInput>
  }

  /**
   * Clinic delete
   */
  export type ClinicDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    /**
     * Filter which Clinic to delete.
     */
    where: ClinicWhereUniqueInput
  }

  /**
   * Clinic deleteMany
   */
  export type ClinicDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clinics to delete
     */
    where?: ClinicWhereInput
    /**
     * Limit how many Clinics to delete.
     */
    limit?: number
  }

  /**
   * Clinic.collaborators
   */
  export type Clinic$collaboratorsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    where?: ClinicCollaboratorWhereInput
    orderBy?: ClinicCollaboratorOrderByWithRelationInput | ClinicCollaboratorOrderByWithRelationInput[]
    cursor?: ClinicCollaboratorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicCollaboratorScalarFieldEnum | ClinicCollaboratorScalarFieldEnum[]
  }

  /**
   * Clinic.evaluations
   */
  export type Clinic$evaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    where?: EvaluationWhereInput
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    cursor?: EvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Clinic without action
   */
  export type ClinicDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
  }


  /**
   * Model Collaborator
   */

  export type AggregateCollaborator = {
    _count: CollaboratorCountAggregateOutputType | null
    _min: CollaboratorMinAggregateOutputType | null
    _max: CollaboratorMaxAggregateOutputType | null
  }

  export type CollaboratorMinAggregateOutputType = {
    id: string | null
    name: string | null
    crm: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollaboratorMaxAggregateOutputType = {
    id: string | null
    name: string | null
    crm: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CollaboratorCountAggregateOutputType = {
    id: number
    name: number
    crm: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CollaboratorMinAggregateInputType = {
    id?: true
    name?: true
    crm?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollaboratorMaxAggregateInputType = {
    id?: true
    name?: true
    crm?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CollaboratorCountAggregateInputType = {
    id?: true
    name?: true
    crm?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CollaboratorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaborator to aggregate.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Collaborators
    **/
    _count?: true | CollaboratorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CollaboratorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CollaboratorMaxAggregateInputType
  }

  export type GetCollaboratorAggregateType<T extends CollaboratorAggregateArgs> = {
        [P in keyof T & keyof AggregateCollaborator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCollaborator[P]>
      : GetScalarType<T[P], AggregateCollaborator[P]>
  }




  export type CollaboratorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CollaboratorWhereInput
    orderBy?: CollaboratorOrderByWithAggregationInput | CollaboratorOrderByWithAggregationInput[]
    by: CollaboratorScalarFieldEnum[] | CollaboratorScalarFieldEnum
    having?: CollaboratorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CollaboratorCountAggregateInputType | true
    _min?: CollaboratorMinAggregateInputType
    _max?: CollaboratorMaxAggregateInputType
  }

  export type CollaboratorGroupByOutputType = {
    id: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: CollaboratorCountAggregateOutputType | null
    _min: CollaboratorMinAggregateOutputType | null
    _max: CollaboratorMaxAggregateOutputType | null
  }

  type GetCollaboratorGroupByPayload<T extends CollaboratorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CollaboratorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CollaboratorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CollaboratorGroupByOutputType[P]>
            : GetScalarType<T[P], CollaboratorGroupByOutputType[P]>
        }
      >
    >


  export type CollaboratorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    crm?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinics?: boolean | Collaborator$clinicsArgs<ExtArgs>
    evaluations?: boolean | Collaborator$evaluationsArgs<ExtArgs>
    _count?: boolean | CollaboratorCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["collaborator"]>

  export type CollaboratorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    crm?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["collaborator"]>

  export type CollaboratorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    crm?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["collaborator"]>

  export type CollaboratorSelectScalar = {
    id?: boolean
    name?: boolean
    crm?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CollaboratorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "crm" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["collaborator"]>
  export type CollaboratorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinics?: boolean | Collaborator$clinicsArgs<ExtArgs>
    evaluations?: boolean | Collaborator$evaluationsArgs<ExtArgs>
    _count?: boolean | CollaboratorCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CollaboratorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CollaboratorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CollaboratorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Collaborator"
    objects: {
      clinics: Prisma.$ClinicCollaboratorPayload<ExtArgs>[]
      evaluations: Prisma.$EvaluationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      crm: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["collaborator"]>
    composites: {}
  }

  type CollaboratorGetPayload<S extends boolean | null | undefined | CollaboratorDefaultArgs> = $Result.GetResult<Prisma.$CollaboratorPayload, S>

  type CollaboratorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CollaboratorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CollaboratorCountAggregateInputType | true
    }

  export interface CollaboratorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Collaborator'], meta: { name: 'Collaborator' } }
    /**
     * Find zero or one Collaborator that matches the filter.
     * @param {CollaboratorFindUniqueArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CollaboratorFindUniqueArgs>(args: SelectSubset<T, CollaboratorFindUniqueArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Collaborator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CollaboratorFindUniqueOrThrowArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CollaboratorFindUniqueOrThrowArgs>(args: SelectSubset<T, CollaboratorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaborator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorFindFirstArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CollaboratorFindFirstArgs>(args?: SelectSubset<T, CollaboratorFindFirstArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Collaborator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorFindFirstOrThrowArgs} args - Arguments to find a Collaborator
     * @example
     * // Get one Collaborator
     * const collaborator = await prisma.collaborator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CollaboratorFindFirstOrThrowArgs>(args?: SelectSubset<T, CollaboratorFindFirstOrThrowArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Collaborators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Collaborators
     * const collaborators = await prisma.collaborator.findMany()
     * 
     * // Get first 10 Collaborators
     * const collaborators = await prisma.collaborator.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const collaboratorWithIdOnly = await prisma.collaborator.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CollaboratorFindManyArgs>(args?: SelectSubset<T, CollaboratorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Collaborator.
     * @param {CollaboratorCreateArgs} args - Arguments to create a Collaborator.
     * @example
     * // Create one Collaborator
     * const Collaborator = await prisma.collaborator.create({
     *   data: {
     *     // ... data to create a Collaborator
     *   }
     * })
     * 
     */
    create<T extends CollaboratorCreateArgs>(args: SelectSubset<T, CollaboratorCreateArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Collaborators.
     * @param {CollaboratorCreateManyArgs} args - Arguments to create many Collaborators.
     * @example
     * // Create many Collaborators
     * const collaborator = await prisma.collaborator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CollaboratorCreateManyArgs>(args?: SelectSubset<T, CollaboratorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Collaborators and returns the data saved in the database.
     * @param {CollaboratorCreateManyAndReturnArgs} args - Arguments to create many Collaborators.
     * @example
     * // Create many Collaborators
     * const collaborator = await prisma.collaborator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Collaborators and only return the `id`
     * const collaboratorWithIdOnly = await prisma.collaborator.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CollaboratorCreateManyAndReturnArgs>(args?: SelectSubset<T, CollaboratorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Collaborator.
     * @param {CollaboratorDeleteArgs} args - Arguments to delete one Collaborator.
     * @example
     * // Delete one Collaborator
     * const Collaborator = await prisma.collaborator.delete({
     *   where: {
     *     // ... filter to delete one Collaborator
     *   }
     * })
     * 
     */
    delete<T extends CollaboratorDeleteArgs>(args: SelectSubset<T, CollaboratorDeleteArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Collaborator.
     * @param {CollaboratorUpdateArgs} args - Arguments to update one Collaborator.
     * @example
     * // Update one Collaborator
     * const collaborator = await prisma.collaborator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CollaboratorUpdateArgs>(args: SelectSubset<T, CollaboratorUpdateArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Collaborators.
     * @param {CollaboratorDeleteManyArgs} args - Arguments to filter Collaborators to delete.
     * @example
     * // Delete a few Collaborators
     * const { count } = await prisma.collaborator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CollaboratorDeleteManyArgs>(args?: SelectSubset<T, CollaboratorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Collaborators
     * const collaborator = await prisma.collaborator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CollaboratorUpdateManyArgs>(args: SelectSubset<T, CollaboratorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Collaborators and returns the data updated in the database.
     * @param {CollaboratorUpdateManyAndReturnArgs} args - Arguments to update many Collaborators.
     * @example
     * // Update many Collaborators
     * const collaborator = await prisma.collaborator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Collaborators and only return the `id`
     * const collaboratorWithIdOnly = await prisma.collaborator.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CollaboratorUpdateManyAndReturnArgs>(args: SelectSubset<T, CollaboratorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Collaborator.
     * @param {CollaboratorUpsertArgs} args - Arguments to update or create a Collaborator.
     * @example
     * // Update or create a Collaborator
     * const collaborator = await prisma.collaborator.upsert({
     *   create: {
     *     // ... data to create a Collaborator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Collaborator we want to update
     *   }
     * })
     */
    upsert<T extends CollaboratorUpsertArgs>(args: SelectSubset<T, CollaboratorUpsertArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Collaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorCountArgs} args - Arguments to filter Collaborators to count.
     * @example
     * // Count the number of Collaborators
     * const count = await prisma.collaborator.count({
     *   where: {
     *     // ... the filter for the Collaborators we want to count
     *   }
     * })
    **/
    count<T extends CollaboratorCountArgs>(
      args?: Subset<T, CollaboratorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CollaboratorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Collaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CollaboratorAggregateArgs>(args: Subset<T, CollaboratorAggregateArgs>): Prisma.PrismaPromise<GetCollaboratorAggregateType<T>>

    /**
     * Group by Collaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CollaboratorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CollaboratorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CollaboratorGroupByArgs['orderBy'] }
        : { orderBy?: CollaboratorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CollaboratorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCollaboratorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Collaborator model
   */
  readonly fields: CollaboratorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Collaborator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CollaboratorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinics<T extends Collaborator$clinicsArgs<ExtArgs> = {}>(args?: Subset<T, Collaborator$clinicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    evaluations<T extends Collaborator$evaluationsArgs<ExtArgs> = {}>(args?: Subset<T, Collaborator$evaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Collaborator model
   */
  interface CollaboratorFieldRefs {
    readonly id: FieldRef<"Collaborator", 'String'>
    readonly name: FieldRef<"Collaborator", 'String'>
    readonly crm: FieldRef<"Collaborator", 'String'>
    readonly role: FieldRef<"Collaborator", 'Role'>
    readonly createdAt: FieldRef<"Collaborator", 'DateTime'>
    readonly updatedAt: FieldRef<"Collaborator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Collaborator findUnique
   */
  export type CollaboratorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator findUniqueOrThrow
   */
  export type CollaboratorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator findFirst
   */
  export type CollaboratorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborators.
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborators.
     */
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * Collaborator findFirstOrThrow
   */
  export type CollaboratorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborator to fetch.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Collaborators.
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Collaborators.
     */
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * Collaborator findMany
   */
  export type CollaboratorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which Collaborators to fetch.
     */
    where?: CollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Collaborators to fetch.
     */
    orderBy?: CollaboratorOrderByWithRelationInput | CollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Collaborators.
     */
    cursor?: CollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Collaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Collaborators.
     */
    skip?: number
    distinct?: CollaboratorScalarFieldEnum | CollaboratorScalarFieldEnum[]
  }

  /**
   * Collaborator create
   */
  export type CollaboratorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to create a Collaborator.
     */
    data: XOR<CollaboratorCreateInput, CollaboratorUncheckedCreateInput>
  }

  /**
   * Collaborator createMany
   */
  export type CollaboratorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Collaborators.
     */
    data: CollaboratorCreateManyInput | CollaboratorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collaborator createManyAndReturn
   */
  export type CollaboratorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * The data used to create many Collaborators.
     */
    data: CollaboratorCreateManyInput | CollaboratorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Collaborator update
   */
  export type CollaboratorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to update a Collaborator.
     */
    data: XOR<CollaboratorUpdateInput, CollaboratorUncheckedUpdateInput>
    /**
     * Choose, which Collaborator to update.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator updateMany
   */
  export type CollaboratorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Collaborators.
     */
    data: XOR<CollaboratorUpdateManyMutationInput, CollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which Collaborators to update
     */
    where?: CollaboratorWhereInput
    /**
     * Limit how many Collaborators to update.
     */
    limit?: number
  }

  /**
   * Collaborator updateManyAndReturn
   */
  export type CollaboratorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * The data used to update Collaborators.
     */
    data: XOR<CollaboratorUpdateManyMutationInput, CollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which Collaborators to update
     */
    where?: CollaboratorWhereInput
    /**
     * Limit how many Collaborators to update.
     */
    limit?: number
  }

  /**
   * Collaborator upsert
   */
  export type CollaboratorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * The filter to search for the Collaborator to update in case it exists.
     */
    where: CollaboratorWhereUniqueInput
    /**
     * In case the Collaborator found by the `where` argument doesn't exist, create a new Collaborator with this data.
     */
    create: XOR<CollaboratorCreateInput, CollaboratorUncheckedCreateInput>
    /**
     * In case the Collaborator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CollaboratorUpdateInput, CollaboratorUncheckedUpdateInput>
  }

  /**
   * Collaborator delete
   */
  export type CollaboratorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
    /**
     * Filter which Collaborator to delete.
     */
    where: CollaboratorWhereUniqueInput
  }

  /**
   * Collaborator deleteMany
   */
  export type CollaboratorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Collaborators to delete
     */
    where?: CollaboratorWhereInput
    /**
     * Limit how many Collaborators to delete.
     */
    limit?: number
  }

  /**
   * Collaborator.clinics
   */
  export type Collaborator$clinicsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    where?: ClinicCollaboratorWhereInput
    orderBy?: ClinicCollaboratorOrderByWithRelationInput | ClinicCollaboratorOrderByWithRelationInput[]
    cursor?: ClinicCollaboratorWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClinicCollaboratorScalarFieldEnum | ClinicCollaboratorScalarFieldEnum[]
  }

  /**
   * Collaborator.evaluations
   */
  export type Collaborator$evaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    where?: EvaluationWhereInput
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    cursor?: EvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Collaborator without action
   */
  export type CollaboratorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Collaborator
     */
    select?: CollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Collaborator
     */
    omit?: CollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CollaboratorInclude<ExtArgs> | null
  }


  /**
   * Model ClinicCollaborator
   */

  export type AggregateClinicCollaborator = {
    _count: ClinicCollaboratorCountAggregateOutputType | null
    _min: ClinicCollaboratorMinAggregateOutputType | null
    _max: ClinicCollaboratorMaxAggregateOutputType | null
  }

  export type ClinicCollaboratorMinAggregateOutputType = {
    clinicId: string | null
    collaboratorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicCollaboratorMaxAggregateOutputType = {
    clinicId: string | null
    collaboratorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClinicCollaboratorCountAggregateOutputType = {
    clinicId: number
    collaboratorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClinicCollaboratorMinAggregateInputType = {
    clinicId?: true
    collaboratorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicCollaboratorMaxAggregateInputType = {
    clinicId?: true
    collaboratorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClinicCollaboratorCountAggregateInputType = {
    clinicId?: true
    collaboratorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClinicCollaboratorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicCollaborator to aggregate.
     */
    where?: ClinicCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicCollaborators to fetch.
     */
    orderBy?: ClinicCollaboratorOrderByWithRelationInput | ClinicCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClinicCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicCollaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ClinicCollaborators
    **/
    _count?: true | ClinicCollaboratorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClinicCollaboratorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClinicCollaboratorMaxAggregateInputType
  }

  export type GetClinicCollaboratorAggregateType<T extends ClinicCollaboratorAggregateArgs> = {
        [P in keyof T & keyof AggregateClinicCollaborator]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClinicCollaborator[P]>
      : GetScalarType<T[P], AggregateClinicCollaborator[P]>
  }




  export type ClinicCollaboratorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClinicCollaboratorWhereInput
    orderBy?: ClinicCollaboratorOrderByWithAggregationInput | ClinicCollaboratorOrderByWithAggregationInput[]
    by: ClinicCollaboratorScalarFieldEnum[] | ClinicCollaboratorScalarFieldEnum
    having?: ClinicCollaboratorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClinicCollaboratorCountAggregateInputType | true
    _min?: ClinicCollaboratorMinAggregateInputType
    _max?: ClinicCollaboratorMaxAggregateInputType
  }

  export type ClinicCollaboratorGroupByOutputType = {
    clinicId: string
    collaboratorId: string
    createdAt: Date
    updatedAt: Date
    _count: ClinicCollaboratorCountAggregateOutputType | null
    _min: ClinicCollaboratorMinAggregateOutputType | null
    _max: ClinicCollaboratorMaxAggregateOutputType | null
  }

  type GetClinicCollaboratorGroupByPayload<T extends ClinicCollaboratorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClinicCollaboratorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClinicCollaboratorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClinicCollaboratorGroupByOutputType[P]>
            : GetScalarType<T[P], ClinicCollaboratorGroupByOutputType[P]>
        }
      >
    >


  export type ClinicCollaboratorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clinicId?: boolean
    collaboratorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicCollaborator"]>

  export type ClinicCollaboratorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clinicId?: boolean
    collaboratorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicCollaborator"]>

  export type ClinicCollaboratorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    clinicId?: boolean
    collaboratorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clinicCollaborator"]>

  export type ClinicCollaboratorSelectScalar = {
    clinicId?: boolean
    collaboratorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClinicCollaboratorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"clinicId" | "collaboratorId" | "createdAt" | "updatedAt", ExtArgs["result"]["clinicCollaborator"]>
  export type ClinicCollaboratorInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
  }
  export type ClinicCollaboratorIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
  }
  export type ClinicCollaboratorIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clinic?: boolean | ClinicDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
  }

  export type $ClinicCollaboratorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ClinicCollaborator"
    objects: {
      clinic: Prisma.$ClinicPayload<ExtArgs>
      collaborator: Prisma.$CollaboratorPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      clinicId: string
      collaboratorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clinicCollaborator"]>
    composites: {}
  }

  type ClinicCollaboratorGetPayload<S extends boolean | null | undefined | ClinicCollaboratorDefaultArgs> = $Result.GetResult<Prisma.$ClinicCollaboratorPayload, S>

  type ClinicCollaboratorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClinicCollaboratorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClinicCollaboratorCountAggregateInputType | true
    }

  export interface ClinicCollaboratorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ClinicCollaborator'], meta: { name: 'ClinicCollaborator' } }
    /**
     * Find zero or one ClinicCollaborator that matches the filter.
     * @param {ClinicCollaboratorFindUniqueArgs} args - Arguments to find a ClinicCollaborator
     * @example
     * // Get one ClinicCollaborator
     * const clinicCollaborator = await prisma.clinicCollaborator.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClinicCollaboratorFindUniqueArgs>(args: SelectSubset<T, ClinicCollaboratorFindUniqueArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ClinicCollaborator that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClinicCollaboratorFindUniqueOrThrowArgs} args - Arguments to find a ClinicCollaborator
     * @example
     * // Get one ClinicCollaborator
     * const clinicCollaborator = await prisma.clinicCollaborator.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClinicCollaboratorFindUniqueOrThrowArgs>(args: SelectSubset<T, ClinicCollaboratorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicCollaborator that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCollaboratorFindFirstArgs} args - Arguments to find a ClinicCollaborator
     * @example
     * // Get one ClinicCollaborator
     * const clinicCollaborator = await prisma.clinicCollaborator.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClinicCollaboratorFindFirstArgs>(args?: SelectSubset<T, ClinicCollaboratorFindFirstArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ClinicCollaborator that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCollaboratorFindFirstOrThrowArgs} args - Arguments to find a ClinicCollaborator
     * @example
     * // Get one ClinicCollaborator
     * const clinicCollaborator = await prisma.clinicCollaborator.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClinicCollaboratorFindFirstOrThrowArgs>(args?: SelectSubset<T, ClinicCollaboratorFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ClinicCollaborators that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCollaboratorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ClinicCollaborators
     * const clinicCollaborators = await prisma.clinicCollaborator.findMany()
     * 
     * // Get first 10 ClinicCollaborators
     * const clinicCollaborators = await prisma.clinicCollaborator.findMany({ take: 10 })
     * 
     * // Only select the `clinicId`
     * const clinicCollaboratorWithClinicIdOnly = await prisma.clinicCollaborator.findMany({ select: { clinicId: true } })
     * 
     */
    findMany<T extends ClinicCollaboratorFindManyArgs>(args?: SelectSubset<T, ClinicCollaboratorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ClinicCollaborator.
     * @param {ClinicCollaboratorCreateArgs} args - Arguments to create a ClinicCollaborator.
     * @example
     * // Create one ClinicCollaborator
     * const ClinicCollaborator = await prisma.clinicCollaborator.create({
     *   data: {
     *     // ... data to create a ClinicCollaborator
     *   }
     * })
     * 
     */
    create<T extends ClinicCollaboratorCreateArgs>(args: SelectSubset<T, ClinicCollaboratorCreateArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ClinicCollaborators.
     * @param {ClinicCollaboratorCreateManyArgs} args - Arguments to create many ClinicCollaborators.
     * @example
     * // Create many ClinicCollaborators
     * const clinicCollaborator = await prisma.clinicCollaborator.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClinicCollaboratorCreateManyArgs>(args?: SelectSubset<T, ClinicCollaboratorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ClinicCollaborators and returns the data saved in the database.
     * @param {ClinicCollaboratorCreateManyAndReturnArgs} args - Arguments to create many ClinicCollaborators.
     * @example
     * // Create many ClinicCollaborators
     * const clinicCollaborator = await prisma.clinicCollaborator.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ClinicCollaborators and only return the `clinicId`
     * const clinicCollaboratorWithClinicIdOnly = await prisma.clinicCollaborator.createManyAndReturn({
     *   select: { clinicId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClinicCollaboratorCreateManyAndReturnArgs>(args?: SelectSubset<T, ClinicCollaboratorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ClinicCollaborator.
     * @param {ClinicCollaboratorDeleteArgs} args - Arguments to delete one ClinicCollaborator.
     * @example
     * // Delete one ClinicCollaborator
     * const ClinicCollaborator = await prisma.clinicCollaborator.delete({
     *   where: {
     *     // ... filter to delete one ClinicCollaborator
     *   }
     * })
     * 
     */
    delete<T extends ClinicCollaboratorDeleteArgs>(args: SelectSubset<T, ClinicCollaboratorDeleteArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ClinicCollaborator.
     * @param {ClinicCollaboratorUpdateArgs} args - Arguments to update one ClinicCollaborator.
     * @example
     * // Update one ClinicCollaborator
     * const clinicCollaborator = await prisma.clinicCollaborator.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClinicCollaboratorUpdateArgs>(args: SelectSubset<T, ClinicCollaboratorUpdateArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ClinicCollaborators.
     * @param {ClinicCollaboratorDeleteManyArgs} args - Arguments to filter ClinicCollaborators to delete.
     * @example
     * // Delete a few ClinicCollaborators
     * const { count } = await prisma.clinicCollaborator.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClinicCollaboratorDeleteManyArgs>(args?: SelectSubset<T, ClinicCollaboratorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicCollaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCollaboratorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ClinicCollaborators
     * const clinicCollaborator = await prisma.clinicCollaborator.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClinicCollaboratorUpdateManyArgs>(args: SelectSubset<T, ClinicCollaboratorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ClinicCollaborators and returns the data updated in the database.
     * @param {ClinicCollaboratorUpdateManyAndReturnArgs} args - Arguments to update many ClinicCollaborators.
     * @example
     * // Update many ClinicCollaborators
     * const clinicCollaborator = await prisma.clinicCollaborator.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ClinicCollaborators and only return the `clinicId`
     * const clinicCollaboratorWithClinicIdOnly = await prisma.clinicCollaborator.updateManyAndReturn({
     *   select: { clinicId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClinicCollaboratorUpdateManyAndReturnArgs>(args: SelectSubset<T, ClinicCollaboratorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ClinicCollaborator.
     * @param {ClinicCollaboratorUpsertArgs} args - Arguments to update or create a ClinicCollaborator.
     * @example
     * // Update or create a ClinicCollaborator
     * const clinicCollaborator = await prisma.clinicCollaborator.upsert({
     *   create: {
     *     // ... data to create a ClinicCollaborator
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ClinicCollaborator we want to update
     *   }
     * })
     */
    upsert<T extends ClinicCollaboratorUpsertArgs>(args: SelectSubset<T, ClinicCollaboratorUpsertArgs<ExtArgs>>): Prisma__ClinicCollaboratorClient<$Result.GetResult<Prisma.$ClinicCollaboratorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ClinicCollaborators.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCollaboratorCountArgs} args - Arguments to filter ClinicCollaborators to count.
     * @example
     * // Count the number of ClinicCollaborators
     * const count = await prisma.clinicCollaborator.count({
     *   where: {
     *     // ... the filter for the ClinicCollaborators we want to count
     *   }
     * })
    **/
    count<T extends ClinicCollaboratorCountArgs>(
      args?: Subset<T, ClinicCollaboratorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClinicCollaboratorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ClinicCollaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCollaboratorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClinicCollaboratorAggregateArgs>(args: Subset<T, ClinicCollaboratorAggregateArgs>): Prisma.PrismaPromise<GetClinicCollaboratorAggregateType<T>>

    /**
     * Group by ClinicCollaborator.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClinicCollaboratorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClinicCollaboratorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClinicCollaboratorGroupByArgs['orderBy'] }
        : { orderBy?: ClinicCollaboratorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClinicCollaboratorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClinicCollaboratorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ClinicCollaborator model
   */
  readonly fields: ClinicCollaboratorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ClinicCollaborator.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClinicCollaboratorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clinic<T extends ClinicDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClinicDefaultArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    collaborator<T extends CollaboratorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollaboratorDefaultArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ClinicCollaborator model
   */
  interface ClinicCollaboratorFieldRefs {
    readonly clinicId: FieldRef<"ClinicCollaborator", 'String'>
    readonly collaboratorId: FieldRef<"ClinicCollaborator", 'String'>
    readonly createdAt: FieldRef<"ClinicCollaborator", 'DateTime'>
    readonly updatedAt: FieldRef<"ClinicCollaborator", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ClinicCollaborator findUnique
   */
  export type ClinicCollaboratorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which ClinicCollaborator to fetch.
     */
    where: ClinicCollaboratorWhereUniqueInput
  }

  /**
   * ClinicCollaborator findUniqueOrThrow
   */
  export type ClinicCollaboratorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which ClinicCollaborator to fetch.
     */
    where: ClinicCollaboratorWhereUniqueInput
  }

  /**
   * ClinicCollaborator findFirst
   */
  export type ClinicCollaboratorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which ClinicCollaborator to fetch.
     */
    where?: ClinicCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicCollaborators to fetch.
     */
    orderBy?: ClinicCollaboratorOrderByWithRelationInput | ClinicCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicCollaborators.
     */
    cursor?: ClinicCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicCollaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicCollaborators.
     */
    distinct?: ClinicCollaboratorScalarFieldEnum | ClinicCollaboratorScalarFieldEnum[]
  }

  /**
   * ClinicCollaborator findFirstOrThrow
   */
  export type ClinicCollaboratorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which ClinicCollaborator to fetch.
     */
    where?: ClinicCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicCollaborators to fetch.
     */
    orderBy?: ClinicCollaboratorOrderByWithRelationInput | ClinicCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ClinicCollaborators.
     */
    cursor?: ClinicCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicCollaborators.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ClinicCollaborators.
     */
    distinct?: ClinicCollaboratorScalarFieldEnum | ClinicCollaboratorScalarFieldEnum[]
  }

  /**
   * ClinicCollaborator findMany
   */
  export type ClinicCollaboratorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * Filter, which ClinicCollaborators to fetch.
     */
    where?: ClinicCollaboratorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ClinicCollaborators to fetch.
     */
    orderBy?: ClinicCollaboratorOrderByWithRelationInput | ClinicCollaboratorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ClinicCollaborators.
     */
    cursor?: ClinicCollaboratorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ClinicCollaborators from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ClinicCollaborators.
     */
    skip?: number
    distinct?: ClinicCollaboratorScalarFieldEnum | ClinicCollaboratorScalarFieldEnum[]
  }

  /**
   * ClinicCollaborator create
   */
  export type ClinicCollaboratorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to create a ClinicCollaborator.
     */
    data: XOR<ClinicCollaboratorCreateInput, ClinicCollaboratorUncheckedCreateInput>
  }

  /**
   * ClinicCollaborator createMany
   */
  export type ClinicCollaboratorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ClinicCollaborators.
     */
    data: ClinicCollaboratorCreateManyInput | ClinicCollaboratorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ClinicCollaborator createManyAndReturn
   */
  export type ClinicCollaboratorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * The data used to create many ClinicCollaborators.
     */
    data: ClinicCollaboratorCreateManyInput | ClinicCollaboratorCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicCollaborator update
   */
  export type ClinicCollaboratorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * The data needed to update a ClinicCollaborator.
     */
    data: XOR<ClinicCollaboratorUpdateInput, ClinicCollaboratorUncheckedUpdateInput>
    /**
     * Choose, which ClinicCollaborator to update.
     */
    where: ClinicCollaboratorWhereUniqueInput
  }

  /**
   * ClinicCollaborator updateMany
   */
  export type ClinicCollaboratorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ClinicCollaborators.
     */
    data: XOR<ClinicCollaboratorUpdateManyMutationInput, ClinicCollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which ClinicCollaborators to update
     */
    where?: ClinicCollaboratorWhereInput
    /**
     * Limit how many ClinicCollaborators to update.
     */
    limit?: number
  }

  /**
   * ClinicCollaborator updateManyAndReturn
   */
  export type ClinicCollaboratorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * The data used to update ClinicCollaborators.
     */
    data: XOR<ClinicCollaboratorUpdateManyMutationInput, ClinicCollaboratorUncheckedUpdateManyInput>
    /**
     * Filter which ClinicCollaborators to update
     */
    where?: ClinicCollaboratorWhereInput
    /**
     * Limit how many ClinicCollaborators to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ClinicCollaborator upsert
   */
  export type ClinicCollaboratorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * The filter to search for the ClinicCollaborator to update in case it exists.
     */
    where: ClinicCollaboratorWhereUniqueInput
    /**
     * In case the ClinicCollaborator found by the `where` argument doesn't exist, create a new ClinicCollaborator with this data.
     */
    create: XOR<ClinicCollaboratorCreateInput, ClinicCollaboratorUncheckedCreateInput>
    /**
     * In case the ClinicCollaborator was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClinicCollaboratorUpdateInput, ClinicCollaboratorUncheckedUpdateInput>
  }

  /**
   * ClinicCollaborator delete
   */
  export type ClinicCollaboratorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
    /**
     * Filter which ClinicCollaborator to delete.
     */
    where: ClinicCollaboratorWhereUniqueInput
  }

  /**
   * ClinicCollaborator deleteMany
   */
  export type ClinicCollaboratorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ClinicCollaborators to delete
     */
    where?: ClinicCollaboratorWhereInput
    /**
     * Limit how many ClinicCollaborators to delete.
     */
    limit?: number
  }

  /**
   * ClinicCollaborator without action
   */
  export type ClinicCollaboratorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClinicCollaborator
     */
    select?: ClinicCollaboratorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ClinicCollaborator
     */
    omit?: ClinicCollaboratorOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicCollaboratorInclude<ExtArgs> | null
  }


  /**
   * Model Evaluation
   */

  export type AggregateEvaluation = {
    _count: EvaluationCountAggregateOutputType | null
    _min: EvaluationMinAggregateOutputType | null
    _max: EvaluationMaxAggregateOutputType | null
  }

  export type EvaluationMinAggregateOutputType = {
    id: string | null
    patientId: string | null
    collaboratorId: string | null
    done: boolean | null
    clinicId: string | null
    clinicalData: string | null
    continuousData: string | null
    diagnosis: string | null
    treatment: string | null
    followUp: string | null
    nextAppointment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvaluationMaxAggregateOutputType = {
    id: string | null
    patientId: string | null
    collaboratorId: string | null
    done: boolean | null
    clinicId: string | null
    clinicalData: string | null
    continuousData: string | null
    diagnosis: string | null
    treatment: string | null
    followUp: string | null
    nextAppointment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type EvaluationCountAggregateOutputType = {
    id: number
    patientId: number
    collaboratorId: number
    done: number
    clinicId: number
    clinicalData: number
    continuousData: number
    diagnosis: number
    treatment: number
    followUp: number
    nextAppointment: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type EvaluationMinAggregateInputType = {
    id?: true
    patientId?: true
    collaboratorId?: true
    done?: true
    clinicId?: true
    clinicalData?: true
    continuousData?: true
    diagnosis?: true
    treatment?: true
    followUp?: true
    nextAppointment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvaluationMaxAggregateInputType = {
    id?: true
    patientId?: true
    collaboratorId?: true
    done?: true
    clinicId?: true
    clinicalData?: true
    continuousData?: true
    diagnosis?: true
    treatment?: true
    followUp?: true
    nextAppointment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type EvaluationCountAggregateInputType = {
    id?: true
    patientId?: true
    collaboratorId?: true
    done?: true
    clinicId?: true
    clinicalData?: true
    continuousData?: true
    diagnosis?: true
    treatment?: true
    followUp?: true
    nextAppointment?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type EvaluationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluation to aggregate.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Evaluations
    **/
    _count?: true | EvaluationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationMaxAggregateInputType
  }

  export type GetEvaluationAggregateType<T extends EvaluationAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluation[P]>
      : GetScalarType<T[P], AggregateEvaluation[P]>
  }




  export type EvaluationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationWhereInput
    orderBy?: EvaluationOrderByWithAggregationInput | EvaluationOrderByWithAggregationInput[]
    by: EvaluationScalarFieldEnum[] | EvaluationScalarFieldEnum
    having?: EvaluationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationCountAggregateInputType | true
    _min?: EvaluationMinAggregateInputType
    _max?: EvaluationMaxAggregateInputType
  }

  export type EvaluationGroupByOutputType = {
    id: string
    patientId: string
    collaboratorId: string
    done: boolean
    clinicId: string | null
    clinicalData: string | null
    continuousData: string | null
    diagnosis: string | null
    treatment: string | null
    followUp: string | null
    nextAppointment: string | null
    createdAt: Date
    updatedAt: Date
    _count: EvaluationCountAggregateOutputType | null
    _min: EvaluationMinAggregateOutputType | null
    _max: EvaluationMaxAggregateOutputType | null
  }

  type GetEvaluationGroupByPayload<T extends EvaluationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    collaboratorId?: boolean
    done?: boolean
    clinicId?: boolean
    clinicalData?: boolean
    continuousData?: boolean
    diagnosis?: boolean
    treatment?: boolean
    followUp?: boolean
    nextAppointment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    eyes?: boolean | Evaluation$eyesArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
    clinic?: boolean | Evaluation$clinicArgs<ExtArgs>
  }, ExtArgs["result"]["evaluation"]>

  export type EvaluationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    collaboratorId?: boolean
    done?: boolean
    clinicId?: boolean
    clinicalData?: boolean
    continuousData?: boolean
    diagnosis?: boolean
    treatment?: boolean
    followUp?: boolean
    nextAppointment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
    clinic?: boolean | Evaluation$clinicArgs<ExtArgs>
  }, ExtArgs["result"]["evaluation"]>

  export type EvaluationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    patientId?: boolean
    collaboratorId?: boolean
    done?: boolean
    clinicId?: boolean
    clinicalData?: boolean
    continuousData?: boolean
    diagnosis?: boolean
    treatment?: boolean
    followUp?: boolean
    nextAppointment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
    clinic?: boolean | Evaluation$clinicArgs<ExtArgs>
  }, ExtArgs["result"]["evaluation"]>

  export type EvaluationSelectScalar = {
    id?: boolean
    patientId?: boolean
    collaboratorId?: boolean
    done?: boolean
    clinicId?: boolean
    clinicalData?: boolean
    continuousData?: boolean
    diagnosis?: boolean
    treatment?: boolean
    followUp?: boolean
    nextAppointment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type EvaluationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "patientId" | "collaboratorId" | "done" | "clinicId" | "clinicalData" | "continuousData" | "diagnosis" | "treatment" | "followUp" | "nextAppointment" | "createdAt" | "updatedAt", ExtArgs["result"]["evaluation"]>
  export type EvaluationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eyes?: boolean | Evaluation$eyesArgs<ExtArgs>
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
    clinic?: boolean | Evaluation$clinicArgs<ExtArgs>
  }
  export type EvaluationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
    clinic?: boolean | Evaluation$clinicArgs<ExtArgs>
  }
  export type EvaluationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient?: boolean | PatientDefaultArgs<ExtArgs>
    collaborator?: boolean | CollaboratorDefaultArgs<ExtArgs>
    clinic?: boolean | Evaluation$clinicArgs<ExtArgs>
  }

  export type $EvaluationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Evaluation"
    objects: {
      eyes: Prisma.$EyesPayload<ExtArgs> | null
      patient: Prisma.$PatientPayload<ExtArgs>
      collaborator: Prisma.$CollaboratorPayload<ExtArgs>
      clinic: Prisma.$ClinicPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      patientId: string
      collaboratorId: string
      done: boolean
      clinicId: string | null
      clinicalData: string | null
      continuousData: string | null
      diagnosis: string | null
      treatment: string | null
      followUp: string | null
      nextAppointment: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["evaluation"]>
    composites: {}
  }

  type EvaluationGetPayload<S extends boolean | null | undefined | EvaluationDefaultArgs> = $Result.GetResult<Prisma.$EvaluationPayload, S>

  type EvaluationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationCountAggregateInputType | true
    }

  export interface EvaluationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Evaluation'], meta: { name: 'Evaluation' } }
    /**
     * Find zero or one Evaluation that matches the filter.
     * @param {EvaluationFindUniqueArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationFindUniqueArgs>(args: SelectSubset<T, EvaluationFindUniqueArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Evaluation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationFindUniqueOrThrowArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindFirstArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationFindFirstArgs>(args?: SelectSubset<T, EvaluationFindFirstArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindFirstOrThrowArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Evaluations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evaluations
     * const evaluations = await prisma.evaluation.findMany()
     * 
     * // Get first 10 Evaluations
     * const evaluations = await prisma.evaluation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationWithIdOnly = await prisma.evaluation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationFindManyArgs>(args?: SelectSubset<T, EvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Evaluation.
     * @param {EvaluationCreateArgs} args - Arguments to create a Evaluation.
     * @example
     * // Create one Evaluation
     * const Evaluation = await prisma.evaluation.create({
     *   data: {
     *     // ... data to create a Evaluation
     *   }
     * })
     * 
     */
    create<T extends EvaluationCreateArgs>(args: SelectSubset<T, EvaluationCreateArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Evaluations.
     * @param {EvaluationCreateManyArgs} args - Arguments to create many Evaluations.
     * @example
     * // Create many Evaluations
     * const evaluation = await prisma.evaluation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationCreateManyArgs>(args?: SelectSubset<T, EvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Evaluations and returns the data saved in the database.
     * @param {EvaluationCreateManyAndReturnArgs} args - Arguments to create many Evaluations.
     * @example
     * // Create many Evaluations
     * const evaluation = await prisma.evaluation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Evaluations and only return the `id`
     * const evaluationWithIdOnly = await prisma.evaluation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EvaluationCreateManyAndReturnArgs>(args?: SelectSubset<T, EvaluationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Evaluation.
     * @param {EvaluationDeleteArgs} args - Arguments to delete one Evaluation.
     * @example
     * // Delete one Evaluation
     * const Evaluation = await prisma.evaluation.delete({
     *   where: {
     *     // ... filter to delete one Evaluation
     *   }
     * })
     * 
     */
    delete<T extends EvaluationDeleteArgs>(args: SelectSubset<T, EvaluationDeleteArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Evaluation.
     * @param {EvaluationUpdateArgs} args - Arguments to update one Evaluation.
     * @example
     * // Update one Evaluation
     * const evaluation = await prisma.evaluation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationUpdateArgs>(args: SelectSubset<T, EvaluationUpdateArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Evaluations.
     * @param {EvaluationDeleteManyArgs} args - Arguments to filter Evaluations to delete.
     * @example
     * // Delete a few Evaluations
     * const { count } = await prisma.evaluation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationDeleteManyArgs>(args?: SelectSubset<T, EvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evaluations
     * const evaluation = await prisma.evaluation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationUpdateManyArgs>(args: SelectSubset<T, EvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluations and returns the data updated in the database.
     * @param {EvaluationUpdateManyAndReturnArgs} args - Arguments to update many Evaluations.
     * @example
     * // Update many Evaluations
     * const evaluation = await prisma.evaluation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Evaluations and only return the `id`
     * const evaluationWithIdOnly = await prisma.evaluation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EvaluationUpdateManyAndReturnArgs>(args: SelectSubset<T, EvaluationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Evaluation.
     * @param {EvaluationUpsertArgs} args - Arguments to update or create a Evaluation.
     * @example
     * // Update or create a Evaluation
     * const evaluation = await prisma.evaluation.upsert({
     *   create: {
     *     // ... data to create a Evaluation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evaluation we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationUpsertArgs>(args: SelectSubset<T, EvaluationUpsertArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Evaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCountArgs} args - Arguments to filter Evaluations to count.
     * @example
     * // Count the number of Evaluations
     * const count = await prisma.evaluation.count({
     *   where: {
     *     // ... the filter for the Evaluations we want to count
     *   }
     * })
    **/
    count<T extends EvaluationCountArgs>(
      args?: Subset<T, EvaluationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Evaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvaluationAggregateArgs>(args: Subset<T, EvaluationAggregateArgs>): Prisma.PrismaPromise<GetEvaluationAggregateType<T>>

    /**
     * Group by Evaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvaluationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Evaluation model
   */
  readonly fields: EvaluationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evaluation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eyes<T extends Evaluation$eyesArgs<ExtArgs> = {}>(args?: Subset<T, Evaluation$eyesArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    patient<T extends PatientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PatientDefaultArgs<ExtArgs>>): Prisma__PatientClient<$Result.GetResult<Prisma.$PatientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    collaborator<T extends CollaboratorDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CollaboratorDefaultArgs<ExtArgs>>): Prisma__CollaboratorClient<$Result.GetResult<Prisma.$CollaboratorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clinic<T extends Evaluation$clinicArgs<ExtArgs> = {}>(args?: Subset<T, Evaluation$clinicArgs<ExtArgs>>): Prisma__ClinicClient<$Result.GetResult<Prisma.$ClinicPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Evaluation model
   */
  interface EvaluationFieldRefs {
    readonly id: FieldRef<"Evaluation", 'String'>
    readonly patientId: FieldRef<"Evaluation", 'String'>
    readonly collaboratorId: FieldRef<"Evaluation", 'String'>
    readonly done: FieldRef<"Evaluation", 'Boolean'>
    readonly clinicId: FieldRef<"Evaluation", 'String'>
    readonly clinicalData: FieldRef<"Evaluation", 'String'>
    readonly continuousData: FieldRef<"Evaluation", 'String'>
    readonly diagnosis: FieldRef<"Evaluation", 'String'>
    readonly treatment: FieldRef<"Evaluation", 'String'>
    readonly followUp: FieldRef<"Evaluation", 'String'>
    readonly nextAppointment: FieldRef<"Evaluation", 'String'>
    readonly createdAt: FieldRef<"Evaluation", 'DateTime'>
    readonly updatedAt: FieldRef<"Evaluation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Evaluation findUnique
   */
  export type EvaluationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation findUniqueOrThrow
   */
  export type EvaluationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation findFirst
   */
  export type EvaluationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluations.
     */
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation findFirstOrThrow
   */
  export type EvaluationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluations.
     */
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation findMany
   */
  export type EvaluationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluations to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation create
   */
  export type EvaluationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The data needed to create a Evaluation.
     */
    data: XOR<EvaluationCreateInput, EvaluationUncheckedCreateInput>
  }

  /**
   * Evaluation createMany
   */
  export type EvaluationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Evaluations.
     */
    data: EvaluationCreateManyInput | EvaluationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Evaluation createManyAndReturn
   */
  export type EvaluationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * The data used to create many Evaluations.
     */
    data: EvaluationCreateManyInput | EvaluationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Evaluation update
   */
  export type EvaluationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The data needed to update a Evaluation.
     */
    data: XOR<EvaluationUpdateInput, EvaluationUncheckedUpdateInput>
    /**
     * Choose, which Evaluation to update.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation updateMany
   */
  export type EvaluationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Evaluations.
     */
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyInput>
    /**
     * Filter which Evaluations to update
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to update.
     */
    limit?: number
  }

  /**
   * Evaluation updateManyAndReturn
   */
  export type EvaluationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * The data used to update Evaluations.
     */
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyInput>
    /**
     * Filter which Evaluations to update
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Evaluation upsert
   */
  export type EvaluationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The filter to search for the Evaluation to update in case it exists.
     */
    where: EvaluationWhereUniqueInput
    /**
     * In case the Evaluation found by the `where` argument doesn't exist, create a new Evaluation with this data.
     */
    create: XOR<EvaluationCreateInput, EvaluationUncheckedCreateInput>
    /**
     * In case the Evaluation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationUpdateInput, EvaluationUncheckedUpdateInput>
  }

  /**
   * Evaluation delete
   */
  export type EvaluationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter which Evaluation to delete.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation deleteMany
   */
  export type EvaluationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluations to delete
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to delete.
     */
    limit?: number
  }

  /**
   * Evaluation.eyes
   */
  export type Evaluation$eyesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    where?: EyesWhereInput
  }

  /**
   * Evaluation.clinic
   */
  export type Evaluation$clinicArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clinic
     */
    select?: ClinicSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clinic
     */
    omit?: ClinicOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClinicInclude<ExtArgs> | null
    where?: ClinicWhereInput
  }

  /**
   * Evaluation without action
   */
  export type EvaluationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
  }


  /**
   * Model Eyes
   */

  export type AggregateEyes = {
    _count: EyesCountAggregateOutputType | null
    _min: EyesMinAggregateOutputType | null
    _max: EyesMaxAggregateOutputType | null
  }

  export type EyesMinAggregateOutputType = {
    id: string | null
    evaluationId: string | null
    rightEyeId: string | null
    leftEyeId: string | null
  }

  export type EyesMaxAggregateOutputType = {
    id: string | null
    evaluationId: string | null
    rightEyeId: string | null
    leftEyeId: string | null
  }

  export type EyesCountAggregateOutputType = {
    id: number
    evaluationId: number
    rightEyeId: number
    leftEyeId: number
    _all: number
  }


  export type EyesMinAggregateInputType = {
    id?: true
    evaluationId?: true
    rightEyeId?: true
    leftEyeId?: true
  }

  export type EyesMaxAggregateInputType = {
    id?: true
    evaluationId?: true
    rightEyeId?: true
    leftEyeId?: true
  }

  export type EyesCountAggregateInputType = {
    id?: true
    evaluationId?: true
    rightEyeId?: true
    leftEyeId?: true
    _all?: true
  }

  export type EyesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eyes to aggregate.
     */
    where?: EyesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyesOrderByWithRelationInput | EyesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EyesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Eyes
    **/
    _count?: true | EyesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EyesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EyesMaxAggregateInputType
  }

  export type GetEyesAggregateType<T extends EyesAggregateArgs> = {
        [P in keyof T & keyof AggregateEyes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEyes[P]>
      : GetScalarType<T[P], AggregateEyes[P]>
  }




  export type EyesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyesWhereInput
    orderBy?: EyesOrderByWithAggregationInput | EyesOrderByWithAggregationInput[]
    by: EyesScalarFieldEnum[] | EyesScalarFieldEnum
    having?: EyesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EyesCountAggregateInputType | true
    _min?: EyesMinAggregateInputType
    _max?: EyesMaxAggregateInputType
  }

  export type EyesGroupByOutputType = {
    id: string
    evaluationId: string
    rightEyeId: string
    leftEyeId: string
    _count: EyesCountAggregateOutputType | null
    _min: EyesMinAggregateOutputType | null
    _max: EyesMaxAggregateOutputType | null
  }

  type GetEyesGroupByPayload<T extends EyesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EyesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EyesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EyesGroupByOutputType[P]>
            : GetScalarType<T[P], EyesGroupByOutputType[P]>
        }
      >
    >


  export type EyesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evaluationId?: boolean
    rightEyeId?: boolean
    leftEyeId?: boolean
    rightEye?: boolean | EyeDefaultArgs<ExtArgs>
    leftEye?: boolean | EyeDefaultArgs<ExtArgs>
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyes"]>

  export type EyesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evaluationId?: boolean
    rightEyeId?: boolean
    leftEyeId?: boolean
    rightEye?: boolean | EyeDefaultArgs<ExtArgs>
    leftEye?: boolean | EyeDefaultArgs<ExtArgs>
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyes"]>

  export type EyesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evaluationId?: boolean
    rightEyeId?: boolean
    leftEyeId?: boolean
    rightEye?: boolean | EyeDefaultArgs<ExtArgs>
    leftEye?: boolean | EyeDefaultArgs<ExtArgs>
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyes"]>

  export type EyesSelectScalar = {
    id?: boolean
    evaluationId?: boolean
    rightEyeId?: boolean
    leftEyeId?: boolean
  }

  export type EyesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "evaluationId" | "rightEyeId" | "leftEyeId", ExtArgs["result"]["eyes"]>
  export type EyesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rightEye?: boolean | EyeDefaultArgs<ExtArgs>
    leftEye?: boolean | EyeDefaultArgs<ExtArgs>
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }
  export type EyesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rightEye?: boolean | EyeDefaultArgs<ExtArgs>
    leftEye?: boolean | EyeDefaultArgs<ExtArgs>
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }
  export type EyesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rightEye?: boolean | EyeDefaultArgs<ExtArgs>
    leftEye?: boolean | EyeDefaultArgs<ExtArgs>
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
  }

  export type $EyesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Eyes"
    objects: {
      rightEye: Prisma.$EyePayload<ExtArgs>
      leftEye: Prisma.$EyePayload<ExtArgs>
      evaluation: Prisma.$EvaluationPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      evaluationId: string
      rightEyeId: string
      leftEyeId: string
    }, ExtArgs["result"]["eyes"]>
    composites: {}
  }

  type EyesGetPayload<S extends boolean | null | undefined | EyesDefaultArgs> = $Result.GetResult<Prisma.$EyesPayload, S>

  type EyesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EyesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EyesCountAggregateInputType | true
    }

  export interface EyesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Eyes'], meta: { name: 'Eyes' } }
    /**
     * Find zero or one Eyes that matches the filter.
     * @param {EyesFindUniqueArgs} args - Arguments to find a Eyes
     * @example
     * // Get one Eyes
     * const eyes = await prisma.eyes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EyesFindUniqueArgs>(args: SelectSubset<T, EyesFindUniqueArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Eyes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EyesFindUniqueOrThrowArgs} args - Arguments to find a Eyes
     * @example
     * // Get one Eyes
     * const eyes = await prisma.eyes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EyesFindUniqueOrThrowArgs>(args: SelectSubset<T, EyesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eyes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyesFindFirstArgs} args - Arguments to find a Eyes
     * @example
     * // Get one Eyes
     * const eyes = await prisma.eyes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EyesFindFirstArgs>(args?: SelectSubset<T, EyesFindFirstArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eyes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyesFindFirstOrThrowArgs} args - Arguments to find a Eyes
     * @example
     * // Get one Eyes
     * const eyes = await prisma.eyes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EyesFindFirstOrThrowArgs>(args?: SelectSubset<T, EyesFindFirstOrThrowArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Eyes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eyes
     * const eyes = await prisma.eyes.findMany()
     * 
     * // Get first 10 Eyes
     * const eyes = await prisma.eyes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eyesWithIdOnly = await prisma.eyes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EyesFindManyArgs>(args?: SelectSubset<T, EyesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Eyes.
     * @param {EyesCreateArgs} args - Arguments to create a Eyes.
     * @example
     * // Create one Eyes
     * const Eyes = await prisma.eyes.create({
     *   data: {
     *     // ... data to create a Eyes
     *   }
     * })
     * 
     */
    create<T extends EyesCreateArgs>(args: SelectSubset<T, EyesCreateArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Eyes.
     * @param {EyesCreateManyArgs} args - Arguments to create many Eyes.
     * @example
     * // Create many Eyes
     * const eyes = await prisma.eyes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EyesCreateManyArgs>(args?: SelectSubset<T, EyesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Eyes and returns the data saved in the database.
     * @param {EyesCreateManyAndReturnArgs} args - Arguments to create many Eyes.
     * @example
     * // Create many Eyes
     * const eyes = await prisma.eyes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Eyes and only return the `id`
     * const eyesWithIdOnly = await prisma.eyes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EyesCreateManyAndReturnArgs>(args?: SelectSubset<T, EyesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Eyes.
     * @param {EyesDeleteArgs} args - Arguments to delete one Eyes.
     * @example
     * // Delete one Eyes
     * const Eyes = await prisma.eyes.delete({
     *   where: {
     *     // ... filter to delete one Eyes
     *   }
     * })
     * 
     */
    delete<T extends EyesDeleteArgs>(args: SelectSubset<T, EyesDeleteArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Eyes.
     * @param {EyesUpdateArgs} args - Arguments to update one Eyes.
     * @example
     * // Update one Eyes
     * const eyes = await prisma.eyes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EyesUpdateArgs>(args: SelectSubset<T, EyesUpdateArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Eyes.
     * @param {EyesDeleteManyArgs} args - Arguments to filter Eyes to delete.
     * @example
     * // Delete a few Eyes
     * const { count } = await prisma.eyes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EyesDeleteManyArgs>(args?: SelectSubset<T, EyesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eyes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eyes
     * const eyes = await prisma.eyes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EyesUpdateManyArgs>(args: SelectSubset<T, EyesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eyes and returns the data updated in the database.
     * @param {EyesUpdateManyAndReturnArgs} args - Arguments to update many Eyes.
     * @example
     * // Update many Eyes
     * const eyes = await prisma.eyes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Eyes and only return the `id`
     * const eyesWithIdOnly = await prisma.eyes.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EyesUpdateManyAndReturnArgs>(args: SelectSubset<T, EyesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Eyes.
     * @param {EyesUpsertArgs} args - Arguments to update or create a Eyes.
     * @example
     * // Update or create a Eyes
     * const eyes = await prisma.eyes.upsert({
     *   create: {
     *     // ... data to create a Eyes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eyes we want to update
     *   }
     * })
     */
    upsert<T extends EyesUpsertArgs>(args: SelectSubset<T, EyesUpsertArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Eyes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyesCountArgs} args - Arguments to filter Eyes to count.
     * @example
     * // Count the number of Eyes
     * const count = await prisma.eyes.count({
     *   where: {
     *     // ... the filter for the Eyes we want to count
     *   }
     * })
    **/
    count<T extends EyesCountArgs>(
      args?: Subset<T, EyesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EyesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Eyes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EyesAggregateArgs>(args: Subset<T, EyesAggregateArgs>): Prisma.PrismaPromise<GetEyesAggregateType<T>>

    /**
     * Group by Eyes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EyesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EyesGroupByArgs['orderBy'] }
        : { orderBy?: EyesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EyesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEyesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Eyes model
   */
  readonly fields: EyesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Eyes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EyesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rightEye<T extends EyeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EyeDefaultArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    leftEye<T extends EyeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EyeDefaultArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    evaluation<T extends EvaluationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvaluationDefaultArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Eyes model
   */
  interface EyesFieldRefs {
    readonly id: FieldRef<"Eyes", 'String'>
    readonly evaluationId: FieldRef<"Eyes", 'String'>
    readonly rightEyeId: FieldRef<"Eyes", 'String'>
    readonly leftEyeId: FieldRef<"Eyes", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Eyes findUnique
   */
  export type EyesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * Filter, which Eyes to fetch.
     */
    where: EyesWhereUniqueInput
  }

  /**
   * Eyes findUniqueOrThrow
   */
  export type EyesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * Filter, which Eyes to fetch.
     */
    where: EyesWhereUniqueInput
  }

  /**
   * Eyes findFirst
   */
  export type EyesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * Filter, which Eyes to fetch.
     */
    where?: EyesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyesOrderByWithRelationInput | EyesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eyes.
     */
    cursor?: EyesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eyes.
     */
    distinct?: EyesScalarFieldEnum | EyesScalarFieldEnum[]
  }

  /**
   * Eyes findFirstOrThrow
   */
  export type EyesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * Filter, which Eyes to fetch.
     */
    where?: EyesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyesOrderByWithRelationInput | EyesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eyes.
     */
    cursor?: EyesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eyes.
     */
    distinct?: EyesScalarFieldEnum | EyesScalarFieldEnum[]
  }

  /**
   * Eyes findMany
   */
  export type EyesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * Filter, which Eyes to fetch.
     */
    where?: EyesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyesOrderByWithRelationInput | EyesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Eyes.
     */
    cursor?: EyesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    distinct?: EyesScalarFieldEnum | EyesScalarFieldEnum[]
  }

  /**
   * Eyes create
   */
  export type EyesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * The data needed to create a Eyes.
     */
    data: XOR<EyesCreateInput, EyesUncheckedCreateInput>
  }

  /**
   * Eyes createMany
   */
  export type EyesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Eyes.
     */
    data: EyesCreateManyInput | EyesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Eyes createManyAndReturn
   */
  export type EyesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * The data used to create many Eyes.
     */
    data: EyesCreateManyInput | EyesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Eyes update
   */
  export type EyesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * The data needed to update a Eyes.
     */
    data: XOR<EyesUpdateInput, EyesUncheckedUpdateInput>
    /**
     * Choose, which Eyes to update.
     */
    where: EyesWhereUniqueInput
  }

  /**
   * Eyes updateMany
   */
  export type EyesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Eyes.
     */
    data: XOR<EyesUpdateManyMutationInput, EyesUncheckedUpdateManyInput>
    /**
     * Filter which Eyes to update
     */
    where?: EyesWhereInput
    /**
     * Limit how many Eyes to update.
     */
    limit?: number
  }

  /**
   * Eyes updateManyAndReturn
   */
  export type EyesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * The data used to update Eyes.
     */
    data: XOR<EyesUpdateManyMutationInput, EyesUncheckedUpdateManyInput>
    /**
     * Filter which Eyes to update
     */
    where?: EyesWhereInput
    /**
     * Limit how many Eyes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Eyes upsert
   */
  export type EyesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * The filter to search for the Eyes to update in case it exists.
     */
    where: EyesWhereUniqueInput
    /**
     * In case the Eyes found by the `where` argument doesn't exist, create a new Eyes with this data.
     */
    create: XOR<EyesCreateInput, EyesUncheckedCreateInput>
    /**
     * In case the Eyes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EyesUpdateInput, EyesUncheckedUpdateInput>
  }

  /**
   * Eyes delete
   */
  export type EyesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    /**
     * Filter which Eyes to delete.
     */
    where: EyesWhereUniqueInput
  }

  /**
   * Eyes deleteMany
   */
  export type EyesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eyes to delete
     */
    where?: EyesWhereInput
    /**
     * Limit how many Eyes to delete.
     */
    limit?: number
  }

  /**
   * Eyes without action
   */
  export type EyesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
  }


  /**
   * Model Eye
   */

  export type AggregateEye = {
    _count: EyeCountAggregateOutputType | null
    _min: EyeMinAggregateOutputType | null
    _max: EyeMaxAggregateOutputType | null
  }

  export type EyeMinAggregateOutputType = {
    id: string | null
  }

  export type EyeMaxAggregateOutputType = {
    id: string | null
  }

  export type EyeCountAggregateOutputType = {
    id: number
    _all: number
  }


  export type EyeMinAggregateInputType = {
    id?: true
  }

  export type EyeMaxAggregateInputType = {
    id?: true
  }

  export type EyeCountAggregateInputType = {
    id?: true
    _all?: true
  }

  export type EyeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eye to aggregate.
     */
    where?: EyeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyeOrderByWithRelationInput | EyeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EyeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Eyes
    **/
    _count?: true | EyeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EyeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EyeMaxAggregateInputType
  }

  export type GetEyeAggregateType<T extends EyeAggregateArgs> = {
        [P in keyof T & keyof AggregateEye]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEye[P]>
      : GetScalarType<T[P], AggregateEye[P]>
  }




  export type EyeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyeWhereInput
    orderBy?: EyeOrderByWithAggregationInput | EyeOrderByWithAggregationInput[]
    by: EyeScalarFieldEnum[] | EyeScalarFieldEnum
    having?: EyeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EyeCountAggregateInputType | true
    _min?: EyeMinAggregateInputType
    _max?: EyeMaxAggregateInputType
  }

  export type EyeGroupByOutputType = {
    id: string
    _count: EyeCountAggregateOutputType | null
    _min: EyeMinAggregateOutputType | null
    _max: EyeMaxAggregateOutputType | null
  }

  type GetEyeGroupByPayload<T extends EyeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EyeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EyeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EyeGroupByOutputType[P]>
            : GetScalarType<T[P], EyeGroupByOutputType[P]>
        }
      >
    >


  export type EyeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    logs?: boolean | Eye$logsArgs<ExtArgs>
    refraction?: boolean | Eye$refractionArgs<ExtArgs>
    surgeries?: boolean | Eye$surgeriesArgs<ExtArgs>
    eyedrops?: boolean | Eye$eyedropsArgs<ExtArgs>
    rightEye?: boolean | Eye$rightEyeArgs<ExtArgs>
    leftEye?: boolean | Eye$leftEyeArgs<ExtArgs>
    _count?: boolean | EyeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eye"]>

  export type EyeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["eye"]>

  export type EyeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
  }, ExtArgs["result"]["eye"]>

  export type EyeSelectScalar = {
    id?: boolean
  }

  export type EyeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id", ExtArgs["result"]["eye"]>
  export type EyeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | Eye$logsArgs<ExtArgs>
    refraction?: boolean | Eye$refractionArgs<ExtArgs>
    surgeries?: boolean | Eye$surgeriesArgs<ExtArgs>
    eyedrops?: boolean | Eye$eyedropsArgs<ExtArgs>
    rightEye?: boolean | Eye$rightEyeArgs<ExtArgs>
    leftEye?: boolean | Eye$leftEyeArgs<ExtArgs>
    _count?: boolean | EyeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EyeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type EyeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EyePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Eye"
    objects: {
      logs: Prisma.$EyeLogPayload<ExtArgs>[]
      refraction: Prisma.$RefractionPayload<ExtArgs>[]
      surgeries: Prisma.$EyeSurgeryPayload<ExtArgs>[]
      eyedrops: Prisma.$EyedropPayload<ExtArgs>[]
      rightEye: Prisma.$EyesPayload<ExtArgs> | null
      leftEye: Prisma.$EyesPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
    }, ExtArgs["result"]["eye"]>
    composites: {}
  }

  type EyeGetPayload<S extends boolean | null | undefined | EyeDefaultArgs> = $Result.GetResult<Prisma.$EyePayload, S>

  type EyeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EyeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EyeCountAggregateInputType | true
    }

  export interface EyeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Eye'], meta: { name: 'Eye' } }
    /**
     * Find zero or one Eye that matches the filter.
     * @param {EyeFindUniqueArgs} args - Arguments to find a Eye
     * @example
     * // Get one Eye
     * const eye = await prisma.eye.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EyeFindUniqueArgs>(args: SelectSubset<T, EyeFindUniqueArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Eye that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EyeFindUniqueOrThrowArgs} args - Arguments to find a Eye
     * @example
     * // Get one Eye
     * const eye = await prisma.eye.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EyeFindUniqueOrThrowArgs>(args: SelectSubset<T, EyeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eye that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeFindFirstArgs} args - Arguments to find a Eye
     * @example
     * // Get one Eye
     * const eye = await prisma.eye.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EyeFindFirstArgs>(args?: SelectSubset<T, EyeFindFirstArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eye that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeFindFirstOrThrowArgs} args - Arguments to find a Eye
     * @example
     * // Get one Eye
     * const eye = await prisma.eye.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EyeFindFirstOrThrowArgs>(args?: SelectSubset<T, EyeFindFirstOrThrowArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Eyes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eyes
     * const eyes = await prisma.eye.findMany()
     * 
     * // Get first 10 Eyes
     * const eyes = await prisma.eye.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eyeWithIdOnly = await prisma.eye.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EyeFindManyArgs>(args?: SelectSubset<T, EyeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Eye.
     * @param {EyeCreateArgs} args - Arguments to create a Eye.
     * @example
     * // Create one Eye
     * const Eye = await prisma.eye.create({
     *   data: {
     *     // ... data to create a Eye
     *   }
     * })
     * 
     */
    create<T extends EyeCreateArgs>(args: SelectSubset<T, EyeCreateArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Eyes.
     * @param {EyeCreateManyArgs} args - Arguments to create many Eyes.
     * @example
     * // Create many Eyes
     * const eye = await prisma.eye.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EyeCreateManyArgs>(args?: SelectSubset<T, EyeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Eyes and returns the data saved in the database.
     * @param {EyeCreateManyAndReturnArgs} args - Arguments to create many Eyes.
     * @example
     * // Create many Eyes
     * const eye = await prisma.eye.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Eyes and only return the `id`
     * const eyeWithIdOnly = await prisma.eye.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EyeCreateManyAndReturnArgs>(args?: SelectSubset<T, EyeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Eye.
     * @param {EyeDeleteArgs} args - Arguments to delete one Eye.
     * @example
     * // Delete one Eye
     * const Eye = await prisma.eye.delete({
     *   where: {
     *     // ... filter to delete one Eye
     *   }
     * })
     * 
     */
    delete<T extends EyeDeleteArgs>(args: SelectSubset<T, EyeDeleteArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Eye.
     * @param {EyeUpdateArgs} args - Arguments to update one Eye.
     * @example
     * // Update one Eye
     * const eye = await prisma.eye.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EyeUpdateArgs>(args: SelectSubset<T, EyeUpdateArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Eyes.
     * @param {EyeDeleteManyArgs} args - Arguments to filter Eyes to delete.
     * @example
     * // Delete a few Eyes
     * const { count } = await prisma.eye.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EyeDeleteManyArgs>(args?: SelectSubset<T, EyeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eyes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eyes
     * const eye = await prisma.eye.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EyeUpdateManyArgs>(args: SelectSubset<T, EyeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eyes and returns the data updated in the database.
     * @param {EyeUpdateManyAndReturnArgs} args - Arguments to update many Eyes.
     * @example
     * // Update many Eyes
     * const eye = await prisma.eye.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Eyes and only return the `id`
     * const eyeWithIdOnly = await prisma.eye.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EyeUpdateManyAndReturnArgs>(args: SelectSubset<T, EyeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Eye.
     * @param {EyeUpsertArgs} args - Arguments to update or create a Eye.
     * @example
     * // Update or create a Eye
     * const eye = await prisma.eye.upsert({
     *   create: {
     *     // ... data to create a Eye
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eye we want to update
     *   }
     * })
     */
    upsert<T extends EyeUpsertArgs>(args: SelectSubset<T, EyeUpsertArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Eyes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeCountArgs} args - Arguments to filter Eyes to count.
     * @example
     * // Count the number of Eyes
     * const count = await prisma.eye.count({
     *   where: {
     *     // ... the filter for the Eyes we want to count
     *   }
     * })
    **/
    count<T extends EyeCountArgs>(
      args?: Subset<T, EyeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EyeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Eye.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EyeAggregateArgs>(args: Subset<T, EyeAggregateArgs>): Prisma.PrismaPromise<GetEyeAggregateType<T>>

    /**
     * Group by Eye.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EyeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EyeGroupByArgs['orderBy'] }
        : { orderBy?: EyeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EyeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEyeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Eye model
   */
  readonly fields: EyeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Eye.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EyeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    logs<T extends Eye$logsArgs<ExtArgs> = {}>(args?: Subset<T, Eye$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refraction<T extends Eye$refractionArgs<ExtArgs> = {}>(args?: Subset<T, Eye$refractionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    surgeries<T extends Eye$surgeriesArgs<ExtArgs> = {}>(args?: Subset<T, Eye$surgeriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    eyedrops<T extends Eye$eyedropsArgs<ExtArgs> = {}>(args?: Subset<T, Eye$eyedropsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rightEye<T extends Eye$rightEyeArgs<ExtArgs> = {}>(args?: Subset<T, Eye$rightEyeArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    leftEye<T extends Eye$leftEyeArgs<ExtArgs> = {}>(args?: Subset<T, Eye$leftEyeArgs<ExtArgs>>): Prisma__EyesClient<$Result.GetResult<Prisma.$EyesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Eye model
   */
  interface EyeFieldRefs {
    readonly id: FieldRef<"Eye", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Eye findUnique
   */
  export type EyeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * Filter, which Eye to fetch.
     */
    where: EyeWhereUniqueInput
  }

  /**
   * Eye findUniqueOrThrow
   */
  export type EyeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * Filter, which Eye to fetch.
     */
    where: EyeWhereUniqueInput
  }

  /**
   * Eye findFirst
   */
  export type EyeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * Filter, which Eye to fetch.
     */
    where?: EyeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyeOrderByWithRelationInput | EyeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eyes.
     */
    cursor?: EyeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eyes.
     */
    distinct?: EyeScalarFieldEnum | EyeScalarFieldEnum[]
  }

  /**
   * Eye findFirstOrThrow
   */
  export type EyeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * Filter, which Eye to fetch.
     */
    where?: EyeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyeOrderByWithRelationInput | EyeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eyes.
     */
    cursor?: EyeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eyes.
     */
    distinct?: EyeScalarFieldEnum | EyeScalarFieldEnum[]
  }

  /**
   * Eye findMany
   */
  export type EyeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * Filter, which Eyes to fetch.
     */
    where?: EyeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyes to fetch.
     */
    orderBy?: EyeOrderByWithRelationInput | EyeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Eyes.
     */
    cursor?: EyeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyes.
     */
    skip?: number
    distinct?: EyeScalarFieldEnum | EyeScalarFieldEnum[]
  }

  /**
   * Eye create
   */
  export type EyeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * The data needed to create a Eye.
     */
    data?: XOR<EyeCreateInput, EyeUncheckedCreateInput>
  }

  /**
   * Eye createMany
   */
  export type EyeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Eyes.
     */
    data: EyeCreateManyInput | EyeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Eye createManyAndReturn
   */
  export type EyeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * The data used to create many Eyes.
     */
    data: EyeCreateManyInput | EyeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Eye update
   */
  export type EyeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * The data needed to update a Eye.
     */
    data: XOR<EyeUpdateInput, EyeUncheckedUpdateInput>
    /**
     * Choose, which Eye to update.
     */
    where: EyeWhereUniqueInput
  }

  /**
   * Eye updateMany
   */
  export type EyeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Eyes.
     */
    data: XOR<EyeUpdateManyMutationInput, EyeUncheckedUpdateManyInput>
    /**
     * Filter which Eyes to update
     */
    where?: EyeWhereInput
    /**
     * Limit how many Eyes to update.
     */
    limit?: number
  }

  /**
   * Eye updateManyAndReturn
   */
  export type EyeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * The data used to update Eyes.
     */
    data: XOR<EyeUpdateManyMutationInput, EyeUncheckedUpdateManyInput>
    /**
     * Filter which Eyes to update
     */
    where?: EyeWhereInput
    /**
     * Limit how many Eyes to update.
     */
    limit?: number
  }

  /**
   * Eye upsert
   */
  export type EyeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * The filter to search for the Eye to update in case it exists.
     */
    where: EyeWhereUniqueInput
    /**
     * In case the Eye found by the `where` argument doesn't exist, create a new Eye with this data.
     */
    create: XOR<EyeCreateInput, EyeUncheckedCreateInput>
    /**
     * In case the Eye was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EyeUpdateInput, EyeUncheckedUpdateInput>
  }

  /**
   * Eye delete
   */
  export type EyeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
    /**
     * Filter which Eye to delete.
     */
    where: EyeWhereUniqueInput
  }

  /**
   * Eye deleteMany
   */
  export type EyeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eyes to delete
     */
    where?: EyeWhereInput
    /**
     * Limit how many Eyes to delete.
     */
    limit?: number
  }

  /**
   * Eye.logs
   */
  export type Eye$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    where?: EyeLogWhereInput
    orderBy?: EyeLogOrderByWithRelationInput | EyeLogOrderByWithRelationInput[]
    cursor?: EyeLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EyeLogScalarFieldEnum | EyeLogScalarFieldEnum[]
  }

  /**
   * Eye.refraction
   */
  export type Eye$refractionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    where?: RefractionWhereInput
    orderBy?: RefractionOrderByWithRelationInput | RefractionOrderByWithRelationInput[]
    cursor?: RefractionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefractionScalarFieldEnum | RefractionScalarFieldEnum[]
  }

  /**
   * Eye.surgeries
   */
  export type Eye$surgeriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    where?: EyeSurgeryWhereInput
    orderBy?: EyeSurgeryOrderByWithRelationInput | EyeSurgeryOrderByWithRelationInput[]
    cursor?: EyeSurgeryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EyeSurgeryScalarFieldEnum | EyeSurgeryScalarFieldEnum[]
  }

  /**
   * Eye.eyedrops
   */
  export type Eye$eyedropsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    where?: EyedropWhereInput
    orderBy?: EyedropOrderByWithRelationInput | EyedropOrderByWithRelationInput[]
    cursor?: EyedropWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EyedropScalarFieldEnum | EyedropScalarFieldEnum[]
  }

  /**
   * Eye.rightEye
   */
  export type Eye$rightEyeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    where?: EyesWhereInput
  }

  /**
   * Eye.leftEye
   */
  export type Eye$leftEyeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyes
     */
    select?: EyesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyes
     */
    omit?: EyesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyesInclude<ExtArgs> | null
    where?: EyesWhereInput
  }

  /**
   * Eye without action
   */
  export type EyeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eye
     */
    select?: EyeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eye
     */
    omit?: EyeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeInclude<ExtArgs> | null
  }


  /**
   * Model EyeLog
   */

  export type AggregateEyeLog = {
    _count: EyeLogCountAggregateOutputType | null
    _min: EyeLogMinAggregateOutputType | null
    _max: EyeLogMaxAggregateOutputType | null
  }

  export type EyeLogMinAggregateOutputType = {
    id: string | null
    type: $Enums.EyeLogType | null
    eyeId: string | null
    details: string | null
    recordedAt: Date | null
  }

  export type EyeLogMaxAggregateOutputType = {
    id: string | null
    type: $Enums.EyeLogType | null
    eyeId: string | null
    details: string | null
    recordedAt: Date | null
  }

  export type EyeLogCountAggregateOutputType = {
    id: number
    type: number
    eyeId: number
    details: number
    recordedAt: number
    _all: number
  }


  export type EyeLogMinAggregateInputType = {
    id?: true
    type?: true
    eyeId?: true
    details?: true
    recordedAt?: true
  }

  export type EyeLogMaxAggregateInputType = {
    id?: true
    type?: true
    eyeId?: true
    details?: true
    recordedAt?: true
  }

  export type EyeLogCountAggregateInputType = {
    id?: true
    type?: true
    eyeId?: true
    details?: true
    recordedAt?: true
    _all?: true
  }

  export type EyeLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EyeLog to aggregate.
     */
    where?: EyeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeLogs to fetch.
     */
    orderBy?: EyeLogOrderByWithRelationInput | EyeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EyeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EyeLogs
    **/
    _count?: true | EyeLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EyeLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EyeLogMaxAggregateInputType
  }

  export type GetEyeLogAggregateType<T extends EyeLogAggregateArgs> = {
        [P in keyof T & keyof AggregateEyeLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEyeLog[P]>
      : GetScalarType<T[P], AggregateEyeLog[P]>
  }




  export type EyeLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyeLogWhereInput
    orderBy?: EyeLogOrderByWithAggregationInput | EyeLogOrderByWithAggregationInput[]
    by: EyeLogScalarFieldEnum[] | EyeLogScalarFieldEnum
    having?: EyeLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EyeLogCountAggregateInputType | true
    _min?: EyeLogMinAggregateInputType
    _max?: EyeLogMaxAggregateInputType
  }

  export type EyeLogGroupByOutputType = {
    id: string
    type: $Enums.EyeLogType
    eyeId: string
    details: string | null
    recordedAt: Date
    _count: EyeLogCountAggregateOutputType | null
    _min: EyeLogMinAggregateOutputType | null
    _max: EyeLogMaxAggregateOutputType | null
  }

  type GetEyeLogGroupByPayload<T extends EyeLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EyeLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EyeLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EyeLogGroupByOutputType[P]>
            : GetScalarType<T[P], EyeLogGroupByOutputType[P]>
        }
      >
    >


  export type EyeLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    eyeId?: boolean
    details?: boolean
    recordedAt?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyeLog"]>

  export type EyeLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    eyeId?: boolean
    details?: boolean
    recordedAt?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyeLog"]>

  export type EyeLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    eyeId?: boolean
    details?: boolean
    recordedAt?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyeLog"]>

  export type EyeLogSelectScalar = {
    id?: boolean
    type?: boolean
    eyeId?: boolean
    details?: boolean
    recordedAt?: boolean
  }

  export type EyeLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "eyeId" | "details" | "recordedAt", ExtArgs["result"]["eyeLog"]>
  export type EyeLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type EyeLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type EyeLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }

  export type $EyeLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EyeLog"
    objects: {
      eye: Prisma.$EyePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.EyeLogType
      eyeId: string
      details: string | null
      recordedAt: Date
    }, ExtArgs["result"]["eyeLog"]>
    composites: {}
  }

  type EyeLogGetPayload<S extends boolean | null | undefined | EyeLogDefaultArgs> = $Result.GetResult<Prisma.$EyeLogPayload, S>

  type EyeLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EyeLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EyeLogCountAggregateInputType | true
    }

  export interface EyeLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EyeLog'], meta: { name: 'EyeLog' } }
    /**
     * Find zero or one EyeLog that matches the filter.
     * @param {EyeLogFindUniqueArgs} args - Arguments to find a EyeLog
     * @example
     * // Get one EyeLog
     * const eyeLog = await prisma.eyeLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EyeLogFindUniqueArgs>(args: SelectSubset<T, EyeLogFindUniqueArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EyeLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EyeLogFindUniqueOrThrowArgs} args - Arguments to find a EyeLog
     * @example
     * // Get one EyeLog
     * const eyeLog = await prisma.eyeLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EyeLogFindUniqueOrThrowArgs>(args: SelectSubset<T, EyeLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EyeLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeLogFindFirstArgs} args - Arguments to find a EyeLog
     * @example
     * // Get one EyeLog
     * const eyeLog = await prisma.eyeLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EyeLogFindFirstArgs>(args?: SelectSubset<T, EyeLogFindFirstArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EyeLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeLogFindFirstOrThrowArgs} args - Arguments to find a EyeLog
     * @example
     * // Get one EyeLog
     * const eyeLog = await prisma.eyeLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EyeLogFindFirstOrThrowArgs>(args?: SelectSubset<T, EyeLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EyeLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EyeLogs
     * const eyeLogs = await prisma.eyeLog.findMany()
     * 
     * // Get first 10 EyeLogs
     * const eyeLogs = await prisma.eyeLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eyeLogWithIdOnly = await prisma.eyeLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EyeLogFindManyArgs>(args?: SelectSubset<T, EyeLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EyeLog.
     * @param {EyeLogCreateArgs} args - Arguments to create a EyeLog.
     * @example
     * // Create one EyeLog
     * const EyeLog = await prisma.eyeLog.create({
     *   data: {
     *     // ... data to create a EyeLog
     *   }
     * })
     * 
     */
    create<T extends EyeLogCreateArgs>(args: SelectSubset<T, EyeLogCreateArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EyeLogs.
     * @param {EyeLogCreateManyArgs} args - Arguments to create many EyeLogs.
     * @example
     * // Create many EyeLogs
     * const eyeLog = await prisma.eyeLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EyeLogCreateManyArgs>(args?: SelectSubset<T, EyeLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EyeLogs and returns the data saved in the database.
     * @param {EyeLogCreateManyAndReturnArgs} args - Arguments to create many EyeLogs.
     * @example
     * // Create many EyeLogs
     * const eyeLog = await prisma.eyeLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EyeLogs and only return the `id`
     * const eyeLogWithIdOnly = await prisma.eyeLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EyeLogCreateManyAndReturnArgs>(args?: SelectSubset<T, EyeLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EyeLog.
     * @param {EyeLogDeleteArgs} args - Arguments to delete one EyeLog.
     * @example
     * // Delete one EyeLog
     * const EyeLog = await prisma.eyeLog.delete({
     *   where: {
     *     // ... filter to delete one EyeLog
     *   }
     * })
     * 
     */
    delete<T extends EyeLogDeleteArgs>(args: SelectSubset<T, EyeLogDeleteArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EyeLog.
     * @param {EyeLogUpdateArgs} args - Arguments to update one EyeLog.
     * @example
     * // Update one EyeLog
     * const eyeLog = await prisma.eyeLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EyeLogUpdateArgs>(args: SelectSubset<T, EyeLogUpdateArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EyeLogs.
     * @param {EyeLogDeleteManyArgs} args - Arguments to filter EyeLogs to delete.
     * @example
     * // Delete a few EyeLogs
     * const { count } = await prisma.eyeLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EyeLogDeleteManyArgs>(args?: SelectSubset<T, EyeLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EyeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EyeLogs
     * const eyeLog = await prisma.eyeLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EyeLogUpdateManyArgs>(args: SelectSubset<T, EyeLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EyeLogs and returns the data updated in the database.
     * @param {EyeLogUpdateManyAndReturnArgs} args - Arguments to update many EyeLogs.
     * @example
     * // Update many EyeLogs
     * const eyeLog = await prisma.eyeLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EyeLogs and only return the `id`
     * const eyeLogWithIdOnly = await prisma.eyeLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EyeLogUpdateManyAndReturnArgs>(args: SelectSubset<T, EyeLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EyeLog.
     * @param {EyeLogUpsertArgs} args - Arguments to update or create a EyeLog.
     * @example
     * // Update or create a EyeLog
     * const eyeLog = await prisma.eyeLog.upsert({
     *   create: {
     *     // ... data to create a EyeLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EyeLog we want to update
     *   }
     * })
     */
    upsert<T extends EyeLogUpsertArgs>(args: SelectSubset<T, EyeLogUpsertArgs<ExtArgs>>): Prisma__EyeLogClient<$Result.GetResult<Prisma.$EyeLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EyeLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeLogCountArgs} args - Arguments to filter EyeLogs to count.
     * @example
     * // Count the number of EyeLogs
     * const count = await prisma.eyeLog.count({
     *   where: {
     *     // ... the filter for the EyeLogs we want to count
     *   }
     * })
    **/
    count<T extends EyeLogCountArgs>(
      args?: Subset<T, EyeLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EyeLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EyeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EyeLogAggregateArgs>(args: Subset<T, EyeLogAggregateArgs>): Prisma.PrismaPromise<GetEyeLogAggregateType<T>>

    /**
     * Group by EyeLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EyeLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EyeLogGroupByArgs['orderBy'] }
        : { orderBy?: EyeLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EyeLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEyeLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EyeLog model
   */
  readonly fields: EyeLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EyeLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EyeLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eye<T extends EyeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EyeDefaultArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EyeLog model
   */
  interface EyeLogFieldRefs {
    readonly id: FieldRef<"EyeLog", 'String'>
    readonly type: FieldRef<"EyeLog", 'EyeLogType'>
    readonly eyeId: FieldRef<"EyeLog", 'String'>
    readonly details: FieldRef<"EyeLog", 'String'>
    readonly recordedAt: FieldRef<"EyeLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * EyeLog findUnique
   */
  export type EyeLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * Filter, which EyeLog to fetch.
     */
    where: EyeLogWhereUniqueInput
  }

  /**
   * EyeLog findUniqueOrThrow
   */
  export type EyeLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * Filter, which EyeLog to fetch.
     */
    where: EyeLogWhereUniqueInput
  }

  /**
   * EyeLog findFirst
   */
  export type EyeLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * Filter, which EyeLog to fetch.
     */
    where?: EyeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeLogs to fetch.
     */
    orderBy?: EyeLogOrderByWithRelationInput | EyeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EyeLogs.
     */
    cursor?: EyeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EyeLogs.
     */
    distinct?: EyeLogScalarFieldEnum | EyeLogScalarFieldEnum[]
  }

  /**
   * EyeLog findFirstOrThrow
   */
  export type EyeLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * Filter, which EyeLog to fetch.
     */
    where?: EyeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeLogs to fetch.
     */
    orderBy?: EyeLogOrderByWithRelationInput | EyeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EyeLogs.
     */
    cursor?: EyeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EyeLogs.
     */
    distinct?: EyeLogScalarFieldEnum | EyeLogScalarFieldEnum[]
  }

  /**
   * EyeLog findMany
   */
  export type EyeLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * Filter, which EyeLogs to fetch.
     */
    where?: EyeLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeLogs to fetch.
     */
    orderBy?: EyeLogOrderByWithRelationInput | EyeLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EyeLogs.
     */
    cursor?: EyeLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeLogs.
     */
    skip?: number
    distinct?: EyeLogScalarFieldEnum | EyeLogScalarFieldEnum[]
  }

  /**
   * EyeLog create
   */
  export type EyeLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * The data needed to create a EyeLog.
     */
    data: XOR<EyeLogCreateInput, EyeLogUncheckedCreateInput>
  }

  /**
   * EyeLog createMany
   */
  export type EyeLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EyeLogs.
     */
    data: EyeLogCreateManyInput | EyeLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EyeLog createManyAndReturn
   */
  export type EyeLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * The data used to create many EyeLogs.
     */
    data: EyeLogCreateManyInput | EyeLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EyeLog update
   */
  export type EyeLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * The data needed to update a EyeLog.
     */
    data: XOR<EyeLogUpdateInput, EyeLogUncheckedUpdateInput>
    /**
     * Choose, which EyeLog to update.
     */
    where: EyeLogWhereUniqueInput
  }

  /**
   * EyeLog updateMany
   */
  export type EyeLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EyeLogs.
     */
    data: XOR<EyeLogUpdateManyMutationInput, EyeLogUncheckedUpdateManyInput>
    /**
     * Filter which EyeLogs to update
     */
    where?: EyeLogWhereInput
    /**
     * Limit how many EyeLogs to update.
     */
    limit?: number
  }

  /**
   * EyeLog updateManyAndReturn
   */
  export type EyeLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * The data used to update EyeLogs.
     */
    data: XOR<EyeLogUpdateManyMutationInput, EyeLogUncheckedUpdateManyInput>
    /**
     * Filter which EyeLogs to update
     */
    where?: EyeLogWhereInput
    /**
     * Limit how many EyeLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EyeLog upsert
   */
  export type EyeLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * The filter to search for the EyeLog to update in case it exists.
     */
    where: EyeLogWhereUniqueInput
    /**
     * In case the EyeLog found by the `where` argument doesn't exist, create a new EyeLog with this data.
     */
    create: XOR<EyeLogCreateInput, EyeLogUncheckedCreateInput>
    /**
     * In case the EyeLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EyeLogUpdateInput, EyeLogUncheckedUpdateInput>
  }

  /**
   * EyeLog delete
   */
  export type EyeLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
    /**
     * Filter which EyeLog to delete.
     */
    where: EyeLogWhereUniqueInput
  }

  /**
   * EyeLog deleteMany
   */
  export type EyeLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EyeLogs to delete
     */
    where?: EyeLogWhereInput
    /**
     * Limit how many EyeLogs to delete.
     */
    limit?: number
  }

  /**
   * EyeLog without action
   */
  export type EyeLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeLog
     */
    select?: EyeLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeLog
     */
    omit?: EyeLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeLogInclude<ExtArgs> | null
  }


  /**
   * Model Refraction
   */

  export type AggregateRefraction = {
    _count: RefractionCountAggregateOutputType | null
    _avg: RefractionAvgAggregateOutputType | null
    _sum: RefractionSumAggregateOutputType | null
    _min: RefractionMinAggregateOutputType | null
    _max: RefractionMaxAggregateOutputType | null
  }

  export type RefractionAvgAggregateOutputType = {
    spherical: number | null
    cylinder: number | null
    axis: number | null
  }

  export type RefractionSumAggregateOutputType = {
    spherical: number | null
    cylinder: number | null
    axis: number | null
  }

  export type RefractionMinAggregateOutputType = {
    id: string | null
    eyeId: string | null
    spherical: number | null
    cylinder: number | null
    axis: number | null
    visualAcuity: string | null
    recordedAt: Date | null
  }

  export type RefractionMaxAggregateOutputType = {
    id: string | null
    eyeId: string | null
    spherical: number | null
    cylinder: number | null
    axis: number | null
    visualAcuity: string | null
    recordedAt: Date | null
  }

  export type RefractionCountAggregateOutputType = {
    id: number
    eyeId: number
    spherical: number
    cylinder: number
    axis: number
    visualAcuity: number
    recordedAt: number
    _all: number
  }


  export type RefractionAvgAggregateInputType = {
    spherical?: true
    cylinder?: true
    axis?: true
  }

  export type RefractionSumAggregateInputType = {
    spherical?: true
    cylinder?: true
    axis?: true
  }

  export type RefractionMinAggregateInputType = {
    id?: true
    eyeId?: true
    spherical?: true
    cylinder?: true
    axis?: true
    visualAcuity?: true
    recordedAt?: true
  }

  export type RefractionMaxAggregateInputType = {
    id?: true
    eyeId?: true
    spherical?: true
    cylinder?: true
    axis?: true
    visualAcuity?: true
    recordedAt?: true
  }

  export type RefractionCountAggregateInputType = {
    id?: true
    eyeId?: true
    spherical?: true
    cylinder?: true
    axis?: true
    visualAcuity?: true
    recordedAt?: true
    _all?: true
  }

  export type RefractionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Refraction to aggregate.
     */
    where?: RefractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refractions to fetch.
     */
    orderBy?: RefractionOrderByWithRelationInput | RefractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Refractions
    **/
    _count?: true | RefractionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefractionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefractionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefractionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefractionMaxAggregateInputType
  }

  export type GetRefractionAggregateType<T extends RefractionAggregateArgs> = {
        [P in keyof T & keyof AggregateRefraction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefraction[P]>
      : GetScalarType<T[P], AggregateRefraction[P]>
  }




  export type RefractionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefractionWhereInput
    orderBy?: RefractionOrderByWithAggregationInput | RefractionOrderByWithAggregationInput[]
    by: RefractionScalarFieldEnum[] | RefractionScalarFieldEnum
    having?: RefractionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefractionCountAggregateInputType | true
    _avg?: RefractionAvgAggregateInputType
    _sum?: RefractionSumAggregateInputType
    _min?: RefractionMinAggregateInputType
    _max?: RefractionMaxAggregateInputType
  }

  export type RefractionGroupByOutputType = {
    id: string
    eyeId: string
    spherical: number | null
    cylinder: number | null
    axis: number | null
    visualAcuity: string | null
    recordedAt: Date
    _count: RefractionCountAggregateOutputType | null
    _avg: RefractionAvgAggregateOutputType | null
    _sum: RefractionSumAggregateOutputType | null
    _min: RefractionMinAggregateOutputType | null
    _max: RefractionMaxAggregateOutputType | null
  }

  type GetRefractionGroupByPayload<T extends RefractionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefractionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefractionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefractionGroupByOutputType[P]>
            : GetScalarType<T[P], RefractionGroupByOutputType[P]>
        }
      >
    >


  export type RefractionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    spherical?: boolean
    cylinder?: boolean
    axis?: boolean
    visualAcuity?: boolean
    recordedAt?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refraction"]>

  export type RefractionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    spherical?: boolean
    cylinder?: boolean
    axis?: boolean
    visualAcuity?: boolean
    recordedAt?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refraction"]>

  export type RefractionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    spherical?: boolean
    cylinder?: boolean
    axis?: boolean
    visualAcuity?: boolean
    recordedAt?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refraction"]>

  export type RefractionSelectScalar = {
    id?: boolean
    eyeId?: boolean
    spherical?: boolean
    cylinder?: boolean
    axis?: boolean
    visualAcuity?: boolean
    recordedAt?: boolean
  }

  export type RefractionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eyeId" | "spherical" | "cylinder" | "axis" | "visualAcuity" | "recordedAt", ExtArgs["result"]["refraction"]>
  export type RefractionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type RefractionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type RefractionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }

  export type $RefractionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Refraction"
    objects: {
      eye: Prisma.$EyePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eyeId: string
      spherical: number | null
      cylinder: number | null
      axis: number | null
      visualAcuity: string | null
      recordedAt: Date
    }, ExtArgs["result"]["refraction"]>
    composites: {}
  }

  type RefractionGetPayload<S extends boolean | null | undefined | RefractionDefaultArgs> = $Result.GetResult<Prisma.$RefractionPayload, S>

  type RefractionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefractionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefractionCountAggregateInputType | true
    }

  export interface RefractionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Refraction'], meta: { name: 'Refraction' } }
    /**
     * Find zero or one Refraction that matches the filter.
     * @param {RefractionFindUniqueArgs} args - Arguments to find a Refraction
     * @example
     * // Get one Refraction
     * const refraction = await prisma.refraction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefractionFindUniqueArgs>(args: SelectSubset<T, RefractionFindUniqueArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Refraction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefractionFindUniqueOrThrowArgs} args - Arguments to find a Refraction
     * @example
     * // Get one Refraction
     * const refraction = await prisma.refraction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefractionFindUniqueOrThrowArgs>(args: SelectSubset<T, RefractionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refraction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefractionFindFirstArgs} args - Arguments to find a Refraction
     * @example
     * // Get one Refraction
     * const refraction = await prisma.refraction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefractionFindFirstArgs>(args?: SelectSubset<T, RefractionFindFirstArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Refraction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefractionFindFirstOrThrowArgs} args - Arguments to find a Refraction
     * @example
     * // Get one Refraction
     * const refraction = await prisma.refraction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefractionFindFirstOrThrowArgs>(args?: SelectSubset<T, RefractionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Refractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefractionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Refractions
     * const refractions = await prisma.refraction.findMany()
     * 
     * // Get first 10 Refractions
     * const refractions = await prisma.refraction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refractionWithIdOnly = await prisma.refraction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefractionFindManyArgs>(args?: SelectSubset<T, RefractionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Refraction.
     * @param {RefractionCreateArgs} args - Arguments to create a Refraction.
     * @example
     * // Create one Refraction
     * const Refraction = await prisma.refraction.create({
     *   data: {
     *     // ... data to create a Refraction
     *   }
     * })
     * 
     */
    create<T extends RefractionCreateArgs>(args: SelectSubset<T, RefractionCreateArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Refractions.
     * @param {RefractionCreateManyArgs} args - Arguments to create many Refractions.
     * @example
     * // Create many Refractions
     * const refraction = await prisma.refraction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefractionCreateManyArgs>(args?: SelectSubset<T, RefractionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Refractions and returns the data saved in the database.
     * @param {RefractionCreateManyAndReturnArgs} args - Arguments to create many Refractions.
     * @example
     * // Create many Refractions
     * const refraction = await prisma.refraction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Refractions and only return the `id`
     * const refractionWithIdOnly = await prisma.refraction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefractionCreateManyAndReturnArgs>(args?: SelectSubset<T, RefractionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Refraction.
     * @param {RefractionDeleteArgs} args - Arguments to delete one Refraction.
     * @example
     * // Delete one Refraction
     * const Refraction = await prisma.refraction.delete({
     *   where: {
     *     // ... filter to delete one Refraction
     *   }
     * })
     * 
     */
    delete<T extends RefractionDeleteArgs>(args: SelectSubset<T, RefractionDeleteArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Refraction.
     * @param {RefractionUpdateArgs} args - Arguments to update one Refraction.
     * @example
     * // Update one Refraction
     * const refraction = await prisma.refraction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefractionUpdateArgs>(args: SelectSubset<T, RefractionUpdateArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Refractions.
     * @param {RefractionDeleteManyArgs} args - Arguments to filter Refractions to delete.
     * @example
     * // Delete a few Refractions
     * const { count } = await prisma.refraction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefractionDeleteManyArgs>(args?: SelectSubset<T, RefractionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefractionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Refractions
     * const refraction = await prisma.refraction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefractionUpdateManyArgs>(args: SelectSubset<T, RefractionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Refractions and returns the data updated in the database.
     * @param {RefractionUpdateManyAndReturnArgs} args - Arguments to update many Refractions.
     * @example
     * // Update many Refractions
     * const refraction = await prisma.refraction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Refractions and only return the `id`
     * const refractionWithIdOnly = await prisma.refraction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefractionUpdateManyAndReturnArgs>(args: SelectSubset<T, RefractionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Refraction.
     * @param {RefractionUpsertArgs} args - Arguments to update or create a Refraction.
     * @example
     * // Update or create a Refraction
     * const refraction = await prisma.refraction.upsert({
     *   create: {
     *     // ... data to create a Refraction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Refraction we want to update
     *   }
     * })
     */
    upsert<T extends RefractionUpsertArgs>(args: SelectSubset<T, RefractionUpsertArgs<ExtArgs>>): Prisma__RefractionClient<$Result.GetResult<Prisma.$RefractionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Refractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefractionCountArgs} args - Arguments to filter Refractions to count.
     * @example
     * // Count the number of Refractions
     * const count = await prisma.refraction.count({
     *   where: {
     *     // ... the filter for the Refractions we want to count
     *   }
     * })
    **/
    count<T extends RefractionCountArgs>(
      args?: Subset<T, RefractionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefractionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Refraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefractionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefractionAggregateArgs>(args: Subset<T, RefractionAggregateArgs>): Prisma.PrismaPromise<GetRefractionAggregateType<T>>

    /**
     * Group by Refraction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefractionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefractionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefractionGroupByArgs['orderBy'] }
        : { orderBy?: RefractionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefractionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefractionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Refraction model
   */
  readonly fields: RefractionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Refraction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefractionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eye<T extends EyeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EyeDefaultArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Refraction model
   */
  interface RefractionFieldRefs {
    readonly id: FieldRef<"Refraction", 'String'>
    readonly eyeId: FieldRef<"Refraction", 'String'>
    readonly spherical: FieldRef<"Refraction", 'Float'>
    readonly cylinder: FieldRef<"Refraction", 'Float'>
    readonly axis: FieldRef<"Refraction", 'Float'>
    readonly visualAcuity: FieldRef<"Refraction", 'String'>
    readonly recordedAt: FieldRef<"Refraction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Refraction findUnique
   */
  export type RefractionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * Filter, which Refraction to fetch.
     */
    where: RefractionWhereUniqueInput
  }

  /**
   * Refraction findUniqueOrThrow
   */
  export type RefractionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * Filter, which Refraction to fetch.
     */
    where: RefractionWhereUniqueInput
  }

  /**
   * Refraction findFirst
   */
  export type RefractionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * Filter, which Refraction to fetch.
     */
    where?: RefractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refractions to fetch.
     */
    orderBy?: RefractionOrderByWithRelationInput | RefractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Refractions.
     */
    cursor?: RefractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Refractions.
     */
    distinct?: RefractionScalarFieldEnum | RefractionScalarFieldEnum[]
  }

  /**
   * Refraction findFirstOrThrow
   */
  export type RefractionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * Filter, which Refraction to fetch.
     */
    where?: RefractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refractions to fetch.
     */
    orderBy?: RefractionOrderByWithRelationInput | RefractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Refractions.
     */
    cursor?: RefractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refractions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Refractions.
     */
    distinct?: RefractionScalarFieldEnum | RefractionScalarFieldEnum[]
  }

  /**
   * Refraction findMany
   */
  export type RefractionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * Filter, which Refractions to fetch.
     */
    where?: RefractionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Refractions to fetch.
     */
    orderBy?: RefractionOrderByWithRelationInput | RefractionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Refractions.
     */
    cursor?: RefractionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Refractions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Refractions.
     */
    skip?: number
    distinct?: RefractionScalarFieldEnum | RefractionScalarFieldEnum[]
  }

  /**
   * Refraction create
   */
  export type RefractionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * The data needed to create a Refraction.
     */
    data: XOR<RefractionCreateInput, RefractionUncheckedCreateInput>
  }

  /**
   * Refraction createMany
   */
  export type RefractionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Refractions.
     */
    data: RefractionCreateManyInput | RefractionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Refraction createManyAndReturn
   */
  export type RefractionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * The data used to create many Refractions.
     */
    data: RefractionCreateManyInput | RefractionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Refraction update
   */
  export type RefractionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * The data needed to update a Refraction.
     */
    data: XOR<RefractionUpdateInput, RefractionUncheckedUpdateInput>
    /**
     * Choose, which Refraction to update.
     */
    where: RefractionWhereUniqueInput
  }

  /**
   * Refraction updateMany
   */
  export type RefractionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Refractions.
     */
    data: XOR<RefractionUpdateManyMutationInput, RefractionUncheckedUpdateManyInput>
    /**
     * Filter which Refractions to update
     */
    where?: RefractionWhereInput
    /**
     * Limit how many Refractions to update.
     */
    limit?: number
  }

  /**
   * Refraction updateManyAndReturn
   */
  export type RefractionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * The data used to update Refractions.
     */
    data: XOR<RefractionUpdateManyMutationInput, RefractionUncheckedUpdateManyInput>
    /**
     * Filter which Refractions to update
     */
    where?: RefractionWhereInput
    /**
     * Limit how many Refractions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Refraction upsert
   */
  export type RefractionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * The filter to search for the Refraction to update in case it exists.
     */
    where: RefractionWhereUniqueInput
    /**
     * In case the Refraction found by the `where` argument doesn't exist, create a new Refraction with this data.
     */
    create: XOR<RefractionCreateInput, RefractionUncheckedCreateInput>
    /**
     * In case the Refraction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefractionUpdateInput, RefractionUncheckedUpdateInput>
  }

  /**
   * Refraction delete
   */
  export type RefractionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
    /**
     * Filter which Refraction to delete.
     */
    where: RefractionWhereUniqueInput
  }

  /**
   * Refraction deleteMany
   */
  export type RefractionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Refractions to delete
     */
    where?: RefractionWhereInput
    /**
     * Limit how many Refractions to delete.
     */
    limit?: number
  }

  /**
   * Refraction without action
   */
  export type RefractionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refraction
     */
    select?: RefractionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Refraction
     */
    omit?: RefractionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefractionInclude<ExtArgs> | null
  }


  /**
   * Model EyeSurgery
   */

  export type AggregateEyeSurgery = {
    _count: EyeSurgeryCountAggregateOutputType | null
    _min: EyeSurgeryMinAggregateOutputType | null
    _max: EyeSurgeryMaxAggregateOutputType | null
  }

  export type EyeSurgeryMinAggregateOutputType = {
    id: string | null
    eyeId: string | null
    procedure: string | null
    date: Date | null
    notes: string | null
  }

  export type EyeSurgeryMaxAggregateOutputType = {
    id: string | null
    eyeId: string | null
    procedure: string | null
    date: Date | null
    notes: string | null
  }

  export type EyeSurgeryCountAggregateOutputType = {
    id: number
    eyeId: number
    procedure: number
    date: number
    notes: number
    _all: number
  }


  export type EyeSurgeryMinAggregateInputType = {
    id?: true
    eyeId?: true
    procedure?: true
    date?: true
    notes?: true
  }

  export type EyeSurgeryMaxAggregateInputType = {
    id?: true
    eyeId?: true
    procedure?: true
    date?: true
    notes?: true
  }

  export type EyeSurgeryCountAggregateInputType = {
    id?: true
    eyeId?: true
    procedure?: true
    date?: true
    notes?: true
    _all?: true
  }

  export type EyeSurgeryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EyeSurgery to aggregate.
     */
    where?: EyeSurgeryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeSurgeries to fetch.
     */
    orderBy?: EyeSurgeryOrderByWithRelationInput | EyeSurgeryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EyeSurgeryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeSurgeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeSurgeries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EyeSurgeries
    **/
    _count?: true | EyeSurgeryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EyeSurgeryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EyeSurgeryMaxAggregateInputType
  }

  export type GetEyeSurgeryAggregateType<T extends EyeSurgeryAggregateArgs> = {
        [P in keyof T & keyof AggregateEyeSurgery]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEyeSurgery[P]>
      : GetScalarType<T[P], AggregateEyeSurgery[P]>
  }




  export type EyeSurgeryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyeSurgeryWhereInput
    orderBy?: EyeSurgeryOrderByWithAggregationInput | EyeSurgeryOrderByWithAggregationInput[]
    by: EyeSurgeryScalarFieldEnum[] | EyeSurgeryScalarFieldEnum
    having?: EyeSurgeryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EyeSurgeryCountAggregateInputType | true
    _min?: EyeSurgeryMinAggregateInputType
    _max?: EyeSurgeryMaxAggregateInputType
  }

  export type EyeSurgeryGroupByOutputType = {
    id: string
    eyeId: string
    procedure: string
    date: Date
    notes: string | null
    _count: EyeSurgeryCountAggregateOutputType | null
    _min: EyeSurgeryMinAggregateOutputType | null
    _max: EyeSurgeryMaxAggregateOutputType | null
  }

  type GetEyeSurgeryGroupByPayload<T extends EyeSurgeryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EyeSurgeryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EyeSurgeryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EyeSurgeryGroupByOutputType[P]>
            : GetScalarType<T[P], EyeSurgeryGroupByOutputType[P]>
        }
      >
    >


  export type EyeSurgerySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    procedure?: boolean
    date?: boolean
    notes?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyeSurgery"]>

  export type EyeSurgerySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    procedure?: boolean
    date?: boolean
    notes?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyeSurgery"]>

  export type EyeSurgerySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    procedure?: boolean
    date?: boolean
    notes?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyeSurgery"]>

  export type EyeSurgerySelectScalar = {
    id?: boolean
    eyeId?: boolean
    procedure?: boolean
    date?: boolean
    notes?: boolean
  }

  export type EyeSurgeryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eyeId" | "procedure" | "date" | "notes", ExtArgs["result"]["eyeSurgery"]>
  export type EyeSurgeryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type EyeSurgeryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type EyeSurgeryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }

  export type $EyeSurgeryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EyeSurgery"
    objects: {
      eye: Prisma.$EyePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eyeId: string
      procedure: string
      date: Date
      notes: string | null
    }, ExtArgs["result"]["eyeSurgery"]>
    composites: {}
  }

  type EyeSurgeryGetPayload<S extends boolean | null | undefined | EyeSurgeryDefaultArgs> = $Result.GetResult<Prisma.$EyeSurgeryPayload, S>

  type EyeSurgeryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EyeSurgeryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EyeSurgeryCountAggregateInputType | true
    }

  export interface EyeSurgeryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EyeSurgery'], meta: { name: 'EyeSurgery' } }
    /**
     * Find zero or one EyeSurgery that matches the filter.
     * @param {EyeSurgeryFindUniqueArgs} args - Arguments to find a EyeSurgery
     * @example
     * // Get one EyeSurgery
     * const eyeSurgery = await prisma.eyeSurgery.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EyeSurgeryFindUniqueArgs>(args: SelectSubset<T, EyeSurgeryFindUniqueArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EyeSurgery that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EyeSurgeryFindUniqueOrThrowArgs} args - Arguments to find a EyeSurgery
     * @example
     * // Get one EyeSurgery
     * const eyeSurgery = await prisma.eyeSurgery.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EyeSurgeryFindUniqueOrThrowArgs>(args: SelectSubset<T, EyeSurgeryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EyeSurgery that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeSurgeryFindFirstArgs} args - Arguments to find a EyeSurgery
     * @example
     * // Get one EyeSurgery
     * const eyeSurgery = await prisma.eyeSurgery.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EyeSurgeryFindFirstArgs>(args?: SelectSubset<T, EyeSurgeryFindFirstArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EyeSurgery that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeSurgeryFindFirstOrThrowArgs} args - Arguments to find a EyeSurgery
     * @example
     * // Get one EyeSurgery
     * const eyeSurgery = await prisma.eyeSurgery.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EyeSurgeryFindFirstOrThrowArgs>(args?: SelectSubset<T, EyeSurgeryFindFirstOrThrowArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EyeSurgeries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeSurgeryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EyeSurgeries
     * const eyeSurgeries = await prisma.eyeSurgery.findMany()
     * 
     * // Get first 10 EyeSurgeries
     * const eyeSurgeries = await prisma.eyeSurgery.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eyeSurgeryWithIdOnly = await prisma.eyeSurgery.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EyeSurgeryFindManyArgs>(args?: SelectSubset<T, EyeSurgeryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EyeSurgery.
     * @param {EyeSurgeryCreateArgs} args - Arguments to create a EyeSurgery.
     * @example
     * // Create one EyeSurgery
     * const EyeSurgery = await prisma.eyeSurgery.create({
     *   data: {
     *     // ... data to create a EyeSurgery
     *   }
     * })
     * 
     */
    create<T extends EyeSurgeryCreateArgs>(args: SelectSubset<T, EyeSurgeryCreateArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EyeSurgeries.
     * @param {EyeSurgeryCreateManyArgs} args - Arguments to create many EyeSurgeries.
     * @example
     * // Create many EyeSurgeries
     * const eyeSurgery = await prisma.eyeSurgery.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EyeSurgeryCreateManyArgs>(args?: SelectSubset<T, EyeSurgeryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EyeSurgeries and returns the data saved in the database.
     * @param {EyeSurgeryCreateManyAndReturnArgs} args - Arguments to create many EyeSurgeries.
     * @example
     * // Create many EyeSurgeries
     * const eyeSurgery = await prisma.eyeSurgery.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EyeSurgeries and only return the `id`
     * const eyeSurgeryWithIdOnly = await prisma.eyeSurgery.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EyeSurgeryCreateManyAndReturnArgs>(args?: SelectSubset<T, EyeSurgeryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EyeSurgery.
     * @param {EyeSurgeryDeleteArgs} args - Arguments to delete one EyeSurgery.
     * @example
     * // Delete one EyeSurgery
     * const EyeSurgery = await prisma.eyeSurgery.delete({
     *   where: {
     *     // ... filter to delete one EyeSurgery
     *   }
     * })
     * 
     */
    delete<T extends EyeSurgeryDeleteArgs>(args: SelectSubset<T, EyeSurgeryDeleteArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EyeSurgery.
     * @param {EyeSurgeryUpdateArgs} args - Arguments to update one EyeSurgery.
     * @example
     * // Update one EyeSurgery
     * const eyeSurgery = await prisma.eyeSurgery.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EyeSurgeryUpdateArgs>(args: SelectSubset<T, EyeSurgeryUpdateArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EyeSurgeries.
     * @param {EyeSurgeryDeleteManyArgs} args - Arguments to filter EyeSurgeries to delete.
     * @example
     * // Delete a few EyeSurgeries
     * const { count } = await prisma.eyeSurgery.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EyeSurgeryDeleteManyArgs>(args?: SelectSubset<T, EyeSurgeryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EyeSurgeries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeSurgeryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EyeSurgeries
     * const eyeSurgery = await prisma.eyeSurgery.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EyeSurgeryUpdateManyArgs>(args: SelectSubset<T, EyeSurgeryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EyeSurgeries and returns the data updated in the database.
     * @param {EyeSurgeryUpdateManyAndReturnArgs} args - Arguments to update many EyeSurgeries.
     * @example
     * // Update many EyeSurgeries
     * const eyeSurgery = await prisma.eyeSurgery.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EyeSurgeries and only return the `id`
     * const eyeSurgeryWithIdOnly = await prisma.eyeSurgery.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EyeSurgeryUpdateManyAndReturnArgs>(args: SelectSubset<T, EyeSurgeryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EyeSurgery.
     * @param {EyeSurgeryUpsertArgs} args - Arguments to update or create a EyeSurgery.
     * @example
     * // Update or create a EyeSurgery
     * const eyeSurgery = await prisma.eyeSurgery.upsert({
     *   create: {
     *     // ... data to create a EyeSurgery
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EyeSurgery we want to update
     *   }
     * })
     */
    upsert<T extends EyeSurgeryUpsertArgs>(args: SelectSubset<T, EyeSurgeryUpsertArgs<ExtArgs>>): Prisma__EyeSurgeryClient<$Result.GetResult<Prisma.$EyeSurgeryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EyeSurgeries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeSurgeryCountArgs} args - Arguments to filter EyeSurgeries to count.
     * @example
     * // Count the number of EyeSurgeries
     * const count = await prisma.eyeSurgery.count({
     *   where: {
     *     // ... the filter for the EyeSurgeries we want to count
     *   }
     * })
    **/
    count<T extends EyeSurgeryCountArgs>(
      args?: Subset<T, EyeSurgeryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EyeSurgeryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EyeSurgery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeSurgeryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EyeSurgeryAggregateArgs>(args: Subset<T, EyeSurgeryAggregateArgs>): Prisma.PrismaPromise<GetEyeSurgeryAggregateType<T>>

    /**
     * Group by EyeSurgery.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyeSurgeryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EyeSurgeryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EyeSurgeryGroupByArgs['orderBy'] }
        : { orderBy?: EyeSurgeryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EyeSurgeryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEyeSurgeryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EyeSurgery model
   */
  readonly fields: EyeSurgeryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EyeSurgery.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EyeSurgeryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eye<T extends EyeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EyeDefaultArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EyeSurgery model
   */
  interface EyeSurgeryFieldRefs {
    readonly id: FieldRef<"EyeSurgery", 'String'>
    readonly eyeId: FieldRef<"EyeSurgery", 'String'>
    readonly procedure: FieldRef<"EyeSurgery", 'String'>
    readonly date: FieldRef<"EyeSurgery", 'DateTime'>
    readonly notes: FieldRef<"EyeSurgery", 'String'>
  }
    

  // Custom InputTypes
  /**
   * EyeSurgery findUnique
   */
  export type EyeSurgeryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * Filter, which EyeSurgery to fetch.
     */
    where: EyeSurgeryWhereUniqueInput
  }

  /**
   * EyeSurgery findUniqueOrThrow
   */
  export type EyeSurgeryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * Filter, which EyeSurgery to fetch.
     */
    where: EyeSurgeryWhereUniqueInput
  }

  /**
   * EyeSurgery findFirst
   */
  export type EyeSurgeryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * Filter, which EyeSurgery to fetch.
     */
    where?: EyeSurgeryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeSurgeries to fetch.
     */
    orderBy?: EyeSurgeryOrderByWithRelationInput | EyeSurgeryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EyeSurgeries.
     */
    cursor?: EyeSurgeryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeSurgeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeSurgeries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EyeSurgeries.
     */
    distinct?: EyeSurgeryScalarFieldEnum | EyeSurgeryScalarFieldEnum[]
  }

  /**
   * EyeSurgery findFirstOrThrow
   */
  export type EyeSurgeryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * Filter, which EyeSurgery to fetch.
     */
    where?: EyeSurgeryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeSurgeries to fetch.
     */
    orderBy?: EyeSurgeryOrderByWithRelationInput | EyeSurgeryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EyeSurgeries.
     */
    cursor?: EyeSurgeryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeSurgeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeSurgeries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EyeSurgeries.
     */
    distinct?: EyeSurgeryScalarFieldEnum | EyeSurgeryScalarFieldEnum[]
  }

  /**
   * EyeSurgery findMany
   */
  export type EyeSurgeryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * Filter, which EyeSurgeries to fetch.
     */
    where?: EyeSurgeryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EyeSurgeries to fetch.
     */
    orderBy?: EyeSurgeryOrderByWithRelationInput | EyeSurgeryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EyeSurgeries.
     */
    cursor?: EyeSurgeryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EyeSurgeries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EyeSurgeries.
     */
    skip?: number
    distinct?: EyeSurgeryScalarFieldEnum | EyeSurgeryScalarFieldEnum[]
  }

  /**
   * EyeSurgery create
   */
  export type EyeSurgeryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * The data needed to create a EyeSurgery.
     */
    data: XOR<EyeSurgeryCreateInput, EyeSurgeryUncheckedCreateInput>
  }

  /**
   * EyeSurgery createMany
   */
  export type EyeSurgeryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EyeSurgeries.
     */
    data: EyeSurgeryCreateManyInput | EyeSurgeryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EyeSurgery createManyAndReturn
   */
  export type EyeSurgeryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * The data used to create many EyeSurgeries.
     */
    data: EyeSurgeryCreateManyInput | EyeSurgeryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * EyeSurgery update
   */
  export type EyeSurgeryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * The data needed to update a EyeSurgery.
     */
    data: XOR<EyeSurgeryUpdateInput, EyeSurgeryUncheckedUpdateInput>
    /**
     * Choose, which EyeSurgery to update.
     */
    where: EyeSurgeryWhereUniqueInput
  }

  /**
   * EyeSurgery updateMany
   */
  export type EyeSurgeryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EyeSurgeries.
     */
    data: XOR<EyeSurgeryUpdateManyMutationInput, EyeSurgeryUncheckedUpdateManyInput>
    /**
     * Filter which EyeSurgeries to update
     */
    where?: EyeSurgeryWhereInput
    /**
     * Limit how many EyeSurgeries to update.
     */
    limit?: number
  }

  /**
   * EyeSurgery updateManyAndReturn
   */
  export type EyeSurgeryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * The data used to update EyeSurgeries.
     */
    data: XOR<EyeSurgeryUpdateManyMutationInput, EyeSurgeryUncheckedUpdateManyInput>
    /**
     * Filter which EyeSurgeries to update
     */
    where?: EyeSurgeryWhereInput
    /**
     * Limit how many EyeSurgeries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * EyeSurgery upsert
   */
  export type EyeSurgeryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * The filter to search for the EyeSurgery to update in case it exists.
     */
    where: EyeSurgeryWhereUniqueInput
    /**
     * In case the EyeSurgery found by the `where` argument doesn't exist, create a new EyeSurgery with this data.
     */
    create: XOR<EyeSurgeryCreateInput, EyeSurgeryUncheckedCreateInput>
    /**
     * In case the EyeSurgery was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EyeSurgeryUpdateInput, EyeSurgeryUncheckedUpdateInput>
  }

  /**
   * EyeSurgery delete
   */
  export type EyeSurgeryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
    /**
     * Filter which EyeSurgery to delete.
     */
    where: EyeSurgeryWhereUniqueInput
  }

  /**
   * EyeSurgery deleteMany
   */
  export type EyeSurgeryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EyeSurgeries to delete
     */
    where?: EyeSurgeryWhereInput
    /**
     * Limit how many EyeSurgeries to delete.
     */
    limit?: number
  }

  /**
   * EyeSurgery without action
   */
  export type EyeSurgeryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EyeSurgery
     */
    select?: EyeSurgerySelect<ExtArgs> | null
    /**
     * Omit specific fields from the EyeSurgery
     */
    omit?: EyeSurgeryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyeSurgeryInclude<ExtArgs> | null
  }


  /**
   * Model Eyedrop
   */

  export type AggregateEyedrop = {
    _count: EyedropCountAggregateOutputType | null
    _min: EyedropMinAggregateOutputType | null
    _max: EyedropMaxAggregateOutputType | null
  }

  export type EyedropMinAggregateOutputType = {
    id: string | null
    eyeId: string | null
    name: string | null
    dosage: string | null
    startDate: Date | null
    notes: string | null
  }

  export type EyedropMaxAggregateOutputType = {
    id: string | null
    eyeId: string | null
    name: string | null
    dosage: string | null
    startDate: Date | null
    notes: string | null
  }

  export type EyedropCountAggregateOutputType = {
    id: number
    eyeId: number
    name: number
    dosage: number
    startDate: number
    notes: number
    _all: number
  }


  export type EyedropMinAggregateInputType = {
    id?: true
    eyeId?: true
    name?: true
    dosage?: true
    startDate?: true
    notes?: true
  }

  export type EyedropMaxAggregateInputType = {
    id?: true
    eyeId?: true
    name?: true
    dosage?: true
    startDate?: true
    notes?: true
  }

  export type EyedropCountAggregateInputType = {
    id?: true
    eyeId?: true
    name?: true
    dosage?: true
    startDate?: true
    notes?: true
    _all?: true
  }

  export type EyedropAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eyedrop to aggregate.
     */
    where?: EyedropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyedrops to fetch.
     */
    orderBy?: EyedropOrderByWithRelationInput | EyedropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EyedropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyedrops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyedrops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Eyedrops
    **/
    _count?: true | EyedropCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EyedropMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EyedropMaxAggregateInputType
  }

  export type GetEyedropAggregateType<T extends EyedropAggregateArgs> = {
        [P in keyof T & keyof AggregateEyedrop]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEyedrop[P]>
      : GetScalarType<T[P], AggregateEyedrop[P]>
  }




  export type EyedropGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EyedropWhereInput
    orderBy?: EyedropOrderByWithAggregationInput | EyedropOrderByWithAggregationInput[]
    by: EyedropScalarFieldEnum[] | EyedropScalarFieldEnum
    having?: EyedropScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EyedropCountAggregateInputType | true
    _min?: EyedropMinAggregateInputType
    _max?: EyedropMaxAggregateInputType
  }

  export type EyedropGroupByOutputType = {
    id: string
    eyeId: string
    name: string
    dosage: string | null
    startDate: Date | null
    notes: string | null
    _count: EyedropCountAggregateOutputType | null
    _min: EyedropMinAggregateOutputType | null
    _max: EyedropMaxAggregateOutputType | null
  }

  type GetEyedropGroupByPayload<T extends EyedropGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EyedropGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EyedropGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EyedropGroupByOutputType[P]>
            : GetScalarType<T[P], EyedropGroupByOutputType[P]>
        }
      >
    >


  export type EyedropSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    name?: boolean
    dosage?: boolean
    startDate?: boolean
    notes?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyedrop"]>

  export type EyedropSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    name?: boolean
    dosage?: boolean
    startDate?: boolean
    notes?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyedrop"]>

  export type EyedropSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    eyeId?: boolean
    name?: boolean
    dosage?: boolean
    startDate?: boolean
    notes?: boolean
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["eyedrop"]>

  export type EyedropSelectScalar = {
    id?: boolean
    eyeId?: boolean
    name?: boolean
    dosage?: boolean
    startDate?: boolean
    notes?: boolean
  }

  export type EyedropOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "eyeId" | "name" | "dosage" | "startDate" | "notes", ExtArgs["result"]["eyedrop"]>
  export type EyedropInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type EyedropIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }
  export type EyedropIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    eye?: boolean | EyeDefaultArgs<ExtArgs>
  }

  export type $EyedropPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Eyedrop"
    objects: {
      eye: Prisma.$EyePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      eyeId: string
      name: string
      dosage: string | null
      startDate: Date | null
      notes: string | null
    }, ExtArgs["result"]["eyedrop"]>
    composites: {}
  }

  type EyedropGetPayload<S extends boolean | null | undefined | EyedropDefaultArgs> = $Result.GetResult<Prisma.$EyedropPayload, S>

  type EyedropCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EyedropFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EyedropCountAggregateInputType | true
    }

  export interface EyedropDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Eyedrop'], meta: { name: 'Eyedrop' } }
    /**
     * Find zero or one Eyedrop that matches the filter.
     * @param {EyedropFindUniqueArgs} args - Arguments to find a Eyedrop
     * @example
     * // Get one Eyedrop
     * const eyedrop = await prisma.eyedrop.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EyedropFindUniqueArgs>(args: SelectSubset<T, EyedropFindUniqueArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Eyedrop that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EyedropFindUniqueOrThrowArgs} args - Arguments to find a Eyedrop
     * @example
     * // Get one Eyedrop
     * const eyedrop = await prisma.eyedrop.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EyedropFindUniqueOrThrowArgs>(args: SelectSubset<T, EyedropFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eyedrop that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyedropFindFirstArgs} args - Arguments to find a Eyedrop
     * @example
     * // Get one Eyedrop
     * const eyedrop = await prisma.eyedrop.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EyedropFindFirstArgs>(args?: SelectSubset<T, EyedropFindFirstArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Eyedrop that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyedropFindFirstOrThrowArgs} args - Arguments to find a Eyedrop
     * @example
     * // Get one Eyedrop
     * const eyedrop = await prisma.eyedrop.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EyedropFindFirstOrThrowArgs>(args?: SelectSubset<T, EyedropFindFirstOrThrowArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Eyedrops that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyedropFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Eyedrops
     * const eyedrops = await prisma.eyedrop.findMany()
     * 
     * // Get first 10 Eyedrops
     * const eyedrops = await prisma.eyedrop.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eyedropWithIdOnly = await prisma.eyedrop.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EyedropFindManyArgs>(args?: SelectSubset<T, EyedropFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Eyedrop.
     * @param {EyedropCreateArgs} args - Arguments to create a Eyedrop.
     * @example
     * // Create one Eyedrop
     * const Eyedrop = await prisma.eyedrop.create({
     *   data: {
     *     // ... data to create a Eyedrop
     *   }
     * })
     * 
     */
    create<T extends EyedropCreateArgs>(args: SelectSubset<T, EyedropCreateArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Eyedrops.
     * @param {EyedropCreateManyArgs} args - Arguments to create many Eyedrops.
     * @example
     * // Create many Eyedrops
     * const eyedrop = await prisma.eyedrop.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EyedropCreateManyArgs>(args?: SelectSubset<T, EyedropCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Eyedrops and returns the data saved in the database.
     * @param {EyedropCreateManyAndReturnArgs} args - Arguments to create many Eyedrops.
     * @example
     * // Create many Eyedrops
     * const eyedrop = await prisma.eyedrop.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Eyedrops and only return the `id`
     * const eyedropWithIdOnly = await prisma.eyedrop.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EyedropCreateManyAndReturnArgs>(args?: SelectSubset<T, EyedropCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Eyedrop.
     * @param {EyedropDeleteArgs} args - Arguments to delete one Eyedrop.
     * @example
     * // Delete one Eyedrop
     * const Eyedrop = await prisma.eyedrop.delete({
     *   where: {
     *     // ... filter to delete one Eyedrop
     *   }
     * })
     * 
     */
    delete<T extends EyedropDeleteArgs>(args: SelectSubset<T, EyedropDeleteArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Eyedrop.
     * @param {EyedropUpdateArgs} args - Arguments to update one Eyedrop.
     * @example
     * // Update one Eyedrop
     * const eyedrop = await prisma.eyedrop.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EyedropUpdateArgs>(args: SelectSubset<T, EyedropUpdateArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Eyedrops.
     * @param {EyedropDeleteManyArgs} args - Arguments to filter Eyedrops to delete.
     * @example
     * // Delete a few Eyedrops
     * const { count } = await prisma.eyedrop.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EyedropDeleteManyArgs>(args?: SelectSubset<T, EyedropDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eyedrops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyedropUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Eyedrops
     * const eyedrop = await prisma.eyedrop.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EyedropUpdateManyArgs>(args: SelectSubset<T, EyedropUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Eyedrops and returns the data updated in the database.
     * @param {EyedropUpdateManyAndReturnArgs} args - Arguments to update many Eyedrops.
     * @example
     * // Update many Eyedrops
     * const eyedrop = await prisma.eyedrop.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Eyedrops and only return the `id`
     * const eyedropWithIdOnly = await prisma.eyedrop.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EyedropUpdateManyAndReturnArgs>(args: SelectSubset<T, EyedropUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Eyedrop.
     * @param {EyedropUpsertArgs} args - Arguments to update or create a Eyedrop.
     * @example
     * // Update or create a Eyedrop
     * const eyedrop = await prisma.eyedrop.upsert({
     *   create: {
     *     // ... data to create a Eyedrop
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Eyedrop we want to update
     *   }
     * })
     */
    upsert<T extends EyedropUpsertArgs>(args: SelectSubset<T, EyedropUpsertArgs<ExtArgs>>): Prisma__EyedropClient<$Result.GetResult<Prisma.$EyedropPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Eyedrops.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyedropCountArgs} args - Arguments to filter Eyedrops to count.
     * @example
     * // Count the number of Eyedrops
     * const count = await prisma.eyedrop.count({
     *   where: {
     *     // ... the filter for the Eyedrops we want to count
     *   }
     * })
    **/
    count<T extends EyedropCountArgs>(
      args?: Subset<T, EyedropCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EyedropCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Eyedrop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyedropAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EyedropAggregateArgs>(args: Subset<T, EyedropAggregateArgs>): Prisma.PrismaPromise<GetEyedropAggregateType<T>>

    /**
     * Group by Eyedrop.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EyedropGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EyedropGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EyedropGroupByArgs['orderBy'] }
        : { orderBy?: EyedropGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EyedropGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEyedropGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Eyedrop model
   */
  readonly fields: EyedropFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Eyedrop.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EyedropClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    eye<T extends EyeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EyeDefaultArgs<ExtArgs>>): Prisma__EyeClient<$Result.GetResult<Prisma.$EyePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Eyedrop model
   */
  interface EyedropFieldRefs {
    readonly id: FieldRef<"Eyedrop", 'String'>
    readonly eyeId: FieldRef<"Eyedrop", 'String'>
    readonly name: FieldRef<"Eyedrop", 'String'>
    readonly dosage: FieldRef<"Eyedrop", 'String'>
    readonly startDate: FieldRef<"Eyedrop", 'DateTime'>
    readonly notes: FieldRef<"Eyedrop", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Eyedrop findUnique
   */
  export type EyedropFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * Filter, which Eyedrop to fetch.
     */
    where: EyedropWhereUniqueInput
  }

  /**
   * Eyedrop findUniqueOrThrow
   */
  export type EyedropFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * Filter, which Eyedrop to fetch.
     */
    where: EyedropWhereUniqueInput
  }

  /**
   * Eyedrop findFirst
   */
  export type EyedropFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * Filter, which Eyedrop to fetch.
     */
    where?: EyedropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyedrops to fetch.
     */
    orderBy?: EyedropOrderByWithRelationInput | EyedropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eyedrops.
     */
    cursor?: EyedropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyedrops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyedrops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eyedrops.
     */
    distinct?: EyedropScalarFieldEnum | EyedropScalarFieldEnum[]
  }

  /**
   * Eyedrop findFirstOrThrow
   */
  export type EyedropFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * Filter, which Eyedrop to fetch.
     */
    where?: EyedropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyedrops to fetch.
     */
    orderBy?: EyedropOrderByWithRelationInput | EyedropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Eyedrops.
     */
    cursor?: EyedropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyedrops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyedrops.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Eyedrops.
     */
    distinct?: EyedropScalarFieldEnum | EyedropScalarFieldEnum[]
  }

  /**
   * Eyedrop findMany
   */
  export type EyedropFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * Filter, which Eyedrops to fetch.
     */
    where?: EyedropWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Eyedrops to fetch.
     */
    orderBy?: EyedropOrderByWithRelationInput | EyedropOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Eyedrops.
     */
    cursor?: EyedropWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Eyedrops from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Eyedrops.
     */
    skip?: number
    distinct?: EyedropScalarFieldEnum | EyedropScalarFieldEnum[]
  }

  /**
   * Eyedrop create
   */
  export type EyedropCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * The data needed to create a Eyedrop.
     */
    data: XOR<EyedropCreateInput, EyedropUncheckedCreateInput>
  }

  /**
   * Eyedrop createMany
   */
  export type EyedropCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Eyedrops.
     */
    data: EyedropCreateManyInput | EyedropCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Eyedrop createManyAndReturn
   */
  export type EyedropCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * The data used to create many Eyedrops.
     */
    data: EyedropCreateManyInput | EyedropCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Eyedrop update
   */
  export type EyedropUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * The data needed to update a Eyedrop.
     */
    data: XOR<EyedropUpdateInput, EyedropUncheckedUpdateInput>
    /**
     * Choose, which Eyedrop to update.
     */
    where: EyedropWhereUniqueInput
  }

  /**
   * Eyedrop updateMany
   */
  export type EyedropUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Eyedrops.
     */
    data: XOR<EyedropUpdateManyMutationInput, EyedropUncheckedUpdateManyInput>
    /**
     * Filter which Eyedrops to update
     */
    where?: EyedropWhereInput
    /**
     * Limit how many Eyedrops to update.
     */
    limit?: number
  }

  /**
   * Eyedrop updateManyAndReturn
   */
  export type EyedropUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * The data used to update Eyedrops.
     */
    data: XOR<EyedropUpdateManyMutationInput, EyedropUncheckedUpdateManyInput>
    /**
     * Filter which Eyedrops to update
     */
    where?: EyedropWhereInput
    /**
     * Limit how many Eyedrops to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Eyedrop upsert
   */
  export type EyedropUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * The filter to search for the Eyedrop to update in case it exists.
     */
    where: EyedropWhereUniqueInput
    /**
     * In case the Eyedrop found by the `where` argument doesn't exist, create a new Eyedrop with this data.
     */
    create: XOR<EyedropCreateInput, EyedropUncheckedCreateInput>
    /**
     * In case the Eyedrop was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EyedropUpdateInput, EyedropUncheckedUpdateInput>
  }

  /**
   * Eyedrop delete
   */
  export type EyedropDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
    /**
     * Filter which Eyedrop to delete.
     */
    where: EyedropWhereUniqueInput
  }

  /**
   * Eyedrop deleteMany
   */
  export type EyedropDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Eyedrops to delete
     */
    where?: EyedropWhereInput
    /**
     * Limit how many Eyedrops to delete.
     */
    limit?: number
  }

  /**
   * Eyedrop without action
   */
  export type EyedropDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Eyedrop
     */
    select?: EyedropSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Eyedrop
     */
    omit?: EyedropOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EyedropInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountSumAggregateOutputType = {
    expires_at: number | null
    refresh_token_expires_in: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    provider: string | null
    providerAccountId: string | null
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    provider: number
    providerAccountId: number
    refresh_token: number
    access_token: number
    expires_at: number
    token_type: number
    scope: number
    id_token: number
    session_state: number
    refresh_token_expires_in: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountSumAggregateInputType = {
    expires_at?: true
    refresh_token_expires_in?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    provider?: true
    providerAccountId?: true
    refresh_token?: true
    access_token?: true
    expires_at?: true
    token_type?: true
    scope?: true
    id_token?: true
    session_state?: true
    refresh_token_expires_in?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token: string | null
    access_token: string | null
    expires_at: number | null
    token_type: string | null
    scope: string | null
    id_token: string | null
    session_state: string | null
    refresh_token_expires_in: number | null
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    provider?: boolean
    providerAccountId?: boolean
    refresh_token?: boolean
    access_token?: boolean
    expires_at?: boolean
    token_type?: boolean
    scope?: boolean
    id_token?: boolean
    session_state?: boolean
    refresh_token_expires_in?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "provider" | "providerAccountId" | "refresh_token" | "access_token" | "expires_at" | "token_type" | "scope" | "id_token" | "session_state" | "refresh_token_expires_in", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      provider: string
      providerAccountId: string
      refresh_token: string | null
      access_token: string | null
      expires_at: number | null
      token_type: string | null
      scope: string | null
      id_token: string | null
      session_state: string | null
      refresh_token_expires_in: number | null
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly type: FieldRef<"Account", 'String'>
    readonly provider: FieldRef<"Account", 'String'>
    readonly providerAccountId: FieldRef<"Account", 'String'>
    readonly refresh_token: FieldRef<"Account", 'String'>
    readonly access_token: FieldRef<"Account", 'String'>
    readonly expires_at: FieldRef<"Account", 'Int'>
    readonly token_type: FieldRef<"Account", 'String'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly id_token: FieldRef<"Account", 'String'>
    readonly session_state: FieldRef<"Account", 'String'>
    readonly refresh_token_expires_in: FieldRef<"Account", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    sessionToken: string | null
    userId: string | null
    expires: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    sessionToken: number
    userId: number
    expires: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    sessionToken?: true
    userId?: true
    expires?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    sessionToken: string
    userId: string
    expires: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    sessionToken?: boolean
    userId?: boolean
    expires?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionToken" | "userId" | "expires", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sessionToken: string
      userId: string
      expires: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly sessionToken: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly expires: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    isStaff: boolean | null
    image: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: Date | null
    isStaff: boolean | null
    image: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    isStaff: number
    image: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    isStaff?: true
    image?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    isStaff?: true
    image?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    isStaff?: true
    image?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    emailVerified: Date | null
    isStaff: boolean
    image: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    isStaff?: boolean
    image?: boolean
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    isStaff?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    isStaff?: boolean
    image?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    isStaff?: boolean
    image?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "isStaff" | "image", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    accounts?: boolean | User$accountsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      emailVerified: Date | null
      isStaff: boolean
      image: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'DateTime'>
    readonly isStaff: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model VerificationToken
   */

  export type AggregateVerificationToken = {
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  export type VerificationTokenMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires: Date | null
  }

  export type VerificationTokenCountAggregateOutputType = {
    identifier: number
    token: number
    expires: number
    _all: number
  }


  export type VerificationTokenMinAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
  }

  export type VerificationTokenCountAggregateInputType = {
    identifier?: true
    token?: true
    expires?: true
    _all?: true
  }

  export type VerificationTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationToken to aggregate.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VerificationTokens
    **/
    _count?: true | VerificationTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type GetVerificationTokenAggregateType<T extends VerificationTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateVerificationToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerificationToken[P]>
      : GetScalarType<T[P], AggregateVerificationToken[P]>
  }




  export type VerificationTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationTokenWhereInput
    orderBy?: VerificationTokenOrderByWithAggregationInput | VerificationTokenOrderByWithAggregationInput[]
    by: VerificationTokenScalarFieldEnum[] | VerificationTokenScalarFieldEnum
    having?: VerificationTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationTokenCountAggregateInputType | true
    _min?: VerificationTokenMinAggregateInputType
    _max?: VerificationTokenMaxAggregateInputType
  }

  export type VerificationTokenGroupByOutputType = {
    identifier: string
    token: string
    expires: Date
    _count: VerificationTokenCountAggregateOutputType | null
    _min: VerificationTokenMinAggregateOutputType | null
    _max: VerificationTokenMaxAggregateOutputType | null
  }

  type GetVerificationTokenGroupByPayload<T extends VerificationTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationTokenGroupByOutputType[P]>
        }
      >
    >


  export type VerificationTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }, ExtArgs["result"]["verificationToken"]>

  export type VerificationTokenSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires?: boolean
  }

  export type VerificationTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires", ExtArgs["result"]["verificationToken"]>

  export type $VerificationTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VerificationToken"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires: Date
    }, ExtArgs["result"]["verificationToken"]>
    composites: {}
  }

  type VerificationTokenGetPayload<S extends boolean | null | undefined | VerificationTokenDefaultArgs> = $Result.GetResult<Prisma.$VerificationTokenPayload, S>

  type VerificationTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationTokenCountAggregateInputType | true
    }

  export interface VerificationTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VerificationToken'], meta: { name: 'VerificationToken' } }
    /**
     * Find zero or one VerificationToken that matches the filter.
     * @param {VerificationTokenFindUniqueArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationTokenFindUniqueArgs>(args: SelectSubset<T, VerificationTokenFindUniqueArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VerificationToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationTokenFindUniqueOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationTokenFindFirstArgs>(args?: SelectSubset<T, VerificationTokenFindFirstArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VerificationToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindFirstOrThrowArgs} args - Arguments to find a VerificationToken
     * @example
     * // Get one VerificationToken
     * const verificationToken = await prisma.verificationToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VerificationTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany()
     * 
     * // Get first 10 VerificationTokens
     * const verificationTokens = await prisma.verificationToken.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends VerificationTokenFindManyArgs>(args?: SelectSubset<T, VerificationTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VerificationToken.
     * @param {VerificationTokenCreateArgs} args - Arguments to create a VerificationToken.
     * @example
     * // Create one VerificationToken
     * const VerificationToken = await prisma.verificationToken.create({
     *   data: {
     *     // ... data to create a VerificationToken
     *   }
     * })
     * 
     */
    create<T extends VerificationTokenCreateArgs>(args: SelectSubset<T, VerificationTokenCreateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VerificationTokens.
     * @param {VerificationTokenCreateManyArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationTokenCreateManyArgs>(args?: SelectSubset<T, VerificationTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VerificationTokens and returns the data saved in the database.
     * @param {VerificationTokenCreateManyAndReturnArgs} args - Arguments to create many VerificationTokens.
     * @example
     * // Create many VerificationTokens
     * const verificationToken = await prisma.verificationToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.createManyAndReturn({
     *   select: { identifier: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VerificationToken.
     * @param {VerificationTokenDeleteArgs} args - Arguments to delete one VerificationToken.
     * @example
     * // Delete one VerificationToken
     * const VerificationToken = await prisma.verificationToken.delete({
     *   where: {
     *     // ... filter to delete one VerificationToken
     *   }
     * })
     * 
     */
    delete<T extends VerificationTokenDeleteArgs>(args: SelectSubset<T, VerificationTokenDeleteArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VerificationToken.
     * @param {VerificationTokenUpdateArgs} args - Arguments to update one VerificationToken.
     * @example
     * // Update one VerificationToken
     * const verificationToken = await prisma.verificationToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationTokenUpdateArgs>(args: SelectSubset<T, VerificationTokenUpdateArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VerificationTokens.
     * @param {VerificationTokenDeleteManyArgs} args - Arguments to filter VerificationTokens to delete.
     * @example
     * // Delete a few VerificationTokens
     * const { count } = await prisma.verificationToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationTokenDeleteManyArgs>(args?: SelectSubset<T, VerificationTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationTokenUpdateManyArgs>(args: SelectSubset<T, VerificationTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VerificationTokens and returns the data updated in the database.
     * @param {VerificationTokenUpdateManyAndReturnArgs} args - Arguments to update many VerificationTokens.
     * @example
     * // Update many VerificationTokens
     * const verificationToken = await prisma.verificationToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VerificationTokens and only return the `identifier`
     * const verificationTokenWithIdentifierOnly = await prisma.verificationToken.updateManyAndReturn({
     *   select: { identifier: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VerificationToken.
     * @param {VerificationTokenUpsertArgs} args - Arguments to update or create a VerificationToken.
     * @example
     * // Update or create a VerificationToken
     * const verificationToken = await prisma.verificationToken.upsert({
     *   create: {
     *     // ... data to create a VerificationToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VerificationToken we want to update
     *   }
     * })
     */
    upsert<T extends VerificationTokenUpsertArgs>(args: SelectSubset<T, VerificationTokenUpsertArgs<ExtArgs>>): Prisma__VerificationTokenClient<$Result.GetResult<Prisma.$VerificationTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VerificationTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenCountArgs} args - Arguments to filter VerificationTokens to count.
     * @example
     * // Count the number of VerificationTokens
     * const count = await prisma.verificationToken.count({
     *   where: {
     *     // ... the filter for the VerificationTokens we want to count
     *   }
     * })
    **/
    count<T extends VerificationTokenCountArgs>(
      args?: Subset<T, VerificationTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationTokenAggregateArgs>(args: Subset<T, VerificationTokenAggregateArgs>): Prisma.PrismaPromise<GetVerificationTokenAggregateType<T>>

    /**
     * Group by VerificationToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationTokenGroupByArgs['orderBy'] }
        : { orderBy?: VerificationTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VerificationToken model
   */
  readonly fields: VerificationTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VerificationToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VerificationToken model
   */
  interface VerificationTokenFieldRefs {
    readonly identifier: FieldRef<"VerificationToken", 'String'>
    readonly token: FieldRef<"VerificationToken", 'String'>
    readonly expires: FieldRef<"VerificationToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VerificationToken findUnique
   */
  export type VerificationTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findUniqueOrThrow
   */
  export type VerificationTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken findFirst
   */
  export type VerificationTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findFirstOrThrow
   */
  export type VerificationTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationToken to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VerificationTokens.
     */
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken findMany
   */
  export type VerificationTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter, which VerificationTokens to fetch.
     */
    where?: VerificationTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VerificationTokens to fetch.
     */
    orderBy?: VerificationTokenOrderByWithRelationInput | VerificationTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VerificationTokens.
     */
    cursor?: VerificationTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VerificationTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VerificationTokens.
     */
    skip?: number
    distinct?: VerificationTokenScalarFieldEnum | VerificationTokenScalarFieldEnum[]
  }

  /**
   * VerificationToken create
   */
  export type VerificationTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to create a VerificationToken.
     */
    data: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
  }

  /**
   * VerificationToken createMany
   */
  export type VerificationTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken createManyAndReturn
   */
  export type VerificationTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to create many VerificationTokens.
     */
    data: VerificationTokenCreateManyInput | VerificationTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VerificationToken update
   */
  export type VerificationTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data needed to update a VerificationToken.
     */
    data: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
    /**
     * Choose, which VerificationToken to update.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken updateMany
   */
  export type VerificationTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken updateManyAndReturn
   */
  export type VerificationTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The data used to update VerificationTokens.
     */
    data: XOR<VerificationTokenUpdateManyMutationInput, VerificationTokenUncheckedUpdateManyInput>
    /**
     * Filter which VerificationTokens to update
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to update.
     */
    limit?: number
  }

  /**
   * VerificationToken upsert
   */
  export type VerificationTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * The filter to search for the VerificationToken to update in case it exists.
     */
    where: VerificationTokenWhereUniqueInput
    /**
     * In case the VerificationToken found by the `where` argument doesn't exist, create a new VerificationToken with this data.
     */
    create: XOR<VerificationTokenCreateInput, VerificationTokenUncheckedCreateInput>
    /**
     * In case the VerificationToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationTokenUpdateInput, VerificationTokenUncheckedUpdateInput>
  }

  /**
   * VerificationToken delete
   */
  export type VerificationTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
    /**
     * Filter which VerificationToken to delete.
     */
    where: VerificationTokenWhereUniqueInput
  }

  /**
   * VerificationToken deleteMany
   */
  export type VerificationTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VerificationTokens to delete
     */
    where?: VerificationTokenWhereInput
    /**
     * Limit how many VerificationTokens to delete.
     */
    limit?: number
  }

  /**
   * VerificationToken without action
   */
  export type VerificationTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VerificationToken
     */
    select?: VerificationTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VerificationToken
     */
    omit?: VerificationTokenOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PatientScalarFieldEnum: {
    id: 'id',
    refId: 'refId',
    name: 'name',
    birthDate: 'birthDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PatientScalarFieldEnum = (typeof PatientScalarFieldEnum)[keyof typeof PatientScalarFieldEnum]


  export const ClinicScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicScalarFieldEnum = (typeof ClinicScalarFieldEnum)[keyof typeof ClinicScalarFieldEnum]


  export const CollaboratorScalarFieldEnum: {
    id: 'id',
    name: 'name',
    crm: 'crm',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CollaboratorScalarFieldEnum = (typeof CollaboratorScalarFieldEnum)[keyof typeof CollaboratorScalarFieldEnum]


  export const ClinicCollaboratorScalarFieldEnum: {
    clinicId: 'clinicId',
    collaboratorId: 'collaboratorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClinicCollaboratorScalarFieldEnum = (typeof ClinicCollaboratorScalarFieldEnum)[keyof typeof ClinicCollaboratorScalarFieldEnum]


  export const EvaluationScalarFieldEnum: {
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

  export type EvaluationScalarFieldEnum = (typeof EvaluationScalarFieldEnum)[keyof typeof EvaluationScalarFieldEnum]


  export const EyesScalarFieldEnum: {
    id: 'id',
    evaluationId: 'evaluationId',
    rightEyeId: 'rightEyeId',
    leftEyeId: 'leftEyeId'
  };

  export type EyesScalarFieldEnum = (typeof EyesScalarFieldEnum)[keyof typeof EyesScalarFieldEnum]


  export const EyeScalarFieldEnum: {
    id: 'id'
  };

  export type EyeScalarFieldEnum = (typeof EyeScalarFieldEnum)[keyof typeof EyeScalarFieldEnum]


  export const EyeLogScalarFieldEnum: {
    id: 'id',
    type: 'type',
    eyeId: 'eyeId',
    details: 'details',
    recordedAt: 'recordedAt'
  };

  export type EyeLogScalarFieldEnum = (typeof EyeLogScalarFieldEnum)[keyof typeof EyeLogScalarFieldEnum]


  export const RefractionScalarFieldEnum: {
    id: 'id',
    eyeId: 'eyeId',
    spherical: 'spherical',
    cylinder: 'cylinder',
    axis: 'axis',
    visualAcuity: 'visualAcuity',
    recordedAt: 'recordedAt'
  };

  export type RefractionScalarFieldEnum = (typeof RefractionScalarFieldEnum)[keyof typeof RefractionScalarFieldEnum]


  export const EyeSurgeryScalarFieldEnum: {
    id: 'id',
    eyeId: 'eyeId',
    procedure: 'procedure',
    date: 'date',
    notes: 'notes'
  };

  export type EyeSurgeryScalarFieldEnum = (typeof EyeSurgeryScalarFieldEnum)[keyof typeof EyeSurgeryScalarFieldEnum]


  export const EyedropScalarFieldEnum: {
    id: 'id',
    eyeId: 'eyeId',
    name: 'name',
    dosage: 'dosage',
    startDate: 'startDate',
    notes: 'notes'
  };

  export type EyedropScalarFieldEnum = (typeof EyedropScalarFieldEnum)[keyof typeof EyedropScalarFieldEnum]


  export const AccountScalarFieldEnum: {
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

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    sessionToken: 'sessionToken',
    userId: 'userId',
    expires: 'expires'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    isStaff: 'isStaff',
    image: 'image'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationTokenScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires: 'expires'
  };

  export type VerificationTokenScalarFieldEnum = (typeof VerificationTokenScalarFieldEnum)[keyof typeof VerificationTokenScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'EyeLogType'
   */
  export type EnumEyeLogTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EyeLogType'>
    


  /**
   * Reference to a field of type 'EyeLogType[]'
   */
  export type ListEnumEyeLogTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EyeLogType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type PatientWhereInput = {
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    id?: StringFilter<"Patient"> | string
    refId?: StringFilter<"Patient"> | string
    name?: StringFilter<"Patient"> | string
    birthDate?: DateTimeFilter<"Patient"> | Date | string
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    evaluations?: EvaluationListRelationFilter
  }

  export type PatientOrderByWithRelationInput = {
    id?: SortOrder
    refId?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    evaluations?: EvaluationOrderByRelationAggregateInput
  }

  export type PatientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    refId?: string
    AND?: PatientWhereInput | PatientWhereInput[]
    OR?: PatientWhereInput[]
    NOT?: PatientWhereInput | PatientWhereInput[]
    name?: StringFilter<"Patient"> | string
    birthDate?: DateTimeFilter<"Patient"> | Date | string
    createdAt?: DateTimeFilter<"Patient"> | Date | string
    updatedAt?: DateTimeFilter<"Patient"> | Date | string
    evaluations?: EvaluationListRelationFilter
  }, "id" | "refId">

  export type PatientOrderByWithAggregationInput = {
    id?: SortOrder
    refId?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PatientCountOrderByAggregateInput
    _max?: PatientMaxOrderByAggregateInput
    _min?: PatientMinOrderByAggregateInput
  }

  export type PatientScalarWhereWithAggregatesInput = {
    AND?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    OR?: PatientScalarWhereWithAggregatesInput[]
    NOT?: PatientScalarWhereWithAggregatesInput | PatientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Patient"> | string
    refId?: StringWithAggregatesFilter<"Patient"> | string
    name?: StringWithAggregatesFilter<"Patient"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Patient"> | Date | string
  }

  export type ClinicWhereInput = {
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    id?: StringFilter<"Clinic"> | string
    name?: StringFilter<"Clinic"> | string
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    collaborators?: ClinicCollaboratorListRelationFilter
    evaluations?: EvaluationListRelationFilter
  }

  export type ClinicOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    collaborators?: ClinicCollaboratorOrderByRelationAggregateInput
    evaluations?: EvaluationOrderByRelationAggregateInput
  }

  export type ClinicWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClinicWhereInput | ClinicWhereInput[]
    OR?: ClinicWhereInput[]
    NOT?: ClinicWhereInput | ClinicWhereInput[]
    name?: StringFilter<"Clinic"> | string
    createdAt?: DateTimeFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeFilter<"Clinic"> | Date | string
    collaborators?: ClinicCollaboratorListRelationFilter
    evaluations?: EvaluationListRelationFilter
  }, "id">

  export type ClinicOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicCountOrderByAggregateInput
    _max?: ClinicMaxOrderByAggregateInput
    _min?: ClinicMinOrderByAggregateInput
  }

  export type ClinicScalarWhereWithAggregatesInput = {
    AND?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    OR?: ClinicScalarWhereWithAggregatesInput[]
    NOT?: ClinicScalarWhereWithAggregatesInput | ClinicScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Clinic"> | string
    name?: StringWithAggregatesFilter<"Clinic"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Clinic"> | Date | string
  }

  export type CollaboratorWhereInput = {
    AND?: CollaboratorWhereInput | CollaboratorWhereInput[]
    OR?: CollaboratorWhereInput[]
    NOT?: CollaboratorWhereInput | CollaboratorWhereInput[]
    id?: StringFilter<"Collaborator"> | string
    name?: StringFilter<"Collaborator"> | string
    crm?: StringFilter<"Collaborator"> | string
    role?: EnumRoleFilter<"Collaborator"> | $Enums.Role
    createdAt?: DateTimeFilter<"Collaborator"> | Date | string
    updatedAt?: DateTimeFilter<"Collaborator"> | Date | string
    clinics?: ClinicCollaboratorListRelationFilter
    evaluations?: EvaluationListRelationFilter
  }

  export type CollaboratorOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    crm?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinics?: ClinicCollaboratorOrderByRelationAggregateInput
    evaluations?: EvaluationOrderByRelationAggregateInput
  }

  export type CollaboratorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    crm?: string
    AND?: CollaboratorWhereInput | CollaboratorWhereInput[]
    OR?: CollaboratorWhereInput[]
    NOT?: CollaboratorWhereInput | CollaboratorWhereInput[]
    name?: StringFilter<"Collaborator"> | string
    role?: EnumRoleFilter<"Collaborator"> | $Enums.Role
    createdAt?: DateTimeFilter<"Collaborator"> | Date | string
    updatedAt?: DateTimeFilter<"Collaborator"> | Date | string
    clinics?: ClinicCollaboratorListRelationFilter
    evaluations?: EvaluationListRelationFilter
  }, "id" | "crm">

  export type CollaboratorOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    crm?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CollaboratorCountOrderByAggregateInput
    _max?: CollaboratorMaxOrderByAggregateInput
    _min?: CollaboratorMinOrderByAggregateInput
  }

  export type CollaboratorScalarWhereWithAggregatesInput = {
    AND?: CollaboratorScalarWhereWithAggregatesInput | CollaboratorScalarWhereWithAggregatesInput[]
    OR?: CollaboratorScalarWhereWithAggregatesInput[]
    NOT?: CollaboratorScalarWhereWithAggregatesInput | CollaboratorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Collaborator"> | string
    name?: StringWithAggregatesFilter<"Collaborator"> | string
    crm?: StringWithAggregatesFilter<"Collaborator"> | string
    role?: EnumRoleWithAggregatesFilter<"Collaborator"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"Collaborator"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Collaborator"> | Date | string
  }

  export type ClinicCollaboratorWhereInput = {
    AND?: ClinicCollaboratorWhereInput | ClinicCollaboratorWhereInput[]
    OR?: ClinicCollaboratorWhereInput[]
    NOT?: ClinicCollaboratorWhereInput | ClinicCollaboratorWhereInput[]
    clinicId?: StringFilter<"ClinicCollaborator"> | string
    collaboratorId?: StringFilter<"ClinicCollaborator"> | string
    createdAt?: DateTimeFilter<"ClinicCollaborator"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicCollaborator"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    collaborator?: XOR<CollaboratorScalarRelationFilter, CollaboratorWhereInput>
  }

  export type ClinicCollaboratorOrderByWithRelationInput = {
    clinicId?: SortOrder
    collaboratorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clinic?: ClinicOrderByWithRelationInput
    collaborator?: CollaboratorOrderByWithRelationInput
  }

  export type ClinicCollaboratorWhereUniqueInput = Prisma.AtLeast<{
    clinicId_collaboratorId?: ClinicCollaboratorClinicIdCollaboratorIdCompoundUniqueInput
    AND?: ClinicCollaboratorWhereInput | ClinicCollaboratorWhereInput[]
    OR?: ClinicCollaboratorWhereInput[]
    NOT?: ClinicCollaboratorWhereInput | ClinicCollaboratorWhereInput[]
    clinicId?: StringFilter<"ClinicCollaborator"> | string
    collaboratorId?: StringFilter<"ClinicCollaborator"> | string
    createdAt?: DateTimeFilter<"ClinicCollaborator"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicCollaborator"> | Date | string
    clinic?: XOR<ClinicScalarRelationFilter, ClinicWhereInput>
    collaborator?: XOR<CollaboratorScalarRelationFilter, CollaboratorWhereInput>
  }, "clinicId_collaboratorId">

  export type ClinicCollaboratorOrderByWithAggregationInput = {
    clinicId?: SortOrder
    collaboratorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClinicCollaboratorCountOrderByAggregateInput
    _max?: ClinicCollaboratorMaxOrderByAggregateInput
    _min?: ClinicCollaboratorMinOrderByAggregateInput
  }

  export type ClinicCollaboratorScalarWhereWithAggregatesInput = {
    AND?: ClinicCollaboratorScalarWhereWithAggregatesInput | ClinicCollaboratorScalarWhereWithAggregatesInput[]
    OR?: ClinicCollaboratorScalarWhereWithAggregatesInput[]
    NOT?: ClinicCollaboratorScalarWhereWithAggregatesInput | ClinicCollaboratorScalarWhereWithAggregatesInput[]
    clinicId?: StringWithAggregatesFilter<"ClinicCollaborator"> | string
    collaboratorId?: StringWithAggregatesFilter<"ClinicCollaborator"> | string
    createdAt?: DateTimeWithAggregatesFilter<"ClinicCollaborator"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ClinicCollaborator"> | Date | string
  }

  export type EvaluationWhereInput = {
    AND?: EvaluationWhereInput | EvaluationWhereInput[]
    OR?: EvaluationWhereInput[]
    NOT?: EvaluationWhereInput | EvaluationWhereInput[]
    id?: StringFilter<"Evaluation"> | string
    patientId?: StringFilter<"Evaluation"> | string
    collaboratorId?: StringFilter<"Evaluation"> | string
    done?: BoolFilter<"Evaluation"> | boolean
    clinicId?: StringNullableFilter<"Evaluation"> | string | null
    clinicalData?: StringNullableFilter<"Evaluation"> | string | null
    continuousData?: StringNullableFilter<"Evaluation"> | string | null
    diagnosis?: StringNullableFilter<"Evaluation"> | string | null
    treatment?: StringNullableFilter<"Evaluation"> | string | null
    followUp?: StringNullableFilter<"Evaluation"> | string | null
    nextAppointment?: StringNullableFilter<"Evaluation"> | string | null
    createdAt?: DateTimeFilter<"Evaluation"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluation"> | Date | string
    eyes?: XOR<EyesNullableScalarRelationFilter, EyesWhereInput> | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    collaborator?: XOR<CollaboratorScalarRelationFilter, CollaboratorWhereInput>
    clinic?: XOR<ClinicNullableScalarRelationFilter, ClinicWhereInput> | null
  }

  export type EvaluationOrderByWithRelationInput = {
    id?: SortOrder
    patientId?: SortOrder
    collaboratorId?: SortOrder
    done?: SortOrder
    clinicId?: SortOrderInput | SortOrder
    clinicalData?: SortOrderInput | SortOrder
    continuousData?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    treatment?: SortOrderInput | SortOrder
    followUp?: SortOrderInput | SortOrder
    nextAppointment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    eyes?: EyesOrderByWithRelationInput
    patient?: PatientOrderByWithRelationInput
    collaborator?: CollaboratorOrderByWithRelationInput
    clinic?: ClinicOrderByWithRelationInput
  }

  export type EvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EvaluationWhereInput | EvaluationWhereInput[]
    OR?: EvaluationWhereInput[]
    NOT?: EvaluationWhereInput | EvaluationWhereInput[]
    patientId?: StringFilter<"Evaluation"> | string
    collaboratorId?: StringFilter<"Evaluation"> | string
    done?: BoolFilter<"Evaluation"> | boolean
    clinicId?: StringNullableFilter<"Evaluation"> | string | null
    clinicalData?: StringNullableFilter<"Evaluation"> | string | null
    continuousData?: StringNullableFilter<"Evaluation"> | string | null
    diagnosis?: StringNullableFilter<"Evaluation"> | string | null
    treatment?: StringNullableFilter<"Evaluation"> | string | null
    followUp?: StringNullableFilter<"Evaluation"> | string | null
    nextAppointment?: StringNullableFilter<"Evaluation"> | string | null
    createdAt?: DateTimeFilter<"Evaluation"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluation"> | Date | string
    eyes?: XOR<EyesNullableScalarRelationFilter, EyesWhereInput> | null
    patient?: XOR<PatientScalarRelationFilter, PatientWhereInput>
    collaborator?: XOR<CollaboratorScalarRelationFilter, CollaboratorWhereInput>
    clinic?: XOR<ClinicNullableScalarRelationFilter, ClinicWhereInput> | null
  }, "id">

  export type EvaluationOrderByWithAggregationInput = {
    id?: SortOrder
    patientId?: SortOrder
    collaboratorId?: SortOrder
    done?: SortOrder
    clinicId?: SortOrderInput | SortOrder
    clinicalData?: SortOrderInput | SortOrder
    continuousData?: SortOrderInput | SortOrder
    diagnosis?: SortOrderInput | SortOrder
    treatment?: SortOrderInput | SortOrder
    followUp?: SortOrderInput | SortOrder
    nextAppointment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: EvaluationCountOrderByAggregateInput
    _max?: EvaluationMaxOrderByAggregateInput
    _min?: EvaluationMinOrderByAggregateInput
  }

  export type EvaluationScalarWhereWithAggregatesInput = {
    AND?: EvaluationScalarWhereWithAggregatesInput | EvaluationScalarWhereWithAggregatesInput[]
    OR?: EvaluationScalarWhereWithAggregatesInput[]
    NOT?: EvaluationScalarWhereWithAggregatesInput | EvaluationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Evaluation"> | string
    patientId?: StringWithAggregatesFilter<"Evaluation"> | string
    collaboratorId?: StringWithAggregatesFilter<"Evaluation"> | string
    done?: BoolWithAggregatesFilter<"Evaluation"> | boolean
    clinicId?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    clinicalData?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    continuousData?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    diagnosis?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    treatment?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    followUp?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    nextAppointment?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Evaluation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Evaluation"> | Date | string
  }

  export type EyesWhereInput = {
    AND?: EyesWhereInput | EyesWhereInput[]
    OR?: EyesWhereInput[]
    NOT?: EyesWhereInput | EyesWhereInput[]
    id?: StringFilter<"Eyes"> | string
    evaluationId?: StringFilter<"Eyes"> | string
    rightEyeId?: StringFilter<"Eyes"> | string
    leftEyeId?: StringFilter<"Eyes"> | string
    rightEye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
    leftEye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
  }

  export type EyesOrderByWithRelationInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    rightEyeId?: SortOrder
    leftEyeId?: SortOrder
    rightEye?: EyeOrderByWithRelationInput
    leftEye?: EyeOrderByWithRelationInput
    evaluation?: EvaluationOrderByWithRelationInput
  }

  export type EyesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    evaluationId?: string
    rightEyeId?: string
    leftEyeId?: string
    AND?: EyesWhereInput | EyesWhereInput[]
    OR?: EyesWhereInput[]
    NOT?: EyesWhereInput | EyesWhereInput[]
    rightEye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
    leftEye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
  }, "id" | "evaluationId" | "rightEyeId" | "leftEyeId">

  export type EyesOrderByWithAggregationInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    rightEyeId?: SortOrder
    leftEyeId?: SortOrder
    _count?: EyesCountOrderByAggregateInput
    _max?: EyesMaxOrderByAggregateInput
    _min?: EyesMinOrderByAggregateInput
  }

  export type EyesScalarWhereWithAggregatesInput = {
    AND?: EyesScalarWhereWithAggregatesInput | EyesScalarWhereWithAggregatesInput[]
    OR?: EyesScalarWhereWithAggregatesInput[]
    NOT?: EyesScalarWhereWithAggregatesInput | EyesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Eyes"> | string
    evaluationId?: StringWithAggregatesFilter<"Eyes"> | string
    rightEyeId?: StringWithAggregatesFilter<"Eyes"> | string
    leftEyeId?: StringWithAggregatesFilter<"Eyes"> | string
  }

  export type EyeWhereInput = {
    AND?: EyeWhereInput | EyeWhereInput[]
    OR?: EyeWhereInput[]
    NOT?: EyeWhereInput | EyeWhereInput[]
    id?: StringFilter<"Eye"> | string
    logs?: EyeLogListRelationFilter
    refraction?: RefractionListRelationFilter
    surgeries?: EyeSurgeryListRelationFilter
    eyedrops?: EyedropListRelationFilter
    rightEye?: XOR<EyesNullableScalarRelationFilter, EyesWhereInput> | null
    leftEye?: XOR<EyesNullableScalarRelationFilter, EyesWhereInput> | null
  }

  export type EyeOrderByWithRelationInput = {
    id?: SortOrder
    logs?: EyeLogOrderByRelationAggregateInput
    refraction?: RefractionOrderByRelationAggregateInput
    surgeries?: EyeSurgeryOrderByRelationAggregateInput
    eyedrops?: EyedropOrderByRelationAggregateInput
    rightEye?: EyesOrderByWithRelationInput
    leftEye?: EyesOrderByWithRelationInput
  }

  export type EyeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EyeWhereInput | EyeWhereInput[]
    OR?: EyeWhereInput[]
    NOT?: EyeWhereInput | EyeWhereInput[]
    logs?: EyeLogListRelationFilter
    refraction?: RefractionListRelationFilter
    surgeries?: EyeSurgeryListRelationFilter
    eyedrops?: EyedropListRelationFilter
    rightEye?: XOR<EyesNullableScalarRelationFilter, EyesWhereInput> | null
    leftEye?: XOR<EyesNullableScalarRelationFilter, EyesWhereInput> | null
  }, "id">

  export type EyeOrderByWithAggregationInput = {
    id?: SortOrder
    _count?: EyeCountOrderByAggregateInput
    _max?: EyeMaxOrderByAggregateInput
    _min?: EyeMinOrderByAggregateInput
  }

  export type EyeScalarWhereWithAggregatesInput = {
    AND?: EyeScalarWhereWithAggregatesInput | EyeScalarWhereWithAggregatesInput[]
    OR?: EyeScalarWhereWithAggregatesInput[]
    NOT?: EyeScalarWhereWithAggregatesInput | EyeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Eye"> | string
  }

  export type EyeLogWhereInput = {
    AND?: EyeLogWhereInput | EyeLogWhereInput[]
    OR?: EyeLogWhereInput[]
    NOT?: EyeLogWhereInput | EyeLogWhereInput[]
    id?: StringFilter<"EyeLog"> | string
    type?: EnumEyeLogTypeFilter<"EyeLog"> | $Enums.EyeLogType
    eyeId?: StringFilter<"EyeLog"> | string
    details?: StringNullableFilter<"EyeLog"> | string | null
    recordedAt?: DateTimeFilter<"EyeLog"> | Date | string
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }

  export type EyeLogOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    eyeId?: SortOrder
    details?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    eye?: EyeOrderByWithRelationInput
  }

  export type EyeLogWhereUniqueInput = Prisma.AtLeast<{
    type_eyeId?: EyeLogTypeEyeIdCompoundUniqueInput
    AND?: EyeLogWhereInput | EyeLogWhereInput[]
    OR?: EyeLogWhereInput[]
    NOT?: EyeLogWhereInput | EyeLogWhereInput[]
    id?: StringFilter<"EyeLog"> | string
    type?: EnumEyeLogTypeFilter<"EyeLog"> | $Enums.EyeLogType
    eyeId?: StringFilter<"EyeLog"> | string
    details?: StringNullableFilter<"EyeLog"> | string | null
    recordedAt?: DateTimeFilter<"EyeLog"> | Date | string
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }, "type_eyeId">

  export type EyeLogOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    eyeId?: SortOrder
    details?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    _count?: EyeLogCountOrderByAggregateInput
    _max?: EyeLogMaxOrderByAggregateInput
    _min?: EyeLogMinOrderByAggregateInput
  }

  export type EyeLogScalarWhereWithAggregatesInput = {
    AND?: EyeLogScalarWhereWithAggregatesInput | EyeLogScalarWhereWithAggregatesInput[]
    OR?: EyeLogScalarWhereWithAggregatesInput[]
    NOT?: EyeLogScalarWhereWithAggregatesInput | EyeLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EyeLog"> | string
    type?: EnumEyeLogTypeWithAggregatesFilter<"EyeLog"> | $Enums.EyeLogType
    eyeId?: StringWithAggregatesFilter<"EyeLog"> | string
    details?: StringNullableWithAggregatesFilter<"EyeLog"> | string | null
    recordedAt?: DateTimeWithAggregatesFilter<"EyeLog"> | Date | string
  }

  export type RefractionWhereInput = {
    AND?: RefractionWhereInput | RefractionWhereInput[]
    OR?: RefractionWhereInput[]
    NOT?: RefractionWhereInput | RefractionWhereInput[]
    id?: StringFilter<"Refraction"> | string
    eyeId?: StringFilter<"Refraction"> | string
    spherical?: FloatNullableFilter<"Refraction"> | number | null
    cylinder?: FloatNullableFilter<"Refraction"> | number | null
    axis?: FloatNullableFilter<"Refraction"> | number | null
    visualAcuity?: StringNullableFilter<"Refraction"> | string | null
    recordedAt?: DateTimeFilter<"Refraction"> | Date | string
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }

  export type RefractionOrderByWithRelationInput = {
    id?: SortOrder
    eyeId?: SortOrder
    spherical?: SortOrderInput | SortOrder
    cylinder?: SortOrderInput | SortOrder
    axis?: SortOrderInput | SortOrder
    visualAcuity?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    eye?: EyeOrderByWithRelationInput
  }

  export type RefractionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RefractionWhereInput | RefractionWhereInput[]
    OR?: RefractionWhereInput[]
    NOT?: RefractionWhereInput | RefractionWhereInput[]
    eyeId?: StringFilter<"Refraction"> | string
    spherical?: FloatNullableFilter<"Refraction"> | number | null
    cylinder?: FloatNullableFilter<"Refraction"> | number | null
    axis?: FloatNullableFilter<"Refraction"> | number | null
    visualAcuity?: StringNullableFilter<"Refraction"> | string | null
    recordedAt?: DateTimeFilter<"Refraction"> | Date | string
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }, "id">

  export type RefractionOrderByWithAggregationInput = {
    id?: SortOrder
    eyeId?: SortOrder
    spherical?: SortOrderInput | SortOrder
    cylinder?: SortOrderInput | SortOrder
    axis?: SortOrderInput | SortOrder
    visualAcuity?: SortOrderInput | SortOrder
    recordedAt?: SortOrder
    _count?: RefractionCountOrderByAggregateInput
    _avg?: RefractionAvgOrderByAggregateInput
    _max?: RefractionMaxOrderByAggregateInput
    _min?: RefractionMinOrderByAggregateInput
    _sum?: RefractionSumOrderByAggregateInput
  }

  export type RefractionScalarWhereWithAggregatesInput = {
    AND?: RefractionScalarWhereWithAggregatesInput | RefractionScalarWhereWithAggregatesInput[]
    OR?: RefractionScalarWhereWithAggregatesInput[]
    NOT?: RefractionScalarWhereWithAggregatesInput | RefractionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Refraction"> | string
    eyeId?: StringWithAggregatesFilter<"Refraction"> | string
    spherical?: FloatNullableWithAggregatesFilter<"Refraction"> | number | null
    cylinder?: FloatNullableWithAggregatesFilter<"Refraction"> | number | null
    axis?: FloatNullableWithAggregatesFilter<"Refraction"> | number | null
    visualAcuity?: StringNullableWithAggregatesFilter<"Refraction"> | string | null
    recordedAt?: DateTimeWithAggregatesFilter<"Refraction"> | Date | string
  }

  export type EyeSurgeryWhereInput = {
    AND?: EyeSurgeryWhereInput | EyeSurgeryWhereInput[]
    OR?: EyeSurgeryWhereInput[]
    NOT?: EyeSurgeryWhereInput | EyeSurgeryWhereInput[]
    id?: StringFilter<"EyeSurgery"> | string
    eyeId?: StringFilter<"EyeSurgery"> | string
    procedure?: StringFilter<"EyeSurgery"> | string
    date?: DateTimeFilter<"EyeSurgery"> | Date | string
    notes?: StringNullableFilter<"EyeSurgery"> | string | null
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }

  export type EyeSurgeryOrderByWithRelationInput = {
    id?: SortOrder
    eyeId?: SortOrder
    procedure?: SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    eye?: EyeOrderByWithRelationInput
  }

  export type EyeSurgeryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EyeSurgeryWhereInput | EyeSurgeryWhereInput[]
    OR?: EyeSurgeryWhereInput[]
    NOT?: EyeSurgeryWhereInput | EyeSurgeryWhereInput[]
    eyeId?: StringFilter<"EyeSurgery"> | string
    procedure?: StringFilter<"EyeSurgery"> | string
    date?: DateTimeFilter<"EyeSurgery"> | Date | string
    notes?: StringNullableFilter<"EyeSurgery"> | string | null
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }, "id">

  export type EyeSurgeryOrderByWithAggregationInput = {
    id?: SortOrder
    eyeId?: SortOrder
    procedure?: SortOrder
    date?: SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: EyeSurgeryCountOrderByAggregateInput
    _max?: EyeSurgeryMaxOrderByAggregateInput
    _min?: EyeSurgeryMinOrderByAggregateInput
  }

  export type EyeSurgeryScalarWhereWithAggregatesInput = {
    AND?: EyeSurgeryScalarWhereWithAggregatesInput | EyeSurgeryScalarWhereWithAggregatesInput[]
    OR?: EyeSurgeryScalarWhereWithAggregatesInput[]
    NOT?: EyeSurgeryScalarWhereWithAggregatesInput | EyeSurgeryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"EyeSurgery"> | string
    eyeId?: StringWithAggregatesFilter<"EyeSurgery"> | string
    procedure?: StringWithAggregatesFilter<"EyeSurgery"> | string
    date?: DateTimeWithAggregatesFilter<"EyeSurgery"> | Date | string
    notes?: StringNullableWithAggregatesFilter<"EyeSurgery"> | string | null
  }

  export type EyedropWhereInput = {
    AND?: EyedropWhereInput | EyedropWhereInput[]
    OR?: EyedropWhereInput[]
    NOT?: EyedropWhereInput | EyedropWhereInput[]
    id?: StringFilter<"Eyedrop"> | string
    eyeId?: StringFilter<"Eyedrop"> | string
    name?: StringFilter<"Eyedrop"> | string
    dosage?: StringNullableFilter<"Eyedrop"> | string | null
    startDate?: DateTimeNullableFilter<"Eyedrop"> | Date | string | null
    notes?: StringNullableFilter<"Eyedrop"> | string | null
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }

  export type EyedropOrderByWithRelationInput = {
    id?: SortOrder
    eyeId?: SortOrder
    name?: SortOrder
    dosage?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    eye?: EyeOrderByWithRelationInput
  }

  export type EyedropWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EyedropWhereInput | EyedropWhereInput[]
    OR?: EyedropWhereInput[]
    NOT?: EyedropWhereInput | EyedropWhereInput[]
    eyeId?: StringFilter<"Eyedrop"> | string
    name?: StringFilter<"Eyedrop"> | string
    dosage?: StringNullableFilter<"Eyedrop"> | string | null
    startDate?: DateTimeNullableFilter<"Eyedrop"> | Date | string | null
    notes?: StringNullableFilter<"Eyedrop"> | string | null
    eye?: XOR<EyeScalarRelationFilter, EyeWhereInput>
  }, "id">

  export type EyedropOrderByWithAggregationInput = {
    id?: SortOrder
    eyeId?: SortOrder
    name?: SortOrder
    dosage?: SortOrderInput | SortOrder
    startDate?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    _count?: EyedropCountOrderByAggregateInput
    _max?: EyedropMaxOrderByAggregateInput
    _min?: EyedropMinOrderByAggregateInput
  }

  export type EyedropScalarWhereWithAggregatesInput = {
    AND?: EyedropScalarWhereWithAggregatesInput | EyedropScalarWhereWithAggregatesInput[]
    OR?: EyedropScalarWhereWithAggregatesInput[]
    NOT?: EyedropScalarWhereWithAggregatesInput | EyedropScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Eyedrop"> | string
    eyeId?: StringWithAggregatesFilter<"Eyedrop"> | string
    name?: StringWithAggregatesFilter<"Eyedrop"> | string
    dosage?: StringNullableWithAggregatesFilter<"Eyedrop"> | string | null
    startDate?: DateTimeNullableWithAggregatesFilter<"Eyedrop"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Eyedrop"> | string | null
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    provider_providerAccountId?: AccountProviderProviderAccountIdCompoundUniqueInput
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_providerAccountId">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrderInput | SortOrder
    access_token?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    token_type?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    id_token?: SortOrderInput | SortOrder
    session_state?: SortOrderInput | SortOrder
    refresh_token_expires_in?: SortOrderInput | SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    type?: StringWithAggregatesFilter<"Account"> | string
    provider?: StringWithAggregatesFilter<"Account"> | string
    providerAccountId?: StringWithAggregatesFilter<"Account"> | string
    refresh_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    access_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    expires_at?: IntNullableWithAggregatesFilter<"Account"> | number | null
    token_type?: StringNullableWithAggregatesFilter<"Account"> | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    id_token?: StringNullableWithAggregatesFilter<"Account"> | string | null
    session_state?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableWithAggregatesFilter<"Account"> | number | null
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sessionToken?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "sessionToken">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    sessionToken?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    expires?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    isStaff?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    isStaff?: SortOrder
    image?: SortOrderInput | SortOrder
    accounts?: AccountOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    emailVerified?: DateTimeNullableFilter<"User"> | Date | string | null
    isStaff?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    accounts?: AccountListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    emailVerified?: SortOrderInput | SortOrder
    isStaff?: SortOrder
    image?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailVerified?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    isStaff?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type VerificationTokenWhereInput = {
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    token?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }

  export type VerificationTokenOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenWhereUniqueInput = Prisma.AtLeast<{
    token?: string
    identifier_token?: VerificationTokenIdentifierTokenCompoundUniqueInput
    AND?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    OR?: VerificationTokenWhereInput[]
    NOT?: VerificationTokenWhereInput | VerificationTokenWhereInput[]
    identifier?: StringFilter<"VerificationToken"> | string
    expires?: DateTimeFilter<"VerificationToken"> | Date | string
  }, "token" | "identifier_token">

  export type VerificationTokenOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
    _count?: VerificationTokenCountOrderByAggregateInput
    _max?: VerificationTokenMaxOrderByAggregateInput
    _min?: VerificationTokenMinOrderByAggregateInput
  }

  export type VerificationTokenScalarWhereWithAggregatesInput = {
    AND?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    OR?: VerificationTokenScalarWhereWithAggregatesInput[]
    NOT?: VerificationTokenScalarWhereWithAggregatesInput | VerificationTokenScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"VerificationToken"> | string
    token?: StringWithAggregatesFilter<"VerificationToken"> | string
    expires?: DateTimeWithAggregatesFilter<"VerificationToken"> | Date | string
  }

  export type PatientCreateInput = {
    id?: string
    refId: string
    name: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluations?: EvaluationCreateNestedManyWithoutPatientInput
  }

  export type PatientUncheckedCreateInput = {
    id?: string
    refId: string
    name: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutPatientInput
  }

  export type PatientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: EvaluationUpdateManyWithoutPatientNestedInput
  }

  export type PatientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    refId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: EvaluationUncheckedUpdateManyWithoutPatientNestedInput
  }

  export type PatientCreateManyInput = {
    id?: string
    refId: string
    name: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    refId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    refId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: ClinicCollaboratorCreateNestedManyWithoutClinicInput
    evaluations?: EvaluationCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: ClinicCollaboratorUncheckedCreateNestedManyWithoutClinicInput
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: ClinicCollaboratorUpdateManyWithoutClinicNestedInput
    evaluations?: EvaluationUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: ClinicCollaboratorUncheckedUpdateManyWithoutClinicNestedInput
    evaluations?: EvaluationUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type ClinicCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollaboratorCreateInput = {
    id?: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicCollaboratorCreateNestedManyWithoutCollaboratorInput
    evaluations?: EvaluationCreateNestedManyWithoutCollaboratorInput
  }

  export type CollaboratorUncheckedCreateInput = {
    id?: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicCollaboratorUncheckedCreateNestedManyWithoutCollaboratorInput
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutCollaboratorInput
  }

  export type CollaboratorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicCollaboratorUpdateManyWithoutCollaboratorNestedInput
    evaluations?: EvaluationUpdateManyWithoutCollaboratorNestedInput
  }

  export type CollaboratorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicCollaboratorUncheckedUpdateManyWithoutCollaboratorNestedInput
    evaluations?: EvaluationUncheckedUpdateManyWithoutCollaboratorNestedInput
  }

  export type CollaboratorCreateManyInput = {
    id?: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CollaboratorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollaboratorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCollaboratorCreateInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutCollaboratorsInput
    collaborator: CollaboratorCreateNestedOneWithoutClinicsInput
  }

  export type ClinicCollaboratorUncheckedCreateInput = {
    clinicId: string
    collaboratorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicCollaboratorUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutCollaboratorsNestedInput
    collaborator?: CollaboratorUpdateOneRequiredWithoutClinicsNestedInput
  }

  export type ClinicCollaboratorUncheckedUpdateInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCollaboratorCreateManyInput = {
    clinicId: string
    collaboratorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicCollaboratorUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCollaboratorUncheckedUpdateManyInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationCreateInput = {
    id?: string
    done?: boolean
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesCreateNestedOneWithoutEvaluationInput
    patient: PatientCreateNestedOneWithoutEvaluationsInput
    collaborator: CollaboratorCreateNestedOneWithoutEvaluationsInput
    clinic?: ClinicCreateNestedOneWithoutEvaluationsInput
  }

  export type EvaluationUncheckedCreateInput = {
    id?: string
    patientId: string
    collaboratorId: string
    done?: boolean
    clinicId?: string | null
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesUncheckedCreateNestedOneWithoutEvaluationInput
  }

  export type EvaluationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUpdateOneWithoutEvaluationNestedInput
    patient?: PatientUpdateOneRequiredWithoutEvaluationsNestedInput
    collaborator?: CollaboratorUpdateOneRequiredWithoutEvaluationsNestedInput
    clinic?: ClinicUpdateOneWithoutEvaluationsNestedInput
  }

  export type EvaluationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUncheckedUpdateOneWithoutEvaluationNestedInput
  }

  export type EvaluationCreateManyInput = {
    id?: string
    patientId: string
    collaboratorId: string
    done?: boolean
    clinicId?: string | null
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyesCreateInput = {
    id?: string
    rightEye: EyeCreateNestedOneWithoutRightEyeInput
    leftEye: EyeCreateNestedOneWithoutLeftEyeInput
    evaluation: EvaluationCreateNestedOneWithoutEyesInput
  }

  export type EyesUncheckedCreateInput = {
    id?: string
    evaluationId: string
    rightEyeId: string
    leftEyeId: string
  }

  export type EyesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rightEye?: EyeUpdateOneRequiredWithoutRightEyeNestedInput
    leftEye?: EyeUpdateOneRequiredWithoutLeftEyeNestedInput
    evaluation?: EvaluationUpdateOneRequiredWithoutEyesNestedInput
  }

  export type EyesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluationId?: StringFieldUpdateOperationsInput | string
    rightEyeId?: StringFieldUpdateOperationsInput | string
    leftEyeId?: StringFieldUpdateOperationsInput | string
  }

  export type EyesCreateManyInput = {
    id?: string
    evaluationId: string
    rightEyeId: string
    leftEyeId: string
  }

  export type EyesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type EyesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluationId?: StringFieldUpdateOperationsInput | string
    rightEyeId?: StringFieldUpdateOperationsInput | string
    leftEyeId?: StringFieldUpdateOperationsInput | string
  }

  export type EyeCreateInput = {
    id?: string
    logs?: EyeLogCreateNestedManyWithoutEyeInput
    refraction?: RefractionCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropCreateNestedManyWithoutEyeInput
    rightEye?: EyesCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeUncheckedCreateInput = {
    id?: string
    logs?: EyeLogUncheckedCreateNestedManyWithoutEyeInput
    refraction?: RefractionUncheckedCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryUncheckedCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropUncheckedCreateNestedManyWithoutEyeInput
    rightEye?: EyesUncheckedCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesUncheckedCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUncheckedUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUncheckedUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUncheckedUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUncheckedUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUncheckedUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUncheckedUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeCreateManyInput = {
    id?: string
  }

  export type EyeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type EyeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type EyeLogCreateInput = {
    id?: string
    type: $Enums.EyeLogType
    details?: string | null
    recordedAt?: Date | string
    eye: EyeCreateNestedOneWithoutLogsInput
  }

  export type EyeLogUncheckedCreateInput = {
    id?: string
    type: $Enums.EyeLogType
    eyeId: string
    details?: string | null
    recordedAt?: Date | string
  }

  export type EyeLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEyeLogTypeFieldUpdateOperationsInput | $Enums.EyeLogType
    details?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eye?: EyeUpdateOneRequiredWithoutLogsNestedInput
  }

  export type EyeLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEyeLogTypeFieldUpdateOperationsInput | $Enums.EyeLogType
    eyeId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeLogCreateManyInput = {
    id?: string
    type: $Enums.EyeLogType
    eyeId: string
    details?: string | null
    recordedAt?: Date | string
  }

  export type EyeLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEyeLogTypeFieldUpdateOperationsInput | $Enums.EyeLogType
    details?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEyeLogTypeFieldUpdateOperationsInput | $Enums.EyeLogType
    eyeId?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefractionCreateInput = {
    id?: string
    spherical?: number | null
    cylinder?: number | null
    axis?: number | null
    visualAcuity?: string | null
    recordedAt?: Date | string
    eye: EyeCreateNestedOneWithoutRefractionInput
  }

  export type RefractionUncheckedCreateInput = {
    id?: string
    eyeId: string
    spherical?: number | null
    cylinder?: number | null
    axis?: number | null
    visualAcuity?: string | null
    recordedAt?: Date | string
  }

  export type RefractionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    spherical?: NullableFloatFieldUpdateOperationsInput | number | null
    cylinder?: NullableFloatFieldUpdateOperationsInput | number | null
    axis?: NullableFloatFieldUpdateOperationsInput | number | null
    visualAcuity?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eye?: EyeUpdateOneRequiredWithoutRefractionNestedInput
  }

  export type RefractionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eyeId?: StringFieldUpdateOperationsInput | string
    spherical?: NullableFloatFieldUpdateOperationsInput | number | null
    cylinder?: NullableFloatFieldUpdateOperationsInput | number | null
    axis?: NullableFloatFieldUpdateOperationsInput | number | null
    visualAcuity?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefractionCreateManyInput = {
    id?: string
    eyeId: string
    spherical?: number | null
    cylinder?: number | null
    axis?: number | null
    visualAcuity?: string | null
    recordedAt?: Date | string
  }

  export type RefractionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    spherical?: NullableFloatFieldUpdateOperationsInput | number | null
    cylinder?: NullableFloatFieldUpdateOperationsInput | number | null
    axis?: NullableFloatFieldUpdateOperationsInput | number | null
    visualAcuity?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefractionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eyeId?: StringFieldUpdateOperationsInput | string
    spherical?: NullableFloatFieldUpdateOperationsInput | number | null
    cylinder?: NullableFloatFieldUpdateOperationsInput | number | null
    axis?: NullableFloatFieldUpdateOperationsInput | number | null
    visualAcuity?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeSurgeryCreateInput = {
    id?: string
    procedure: string
    date: Date | string
    notes?: string | null
    eye: EyeCreateNestedOneWithoutSurgeriesInput
  }

  export type EyeSurgeryUncheckedCreateInput = {
    id?: string
    eyeId: string
    procedure: string
    date: Date | string
    notes?: string | null
  }

  export type EyeSurgeryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    procedure?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    eye?: EyeUpdateOneRequiredWithoutSurgeriesNestedInput
  }

  export type EyeSurgeryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eyeId?: StringFieldUpdateOperationsInput | string
    procedure?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyeSurgeryCreateManyInput = {
    id?: string
    eyeId: string
    procedure: string
    date: Date | string
    notes?: string | null
  }

  export type EyeSurgeryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    procedure?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyeSurgeryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eyeId?: StringFieldUpdateOperationsInput | string
    procedure?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyedropCreateInput = {
    id?: string
    name: string
    dosage?: string | null
    startDate?: Date | string | null
    notes?: string | null
    eye: EyeCreateNestedOneWithoutEyedropsInput
  }

  export type EyedropUncheckedCreateInput = {
    id?: string
    eyeId: string
    name: string
    dosage?: string | null
    startDate?: Date | string | null
    notes?: string | null
  }

  export type EyedropUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    eye?: EyeUpdateOneRequiredWithoutEyedropsNestedInput
  }

  export type EyedropUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    eyeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyedropCreateManyInput = {
    id?: string
    eyeId: string
    name: string
    dosage?: string | null
    startDate?: Date | string | null
    notes?: string | null
  }

  export type EyedropUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyedropUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    eyeId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountCreateManyInput = {
    id?: string
    userId: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionCreateInput = {
    id?: string
    sessionToken: string
    expires: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    sessionToken: string
    userId: string
    expires: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    isStaff?: boolean
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    isStaff?: boolean
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    isStaff?: boolean
    image?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type VerificationTokenCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUncheckedCreateInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenCreateManyInput = {
    identifier: string
    token: string
    expires: Date | string
  }

  export type VerificationTokenUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationTokenUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EvaluationListRelationFilter = {
    every?: EvaluationWhereInput
    some?: EvaluationWhereInput
    none?: EvaluationWhereInput
  }

  export type EvaluationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PatientCountOrderByAggregateInput = {
    id?: SortOrder
    refId?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMaxOrderByAggregateInput = {
    id?: SortOrder
    refId?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PatientMinOrderByAggregateInput = {
    id?: SortOrder
    refId?: SortOrder
    name?: SortOrder
    birthDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type ClinicCollaboratorListRelationFilter = {
    every?: ClinicCollaboratorWhereInput
    some?: ClinicCollaboratorWhereInput
    none?: ClinicCollaboratorWhereInput
  }

  export type ClinicCollaboratorOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClinicCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type CollaboratorCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    crm?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollaboratorMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    crm?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CollaboratorMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    crm?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type ClinicScalarRelationFilter = {
    is?: ClinicWhereInput
    isNot?: ClinicWhereInput
  }

  export type CollaboratorScalarRelationFilter = {
    is?: CollaboratorWhereInput
    isNot?: CollaboratorWhereInput
  }

  export type ClinicCollaboratorClinicIdCollaboratorIdCompoundUniqueInput = {
    clinicId: string
    collaboratorId: string
  }

  export type ClinicCollaboratorCountOrderByAggregateInput = {
    clinicId?: SortOrder
    collaboratorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicCollaboratorMaxOrderByAggregateInput = {
    clinicId?: SortOrder
    collaboratorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClinicCollaboratorMinOrderByAggregateInput = {
    clinicId?: SortOrder
    collaboratorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EyesNullableScalarRelationFilter = {
    is?: EyesWhereInput | null
    isNot?: EyesWhereInput | null
  }

  export type PatientScalarRelationFilter = {
    is?: PatientWhereInput
    isNot?: PatientWhereInput
  }

  export type ClinicNullableScalarRelationFilter = {
    is?: ClinicWhereInput | null
    isNot?: ClinicWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EvaluationCountOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    collaboratorId?: SortOrder
    done?: SortOrder
    clinicId?: SortOrder
    clinicalData?: SortOrder
    continuousData?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    followUp?: SortOrder
    nextAppointment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvaluationMaxOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    collaboratorId?: SortOrder
    done?: SortOrder
    clinicId?: SortOrder
    clinicalData?: SortOrder
    continuousData?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    followUp?: SortOrder
    nextAppointment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EvaluationMinOrderByAggregateInput = {
    id?: SortOrder
    patientId?: SortOrder
    collaboratorId?: SortOrder
    done?: SortOrder
    clinicId?: SortOrder
    clinicalData?: SortOrder
    continuousData?: SortOrder
    diagnosis?: SortOrder
    treatment?: SortOrder
    followUp?: SortOrder
    nextAppointment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EyeScalarRelationFilter = {
    is?: EyeWhereInput
    isNot?: EyeWhereInput
  }

  export type EvaluationScalarRelationFilter = {
    is?: EvaluationWhereInput
    isNot?: EvaluationWhereInput
  }

  export type EyesCountOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    rightEyeId?: SortOrder
    leftEyeId?: SortOrder
  }

  export type EyesMaxOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    rightEyeId?: SortOrder
    leftEyeId?: SortOrder
  }

  export type EyesMinOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    rightEyeId?: SortOrder
    leftEyeId?: SortOrder
  }

  export type EyeLogListRelationFilter = {
    every?: EyeLogWhereInput
    some?: EyeLogWhereInput
    none?: EyeLogWhereInput
  }

  export type RefractionListRelationFilter = {
    every?: RefractionWhereInput
    some?: RefractionWhereInput
    none?: RefractionWhereInput
  }

  export type EyeSurgeryListRelationFilter = {
    every?: EyeSurgeryWhereInput
    some?: EyeSurgeryWhereInput
    none?: EyeSurgeryWhereInput
  }

  export type EyedropListRelationFilter = {
    every?: EyedropWhereInput
    some?: EyedropWhereInput
    none?: EyedropWhereInput
  }

  export type EyeLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefractionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EyeSurgeryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EyedropOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EyeCountOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EyeMaxOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EyeMinOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumEyeLogTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EyeLogType | EnumEyeLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEyeLogTypeFilter<$PrismaModel> | $Enums.EyeLogType
  }

  export type EyeLogTypeEyeIdCompoundUniqueInput = {
    type: $Enums.EyeLogType
    eyeId: string
  }

  export type EyeLogCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    eyeId?: SortOrder
    details?: SortOrder
    recordedAt?: SortOrder
  }

  export type EyeLogMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    eyeId?: SortOrder
    details?: SortOrder
    recordedAt?: SortOrder
  }

  export type EyeLogMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    eyeId?: SortOrder
    details?: SortOrder
    recordedAt?: SortOrder
  }

  export type EnumEyeLogTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EyeLogType | EnumEyeLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEyeLogTypeWithAggregatesFilter<$PrismaModel> | $Enums.EyeLogType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEyeLogTypeFilter<$PrismaModel>
    _max?: NestedEnumEyeLogTypeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type RefractionCountOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    spherical?: SortOrder
    cylinder?: SortOrder
    axis?: SortOrder
    visualAcuity?: SortOrder
    recordedAt?: SortOrder
  }

  export type RefractionAvgOrderByAggregateInput = {
    spherical?: SortOrder
    cylinder?: SortOrder
    axis?: SortOrder
  }

  export type RefractionMaxOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    spherical?: SortOrder
    cylinder?: SortOrder
    axis?: SortOrder
    visualAcuity?: SortOrder
    recordedAt?: SortOrder
  }

  export type RefractionMinOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    spherical?: SortOrder
    cylinder?: SortOrder
    axis?: SortOrder
    visualAcuity?: SortOrder
    recordedAt?: SortOrder
  }

  export type RefractionSumOrderByAggregateInput = {
    spherical?: SortOrder
    cylinder?: SortOrder
    axis?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EyeSurgeryCountOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    procedure?: SortOrder
    date?: SortOrder
    notes?: SortOrder
  }

  export type EyeSurgeryMaxOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    procedure?: SortOrder
    date?: SortOrder
    notes?: SortOrder
  }

  export type EyeSurgeryMinOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    procedure?: SortOrder
    date?: SortOrder
    notes?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EyedropCountOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    name?: SortOrder
    dosage?: SortOrder
    startDate?: SortOrder
    notes?: SortOrder
  }

  export type EyedropMaxOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    name?: SortOrder
    dosage?: SortOrder
    startDate?: SortOrder
    notes?: SortOrder
  }

  export type EyedropMinOrderByAggregateInput = {
    id?: SortOrder
    eyeId?: SortOrder
    name?: SortOrder
    dosage?: SortOrder
    startDate?: SortOrder
    notes?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type AccountProviderProviderAccountIdCompoundUniqueInput = {
    provider: string
    providerAccountId: string
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    provider?: SortOrder
    providerAccountId?: SortOrder
    refresh_token?: SortOrder
    access_token?: SortOrder
    expires_at?: SortOrder
    token_type?: SortOrder
    scope?: SortOrder
    id_token?: SortOrder
    session_state?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    expires_at?: SortOrder
    refresh_token_expires_in?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    sessionToken?: SortOrder
    userId?: SortOrder
    expires?: SortOrder
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    isStaff?: SortOrder
    image?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    isStaff?: SortOrder
    image?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    isStaff?: SortOrder
    image?: SortOrder
  }

  export type VerificationTokenIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type VerificationTokenCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type VerificationTokenMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires?: SortOrder
  }

  export type EvaluationCreateNestedManyWithoutPatientInput = {
    create?: XOR<EvaluationCreateWithoutPatientInput, EvaluationUncheckedCreateWithoutPatientInput> | EvaluationCreateWithoutPatientInput[] | EvaluationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutPatientInput | EvaluationCreateOrConnectWithoutPatientInput[]
    createMany?: EvaluationCreateManyPatientInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type EvaluationUncheckedCreateNestedManyWithoutPatientInput = {
    create?: XOR<EvaluationCreateWithoutPatientInput, EvaluationUncheckedCreateWithoutPatientInput> | EvaluationCreateWithoutPatientInput[] | EvaluationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutPatientInput | EvaluationCreateOrConnectWithoutPatientInput[]
    createMany?: EvaluationCreateManyPatientInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type EvaluationUpdateManyWithoutPatientNestedInput = {
    create?: XOR<EvaluationCreateWithoutPatientInput, EvaluationUncheckedCreateWithoutPatientInput> | EvaluationCreateWithoutPatientInput[] | EvaluationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutPatientInput | EvaluationCreateOrConnectWithoutPatientInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutPatientInput | EvaluationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: EvaluationCreateManyPatientInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutPatientInput | EvaluationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutPatientInput | EvaluationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type EvaluationUncheckedUpdateManyWithoutPatientNestedInput = {
    create?: XOR<EvaluationCreateWithoutPatientInput, EvaluationUncheckedCreateWithoutPatientInput> | EvaluationCreateWithoutPatientInput[] | EvaluationUncheckedCreateWithoutPatientInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutPatientInput | EvaluationCreateOrConnectWithoutPatientInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutPatientInput | EvaluationUpsertWithWhereUniqueWithoutPatientInput[]
    createMany?: EvaluationCreateManyPatientInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutPatientInput | EvaluationUpdateWithWhereUniqueWithoutPatientInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutPatientInput | EvaluationUpdateManyWithWhereWithoutPatientInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type ClinicCollaboratorCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutClinicInput, ClinicCollaboratorUncheckedCreateWithoutClinicInput> | ClinicCollaboratorCreateWithoutClinicInput[] | ClinicCollaboratorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutClinicInput | ClinicCollaboratorCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicCollaboratorCreateManyClinicInputEnvelope
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
  }

  export type EvaluationCreateNestedManyWithoutClinicInput = {
    create?: XOR<EvaluationCreateWithoutClinicInput, EvaluationUncheckedCreateWithoutClinicInput> | EvaluationCreateWithoutClinicInput[] | EvaluationUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutClinicInput | EvaluationCreateOrConnectWithoutClinicInput[]
    createMany?: EvaluationCreateManyClinicInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type ClinicCollaboratorUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutClinicInput, ClinicCollaboratorUncheckedCreateWithoutClinicInput> | ClinicCollaboratorCreateWithoutClinicInput[] | ClinicCollaboratorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutClinicInput | ClinicCollaboratorCreateOrConnectWithoutClinicInput[]
    createMany?: ClinicCollaboratorCreateManyClinicInputEnvelope
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
  }

  export type EvaluationUncheckedCreateNestedManyWithoutClinicInput = {
    create?: XOR<EvaluationCreateWithoutClinicInput, EvaluationUncheckedCreateWithoutClinicInput> | EvaluationCreateWithoutClinicInput[] | EvaluationUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutClinicInput | EvaluationCreateOrConnectWithoutClinicInput[]
    createMany?: EvaluationCreateManyClinicInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type ClinicCollaboratorUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutClinicInput, ClinicCollaboratorUncheckedCreateWithoutClinicInput> | ClinicCollaboratorCreateWithoutClinicInput[] | ClinicCollaboratorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutClinicInput | ClinicCollaboratorCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicCollaboratorUpsertWithWhereUniqueWithoutClinicInput | ClinicCollaboratorUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicCollaboratorCreateManyClinicInputEnvelope
    set?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    disconnect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    delete?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    update?: ClinicCollaboratorUpdateWithWhereUniqueWithoutClinicInput | ClinicCollaboratorUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicCollaboratorUpdateManyWithWhereWithoutClinicInput | ClinicCollaboratorUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicCollaboratorScalarWhereInput | ClinicCollaboratorScalarWhereInput[]
  }

  export type EvaluationUpdateManyWithoutClinicNestedInput = {
    create?: XOR<EvaluationCreateWithoutClinicInput, EvaluationUncheckedCreateWithoutClinicInput> | EvaluationCreateWithoutClinicInput[] | EvaluationUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutClinicInput | EvaluationCreateOrConnectWithoutClinicInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutClinicInput | EvaluationUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: EvaluationCreateManyClinicInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutClinicInput | EvaluationUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutClinicInput | EvaluationUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type ClinicCollaboratorUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutClinicInput, ClinicCollaboratorUncheckedCreateWithoutClinicInput> | ClinicCollaboratorCreateWithoutClinicInput[] | ClinicCollaboratorUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutClinicInput | ClinicCollaboratorCreateOrConnectWithoutClinicInput[]
    upsert?: ClinicCollaboratorUpsertWithWhereUniqueWithoutClinicInput | ClinicCollaboratorUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: ClinicCollaboratorCreateManyClinicInputEnvelope
    set?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    disconnect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    delete?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    update?: ClinicCollaboratorUpdateWithWhereUniqueWithoutClinicInput | ClinicCollaboratorUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: ClinicCollaboratorUpdateManyWithWhereWithoutClinicInput | ClinicCollaboratorUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: ClinicCollaboratorScalarWhereInput | ClinicCollaboratorScalarWhereInput[]
  }

  export type EvaluationUncheckedUpdateManyWithoutClinicNestedInput = {
    create?: XOR<EvaluationCreateWithoutClinicInput, EvaluationUncheckedCreateWithoutClinicInput> | EvaluationCreateWithoutClinicInput[] | EvaluationUncheckedCreateWithoutClinicInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutClinicInput | EvaluationCreateOrConnectWithoutClinicInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutClinicInput | EvaluationUpsertWithWhereUniqueWithoutClinicInput[]
    createMany?: EvaluationCreateManyClinicInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutClinicInput | EvaluationUpdateWithWhereUniqueWithoutClinicInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutClinicInput | EvaluationUpdateManyWithWhereWithoutClinicInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type ClinicCollaboratorCreateNestedManyWithoutCollaboratorInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutCollaboratorInput, ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput> | ClinicCollaboratorCreateWithoutCollaboratorInput[] | ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput | ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput[]
    createMany?: ClinicCollaboratorCreateManyCollaboratorInputEnvelope
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
  }

  export type EvaluationCreateNestedManyWithoutCollaboratorInput = {
    create?: XOR<EvaluationCreateWithoutCollaboratorInput, EvaluationUncheckedCreateWithoutCollaboratorInput> | EvaluationCreateWithoutCollaboratorInput[] | EvaluationUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutCollaboratorInput | EvaluationCreateOrConnectWithoutCollaboratorInput[]
    createMany?: EvaluationCreateManyCollaboratorInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type ClinicCollaboratorUncheckedCreateNestedManyWithoutCollaboratorInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutCollaboratorInput, ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput> | ClinicCollaboratorCreateWithoutCollaboratorInput[] | ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput | ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput[]
    createMany?: ClinicCollaboratorCreateManyCollaboratorInputEnvelope
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
  }

  export type EvaluationUncheckedCreateNestedManyWithoutCollaboratorInput = {
    create?: XOR<EvaluationCreateWithoutCollaboratorInput, EvaluationUncheckedCreateWithoutCollaboratorInput> | EvaluationCreateWithoutCollaboratorInput[] | EvaluationUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutCollaboratorInput | EvaluationCreateOrConnectWithoutCollaboratorInput[]
    createMany?: EvaluationCreateManyCollaboratorInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type ClinicCollaboratorUpdateManyWithoutCollaboratorNestedInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutCollaboratorInput, ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput> | ClinicCollaboratorCreateWithoutCollaboratorInput[] | ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput | ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput[]
    upsert?: ClinicCollaboratorUpsertWithWhereUniqueWithoutCollaboratorInput | ClinicCollaboratorUpsertWithWhereUniqueWithoutCollaboratorInput[]
    createMany?: ClinicCollaboratorCreateManyCollaboratorInputEnvelope
    set?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    disconnect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    delete?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    update?: ClinicCollaboratorUpdateWithWhereUniqueWithoutCollaboratorInput | ClinicCollaboratorUpdateWithWhereUniqueWithoutCollaboratorInput[]
    updateMany?: ClinicCollaboratorUpdateManyWithWhereWithoutCollaboratorInput | ClinicCollaboratorUpdateManyWithWhereWithoutCollaboratorInput[]
    deleteMany?: ClinicCollaboratorScalarWhereInput | ClinicCollaboratorScalarWhereInput[]
  }

  export type EvaluationUpdateManyWithoutCollaboratorNestedInput = {
    create?: XOR<EvaluationCreateWithoutCollaboratorInput, EvaluationUncheckedCreateWithoutCollaboratorInput> | EvaluationCreateWithoutCollaboratorInput[] | EvaluationUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutCollaboratorInput | EvaluationCreateOrConnectWithoutCollaboratorInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutCollaboratorInput | EvaluationUpsertWithWhereUniqueWithoutCollaboratorInput[]
    createMany?: EvaluationCreateManyCollaboratorInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutCollaboratorInput | EvaluationUpdateWithWhereUniqueWithoutCollaboratorInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutCollaboratorInput | EvaluationUpdateManyWithWhereWithoutCollaboratorInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type ClinicCollaboratorUncheckedUpdateManyWithoutCollaboratorNestedInput = {
    create?: XOR<ClinicCollaboratorCreateWithoutCollaboratorInput, ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput> | ClinicCollaboratorCreateWithoutCollaboratorInput[] | ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput | ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput[]
    upsert?: ClinicCollaboratorUpsertWithWhereUniqueWithoutCollaboratorInput | ClinicCollaboratorUpsertWithWhereUniqueWithoutCollaboratorInput[]
    createMany?: ClinicCollaboratorCreateManyCollaboratorInputEnvelope
    set?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    disconnect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    delete?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    connect?: ClinicCollaboratorWhereUniqueInput | ClinicCollaboratorWhereUniqueInput[]
    update?: ClinicCollaboratorUpdateWithWhereUniqueWithoutCollaboratorInput | ClinicCollaboratorUpdateWithWhereUniqueWithoutCollaboratorInput[]
    updateMany?: ClinicCollaboratorUpdateManyWithWhereWithoutCollaboratorInput | ClinicCollaboratorUpdateManyWithWhereWithoutCollaboratorInput[]
    deleteMany?: ClinicCollaboratorScalarWhereInput | ClinicCollaboratorScalarWhereInput[]
  }

  export type EvaluationUncheckedUpdateManyWithoutCollaboratorNestedInput = {
    create?: XOR<EvaluationCreateWithoutCollaboratorInput, EvaluationUncheckedCreateWithoutCollaboratorInput> | EvaluationCreateWithoutCollaboratorInput[] | EvaluationUncheckedCreateWithoutCollaboratorInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutCollaboratorInput | EvaluationCreateOrConnectWithoutCollaboratorInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutCollaboratorInput | EvaluationUpsertWithWhereUniqueWithoutCollaboratorInput[]
    createMany?: EvaluationCreateManyCollaboratorInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutCollaboratorInput | EvaluationUpdateWithWhereUniqueWithoutCollaboratorInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutCollaboratorInput | EvaluationUpdateManyWithWhereWithoutCollaboratorInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type ClinicCreateNestedOneWithoutCollaboratorsInput = {
    create?: XOR<ClinicCreateWithoutCollaboratorsInput, ClinicUncheckedCreateWithoutCollaboratorsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutCollaboratorsInput
    connect?: ClinicWhereUniqueInput
  }

  export type CollaboratorCreateNestedOneWithoutClinicsInput = {
    create?: XOR<CollaboratorCreateWithoutClinicsInput, CollaboratorUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: CollaboratorCreateOrConnectWithoutClinicsInput
    connect?: CollaboratorWhereUniqueInput
  }

  export type ClinicUpdateOneRequiredWithoutCollaboratorsNestedInput = {
    create?: XOR<ClinicCreateWithoutCollaboratorsInput, ClinicUncheckedCreateWithoutCollaboratorsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutCollaboratorsInput
    upsert?: ClinicUpsertWithoutCollaboratorsInput
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutCollaboratorsInput, ClinicUpdateWithoutCollaboratorsInput>, ClinicUncheckedUpdateWithoutCollaboratorsInput>
  }

  export type CollaboratorUpdateOneRequiredWithoutClinicsNestedInput = {
    create?: XOR<CollaboratorCreateWithoutClinicsInput, CollaboratorUncheckedCreateWithoutClinicsInput>
    connectOrCreate?: CollaboratorCreateOrConnectWithoutClinicsInput
    upsert?: CollaboratorUpsertWithoutClinicsInput
    connect?: CollaboratorWhereUniqueInput
    update?: XOR<XOR<CollaboratorUpdateToOneWithWhereWithoutClinicsInput, CollaboratorUpdateWithoutClinicsInput>, CollaboratorUncheckedUpdateWithoutClinicsInput>
  }

  export type EyesCreateNestedOneWithoutEvaluationInput = {
    create?: XOR<EyesCreateWithoutEvaluationInput, EyesUncheckedCreateWithoutEvaluationInput>
    connectOrCreate?: EyesCreateOrConnectWithoutEvaluationInput
    connect?: EyesWhereUniqueInput
  }

  export type PatientCreateNestedOneWithoutEvaluationsInput = {
    create?: XOR<PatientCreateWithoutEvaluationsInput, PatientUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutEvaluationsInput
    connect?: PatientWhereUniqueInput
  }

  export type CollaboratorCreateNestedOneWithoutEvaluationsInput = {
    create?: XOR<CollaboratorCreateWithoutEvaluationsInput, CollaboratorUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: CollaboratorCreateOrConnectWithoutEvaluationsInput
    connect?: CollaboratorWhereUniqueInput
  }

  export type ClinicCreateNestedOneWithoutEvaluationsInput = {
    create?: XOR<ClinicCreateWithoutEvaluationsInput, ClinicUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutEvaluationsInput
    connect?: ClinicWhereUniqueInput
  }

  export type EyesUncheckedCreateNestedOneWithoutEvaluationInput = {
    create?: XOR<EyesCreateWithoutEvaluationInput, EyesUncheckedCreateWithoutEvaluationInput>
    connectOrCreate?: EyesCreateOrConnectWithoutEvaluationInput
    connect?: EyesWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EyesUpdateOneWithoutEvaluationNestedInput = {
    create?: XOR<EyesCreateWithoutEvaluationInput, EyesUncheckedCreateWithoutEvaluationInput>
    connectOrCreate?: EyesCreateOrConnectWithoutEvaluationInput
    upsert?: EyesUpsertWithoutEvaluationInput
    disconnect?: EyesWhereInput | boolean
    delete?: EyesWhereInput | boolean
    connect?: EyesWhereUniqueInput
    update?: XOR<XOR<EyesUpdateToOneWithWhereWithoutEvaluationInput, EyesUpdateWithoutEvaluationInput>, EyesUncheckedUpdateWithoutEvaluationInput>
  }

  export type PatientUpdateOneRequiredWithoutEvaluationsNestedInput = {
    create?: XOR<PatientCreateWithoutEvaluationsInput, PatientUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: PatientCreateOrConnectWithoutEvaluationsInput
    upsert?: PatientUpsertWithoutEvaluationsInput
    connect?: PatientWhereUniqueInput
    update?: XOR<XOR<PatientUpdateToOneWithWhereWithoutEvaluationsInput, PatientUpdateWithoutEvaluationsInput>, PatientUncheckedUpdateWithoutEvaluationsInput>
  }

  export type CollaboratorUpdateOneRequiredWithoutEvaluationsNestedInput = {
    create?: XOR<CollaboratorCreateWithoutEvaluationsInput, CollaboratorUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: CollaboratorCreateOrConnectWithoutEvaluationsInput
    upsert?: CollaboratorUpsertWithoutEvaluationsInput
    connect?: CollaboratorWhereUniqueInput
    update?: XOR<XOR<CollaboratorUpdateToOneWithWhereWithoutEvaluationsInput, CollaboratorUpdateWithoutEvaluationsInput>, CollaboratorUncheckedUpdateWithoutEvaluationsInput>
  }

  export type ClinicUpdateOneWithoutEvaluationsNestedInput = {
    create?: XOR<ClinicCreateWithoutEvaluationsInput, ClinicUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: ClinicCreateOrConnectWithoutEvaluationsInput
    upsert?: ClinicUpsertWithoutEvaluationsInput
    disconnect?: ClinicWhereInput | boolean
    delete?: ClinicWhereInput | boolean
    connect?: ClinicWhereUniqueInput
    update?: XOR<XOR<ClinicUpdateToOneWithWhereWithoutEvaluationsInput, ClinicUpdateWithoutEvaluationsInput>, ClinicUncheckedUpdateWithoutEvaluationsInput>
  }

  export type EyesUncheckedUpdateOneWithoutEvaluationNestedInput = {
    create?: XOR<EyesCreateWithoutEvaluationInput, EyesUncheckedCreateWithoutEvaluationInput>
    connectOrCreate?: EyesCreateOrConnectWithoutEvaluationInput
    upsert?: EyesUpsertWithoutEvaluationInput
    disconnect?: EyesWhereInput | boolean
    delete?: EyesWhereInput | boolean
    connect?: EyesWhereUniqueInput
    update?: XOR<XOR<EyesUpdateToOneWithWhereWithoutEvaluationInput, EyesUpdateWithoutEvaluationInput>, EyesUncheckedUpdateWithoutEvaluationInput>
  }

  export type EyeCreateNestedOneWithoutRightEyeInput = {
    create?: XOR<EyeCreateWithoutRightEyeInput, EyeUncheckedCreateWithoutRightEyeInput>
    connectOrCreate?: EyeCreateOrConnectWithoutRightEyeInput
    connect?: EyeWhereUniqueInput
  }

  export type EyeCreateNestedOneWithoutLeftEyeInput = {
    create?: XOR<EyeCreateWithoutLeftEyeInput, EyeUncheckedCreateWithoutLeftEyeInput>
    connectOrCreate?: EyeCreateOrConnectWithoutLeftEyeInput
    connect?: EyeWhereUniqueInput
  }

  export type EvaluationCreateNestedOneWithoutEyesInput = {
    create?: XOR<EvaluationCreateWithoutEyesInput, EvaluationUncheckedCreateWithoutEyesInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutEyesInput
    connect?: EvaluationWhereUniqueInput
  }

  export type EyeUpdateOneRequiredWithoutRightEyeNestedInput = {
    create?: XOR<EyeCreateWithoutRightEyeInput, EyeUncheckedCreateWithoutRightEyeInput>
    connectOrCreate?: EyeCreateOrConnectWithoutRightEyeInput
    upsert?: EyeUpsertWithoutRightEyeInput
    connect?: EyeWhereUniqueInput
    update?: XOR<XOR<EyeUpdateToOneWithWhereWithoutRightEyeInput, EyeUpdateWithoutRightEyeInput>, EyeUncheckedUpdateWithoutRightEyeInput>
  }

  export type EyeUpdateOneRequiredWithoutLeftEyeNestedInput = {
    create?: XOR<EyeCreateWithoutLeftEyeInput, EyeUncheckedCreateWithoutLeftEyeInput>
    connectOrCreate?: EyeCreateOrConnectWithoutLeftEyeInput
    upsert?: EyeUpsertWithoutLeftEyeInput
    connect?: EyeWhereUniqueInput
    update?: XOR<XOR<EyeUpdateToOneWithWhereWithoutLeftEyeInput, EyeUpdateWithoutLeftEyeInput>, EyeUncheckedUpdateWithoutLeftEyeInput>
  }

  export type EvaluationUpdateOneRequiredWithoutEyesNestedInput = {
    create?: XOR<EvaluationCreateWithoutEyesInput, EvaluationUncheckedCreateWithoutEyesInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutEyesInput
    upsert?: EvaluationUpsertWithoutEyesInput
    connect?: EvaluationWhereUniqueInput
    update?: XOR<XOR<EvaluationUpdateToOneWithWhereWithoutEyesInput, EvaluationUpdateWithoutEyesInput>, EvaluationUncheckedUpdateWithoutEyesInput>
  }

  export type EyeLogCreateNestedManyWithoutEyeInput = {
    create?: XOR<EyeLogCreateWithoutEyeInput, EyeLogUncheckedCreateWithoutEyeInput> | EyeLogCreateWithoutEyeInput[] | EyeLogUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeLogCreateOrConnectWithoutEyeInput | EyeLogCreateOrConnectWithoutEyeInput[]
    createMany?: EyeLogCreateManyEyeInputEnvelope
    connect?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
  }

  export type RefractionCreateNestedManyWithoutEyeInput = {
    create?: XOR<RefractionCreateWithoutEyeInput, RefractionUncheckedCreateWithoutEyeInput> | RefractionCreateWithoutEyeInput[] | RefractionUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: RefractionCreateOrConnectWithoutEyeInput | RefractionCreateOrConnectWithoutEyeInput[]
    createMany?: RefractionCreateManyEyeInputEnvelope
    connect?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
  }

  export type EyeSurgeryCreateNestedManyWithoutEyeInput = {
    create?: XOR<EyeSurgeryCreateWithoutEyeInput, EyeSurgeryUncheckedCreateWithoutEyeInput> | EyeSurgeryCreateWithoutEyeInput[] | EyeSurgeryUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeSurgeryCreateOrConnectWithoutEyeInput | EyeSurgeryCreateOrConnectWithoutEyeInput[]
    createMany?: EyeSurgeryCreateManyEyeInputEnvelope
    connect?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
  }

  export type EyedropCreateNestedManyWithoutEyeInput = {
    create?: XOR<EyedropCreateWithoutEyeInput, EyedropUncheckedCreateWithoutEyeInput> | EyedropCreateWithoutEyeInput[] | EyedropUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyedropCreateOrConnectWithoutEyeInput | EyedropCreateOrConnectWithoutEyeInput[]
    createMany?: EyedropCreateManyEyeInputEnvelope
    connect?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
  }

  export type EyesCreateNestedOneWithoutRightEyeInput = {
    create?: XOR<EyesCreateWithoutRightEyeInput, EyesUncheckedCreateWithoutRightEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutRightEyeInput
    connect?: EyesWhereUniqueInput
  }

  export type EyesCreateNestedOneWithoutLeftEyeInput = {
    create?: XOR<EyesCreateWithoutLeftEyeInput, EyesUncheckedCreateWithoutLeftEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutLeftEyeInput
    connect?: EyesWhereUniqueInput
  }

  export type EyeLogUncheckedCreateNestedManyWithoutEyeInput = {
    create?: XOR<EyeLogCreateWithoutEyeInput, EyeLogUncheckedCreateWithoutEyeInput> | EyeLogCreateWithoutEyeInput[] | EyeLogUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeLogCreateOrConnectWithoutEyeInput | EyeLogCreateOrConnectWithoutEyeInput[]
    createMany?: EyeLogCreateManyEyeInputEnvelope
    connect?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
  }

  export type RefractionUncheckedCreateNestedManyWithoutEyeInput = {
    create?: XOR<RefractionCreateWithoutEyeInput, RefractionUncheckedCreateWithoutEyeInput> | RefractionCreateWithoutEyeInput[] | RefractionUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: RefractionCreateOrConnectWithoutEyeInput | RefractionCreateOrConnectWithoutEyeInput[]
    createMany?: RefractionCreateManyEyeInputEnvelope
    connect?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
  }

  export type EyeSurgeryUncheckedCreateNestedManyWithoutEyeInput = {
    create?: XOR<EyeSurgeryCreateWithoutEyeInput, EyeSurgeryUncheckedCreateWithoutEyeInput> | EyeSurgeryCreateWithoutEyeInput[] | EyeSurgeryUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeSurgeryCreateOrConnectWithoutEyeInput | EyeSurgeryCreateOrConnectWithoutEyeInput[]
    createMany?: EyeSurgeryCreateManyEyeInputEnvelope
    connect?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
  }

  export type EyedropUncheckedCreateNestedManyWithoutEyeInput = {
    create?: XOR<EyedropCreateWithoutEyeInput, EyedropUncheckedCreateWithoutEyeInput> | EyedropCreateWithoutEyeInput[] | EyedropUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyedropCreateOrConnectWithoutEyeInput | EyedropCreateOrConnectWithoutEyeInput[]
    createMany?: EyedropCreateManyEyeInputEnvelope
    connect?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
  }

  export type EyesUncheckedCreateNestedOneWithoutRightEyeInput = {
    create?: XOR<EyesCreateWithoutRightEyeInput, EyesUncheckedCreateWithoutRightEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutRightEyeInput
    connect?: EyesWhereUniqueInput
  }

  export type EyesUncheckedCreateNestedOneWithoutLeftEyeInput = {
    create?: XOR<EyesCreateWithoutLeftEyeInput, EyesUncheckedCreateWithoutLeftEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutLeftEyeInput
    connect?: EyesWhereUniqueInput
  }

  export type EyeLogUpdateManyWithoutEyeNestedInput = {
    create?: XOR<EyeLogCreateWithoutEyeInput, EyeLogUncheckedCreateWithoutEyeInput> | EyeLogCreateWithoutEyeInput[] | EyeLogUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeLogCreateOrConnectWithoutEyeInput | EyeLogCreateOrConnectWithoutEyeInput[]
    upsert?: EyeLogUpsertWithWhereUniqueWithoutEyeInput | EyeLogUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: EyeLogCreateManyEyeInputEnvelope
    set?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    disconnect?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    delete?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    connect?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    update?: EyeLogUpdateWithWhereUniqueWithoutEyeInput | EyeLogUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: EyeLogUpdateManyWithWhereWithoutEyeInput | EyeLogUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: EyeLogScalarWhereInput | EyeLogScalarWhereInput[]
  }

  export type RefractionUpdateManyWithoutEyeNestedInput = {
    create?: XOR<RefractionCreateWithoutEyeInput, RefractionUncheckedCreateWithoutEyeInput> | RefractionCreateWithoutEyeInput[] | RefractionUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: RefractionCreateOrConnectWithoutEyeInput | RefractionCreateOrConnectWithoutEyeInput[]
    upsert?: RefractionUpsertWithWhereUniqueWithoutEyeInput | RefractionUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: RefractionCreateManyEyeInputEnvelope
    set?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    disconnect?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    delete?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    connect?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    update?: RefractionUpdateWithWhereUniqueWithoutEyeInput | RefractionUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: RefractionUpdateManyWithWhereWithoutEyeInput | RefractionUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: RefractionScalarWhereInput | RefractionScalarWhereInput[]
  }

  export type EyeSurgeryUpdateManyWithoutEyeNestedInput = {
    create?: XOR<EyeSurgeryCreateWithoutEyeInput, EyeSurgeryUncheckedCreateWithoutEyeInput> | EyeSurgeryCreateWithoutEyeInput[] | EyeSurgeryUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeSurgeryCreateOrConnectWithoutEyeInput | EyeSurgeryCreateOrConnectWithoutEyeInput[]
    upsert?: EyeSurgeryUpsertWithWhereUniqueWithoutEyeInput | EyeSurgeryUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: EyeSurgeryCreateManyEyeInputEnvelope
    set?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    disconnect?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    delete?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    connect?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    update?: EyeSurgeryUpdateWithWhereUniqueWithoutEyeInput | EyeSurgeryUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: EyeSurgeryUpdateManyWithWhereWithoutEyeInput | EyeSurgeryUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: EyeSurgeryScalarWhereInput | EyeSurgeryScalarWhereInput[]
  }

  export type EyedropUpdateManyWithoutEyeNestedInput = {
    create?: XOR<EyedropCreateWithoutEyeInput, EyedropUncheckedCreateWithoutEyeInput> | EyedropCreateWithoutEyeInput[] | EyedropUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyedropCreateOrConnectWithoutEyeInput | EyedropCreateOrConnectWithoutEyeInput[]
    upsert?: EyedropUpsertWithWhereUniqueWithoutEyeInput | EyedropUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: EyedropCreateManyEyeInputEnvelope
    set?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    disconnect?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    delete?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    connect?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    update?: EyedropUpdateWithWhereUniqueWithoutEyeInput | EyedropUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: EyedropUpdateManyWithWhereWithoutEyeInput | EyedropUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: EyedropScalarWhereInput | EyedropScalarWhereInput[]
  }

  export type EyesUpdateOneWithoutRightEyeNestedInput = {
    create?: XOR<EyesCreateWithoutRightEyeInput, EyesUncheckedCreateWithoutRightEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutRightEyeInput
    upsert?: EyesUpsertWithoutRightEyeInput
    disconnect?: EyesWhereInput | boolean
    delete?: EyesWhereInput | boolean
    connect?: EyesWhereUniqueInput
    update?: XOR<XOR<EyesUpdateToOneWithWhereWithoutRightEyeInput, EyesUpdateWithoutRightEyeInput>, EyesUncheckedUpdateWithoutRightEyeInput>
  }

  export type EyesUpdateOneWithoutLeftEyeNestedInput = {
    create?: XOR<EyesCreateWithoutLeftEyeInput, EyesUncheckedCreateWithoutLeftEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutLeftEyeInput
    upsert?: EyesUpsertWithoutLeftEyeInput
    disconnect?: EyesWhereInput | boolean
    delete?: EyesWhereInput | boolean
    connect?: EyesWhereUniqueInput
    update?: XOR<XOR<EyesUpdateToOneWithWhereWithoutLeftEyeInput, EyesUpdateWithoutLeftEyeInput>, EyesUncheckedUpdateWithoutLeftEyeInput>
  }

  export type EyeLogUncheckedUpdateManyWithoutEyeNestedInput = {
    create?: XOR<EyeLogCreateWithoutEyeInput, EyeLogUncheckedCreateWithoutEyeInput> | EyeLogCreateWithoutEyeInput[] | EyeLogUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeLogCreateOrConnectWithoutEyeInput | EyeLogCreateOrConnectWithoutEyeInput[]
    upsert?: EyeLogUpsertWithWhereUniqueWithoutEyeInput | EyeLogUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: EyeLogCreateManyEyeInputEnvelope
    set?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    disconnect?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    delete?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    connect?: EyeLogWhereUniqueInput | EyeLogWhereUniqueInput[]
    update?: EyeLogUpdateWithWhereUniqueWithoutEyeInput | EyeLogUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: EyeLogUpdateManyWithWhereWithoutEyeInput | EyeLogUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: EyeLogScalarWhereInput | EyeLogScalarWhereInput[]
  }

  export type RefractionUncheckedUpdateManyWithoutEyeNestedInput = {
    create?: XOR<RefractionCreateWithoutEyeInput, RefractionUncheckedCreateWithoutEyeInput> | RefractionCreateWithoutEyeInput[] | RefractionUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: RefractionCreateOrConnectWithoutEyeInput | RefractionCreateOrConnectWithoutEyeInput[]
    upsert?: RefractionUpsertWithWhereUniqueWithoutEyeInput | RefractionUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: RefractionCreateManyEyeInputEnvelope
    set?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    disconnect?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    delete?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    connect?: RefractionWhereUniqueInput | RefractionWhereUniqueInput[]
    update?: RefractionUpdateWithWhereUniqueWithoutEyeInput | RefractionUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: RefractionUpdateManyWithWhereWithoutEyeInput | RefractionUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: RefractionScalarWhereInput | RefractionScalarWhereInput[]
  }

  export type EyeSurgeryUncheckedUpdateManyWithoutEyeNestedInput = {
    create?: XOR<EyeSurgeryCreateWithoutEyeInput, EyeSurgeryUncheckedCreateWithoutEyeInput> | EyeSurgeryCreateWithoutEyeInput[] | EyeSurgeryUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyeSurgeryCreateOrConnectWithoutEyeInput | EyeSurgeryCreateOrConnectWithoutEyeInput[]
    upsert?: EyeSurgeryUpsertWithWhereUniqueWithoutEyeInput | EyeSurgeryUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: EyeSurgeryCreateManyEyeInputEnvelope
    set?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    disconnect?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    delete?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    connect?: EyeSurgeryWhereUniqueInput | EyeSurgeryWhereUniqueInput[]
    update?: EyeSurgeryUpdateWithWhereUniqueWithoutEyeInput | EyeSurgeryUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: EyeSurgeryUpdateManyWithWhereWithoutEyeInput | EyeSurgeryUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: EyeSurgeryScalarWhereInput | EyeSurgeryScalarWhereInput[]
  }

  export type EyedropUncheckedUpdateManyWithoutEyeNestedInput = {
    create?: XOR<EyedropCreateWithoutEyeInput, EyedropUncheckedCreateWithoutEyeInput> | EyedropCreateWithoutEyeInput[] | EyedropUncheckedCreateWithoutEyeInput[]
    connectOrCreate?: EyedropCreateOrConnectWithoutEyeInput | EyedropCreateOrConnectWithoutEyeInput[]
    upsert?: EyedropUpsertWithWhereUniqueWithoutEyeInput | EyedropUpsertWithWhereUniqueWithoutEyeInput[]
    createMany?: EyedropCreateManyEyeInputEnvelope
    set?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    disconnect?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    delete?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    connect?: EyedropWhereUniqueInput | EyedropWhereUniqueInput[]
    update?: EyedropUpdateWithWhereUniqueWithoutEyeInput | EyedropUpdateWithWhereUniqueWithoutEyeInput[]
    updateMany?: EyedropUpdateManyWithWhereWithoutEyeInput | EyedropUpdateManyWithWhereWithoutEyeInput[]
    deleteMany?: EyedropScalarWhereInput | EyedropScalarWhereInput[]
  }

  export type EyesUncheckedUpdateOneWithoutRightEyeNestedInput = {
    create?: XOR<EyesCreateWithoutRightEyeInput, EyesUncheckedCreateWithoutRightEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutRightEyeInput
    upsert?: EyesUpsertWithoutRightEyeInput
    disconnect?: EyesWhereInput | boolean
    delete?: EyesWhereInput | boolean
    connect?: EyesWhereUniqueInput
    update?: XOR<XOR<EyesUpdateToOneWithWhereWithoutRightEyeInput, EyesUpdateWithoutRightEyeInput>, EyesUncheckedUpdateWithoutRightEyeInput>
  }

  export type EyesUncheckedUpdateOneWithoutLeftEyeNestedInput = {
    create?: XOR<EyesCreateWithoutLeftEyeInput, EyesUncheckedCreateWithoutLeftEyeInput>
    connectOrCreate?: EyesCreateOrConnectWithoutLeftEyeInput
    upsert?: EyesUpsertWithoutLeftEyeInput
    disconnect?: EyesWhereInput | boolean
    delete?: EyesWhereInput | boolean
    connect?: EyesWhereUniqueInput
    update?: XOR<XOR<EyesUpdateToOneWithWhereWithoutLeftEyeInput, EyesUpdateWithoutLeftEyeInput>, EyesUncheckedUpdateWithoutLeftEyeInput>
  }

  export type EyeCreateNestedOneWithoutLogsInput = {
    create?: XOR<EyeCreateWithoutLogsInput, EyeUncheckedCreateWithoutLogsInput>
    connectOrCreate?: EyeCreateOrConnectWithoutLogsInput
    connect?: EyeWhereUniqueInput
  }

  export type EnumEyeLogTypeFieldUpdateOperationsInput = {
    set?: $Enums.EyeLogType
  }

  export type EyeUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<EyeCreateWithoutLogsInput, EyeUncheckedCreateWithoutLogsInput>
    connectOrCreate?: EyeCreateOrConnectWithoutLogsInput
    upsert?: EyeUpsertWithoutLogsInput
    connect?: EyeWhereUniqueInput
    update?: XOR<XOR<EyeUpdateToOneWithWhereWithoutLogsInput, EyeUpdateWithoutLogsInput>, EyeUncheckedUpdateWithoutLogsInput>
  }

  export type EyeCreateNestedOneWithoutRefractionInput = {
    create?: XOR<EyeCreateWithoutRefractionInput, EyeUncheckedCreateWithoutRefractionInput>
    connectOrCreate?: EyeCreateOrConnectWithoutRefractionInput
    connect?: EyeWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EyeUpdateOneRequiredWithoutRefractionNestedInput = {
    create?: XOR<EyeCreateWithoutRefractionInput, EyeUncheckedCreateWithoutRefractionInput>
    connectOrCreate?: EyeCreateOrConnectWithoutRefractionInput
    upsert?: EyeUpsertWithoutRefractionInput
    connect?: EyeWhereUniqueInput
    update?: XOR<XOR<EyeUpdateToOneWithWhereWithoutRefractionInput, EyeUpdateWithoutRefractionInput>, EyeUncheckedUpdateWithoutRefractionInput>
  }

  export type EyeCreateNestedOneWithoutSurgeriesInput = {
    create?: XOR<EyeCreateWithoutSurgeriesInput, EyeUncheckedCreateWithoutSurgeriesInput>
    connectOrCreate?: EyeCreateOrConnectWithoutSurgeriesInput
    connect?: EyeWhereUniqueInput
  }

  export type EyeUpdateOneRequiredWithoutSurgeriesNestedInput = {
    create?: XOR<EyeCreateWithoutSurgeriesInput, EyeUncheckedCreateWithoutSurgeriesInput>
    connectOrCreate?: EyeCreateOrConnectWithoutSurgeriesInput
    upsert?: EyeUpsertWithoutSurgeriesInput
    connect?: EyeWhereUniqueInput
    update?: XOR<XOR<EyeUpdateToOneWithWhereWithoutSurgeriesInput, EyeUpdateWithoutSurgeriesInput>, EyeUncheckedUpdateWithoutSurgeriesInput>
  }

  export type EyeCreateNestedOneWithoutEyedropsInput = {
    create?: XOR<EyeCreateWithoutEyedropsInput, EyeUncheckedCreateWithoutEyedropsInput>
    connectOrCreate?: EyeCreateOrConnectWithoutEyedropsInput
    connect?: EyeWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EyeUpdateOneRequiredWithoutEyedropsNestedInput = {
    create?: XOR<EyeCreateWithoutEyedropsInput, EyeUncheckedCreateWithoutEyedropsInput>
    connectOrCreate?: EyeCreateOrConnectWithoutEyedropsInput
    upsert?: EyeUpsertWithoutEyedropsInput
    connect?: EyeWhereUniqueInput
    update?: XOR<XOR<EyeUpdateToOneWithWhereWithoutEyedropsInput, EyeUpdateWithoutEyedropsInput>, EyeUncheckedUpdateWithoutEyedropsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEyeLogTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.EyeLogType | EnumEyeLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEyeLogTypeFilter<$PrismaModel> | $Enums.EyeLogType
  }

  export type NestedEnumEyeLogTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EyeLogType | EnumEyeLogTypeFieldRefInput<$PrismaModel>
    in?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.EyeLogType[] | ListEnumEyeLogTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumEyeLogTypeWithAggregatesFilter<$PrismaModel> | $Enums.EyeLogType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEyeLogTypeFilter<$PrismaModel>
    _max?: NestedEnumEyeLogTypeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EvaluationCreateWithoutPatientInput = {
    id?: string
    done?: boolean
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesCreateNestedOneWithoutEvaluationInput
    collaborator: CollaboratorCreateNestedOneWithoutEvaluationsInput
    clinic?: ClinicCreateNestedOneWithoutEvaluationsInput
  }

  export type EvaluationUncheckedCreateWithoutPatientInput = {
    id?: string
    collaboratorId: string
    done?: boolean
    clinicId?: string | null
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesUncheckedCreateNestedOneWithoutEvaluationInput
  }

  export type EvaluationCreateOrConnectWithoutPatientInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutPatientInput, EvaluationUncheckedCreateWithoutPatientInput>
  }

  export type EvaluationCreateManyPatientInputEnvelope = {
    data: EvaluationCreateManyPatientInput | EvaluationCreateManyPatientInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationUpsertWithWhereUniqueWithoutPatientInput = {
    where: EvaluationWhereUniqueInput
    update: XOR<EvaluationUpdateWithoutPatientInput, EvaluationUncheckedUpdateWithoutPatientInput>
    create: XOR<EvaluationCreateWithoutPatientInput, EvaluationUncheckedCreateWithoutPatientInput>
  }

  export type EvaluationUpdateWithWhereUniqueWithoutPatientInput = {
    where: EvaluationWhereUniqueInput
    data: XOR<EvaluationUpdateWithoutPatientInput, EvaluationUncheckedUpdateWithoutPatientInput>
  }

  export type EvaluationUpdateManyWithWhereWithoutPatientInput = {
    where: EvaluationScalarWhereInput
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyWithoutPatientInput>
  }

  export type EvaluationScalarWhereInput = {
    AND?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
    OR?: EvaluationScalarWhereInput[]
    NOT?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
    id?: StringFilter<"Evaluation"> | string
    patientId?: StringFilter<"Evaluation"> | string
    collaboratorId?: StringFilter<"Evaluation"> | string
    done?: BoolFilter<"Evaluation"> | boolean
    clinicId?: StringNullableFilter<"Evaluation"> | string | null
    clinicalData?: StringNullableFilter<"Evaluation"> | string | null
    continuousData?: StringNullableFilter<"Evaluation"> | string | null
    diagnosis?: StringNullableFilter<"Evaluation"> | string | null
    treatment?: StringNullableFilter<"Evaluation"> | string | null
    followUp?: StringNullableFilter<"Evaluation"> | string | null
    nextAppointment?: StringNullableFilter<"Evaluation"> | string | null
    createdAt?: DateTimeFilter<"Evaluation"> | Date | string
    updatedAt?: DateTimeFilter<"Evaluation"> | Date | string
  }

  export type ClinicCollaboratorCreateWithoutClinicInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborator: CollaboratorCreateNestedOneWithoutClinicsInput
  }

  export type ClinicCollaboratorUncheckedCreateWithoutClinicInput = {
    collaboratorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicCollaboratorCreateOrConnectWithoutClinicInput = {
    where: ClinicCollaboratorWhereUniqueInput
    create: XOR<ClinicCollaboratorCreateWithoutClinicInput, ClinicCollaboratorUncheckedCreateWithoutClinicInput>
  }

  export type ClinicCollaboratorCreateManyClinicInputEnvelope = {
    data: ClinicCollaboratorCreateManyClinicInput | ClinicCollaboratorCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationCreateWithoutClinicInput = {
    id?: string
    done?: boolean
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesCreateNestedOneWithoutEvaluationInput
    patient: PatientCreateNestedOneWithoutEvaluationsInput
    collaborator: CollaboratorCreateNestedOneWithoutEvaluationsInput
  }

  export type EvaluationUncheckedCreateWithoutClinicInput = {
    id?: string
    patientId: string
    collaboratorId: string
    done?: boolean
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesUncheckedCreateNestedOneWithoutEvaluationInput
  }

  export type EvaluationCreateOrConnectWithoutClinicInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutClinicInput, EvaluationUncheckedCreateWithoutClinicInput>
  }

  export type EvaluationCreateManyClinicInputEnvelope = {
    data: EvaluationCreateManyClinicInput | EvaluationCreateManyClinicInput[]
    skipDuplicates?: boolean
  }

  export type ClinicCollaboratorUpsertWithWhereUniqueWithoutClinicInput = {
    where: ClinicCollaboratorWhereUniqueInput
    update: XOR<ClinicCollaboratorUpdateWithoutClinicInput, ClinicCollaboratorUncheckedUpdateWithoutClinicInput>
    create: XOR<ClinicCollaboratorCreateWithoutClinicInput, ClinicCollaboratorUncheckedCreateWithoutClinicInput>
  }

  export type ClinicCollaboratorUpdateWithWhereUniqueWithoutClinicInput = {
    where: ClinicCollaboratorWhereUniqueInput
    data: XOR<ClinicCollaboratorUpdateWithoutClinicInput, ClinicCollaboratorUncheckedUpdateWithoutClinicInput>
  }

  export type ClinicCollaboratorUpdateManyWithWhereWithoutClinicInput = {
    where: ClinicCollaboratorScalarWhereInput
    data: XOR<ClinicCollaboratorUpdateManyMutationInput, ClinicCollaboratorUncheckedUpdateManyWithoutClinicInput>
  }

  export type ClinicCollaboratorScalarWhereInput = {
    AND?: ClinicCollaboratorScalarWhereInput | ClinicCollaboratorScalarWhereInput[]
    OR?: ClinicCollaboratorScalarWhereInput[]
    NOT?: ClinicCollaboratorScalarWhereInput | ClinicCollaboratorScalarWhereInput[]
    clinicId?: StringFilter<"ClinicCollaborator"> | string
    collaboratorId?: StringFilter<"ClinicCollaborator"> | string
    createdAt?: DateTimeFilter<"ClinicCollaborator"> | Date | string
    updatedAt?: DateTimeFilter<"ClinicCollaborator"> | Date | string
  }

  export type EvaluationUpsertWithWhereUniqueWithoutClinicInput = {
    where: EvaluationWhereUniqueInput
    update: XOR<EvaluationUpdateWithoutClinicInput, EvaluationUncheckedUpdateWithoutClinicInput>
    create: XOR<EvaluationCreateWithoutClinicInput, EvaluationUncheckedCreateWithoutClinicInput>
  }

  export type EvaluationUpdateWithWhereUniqueWithoutClinicInput = {
    where: EvaluationWhereUniqueInput
    data: XOR<EvaluationUpdateWithoutClinicInput, EvaluationUncheckedUpdateWithoutClinicInput>
  }

  export type EvaluationUpdateManyWithWhereWithoutClinicInput = {
    where: EvaluationScalarWhereInput
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyWithoutClinicInput>
  }

  export type ClinicCollaboratorCreateWithoutCollaboratorInput = {
    createdAt?: Date | string
    updatedAt?: Date | string
    clinic: ClinicCreateNestedOneWithoutCollaboratorsInput
  }

  export type ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput = {
    clinicId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicCollaboratorCreateOrConnectWithoutCollaboratorInput = {
    where: ClinicCollaboratorWhereUniqueInput
    create: XOR<ClinicCollaboratorCreateWithoutCollaboratorInput, ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput>
  }

  export type ClinicCollaboratorCreateManyCollaboratorInputEnvelope = {
    data: ClinicCollaboratorCreateManyCollaboratorInput | ClinicCollaboratorCreateManyCollaboratorInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationCreateWithoutCollaboratorInput = {
    id?: string
    done?: boolean
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesCreateNestedOneWithoutEvaluationInput
    patient: PatientCreateNestedOneWithoutEvaluationsInput
    clinic?: ClinicCreateNestedOneWithoutEvaluationsInput
  }

  export type EvaluationUncheckedCreateWithoutCollaboratorInput = {
    id?: string
    patientId: string
    done?: boolean
    clinicId?: string | null
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    eyes?: EyesUncheckedCreateNestedOneWithoutEvaluationInput
  }

  export type EvaluationCreateOrConnectWithoutCollaboratorInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutCollaboratorInput, EvaluationUncheckedCreateWithoutCollaboratorInput>
  }

  export type EvaluationCreateManyCollaboratorInputEnvelope = {
    data: EvaluationCreateManyCollaboratorInput | EvaluationCreateManyCollaboratorInput[]
    skipDuplicates?: boolean
  }

  export type ClinicCollaboratorUpsertWithWhereUniqueWithoutCollaboratorInput = {
    where: ClinicCollaboratorWhereUniqueInput
    update: XOR<ClinicCollaboratorUpdateWithoutCollaboratorInput, ClinicCollaboratorUncheckedUpdateWithoutCollaboratorInput>
    create: XOR<ClinicCollaboratorCreateWithoutCollaboratorInput, ClinicCollaboratorUncheckedCreateWithoutCollaboratorInput>
  }

  export type ClinicCollaboratorUpdateWithWhereUniqueWithoutCollaboratorInput = {
    where: ClinicCollaboratorWhereUniqueInput
    data: XOR<ClinicCollaboratorUpdateWithoutCollaboratorInput, ClinicCollaboratorUncheckedUpdateWithoutCollaboratorInput>
  }

  export type ClinicCollaboratorUpdateManyWithWhereWithoutCollaboratorInput = {
    where: ClinicCollaboratorScalarWhereInput
    data: XOR<ClinicCollaboratorUpdateManyMutationInput, ClinicCollaboratorUncheckedUpdateManyWithoutCollaboratorInput>
  }

  export type EvaluationUpsertWithWhereUniqueWithoutCollaboratorInput = {
    where: EvaluationWhereUniqueInput
    update: XOR<EvaluationUpdateWithoutCollaboratorInput, EvaluationUncheckedUpdateWithoutCollaboratorInput>
    create: XOR<EvaluationCreateWithoutCollaboratorInput, EvaluationUncheckedCreateWithoutCollaboratorInput>
  }

  export type EvaluationUpdateWithWhereUniqueWithoutCollaboratorInput = {
    where: EvaluationWhereUniqueInput
    data: XOR<EvaluationUpdateWithoutCollaboratorInput, EvaluationUncheckedUpdateWithoutCollaboratorInput>
  }

  export type EvaluationUpdateManyWithWhereWithoutCollaboratorInput = {
    where: EvaluationScalarWhereInput
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyWithoutCollaboratorInput>
  }

  export type ClinicCreateWithoutCollaboratorsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluations?: EvaluationCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutCollaboratorsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutCollaboratorsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutCollaboratorsInput, ClinicUncheckedCreateWithoutCollaboratorsInput>
  }

  export type CollaboratorCreateWithoutClinicsInput = {
    id?: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluations?: EvaluationCreateNestedManyWithoutCollaboratorInput
  }

  export type CollaboratorUncheckedCreateWithoutClinicsInput = {
    id?: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutCollaboratorInput
  }

  export type CollaboratorCreateOrConnectWithoutClinicsInput = {
    where: CollaboratorWhereUniqueInput
    create: XOR<CollaboratorCreateWithoutClinicsInput, CollaboratorUncheckedCreateWithoutClinicsInput>
  }

  export type ClinicUpsertWithoutCollaboratorsInput = {
    update: XOR<ClinicUpdateWithoutCollaboratorsInput, ClinicUncheckedUpdateWithoutCollaboratorsInput>
    create: XOR<ClinicCreateWithoutCollaboratorsInput, ClinicUncheckedCreateWithoutCollaboratorsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutCollaboratorsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutCollaboratorsInput, ClinicUncheckedUpdateWithoutCollaboratorsInput>
  }

  export type ClinicUpdateWithoutCollaboratorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: EvaluationUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutCollaboratorsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: EvaluationUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type CollaboratorUpsertWithoutClinicsInput = {
    update: XOR<CollaboratorUpdateWithoutClinicsInput, CollaboratorUncheckedUpdateWithoutClinicsInput>
    create: XOR<CollaboratorCreateWithoutClinicsInput, CollaboratorUncheckedCreateWithoutClinicsInput>
    where?: CollaboratorWhereInput
  }

  export type CollaboratorUpdateToOneWithWhereWithoutClinicsInput = {
    where?: CollaboratorWhereInput
    data: XOR<CollaboratorUpdateWithoutClinicsInput, CollaboratorUncheckedUpdateWithoutClinicsInput>
  }

  export type CollaboratorUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: EvaluationUpdateManyWithoutCollaboratorNestedInput
  }

  export type CollaboratorUncheckedUpdateWithoutClinicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: EvaluationUncheckedUpdateManyWithoutCollaboratorNestedInput
  }

  export type EyesCreateWithoutEvaluationInput = {
    id?: string
    rightEye: EyeCreateNestedOneWithoutRightEyeInput
    leftEye: EyeCreateNestedOneWithoutLeftEyeInput
  }

  export type EyesUncheckedCreateWithoutEvaluationInput = {
    id?: string
    rightEyeId: string
    leftEyeId: string
  }

  export type EyesCreateOrConnectWithoutEvaluationInput = {
    where: EyesWhereUniqueInput
    create: XOR<EyesCreateWithoutEvaluationInput, EyesUncheckedCreateWithoutEvaluationInput>
  }

  export type PatientCreateWithoutEvaluationsInput = {
    id?: string
    refId: string
    name: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientUncheckedCreateWithoutEvaluationsInput = {
    id?: string
    refId: string
    name: string
    birthDate: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PatientCreateOrConnectWithoutEvaluationsInput = {
    where: PatientWhereUniqueInput
    create: XOR<PatientCreateWithoutEvaluationsInput, PatientUncheckedCreateWithoutEvaluationsInput>
  }

  export type CollaboratorCreateWithoutEvaluationsInput = {
    id?: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicCollaboratorCreateNestedManyWithoutCollaboratorInput
  }

  export type CollaboratorUncheckedCreateWithoutEvaluationsInput = {
    id?: string
    name: string
    crm: string
    role: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    clinics?: ClinicCollaboratorUncheckedCreateNestedManyWithoutCollaboratorInput
  }

  export type CollaboratorCreateOrConnectWithoutEvaluationsInput = {
    where: CollaboratorWhereUniqueInput
    create: XOR<CollaboratorCreateWithoutEvaluationsInput, CollaboratorUncheckedCreateWithoutEvaluationsInput>
  }

  export type ClinicCreateWithoutEvaluationsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: ClinicCollaboratorCreateNestedManyWithoutClinicInput
  }

  export type ClinicUncheckedCreateWithoutEvaluationsInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    collaborators?: ClinicCollaboratorUncheckedCreateNestedManyWithoutClinicInput
  }

  export type ClinicCreateOrConnectWithoutEvaluationsInput = {
    where: ClinicWhereUniqueInput
    create: XOR<ClinicCreateWithoutEvaluationsInput, ClinicUncheckedCreateWithoutEvaluationsInput>
  }

  export type EyesUpsertWithoutEvaluationInput = {
    update: XOR<EyesUpdateWithoutEvaluationInput, EyesUncheckedUpdateWithoutEvaluationInput>
    create: XOR<EyesCreateWithoutEvaluationInput, EyesUncheckedCreateWithoutEvaluationInput>
    where?: EyesWhereInput
  }

  export type EyesUpdateToOneWithWhereWithoutEvaluationInput = {
    where?: EyesWhereInput
    data: XOR<EyesUpdateWithoutEvaluationInput, EyesUncheckedUpdateWithoutEvaluationInput>
  }

  export type EyesUpdateWithoutEvaluationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rightEye?: EyeUpdateOneRequiredWithoutRightEyeNestedInput
    leftEye?: EyeUpdateOneRequiredWithoutLeftEyeNestedInput
  }

  export type EyesUncheckedUpdateWithoutEvaluationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rightEyeId?: StringFieldUpdateOperationsInput | string
    leftEyeId?: StringFieldUpdateOperationsInput | string
  }

  export type PatientUpsertWithoutEvaluationsInput = {
    update: XOR<PatientUpdateWithoutEvaluationsInput, PatientUncheckedUpdateWithoutEvaluationsInput>
    create: XOR<PatientCreateWithoutEvaluationsInput, PatientUncheckedCreateWithoutEvaluationsInput>
    where?: PatientWhereInput
  }

  export type PatientUpdateToOneWithWhereWithoutEvaluationsInput = {
    where?: PatientWhereInput
    data: XOR<PatientUpdateWithoutEvaluationsInput, PatientUncheckedUpdateWithoutEvaluationsInput>
  }

  export type PatientUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    refId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PatientUncheckedUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    refId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CollaboratorUpsertWithoutEvaluationsInput = {
    update: XOR<CollaboratorUpdateWithoutEvaluationsInput, CollaboratorUncheckedUpdateWithoutEvaluationsInput>
    create: XOR<CollaboratorCreateWithoutEvaluationsInput, CollaboratorUncheckedCreateWithoutEvaluationsInput>
    where?: CollaboratorWhereInput
  }

  export type CollaboratorUpdateToOneWithWhereWithoutEvaluationsInput = {
    where?: CollaboratorWhereInput
    data: XOR<CollaboratorUpdateWithoutEvaluationsInput, CollaboratorUncheckedUpdateWithoutEvaluationsInput>
  }

  export type CollaboratorUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicCollaboratorUpdateManyWithoutCollaboratorNestedInput
  }

  export type CollaboratorUncheckedUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    crm?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinics?: ClinicCollaboratorUncheckedUpdateManyWithoutCollaboratorNestedInput
  }

  export type ClinicUpsertWithoutEvaluationsInput = {
    update: XOR<ClinicUpdateWithoutEvaluationsInput, ClinicUncheckedUpdateWithoutEvaluationsInput>
    create: XOR<ClinicCreateWithoutEvaluationsInput, ClinicUncheckedCreateWithoutEvaluationsInput>
    where?: ClinicWhereInput
  }

  export type ClinicUpdateToOneWithWhereWithoutEvaluationsInput = {
    where?: ClinicWhereInput
    data: XOR<ClinicUpdateWithoutEvaluationsInput, ClinicUncheckedUpdateWithoutEvaluationsInput>
  }

  export type ClinicUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: ClinicCollaboratorUpdateManyWithoutClinicNestedInput
  }

  export type ClinicUncheckedUpdateWithoutEvaluationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborators?: ClinicCollaboratorUncheckedUpdateManyWithoutClinicNestedInput
  }

  export type EyeCreateWithoutRightEyeInput = {
    id?: string
    logs?: EyeLogCreateNestedManyWithoutEyeInput
    refraction?: RefractionCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropCreateNestedManyWithoutEyeInput
    leftEye?: EyesCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeUncheckedCreateWithoutRightEyeInput = {
    id?: string
    logs?: EyeLogUncheckedCreateNestedManyWithoutEyeInput
    refraction?: RefractionUncheckedCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryUncheckedCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropUncheckedCreateNestedManyWithoutEyeInput
    leftEye?: EyesUncheckedCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeCreateOrConnectWithoutRightEyeInput = {
    where: EyeWhereUniqueInput
    create: XOR<EyeCreateWithoutRightEyeInput, EyeUncheckedCreateWithoutRightEyeInput>
  }

  export type EyeCreateWithoutLeftEyeInput = {
    id?: string
    logs?: EyeLogCreateNestedManyWithoutEyeInput
    refraction?: RefractionCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropCreateNestedManyWithoutEyeInput
    rightEye?: EyesCreateNestedOneWithoutRightEyeInput
  }

  export type EyeUncheckedCreateWithoutLeftEyeInput = {
    id?: string
    logs?: EyeLogUncheckedCreateNestedManyWithoutEyeInput
    refraction?: RefractionUncheckedCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryUncheckedCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropUncheckedCreateNestedManyWithoutEyeInput
    rightEye?: EyesUncheckedCreateNestedOneWithoutRightEyeInput
  }

  export type EyeCreateOrConnectWithoutLeftEyeInput = {
    where: EyeWhereUniqueInput
    create: XOR<EyeCreateWithoutLeftEyeInput, EyeUncheckedCreateWithoutLeftEyeInput>
  }

  export type EvaluationCreateWithoutEyesInput = {
    id?: string
    done?: boolean
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    patient: PatientCreateNestedOneWithoutEvaluationsInput
    collaborator: CollaboratorCreateNestedOneWithoutEvaluationsInput
    clinic?: ClinicCreateNestedOneWithoutEvaluationsInput
  }

  export type EvaluationUncheckedCreateWithoutEyesInput = {
    id?: string
    patientId: string
    collaboratorId: string
    done?: boolean
    clinicId?: string | null
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluationCreateOrConnectWithoutEyesInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutEyesInput, EvaluationUncheckedCreateWithoutEyesInput>
  }

  export type EyeUpsertWithoutRightEyeInput = {
    update: XOR<EyeUpdateWithoutRightEyeInput, EyeUncheckedUpdateWithoutRightEyeInput>
    create: XOR<EyeCreateWithoutRightEyeInput, EyeUncheckedCreateWithoutRightEyeInput>
    where?: EyeWhereInput
  }

  export type EyeUpdateToOneWithWhereWithoutRightEyeInput = {
    where?: EyeWhereInput
    data: XOR<EyeUpdateWithoutRightEyeInput, EyeUncheckedUpdateWithoutRightEyeInput>
  }

  export type EyeUpdateWithoutRightEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUpdateManyWithoutEyeNestedInput
    leftEye?: EyesUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeUncheckedUpdateWithoutRightEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUncheckedUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUncheckedUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUncheckedUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUncheckedUpdateManyWithoutEyeNestedInput
    leftEye?: EyesUncheckedUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeUpsertWithoutLeftEyeInput = {
    update: XOR<EyeUpdateWithoutLeftEyeInput, EyeUncheckedUpdateWithoutLeftEyeInput>
    create: XOR<EyeCreateWithoutLeftEyeInput, EyeUncheckedCreateWithoutLeftEyeInput>
    where?: EyeWhereInput
  }

  export type EyeUpdateToOneWithWhereWithoutLeftEyeInput = {
    where?: EyeWhereInput
    data: XOR<EyeUpdateWithoutLeftEyeInput, EyeUncheckedUpdateWithoutLeftEyeInput>
  }

  export type EyeUpdateWithoutLeftEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUpdateOneWithoutRightEyeNestedInput
  }

  export type EyeUncheckedUpdateWithoutLeftEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUncheckedUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUncheckedUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUncheckedUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUncheckedUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUncheckedUpdateOneWithoutRightEyeNestedInput
  }

  export type EvaluationUpsertWithoutEyesInput = {
    update: XOR<EvaluationUpdateWithoutEyesInput, EvaluationUncheckedUpdateWithoutEyesInput>
    create: XOR<EvaluationCreateWithoutEyesInput, EvaluationUncheckedCreateWithoutEyesInput>
    where?: EvaluationWhereInput
  }

  export type EvaluationUpdateToOneWithWhereWithoutEyesInput = {
    where?: EvaluationWhereInput
    data: XOR<EvaluationUpdateWithoutEyesInput, EvaluationUncheckedUpdateWithoutEyesInput>
  }

  export type EvaluationUpdateWithoutEyesInput = {
    id?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    patient?: PatientUpdateOneRequiredWithoutEvaluationsNestedInput
    collaborator?: CollaboratorUpdateOneRequiredWithoutEvaluationsNestedInput
    clinic?: ClinicUpdateOneWithoutEvaluationsNestedInput
  }

  export type EvaluationUncheckedUpdateWithoutEyesInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeLogCreateWithoutEyeInput = {
    id?: string
    type: $Enums.EyeLogType
    details?: string | null
    recordedAt?: Date | string
  }

  export type EyeLogUncheckedCreateWithoutEyeInput = {
    id?: string
    type: $Enums.EyeLogType
    details?: string | null
    recordedAt?: Date | string
  }

  export type EyeLogCreateOrConnectWithoutEyeInput = {
    where: EyeLogWhereUniqueInput
    create: XOR<EyeLogCreateWithoutEyeInput, EyeLogUncheckedCreateWithoutEyeInput>
  }

  export type EyeLogCreateManyEyeInputEnvelope = {
    data: EyeLogCreateManyEyeInput | EyeLogCreateManyEyeInput[]
    skipDuplicates?: boolean
  }

  export type RefractionCreateWithoutEyeInput = {
    id?: string
    spherical?: number | null
    cylinder?: number | null
    axis?: number | null
    visualAcuity?: string | null
    recordedAt?: Date | string
  }

  export type RefractionUncheckedCreateWithoutEyeInput = {
    id?: string
    spherical?: number | null
    cylinder?: number | null
    axis?: number | null
    visualAcuity?: string | null
    recordedAt?: Date | string
  }

  export type RefractionCreateOrConnectWithoutEyeInput = {
    where: RefractionWhereUniqueInput
    create: XOR<RefractionCreateWithoutEyeInput, RefractionUncheckedCreateWithoutEyeInput>
  }

  export type RefractionCreateManyEyeInputEnvelope = {
    data: RefractionCreateManyEyeInput | RefractionCreateManyEyeInput[]
    skipDuplicates?: boolean
  }

  export type EyeSurgeryCreateWithoutEyeInput = {
    id?: string
    procedure: string
    date: Date | string
    notes?: string | null
  }

  export type EyeSurgeryUncheckedCreateWithoutEyeInput = {
    id?: string
    procedure: string
    date: Date | string
    notes?: string | null
  }

  export type EyeSurgeryCreateOrConnectWithoutEyeInput = {
    where: EyeSurgeryWhereUniqueInput
    create: XOR<EyeSurgeryCreateWithoutEyeInput, EyeSurgeryUncheckedCreateWithoutEyeInput>
  }

  export type EyeSurgeryCreateManyEyeInputEnvelope = {
    data: EyeSurgeryCreateManyEyeInput | EyeSurgeryCreateManyEyeInput[]
    skipDuplicates?: boolean
  }

  export type EyedropCreateWithoutEyeInput = {
    id?: string
    name: string
    dosage?: string | null
    startDate?: Date | string | null
    notes?: string | null
  }

  export type EyedropUncheckedCreateWithoutEyeInput = {
    id?: string
    name: string
    dosage?: string | null
    startDate?: Date | string | null
    notes?: string | null
  }

  export type EyedropCreateOrConnectWithoutEyeInput = {
    where: EyedropWhereUniqueInput
    create: XOR<EyedropCreateWithoutEyeInput, EyedropUncheckedCreateWithoutEyeInput>
  }

  export type EyedropCreateManyEyeInputEnvelope = {
    data: EyedropCreateManyEyeInput | EyedropCreateManyEyeInput[]
    skipDuplicates?: boolean
  }

  export type EyesCreateWithoutRightEyeInput = {
    id?: string
    leftEye: EyeCreateNestedOneWithoutLeftEyeInput
    evaluation: EvaluationCreateNestedOneWithoutEyesInput
  }

  export type EyesUncheckedCreateWithoutRightEyeInput = {
    id?: string
    evaluationId: string
    leftEyeId: string
  }

  export type EyesCreateOrConnectWithoutRightEyeInput = {
    where: EyesWhereUniqueInput
    create: XOR<EyesCreateWithoutRightEyeInput, EyesUncheckedCreateWithoutRightEyeInput>
  }

  export type EyesCreateWithoutLeftEyeInput = {
    id?: string
    rightEye: EyeCreateNestedOneWithoutRightEyeInput
    evaluation: EvaluationCreateNestedOneWithoutEyesInput
  }

  export type EyesUncheckedCreateWithoutLeftEyeInput = {
    id?: string
    evaluationId: string
    rightEyeId: string
  }

  export type EyesCreateOrConnectWithoutLeftEyeInput = {
    where: EyesWhereUniqueInput
    create: XOR<EyesCreateWithoutLeftEyeInput, EyesUncheckedCreateWithoutLeftEyeInput>
  }

  export type EyeLogUpsertWithWhereUniqueWithoutEyeInput = {
    where: EyeLogWhereUniqueInput
    update: XOR<EyeLogUpdateWithoutEyeInput, EyeLogUncheckedUpdateWithoutEyeInput>
    create: XOR<EyeLogCreateWithoutEyeInput, EyeLogUncheckedCreateWithoutEyeInput>
  }

  export type EyeLogUpdateWithWhereUniqueWithoutEyeInput = {
    where: EyeLogWhereUniqueInput
    data: XOR<EyeLogUpdateWithoutEyeInput, EyeLogUncheckedUpdateWithoutEyeInput>
  }

  export type EyeLogUpdateManyWithWhereWithoutEyeInput = {
    where: EyeLogScalarWhereInput
    data: XOR<EyeLogUpdateManyMutationInput, EyeLogUncheckedUpdateManyWithoutEyeInput>
  }

  export type EyeLogScalarWhereInput = {
    AND?: EyeLogScalarWhereInput | EyeLogScalarWhereInput[]
    OR?: EyeLogScalarWhereInput[]
    NOT?: EyeLogScalarWhereInput | EyeLogScalarWhereInput[]
    id?: StringFilter<"EyeLog"> | string
    type?: EnumEyeLogTypeFilter<"EyeLog"> | $Enums.EyeLogType
    eyeId?: StringFilter<"EyeLog"> | string
    details?: StringNullableFilter<"EyeLog"> | string | null
    recordedAt?: DateTimeFilter<"EyeLog"> | Date | string
  }

  export type RefractionUpsertWithWhereUniqueWithoutEyeInput = {
    where: RefractionWhereUniqueInput
    update: XOR<RefractionUpdateWithoutEyeInput, RefractionUncheckedUpdateWithoutEyeInput>
    create: XOR<RefractionCreateWithoutEyeInput, RefractionUncheckedCreateWithoutEyeInput>
  }

  export type RefractionUpdateWithWhereUniqueWithoutEyeInput = {
    where: RefractionWhereUniqueInput
    data: XOR<RefractionUpdateWithoutEyeInput, RefractionUncheckedUpdateWithoutEyeInput>
  }

  export type RefractionUpdateManyWithWhereWithoutEyeInput = {
    where: RefractionScalarWhereInput
    data: XOR<RefractionUpdateManyMutationInput, RefractionUncheckedUpdateManyWithoutEyeInput>
  }

  export type RefractionScalarWhereInput = {
    AND?: RefractionScalarWhereInput | RefractionScalarWhereInput[]
    OR?: RefractionScalarWhereInput[]
    NOT?: RefractionScalarWhereInput | RefractionScalarWhereInput[]
    id?: StringFilter<"Refraction"> | string
    eyeId?: StringFilter<"Refraction"> | string
    spherical?: FloatNullableFilter<"Refraction"> | number | null
    cylinder?: FloatNullableFilter<"Refraction"> | number | null
    axis?: FloatNullableFilter<"Refraction"> | number | null
    visualAcuity?: StringNullableFilter<"Refraction"> | string | null
    recordedAt?: DateTimeFilter<"Refraction"> | Date | string
  }

  export type EyeSurgeryUpsertWithWhereUniqueWithoutEyeInput = {
    where: EyeSurgeryWhereUniqueInput
    update: XOR<EyeSurgeryUpdateWithoutEyeInput, EyeSurgeryUncheckedUpdateWithoutEyeInput>
    create: XOR<EyeSurgeryCreateWithoutEyeInput, EyeSurgeryUncheckedCreateWithoutEyeInput>
  }

  export type EyeSurgeryUpdateWithWhereUniqueWithoutEyeInput = {
    where: EyeSurgeryWhereUniqueInput
    data: XOR<EyeSurgeryUpdateWithoutEyeInput, EyeSurgeryUncheckedUpdateWithoutEyeInput>
  }

  export type EyeSurgeryUpdateManyWithWhereWithoutEyeInput = {
    where: EyeSurgeryScalarWhereInput
    data: XOR<EyeSurgeryUpdateManyMutationInput, EyeSurgeryUncheckedUpdateManyWithoutEyeInput>
  }

  export type EyeSurgeryScalarWhereInput = {
    AND?: EyeSurgeryScalarWhereInput | EyeSurgeryScalarWhereInput[]
    OR?: EyeSurgeryScalarWhereInput[]
    NOT?: EyeSurgeryScalarWhereInput | EyeSurgeryScalarWhereInput[]
    id?: StringFilter<"EyeSurgery"> | string
    eyeId?: StringFilter<"EyeSurgery"> | string
    procedure?: StringFilter<"EyeSurgery"> | string
    date?: DateTimeFilter<"EyeSurgery"> | Date | string
    notes?: StringNullableFilter<"EyeSurgery"> | string | null
  }

  export type EyedropUpsertWithWhereUniqueWithoutEyeInput = {
    where: EyedropWhereUniqueInput
    update: XOR<EyedropUpdateWithoutEyeInput, EyedropUncheckedUpdateWithoutEyeInput>
    create: XOR<EyedropCreateWithoutEyeInput, EyedropUncheckedCreateWithoutEyeInput>
  }

  export type EyedropUpdateWithWhereUniqueWithoutEyeInput = {
    where: EyedropWhereUniqueInput
    data: XOR<EyedropUpdateWithoutEyeInput, EyedropUncheckedUpdateWithoutEyeInput>
  }

  export type EyedropUpdateManyWithWhereWithoutEyeInput = {
    where: EyedropScalarWhereInput
    data: XOR<EyedropUpdateManyMutationInput, EyedropUncheckedUpdateManyWithoutEyeInput>
  }

  export type EyedropScalarWhereInput = {
    AND?: EyedropScalarWhereInput | EyedropScalarWhereInput[]
    OR?: EyedropScalarWhereInput[]
    NOT?: EyedropScalarWhereInput | EyedropScalarWhereInput[]
    id?: StringFilter<"Eyedrop"> | string
    eyeId?: StringFilter<"Eyedrop"> | string
    name?: StringFilter<"Eyedrop"> | string
    dosage?: StringNullableFilter<"Eyedrop"> | string | null
    startDate?: DateTimeNullableFilter<"Eyedrop"> | Date | string | null
    notes?: StringNullableFilter<"Eyedrop"> | string | null
  }

  export type EyesUpsertWithoutRightEyeInput = {
    update: XOR<EyesUpdateWithoutRightEyeInput, EyesUncheckedUpdateWithoutRightEyeInput>
    create: XOR<EyesCreateWithoutRightEyeInput, EyesUncheckedCreateWithoutRightEyeInput>
    where?: EyesWhereInput
  }

  export type EyesUpdateToOneWithWhereWithoutRightEyeInput = {
    where?: EyesWhereInput
    data: XOR<EyesUpdateWithoutRightEyeInput, EyesUncheckedUpdateWithoutRightEyeInput>
  }

  export type EyesUpdateWithoutRightEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    leftEye?: EyeUpdateOneRequiredWithoutLeftEyeNestedInput
    evaluation?: EvaluationUpdateOneRequiredWithoutEyesNestedInput
  }

  export type EyesUncheckedUpdateWithoutRightEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluationId?: StringFieldUpdateOperationsInput | string
    leftEyeId?: StringFieldUpdateOperationsInput | string
  }

  export type EyesUpsertWithoutLeftEyeInput = {
    update: XOR<EyesUpdateWithoutLeftEyeInput, EyesUncheckedUpdateWithoutLeftEyeInput>
    create: XOR<EyesCreateWithoutLeftEyeInput, EyesUncheckedCreateWithoutLeftEyeInput>
    where?: EyesWhereInput
  }

  export type EyesUpdateToOneWithWhereWithoutLeftEyeInput = {
    where?: EyesWhereInput
    data: XOR<EyesUpdateWithoutLeftEyeInput, EyesUncheckedUpdateWithoutLeftEyeInput>
  }

  export type EyesUpdateWithoutLeftEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    rightEye?: EyeUpdateOneRequiredWithoutRightEyeNestedInput
    evaluation?: EvaluationUpdateOneRequiredWithoutEyesNestedInput
  }

  export type EyesUncheckedUpdateWithoutLeftEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    evaluationId?: StringFieldUpdateOperationsInput | string
    rightEyeId?: StringFieldUpdateOperationsInput | string
  }

  export type EyeCreateWithoutLogsInput = {
    id?: string
    refraction?: RefractionCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropCreateNestedManyWithoutEyeInput
    rightEye?: EyesCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeUncheckedCreateWithoutLogsInput = {
    id?: string
    refraction?: RefractionUncheckedCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryUncheckedCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropUncheckedCreateNestedManyWithoutEyeInput
    rightEye?: EyesUncheckedCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesUncheckedCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeCreateOrConnectWithoutLogsInput = {
    where: EyeWhereUniqueInput
    create: XOR<EyeCreateWithoutLogsInput, EyeUncheckedCreateWithoutLogsInput>
  }

  export type EyeUpsertWithoutLogsInput = {
    update: XOR<EyeUpdateWithoutLogsInput, EyeUncheckedUpdateWithoutLogsInput>
    create: XOR<EyeCreateWithoutLogsInput, EyeUncheckedCreateWithoutLogsInput>
    where?: EyeWhereInput
  }

  export type EyeUpdateToOneWithWhereWithoutLogsInput = {
    where?: EyeWhereInput
    data: XOR<EyeUpdateWithoutLogsInput, EyeUncheckedUpdateWithoutLogsInput>
  }

  export type EyeUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    refraction?: RefractionUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeUncheckedUpdateWithoutLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    refraction?: RefractionUncheckedUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUncheckedUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUncheckedUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUncheckedUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUncheckedUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeCreateWithoutRefractionInput = {
    id?: string
    logs?: EyeLogCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropCreateNestedManyWithoutEyeInput
    rightEye?: EyesCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeUncheckedCreateWithoutRefractionInput = {
    id?: string
    logs?: EyeLogUncheckedCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryUncheckedCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropUncheckedCreateNestedManyWithoutEyeInput
    rightEye?: EyesUncheckedCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesUncheckedCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeCreateOrConnectWithoutRefractionInput = {
    where: EyeWhereUniqueInput
    create: XOR<EyeCreateWithoutRefractionInput, EyeUncheckedCreateWithoutRefractionInput>
  }

  export type EyeUpsertWithoutRefractionInput = {
    update: XOR<EyeUpdateWithoutRefractionInput, EyeUncheckedUpdateWithoutRefractionInput>
    create: XOR<EyeCreateWithoutRefractionInput, EyeUncheckedCreateWithoutRefractionInput>
    where?: EyeWhereInput
  }

  export type EyeUpdateToOneWithWhereWithoutRefractionInput = {
    where?: EyeWhereInput
    data: XOR<EyeUpdateWithoutRefractionInput, EyeUncheckedUpdateWithoutRefractionInput>
  }

  export type EyeUpdateWithoutRefractionInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeUncheckedUpdateWithoutRefractionInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUncheckedUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUncheckedUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUncheckedUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUncheckedUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUncheckedUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeCreateWithoutSurgeriesInput = {
    id?: string
    logs?: EyeLogCreateNestedManyWithoutEyeInput
    refraction?: RefractionCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropCreateNestedManyWithoutEyeInput
    rightEye?: EyesCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeUncheckedCreateWithoutSurgeriesInput = {
    id?: string
    logs?: EyeLogUncheckedCreateNestedManyWithoutEyeInput
    refraction?: RefractionUncheckedCreateNestedManyWithoutEyeInput
    eyedrops?: EyedropUncheckedCreateNestedManyWithoutEyeInput
    rightEye?: EyesUncheckedCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesUncheckedCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeCreateOrConnectWithoutSurgeriesInput = {
    where: EyeWhereUniqueInput
    create: XOR<EyeCreateWithoutSurgeriesInput, EyeUncheckedCreateWithoutSurgeriesInput>
  }

  export type EyeUpsertWithoutSurgeriesInput = {
    update: XOR<EyeUpdateWithoutSurgeriesInput, EyeUncheckedUpdateWithoutSurgeriesInput>
    create: XOR<EyeCreateWithoutSurgeriesInput, EyeUncheckedCreateWithoutSurgeriesInput>
    where?: EyeWhereInput
  }

  export type EyeUpdateToOneWithWhereWithoutSurgeriesInput = {
    where?: EyeWhereInput
    data: XOR<EyeUpdateWithoutSurgeriesInput, EyeUncheckedUpdateWithoutSurgeriesInput>
  }

  export type EyeUpdateWithoutSurgeriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeUncheckedUpdateWithoutSurgeriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUncheckedUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUncheckedUpdateManyWithoutEyeNestedInput
    eyedrops?: EyedropUncheckedUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUncheckedUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUncheckedUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeCreateWithoutEyedropsInput = {
    id?: string
    logs?: EyeLogCreateNestedManyWithoutEyeInput
    refraction?: RefractionCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryCreateNestedManyWithoutEyeInput
    rightEye?: EyesCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeUncheckedCreateWithoutEyedropsInput = {
    id?: string
    logs?: EyeLogUncheckedCreateNestedManyWithoutEyeInput
    refraction?: RefractionUncheckedCreateNestedManyWithoutEyeInput
    surgeries?: EyeSurgeryUncheckedCreateNestedManyWithoutEyeInput
    rightEye?: EyesUncheckedCreateNestedOneWithoutRightEyeInput
    leftEye?: EyesUncheckedCreateNestedOneWithoutLeftEyeInput
  }

  export type EyeCreateOrConnectWithoutEyedropsInput = {
    where: EyeWhereUniqueInput
    create: XOR<EyeCreateWithoutEyedropsInput, EyeUncheckedCreateWithoutEyedropsInput>
  }

  export type EyeUpsertWithoutEyedropsInput = {
    update: XOR<EyeUpdateWithoutEyedropsInput, EyeUncheckedUpdateWithoutEyedropsInput>
    create: XOR<EyeCreateWithoutEyedropsInput, EyeUncheckedCreateWithoutEyedropsInput>
    where?: EyeWhereInput
  }

  export type EyeUpdateToOneWithWhereWithoutEyedropsInput = {
    where?: EyeWhereInput
    data: XOR<EyeUpdateWithoutEyedropsInput, EyeUncheckedUpdateWithoutEyedropsInput>
  }

  export type EyeUpdateWithoutEyedropsInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUpdateOneWithoutLeftEyeNestedInput
  }

  export type EyeUncheckedUpdateWithoutEyedropsInput = {
    id?: StringFieldUpdateOperationsInput | string
    logs?: EyeLogUncheckedUpdateManyWithoutEyeNestedInput
    refraction?: RefractionUncheckedUpdateManyWithoutEyeNestedInput
    surgeries?: EyeSurgeryUncheckedUpdateManyWithoutEyeNestedInput
    rightEye?: EyesUncheckedUpdateOneWithoutRightEyeNestedInput
    leftEye?: EyesUncheckedUpdateOneWithoutLeftEyeNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    isStaff?: boolean
    image?: string | null
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    isStaff?: boolean
    image?: string | null
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    isStaff?: boolean
    image?: string | null
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name?: string | null
    email?: string | null
    emailVerified?: Date | string | null
    isStaff?: boolean
    image?: string | null
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    emailVerified?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type AccountCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    type?: StringFilter<"Account"> | string
    provider?: StringFilter<"Account"> | string
    providerAccountId?: StringFilter<"Account"> | string
    refresh_token?: StringNullableFilter<"Account"> | string | null
    access_token?: StringNullableFilter<"Account"> | string | null
    expires_at?: IntNullableFilter<"Account"> | number | null
    token_type?: StringNullableFilter<"Account"> | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    id_token?: StringNullableFilter<"Account"> | string | null
    session_state?: StringNullableFilter<"Account"> | string | null
    refresh_token_expires_in?: IntNullableFilter<"Account"> | number | null
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    sessionToken?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    expires?: DateTimeFilter<"Session"> | Date | string
  }

  export type EvaluationCreateManyPatientInput = {
    id?: string
    collaboratorId: string
    done?: boolean
    clinicId?: string | null
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluationUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUpdateOneWithoutEvaluationNestedInput
    collaborator?: CollaboratorUpdateOneRequiredWithoutEvaluationsNestedInput
    clinic?: ClinicUpdateOneWithoutEvaluationsNestedInput
  }

  export type EvaluationUncheckedUpdateWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUncheckedUpdateOneWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateManyWithoutPatientInput = {
    id?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCollaboratorCreateManyClinicInput = {
    collaboratorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluationCreateManyClinicInput = {
    id?: string
    patientId: string
    collaboratorId: string
    done?: boolean
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicCollaboratorUpdateWithoutClinicInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    collaborator?: CollaboratorUpdateOneRequiredWithoutClinicsNestedInput
  }

  export type ClinicCollaboratorUncheckedUpdateWithoutClinicInput = {
    collaboratorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCollaboratorUncheckedUpdateManyWithoutClinicInput = {
    collaboratorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUpdateOneWithoutEvaluationNestedInput
    patient?: PatientUpdateOneRequiredWithoutEvaluationsNestedInput
    collaborator?: CollaboratorUpdateOneRequiredWithoutEvaluationsNestedInput
  }

  export type EvaluationUncheckedUpdateWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUncheckedUpdateOneWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateManyWithoutClinicInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    collaboratorId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCollaboratorCreateManyCollaboratorInput = {
    clinicId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type EvaluationCreateManyCollaboratorInput = {
    id?: string
    patientId: string
    done?: boolean
    clinicId?: string | null
    clinicalData?: string | null
    continuousData?: string | null
    diagnosis?: string | null
    treatment?: string | null
    followUp?: string | null
    nextAppointment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClinicCollaboratorUpdateWithoutCollaboratorInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clinic?: ClinicUpdateOneRequiredWithoutCollaboratorsNestedInput
  }

  export type ClinicCollaboratorUncheckedUpdateWithoutCollaboratorInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClinicCollaboratorUncheckedUpdateManyWithoutCollaboratorInput = {
    clinicId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EvaluationUpdateWithoutCollaboratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUpdateOneWithoutEvaluationNestedInput
    patient?: PatientUpdateOneRequiredWithoutEvaluationsNestedInput
    clinic?: ClinicUpdateOneWithoutEvaluationsNestedInput
  }

  export type EvaluationUncheckedUpdateWithoutCollaboratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    eyes?: EyesUncheckedUpdateOneWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateManyWithoutCollaboratorInput = {
    id?: StringFieldUpdateOperationsInput | string
    patientId?: StringFieldUpdateOperationsInput | string
    done?: BoolFieldUpdateOperationsInput | boolean
    clinicId?: NullableStringFieldUpdateOperationsInput | string | null
    clinicalData?: NullableStringFieldUpdateOperationsInput | string | null
    continuousData?: NullableStringFieldUpdateOperationsInput | string | null
    diagnosis?: NullableStringFieldUpdateOperationsInput | string | null
    treatment?: NullableStringFieldUpdateOperationsInput | string | null
    followUp?: NullableStringFieldUpdateOperationsInput | string | null
    nextAppointment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeLogCreateManyEyeInput = {
    id?: string
    type: $Enums.EyeLogType
    details?: string | null
    recordedAt?: Date | string
  }

  export type RefractionCreateManyEyeInput = {
    id?: string
    spherical?: number | null
    cylinder?: number | null
    axis?: number | null
    visualAcuity?: string | null
    recordedAt?: Date | string
  }

  export type EyeSurgeryCreateManyEyeInput = {
    id?: string
    procedure: string
    date: Date | string
    notes?: string | null
  }

  export type EyedropCreateManyEyeInput = {
    id?: string
    name: string
    dosage?: string | null
    startDate?: Date | string | null
    notes?: string | null
  }

  export type EyeLogUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEyeLogTypeFieldUpdateOperationsInput | $Enums.EyeLogType
    details?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeLogUncheckedUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEyeLogTypeFieldUpdateOperationsInput | $Enums.EyeLogType
    details?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeLogUncheckedUpdateManyWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumEyeLogTypeFieldUpdateOperationsInput | $Enums.EyeLogType
    details?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefractionUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    spherical?: NullableFloatFieldUpdateOperationsInput | number | null
    cylinder?: NullableFloatFieldUpdateOperationsInput | number | null
    axis?: NullableFloatFieldUpdateOperationsInput | number | null
    visualAcuity?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefractionUncheckedUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    spherical?: NullableFloatFieldUpdateOperationsInput | number | null
    cylinder?: NullableFloatFieldUpdateOperationsInput | number | null
    axis?: NullableFloatFieldUpdateOperationsInput | number | null
    visualAcuity?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefractionUncheckedUpdateManyWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    spherical?: NullableFloatFieldUpdateOperationsInput | number | null
    cylinder?: NullableFloatFieldUpdateOperationsInput | number | null
    axis?: NullableFloatFieldUpdateOperationsInput | number | null
    visualAcuity?: NullableStringFieldUpdateOperationsInput | string | null
    recordedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EyeSurgeryUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    procedure?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyeSurgeryUncheckedUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    procedure?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyeSurgeryUncheckedUpdateManyWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    procedure?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyedropUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyedropUncheckedUpdateWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EyedropUncheckedUpdateManyWithoutEyeInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    dosage?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountCreateManyUserInput = {
    id?: string
    type: string
    provider: string
    providerAccountId: string
    refresh_token?: string | null
    access_token?: string | null
    expires_at?: number | null
    token_type?: string | null
    scope?: string | null
    id_token?: string | null
    session_state?: string | null
    refresh_token_expires_in?: number | null
  }

  export type SessionCreateManyUserInput = {
    id?: string
    sessionToken: string
    expires: Date | string
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    provider?: StringFieldUpdateOperationsInput | string
    providerAccountId?: StringFieldUpdateOperationsInput | string
    refresh_token?: NullableStringFieldUpdateOperationsInput | string | null
    access_token?: NullableStringFieldUpdateOperationsInput | string | null
    expires_at?: NullableIntFieldUpdateOperationsInput | number | null
    token_type?: NullableStringFieldUpdateOperationsInput | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    id_token?: NullableStringFieldUpdateOperationsInput | string | null
    session_state?: NullableStringFieldUpdateOperationsInput | string | null
    refresh_token_expires_in?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionToken?: StringFieldUpdateOperationsInput | string
    expires?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
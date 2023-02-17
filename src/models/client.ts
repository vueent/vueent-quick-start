import type {
  Base,
  Rollback,
  RollbackPrivate,
  Save,
  SavePrivate,
  Validate,
  ValidatePrivate,
  Options,
  PatternAssert
} from '@vueent/mix-models';
import { BaseModel, mixRollback, mixSave, mixValidate, mix } from '@vueent/mix-models';
import { v9s, simplify } from 'v9s';
import { integer } from 'v9sx';

import { name, phone } from '@/utilites/validators';

/**
 * Internal data representation.
 */
export interface Data {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  age: string;
}

/**
 * External data representation (serialized).
 */
export interface EncodedData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
}

/**
 * Returns initial data state.
 */
export function makeInitialData(): Data {
  return { id: 0, firstName: '', lastName: '', phone: '', age: '' };
}

/**
 * A mask that marks the fields that will be rolled back.
 *
 * This object is optional and can be omitted, in which case all fields, including the primary key, will be rolled back.
 */
export const rollbackMask = {
  firstName: true,
  lastName: true,
  phone: true,
  age: true
} as const;

// правила валидации, они должны возвращать true или строку текстом ошибки

/**
 * Validation rules.
 *
 * Validation rule must return `true` or a string with an error message.
 */
export const validations = {
  firstName: simplify(
    v9s<string>()
      .minLength(1, 'Enter first name')
      .maxLength(100, 'Maximum first name length exceeded')
      .use(name, 'Remove invalid characters')
  ),
  lastName: simplify(
    v9s<string>()
      .minLength(1, 'Enter last name')
      .maxLength(100, 'Maximum last name length exceeded')
      .use(name, 'Remove invalid characters')
  ),
  phone: simplify(v9s<string>().minLength(1, 'Enter phone number').use(phone, 'Invalid phone format')),
  age: simplify(
    v9s<string>()
      .minLength(1, 'Enter age')
      .maxLength(3, 'Maximum age length exceeded')
      .use(integer, 'Age must be an integer value', Number)
      .gte(0, 'Age cannot be a negative value')
      .lte(150, 'Age cannot exceed 150 years')
  )
} as const;

/**
 * An intermediate class that required for using TypeScript mixins, because BaseModel is a generic class.
 */
class DataModel extends BaseModel<Data> {}

/**
 * Generated validation object type, based on the rules object.
 */
export type Validations = PatternAssert<typeof validations, Data>;

/**
 * The Model's public interface.
 */
export type ModelType = Base<Data> & Rollback & Save & Validate<Validations>;

/**
 * The Model's private interface that cannot be inferred automatically since TypeScript limitations.
 */
export interface Model extends DataModel, RollbackPrivate<Data>, SavePrivate<Data>, ValidatePrivate<Validations> {}

/**
 * Model class.
 */
export class Model extends mix<Data, typeof DataModel>(
  DataModel,
  mixRollback(rollbackMask),
  mixSave(),
  mixValidate(validations)
) {
  /**
   * @param initialData - initial data state
   * @param react - make data reactive
   * @param options - instance options
   */
  constructor(initialData?: Data, react = true, ...options: Options[]) {
    // the first argument indicates which field is considered the primary key of the model,
    // there is no support for composite keys, empty string is a valid value
    super('id', initialData ?? makeInitialData(), react, ...options);

    // if the identifier is set when creating an instance, then we consider that the object is loaded from the storage
    if (this.pk) this._flags.new = false;
  }
}

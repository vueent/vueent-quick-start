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

// маска, показывающая - какие поля откатывать при вызове rollback
// в данном примере поле name будет сброшено, а поле id - нет
// маску можно не указывать вовсе, тогда исходное состояние будет возвращено целиком
export const rollbackMask = {
  firstName: true,
  lastName: true,
  phone: true,
  age: true
} as const;

// правила валидации, они должны возвращать true или строку текстом ошибки
export const validations = {
  // проверяем, что имя не пустая строка, и что длина не превышает 255 символов
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
  // проверяем, что строка является целочисленной и не превышает трех символов
  age: simplify(
    v9s<string>()
      .minLength(1, 'Enter age')
      .maxLength(3, 'Maximum age length exceeded')
      .use(integer, 'Age must be an integer value', Number)
      .gte(0, 'Age cannot be a negative value')
      .lte(150, 'Age cannot exceed 150 years')
  )
} as const;

// промежуточный класс DataModel, который необходим для применения миксинов,
// так как BaseModel является обобщенным классом
class DataModel extends BaseModel<Data> {}

// генерируем тип для объекта, отвечающего за валидацию на основе правил и интерфейса с данными
export type Validations = PatternAssert<typeof validations, Data>;

// публичный тип модели, который не включает в себя приватные поля и методы миксинов
export type ModelType = Base<Data> & Rollback & Save & Validate<Validations>;

// так как TypeScript не позволяет автоматически выводить тип при применении
// миксинов, то необходимо явно добавить типы в определение интерфейса
// класса, иначе приватные и публичные методы и свойства миксинов
// не будут доступны внутри класса
export interface Model extends DataModel, RollbackPrivate<Data>, SavePrivate<Data>, ValidatePrivate<Validations> {}

// класс модели
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

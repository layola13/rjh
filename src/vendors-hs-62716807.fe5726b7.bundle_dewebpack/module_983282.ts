import React, { useContext } from 'react';
import { List } from 'rc-field-form';
import { ConfigContext } from '../config-provider';
import { FormItemPrefixContext } from './context';
import warning from '../_util/warning';

interface FormListFieldData {
  name: number;
  key: number;
  fieldKey?: number;
}

interface FormListOperation {
  add: (defaultValue?: any, insertIndex?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

interface FormListMeta {
  errors: React.ReactNode[];
  warnings: React.ReactNode[];
}

interface FormListProps {
  prefixCls?: string;
  name: string | number | (string | number)[];
  initialValue?: any[];
  rules?: any[];
  children: (
    fields: FormListFieldData[],
    operation: FormListOperation,
    meta: FormListMeta
  ) => React.ReactNode;
}

type OmittedFormListProps = Omit<FormListProps, 'prefixCls' | 'children'>;

const FormList: React.FC<FormListProps> = (props) => {
  const { prefixCls: customizePrefixCls, children, ...restProps } = props;

  warning(
    !!restProps.name,
    'Form.List',
    'Miss `name` prop.'
  );

  const { getPrefixCls } = useContext(ConfigContext);
  const prefixCls = getPrefixCls('form', customizePrefixCls);

  return (
    <List {...restProps}>
      {(fields: FormListFieldData[], operation: FormListOperation, meta: FormListMeta) => {
        const transformedFields = fields.map((field) => ({
          ...field,
          fieldKey: field.key,
        }));

        return (
          <FormItemPrefixContext.Provider
            value={{
              prefixCls,
              status: 'error',
            }}
          >
            {children(transformedFields, operation, { errors: meta.errors })}
          </FormItemPrefixContext.Provider>
        );
      }}
    </List>
  );
};

export default FormList;
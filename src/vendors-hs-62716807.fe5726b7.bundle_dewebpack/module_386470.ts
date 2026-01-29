import { useForm } from './useForm';
import FormItem from './FormItem';
import FormList from './FormList';
import ErrorList from './ErrorList';
import { FormProvider } from './FormProvider';

interface FormComponent {
  Item: typeof FormItem;
  List: typeof FormList;
  ErrorList: typeof ErrorList;
  useForm: typeof useForm;
  Provider: typeof FormProvider;
  create: () => void;
}

const Form: FormComponent = {
  Item: FormItem,
  List: FormList,
  ErrorList: ErrorList,
  useForm: useForm,
  Provider: FormProvider,
  create: () => {
    console.warn(
      false,
      'Form',
      'antd v4 removed `Form.create`. Please remove or use `@ant-design/compatible` instead.'
    );
  }
};

export default Form;
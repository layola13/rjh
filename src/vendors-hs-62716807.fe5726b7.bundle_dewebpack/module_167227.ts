import Button from './Button';
import Group from './Group';

interface RadioComponent {
  Button: typeof Button;
  Group: typeof Group;
}

const Radio: RadioComponent = Group as any;
Radio.Button = Button;
Radio.Group = Group;

export { Button, Group };
export default Radio;
import Text from './Text';
import Link from './Link';
import Title from './Title';
import Paragraph from './Paragraph';
import BaseTypography from './BaseTypography';

interface Typography {
  Text: typeof Text;
  Link: typeof Link;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
}

const typography: Typography = BaseTypography as Typography;
typography.Text = Text;
typography.Link = Link;
typography.Title = Title;
typography.Paragraph = Paragraph;

export default typography;
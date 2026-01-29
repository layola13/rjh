interface CategoryItemControlProps {
  keyName: string;
  selected: boolean;
  category: string;
  handleCategoryClick: (category: string) => void;
}

interface CategoryItemControlState {
  isHovering: boolean;
}

export class CategoryItemControl extends React.Component<
  CategoryItemControlProps,
  CategoryItemControlState
> {
  constructor(props: CategoryItemControlProps) {
    super(props);
    this.state = {
      isHovering: false,
    };
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseOver(): void {
    this.setState({
      isHovering: true,
    });
  }

  handleMouseOut(): void {
    this.setState({
      isHovering: false,
    });
  }

  render(): React.ReactElement {
    const { keyName, selected, category, handleCategoryClick } = this.props;
    const selectedClass = selected ? " selected-item" : "";

    return (
      <li className="image-category-filter-item" title={keyName}>
        <div
          className="mouse-handle"
          onClick={() => handleCategoryClick(category)}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          <div className={`image-category-name${selectedClass}`}>
            {keyName}
          </div>
        </div>
      </li>
    );
  }
}
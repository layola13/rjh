export interface SchematicDiagramData {
  className?: string;
  imgUrl: string;
}

export interface SchematicDiagramProps {
  data: SchematicDiagramData;
  id: string;
}

export const SchematicDiagram: React.FC<SchematicDiagramProps> = ({ data, id }) => {
  const { className, imgUrl } = data;

  return (
    <div
      id={id}
      className={`property-bar-switch-schematic-diagram ${className ?? ""}`}
    >
      <img
        className="property-bar-switch-schematic-diagram-img"
        src={imgUrl}
        alt="Schematic diagram"
      />
    </div>
  );
};
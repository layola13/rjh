export interface LoadingProps {
  show?: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ show = true }) => {
  return (
    <div
      className={classNames({
        loadingIcon: true,
        center: true,
        hidden: !show
      })}
    >
      <img src={loadingIconSrc} alt="Loading" />
    </div>
  );
};